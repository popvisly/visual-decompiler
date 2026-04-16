"use client";

import { FormEvent, useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';

interface AssetTagEditorProps {
    assetId: string;
    initialTags?: string[];
    onTagsChange?: (tags: string[]) => void;
}

const normalizeTag = (value: string) =>
    value
        .trim()
        .replace(/\s+/g, ' ')
        .slice(0, 32);

export default function AssetTagEditor({
    assetId,
    initialTags = [],
    onTagsChange,
}: AssetTagEditorProps) {
    const [tags, setTags] = useState<string[]>(initialTags);
    const [tagInput, setTagInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTags(initialTags);
        setError(null);
    }, [initialTags]);

    useEffect(() => {
        let active = true;

        const loadSuggestions = async () => {
            try {
                const response = await fetch(`/api/assets/${assetId}/tags`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to load tag suggestions');
                }

                if (!active) return;

                setTags(Array.isArray(data?.tags) ? data.tags : initialTags);
                setSuggestions(Array.isArray(data?.suggestions) ? data.suggestions : []);
            } catch (err) {
                if (!active) return;
                setError(err instanceof Error ? err.message : 'Failed to load tag suggestions');
            }
        };

        void loadSuggestions();

        return () => {
            active = false;
        };
    }, [assetId, initialTags]);

    const persistTags = async (nextTags: string[]) => {
        setIsSaving(true);
        setError(null);

        try {
            const response = await fetch(`/api/assets/${assetId}/tags`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tags: nextTags }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to update tags');
            }

            const resolvedTags = Array.isArray(data?.tags) ? data.tags : nextTags;
            setTags(resolvedTags);
            setSuggestions((prev) => Array.from(new Set([...resolvedTags, ...prev])).sort((a, b) => a.localeCompare(b)));
            onTagsChange?.(resolvedTags);
            return resolvedTags;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update tags';
            setError(message);
            throw new Error(message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddTag = async (rawValue: string) => {
        const nextTag = normalizeTag(rawValue);
        if (!nextTag) return;

        const exists = tags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase());
        if (exists || tags.length >= 12) {
            setTagInput('');
            return;
        }

        const nextTags = [...tags, nextTag];
        setTags(nextTags);
        setTagInput('');
        try {
            await persistTags(nextTags);
        } catch {
            setTags(tags);
        }
    };

    const handleRemoveTag = async (tagToRemove: string) => {
        const nextTags = tags.filter((tag) => tag.toLowerCase() !== tagToRemove.toLowerCase());
        setTags(nextTags);
        try {
            await persistTags(nextTags);
        } catch {
            setTags(tags);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await handleAddTag(tagInput);
    };

    const visibleSuggestions = suggestions
        .filter((suggestion) => !tags.some((tag) => tag.toLowerCase() === suggestion.toLowerCase()))
        .slice(0, 8);

    return (
        <div className="rounded-[1.75rem] border border-[#D4A574]/20 bg-[#111110] px-5 py-4 text-[#F5F3EE]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Asset Tags</p>
                    <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#d6cec3]">
                        Label this asset with campaign, client, format, territory, or tactic tags so the vault becomes easier to search later.
                    </p>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4A574]/55">
                    {isSaving ? 'Saving tags...' : `${tags.length}/12 applied`}
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {tags.length > 0 ? (
                    tags.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => void handleRemoveTag(tag)}
                            className="inline-flex items-center gap-2 rounded-full border border-[#D4A574]/25 bg-[#D4A574]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F3EE] transition-colors hover:border-[#D4A574]/50 hover:bg-[#D4A574]/18"
                        >
                            {tag}
                            <X className="h-3 w-3" />
                        </button>
                    ))
                ) : (
                    <div className="rounded-full border border-dashed border-[#D4A574]/20 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#FFFFFF]/35">
                        No tags assigned yet
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 md:flex-row">
                <input
                    type="text"
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    placeholder="Add tag — campaign, market, format, audience..."
                    className="flex-1 rounded-full border border-[#D4A574]/20 bg-black/25 px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-[#F5F3EE] outline-none transition-colors placeholder:text-[#FFFFFF]/25 focus:border-[#D4A574]"
                />
                <button
                    type="submit"
                    disabled={isSaving || !tagInput.trim() || tags.length >= 12}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A574] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#141414] transition-colors hover:bg-[#c8955b] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Plus className="h-3.5 w-3.5" />
                    Add Tag
                </button>
            </form>

            {visibleSuggestions.length > 0 && (
                <div className="mt-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/55">Agency Tag Memory</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {visibleSuggestions.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => void handleAddTag(tag)}
                                className="rounded-full border border-[#D4A574]/18 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-[#FFFFFF]/60 transition-colors hover:border-[#D4A574]/45 hover:bg-[#D4A574]/10 hover:text-[#F5F3EE]"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-[#f3b1a0]">
                    {error}
                </p>
            )}
        </div>
    );
}
