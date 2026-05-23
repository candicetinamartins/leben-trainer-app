const fs = require('fs');

const content = fs.readFileSync('questions.js', 'utf8');

// Strip the "const questions = " prefix and trailing semicolon to get pure JSON
let jsonStr = content;
if (jsonStr.startsWith('const questions = ')) {
    jsonStr = jsonStr.substring('const questions = '.length);
}
if (jsonStr.endsWith(';')) {
    jsonStr = jsonStr.slice(0, -1);
}

let questions;
try {
    questions = JSON.parse(jsonStr);
    console.log('✓ JSON is valid');
    console.log(`  Total questions: ${questions.length}`);
} catch (e) {
    console.log('✗ JSON parse error:', e.message);
    process.exit(1);
}

const checks = [
    { id: 4, field: 'textAr', answerIndex: 3, expected: 'التيقظ', desc: 'Q4 answer 4 textAr' },
    { id: 4, field: 'textFa', answerIndex: 3, expected: 'هشیاری', desc: 'Q4 answer 4 textFa' },
    { id: 5, field: 'questionEn', expected: 'Where must you register when you move to a new city in Germany?', desc: 'Q5 questionEn' },
    { id: 14, field: 'textTr', answerIndex: 2, expected: 'Laiklik', desc: 'Q14 answer 3 textTr' },
    { id: 49, field: 'textTe', answerIndex: 0, expected: 'రాజ్యాంగం మరియు చట్టం.', desc: 'Q49 answer 1 textTe' },
    { id: 58, field: 'textZh', answerIndex: 2, expected: '联邦参议院议长', desc: 'Q58 answer 3 textZh' },
    { id: 60, field: 'textEn', answerIndex: 2, expected: 'Directive.', desc: 'Q60 answer 3 textEn' },
    { id: 146, field: 'textEn', answerIndex: 0, expected: 'program', desc: 'Q146 answer 1 textEn' },
    { id: 146, field: 'textEn', answerIndex: 1, expected: 'procedure', desc: 'Q146 answer 2 textEn' },
    { id: 146, field: 'textEn', answerIndex: 2, expected: 'protocol', desc: 'Q146 answer 3 textEn' },
    { id: 146, field: 'textEn', answerIndex: 3, expected: 'trial/process', desc: 'Q146 answer 4 textEn' },
];

let passed = 0;
let failed = 0;

for (const check of checks) {
    const q = questions.find(q => q.id === check.id);
    if (!q) {
        console.log(`✗ ${check.desc}: Question not found`);
        failed++;
        continue;
    }

    let actual;
    if (check.answerIndex !== undefined) {
        if (!q.answers || !q.answers[check.answerIndex]) {
            console.log(`✗ ${check.desc}: Answer index ${check.answerIndex} not found`);
            failed++;
            continue;
        }
        actual = q.answers[check.answerIndex][check.field];
    } else {
        actual = q[check.field];
    }

    if (actual === check.expected) {
        console.log(`✓ ${check.desc}: "${actual}"`);
        passed++;
    } else {
        console.log(`✗ ${check.desc}: expected "${check.expected}", got "${actual}"`);
        failed++;
    }
}

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) {
    process.exit(1);
}
