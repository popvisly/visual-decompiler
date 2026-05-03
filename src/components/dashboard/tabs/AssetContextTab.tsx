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
    agency
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
