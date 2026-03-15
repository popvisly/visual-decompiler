'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';

export default function CreateBoardModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!name.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/boards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    description: description.trim() || null,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to create board');
            }

            setIsOpen(false);
            setName('');
            setDescription('');
            router.push(`/boards/${data.id}`);
            router.refresh();
        } catch (error) {
            console.error('[CreateBoard] Failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#FBF7EF] transition-colors hover:bg-black"
            >
                <Plus className="h-3.5 w-3.5" />
                New Board
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/55 px-6 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-[2rem] border border-[#D4A574]/15 bg-[#141414] p-8 text-[#FBF7EF] shadow-2xl">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Create Sovereign Board</p>
                                <h2 className="mt-3 text-2xl font-light uppercase tracking-tight">Curated intelligence collection</h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full border border-white/10 p-2 text-[#D4A574] transition-colors hover:bg-white/5"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="mt-8 space-y-5">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/80">Board Name</label>
                                <input
                                    autoFocus
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="e.g. LVMH COMPETITIVE SET 2026"
                                    className="w-full rounded-[1.5rem] border border-[#D4A574]/15 bg-black/25 px-5 py-4 text-sm text-white outline-none transition-colors focus:border-[#D4A574]"
                                    maxLength={80}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/80">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    placeholder="Brief context for this board — client, campaign, or strategic purpose"
                                    rows={4}
                                    className="w-full resize-none rounded-[1.5rem] border border-[#D4A574]/15 bg-black/25 px-5 py-4 text-sm text-white outline-none transition-colors focus:border-[#D4A574]"
                                />
                            </div>

                            <div className="flex flex-col gap-3 pt-4 md:flex-row md:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full border border-[#D4A574]/15 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574] transition-colors hover:bg-[#D4A574]/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!name.trim() || isSubmitting}
                                    className="rounded-full bg-[#D4A574] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#141414] transition-colors hover:bg-[#c8955b] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Creating...' : 'Create Board'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
