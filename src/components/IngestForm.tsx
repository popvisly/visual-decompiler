'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus } from 'lucide-react';

export default function IngestForm() {
    const [url, setUrl] = useState('');
    const [isIngesting, setIsIngesting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsIngesting(true);
        try {
            const res = await fetch('/api/ingest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mediaUrl: url }),
            });

            if (!res.ok) throw new Error('Ingestion failed');

            setUrl('');
            router.refresh(); // Refresh to show new ad
        } catch (err) {
            console.error(err);
            alert('Failed to ingest ad. Check console.');
        } finally {
            setIsIngesting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="url"
                placeholder="Paste ad image URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-64 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-slate-50"
                required
            />
            <button
                type="submit"
                disabled={isIngesting}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
            >
                {isIngesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {isIngesting ? 'Ingesting...' : 'Decompile'}
            </button>
        </form>
    );
}
