'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import type { BoardTemplate } from '@/lib/board-templates';
import { hasTemplatePlaceholders } from '@/lib/board-templates';

type CreateBoardModalProps = {
    triggerLabel?: string;
    preset?: BoardTemplate;
    variant?: 'primary' | 'secondary' | 'template';
    disabled?: boolean;
    disabledReason?: string;
};

export default function CreateBoardModal({
    triggerLabel = 'Create Board',
    preset,
    variant = 'primary',
    disabled = false,
    disabledReason,
}: CreateBoardModalProps = {}) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const placeholderWarning = hasTemplatePlaceholders(name) || hasTemplatePlaceholders(description);

    useEffect(() => {
        if (!isOpen) return;
        setName(preset?.name || '');
        setDescription(preset?.description || '');
    }, [isOpen, preset]);

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!name.trim() || isSubmitting || placeholderWarning) return;

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

    const triggerClassName =
        variant === 'secondary'
            ? 'inline-flex items-center justify-center rounded-full border border-[#D8CCB5] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#7D6748] transition-colors hover:border-[#C8B08D] hover:text-[#141414] disabled:cursor-not-allowed disabled:opacity-45'
            : variant === 'template'
                ? 'inline-flex items-center justify-center rounded-full border border-[#D8CCB5] bg-[#FBFBF6] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6D655B] transition-colors hover:border-[#C8B08D] hover:text-[#141414] disabled:cursor-not-allowed disabled:opacity-45'
                : 'inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#FBF7EF] transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-45';

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                disabled={disabled}
                title={disabled ? disabledReason : undefined}
                className={triggerClassName}
            >
                {variant === 'primary' ? <Plus className="h-3.5 w-3.5" /> : null}
                {triggerLabel}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/55 px-6 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-[2rem] border border-[#D4A574]/15 bg-[#141414] p-8 text-[#FBF7EF] shadow-2xl">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Create Sovereign Board</p>
                                <h2 className="mt-3 text-2xl font-light uppercase tracking-tight">
                                    {preset ? preset.triggerLabel : 'Curated intelligence collection'}
                                </h2>
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

                            {preset ? (
                                <div className="space-y-3 rounded-[1.5rem] border border-[#D4A574]/15 bg-black/20 px-5 py-4">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/80">Suggested tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {preset.suggestedTags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-[#D4A574]/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-[#D4C4AB]">
                                        Use tags for retrieval and reporting.
                                    </p>
                                </div>
                            ) : null}

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

                            {placeholderWarning ? (
                                <div className="rounded-[1.25rem] border border-[#8B4513]/30 bg-[#8B4513]/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#F3B1A0]">
                                    Replace placeholder text before saving.
                                </div>
                            ) : null}

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
                                    disabled={!name.trim() || isSubmitting || placeholderWarning}
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
