
const fetch = require('node-fetch'); // or use global fetch in Node 18+
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const url = 'http://localhost:3000/api/worker'; // This won't work if not running local
// But I can try to hit the production URL if I have it
const prodUrl = 'https://www.visualdecompiler.com/api/digests/8cd7490a-bb53-4837-a0bf-4cde664c76a2';

async function triggerDigest() {
    console.log(`Checking digest at ${prodUrl}...`);
    try {
        const res = await fetch(prodUrl, {
            method: 'GET'
        });
        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log(`Response: ${text.substring(0, 100)}...`);
    } catch (err) {
        console.error('Failed to check digest:', err);
    }
}

triggerDigest();
