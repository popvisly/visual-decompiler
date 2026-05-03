"use client";

import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import DossierGrid from '@/components/dashboard/DossierGrid';
import { firstSentence } from '@/lib/utils';

interface SignalsTabProps {
    dossier: any;
    extraction: any;
    analysisLanguage: any;
    signalByLabel: Record<string, string>;
    scoreByLabel: Record<string, number>;
    showRadiant: boolean;
    setShowRadiant: (val: boolean) => void;
}

export default function SignalsTab({
    dossier,
    extraction,
    analysisLanguage,
    signalByLabel,
    scoreByLabel,
    showRadiant,
    setShowRadiant,
}: SignalsTabProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-6">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="PATTERN EXTRACTION"
                        title="Mechanics"
                        intro="A structural decomposition of the signal stack and mechanic architecture—hooks, pacing, contrast, and attention-routing cues that drive response."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="Mechanic Read"
                        title={extraction.primary_mechanic || 'Mechanic extraction is still resolving.'}
                        body={firstSentence(dossier?.semiotic_subtext) || 'This module isolates the working signal stack: what captures attention, what routes meaning, and what may be weakening transfer.'}
                        metrics={[
                            { label: 'Hierarchy', value: signalByLabel.Hierarchy || 'Pending' },
                            { label: 'Focus', value: signalByLabel['Focus Integrity'] || 'Pending' },
                            { label: 'Attention', value: `${scoreByLabel.Attention}/100` },
                        ]}
                        actions={[
                            'Use the HUD only where focal routing needs visual confirmation.',
                            firstSentence(analysisLanguage.attentionPath.dropOff),
                            'Treat mechanics as evidence before moving into psychological interpretation.',
                        ].filter(Boolean)}
                    />
                </div>
                
                {/* UNIFIED TECHNICAL AUTOPSY CONTAINER */}
                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col gap-10">
                    {/* Top: Radiant Architecture Toggle */}
                    <div className="flex flex-col gap-8 md:flex-row md:items-center justify-between pb-10 border-b border-black/5">
                        <div className="flex items-center gap-8">
                            <div className="h-16 w-16 rounded-[1.2rem] bg-[#FBFBF6] flex items-center justify-center border border-black/5 text-[#8B6A3D] shadow-sm">
                                <Sparkles className="h-7 w-7" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#141414]">Macro-Diagnostic Grid</h3>
                                <p className="text-[14px] leading-relaxed text-[#515151] font-medium">Visualize focal routing and attention-routing cues.</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowRadiant(!showRadiant)}
                            className={`px-8 py-4 rounded-full border text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-4 group ${showRadiant ? "bg-[#141414] text-white border-black shadow-lg translate-y-[-2px]" : "bg-white text-[#141414] border-black/10 hover:bg-[#141414] hover:text-white hover:border-[#141414]"}`}
                        >
                            <div className={`h-2 w-2 rounded-full transition-all duration-500 ${showRadiant ? "bg-[#D4A574] animate-pulse" : "bg-[#141414] group-hover:bg-white"}`} />
                            {showRadiant ? "System HUD Active" : "Initialize Optical HUD"}
                        </button>
                    </div>

                    {/* Bottom: Technical Autopsy Channels */}
                    <div className="grid grid-cols-1">
                        <DossierGrid 
                            title="Semiotic Subtext" 
                            content={extraction.full_dossier.semiotic_subtext || ''} 
                            type="CHANNEL" 
                        />
                    </div>
                </div>

                {/* ── Gaze Topology ── */}
                {(extraction.full_dossier as any)?.gaze_topology && (
                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col gap-10">
                        <div className="flex flex-col gap-2 border-b border-black/5 pb-10">
                            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]">Gaze Topology</h2>
                            <p className="text-[15px] leading-relaxed text-[#515151] font-medium">Mode of Address and Viewer Positioning analysis.</p>
                        </div>

                        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                            {[
                                { label: 'Mode of Address', value: (extraction.full_dossier as any).gaze_topology.mode_of_address },
                                { label: 'Viewer Position', value: (extraction.full_dossier as any).gaze_topology.viewer_position },
                                { label: 'Power Holder', value: (extraction.full_dossier as any).gaze_topology.power_holder },
                            ].map((item, i) => (
                                <div key={i} className="flex min-h-[160px] flex-col justify-between rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8 text-[#141414] transition-all hover:bg-white hover:shadow-md hover:border-[#D4A574]/30">
                                    <h3 className="mb-6 w-full border-b border-black/5 pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#8B6A3D]">
                                        {item.label}
                                    </h3>
                                    <div className="flex-1 flex items-center">
                                        <span className="text-[22px] font-black uppercase tracking-tight text-[#141414] leading-tight">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Search className="h-12 w-12 text-[#8B6A3D]" />
                            </div>
                            <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#141414]">
                                Forensic Gaze Diagnostic
                            </h3>
                            <p className="max-w-[72ch] text-[15px] font-medium leading-relaxed break-words text-[#515151] relative z-10">
                                {(extraction.full_dossier as any).gaze_topology.reading}
                            </p>
                        </div>
                    </div>
                )}

                {/* ── Counter-Reading Matrix ── */}
                {(extraction.full_dossier as any)?.counter_reading_matrix && (
                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col gap-10">
                        <div className="flex flex-col gap-2 border-b border-black/5 pb-10">
                            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]">Counter-Reading Matrix</h2>
                            <p className="text-[15px] leading-relaxed text-[#515151] font-medium">Polysemic deconstruction via critical theory.</p>
                        </div>
                        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
                            {((extraction.full_dossier as any).counter_reading_matrix as { lens: string; reading: string }[]).map((item, i) => (
                                <div key={i} className="flex min-h-[160px] flex-col rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8 text-[#141414] transition-all hover:bg-white hover:shadow-md hover:border-[#D4A574]/30">
                                    <h3 className="mb-6 w-full border-b border-black/5 pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#8B6A3D]">
                                        {item.lens}
                                    </h3>
                                    <p className="text-[14px] leading-relaxed text-[#515151] font-medium">
                                        {item.reading}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
