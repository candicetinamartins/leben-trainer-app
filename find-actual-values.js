const fs = require('fs');

const fixes = [
    { id: 16, field: 'textEn', corrected: 'publicly spreading false factual allegations about individuals' },
    { id: 24, field: 'textRu', corrected: 'свобода проведения собраний' },
    { id: 38, field: 'textEn', corrected: 'federal state' },
    { id: 62, field: 'textTe', corrected: 'ఫెడరల్ రాజ్యాంగ కోర్టు' },
    { id: 68, field: 'textEn', corrected: 'equal rights under the law' },
    { id: 85, field: 'textZh', corrected: '德国联邦总理府' },
    { id: 93, field: 'textHi', corrected: 'जर्मनी का संघीय गणराज्य' },
    { id: 95, field: 'textFa', corrected: 'رأی‌گیری مخفی' },
    { id: 101, field: 'textZh', corrected: '政治党派' },
    { id: 121, field: 'textTa', corrected: 'ஜெர்மன் கூட்டாட்சி பாராளுமன்றம்' },
    { id: 133, field: 'textZh', corrected: '德国联邦议院' },
    { id: 196, field: 'textZh', corrected: '德国州议会' },
    { id: 214, field: 'textEn', corrected: 'nation' },
    { id: 257, field: 'textEn', corrected: 'federal states' },
    { id: 305, field: 'textEn', corrected: 'Federal Constitutional Court of Germany' },
    { id: 338, field: 'textEn', corrected: 'federal republic' },
    { id: 397, field: 'textEn', corrected: 'political parties' },
    { id: 454, field: 'textEn', corrected: 'democracy' }
];

const content = fs.readFileSync('questions.js', 'utf8');
const lines = content.split('\n');

for (const fix of fixes) {
    const { id, field, corrected } = fix;
    let blockStart = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(new RegExp(`\\s*"id":\\s*${id}\\s*,`))) {
            blockStart = i;
            break;
        }
    }
    if (blockStart === -1) {
        console.log(`Q${id}: NOT FOUND`);
        continue;
    }
    
    let blockEnd = lines.length;
    for (let i = blockStart + 1; i < lines.length; i++) {
        if (lines[i].match(/\s*"id":\s*\d+\s*,/)) {
            blockEnd = i;
            break;
        }
    }
    
    const fieldRegex = new RegExp(`\\s*"${field}": "([^"]*)"`);
    const matches = [];
    for (let i = blockStart; i < blockEnd; i++) {
        const m = lines[i].match(fieldRegex);
        if (m) {
            matches.push({ line: i + 1, value: m[1] });
        }
    }
    
    console.log(`Q${id} ${field}:`);
    matches.forEach(m => {
        const status = m.value === corrected ? ' [ALREADY CORRECT]' : '';
        console.log(`  line ${m.line}: "${m.value}"${status}`);
    });
    console.log('');
}
