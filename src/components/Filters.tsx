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
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/dashboard?${params.toString()}`);
    };

    const sections = [
        { label: 'Trigger Mechanic', key: 'trigger_mechanic', options: triggerMechanicSchema.options },
        { label: 'Claim Type', key: 'claim_type', options: claimTypeSchema.options },
        { label: 'Offer Type', key: 'offer_type', options: offerTypeSchema.options },
    ];

    return (
        <div className="space-y-8">
            {/* Brand search — free text, searches both confirmed brand and AI guess */}
            <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Brand / Competitor
                </label>
                <input
                    type="text"
                    value={brandInput}
                    onChange={(e) => setBrandInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') updateFilter('brand', brandInput);
                    }}
                    onBlur={() => updateFilter('brand', brandInput)}
                    placeholder="e.g. Nike, Apple..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-slate-700 hover:border-slate-300 placeholder:text-slate-300"
                />
            </div>

            {sections.map(section => (
                <div key={section.key}>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                        {section.label}
                    </label>
                    <select
                        value={currentFilters[section.key] || ''}
                        onChange={(e) => updateFilter(section.key, e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-slate-700 hover:border-slate-300"
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
                className="w-full py-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] border border-dashed border-slate-200 rounded-xl hover:border-slate-400 hover:text-slate-600 transition-all"
            >
                Clear All Filters
            </button>
        </div>
    );
}
