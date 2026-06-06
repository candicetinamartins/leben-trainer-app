const fs = require('fs');
const lines = fs.readFileSync('qdiff.txt', 'utf8').split('\n');
const ids = [];
const idRegex = /^\+.*"id"\s*:\s*(\d+)/;

for (const line of lines) {
    const m = line.match(idRegex);
    if (m) {
        const id = m[1];
        if (!ids.includes(id)) ids.push(id);
    }
}

console.log('Changed question IDs:', ids.join(', '));
console.log('Total changed:', ids.length);
