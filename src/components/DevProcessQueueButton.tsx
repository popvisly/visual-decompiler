'use client';

import { useState } from 'react';

export default function DevProcessQueueButton() {
  // Only show in development.
  if (process.env.NODE_ENV !== 'development') return null;

  const [isRunning, setIsRunning] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const runWorkerOnce = async () => {
    setIsRunning(true);
    setLastResult(null);
    try {
      const res = await fetch('/api/worker', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer OPEN',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const text = await res.text();
      setLastResult(text);
    } catch (err: any) {
      setLastResult(err?.message || 'Failed to call /api/worker');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={runWorkerOnce}
        disabled={isRunning}
        className="inline-flex items-center gap-2 rounded-full border border-[#E7DED1] bg-[#FBF7EF] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#141414] hover:bg-white transition disabled:opacity-50"
      >
        {isRunning ? 'Processing…' : 'Process Queue Now (Dev)'}
      </button>

      {lastResult && (
        <pre className="max-w-[52rem] whitespace-pre-wrap break-words rounded-2xl border border-[#E7DED1] bg-white/70 px-4 py-3 text-[11px] text-[#141414]/80">
          {lastResult}
        </pre>
      )}
    </div>
  );
}
