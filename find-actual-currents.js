const fs = require('fs');
const content = fs.readFileSync('questions.js', 'utf8');
const output = [];

const fixes = [
    { id: 4, field: 'textAr', corrected: 'أخذ القانون باليد' },
    { id: 4, field: 'textFa', corrected: 'خودسری در اجرای قانون' },
    { id: 4, field: 'textRu', corrected: 'Самосуд' },
    { id: 4, field: 'textTa', corrected: 'சுயநீதி' },
    { id: 4, field: 'textTe', corrected: 'స్వయంకృత న్యాయం' },
    { id: 5, field: 'textTa', corrected: 'தேர்தலின் போது வாக்காளர்கள் செல்வாக்கு செலுத்தப்படவோ அல்லது கட்டாயப்படுத்தப்படவோ கூடாது; மேலும் வாக்களித்ததற்காக எந்த பாதிப்பும் சந்திக்கக் கூடாது.' },
    { id: 13, field: 'textEn', corrected: 'all members of parliament who do not belong to the governing party/parties.' },
    { id: 14, field: 'textFa', corrected: 'می‌توانم نمادهای نازی، حماس یا دولت اسلامی را علناً نمایش دهم.' },
    { id: 15, field: 'textEn', corrected: 'free choice of profession' },
    { id: 16, field: 'textEn', corrected: 'publicly spreading false factual allegations about individuals' },
    { id: 24, field: 'textRu', corrected: 'свобода проведения собраний' },
    { id: 38, field: 'textEn', corrected: 'federal state' },
    { id: 49, field: 'textRu', corrected: 'Министерство по делам семьи' },
    { id: 58, field: 'textZh', corrected: '联邦参议院议长' },
    { id: 60, field: 'textEn', corrected: 'Directive.' },
    { id: 62, field: 'textTe', corrected: 'ఫెడరల్ రాజ్యాంగ కోర్టు' },
    { id: 68, field: 'textEn', corrected: 'equal rights under the law' },
    { id: 85, field: 'textZh', corrected: '德国联邦总理府' },
    { id: 93, field: 'textHi', corrected: 'जर्मनी का संघीय गणराज्य' },
    { id: 95, field: 'textFa', corrected: 'رأی‌گیری مخفی' },
    { id: 101, field: 'textZh', corrected: '政治党派' },
    { id: 121, field: 'textTa', corrected: 'ஜெர்மன் கூட்டாட்சி பாராளுமன்றம்' },
    { id: 133, field: 'textZh', corrected: '德国联邦议院' },
    { id: 146, field: 'textEn', corrected: 'program' },
    { id: 146, field: 'textEn', corrected: 'procedure' },
    { id: 146, field: 'textEn', corrected: 'protocol' },
    { id: 146, field: 'textEn', corrected: 'trial/process' },
    { id: 196, field: 'textZh', corrected: '德国州议会' },
    { id: 214, field: 'textEn', corrected: 'nation' },
    { id: 257, field: 'textEn', corrected: 'federal states' },
    { id: 305, field: 'textEn', corrected: 'Federal Constitutional Court of Germany' },
    { id: 338, field: 'textEn', corrected: 'federal republic' },
    { id: 397, field: 'textEn', corrected: 'political parties' },
    { id: 454, field: 'textEn', corrected: 'democracy' }
];

for (const fix of fixes) {
    const { id, field, corrected } = fix;
    const qRegex = new RegExp(`"id":\\s*${id},`);
    const qMatch = qRegex.exec(content);
    if (!qMatch) {
        console.log(`Q${id}: Question not found`);
        continue;
    }
    
    const qStart = qMatch.index;
    const qEnd = content.indexOf('"id":', qStart + 10);
    const block = content.substring(qStart, qEnd > 0 ? qEnd : qStart + 4000);
    
    // Find all occurrences of the field
    const fRegex = new RegExp(`"${field}":\\s*"([^"]*)"`, 'g');
    const matches = [];
    let m;
    while ((m = fRegex.exec(block)) !== null) {
        matches.push(m[1]);
    }
    
    output.push(`Q${id} ${field} -> "${corrected}":`);
    matches.forEach((v, i) => {
        const isTarget = v !== corrected;
        output.push(`  [${i}] "${v}" ${isTarget ? '(NEEDS FIX)' : '(already correct)'}`);
    });
    output.push('');
}

fs.writeFileSync('find-actual-currents-output.txt', output.join('\n'), 'utf8');
console.log('Output written to find-actual-currents-output.txt');
