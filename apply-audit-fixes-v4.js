const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, 'questions.js');
const auditPath = path.join(__dirname, 'leben_in_deutschland_dataset_audit_fixes_md.md');

let lines = fs.readFileSync(questionsPath, 'utf8').split('\n');
const auditContent = fs.readFileSync(auditPath, 'utf8');

// Parse all fixes from the markdown file
const fixRegex = /```json\s*\n(\{[\s\S]*?\})\s*\n```/g;
const fixes = [];
let match;

while ((match = fixRegex.exec(auditContent)) !== null) {
    try {
        const fix = JSON.parse(match[1]);
        if (fix.id && fix.field && fix.corrected) {
            fixes.push(fix);
        }
    } catch (e) {}
}

console.log(`Found ${fixes.length} fixes to apply`);

let appliedCount = 0;
let alreadyCorrectCount = 0;
let notFoundCount = 0;
const manualReview = [];

for (const fix of fixes) {
    const { id, field, current, corrected } = fix;
    
    // Find the question block
    let blockStart = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(new RegExp(`\\s*"id":\\s*${id}\\s*,`))) {
            blockStart = i;
            break;
        }
    }
    
    if (blockStart === -1) {
        console.log(`❌ Q${id}: Question not found`);
        notFoundCount++;
        manualReview.push({ ...fix, reason: 'Question not found' });
        continue;
    }
    
    let blockEnd = lines.length;
    for (let i = blockStart + 1; i < lines.length; i++) {
        if (lines[i].match(/\s*"id":\s*\d+\s*,/)) {
            blockEnd = i;
            break;
        }
    }
    
    let found = false;
    let alreadyCorrect = false;
    
    // Strategy 1: exact match using current value
    if (current && current.length > 0) {
        const searchStr = `"${field}": "${current}"`;
        for (let i = blockStart; i < blockEnd; i++) {
            if (lines[i].includes(searchStr)) {
                const replaceStr = `"${field}": "${corrected}"`;
                lines[i] = lines[i].replace(searchStr, replaceStr);
                console.log(`✅ Q${id}: Fixed ${field} (line ${i + 1})`);
                appliedCount++;
                found = true;
                break;
            }
        }
    }
    
    // Strategy 2: if current is empty or exact match failed,
    // check if corrected already exists (already fixed)
    if (!found) {
        const correctedStr = `"${field}": "${corrected}"`;
        for (let i = blockStart; i < blockEnd; i++) {
            if (lines[i].includes(correctedStr)) {
                alreadyCorrect = true;
                break;
            }
        }
        
        if (alreadyCorrect) {
            console.log(`✅ Q${id}: ${field} already correct`);
            alreadyCorrectCount++;
            continue;
        }
    }
    
    // Strategy 3: if no current specified, try to find the field
    // and replace first occurrence (for missing translations)
    if (!found && !alreadyCorrect && (!current || current.length === 0)) {
        const fieldRegex = new RegExp(`(\\s*"${field}":\\s*")([^"]*)(".*)`);
        for (let i = blockStart; i < blockEnd; i++) {
            const m = lines[i].match(fieldRegex);
            if (m) {
                const oldLine = lines[i];
                lines[i] = `${m[1]}${corrected}${m[3]}`;
                console.log(`✅ Q${id}: Fixed ${field} "${m[2]}" → "${corrected}" (line ${i + 1})`);
                appliedCount++;
                found = true;
                break;
            }
        }
    }
    
    if (!found && !alreadyCorrect) {
        console.log(`❌ Q${id}: ${field} not found (current="${current || ''}", corrected="${corrected}")`);
        notFoundCount++;
        manualReview.push({ ...fix, reason: 'Could not locate field in question' });
    }
}

fs.writeFileSync(questionsPath, lines.join('\n'), 'utf8');

console.log(`\n=== Summary ===`);
console.log(`Applied: ${appliedCount}`);
console.log(`Already correct: ${alreadyCorrectCount}`);
console.log(`Needs manual review: ${manualReview.length}`);

if (manualReview.length > 0) {
    console.log(`\n=== Manual Review Required ===`);
    manualReview.forEach(f => {
        console.log(`- Q${f.id} ${f.field}: ${f.reason}`);
    });
}
