const fs = require('fs');

let lines = fs.readFileSync('questions.js', 'utf8').split('\n');
const auditContent = fs.readFileSync('leben_in_deutschland_dataset_audit_fixes_md.md', 'utf8');

// Parse all fixes
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

console.log(`Total fixes: ${fixes.length}`);

let applied = 0;
let skipped = 0;
let manual = [];

for (const fix of fixes) {
    const { id, field, current, corrected } = fix;
    
    // Find question block
    let blockStart = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(new RegExp(`\\s*"id":\\s*${id}\\s*,`))) {
            blockStart = i;
            break;
        }
    }
    if (blockStart === -1) {
        manual.push({ id, field, reason: 'Question not found' });
        continue;
    }
    
    let blockEnd = lines.length;
    for (let i = blockStart + 1; i < lines.length; i++) {
        if (lines[i].match(/\s*"id":\s*\d+\s*,/)) {
            blockEnd = i;
            break;
        }
    }
    
    // Strategy: ONLY apply if exact current match is found
    let found = false;
    
    if (current && current.length > 0) {
        const searchStr = `"${field}": "${current}"`;
        for (let i = blockStart; i < blockEnd; i++) {
            if (lines[i].includes(searchStr)) {
                const replaceStr = `"${field}": "${corrected}"`;
                lines[i] = lines[i].replace(searchStr, replaceStr);
                console.log(`✅ Q${id}: ${field} exact match applied (line ${i+1})`);
                applied++;
                found = true;
                break;
            }
        }
    }
    
    if (!found) {
        // Check if corrected already exists
        const correctedStr = `"${field}": "${corrected}"`;
        for (let i = blockStart; i < blockEnd; i++) {
            if (lines[i].includes(correctedStr)) {
                console.log(`✅ Q${id}: ${field} already correct`);
                skipped++;
                found = true;
                break;
            }
        }
    }
    
    if (!found) {
        manual.push({ id, field, current: current || '', corrected, reason: 'No exact match and not already correct' });
    }
}

fs.writeFileSync('questions.js', lines.join('\n'), 'utf8');

console.log(`\n=== Summary ===`);
console.log(`Applied (exact match): ${applied}`);
console.log(`Already correct: ${skipped}`);
console.log(`Needs manual review: ${manual.length}`);

if (manual.length > 0) {
    console.log(`\n=== Manual Review ===`);
    manual.forEach(m => {
        console.log(`Q${m.id} ${m.field}: ${m.reason}`);
        if (m.current) console.log(`  Expected current: "${m.current}"`);
    });
}
