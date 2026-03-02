
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

// I need a real session cookie to test this because it's protected by Clerk
// But I can try to hit it and see if I get a 401 (expected) vs a 405 or 404.

async function testDelete() {
    const url = 'https://www.visualdecompiler.com/api/ads/actions/bulk-delete';
    console.log(`Testing POST at ${url}...`);
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Missing Authorization/Cookie
            },
            body: JSON.stringify({ ids: ['test-id'] })
        });
        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log(`Response: ${text}`);
    } catch (err) {
        console.error('Failed to test delete:', err);
    }
}

testDelete();
