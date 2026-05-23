const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

// Fix single-image: replace literal \n with actual newline in template literal
const oldSingle = 'class="w-full max-h-48 object-contain bg-gray-50" />\\n                    ${question.copyright';
const newSingle = 'class="w-full max-h-48 object-contain bg-gray-50" />\n                    ${question.copyright';

if (content.includes(oldSingle)) {
    content = content.replace(oldSingle, newSingle);
    console.log('Fixed single image newline');
} else if (content.includes(newSingle)) {
    console.log('Single image already correct');
} else {
    console.log('Single image pattern not found');
}

// Add copyright to multi-image questions
const oldMulti = '${imgs}\n                </div>`;';
const newMulti = '${imgs}\n                </div>\n                ${question.copyright ? `<div class="text-[10px] text-gray-500 mt-1 text-center leading-tight">${question.copyright}</div>` : \'\'}\n            </div>`;';

if (content.includes(oldMulti)) {
    content = content.replace(oldMulti, newMulti);
    console.log('Patched multi image');
} else if (content.includes('${question.copyright ? `<div class="text-[10px] text-gray-500 mt-1 text-center leading-tight">${question.copyright}</div>`')) {
    console.log('Multi image already patched');
} else {
    console.log('Multi image pattern not found');
}

fs.writeFileSync('app.js', content);
console.log('Done');
