import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Single image copyright
old1 = '<img src="${question.image}" class="w-full max-h-48 object-contain bg-gray-50" />\n                </div>`;'
new1 = '<img src="${question.image}" class="w-full max-h-48 object-contain bg-gray-50" />\n                    ${question.copyright ? `<div class="text-[10px] text-gray-500 mt-1 text-center px-2 pb-1">${question.copyright}</div>` : \'\'}\n                </div>`;'

if old1 in content:
    content = content.replace(old1, new1)
    print('Fixed single image')
else:
    print('Single image pattern not found')

# Multi image copyright
old2 = '${imgs}\n                </div>\n            </div>`;'
new2 = '${imgs}\n                </div>\n                ${question.copyright ? `<div class="text-[10px] text-gray-500 mt-1 text-center leading-tight">${question.copyright}</div>` : \'\'}\n            </div>`;'

if old2 in content:
    content = content.replace(old2, new2)
    print('Fixed multi image')
else:
    print('Multi image pattern not found')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
