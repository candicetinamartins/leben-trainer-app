const fs = require('fs');

const questionsContent = fs.readFileSync('questions.js', 'utf8');

// List of skipped fixes with their expected current values
const skippedFixes = [
    { id: 4, field: 'textAr', current: 'اليقظة' },
    { id: 4, field: 'textFa', current: 'هوشیاری' },
    { id: 4, field: 'textRu', current: 'Бдительность' },
    { id: 4, field: 'textTa', current: 'விழிப்புணர்ச்சி' },
    { id: 4, field: 'textTe', current: 'జాగరూకత' },
    { id: 5, field: 'textTa', current: 'தேர்தலின் போது வாக்காளர்கள் செல்வாக்கு செலுத்தப்படவோ அல்லது கட்டாயப்படுத்தவோ கூடாது.' },
    { id: 13, field: 'textEn', current: 'all members of the parliment who do not belong to the governing party/parties.' },
    { id: 14, field: 'textFa', current: 'يمكنني ارتداء رموز النازية أو حماس أو تنظيم الدولة الإسلامية علناً.' },
    { id: 15, field: 'textEn', current: 'freedom to choose one\'s profession' },
    { id: 16, field: 'textEn', current: 'public defamation or knowingly false allegations' },
    { id: 24, field: 'textRu', current: 'свобода собраний' },
    { id: 38, field: 'textEn', current: 'state' },
    { id: 58, field: 'textZh', current: '' },
    { id: 62, field: 'textTe', current: 'సంఘీయ రాజ్యాంగ న్యాయస్థానం' },
    { id: 68, field: 'textEn', current: 'equal rights' },
    { id: 85, field: 'textZh', current: '联邦总理府' },
    { id: 93, field: 'textHi', current: 'संघीय गणराज्य' },
    { id: 95, field: 'textFa', current: 'رأی مخفی' },
    { id: 101, field: 'textZh', current: '政党' },
    { id: 121, field: 'textTa', current: 'கூட்டாட்சி நாடாளுமன்றம்' },
    { id: 133, field: 'textZh', current: '联邦议院' },
    { id: 196, field: 'textZh', current: '州议会' },
    { id: 214, field: 'textEn', current: 'Nation' },
    { id: 257, field: 'textEn', current: 'Federal States' },
    { id: 305, field: 'textEn', current: 'Federal Constitutional Court' },
    { id: 338, field: 'textEn', current: 'Federal Republic' },
    { id: 397, field: 'textEn', current: 'Political Parties' },
    { id: 454, field: 'textEn', current: 'Democracy' }
];

for (const fix of skippedFixes) {
    const { id, field, current } = fix;
    
    // Find the question block
    const questionRegex = new RegExp(`"id":\\s*${id},`);
    const qMatch = questionRegex.exec(questionsContent);
    
    if (!qMatch) {
        console.log(`Q${id}: Question not found`);
        continue;
    }
    
    const qStart = qMatch.index;
    const qEnd = questionsContent.indexOf('"id":', qStart + 10);
    const questionBlock = questionsContent.substring(qStart, qEnd > 0 ? qEnd : qStart + 3000);
    
    // Search for the field in the question block
    const fieldRegex = new RegExp(`"${field}":\\s*"([^"]*)"`, 'g');
    const matches = [];
    let m;
    while ((m = fieldRegex.exec(questionBlock)) !== null) {
        matches.push(m[1]);
    }
    
    // Also do exact search for the expected string
    const exactSearch = `"${field}": "${current}"`;
    const foundExact = questionBlock.includes(exactSearch);
    
    console.log(`Q${id} ${field}:`);
    console.log(`  Expected: "${current}"`);
    console.log(`  Exact match in block: ${foundExact}`);
    console.log(`  Found ${matches.length} occurrences:`);
    matches.forEach((v, i) => {
        const match = v === current ? ' ✓' : ' ✗';
        console.log(`    [${i}] "${v}"${match}`);
    });
    console.log('');
}
