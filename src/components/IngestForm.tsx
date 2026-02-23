'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, List, X, Check, AlertCircle } from 'lucide-react';

type BatchStatus = 'pending' | 'queuing' | 'queued' | 'error';
type BatchItem = { url: string; status: BatchStatus; error?: string; jobId?: string };

export default function IngestForm() {
    const [url, setUrl] = useState('');
    const [isIngesting, setIsIngesting] = useState(false);
    const [errorObj, setErrorObj] = useState<{ message: string; code?: string } | null>(null);
    const [bulkMode, setBulkMode] = useState(false);
    const [bulkText, setBulkText] = useState('');
    const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
    const [isBatching, setIsBatching] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        setErrorObj(null);
        setIsIngesting(true);
        try {
            const res = await fetch('/api/ingest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mediaUrl: url.trim() }),
            });
            const payload = await res.json().catch(() => null);
            if (!res.ok) {
                const err: any = new Error(payload?.message || payload?.error || `Ingestion failed (HTTP ${res.status})`);
                err.code = payload?.error;
                throw err;
            }
            setUrl('');
            // alert('Ad queued for decompilation! It will appear in the dashboard shortly.');
            router.push(`/dashboard/processing/${payload.job_id}`);
        } catch (err: any) {
            console.error(err);
            setErrorObj({ message: err?.message || 'Failed to ingest ad.', code: err?.code });
        } finally {
            setIsIngesting(false);
        }
    };

    const handleBatch = async () => {
        const urls = bulkText
            .split(/\s+/)
            .map(l => l.trim())
            .filter(l => l.length > 0 && /^https?:\/\//i.test(l));
        if (urls.length === 0) { setErrorObj({ message: 'No valid URLs found. Paste one URL per line.' }); return; }
        const unique = [...new Set(urls)];
        const items: BatchItem[] = unique.map(u => ({ url: u, status: 'pending' as BatchStatus }));
        setBatchItems(items);
        setIsBatching(true);
        setErrorObj(null);

        for (let i = 0; i < items.length; i++) {
            setBatchItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'queuing' } : item));
            try {
                const res = await fetch('/api/ingest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mediaUrl: items[i].url }),
                });
                const payload = await res.json().catch(() => null);
                if (!res.ok) {
                    setBatchItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'error', error: payload?.message || payload?.error || `HTTP ${res.status}` } : item));
                } else {
                    setBatchItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'queued', jobId: payload?.job_id } : item));
                }
            } catch (err: any) {
                setBatchItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'error', error: err?.message || 'Network error' } : item));
            }
            if (i < items.length - 1) await new Promise(r => setTimeout(r, 300));
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
                            placeholder="Paste image/video URL…"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-56 px-3 py-1.5 text-xs bg-black/5 text-[#141414] placeholder-[#141414]/40 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all font-medium"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isIngesting}
                            className="flex items-center gap-1.5 bg-[#141414] text-[#FBF7EF] px-4 py-1.5 rounded-lg text-xs font-bold hover:-translate-y-[1px] shadow-[0_4px_12px_rgba(20,20,20,0.15)] hover:shadow-[0_6px_16px_rgba(20,20,20,0.2)] transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            {isIngesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                            {isIngesting ? 'Ingesting…' : 'Decompile'}
                        </button>
                    </form>
                    <button
                        onClick={() => setBulkMode(true)}
                        className="flex items-center gap-1.5 text-[9px] font-bold text-[#141414]/40 uppercase tracking-[0.15em] hover:text-[#141414] transition-colors"
                    >
                        <List className="w-3 h-3" />
                        Bulk Mode
                    </button>
                </>
            ) : (
                <div className="w-[30rem] bg-black/5 border border-black/10 shadow-[0_10px_30px_rgba(20,20,20,0.06)] backdrop-blur-xl rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-bold text-[#141414]/40 uppercase tracking-[0.15em]">Bulk Ingest</h3>
                        <button onClick={() => { setBulkMode(false); setBatchItems([]); setErrorObj(null); }} className="text-[#141414]/40 hover:text-[#141414] transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {batchItems.length === 0 ? (
                        <>
                            <textarea
                                value={bulkText}
                                onChange={(e) => setBulkText(e.target.value)}
                                placeholder={"Paste URLs, one per line:\nhttps://example.com/ad1.jpg\nhttps://example.com/ad2.mp4"}
                                className="w-full h-36 px-4 py-3 text-xs font-mono bg-black/5 text-[#141414] placeholder-[#141414]/30 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-[#141414]/40 uppercase tracking-[0.15em]">
                                    {bulkText.split('\n').filter(l => l.trim().length > 0).length} URLs detected
                                </span>
                                <button
                                    onClick={handleBatch}
                                    disabled={isBatching}
                                    className="flex items-center gap-2 bg-[#141414] text-[#FBF7EF] px-5 py-2 rounded-xl text-xs font-bold hover:-translate-y-[1px] shadow-[0_4px_12px_rgba(20,20,20,0.15)] hover:shadow-[0_6px_16px_rgba(20,20,20,0.2)] transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                                >
                                    {isBatching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                                    Decompile All
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="max-h-56 overflow-y-auto space-y-2 pr-1 dark-scroll">
                                {batchItems.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-xs">
                                        <div className="shrink-0">
                                            {item.status === 'pending' && <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20" />}
                                            {item.status === 'queuing' && <Loader2 className="w-3.5 h-3.5 text-accent animate-spin" />}
                                            {item.status === 'queued' && <Check className="w-3.5 h-3.5 text-green-400" />}
                                            {item.status === 'error' && <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
                                        </div>
                                        <span className={`truncate font-mono text-[11px] ${item.status === 'error' ? 'text-red-500' : 'text-[#141414]/70'}`}>
                                            {item.url}
                                        </span>
                                        {item.error && <span className="shrink-0 text-[9px] text-red-500 font-bold">{item.error}</span>}
                                    </div>
                                ))}
                            </div>
                            {!isBatching && (
                                <div className="flex items-center justify-between pt-3 border-t border-black/10">
                                    <span className="text-[9px] font-bold text-[#141414]/40 uppercase tracking-[0.15em]">
                                        ✅ {queuedCount} queued{errorCount > 0 && ` · ❌ ${errorCount} failed`}
                                    </span>
                                    <button
                                        onClick={() => { setBatchItems([]); setBulkText(''); }}
                                        className="text-[9px] font-bold text-[#141414]/40 uppercase tracking-[0.15em] hover:text-[#141414] transition-colors"
                                    >
                                        New Batch
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {errorObj && (
                <div className={`max-w-[26rem] text-right text-[11px] font-bold rounded-xl px-4 py-3 border ${errorObj.code === 'LIMIT_REACHED'
                    ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                    : 'text-red-400 bg-red-500/10 border-red-500/20'
                    }`}>
                    <div className="flex flex-col gap-2 items-end">
                        <span>{errorObj.message}</span>
                        {errorObj.code === 'LIMIT_REACHED' && (
                            <a href="/pricing" className="inline-flex items-center gap-1.5 bg-yellow-400 text-[#141414] px-4 py-1.5 rounded-lg text-xs font-bold hover:brightness-110 transition-all mt-1">
                                Upgrade to Pro
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
