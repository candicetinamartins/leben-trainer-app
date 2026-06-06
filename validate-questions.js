const fs = require('fs');

// Evaluate the file to get the arrays
const code = fs.readFileSync('./questions.js', 'utf8');
const GENERAL_QUESTIONS = [];
const STATE_QUESTIONS = [];

try {
    eval(code);
} catch (e) {
    console.log('PARSE ERROR:', e.message);
    process.exit(1);
}

const all = [...GENERAL_QUESTIONS, ...STATE_QUESTIONS];
console.log('Total questions:', all.length);
console.log('General:', GENERAL_QUESTIONS.length);
console.log('State:', STATE_QUESTIONS.length);

const noAnswers = [];
const noCorrect = [];
const dupIds = new Set();
const seenIds = new Set();

for (const q of all) {
    if (!q.answers || q.answers.length === 0) {
        noAnswers.push(q.id);
    } else if (!q.answers.some(a => a.correct)) {
        noCorrect.push(q.id);
    }
    
    if (seenIds.has(q.id)) {
        dupIds.add(q.id);
    }
    seenIds.add(q.id);
}

if (noAnswers.length) {
    console.log('\nQuestions WITHOUT answers:', noAnswers.join(', '));
}
if (noCorrect.length) {
    console.log('\nQuestions without CORRECT answer:', noCorrect.join(', '));
}
if (dupIds.size) {
    console.log('\nDuplicate IDs:', [...dupIds].join(', '));
}

if (!noAnswers.length && !noCorrect.length && !dupIds.size) {
    console.log('\nAll questions look valid.');
}
