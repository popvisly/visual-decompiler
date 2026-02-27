'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteBoardButton({ boardId, boardName }: { boardId: string, boardName: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/boards/${boardId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                router.push('/dashboard/boards');
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
            <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#141414]">Delete this collection?</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setConfirming(false)}
                        className="px-4 py-2 bg-white border border-[#E7DED1] rounded-xl text-[9px] font-bold uppercase tracking-widest hover:border-[#141414]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-red-600 flex items-center gap-2"
                    >
                        {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                        Confirm
                    </button>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setConfirming(true)}
            className="text-[9px] font-bold text-red-500/50 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-colors"
        >
            <Trash2 className="w-3 h-3" /> Deconstruct Collection (Delete)
        </button>
    );
}
