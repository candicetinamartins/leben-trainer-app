const fs = require('fs');

let lines = fs.readFileSync('index.html', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
    // Fix accept handler lines
    if (lines[i].includes("setAdConsent('accepted')")) {
        lines[i] = lines[i].replace("setAdConsent('accepted');", "try { setAdConsent('accepted'); } catch(e) {}");
    }
    if (lines[i].includes("updateGoogleConsent(true)") && !lines[i].includes('try')) {
        lines[i] = lines[i].replace("updateGoogleConsent(true);", "try { updateGoogleConsent(true); } catch(e) {}");
    }
    if (lines[i].includes("loadAdSense()") && !lines[i].includes('try')) {
        lines[i] = lines[i].replace("loadAdSense();", "try { loadAdSense(); } catch(e) {}");
    }
    // Fix reject handler lines
    if (lines[i].includes("setAdConsent('rejected')")) {
        lines[i] = lines[i].replace("setAdConsent('rejected');", "try { setAdConsent('rejected'); } catch(e) {}");
    }
    if (lines[i].includes("updateGoogleConsent(false)") && !lines[i].includes('try')) {
        lines[i] = lines[i].replace("updateGoogleConsent(false);", "try { updateGoogleConsent(false); } catch(e) {}");
    }
}

fs.writeFileSync('index.html', lines.join('\n'));
console.log('Fixed consent handlers in index.html');
