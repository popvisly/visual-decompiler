'use client';

import { useState } from 'react';
import { Trash2, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteBoardCardButton({ boardId }: { boardId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const router = useRouter();

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/boards/${boardId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                router.refresh();
            } else {
                console.error("Failed to delete board");
                setIsDeleting(false);
            }
        } catch (err) {
            console.error("Deletion error", err);
            setIsDeleting(false);
        }
    };

    if (confirming) {
        return (
            <div
                className="flex items-center gap-1.5 bg-white rounded-full p-1 border border-red-500/20 shadow-sm z-30 relative animate-in fade-in"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            >
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirming(false); }}
                    className="w-6 h-6 rounded-full flex items-center justify-center bg-[#FBF7EF] text-[#6B6B6B] hover:text-[#141414] hover:bg-gray-100 transition-colors"
                >
                    <X className="w-3 h-3" />
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-red-100 flex items-center gap-1.5 transition-colors"
                >
                    {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                    Delete
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirming(true); }}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#E7DED1] text-[#6B6B6B] md:opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-200 z-30 relative shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            title="Delete Collection"
        >
            <Trash2 className="w-3.5 h-3.5" />
        </button>
    );
}
