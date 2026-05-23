const fs = require('fs');

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

// Track fixes that need application
let needFixing = [];
let alreadyCorrect = [];
let notFound = [];

// Check each fix
for (const fix of fixes) {
    const { id, field, current, corrected } = fix;

    // Find the question block
    const questionRegex = new RegExp(`"id":\\s*${id},`, 'g');
    let questionMatch = questionRegex.exec(questionsContent);

    if (!questionMatch) {
        notFound.push({ id, field, reason: 'Question not found' });
        continue;
    }

    // Get a window of text around the question
    const startIdx = questionMatch.index;
    const windowSize = 3000;
    const endIdx = Math.min(startIdx + windowSize, questionsContent.length);
    const questionWindow = questionsContent.substring(startIdx, endIdx);

    // Find the field in the question window
    const fieldRegex = new RegExp(`"${field}":\\s*"([^"]*)"`, 'g');
    let fieldMatch = fieldRegex.exec(questionWindow);

    if (!fieldMatch) {
        notFound.push({ id, field, reason: 'Field not found' });
        continue;
    }

    const actualValue = fieldMatch[1];

    if (actualValue === corrected) {
        alreadyCorrect.push({ id, field, actualValue });
    } else {
        needFixing.push({ id, field, actualValue, corrected, startIdx, fieldMatch });
    }
}

console.log(`\n=== Analysis ===`);
console.log(`Already correct: ${alreadyCorrect.length}`);
console.log(`Need fixing: ${needFixing.length}`);
console.log(`Not found: ${notFound.length}`);

// Apply fixes that need it
let appliedCount = 0;
for (const fix of needFixing) {
    const { id, field, actualValue, corrected } = fix;

    // Create regex to find this exact field within the question's general area
    // We need to be precise to avoid replacing the wrong occurrence
    const escapedValue = actualValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const oldFieldStr = `"${field}": "${actualValue}"`;
    const newFieldStr = `"${field}": "${corrected}"`;

    // Find the specific occurrence near this question
    const questionRegex = new RegExp(`"id":\\s*${id},`, 'g');
    const qMatch = questionRegex.exec(questionsContent);
    const qStart = qMatch.index;
    const qEnd = Math.min(qStart + 3000, questionsContent.length);

    // Get the substring for this question
    const questionSlice = questionsContent.substring(qStart, qEnd);

    // Check if the old value exists in this slice
    if (questionSlice.includes(oldFieldStr)) {
        // Replace only within this question's slice
        const newQuestionSlice = questionSlice.replace(oldFieldStr, newFieldStr);
        questionsContent = questionsContent.substring(0, qStart) + newQuestionSlice + questionsContent.substring(qEnd);
        appliedCount++;
        console.log(`Applied Q${id} ${field}: "${actualValue}" -> "${corrected}"`);
    } else {
        console.log(`Failed to apply Q${id} ${field}: exact string not found in question window`);
    }
}

// Write updated questions.js
fs.writeFileSync(questionsPath, questionsContent, 'utf8');

console.log(`\n=== Summary ===`);
console.log(`Applied: ${appliedCount}`);
console.log(`Already correct: ${alreadyCorrect.length}`);
console.log(`Not found: ${notFound.length}`);

if (needFixing.length > 0) {
    console.log(`\n=== Fixes Applied ===`);
    for (const f of needFixing.slice(0, 20)) {
        console.log(`- Q${f.id}: ${f.field} "${f.actualValue}" -> "${f.corrected}"`);
    }
}

if (alreadyCorrect.length > 0) {
    console.log(`\n=== Already Correct (sample) ===`);
    for (const f of alreadyCorrect.slice(0, 10)) {
        console.log(`- Q${f.id}: ${f.field} = "${f.actualValue}"`);
    }
}

if (notFound.length > 0) {
    console.log(`\n=== Not Found ===`);
    for (const f of notFound) {
        console.log(`- Q${f.id}: ${f.field} - ${f.reason}`);
    }
}
