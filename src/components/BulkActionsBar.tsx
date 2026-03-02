'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelection } from '@/components/SelectionProvider';
import { Trash2, X, Loader2 } from 'lucide-react';

export default function BulkActionsBar() {
    const { selectedIds, count, clearAll } = useSelection();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (count === 0) return null;

    const handleDelete = async () => {
        if (!confirm(`Delete ${count} ad${count > 1 ? 's' : ''}? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            const res = await fetch('/api/ads/actions/bulk-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: Array.from(selectedIds) }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Failed to delete ads');
            }

            clearAll();
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Failed to delete ads');
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#141414] text-[#FBF7EF] rounded-2xl shadow-[0_20px_60px_rgba(20,20,20,0.4)] border border-white/10 backdrop-blur-xl px-6 py-4 flex items-center gap-6">
                {/* Count */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                        <span className="text-[13px] font-bold text-accent">{count}</span>
                    </div>
                    <span className="text-[13px] font-medium">
                        {count} ad{count > 1 ? 's' : ''} selected
                    </span>
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-white/10" />

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/30 text-[11px] font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </>
                        )}
                    </button>

                    <button
                        onClick={clearAll}
                        disabled={isDeleting}
                        className="p-2 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Clear selection"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="text-red-400 text-[11px] font-medium">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
