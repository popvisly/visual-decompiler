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
    const [searchInput, setSearchInput] = useState(currentFilters.q || '');

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
                <label className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-2 block">Intelligence Search</label>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') updateFilter('q', searchInput); }}
                    onBlur={() => updateFilter('q', searchInput)}
                    placeholder="Search triggers, subtext, mechanics..."
                    className="w-full px-3 py-2.5 text-[13px] bg-[#FBF7EF] text-[#141414] placeholder-[#6B6B6B]/60 border border-[#E7DED1] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#141414] transition-all font-medium shadow-sm hover:border-[#D8CCBC]"
                />
            </div>

            <div>
                <label className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-2 block">Brand / Competitor</label>
                <input
                    type="text"
                    value={brandInput}
                    onChange={(e) => setBrandInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') updateFilter('brand', brandInput); }}
                    onBlur={() => updateFilter('brand', brandInput)}
                    placeholder="e.g. Nike, Apple..."
                    className="w-full px-3 py-2.5 text-[13px] bg-[#FBF7EF] text-[#141414] placeholder-[#6B6B6B]/60 border border-[#E7DED1] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#141414] transition-all font-medium shadow-sm hover:border-[#D8CCBC]"
                />
            </div>

            {sections.map(section => (
                <div key={section.key}>
                    <label className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-2 block">{section.label}</label>
                    <select
                        value={currentFilters[section.key] || ''}
                        onChange={(e) => updateFilter(section.key, e.target.value)}
                        className="styled-select w-full px-3 py-2.5 text-[13px] bg-[#FBF7EF] text-[#141414] border border-[#E7DED1] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#141414] transition-all font-medium cursor-pointer shadow-sm hover:border-[#D8CCBC]"
                    >
                        <option value="">All {section.label}s</option>
                        {section.options.map((opt: string) => (
                            <option key={opt} value={opt}>{opt.replace(/_/g, ' ')}</option>
                        ))}
                    </select>
                </div>
            ))}

            <button
                onClick={() => { setBrandInput(''); setSearchInput(''); router.push('/dashboard'); }}
                className="w-full py-2.5 text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.15em] border border-dashed border-[#E7DED1] rounded-xl hover:border-[#141414]/30 hover:text-[#141414] hover:bg-white transition-all shadow-sm"
            >
                Clear All Filters
            </button>
        </div>
    );
}
