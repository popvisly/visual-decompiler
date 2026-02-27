'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelection } from './SelectionProvider';
import DossierMultiExport from './DossierMultiExport';
import { Shield, LayoutGrid, X, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ExecutiveCommandBar({ isExecutiveView }: { isExecutiveView: boolean }) {
    const { count, clearAll, selectedIds } = useSelection();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${count} asset${count !== 1 ? 's' : ''}? This action cannot be undone.`)) return;

        setIsDeleting(true);
        try {
            const res = await fetch('/api/ads/bulk', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: Array.from(selectedIds) })
            });

            if (res.ok) {
                clearAll();
                router.refresh();
            } else {
                console.error('Failed to delete assets');
                alert('Failed to delete assets.');
            }
        } catch (error) {
            console.error('Error deleting assets:', error);
            alert('An error occurred while deleting assets.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* Selection counter — appears when items are selected */}
            {count > 0 && (
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 animate-in fade-in slide-in-from-left-2">
                    <span className="text-[10px] font-bold text-[#141414] uppercase tracking-[0.1em]">
                        {count} Asset{count !== 1 ? 's' : ''} Selected
                    </span>
                    <button
                        onClick={clearAll}
                        className="p-0.5 rounded-full hover:bg-accent/20 transition-colors"
                        aria-label="Clear selection"
                    >
                        <X className="w-3 h-3 text-[#6B6B6B]" />
                    </button>

                    <div className="w-px h-3 bg-accent/30 mx-1" />

                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-1 px-3 flex items-center gap-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                        aria-label="Delete selected assets"
                    >
                        {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">{isDeleting ? 'Deleting...' : 'Delete'}</span>
                    </button>
                </div>
            )}

            {/* Executive Command / Operational View toggle */}
            <Link
                href={isExecutiveView ? '/dashboard' : '/dashboard?v=executive'}
                className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${isExecutiveView
                    ? 'bg-accent text-[#141414] border-accent'
                    : 'bg-white text-[#6B6B6B] border-[#E7DED1] hover:border-accent'
                    }`}
            >
                {isExecutiveView ? (
                    <>
                        <LayoutGrid className="w-4 h-4" />
                        Operational View
                    </>
                ) : (
                    <>
                        <Shield className="w-4 h-4" />
                        Executive Command
                        {count > 0 && (
                            <span className="ml-1 px-2 py-0.5 rounded-full bg-[#141414] text-[#FBF7EF] text-[9px]">
                                {count}
                            </span>
                        )}
                    </>
                )}
            </Link>

            {/* Dossier export — when 2+ selected */}
            {count >= 2 && <DossierMultiExport />}
        </div>
    );
}
