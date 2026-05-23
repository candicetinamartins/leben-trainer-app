const fs = require('fs');
const content = fs.readFileSync('questions.js', 'utf8');

// Find Q4 block
const idx = content.indexOf('"id": 4,');
console.log('Q4 index:', idx);

const window = content.substring(idx, idx + 4000);

// Find all textAr in window
const regex = /"textAr":\s*"([^"]*)"/g;
let match;
while ((match = regex.exec(window)) !== null) {
    const val = match[1];
    const expected = 'اليقظة';
    console.log('Found textAr:', JSON.stringify(val), 'Match expected:', val === expected);
    console.log('  Char codes expected:', [...expected].map(c => c.charCodeAt(0)));
    console.log('  Char codes actual:  ', [...val].map(c => c.charCodeAt(0)));
}

// Direct search
const exact = '"textAr": "اليقظة"';
console.log('Direct search found:', window.includes(exact));
