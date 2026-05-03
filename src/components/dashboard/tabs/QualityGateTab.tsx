"use client";

import React from 'react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import SovereignProcessingView from '@/components/SovereignProcessingView';
import CountUpPercent from '@/components/CountUpPercent';
import { motion } from 'framer-motion';
import { IntegratedRecommendationData, AnalysisLanguageSystem } from '@/types/dashboard';
import { firstSentence, PRIMARY_SCORE_DISPLAY_LABELS } from '@/lib/utils';

interface QualityGateTabProps {
    asset: any;
    extraction: any;
    agency?: any;
    integratedRecommendation: IntegratedRecommendationData;
    analysisLanguage: AnalysisLanguageSystem;
    sampleMode: boolean;
    dossierCampaignBrand: string;
    dossierCampaignCode: string;
    dossierPreparedFor: string;
    dossierModeLabel: string;
    dossierReportDate: string;
    supportingCopyPath: string;
    structuralSummary: string;
    persuasionDensity: number | null;
    frictionScore: number | null;
}

export default function QualityGateTab({
    asset,
    extraction,
    agency,
    integratedRecommendation,
    analysisLanguage,
    sampleMode,
    dossierCampaignBrand,
    dossierCampaignCode,
    dossierPreparedFor,
    dossierModeLabel,
    dossierReportDate,
    supportingCopyPath,
    structuralSummary,
    persuasionDensity,
    frictionScore
}: QualityGateTabProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-8">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="INTELLIGENCE"
                        title="Strategic Insight Overview"
                        intro="A structured read organized into Primary Scores, Attention Path, Structural Signals, Strategic Read, and Confidence Index."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="Executive Read"
                        title={integratedRecommendation.recommendedDirection}
                        body={analysisLanguage.strategicRead.thesis}
                        metrics={[
                            { label: 'Mechanic', value: extraction?.primary_mechanic || 'Pending' },
                            { label: 'Confidence', value: `${analysisLanguage.confidenceIndex}/100` },
                            { label: 'Decision', value: integratedRecommendation.decision },
                        ]}
                        actions={[
                            firstSentence(analysisLanguage.strategicRead.triggerMechanic),
                            firstSentence(analysisLanguage.strategicRead.frictionPoints),
                            integratedRecommendation.executionNext3[0],
                        ].filter(Boolean)}
                    />
                </div>

                {(!extraction?.primary_mechanic || !extraction?.full_dossier) && (
                    <SovereignProcessingView assetId={asset.id} agency={agency} />
                )}

                {extraction?.primary_mechanic && extraction?.full_dossier && (
                    <div className="flex flex-col gap-8">
                        {/* Campaign Identity & Primary Scores */}
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                            <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,1.2fr)]">
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Campaign Identity</p>
                                        <div className="h-px w-8 bg-black/10" />
                                    </div>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="rounded-2xl border border-black/5 bg-[#FBFBF6] p-8">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-4">Brand</p>
                                            <h2 className="text-[26px] font-black tracking-tight text-[#141414] leading-none mb-2 uppercase">{dossierCampaignBrand}</h2>
                                            <p className="text-[14px] font-bold tracking-widest text-[#6B6B6B] leading-none uppercase">{dossierCampaignCode}</p>
                                        </div>
                                        <div className="rounded-2xl border border-black/5 bg-[#FBFBF6] p-8">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-4">Meta</p>
                                            <p className="text-[15px] font-black tracking-tight text-[#141414] uppercase leading-tight mb-2">{dossierPreparedFor}</p>
                                            <p className="text-[12px] font-bold tracking-[0.1em] text-[#6B6B6B] uppercase">{dossierModeLabel} // {dossierReportDate}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Primary Scores</p>
                                        <div className="h-px w-8 bg-black/10" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                                        {analysisLanguage.primaryScores.map((score) => (
                                            <div
                                                key={score.label}
                                                className="group rounded-2xl border border-black/5 bg-[#FBFBF6] p-6 text-center transition-all hover:bg-white hover:shadow-xl hover:border-[#D4A574]/30"
                                            >
                                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] mb-4 group-hover:text-[#141414] transition-colors">
                                                    {(PRIMARY_SCORE_DISPLAY_LABELS as any)[score.label.toLowerCase()] || score.label}
                                                </p>
                                                <p className="text-[32px] font-black tracking-tighter text-[#141414] tabular-nums leading-none">
                                                    {score.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attention Path & Strategic Read */}
                        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                            <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-10">Attention Path Analysis</p>
                                <div className="grid gap-8 md:grid-cols-3">
                                    {[
                                        ['Primary Focus', analysisLanguage.attentionPath.primaryFocus],
                                        ['Secondary Focus', analysisLanguage.attentionPath.secondaryFocus],
                                        ['Drop-off Point', supportingCopyPath],
                                    ].map(([title, detail], index) => (
                                        <div key={title as string} className="flex flex-col gap-6 relative">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-black/10 text-[14px] font-black text-[#141414] shadow-sm group-hover:bg-[#141414] group-hover:text-white transition-colors">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <p className="text-[11px] font-black uppercase tracking-widest text-[#141414] mb-3 leading-none">{title as string}</p>
                                                <p className="text-[13px] leading-relaxed text-[#515151] font-medium">{detail as string}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 pt-10 border-t border-black/5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-10">Strategic Read</p>
                                    <div className="grid gap-10 md:grid-cols-2">
                                        {[
                                            ['Strategic Thesis', firstSentence(analysisLanguage.strategicRead.thesis)],
                                            ['Trigger Mechanic', firstSentence(analysisLanguage.strategicRead.triggerMechanic)],
                                            ['Friction Points', firstSentence(analysisLanguage.strategicRead.frictionPoints)],
                                            ['Category Positioning', firstSentence(analysisLanguage.strategicRead.categoryPositioning)],
                                        ].map(([label, value]) => (
                                            <div key={label as string} className="group">
                                                <p className="text-[11px] font-black uppercase tracking-widest text-[#141414] mb-3 group-hover:text-[#8B6A3D] transition-colors">{label as string}</p>
                                                <p className="text-[14px] leading-relaxed text-[#515151] font-medium">{value as string}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-8">
                                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-10">Structural Signals</p>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {analysisLanguage.structuralSignals.map((signal) => (
                                            <div key={signal.label} className="flex flex-col justify-between rounded-2xl border border-black/5 bg-[#FBFBF6] p-6 hover:bg-white transition-all hover:shadow-md">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-[#8B6A3D] mb-4">{signal.label}</span>
                                                <span className="text-[14px] font-black uppercase tracking-widest text-[#141414]">{signal.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 pt-10 border-t border-black/5">
                                        <p className="text-[11px] font-black uppercase tracking-widest text-[#141414] mb-4">Overall Structure</p>
                                        <p className="text-[13px] leading-relaxed text-[#515151] font-medium">{structuralSummary}</p>
                                    </div>
                                </div>

                                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                    <div className="flex items-center justify-between mb-10">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">System Confidence</p>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#141414]/20 font-mono">Forensic Index v2</span>
                                    </div>
                                    <div className="flex items-baseline gap-4">
                                        <p className="text-[64px] font-black tracking-tighter text-[#141414] tabular-nums leading-none">
                                            {analysisLanguage.confidenceIndex === 'High' ? '090+' : analysisLanguage.confidenceIndex === 'Medium' ? '065+' : '045+'}
                                        </p>
                                        <p className="text-[14px] font-black tracking-[0.2em] uppercase text-[#8B6A3D]">/ 100</p>
                                    </div>
                                    <p className="mt-8 text-[12px] font-medium leading-relaxed text-[#6B6B6B]">
                                        Mathematical certainty of the extraction based on architectural alignment and semantic consistency.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Persuasion Density & Cognitive Friction */}
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="flex h-full flex-col rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                                <div className="mb-10 flex min-h-[68px] items-start justify-between border-b border-black/5 pb-6">
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]">
                                        <span className="block">Persuasion Density</span>
                                        <span className="block">Compression</span>
                                    </p>
                                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-[#141414]/30">Data Load v2.0</span>
                                </div>

                                <p className="text-[14px] font-medium leading-relaxed text-[#515151]">
                                    Measures informational compression: how efficiently the creative transfers brand signal into consumer memory structures.
                                </p>

                                <div className="mt-12 flex flex-col items-center">
                                    <div className="text-[84px] font-black leading-none tracking-tight text-[#141414] tabular-nums">
                                        {typeof persuasionDensity === 'number' ? (
                                            <>
                                                <CountUpPercent value={Math.round(persuasionDensity)} />%
                                            </>
                                        ) : (
                                            '—'
                                        )}
                                    </div>
                                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Efficiency Index</p>
                                </div>

                                <div className="mt-auto pt-10">
                                    <div className="h-2 w-full rounded-full bg-black/5 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#8B6A3D]"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${typeof persuasionDensity === 'number' ? Math.max(0, Math.min(100, Math.round(persuasionDensity))) : 0}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex h-full flex-col rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                                <div className="mb-10 flex min-h-[68px] items-start justify-between border-b border-black/5 pb-6">
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]">
                                        <span className="block">Cognitive Friction</span>
                                        <span className="block">Resistance</span>
                                    </p>
                                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-[#141414]/30">Neural Load v1.0</span>
                                </div>

                                <p className="text-[14px] font-medium leading-relaxed text-[#515151]">
                                    Quantifies neural resistance to message adoption. Low scores indicate frictionless persuasion pathways and immediate comprehension.
                                </p>

                                <div className="mt-12 flex flex-col items-center">
                                    <div className="text-[84px] font-black leading-none tracking-tight text-[#141414] tabular-nums">
                                        {typeof frictionScore === 'number' ? Math.round(frictionScore) : '—'}%
                                    </div>
                                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Resistance Score</p>
                                </div>

                                <div className="mt-auto pt-10">
                                    <div className="h-2 w-full rounded-full bg-black/5 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#d9a69c]"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${typeof frictionScore === 'number' ? Math.max(0, Math.min(100, Math.round(frictionScore))) : 0}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                        />
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
