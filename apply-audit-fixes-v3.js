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

for (const fix of fixes) {
    const { id, field, current, corrected } = fix;
    
    // Find the question block: locate line with "id": N,
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
        continue;
    }
    
    // Find end of question block (next "id": or end of file)
    let blockEnd = lines.length;
    for (let i = blockStart + 1; i < lines.length; i++) {
        if (lines[i].match(/\s*"id":\s*\d+\s*,/)) {
            blockEnd = i;
            break;
        }
    }
    
    let found = false;
    
    // Strategy 1: if current is provided, search for exact match in the block
    if (current && current.length > 0) {
        const searchLine = `"${field}": "${current}"`;
        for (let i = blockStart; i < blockEnd; i++) {
            if (lines[i].includes(searchLine)) {
                const replaceLine = `"${field}": "${corrected}"`;
                if (lines[i].includes(replaceLine)) {
                    console.log(`✅ Q${id}: ${field} already correct`);
                    alreadyCorrectCount++;
                    found = true;
                    break;
                }
                lines[i] = lines[i].replace(searchLine, replaceLine);
                console.log(`✅ Q${id}: Fixed ${field} "${current}" → "${corrected}" (line ${i + 1})`);
                appliedCount++;
                found = true;
                break;
            }
        }
    }
    
    // Strategy 2: if not found with current, search for the field and check values
    if (!found) {
        const candidates = [];
        const fieldRegex = new RegExp(`(\\s*"${field}":\\s*")([^"]*)(".*)`);
        
        for (let i = blockStart; i < blockEnd; i++) {
            const m = lines[i].match(fieldRegex);
            if (m) {
                candidates.push({ line: i, value: m[2], full: m[0], prefix: m[1], suffix: m[3] });
            }
        }
        
        if (candidates.length === 0) {
            console.log(`❌ Q${id}: Field ${field} not found`);
            notFoundCount++;
            continue;
        }
        
        // Check if any is already correct
        const alreadyCorrect = candidates.find(c => c.value === corrected);
        if (alreadyCorrect) {
            console.log(`✅ Q${id}: ${field} already correct ("${corrected}")`);
            alreadyCorrectCount++;
            continue;
        }
        
        // If current was specified but not found exactly, show the candidates
        if (current) {
            console.log(`⚠️ Q${id}: Current "${current}" not found for ${field}. Candidates: ${candidates.map(c => `"${c.value}"`).join(', ')}`);
        }
        
        // For single candidate, or if no current was specified, replace first candidate
        const target = candidates[0];
        const newLine = `${target.prefix}${corrected}${target.suffix}`;
        lines[target.line] = newLine;
        console.log(`✅ Q${id}: Fixed ${field} "${target.value}" → "${corrected}" (line ${target.line + 1})`);
        appliedCount++;
    }
}

// Write updated file
fs.writeFileSync(questionsPath, lines.join('\n'), 'utf8');

console.log(`\n=== Summary ===`);
console.log(`Applied: ${appliedCount}`);
console.log(`Already correct: ${alreadyCorrectCount}`);
console.log(`Not found/failed: ${notFoundCount}`);
