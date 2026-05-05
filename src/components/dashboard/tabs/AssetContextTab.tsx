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
                    <div className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-[#0c0c0c] shadow-sm">
                        <div className="flex min-h-[480px] flex-col lg:flex-row">

                            {/* Left — Full Ad, uncropped */}
                            <div className="relative flex shrink-0 items-center justify-center bg-[#0c0c0c] p-5 lg:w-[55%] lg:p-10">
                                <img
                                    src={firstFrameUrl || asset.file_url}
                                    alt={asset.brand?.name ? `${asset.brand.name} creative asset` : 'Creative asset'}
                                    className="max-w-full max-h-[560px] w-auto h-auto object-contain rounded-[1.2rem]"
                                />
                                {/* Subtle corner pin */}
                                <div className="absolute left-5 top-5 flex items-center gap-2 lg:left-7 lg:top-7">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#D4A574]/90" />
                                    <span className="text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-[#D9B07A]">
                                        Source Material
                                    </span>
                                </div>
                            </div>

                            {/* Right — Forensic metadata */}
                            <div className="flex flex-1 flex-col justify-between border-t border-white/8 p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-12">
                                <div className="space-y-8 lg:space-y-9">
                                    {/* Eyebrow */}
                                    <div>
                                        <p className="mb-3 text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-[#D4A574]/82">
                                            Asset Context // Forensic Dossier
                                        </p>
                                        <h2 className="max-w-[20ch] text-[30px] font-semibold uppercase tracking-[-0.01em] text-white/95 leading-[1.12]">
                                            {extraction?.primary_mechanic || 'Mechanic Resolving'}
                                        </h2>
                                        {asset.brand?.name && (
                                            <p className="mt-3 text-[13px] font-medium uppercase tracking-[0.14em] text-white/60">
                                                {asset.brand.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Metadata grid */}
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {[
                                            { label: 'Format', value: asset.type || 'Single Frame' },
                                            { label: 'Visual Style', value: extraction?.visual_style || '—' },
                                            { label: 'Confidence', value: extraction?.confidence_score != null ? `${Math.round(extraction.confidence_score <= 1 ? extraction.confidence_score * 100 : extraction.confidence_score)}%` : '—' },
                                            { label: 'Sector', value: asset.brand?.market_sector || '—' },
                                        ].map(({ label, value }) => (
                                            <div
                                                key={label}
                                                className={`rounded-2xl border border-[#3A3A3A] bg-[#161616] px-5 py-4 ${
                                                    label === 'Visual Style' ? 'sm:col-span-2' : ''
                                                }`}
                                            >
                                                <p className="mb-1 text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-[#D9B07A]">{label}</p>
                                                <p
                                                    className={`font-sans text-[#F5F5F2] leading-relaxed ${
                                                        label === 'Visual Style'
                                                            ? 'text-[13px] font-normal tracking-normal normal-case'
                                                            : 'text-[16px] font-semibold uppercase tracking-[0.01em]'
                                                    }`}
                                                >
                                                    {value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Colour palette */}
                                    {extraction?.color_palette?.length > 0 && (
                                        <div>
                                            <p className="mb-3 text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-[#D4A574]/82">
                                                Chromatic Palette
                                            </p>
                                            <div className="flex flex-wrap gap-2.5">
                                                {extraction.color_palette.slice(0, 8).map((hex: string, i: number) => (
                                                    <div
                                                        key={i}
                                                        className="h-8 w-8 rounded-xl border border-white/20 shadow-sm"
                                                        style={{ backgroundColor: hex }}
                                                        title={hex}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom asset ID */}
                                <div className="mt-10 border-t border-white/8 pt-8">
                                    <p className="text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-white/55">
                                        Asset ID // {asset.id}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-6">
                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                        <p className="mb-10 text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80">Execution Protocol</p>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <div className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8">
                                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">Core Thesis</p>
                                <p className="text-[15px] font-medium leading-relaxed text-[#1a1a1a]">
                                    {integratedRecommendation.thesis}
                                </p>
                            </div>
                            <div className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8">
                                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">Watchouts</p>
                                <p className="text-[14px] leading-relaxed text-[#6B6B6B]">
                                    {integratedRecommendation.watchouts}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 border-t border-black/5 pt-10">
                            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D]/80">Action Protocol</p>
                            <div className="grid gap-4">
                                {integratedRecommendation.executionNext3.map((step, index) => (
                                    <div key={index} className="flex items-start gap-5 rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-6 transition-all hover:bg-white hover:shadow-md hover:border-[#D4A574]/20">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-black/10 text-[12px] font-black text-[#141414] shadow-sm">
                                            {index + 1}
                                        </span>
                                        <p className="pt-1 text-[13px] leading-relaxed text-[#515151] font-semibold">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {(failureReasons.length > 0 || integratedRecommendation.knownUnknowns.length > 0) && (
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col">
                            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80">Diagnostic Flags</p>

                            {failureReasons.length > 0 && (
                                <div className="grid gap-4 mb-10">
                                    {failureReasons.map((reason, index) => (
                                        <div key={`${reason.title}-${index}`} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-6">
                                            <p className="mb-2 text-[11px] font-black tracking-wide text-[#1a1a1a] uppercase">{reason.title}</p>
                                            <p className="text-[13px] leading-relaxed text-[#6B6B6B] font-medium">{reason.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {integratedRecommendation.knownUnknowns.length > 0 && (
                                <div className={`${failureReasons.length > 0 ? 'pt-8 border-t border-black/5' : ''}`}>
                                    <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">Known Unknowns</p>
                                    <p className="max-w-[72ch] text-[13px] leading-relaxed text-[#6B6B6B] font-medium italic">
                                        {integratedRecommendation.knownUnknowns.join(' ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col">
                        <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80">Module Benchmarks</p>
                        <div className="grid gap-5 xl:grid-cols-2">
                            {integratedRecommendation.moduleScores.map((score) => (
                                <div key={score.label} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-6">
                                    <div className="mb-3 flex items-center justify-between gap-4">
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

                {/* Adaptation Priorities */}
                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-10">Adaptation Priorities</p>
                    <div className="grid gap-5 xl:grid-cols-3">
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
