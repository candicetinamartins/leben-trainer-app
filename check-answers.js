const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'questions.js'), 'utf8');

// Find all question blocks by looking for id patterns
const idMatches = content.match(/"id":\s*\d+/g) || [];
console.log(`Total questions found: ${idMatches.length}`);

// Extract all objects that have "id" field - use a simpler approach
// Split by likely question boundaries and check each
const lines = content.split('\n');
let inQuestion = false;
let braceCount = 0;
let currentBlock = '';
let questionsWithoutAnswers = [];
let questionsWithEmptyAnswers = [];
let currentId = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('"id"') && line.match(/"id":\s*\d+/)) {
    // Starting a new question block
    const idMatch = line.match(/"id":\s*(\d+)/);
    currentId = idMatch ? idMatch[1] : null;
    inQuestion = true;
    braceCount = 0;
    currentBlock = line;
  } else if (inQuestion) {
    currentBlock += line + '\n';
  }
  
  // Count braces to find end of object
  for (let ch of line) {
    if (ch === '{') braceCount++;
    if (ch === '}') {
      braceCount--;
      if (braceCount === 0 && inQuestion) {
        // End of question object
        if (currentId) {
          if (!currentBlock.includes('"answers"')) {
            questionsWithoutAnswers.push(currentId);
          } else {
            // Check if answers array is empty
            const answersMatch = currentBlock.match(/"answers"\s*:\s*\[\s*\]/);
            if (answersMatch) {
              questionsWithEmptyAnswers.push(currentId);
            }
          }
        }
        inQuestion = false;
        currentBlock = '';
      }
    }
  }
}

console.log(`Questions without "answers" field: ${questionsWithoutAnswers.length}`);
if (questionsWithoutAnswers.length > 0) {
  console.log('IDs:', questionsWithoutAnswers.join(', '));
}

console.log(`Questions with empty answers array: ${questionsWithEmptyAnswers.length}`);
if (questionsWithEmptyAnswers.length > 0) {
  console.log('IDs:', questionsWithEmptyAnswers.join(', '));
}

if (questionsWithoutAnswers.length === 0 && questionsWithEmptyAnswers.length === 0) {
  console.log('All questions have answers!');
}
