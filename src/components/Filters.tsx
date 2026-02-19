'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    triggerMechanicSchema,
    claimTypeSchema,
    offerTypeSchema
} from '@/types/digest';

export default function Filters({ currentFilters }: { currentFilters: Record<string, string | undefined> }) {
    const router = useRouter();
    const [brandInput, setBrandInput] = useState(currentFilters.brand || '');

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value) { params.set(key, value); } else { params.delete(key); }
        const currentPath = window.location.pathname;
        router.push(`${currentPath}?${params.toString()}`);
    };

    const sections = [
        { label: 'Trigger Mechanic', key: 'trigger_mechanic', options: triggerMechanicSchema.options },
        { label: 'Claim Type', key: 'claim_type', options: claimTypeSchema.options },
        { label: 'Offer Type', key: 'offer_type', options: offerTypeSchema.options },
    ];

    return (
        <div className="space-y-6">
            <div>
                <label className="spec-label block mb-2">Brand / Competitor</label>
                <input
                    type="text"
                    value={brandInput}
                    onChange={(e) => setBrandInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') updateFilter('brand', brandInput); }}
                    onBlur={() => updateFilter('brand', brandInput)}
                    placeholder="e.g. Nike, Apple..."
                    className="w-full px-3 py-2.5 text-xs bg-surface text-txt-on-dark placeholder-txt-on-dark-muted border border-white/10 rounded-xl focus-accent transition-all font-medium"
                />
            </div>

            {sections.map(section => (
                <div key={section.key}>
                    <label className="spec-label block mb-2">{section.label}</label>
                    <select
                        value={currentFilters[section.key] || ''}
                        onChange={(e) => updateFilter(section.key, e.target.value)}
                        className="styled-select w-full px-3 py-2.5 text-xs bg-surface text-txt-on-dark border border-white/10 rounded-xl focus-accent transition-all font-medium cursor-pointer"
                    >
                        <option value="">All {section.label}s</option>
                        {section.options.map((opt: string) => (
                            <option key={opt} value={opt}>{opt.replace(/_/g, ' ')}</option>
                        ))}
                    </select>
                </div>
            ))}

            <button
                onClick={() => { setBrandInput(''); router.push('/dashboard'); }}
                className="w-full py-2.5 text-[9px] font-bold text-txt-muted uppercase tracking-[0.15em] border border-dashed border-white/10 rounded-xl hover:border-accent/40 hover:text-accent transition-all"
            >
                Clear All Filters
            </button>
        </div>
    );
}
