const fs = require('fs');

const md = fs.readFileSync('leben_in_deutschland_dataset_audit_fixes_md.md', 'utf-8');
const raw = fs.readFileSync('questions.js', 'utf-8');

// Parse fixes
const blocks = [...md.matchAll(/```json\s*([\s\S]*?)```/g)];
const fixes = blocks.map(b => {
    try { return JSON.parse(b[1]); } catch { return null; }
}).filter(Boolean);

console.log(`Parsed ${fixes.length} fix blocks`);

// Parse questions using line-by-line approach
const lines = raw.split('\n');
const questions = [];
let currentQ = null;
let currentA = null;
let inAnswers = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const idMatch = line.match(/"id":\s*(\d+),/);
    if (idMatch) {
        currentQ = { id: parseInt(idMatch[1]), line: i + 1, answers: [], fields: {} };
        questions.push(currentQ);
        inAnswers = false;
        currentA = null;
    } else if (currentQ && line.trim() === '"answers": [') {
        inAnswers = true;
    } else if (currentQ && inAnswers && line.trim() === '},' && currentA) {
        currentQ.answers.push(currentA);
        currentA = null;
    } else if (currentQ && inAnswers && line.trim() === '{') {
        currentA = { fields: {}, line: i + 1 };
    } else if (currentA) {
        const fm = line.match(/"(text[a-zA-Z]+)":\s*(".*?"),?\s*$/);
        if (fm) {
            currentA.fields[fm[1]] = { value: JSON.parse(fm[2]), line: i + 1 };
        }
    } else if (currentQ && !inAnswers) {
        const fm = line.match(/"(question[a-zA-Z]+)":\s*(".*?"),?\s*$/);
        if (fm) {
            currentQ.fields[fm[1]] = { value: JSON.parse(fm[2]), line: i + 1 };
        }
    }
}

const qMap = new Map();
questions.forEach(q => {
    if (!qMap.has(q.id)) qMap.set(q.id, []);
    qMap.get(q.id).push(q);
});

let applied = 0;
let mismatched = 0;
let fixed = 0;

for (const fix of fixes) {
    const qs = qMap.get(fix.questionId) || [];
    if (qs.length === 0) {
        console.log(`  Q${fix.questionId}: NOT FOUND`);
        mismatched++;
        continue;
    }
    
    // Find the field
    let found = false;
    for (const q of qs) {
        if (fix.field === 'textEn' || fix.field === 'textZh' || fix.field === 'textAr' || 
            fix.field === 'textRu' || fix.field === 'textFa' || fix.field === 'textHi' ||
            fix.field === 'textTa' || fix.field === 'textTe' || fix.field === 'textMl' ||
            fix.field === 'textTr') {
            // Look in answers
            for (const a of q.answers) {
                if (a.fields[fix.field]) {
                    const actual = a.fields[fix.field].value;
                    if (actual === fix.current || actual === fix.corrected || actual === '' || fix.current === '') {
                        if (actual === fix.corrected) {
                            applied++;
                        } else {
                            console.log(`  Q${fix.questionId} ${fix.field}: "${actual}" -> "${fix.corrected}" (expected: "${fix.current}")`);
                            fixed++;
                        }
                        found = true;
                    }
                    break;
                }
            }
        } else {
            // Look in question fields
            if (q.fields[fix.field]) {
                const actual = q.fields[fix.field].value;
                if (actual === fix.current || actual === fix.corrected || actual === '' || fix.current === '') {
                    if (actual === fix.corrected) {
                        applied++;
                    } else {
                        console.log(`  Q${fix.questionId} ${fix.field}: "${actual}" -> "${fix.corrected}" (expected: "${fix.current}")`);
                        fixed++;
                    }
                    found = true;
                }
            }
        }
        if (found) break;
    }
    
    if (!found) {
        console.log(`  Q${fix.questionId} ${fix.field}: NOT FOUND`);
        mismatched++;
    }
}

console.log(`\nApplied: ${applied}, To fix: ${fixed}, Mismatched: ${mismatched}`);
