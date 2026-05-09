const fs = require('fs');
const path = require('path');

// Safe JS processing: remove comments and extra blank lines, but keep structure
function processJS(code) {
    const lines = code.split('\n');
    const result = [];
    let inBlockComment = false;
    
    for (let line of lines) {
        let processed = line;
        
        if (inBlockComment) {
            const endIndex = processed.indexOf('*/');
            if (endIndex !== -1) {
                processed = processed.substring(endIndex + 2);
                inBlockComment = false;
            } else {
                continue;
            }
        }
        
        while (processed.includes('/*')) {
            const start = processed.indexOf('/*');
            const end = processed.indexOf('*/', start);
            if (end !== -1) {
                processed = processed.substring(0, start) + processed.substring(end + 2);
            } else {
                processed = processed.substring(0, start);
                inBlockComment = true;
                break;
            }
        }
        
        const commentIndex = processed.indexOf('//');
        if (commentIndex !== -1) {
            processed = processed.substring(0, commentIndex);
        }
        
        processed = processed.trimEnd();
        if (processed.length > 0) {
            result.push(processed);
        }
    }
    
    return result.join('\n');
}

function minifyHTML(code) {
    return code
        .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
        .replace(/>\s+</g, '><')
        .replace(/\s+/g, ' ')
        .trim();
}

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

console.log('Building production version...');

// Process and copy questions.js
const questionsPath = path.join(__dirname, 'questions.js');
if (fs.existsSync(questionsPath)) {
    const questionsJS = fs.readFileSync(questionsPath, 'utf8');
    fs.writeFileSync(path.join(distDir, 'questions.js'), processJS(questionsJS));
    console.log('✓ Processed questions.js');
}

// Process and copy app.js
const appJS = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
fs.writeFileSync(path.join(distDir, 'app.js'), processJS(appJS));
console.log('✓ Processed app.js');

// Copy and minify index.html (keep script tags as-is)
let indexHTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const minifiedHTML = minifyHTML(indexHTML);
fs.writeFileSync(path.join(distDir, 'index.html'), minifiedHTML);
console.log('✓ Minified index.html');

// Copy other necessary files
const filesToCopy = ['privacy.html', 'LICENSE'];
filesToCopy.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        if (file.endsWith('.html')) {
            content = minifyHTML(content);
        }
        fs.writeFileSync(path.join(distDir, file), content);
        console.log(`✓ Copied ${file}`);
    }
});

// Copy data directory
const dataDir = path.join(__dirname, 'data');
const distDataDir = path.join(distDir, 'data');
if (fs.existsSync(dataDir)) {
    if (!fs.existsSync(distDataDir)) {
        fs.mkdirSync(distDataDir);
    }
    fs.readdirSync(dataDir).forEach(file => {
        fs.copyFileSync(
            path.join(dataDir, file),
            path.join(distDataDir, file)
        );
    });
    console.log('✓ Copied data directory');
}

// Copy images directory if exists
function copyDirRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const imagesDir = path.join(__dirname, 'images');
const distImagesDir = path.join(distDir, 'images');
if (fs.existsSync(imagesDir)) {
    copyDirRecursive(imagesDir, distImagesDir);
    console.log('✓ Copied images directory');
}

console.log('\n✅ Build complete! Deploy the "dist" folder to GitHub Pages.');
console.log('Your source code remains private in the main repo.');
