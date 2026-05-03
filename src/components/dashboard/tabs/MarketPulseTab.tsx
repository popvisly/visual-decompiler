"use client";

import React from 'react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import { Lock } from 'lucide-react';
import { IntegratedRecommendationData, MarketPulseData } from '@/types/dashboard';
import { normalizeProseText, proseParagraphs } from '@/lib/utils';

interface MarketPulseTabProps {
    isSovereign: boolean;
    marketPulseInterpretation: string;
    marketPulseTrustLabel: string;
    marketPulseData: MarketPulseData | null;
    marketPulseBelowThreshold: boolean;
    integratedRecommendation: IntegratedRecommendationData;
    marketPulseFallback: {
        saturation: number;
        novelty: number;
        fatigue: number;
        interpretation: string;
        confidenceLabel: string;
    };
}

export default function MarketPulseTab({
    isSovereign,
    marketPulseInterpretation,
    marketPulseTrustLabel,
    marketPulseData,
    marketPulseBelowThreshold,
    integratedRecommendation,
    marketPulseFallback
}: MarketPulseTabProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-8">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="Competitive Context"
                        title="Market Pulse: Competitive Context"
                        intro="An analysis of how the current route aligns with category pressures, novelty conditions, and timing opportunities."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="Category Context"
                        title={isSovereign ? 'Use category pressure to decide timing and differentiation.' : 'Market Pulse is available on Sovereign intelligence tiers.'}
                        body={marketPulseInterpretation}
                        metrics={[
                            { label: 'Signal', value: marketPulseTrustLabel },
                            { label: 'Sample', value: marketPulseData ? `${marketPulseData.assetCount} Assets` : 'Fallback' },
                            { label: 'Access', value: isSovereign ? 'Available' : 'Locked' },
                        ]}
                        actions={[
                            marketPulseData && !marketPulseBelowThreshold ? 'Compare this route against live category pressure.' : 'Treat current context as directional until more category assets are available.',
                            integratedRecommendation.executionNext3[0],
                            'Use Market Pulse after single-asset confidence is established.',
                        ]}
                    />
                </div>

                <div className="space-y-8">
                    {!isSovereign ? (
                        <div className="relative rounded-[2.5rem] border border-black/5 bg-white overflow-hidden shadow-sm">
                            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/70 flex items-center justify-center">
                                <div className="p-12 rounded-[2.5rem] border border-black/5 bg-white max-w-xl text-center flex flex-col items-center shadow-2xl">
                                    <div className="w-16 h-16 flex items-center justify-center border border-black/10 bg-[#D4A574]/10 mb-8 rounded-2xl">
                                        <Lock className="w-6 h-6 text-[#8B6A3D]" />
                                    </div>
                                    <span className="text-[#8B6A3D] font-black tracking-[0.4em] uppercase text-[11px] mb-4">Sovereign Feature</span>
                                    <h2 className="text-[#1a1a1a] text-[28px] font-black mb-6 tracking-tight uppercase">Market Pulse Locked</h2>
                                    <p className="text-[#515151] text-[15px] mb-10 leading-relaxed font-medium">
                                        Cross-asset statistical aggregation and category saturation density mapping is restricted to sovereign intelligence tiers.
                                    </p>
                                    <button className="bg-[#141414] text-[#FBF7EF] px-12 py-5 text-[11px] font-black uppercase tracking-[0.4em] transition hover:bg-black active:scale-95 rounded-full shadow-lg">
                                        UPGRADE TO SOVEREIGN
                                    </button>
                                </div>
                            </div>
                            <div className="p-12 opacity-40 select-none grayscale">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        ['Saturation', '0.0%'],
                                        ['Novelty', '0.0%'],
                                        ['Fatigue', '0.0%'],
                                    ].map(([label, val]) => (
                                        <div key={label} className="rounded-3xl border border-black/5 bg-[#FBFBF6] p-10">
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]/70 mb-6">{label}</p>
                                            <p className="text-[32px] font-black text-[#1a1a1a] tabular-nums">{val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            <div className="rounded-[2.5rem] border border-black/5 bg-white overflow-hidden shadow-sm">
                                <div className="grid grid-cols-12 border-b border-black/5 bg-[#FCFBF9] text-[10px] font-black uppercase tracking-[0.32em] text-[#8B6A3D]">
                                    <div className="col-span-4 px-10 py-6 border-r border-black/5">Forensic Metric</div>
                                    <div className="col-span-2 px-10 py-6 border-r border-black/5 text-center">Value</div>
                                    <div className="col-span-6 px-10 py-6">Category Signal</div>
                                </div>
                                {[
                                    {
                                        label: 'Market Saturation',
                                        value: marketPulseFallback.saturation,
                                        insight:
                                            marketPulseFallback.saturation >= 70
                                                ? 'Category pressure is elevated. Distinctive differentiation is required.'
                                                : 'Saturation remains manageable. Route can scale with disciplined execution.',
                                    },
                                    {
                                        label: 'Route Novelty',
                                        value: marketPulseFallback.novelty,
                                        insight:
                                            marketPulseFallback.novelty >= 75
                                                ? 'Novelty potential is strong. Positioning can win with precision.'
                                                : 'Novelty is moderate. Sharper differentiation will improve separation.',
                                    },
                                    {
                                        label: 'Category Fatigue',
                                        value: marketPulseFallback.fatigue,
                                        insight:
                                            marketPulseFallback.fatigue >= 55
                                                ? 'Fatigue is rising. Fresh route treatment is needed to sustain attention.'
                                                : 'Fatigue is controlled. Current route remains viable with selective refinement.',
                                    },
                                ].map((row) => (
                                    <div key={row.label} className="grid grid-cols-12 border-b border-black/5 last:border-b-0 hover:bg-[#FBFBF6] transition-colors">
                                        <div className="col-span-4 border-r border-black/5 px-10 py-8 flex items-center">
                                            <p className="text-[12px] font-black uppercase tracking-[0.24em] text-[#1a1a1a]">{row.label}</p>
                                        </div>
                                        <div className="col-span-2 border-r border-black/5 px-10 py-8 text-center flex items-center justify-center">
                                            <p className="text-[32px] font-black text-[#1a1a1a] tabular-nums leading-none">{row.value}%</p>
                                        </div>
                                        <div className="col-span-6 px-10 py-8 flex items-center">
                                            <p className="text-[14px] leading-relaxed text-[#515151] font-medium">{normalizeProseText(row.insight)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#8B6A3D]/80 mb-10">Directional Estimate</p>
                                    <div className="space-y-4">
                                        {proseParagraphs(
                                            marketPulseFallback.interpretation || 'Category pressure is elevated, so this route requires sharper differentiation and strict execution discipline before scale expansion.',
                                            2,
                                        ).map((paragraph, idx) => (
                                            <p key={idx} className="text-[14px] leading-relaxed text-[#515151] font-medium">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#8B6A3D]/80 mb-10">Strategic Implication</p>
                                    <div className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8">
                                        {proseParagraphs(
                                            'To navigate saturation pressure while preserving route novelty, prioritize clear value signaling, disciplined hierarchy, and a distinct visual identity that can survive repeat exposure.',
                                            2,
                                        ).map((paragraph, idx) => (
                                            <p key={idx} className="text-[14px] leading-relaxed text-[#5E5A53] font-medium">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="mt-10">
                                        <span className="inline-flex rounded-full border border-[#D4A574]/30 px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] bg-[#D4A574]/5">
                                            {marketPulseFallback.confidenceLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
