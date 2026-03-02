
const fetch = require('node-fetch'); // or use global fetch in Node 18+
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const url = 'http://localhost:3000/api/worker'; // This won't work if not running local
// But I can try to hit the production URL if I have it
const prodUrl = 'https://www.visualdecompiler.com/api/worker';

async function triggerWorker() {
    console.log(`Triggering worker at ${prodUrl}...`);
    try {
        const res = await fetch(prodUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer OPEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log(`Response: ${text}`);
    } catch (err) {
        console.error('Failed to trigger worker:', err);
    }
}

triggerWorker();
