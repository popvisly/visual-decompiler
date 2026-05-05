"use client";

import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import { BLUEPRINT_STEPS } from '@/lib/constants';
import { firstSentence } from '@/lib/utils';

interface BlueprintTabProps {
    blueprintData: any;
    blueprintStatusLabel: string;
    isGeneratingBlueprint: boolean;
    blueprintStep: number;
    blueprintProgress: number;
    handleGenerateBlueprint: () => void;
    extraction: any;
}

export default function BlueprintTab({
    blueprintData,
    blueprintStatusLabel,
    isGeneratingBlueprint,
    blueprintStep,
    blueprintProgress,
    handleGenerateBlueprint,
    extraction,
}: BlueprintTabProps) {
    const normalizeProseText = (value: string | undefined | null) => {
        if (!value) return '';
        return value.replace(/\s+/g, ' ').trim();
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-6">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="Blueprint Logic"
                        title="Blueprint Logic: Audit & Reproducibility"
                        intro="This section outlines the reconstruction path used to audit the route, validate constraints, and assess reproducibility."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="Blueprint Trace"
                        title={blueprintData ? 'The working logic is ready for controlled reproduction.' : 'Blueprint Trace needs route calibration.'}
                        body={blueprintData?.execution_constraints?.primary_trigger || 'Generate the blueprint to separate transferable persuasion DNA from surface aesthetics before briefing variants or production remixes.'}
                        metrics={[
                            { label: 'Status', value: blueprintStatusLabel },
                            { label: 'Keeps', value: blueprintData?.execution_constraints?.must_include?.length || 0 },
                            { label: 'Variants', value: blueprintData?.visual_variant_prompts?.length || 0 },
                        ]}
                        actions={[
                            blueprintData?.execution_constraints?.must_include?.[0] || 'Generate the blueprint architecture.',
                            blueprintData?.technical_specs?.lighting_architecture || 'Validate production cues before adapting.',
                            blueprintData?.visual_variant_prompts?.[0]?.concept || 'Create one controlled route variation.',
                        ].map((item) => firstSentence(normalizeProseText(item))).filter(Boolean)}
                    />
                </div>

                {!blueprintData ? (
                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-12 text-center text-[#141414] shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-16 h-16 flex items-center justify-center border border-black/10 bg-[#FBFBF6] mb-8 rounded-[1.2rem] text-[#8B6A3D] shadow-sm">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <h3 className="text-[24px] font-black tracking-tight mb-4 uppercase">Blueprint Trace Offline</h3>
                        <p className="mb-10 max-w-sm text-[15px] text-[#515151] font-medium leading-relaxed">
                            System requires route calibration to generate the audit-ready blueprint architecture.
                        </p>

                        {isGeneratingBlueprint && (
                            <div className="mb-12 w-full max-w-md rounded-[1.8rem] border border-black/5 p-10 bg-[#FBFBF6] shadow-inner">
                                <div className="flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#8B6A3D] mb-8 font-mono">
                                    <span>{BLUEPRINT_STEPS[blueprintStep]}</span>
                                    <span>{blueprintProgress}%</span>
                                </div>
                                <div className="h-[2px] w-full bg-white rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#D4A574] shadow-[0_0_10px_rgba(212,165,116,0.25)] transition-all duration-700"
                                        style={{ width: `${blueprintProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleGenerateBlueprint}
                            disabled={isGeneratingBlueprint || !extraction}
                            className="rounded-full bg-[#141414] text-white px-12 py-5 text-[11px] font-black tracking-[0.4em] uppercase hover:bg-black transition-all disabled:opacity-50 active:scale-95 shadow-lg"
                        >
                            {isGeneratingBlueprint ? 'Generating Architecture...' : 'Initiate Blueprint'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-8 rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] md:flex-row md:items-center md:justify-between shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="h-14 w-14 rounded-2xl bg-[#FBFBF6] border border-black/5 flex items-center justify-center text-[#8B6A3D]">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#8B6A3D]">Blueprint Trace Active · Vault Index</p>
                                    <p className="mt-1 text-[15px] font-medium text-[#515151]">Indexed for reproducibility and multi-agent audit.</p>
                                </div>
                            </div>
                            <button
                                onClick={handleGenerateBlueprint}
                                disabled={isGeneratingBlueprint}
                                className="flex items-center gap-4 rounded-full border border-black/10 bg-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#141414] transition-all hover:bg-[#141414] hover:text-white disabled:opacity-50 shadow-sm"
                            >
                                <RefreshCw className={`h-4 w-4 ${isGeneratingBlueprint ? 'animate-spin' : ''}`} />
                                {isGeneratingBlueprint ? 'Refreshing...' : 'Refresh Trace'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#8B6A3D]">Reproduction Logic</p>
                                    <div className="h-px w-8 bg-black/10" />
                                </div>
                                <p className="mb-10 max-w-[70ch] text-[15px] font-medium leading-relaxed text-[#515151]">
                                    Reconstruction logic below provides an auditable handoff from diagnosis to execution framing.
                                </p>
                                <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 mb-10">
                                    {[
                                        { label: 'Subject', value: firstSentence(normalizeProseText(blueprintData.execution_constraints?.primary_trigger)) || 'Primary subject lock captured from forensic route.' },
                                        { label: 'Setting', value: firstSentence(normalizeProseText(blueprintData.technical_specs?.material_cues?.[0])) || 'Controlled studio context with minimal environmental noise.' },
                                        { label: 'Lighting', value: firstSentence(normalizeProseText(blueprintData.technical_specs?.lighting_architecture)) || 'Soft, directional lighting architecture retained from route.' },
                                    ].map((item) => (
                                        <div key={item.label} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8 transition-all hover:bg-white hover:shadow-md">
                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8B6A3D] mb-4">{item.label}</p>
                                            <p className="text-[14px] leading-relaxed text-[#515151] font-medium">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-[1.8rem] border border-black/5 bg-[#1A1A1A] p-8 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <RefreshCw className="h-24 w-24 text-[#D4A574]" />
                                    </div>
                                    <div className="mb-6 border-b border-white/10 pb-6">
                                        <p className="text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-[#D9B07A]">Verified DNA Prompt</p>
                                    </div>
                                    <pre className="whitespace-pre-wrap text-[14px] leading-loose text-white/80 font-mono tracking-tight selection:bg-[#D4A574]/30 relative z-10">
                                        {blueprintData.verified_dna_prompt}
                                    </pre>
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col">
                                <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Primary Trigger</p>
                                <p className="max-w-[64ch] text-[18px] font-black tracking-tight text-[#141414] leading-relaxed mb-8 uppercase">{normalizeProseText(blueprintData.execution_constraints?.primary_trigger)}</p>
                                <div className="space-y-4 pt-8 border-t border-black/5">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8B6A3D]">Mechanism Protocols</p>
                                    <div className="grid gap-4">
                                        {[
                                            'Desire transfer routes from subject value to product object.',
                                            'Gaze vector and composition reinforce aspirational authority.',
                                            'Chromatic continuity holds narrative pressure through the frame.',
                                        ].map((text) => (
                                            <div key={text} className="rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6">
                                                <div className="flex gap-4 text-[14px] leading-relaxed text-[#515151] font-medium">
                                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4A574]" />
                                                    {text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col">
                                <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Aesthetic Architecture</p>
                                <div className="grid gap-4">
                                    {[
                                        firstSentence(normalizeProseText(blueprintData.technical_specs?.lighting_architecture)) || 'Lighting architecture captured in route trace.',
                                        firstSentence(normalizeProseText(blueprintData.technical_specs?.gaze_vector)) || 'Gaze topology remains controlled and directional.',
                                        firstSentence(normalizeProseText(blueprintData.technical_specs?.material_cues?.join(', '))) || 'Material cues preserve surface authority and status coding.',
                                    ].map((text, idx) => (
                                        <div key={idx} className="rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6 transition-all hover:bg-white hover:shadow-md">
                                            <div className="flex gap-5 items-start">
                                                <div className="h-10 w-10 shrink-0 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[13px] font-black text-[#141414] shadow-sm">
                                                    {idx + 1}
                                                </div>
                                                <p className="pt-1 text-[14px] leading-relaxed text-[#515151] font-medium">{text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-black/5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#D4A574] animate-pulse" />
                                        <span className="text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-[#8B6A3D]">Reproducibility Confirmed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
