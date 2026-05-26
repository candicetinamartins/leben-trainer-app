const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Fix accept handler
content = content.replace(
    `document.getElementById('consent-accept').addEventListener('click', function() {
                setAdConsent('accepted');
                updateGoogleConsent(true);
                hideConsentBanner();
                loadAdSense();
            });`,
    `document.getElementById('consent-accept').addEventListener('click', function() {
                try { setAdConsent('accepted'); } catch(e) {}
                try { updateGoogleConsent(true); } catch(e) {}
                hideConsentBanner();
                try { loadAdSense(); } catch(e) {}
            });`
);

// Fix reject handler
content = content.replace(
    `document.getElementById('consent-reject').addEventListener('click', function() {
                setAdConsent('rejected');
                updateGoogleConsent(false);
                hideConsentBanner();
            });`,
    `document.getElementById('consent-reject').addEventListener('click', function() {
                try { setAdConsent('rejected'); } catch(e) {}
                try { updateGoogleConsent(false); } catch(e) {}
                hideConsentBanner();
            });`
);

fs.writeFileSync('index.html', content);
console.log('Fixed consent handlers in index.html');
