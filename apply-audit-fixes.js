const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, 'questions.js');
const auditPath = path.join(__dirname, 'leben_in_deutschland_dataset_audit_fixes_md.md');
const outputMdPath = path.join(__dirname, 'leben_in_deutschland_dataset_audit_fixes_md.md');

let questionsContent = fs.readFileSync(questionsPath, 'utf8');
const auditContent = fs.readFileSync(auditPath, 'utf8');

// Parse all fixes from the markdown file
const fixRegex = /```json\s*\n(\{[\s\S]*?\})\s*\n```/g;
const fixes = [];
let match;

while ((match = fixRegex.exec(auditContent)) !== null) {
    try {
        const fix = JSON.parse(match[1]);
        if (fix.id && fix.field && (fix.current || fix.corrected)) {
            fixes.push(fix);
        }
    } catch (e) {
        console.log('Failed to parse fix:', match[1].substring(0, 100));
    }
}

console.log(`Found ${fixes.length} fixes to apply`);

const results = [];
let appliedCount = 0;
let skippedCount = 0;
let notFoundCount = 0;

for (const fix of fixes) {
    const { id, field, current, corrected } = fix;
    
    // Build the search string
    // We need to find the specific question and field
    // Format: "id": 4, then somewhere later: "fieldName": "value"
    
    // First, find the question block
    const idPattern = new RegExp(`"id":\\s*${id}\\s*,`);
    const idMatch = questionsContent.match(idPattern);
    
    if (!idMatch) {
        console.log(`❌ Q${id}: Question not found`);
        notFoundCount++;
        results.push({ id, field, status: 'not_found', fix });
        continue;
    }
    
    const blockStart = idMatch.index;
    // Find the end of this question block (next "id": or end of array)
    let blockEnd = questionsContent.indexOf('"id":', blockStart + 10);
    if (blockEnd === -1) blockEnd = questionsContent.length;
    
    let block = questionsContent.substring(blockStart, blockEnd);
    
    // Try to find and replace the field within this block
    // We search for: "field": "currentValue"
    const fieldPattern = new RegExp(`("${field}":\\s*")([^"]*)(")`);
    const fieldMatch = block.match(fieldPattern);
    
    if (!fieldMatch) {
        console.log(`❌ Q${id}: Field ${field} not found`);
        notFoundCount++;
        results.push({ id, field, status: 'field_not_found', fix });
        continue;
    }
    
    const actualCurrent = fieldMatch[2];
    
    // If current is specified, verify it matches
    if (current && actualCurrent !== current) {
        console.log(`⚠️ Q${id}: Current value mismatch for ${field}`);
        console.log(`  Expected: "${current}"`);
        console.log(`  Actual: "${actualCurrent}"`);
        
        // If actual already equals corrected, it's already fixed
        if (actualCurrent === corrected) {
            console.log(`  ✅ Already correct, skipping`);
            skippedCount++;
            results.push({ id, field, status: 'already_fixed', fix });
            continue;
        }
        
        // Otherwise, we still try to replace what we found with the corrected value
        console.log(`  🔄 Replacing actual value anyway`);
    }
    
    // Apply the replacement within the block
    const oldFieldStr = `"${field}": "${actualCurrent}"`;
    const newFieldStr = `"${field}": "${corrected}"`;
    
    const newBlock = block.replace(oldFieldStr, newFieldStr);
    
    if (newBlock === block) {
        console.log(`❌ Q${id}: Replacement failed for ${field}`);
        notFoundCount++;
        results.push({ id, field, status: 'replace_failed', fix });
        continue;
    }
    
    // Update the main content
    questionsContent = questionsContent.substring(0, blockStart) + newBlock + questionsContent.substring(blockEnd);
    
    console.log(`✅ Q${id}: Fixed ${field}`);
    appliedCount++;
    results.push({ id, field, status: 'applied', fix });
}

// Write updated questions.js
fs.writeFileSync(questionsPath, questionsContent, 'utf8');
console.log(`\n=== Summary ===`);
console.log(`Applied: ${appliedCount}`);
console.log(`Skipped (already fixed): ${skippedCount}`);
console.log(`Not found/failed: ${notFoundCount}`);

// Now update the MD file with checkmarks
let updatedMd = auditContent;

for (const result of results) {
    if (result.status === 'applied' || result.status === 'already_fixed') {
        // Find the fix block and add ✅ before the ```json
        const fixJson = JSON.stringify(result.fix, null, 2);
        // We need to match the exact block in the markdown
        const escapedJson = fixJson.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Actually, simpler approach: look for the json block with the id and field
        const blockPattern = new RegExp(
            `(\\s*\\n)(\\\`\\\`\\\`json\\s*\\n\\{\\s*\\n\\s*"id":\\s*${result.id}[^}]*"field":\\s*"${result.field}"[^}]*\\}\\s*\\n\\\`\\\`\\\`)`,
            'g'
        );
        
        // Simpler: just check if we can find and mark
        const marker = `"id": ${result.id}`;
        const fieldMarker = `"field": "${result.field}"`;
        
        // Find the json block containing this fix
        const simplePattern = new RegExp(
            `(\\\`\\\`\\\`json\\s*\\n)(\\{\\s*\\n\\s*"id":\\s*${result.id}[\\s\\S]{0,200}?"field":\\s*"${result.field}"[\\s\\S]{0,500}?\\}\\s*\\n)(\\\`\\\`\\\`)`
        );
        
        // Try to add ✅ after the closing ```
        const testMatch = updatedMd.match(simplePattern);
        if (testMatch) {
            const replacement = testMatch[0] + ' ✅';
            updatedMd = updatedMd.replace(testMatch[0], replacement);
        }
    }
}

fs.writeFileSync(outputMdPath, updatedMd, 'utf8');
console.log('\n✅ Updated markdown file with checkmarks');
