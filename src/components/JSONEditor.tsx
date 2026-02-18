'use client';

import { useState } from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function JSONEditor({
    id,
    initialValue
}: {
    id: string;
    initialValue: any
}) {
    const [json, setJson] = useState(JSON.stringify(initialValue, null, 2));
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        try {
            // Validate JSON locally first
            const parsed = JSON.parse(json);

            const res = await fetch(`/api/digests/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    digest: parsed,
                    status: 'processed'
                }),
            });

            if (!res.ok) throw new Error('Failed to update digest');

            router.refresh();
            alert('Digest published successfully!');
        } catch (err: any) {
            setError(err.message || 'Invalid JSON format');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Editor: Manual Refinement</span>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg text-[10px] font-bold transition-all disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                    Publish Changes
                </button>
            </div>

            <div className="relative flex-1">
                <textarea
                    value={json}
                    onChange={(e) => setJson(e.target.value)}
                    spellCheck={false}
                    className="w-full h-[400px] bg-transparent text-indigo-300 font-mono text-xs p-6 focus:outline-none resize-none selection:bg-indigo-500/30"
                />

                {error && (
                    <div className="absolute bottom-4 left-4 right-4 bg-rose-900/90 backdrop-blur-sm border border-rose-500/50 p-3 rounded-xl flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 text-rose-300" />
                        <span className="text-[10px] font-bold text-rose-100">{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
