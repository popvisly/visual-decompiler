'use client';

import { useState, useRef } from 'react';

interface BrandTagProps {
    adId: string;
    brand: string | null;       // user-confirmed brand
    brandGuess: string | null;  // AI guess from digest
}

export default function BrandTag({ adId, brand, brandGuess }: BrandTagProps) {
    const displayBrand = brand || brandGuess || 'Unknown Brand';
    const isAiGuess = !brand && !!brandGuess;

    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(brand || brandGuess || '');
    const [saved, setSaved] = useState(brand);
    const inputRef = useRef<HTMLInputElement>(null);

    const save = async () => {
        setEditing(false);
        if (value === (saved || brandGuess || '')) return; // no change

        const res = await fetch(`/api/ads/${adId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brand: value }),
        });

        if (res.ok) {
            setSaved(value || null);
        }
    };

    if (editing) {
        return (
            <input
                ref={inputRef}
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={save}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') save();
                    if (e.key === 'Escape') { setValue(saved || brandGuess || ''); setEditing(false); }
                }}
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 w-28 focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="Brand name..."
            />
        );
    }

    return (
        <button
            onClick={() => { setEditing(true); setValue(saved || brandGuess || ''); }}
            title={isAiGuess ? `AI guess: ${brandGuess} — click to confirm or edit` : 'Click to edit brand'}
            className="flex items-center gap-1 group/brand"
        >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] shrink-0 group-hover/brand:text-slate-700 transition-colors">
                {saved || displayBrand}
            </span>
            {isAiGuess && (
                <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest border border-dashed border-slate-200 rounded px-1 group-hover/brand:border-slate-400 group-hover/brand:text-slate-400 transition-colors">
                    AI
                </span>
            )}
        </button>
    );
}
