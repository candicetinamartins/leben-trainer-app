const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

const oldBlock = `                    <div class="flex gap-2 overflow-x-auto no-scrollbar">
                    \${imgs}
                </div>\`;`;

const newBlock = `                    <div class="flex gap-2 overflow-x-auto no-scrollbar">
                        \${imgs}
                    </div>
                    \${question.copyright ? \`<div class="text-[10px] text-gray-500 mt-1 text-center leading-tight">\${question.copyright}</div>\` : ''}
                </div>\`;`;

if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    fs.writeFileSync(appPath, content);
    console.log('Fixed multi-image block');
} else {
    console.log('Multi-image block not found as expected');
    // Debug: print lines around the area
    const lines = content.split(/\r?\n/);
    lines.forEach((line, idx) => {
        if (line.includes('flex gap-2 overflow-x-auto no-scrollbar')) {
            console.log('Found at line', idx + 1);
            console.log('Line content:', JSON.stringify(line));
            console.log('Next line:', JSON.stringify(lines[idx + 1]));
            console.log('Next next line:', JSON.stringify(lines[idx + 2]));
        }
    });
}
