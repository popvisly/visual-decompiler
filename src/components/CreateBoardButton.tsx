'use client';

import { useState } from 'react';
import { Plus, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateBoardButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsLoading(true);
        try {
            const res = await fetch('/api/boards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, isPublic: false }),
            });

            if (!res.ok) throw new Error('Failed to create board');

            setIsOpen(false);
            setName('');
            setDescription('');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to create board. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-[#141414] text-[#FBF7EF] px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:-translate-y-0.5 shadow-lg transition-all hover:shadow-xl hover:bg-[#1A1A1A]"
            >
                <Plus className="w-4 h-4" /> Create Board
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="bg-[#FBF7EF] w-full max-w-md rounded-[2rem] p-8 relative z-10 shadow-2xl border border-[#E7DED1]">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors text-[#6B6B6B]"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-2xl font-light text-[#141414] tracking-tight mb-2 uppercase">
                            New <br /><span className="text-[#BB9E7B]">Strategic Board</span>
                        </h3>
                        <p className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em] mb-8">
                            Initialize a new intelligence collection
                        </p>

                        <form onSubmit={handleCreate} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold text-[#141414] uppercase tracking-[0.2em] mb-2">
                                    Board Objective
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Q3 Competitor Defense"
                                    className="w-full bg-white border border-[#E7DED1] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BB9E7B] focus:ring-1 focus:ring-[#BB9E7B] transition-all text-[#141414] placeholder:opacity-40"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-[#141414] uppercase tracking-[0.2em] mb-2">
                                    Strategic Context (Optional)
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief background on what this board is tracking..."
                                    className="w-full bg-white border border-[#E7DED1] rounded-xl px-4 py-3 text-sm h-24 resize-none focus:outline-none focus:border-[#BB9E7B] focus:ring-1 focus:ring-[#BB9E7B] transition-all text-[#141414] placeholder:opacity-40"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-[#E7DED1]">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B] hover:text-[#141414] hover:bg-black/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading || !name.trim()}
                                    className="flex items-center gap-2 bg-[#BB9E7B] text-[#FBF7EF] px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:-translate-y-0.5 shadow-lg transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    Initialize
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
