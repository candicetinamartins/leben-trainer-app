const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, 'questions.js');
const auditPath = path.join(__dirname, 'leben_in_deutschland_dataset_audit_fixes_md.md');

let questionsContent = fs.readFileSync(questionsPath, 'utf8');
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
    } catch (e) {
        // ignore parse errors
    }
}

console.log(`Found ${fixes.length} fixes to apply`);

let appliedCount = 0;
let alreadyCorrectCount = 0;
let notFoundCount = 0;

for (const fix of fixes) {
    const { id, field, current, corrected } = fix;
    
    // Find the question block - look for "id": N,
    const idPattern = new RegExp(`(\\{\\s*\\n\\s*"id":\\s*${id}\\s*,)`);
    const idMatch = questionsContent.match(idPattern);
    
    if (!idMatch) {
        console.log(`❌ Q${id}: Question not found`);
        notFoundCount++;
        continue;
    }
    
    const blockStart = idMatch.index;
    // Find the end of this question block (next question start or end of file)
    let blockEnd = questionsContent.search(new RegExp(`\\{\\s*\\n\\s*"id":\\s*(?!${id}\\b)\\d+\\s*,`));
    if (blockEnd === -1) blockEnd = questionsContent.length;
    
    const block = questionsContent.substring(blockStart, blockEnd);
    
    // Strategy: search for the exact "field": "current" string within this block
    // If current is provided, use it for exact matching
    // If current is not provided or empty, we need a different approach
    
    let searchStr, replaceStr;
    let found = false;
    
    if (current && current.length > 0) {
        searchStr = `"${field}": "${current}"`;
        replaceStr = `"${field}": "${corrected}"`;
        
        if (block.includes(searchStr)) {
            found = true;
        }
    }
    
    if (!found) {
        // Try to find the field by searching for all occurrences in the block
        const fieldRegex = new RegExp(`"${field}": "([^"]*)"`, 'g');
        const occurrences = [];
        let m;
        while ((m = fieldRegex.exec(block)) !== null) {
            occurrences.push(m[1]);
        }
        
        if (occurrences.length === 0) {
            console.log(`❌ Q${id}: Field ${field} not found`);
            notFoundCount++;
            continue;
        }
        
        // If already equals corrected, skip
        if (occurrences.some(v => v === corrected)) {
            console.log(`✅ Q${id}: ${field} already correct ("${corrected}")`);
            alreadyCorrectCount++;
            continue;
        }
        
        // If only one occurrence, use it
        if (occurrences.length === 1) {
            searchStr = `"${field}": "${occurrences[0]}"`;
            replaceStr = `"${field}": "${corrected}"`;
            found = true;
            console.log(`⚠️ Q${id}: Using single occurrence of ${field} ("${occurrences[0]}") → "${corrected}"`);
        } else {
            // Multiple occurrences - need to pick the right one
            // If current was provided but not found exactly, show warning
            if (current) {
                console.log(`⚠️ Q${id}: Current "${current}" not found for ${field}. Occurrences: ${occurrences.map(s => `"${s}"`).join(', ')}`);
                // Try to use the one that seems closest or just skip
                notFoundCount++;
                continue;
            } else {
                // No current specified, just replace first occurrence
                searchStr = `"${field}": "${occurrences[0]}"`;
                replaceStr = `"${field}": "${corrected}"`;
                found = true;
                console.log(`⚠️ Q${id}: Replacing first occurrence of ${field} ("${occurrences[0]}") → "${corrected}"`);
            }
        }
    }
    
    if (found) {
        // Double-check: verify the replacement string exists in the block
        if (!block.includes(searchStr)) {
            console.log(`❌ Q${id}: Search string not found in block: ${searchStr}`);
            notFoundCount++;
            continue;
        }
        
        // Verify we're not replacing something that's already correct
        if (searchStr === replaceStr) {
            console.log(`✅ Q${id}: ${field} already correct`);
            alreadyCorrectCount++;
            continue;
        }
        
        // Apply the replacement within the FULL content (not just the block)
        // We need to be careful to only replace within this question's block
        const blockWithReplacement = block.replace(searchStr, replaceStr);
        
        if (blockWithReplacement === block) {
            console.log(`❌ Q${id}: Replacement failed for ${field}`);
            notFoundCount++;
            continue;
        }
        
        questionsContent = questionsContent.substring(0, blockStart) + blockWithReplacement + questionsContent.substring(blockEnd);
        
        console.log(`✅ Q${id}: Fixed ${field} "${current || '(found)'}" → "${corrected}"`);
        appliedCount++;
    }
}

// Write updated questions.js
fs.writeFileSync(questionsPath, questionsContent, 'utf8');
console.log(`\n=== Summary ===`);
console.log(`Applied: ${appliedCount}`);
console.log(`Already correct: ${alreadyCorrectCount}`);
console.log(`Not found/failed: ${notFoundCount}`);
