"use client";

import React from 'react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import DossierDecisionSummary from '@/components/dashboard/DossierDecisionSummary';
import SovereignProcessingView from '@/components/SovereignProcessingView';
import { IntegratedRecommendationData, QualityReason, FixPriority } from '@/types/dashboard';
import { parseDossierSections } from '@/lib/utils';

interface AssetContextTabProps {
    asset: any;
    extraction: any;
    dossier: any;
    integratedRecommendation: IntegratedRecommendationData;
    failureReasons: QualityReason[];
    fixPriorities: FixPriority[];
    isExecutiveSummary: boolean;
    setIsExecutiveSummary: (val: boolean) => void;
    agency?: any;
    firstFrameUrl?: string | null;
}

export default function AssetContextTab({
    asset,
    extraction,
    dossier,
    integratedRecommendation,
    failureReasons,
    fixPriorities,
    isExecutiveSummary,
    setIsExecutiveSummary,
    agency,
    firstFrameUrl
}: AssetContextTabProps) {
    if (!extraction) {
        return <SovereignProcessingView assetId={asset.id} agency={agency} />;
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-8">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="ASSET"
                        title="Dossier Context // Forensic Read"
                        intro="A forensic reconstruction of the asset's strategic intent, diagnostic flags, and execution protocol."
                    />
                </div>

                {/* ── Asset Dossier Panel ── */}
                {(firstFrameUrl || asset.file_url) && (
                    <div className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-[#0d0d0d] shadow-sm">
                        <div className="flex flex-col lg:flex-row min-h-[480px]">

                            {/* Left — Full Ad, uncropped */}
                            <div className="relative flex-shrink-0 lg:w-[55%] flex items-center justify-center bg-[#0d0d0d] p-6 lg:p-10">
                                <img
                                    src={firstFrameUrl || asset.file_url}
                                    alt={asset.brand?.name ? `${asset.brand.name} creative asset` : 'Creative asset'}
                                    className="max-w-full max-h-[560px] w-auto h-auto object-contain rounded-[1.2rem]"
                                />
                                {/* Subtle corner pin */}
                                <div className="absolute top-6 left-6 flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#D4A574] animate-pulse" />
                                    <span className="text-[8px] font-mono font-bold uppercase tracking-[0.4em] text-[#D4A574]/50">
                                        Source Material
                                    </span>
                                </div>
                            </div>

                            {/* Right — Forensic metadata */}
                            <div className="flex-1 flex flex-col justify-between border-t border-white/5 lg:border-t-0 lg:border-l lg:border-white/5 p-10 lg:p-12">
                                <div className="space-y-10">
                                    {/* Eyebrow */}
                                    <div>
                                        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.5em] text-[#D4A574]/60 mb-4">
                                            Asset Context // Forensic Dossier
                                        </p>
                                        <h2 className="text-[26px] font-black uppercase tracking-tight text-white leading-[1.05]">
                                            {extraction?.primary_mechanic || 'Mechanic Resolving'}
                                        </h2>
                                        {asset.brand?.name && (
                                            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/35 mt-3">
                                                {asset.brand.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Metadata grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'Format', value: asset.type || 'Single Frame' },
                                            { label: 'Visual Style', value: extraction?.visual_style || '—' },
                                            { label: 'Confidence', value: extraction?.confidence_score != null ? `${Math.round(extraction.confidence_score <= 1 ? extraction.confidence_score * 100 : extraction.confidence_score)}%` : '—' },
                                            { label: 'Sector', value: asset.brand?.market_sector || '—' },
                                        ].map(({ label, value }) => (
                                            <div key={label} className="rounded-2xl border border-white/6 bg-white/4 px-6 py-5">
                                                <p className="text-[9px] font-mono font-bold uppercase tracking-[0.35em] text-[#D4A574]/50 mb-2">{label}</p>
                                                <p className="text-[13px] font-black uppercase tracking-tight text-white/80 leading-tight">{value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Colour palette */}
                                    {extraction?.color_palette?.length > 0 && (
                                        <div>
                                            <p className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-[#D4A574]/50 mb-4">
                                                Chromatic Palette
                                            </p>
                                            <div className="flex gap-2 flex-wrap">
                                                {extraction.color_palette.slice(0, 8).map((hex: string, i: number) => (
                                                    <div
                                                        key={i}
                                                        className="h-8 w-8 rounded-xl border border-white/10 shadow-sm"
                                                        style={{ backgroundColor: hex }}
                                                        title={hex}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom asset ID */}
                                <div className="pt-10 border-t border-white/5 mt-10">
                                    <p className="text-[8px] font-mono uppercase tracking-[0.5em] text-white/20">
                                        Asset ID // {asset.id}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                <div className="grid gap-6 xl:grid-cols-[1fr_minmax(340px,0.38fr)]">
                    {/* Left Column Stack (2 columns wide in spirit) */}
                    <div className="flex flex-col gap-6">
                        {/* Execution Protocol */}
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-10">Execution Protocol</p>
                            <div className="grid gap-10 md:grid-cols-2">
                                <div className="space-y-6">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">Core Thesis</p>
                                    <p className="text-[15px] font-medium leading-relaxed text-[#1a1a1a]">
                                        {integratedRecommendation.thesis}
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">Watchouts</p>
                                    <p className="text-[14px] leading-relaxed text-[#6B6B6B]">
                                        {integratedRecommendation.watchouts}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-black/5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D]/80 mb-8">Action Protocol</p>
                                <div className="grid gap-6 md:grid-cols-3">
                                    {integratedRecommendation.executionNext3.map((step, index) => (
                                        <div key={index} className="relative rounded-2xl border border-black/5 bg-[#FBFBF6] p-6 group hover:bg-white transition-all hover:shadow-md hover:border-[#D4A574]/20">
                                            <span className="absolute -top-3 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-black/10 text-[12px] font-black text-[#141414] shadow-sm">
                                                {index + 1}
                                            </span>
                                            <p className="text-[13px] leading-relaxed text-[#515151] font-semibold">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Stack (1 column wide) */}
                    <div className="flex flex-col gap-6">
                        {/* Diagnostic Flags */}
                        {(failureReasons.length > 0 || integratedRecommendation.knownUnknowns.length > 0) && (
                            <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col">
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-8">Diagnostic Flags</p>
                                
                                {failureReasons.length > 0 && (
                                    <div className="space-y-6 mb-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-4">Critical Risk Points</p>
                                        {failureReasons.map((reason, index) => (
                                            <div key={`${reason.title}-${index}`} className="group relative pl-6 border-l-2 border-[#D4A574]/30 hover:border-[#D4A574] transition-colors">
                                                <p className="text-[11px] font-black tracking-wide text-[#1a1a1a] mb-1.5 uppercase">{reason.title}</p>
                                                <p className="text-[12px] leading-relaxed text-[#6B6B6B] font-medium">{reason.detail}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {integratedRecommendation.knownUnknowns.length > 0 && (
                                    <div className={`space-y-4 ${failureReasons.length > 0 ? 'pt-8 border-t border-black/5' : ''}`}>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">Known Unknowns</p>
                                        <p className="text-[12px] leading-relaxed text-[#6B6B6B] font-medium italic">
                                            {integratedRecommendation.knownUnknowns.join(' ')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Module Benchmarks */}
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-8">Module Benchmarks</p>
                            <div className="space-y-6">
                                {integratedRecommendation.moduleScores.map((score) => (
                                    <div key={score.label} className="group">
                                        <div className="flex items-center justify-between gap-4 mb-3">
                                            <p className="text-[11px] font-black tracking-widest text-[#1a1a1a] uppercase">{score.label}</p>
                                            <span className="text-[10px] font-bold text-[#8B6A3D] tabular-nums">0{score.score}/05</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            {[1,2,3,4,5].map(i => (
                                                <div 
                                                    key={i} 
                                                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                                        i <= score.score 
                                                            ? 'bg-[#D4A574] shadow-[0_0_8px_rgba(212,165,116,0.3)]' 
                                                            : 'bg-[#EAEADF]'
                                                    }`} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Adaptation Priorities */}
                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-10">Adaptation Priorities</p>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {fixPriorities.map((item, index) => (
                            <div key={item.priority} className="group rounded-[1.8rem] border border-black/5 bg-[#FCFBF9] p-8 transition-all hover:bg-white hover:shadow-xl hover:border-[#D4A574]/20">
                                <span className="inline-block px-3 py-1 rounded-full bg-[#1a1a1a] text-[9px] font-black text-white tracking-[0.2em] mb-4">
                                    {item.priority}
                                </span>
                                <p className="text-[15px] font-black tracking-tight text-[#141414] mb-3 uppercase leading-tight group-hover:text-[#8B6A3D] transition-colors">{item.title}</p>
                                <p className="text-[13px] leading-relaxed text-[#515151] font-medium">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <DossierDecisionSummary
                    extraction={extraction}
                    dossier={dossier}
                    narrativeIntro={parseDossierSections(dossier?.narrative_framework, 'ACT').intro}
                    isExecutiveSummary={isExecutiveSummary}
                    onToggleExecutiveSummary={setIsExecutiveSummary}
                    evidenceHref="#dossier-evidence"
                />
            </div>
        </div>
    );
}
