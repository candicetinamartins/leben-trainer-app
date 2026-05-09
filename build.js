const fs = require('fs');
const path = require('path');

// Simple minification function
function minifyJS(code) {
    return code
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Remove whitespace around operators
        .replace(/\s*([=+\-*/<>!&|,;:{}()\[\]])\s*/g, '$1')
        .trim();
}

function minifyHTML(code) {
    return code
        // Remove HTML comments (but keep conditional comments)
        .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
        // Remove extra whitespace between tags
        .replace(/>\s+</g, '><')
        // Remove whitespace around tags
        .replace(/\s+/g, ' ')
        .trim();
}

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

console.log('Building production version...');

// Read and minify questions.js (data must be loaded before app.js)
let allJS = '';
const questionsPath = path.join(__dirname, 'questions.js');
if (fs.existsSync(questionsPath)) {
    const questionsJS = fs.readFileSync(questionsPath, 'utf8');
    allJS += minifyJS(questionsJS);
    console.log('✓ Minified questions.js');
}

// Read and minify app.js
const appJS = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
allJS += minifyJS(appJS);
fs.writeFileSync(path.join(distDir, 'app.js'), allJS);
console.log('✓ Minified app.js');

// Read and minify index.html
let indexHTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
// Inline all minified JS (questions.js first, then app.js)
indexHTML = indexHTML.replace(
    '<script src="app.js"></script>',
    `<script>${allJS}</script>`
);
const minifiedHTML = minifyHTML(indexHTML);
fs.writeFileSync(path.join(distDir, 'index.html'), minifiedHTML);
console.log('✓ Minified and inlined index.html');

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
