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
            alert('Ad queued for decompilation! It will appear in the dashboard shortly.');
            router.refresh();
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
                            className="w-56 px-3 py-1.5 text-xs bg-white/10 text-txt-on-dark placeholder-txt-on-dark-muted border border-white/10 rounded-lg focus-accent transition-all"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isIngesting}
                            className="flex items-center gap-1.5 bg-accent text-surface px-4 py-1.5 rounded-lg text-xs font-bold hover:brightness-110 transition-all disabled:opacity-50"
                        >
                            {isIngesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                            {isIngesting ? 'Ingesting…' : 'Decompile'}
                        </button>
                    </form>
                    <button
                        onClick={() => setBulkMode(true)}
                        className="flex items-center gap-1.5 text-[9px] font-bold text-txt-on-dark-muted uppercase tracking-[0.15em] hover:text-accent transition-colors"
                    >
                        <List className="w-3 h-3" />
                        Bulk Mode
                    </button>
                </>
            ) : (
                <div className="w-[30rem] glass-dark rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-accent uppercase tracking-[0.15em]">Bulk Ingest</h3>
                        <button onClick={() => { setBulkMode(false); setBatchItems([]); setErrorObj(null); }} className="text-txt-on-dark-muted hover:text-txt-on-dark transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {batchItems.length === 0 ? (
                        <>
                            <textarea
                                value={bulkText}
                                onChange={(e) => setBulkText(e.target.value)}
                                placeholder={"Paste URLs, one per line:\nhttps://example.com/ad1.jpg\nhttps://example.com/ad2.mp4"}
                                className="w-full h-36 px-4 py-3 text-xs font-mono bg-white/5 text-txt-on-dark placeholder-txt-on-dark-muted border border-white/10 rounded-xl focus-accent transition-all resize-none"
                            />
                            <div className="flex items-center justify-between">
                                <span className="spec-label-dark">
                                    {bulkText.split('\n').filter(l => l.trim().length > 0).length} URLs detected
                                </span>
                                <button
                                    onClick={handleBatch}
                                    disabled={isBatching}
                                    className="flex items-center gap-2 bg-accent text-surface px-5 py-2 rounded-xl text-xs font-bold hover:brightness-110 transition-all disabled:opacity-50"
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
                                            {item.status === 'error' && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
                                        </div>
                                        <span className={`truncate font-mono text-[11px] ${item.status === 'error' ? 'text-red-400' : 'text-txt-on-dark-muted'}`}>
                                            {item.url}
                                        </span>
                                        {item.error && <span className="shrink-0 text-[9px] text-red-400 font-bold">{item.error}</span>}
                                    </div>
                                ))}
                            </div>
                            {!isBatching && (
                                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                    <span className="spec-label-dark">
                                        ✅ {queuedCount} queued{errorCount > 0 && ` · ❌ ${errorCount} failed`}
                                    </span>
                                    <button
                                        onClick={() => { setBatchItems([]); setBulkText(''); }}
                                        className="text-[9px] font-bold text-txt-on-dark-muted uppercase tracking-[0.15em] hover:text-accent transition-colors"
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
