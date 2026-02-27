const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log(`BROWSER ERROR: ${msg.text()}`);
        }
    });

    page.on('pageerror', err => {
        console.log(`PAGE ERROR: ${err.message}`);
    });

    // Attempting to load the dashboard locally
    try {
        await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
        console.log("Page loaded. If there's a client-side exception, it should appear above.");
    } catch (e) {
        console.error("Navigation failed:", e.message);
    }

    await browser.close();
})();
