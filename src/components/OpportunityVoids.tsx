'use client';

import React from 'react';
import { ShieldAlert, Crosshair } from 'lucide-react';

type DimensionItem = {
    label: string;
    count: number;
};

type Props = {
    triggerMechanics: DimensionItem[];
    claimTypes: DimensionItem[];
};

export default function OpportunityVoids({ triggerMechanics, claimTypes }: Props) {
    // Find the bottom 3 items with the lowest counts (or 0 if not present in the top list, but we only have what's returned)
    // To make it truly "voids", we look for the least used strategies currently active in the category
    const getVoids = (items: DimensionItem[]) => {
        if (!items || items.length === 0) return [];
        // Sort ascending
        return [...items].sort((a, b) => a.count - b.count).slice(0, 3);
    };

    const triggerVoids = getVoids(triggerMechanics);
    const claimVoids = getVoids(claimTypes);

    const getRecommendation = (voidItem: DimensionItem, type: 'trigger' | 'claim') => {
        if (type === 'trigger') {
            return `Competitors are ignoring the "${voidItem.label.replace(/_/g, ' ')}" mechanic. Deploy this trigger to capture uncontested psychological territory.`;
        }
        return `The "${voidItem.label.replace(/_/g, ' ')}" narrative is heavily underutilized. Frame your offer around this claim to stand out in the feed.`;
    };

    return (
        <section className="bg-[#1A1A1A] rounded-3xl border border-[#D4A574]/20 p-8 relative overflow-hidden shadow-sm">
            {/* Background glow decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4A574]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#D4A574]/10 border border-[#D4A574]/30 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4 text-[#D4A574]" />
                </div>
                <div>
                    <h3 className="text-[13px] font-bold text-[#D4A574] uppercase tracking-widest leading-none">Opportunity Voids</h3>
                    <p className="text-[10px] text-[#FFFFFF]/70 font-medium uppercase tracking-tight mt-1">Competitor Vulnerability Feed</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* Trigger Voids */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-[#D4A574] uppercase tracking-widest flex items-center gap-2 border-b border-[#D4A574]/10 pb-2 font-bold">
                        <Crosshair className="w-3 h-3 text-[#D4A574]" /> Neglected Triggers
                    </h4>
                    {triggerVoids.length > 0 ? (
                        <div className="space-y-3">
                            {triggerVoids.map((v, i) => (
                                <div key={i} className="bg-[#1A1A1A]/50 border border-[#D4A574]/10 rounded-2xl p-4 flex flex-col gap-2 relative group hover:bg-[#1A1A1A] transition-all">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4A574]/50 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-bold text-[#FFFFFF] uppercase tracking-wider capitalize">{v.label.replace(/_/g, ' ')}</span>
                                        <span className="text-[9px] font-bold text-[#D4A574] bg-[#D4A574]/10 px-2 py-0.5 rounded-full">Usage: {v.count}</span>
                                    </div>
                                    <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-normal border-l-2 border-[#D4A574]/20 pl-3">
                                        "{getRecommendation(v, 'trigger')}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[11px] text-[#FFFFFF]/50 italic">Insufficient data to identify triggers.</p>
                    )}
                </div>

                {/* Claim Voids */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-[#D4A574] uppercase tracking-widest flex items-center gap-2 border-b border-[#D4A574]/10 pb-2 font-bold">
                        <Crosshair className="w-3 h-3 text-[#D4A574]" /> Abandoned Claims
                    </h4>
                    {claimVoids.length > 0 ? (
                        <div className="space-y-3">
                            {claimVoids.map((v, i) => (
                                <div key={i} className="bg-[#1A1A1A]/50 border border-[#D4A574]/10 rounded-2xl p-4 flex flex-col gap-2 relative group hover:bg-[#1A1A1A] transition-all">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4A574]/50 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-bold text-[#FFFFFF] uppercase tracking-wider capitalize">{v.label.replace(/_/g, ' ')}</span>
                                        <span className="text-[9px] font-bold text-[#D4A574] bg-[#D4A574]/10 px-2 py-0.5 rounded-full">Usage: {v.count}</span>
                                    </div>
                                    <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-normal border-l-2 border-[#D4A574]/20 pl-3">
                                        "{getRecommendation(v, 'claim')}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[11px] text-[#FFFFFF]/50 italic">Insufficient data to identify claims.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
