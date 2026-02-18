'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, List, X, Check, AlertCircle } from 'lucide-react';

type BatchStatus = 'pending' | 'queuing' | 'queued' | 'error';
type BatchItem = { url: string; status: BatchStatus; error?: string; jobId?: string };

export default function IngestForm() {
    const [url, setUrl] = useState('');
    const [isIngesting, setIsIngesting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bulkMode, setBulkMode] = useState(false);
    const [bulkText, setBulkText] = useState('');
    const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
    const [isBatching, setIsBatching] = useState(false);
    const router = useRouter();

    // Single URL ingest (existing behavior)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setError(null);
        setIsIngesting(true);
        try {
            const res = await fetch('/api/ingest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mediaUrl: url.trim() }),
            });

            const payload = await res.json().catch(() => null);

            if (!res.ok) {
                const msg = payload?.error || `Ingestion failed (HTTP ${res.status})`;
                throw new Error(msg);
            }

            setUrl('');
            alert('Ad queued for decompilation! It will appear in the dashboard shortly.');
            router.refresh();
        } catch (err: any) {
            console.error(err);
            setError(err?.message || 'Failed to ingest ad.');
        } finally {
            setIsIngesting(false);
        }
    };

    // Batch ingest
    const handleBatch = async () => {
        const urls = bulkText
            .split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 0 && /^https?:\/\//i.test(l));

        if (urls.length === 0) {
            setError('No valid URLs found. Paste one URL per line.');
            return;
        }

        // Deduplicate
        const unique = [...new Set(urls)];
        const items: BatchItem[] = unique.map(u => ({ url: u, status: 'pending' as BatchStatus }));
        setBatchItems(items);
        setIsBatching(true);
        setError(null);

        for (let i = 0; i < items.length; i++) {
            // Update status to queuing
            setBatchItems(prev => prev.map((item, idx) =>
                idx === i ? { ...item, status: 'queuing' } : item
            ));

            try {
                const res = await fetch('/api/ingest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mediaUrl: items[i].url }),
                });

                const payload = await res.json().catch(() => null);

                if (!res.ok) {
                    const msg = payload?.error || `HTTP ${res.status}`;
                    setBatchItems(prev => prev.map((item, idx) =>
                        idx === i ? { ...item, status: 'error', error: msg } : item
                    ));
                } else {
                    setBatchItems(prev => prev.map((item, idx) =>
                        idx === i ? { ...item, status: 'queued', jobId: payload?.job_id } : item
                    ));
                }
            } catch (err: any) {
                setBatchItems(prev => prev.map((item, idx) =>
                    idx === i ? { ...item, status: 'error', error: err?.message || 'Network error' } : item
                ));
            }

            // Small delay to avoid hammering the server
            if (i < items.length - 1) {
                await new Promise(r => setTimeout(r, 300));
            }
        }

        setIsBatching(false);
        router.refresh();
    };

    const queuedCount = batchItems.filter(i => i.status === 'queued').length;
    const errorCount = batchItems.filter(i => i.status === 'error').length;

    return (
        <div className="flex flex-col items-end gap-2">
            {!bulkMode ? (
                <>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="url"
                            placeholder="Paste a direct image/video URL…"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-72 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-slate-50"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isIngesting}
                            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
                        >
                            {isIngesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            {isIngesting ? 'Ingesting…' : 'Decompile'}
                        </button>
                    </form>
                    <button
                        onClick={() => setBulkMode(true)}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                    >
                        <List className="w-3 h-3" />
                        Bulk Mode
                    </button>
                </>
            ) : (
                <div className="w-[32rem] bg-white border border-slate-200 rounded-2xl shadow-lg p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Bulk Ingest</h3>
                        <button onClick={() => { setBulkMode(false); setBatchItems([]); setError(null); }} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {batchItems.length === 0 ? (
                        <>
                            <textarea
                                value={bulkText}
                                onChange={(e) => setBulkText(e.target.value)}
                                placeholder={"Paste URLs, one per line:\nhttps://example.com/ad1.jpg\nhttps://example.com/ad2.mp4\nhttps://example.com/ad3.png"}
                                className="w-full h-40 px-4 py-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-slate-50 resize-none"
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-bold">
                                    {bulkText.split('\n').filter(l => l.trim().length > 0).length} URLs detected
                                </span>
                                <button
                                    onClick={handleBatch}
                                    disabled={isBatching}
                                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
                                >
                                    {isBatching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    Decompile All
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                                {batchItems.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-xs">
                                        <div className="shrink-0">
                                            {item.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                                            {item.status === 'queuing' && <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />}
                                            {item.status === 'queued' && <Check className="w-4 h-4 text-emerald-500" />}
                                            {item.status === 'error' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                                        </div>
                                        <span className={`truncate font-mono ${item.status === 'error' ? 'text-rose-600' : 'text-slate-600'}`}>
                                            {item.url}
                                        </span>
                                        {item.error && (
                                            <span className="shrink-0 text-[9px] text-rose-400 font-bold">{item.error}</span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {!isBatching && (
                                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-500">
                                        ✅ {queuedCount} queued{errorCount > 0 && ` · ❌ ${errorCount} failed`}
                                    </span>
                                    <button
                                        onClick={() => { setBatchItems([]); setBulkText(''); }}
                                        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                                    >
                                        New Batch
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {error && (
                <div className="max-w-[28rem] text-right text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                    {error}
                </div>
            )}
        </div>
    );
}
