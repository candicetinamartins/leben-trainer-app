const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

const oldSingle = '<img src="${question.image}" class="w-full max-h-48 object-contain bg-gray-50" />';
const newSingle = oldSingle + '\n                    ${question.copyright ? `<div class="text-[10px] text-gray-500 mt-1 text-center px-2 pb-1">${question.copyright}</div>` : \'\'}';

if (content.includes(oldSingle)) {
    content = content.replace(oldSingle, newSingle);
    console.log('Patched single image');
} else {
    console.log('Single image pattern not found');
}

const oldMulti = '${imgs}\n                </div>`;';
const newMulti = '${imgs}\n                </div>\n                ${question.copyright ? `<div class="text-[10px] text-gray-500 mt-1 text-center leading-tight">${question.copyright}</div>` : \'\'}\n            </div>`;';

if (content.includes(oldMulti)) {
    content = content.replace(oldMulti, newMulti);
    console.log('Patched multi image');
} else {
    console.log('Multi image pattern not found');
}

fs.writeFileSync('app.js', content);
console.log('Done');
