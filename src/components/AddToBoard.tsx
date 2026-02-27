'use client';

import { useState, useEffect } from 'react';
import { Plus, FolderPlus, Check, ChevronDown, Loader2 } from 'lucide-react';

interface Board {
    id: string;
    name: string;
}

export default function AddToBoard({ adId }: { adId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [boards, setBoards] = useState<Board[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [successId, setSuccessId] = useState<string | null>(null);

    const fetchBoards = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/boards');
            const data = await res.json();
            if (Array.isArray(data)) {
                setBoards(data);
            }
        } catch (err) {
            console.error('Failed to fetch boards:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToBoard = async (boardId: string) => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/boards/${boardId}/items`, {
                method: 'POST',
                body: JSON.stringify({ adId })
            });
            if (res.ok) {
                setSuccessId(boardId);
                setTimeout(() => {
                    setSuccessId(null);
                    setIsOpen(false);
                }, 1500);
            }
        } catch (err) {
            console.error('Failed to add to board:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreateBoard = async () => {
        if (!newBoardName.trim()) return;
        setIsSaving(true);
        try {
            const res = await fetch('/api/boards', {
                method: 'POST',
                body: JSON.stringify({ name: newBoardName })
            });
            const newBoard = await res.json();
            if (res.ok) {
                setBoards([newBoard, ...boards]);
                setNewBoardName('');
                setIsCreating(false);
                handleAddToBoard(newBoard.id);
            }
        } catch (err) {
            console.error('Failed to create board:', err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen && boards.length === 0) fetchBoards();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#141414] rounded-xl text-[10px] font-bold text-[#FBF7EF] uppercase tracking-widest hover:bg-[#1A1A1A] transition-all no-print shadow-sm"
            >
                <Plus className="w-3.5 h-3.5" />
                Add to Board
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="max-h-48 overflow-y-auto space-y-1 mb-3 custom-scrollbar">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <Loader2 className="w-5 h-5 text-accent animate-spin" />
                            </div>
                        ) : boards.length === 0 && !isCreating ? (
                            <p className="text-[10px] text-txt-on-dark-muted px-2 py-3 text-center">No boards yet.</p>
                        ) : (
                            boards.map(board => (
                                <button
                                    key={board.id}
                                    onClick={() => handleAddToBoard(board.id)}
                                    disabled={isSaving}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 text-[11px] text-txt-on-dark font-medium transition-colors group"
                                >
                                    <span className="truncate">{board.name}</span>
                                    {successId === board.id ? (
                                        <Check className="w-3.5 h-3.5 text-green-400" />
                                    ) : (
                                        <div className="w-3.5 h-3.5 rounded-full border border-white/20 group-hover:border-accent group-hover:bg-accent/10 transition-all" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>

                    {!isCreating ? (
                        <button
                            onClick={() => setIsCreating(true)}
                            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-white/10 text-[10px] text-txt-on-dark-muted font-bold uppercase tracking-tight hover:border-accent hover:text-accent transition-all"
                        >
                            <FolderPlus className="w-3.5 h-3.5" />
                            Create New Board
                        </button>
                    ) : (
                        <div className="space-y-2">
                            <input
                                autoFocus
                                type="text"
                                value={newBoardName}
                                onChange={(e) => setNewBoardName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleCreateBoard();
                                    if (e.key === 'Escape') setIsCreating(false);
                                }}
                                placeholder="Board Name..."
                                className="w-full px-3 py-2 text-[11px] bg-white/5 text-txt-on-dark border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-all"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCreateBoard}
                                    disabled={isSaving || !newBoardName.trim()}
                                    className="flex-1 py-2 bg-accent text-[10px] font-bold text-[#FBF7EF] uppercase rounded-lg hover:bg-black transition-all disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Create'}
                                </button>
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="px-3 py-2 text-[10px] font-bold text-txt-on-dark-muted uppercase hover:text-txt-on-dark transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
