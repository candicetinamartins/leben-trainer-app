const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertSVGtoPNG() {
    const svgPath = path.join(__dirname, 'leben_in_deutschland_trainer_icon.svg');
    const outputPath = path.join(__dirname, 'leben_in_deutschland_trainer_icon.png');
    
    // Read SVG content
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    const dataUri = 'data:image/svg+xml;base64,' + Buffer.from(svgContent).toString('base64');
    
    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport to desired size (1024x1024 for ~150KB PNG)
    await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 });
    
    // Navigate to the SVG
    await page.goto(dataUri, { waitUntil: 'networkidle0' });
    
    // Take screenshot
    await page.screenshot({ 
        path: outputPath,
        type: 'png',
        omitBackground: false
    });
    
    await browser.close();
    
    // Check file size
    const stats = fs.statSync(outputPath);
    const sizeKB = stats.size / 1024;
    console.log(`PNG created: ${outputPath}`);
    console.log(`Size: ${sizeKB.toFixed(2)} KB`);
    
    if (sizeKB > 160) {
        console.log('File is larger than 150KB, trying smaller dimensions...');
        // Will need to retry with smaller size
    }
}

convertSVGtoPNG().catch(console.error);
