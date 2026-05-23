const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'questions.js'), 'utf8');

// Simple regex approach - find image and copyright occurrences
const imageCount = (content.match(/"image"\s*:/g) || []).length;
const imagesCount = (content.match(/"images"\s*:\s*\[/g) || []).length;
const copyrightCount = (content.match(/"copyright"\s*:/g) || []).length;

console.log('Single-image questions:', imageCount);
console.log('Multi-image questions:', imagesCount);
console.log('Total image entries:', imageCount + imagesCount);
console.log('Copyright fields:', copyrightCount);
console.log('');
console.log(copyrightCount > 0 
  ? 'Some images have copyright info, but NOT all.' 
  : 'No images have copyright info.');
console.log('Missing copyright for:', (imageCount + imagesCount) - copyrightCount, 'image entries');

// Show which ones have copyright
const copyrightMatches = content.match(/"copyright"\s*:\s*"[^"]+"/g) || [];
console.log('\nCopyright values found:');
copyrightMatches.forEach(m => console.log(' -', m));
