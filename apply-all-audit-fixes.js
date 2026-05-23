const fs = require('fs');

// Read files
const questionsPath = 'questions.js';
const auditPath = 'leben_in_deutschland_dataset_audit_fixes_md.md';

let questionsContent = fs.readFileSync(questionsPath, 'utf8');
const auditContent = fs.readFileSync(auditPath, 'utf8');

// Extract JSON fix blocks from audit file
const jsonBlockRegex = /```json\n([\s\S]*?)\n```/g;
const fixes = [];
let match;

while ((match = jsonBlockRegex.exec(auditContent)) !== null) {
    try {
        const jsonStr = match[1].trim();
        const fix = JSON.parse(jsonStr);
        if (fix.id && fix.field && fix.corrected !== undefined) {
            fixes.push(fix);
        }
    } catch (e) {
        // Skip invalid JSON
    }
}

console.log(`Found ${fixes.length} fixes in audit file`);

// Track applied fixes and stats
let appliedCount = 0;
let skippedCount = 0;
const appliedFixes = [];
const skippedFixes = [];

// Apply each fix
for (const fix of fixes) {
    const { id, field, current, corrected } = fix;
    
    // Find the question block
    const questionRegex = new RegExp(`"id":\\s*${id},`, 'g');
    let questionMatch = questionRegex.exec(questionsContent);
    
    if (!questionMatch) {
        console.log(`Q${id}: Question not found, skipping`);
        skippedCount++;
        skippedFixes.push({ id, field, reason: 'Question not found' });
        continue;
    }
    
    // Get a window of text around the question to search for the field
    const startIdx = questionMatch.index;
    const windowSize = 2000; // characters
    const endIdx = Math.min(startIdx + windowSize, questionsContent.length);
    const questionWindow = questionsContent.substring(startIdx, endIdx);
    
    // Find the field in the question window
    const fieldRegex = new RegExp(`"${field}":\\s*"([^"]*)"`, 'g');
    let fieldMatch;
    let found = false;
    let oldValue = null;
    
    while ((fieldMatch = fieldRegex.exec(questionWindow)) !== null) {
        oldValue = fieldMatch[1];
        
        // If current is specified, check if it matches
        if (current !== undefined && oldValue !== current) {
            continue; // Try next occurrence
        }
        
        // Apply the fix
        const oldFieldStr = `"${field}": "${oldValue}"`;
        const newFieldStr = `"${field}": "${corrected}"`;
        
        // Replace in the full content
        const fullFieldRegex = new RegExp(
            `"${field}":\\s*"${oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
            'g'
        );
        
        let replaced = false;
        questionsContent = questionsContent.replace(fullFieldRegex, (match, offset) => {
            // Only replace if it's within the question block
            if (offset >= startIdx && offset < startIdx + windowSize * 2) {
                replaced = true;
                return newFieldStr;
            }
            return match;
        });
        
        if (replaced) {
            appliedCount++;
            appliedFixes.push({ id, field, oldValue, corrected });
            console.log(`Q${id}: Applied fix for ${field}: "${oldValue}" -> "${corrected}"`);
            found = true;
            break;
        }
    }
    
    if (!found) {
        if (current !== undefined) {
            console.log(`Q${id}: Field ${field} with current value "${current}" not found, skipping`);
            skippedFixes.push({ id, field, reason: `Current value "${current}" not found` });
        } else {
            console.log(`Q${id}: Field ${field} not found or no empty value, skipping`);
            skippedFixes.push({ id, field, reason: 'Field not found or no matching value' });
        }
        skippedCount++;
    }
}

// Write updated questions.js
fs.writeFileSync(questionsPath, questionsContent, 'utf8');

console.log(`\n=== Summary ===`);
console.log(`Applied: ${appliedCount}`);
console.log(`Skipped: ${skippedCount}`);
console.log(`Total: ${fixes.length}`);

// Write summary to a log file
const logContent = `# Audit Fix Application Log

## Summary
- Total fixes found in audit file: ${fixes.length}
- Applied: ${appliedCount}
- Skipped: ${skippedCount}

## Applied Fixes
${appliedFixes.map(f => `- Q${f.id}: ${f.field} "${f.oldValue}" -> "${f.corrected}"`).join('\n')}

## Skipped Fixes
${skippedFixes.map(f => `- Q${f.id}: ${f.field} - ${f.reason}`).join('\n')}
`;

fs.writeFileSync('audit-fix-log.md', logContent, 'utf8');
console.log('\nLog written to audit-fix-log.md');
