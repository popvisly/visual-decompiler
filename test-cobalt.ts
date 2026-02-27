async function run() {
    try {
        console.log("Fetching youtube info with Cobalt v10 API...");
        const url = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'; // Big Buck Bunny

        const res = await fetch('https://co.wuk.sh/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                vCodec: 'h264',
                vQuality: '720',
                aFormat: 'mp3'
            })
        });

        if (!res.ok) {
            console.error("Status error:", res.status);
            const err = await res.text();
            console.error(err);
            return;
        }

        const data = await res.json();
        console.log("Success:", data);

    } catch (e) {
        console.error("Error:", e);
    }
}
run();
