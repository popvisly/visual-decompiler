'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus } from 'lucide-react';

export default function IngestForm() {
    const [url, setUrl] = useState('');
    const [isIngesting, setIsIngesting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
            router.refresh();
        } catch (err: any) {
            console.error(err);
            setError(err?.message || 'Failed to ingest ad.');
        } finally {
            setIsIngesting(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-2">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="url"
                    placeholder="Paste a direct image/video URL (png/jpg/webp/gif/mp4/mov)…"
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

            {error && (
                <div className="max-w-[28rem] text-right text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                    {error}
                </div>
            )}
        </div>
    );
}
