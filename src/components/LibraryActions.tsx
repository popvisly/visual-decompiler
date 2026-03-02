'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelection } from '@/components/SelectionProvider';
import { Trash2, X, Loader2, Settings } from 'lucide-react';
import Link from 'next/link';

export default function LibraryActions() {
    const { selectedIds, count, clearAll } = useSelection();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
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
            setIsConfirming(false);
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Failed to delete ads');
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            {/* Selection/Delete Cluster */}
            {count > 0 && (
                <div className="flex items-center gap-2 animate-in slide-in-from-right-4 fade-in duration-300">
                    {isConfirming ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full shadow-sm animate-in zoom-in-95 duration-200">
                            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest whitespace-nowrap">
                                Delete {count} item{count !== 1 ? 's' : ''}?
                            </span>
                            <div className="flex items-center gap-1.5 ml-2">
                                <button
                                    onClick={() => setIsConfirming(false)}
                                    disabled={isDeleting}
                                    className="px-3 py-1.5 rounded-full text-[9px] font-bold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 uppercase tracking-widest transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="px-4 py-1.5 rounded-full bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center gap-2 shadow-sm"
                                >
                                    {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                    {isDeleting ? 'Deleting' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="px-4 py-2 bg-white border border-[#E7DED1] rounded-full shadow-sm flex items-center gap-3">
                                <span className="text-[10px] font-bold text-[#141414] uppercase tracking-widest leading-none">
                                    {count} Selected
                                </span>
                                <button
                                    onClick={clearAll}
                                    className="p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                                    title="Clear selection"
                                >
                                    <X className="w-3 h-3 text-gray-400" />
                                </button>
                            </div>

                            <button
                                onClick={() => setIsConfirming(true)}
                                className="flex items-center gap-2 px-5 py-3 rounded-full text-[10px] font-bold text-red-500 bg-white border border-red-100 hover:border-red-500 hover:bg-red-50 transition-all shadow-sm uppercase tracking-widest"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest animate-in fade-in mr-2">
                    {error}
                </div>
            )}

            {/* Agency Settings */}
            <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest bg-white border border-[#E7DED1] hover:border-[#141414] hover:text-[#141414] transition-all shadow-sm group"
            >
                <Settings className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-500" />
                Agency Settings
            </Link>
        </div>
    );
}
