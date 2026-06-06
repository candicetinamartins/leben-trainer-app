const fs = require('fs');
const content = fs.readFileSync('./questions.js', 'utf8');

// Split by question start pattern
const blocks = content.split(/(?=\{\s*\n\s*"id"\s*:\s*\d+)/);
let total = 0;
let noAnswers = [];
let noCorrect = [];
let dupIds = [];
const seen = new Set();

for (const block of blocks) {
    const idMatch = block.match(/"id"\s*:\s*(\d+)/);
    if (!idMatch) continue;
    const id = parseInt(idMatch[1]);
    total++;

    if (seen.has(id)) {
        dupIds.push(id);
    }
    seen.add(id);

    if (!block.includes('"answers"')) {
        noAnswers.push(id);
    } else if (!block.includes('"correct"')) {
        noCorrect.push(id);
    } else {
        // Check if any answer has correct: true
        const hasCorrect = block.match(/"correct"\s*:\s*true/);
        if (!hasCorrect) {
            noCorrect.push(id);
        }
    }
}

console.log('Total questions:', total);
if (dupIds.length) console.log('Duplicate IDs:', dupIds.join(', '));
if (noAnswers.length) console.log('Missing answers:', noAnswers.join(', '));
if (noCorrect.length) console.log('Missing correct answer:', noCorrect.join(', '));
if (!dupIds.length && !noAnswers.length && !noCorrect.length) console.log('All questions look valid.');
