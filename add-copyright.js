const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// Add copyright to single-image questions
content = content.replace(
    '<img src="${question.image}" class="w-full max-h-48 object-contain bg-gray-50" />\n                </div>`;',
    `<img src="${question.image}" class="w-full max-h-48 object-contain bg-gray-50" />
                    ${question.copyright ? \`<div class="text-[10px] text-gray-500 mt-1 text-center px-2 pb-1">${question.copyright}</div>\` : ''}
                </div>\`;`
);

// Add copyright to multi-image questions
content = content.replace(
    '${imgs}\n                </div>\n            </div>`;',
    `${imgs}
                </div>
                ${question.copyright ? \`<div class="text-[10px] text-gray-500 mt-1 text-center leading-tight">${question.copyright}</div>\` : ''}
            </div>\`;`
);

fs.writeFileSync('app.js', content);
console.log('Copyright display added to images.');
