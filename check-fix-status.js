const fs = require('fs');

const auditContent = fs.readFileSync('leben_in_deutschland_dataset_audit_fixes_md.md', 'utf8');
let lines = fs.readFileSync('questions.js', 'utf8').split('\n');

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

let alreadyFixed = 0;
let needsFix = 0;
let notFound = 0;
const needsFixList = [];

for (const fix of fixes) {
    const { id, field, corrected } = fix;
    
    let blockStart = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(new RegExp(`\\s*"id":\\s*${id}\\s*,`))) {
            blockStart = i;
            break;
        }
    }
    
    if (blockStart === -1) {
        notFound++;
        continue;
    }
    
    let blockEnd = lines.length;
    for (let i = blockStart + 1; i < lines.length; i++) {
        if (lines[i].match(/\s*"id":\s*\d+\s*,/)) {
            blockEnd = i;
            break;
        }
    }
    
    const correctedStr = `"${field}": "${corrected}"`;
    let found = false;
    
    for (let i = blockStart; i < blockEnd; i++) {
        if (lines[i].includes(correctedStr)) {
            alreadyFixed++;
            found = true;
            break;
        }
    }
    
    if (!found) {
        needsFix++;
        // Find the actual values
        const fieldRegex = new RegExp(`\\s*"${field}": "([^"]*)"`);
        const vals = [];
        for (let i = blockStart; i < blockEnd; i++) {
            const m = lines[i].match(fieldRegex);
            if (m) vals.push(m[1]);
        }
        needsFixList.push({ id, field, corrected, actualValues: vals });
    }
}

console.log(`Already fixed: ${alreadyFixed}/${fixes.length}`);
console.log(`Still needs fix: ${needsFix}/${fixes.length}`);
console.log(`Question not found: ${notFound}/${fixes.length}`);

if (needsFixList.length > 0) {
    console.log('\n=== Fixes still needed ===');
    needsFixList.forEach(f => {
        console.log(`Q${f.id} ${f.field}: corrected="${f.corrected}"`);
        console.log(`  Actual values: ${f.actualValues.map(v => '"' + v + '"').join(', ')}`);
    });
}
