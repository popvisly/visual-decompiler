import fetch from 'node-fetch';

async function testWorker() {
    console.log('Hitting POST /api/worker...');
    const res = await fetch('http://localhost:3000/api/worker', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer OPEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    const data = await res.json();
    console.log('Worker Result:', JSON.stringify(data, null, 2));
}

testWorker().catch(console.error);
