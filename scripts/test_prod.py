import os
import time
import requests
import json
import threading

def load_env():
    try:
        with open('.env.local', 'r') as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                if '=' in line:
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip().strip("'").strip('"')
                    os.environ[key] = value
    except Exception as e:
        print(f"Warning: Could not load .env.local: {e}")

load_env()

URL = "https://visual-decompiler.vercel.app/api/ingest"
WORKER_URL = "https://visual-decompiler.vercel.app/api/worker"
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("FATAL: Missing Supabase credentials in .env.local")
    exit(1)

print("--- VERCEL PROD SANITY TEST START ---")
fresh_url = f"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&t={int(time.time())}"

print(f"\n[1] Ingest request")
print(f"- URL called: {URL}")
res = requests.post(URL, json={"mediaUrl": fresh_url})
print(f"- HTTP status: {res.status_code}")
data = res.json()
job_id = data.get("job_id")
if not job_id:
    print("- FAILED TO INGEST:", data)
    exit(1)
print(f"- returned job_id (UUID): {job_id}")

print(f"\n[2] Immediate worker kick")
print("- POST /api/worker")

def kick_worker():
    start_t = time.time()
    try:
        w_res = requests.post(WORKER_URL, headers={"Authorization": "Bearer OPEN"}, timeout=350)
        print(f"\n  [WORKER RESPONSE] status: {w_res.status_code} | body: {w_res.text} (took {time.time() - start_t:.1f}s)")
    except Exception as e:
        print(f"\n  [WORKER REQUEST FAILED OR TIMED OUT]: {e} (took {time.time() - start_t:.1f}s)")

worker_thread = threading.Thread(target=kick_worker)
worker_thread.start()

print(f"\n[3] Poll job status (Supabase)")
start_time = time.time()
for i in range(18):
    elapsed = int(time.time() - start_time)
    s_res = requests.get(
        f"{SUPABASE_URL}/rest/v1/ad_digests?id=eq.{job_id}&select=status",
        headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    )
    s_data = s_res.json()
    status = s_data[0]["status"] if s_data else "unknown"
    print(f"- status at T+{elapsed}s: {status}")
    
    if status in ["processed", "needs_review", "failed"]:
        print(f"\n- final terminal state: {status}")
        print(f"- Public Report URL: https://visual-decompiler.vercel.app/report/{job_id}")
        # wait a bit for worker thread to print its output if it is arriving right now
        time.sleep(2)
        os._exit(0)
        
    time.sleep(10)

print("\n[!] Timeout polling DB after 180s")
os._exit(1)
