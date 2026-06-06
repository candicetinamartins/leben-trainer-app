const fs = require('fs');
const content = fs.readFileSync('./questions.js', 'utf8');

// Use regex to extract question blocks
const blocks = content.split(/(?=\{\s*\n\s*"id"\s*:\s*\d+)/);
let emptyTrans = [];
let emptyAnswerText = [];
let brokenImages = [];

for (const block of blocks) {
    const idMatch = block.match(/"id"\s*:\s*(\d+)/);
    if (!idMatch) continue;
    const id = parseInt(idMatch[1]);

    // Check for empty translations
    const textFields = ['questionEn', 'questionTr', 'textEn', 'textTr', 'textAr', 'textZh', 'textFa', 'textRu'];
    for (const field of textFields) {
        const match = block.match(new RegExp('"' + field + '"\\s*:\\s*""'));
        if (match) {
            emptyTrans.push({ id, field });
        }
    }

    // Check for empty answer text fields
    const ansTextMatch = block.match(/"text"\s*:\s*""/);
    if (ansTextMatch) {
        emptyAnswerText.push(id);
    }

    // Check image paths
    const imgMatch = block.match(/"image"\s*:\s*"([^"]+)"/);
    if (imgMatch) {
        const path = imgMatch[1];
        if (!path.startsWith('images/')) {
            brokenImages.push({ id, path });
        }
    }
}

if (emptyTrans.length) {
    console.log('Empty translations found:', emptyTrans.length);
    emptyTrans.slice(0, 10).forEach(x => console.log(`  Q${x.id}: ${x.field}`));
    if (emptyTrans.length > 10) console.log(`  ... and ${emptyTrans.length - 10} more`);
}

if (emptyAnswerText.length) {
    console.log('Answers with empty text:', [...new Set(emptyAnswerText)].join(', '));
}

if (brokenImages.length) {
    console.log('Unusual image paths:', brokenImages.map(x => `Q${x.id}: ${x.path}`).join(', '));
}

if (!emptyTrans.length && !emptyAnswerText.length && !brokenImages.length) {
    console.log('No empty translations, empty answers, or broken image paths found.');
}
