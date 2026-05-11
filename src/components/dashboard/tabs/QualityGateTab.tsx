"use client";

import React from 'react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import SovereignProcessingView from '@/components/SovereignProcessingView';
import CountUpPercent from '@/components/CountUpPercent';
import { motion } from 'framer-motion';
import { IntegratedRecommendationData, AnalysisLanguageSystem } from '@/types/dashboard';
import { firstSentence } from '@/lib/utils';
import { PRIMARY_SCORE_DISPLAY_LABELS } from '@/lib/constants';

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
    const confidenceValue =
        analysisLanguage.confidenceIndex === 'High'
            ? 90
            : analysisLanguage.confidenceIndex === 'Medium'
                ? 65
                : 45;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-8">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="INTELLIGENCE"
                        title="The Strategic Protocol"
                        intro="A structured read organized into Primary Scores, Attention Path, Structural Signals, Strategic Read, and Confidence Index."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="The Verdict"
                        title={integratedRecommendation.recommendedDirection}
                        body={analysisLanguage.strategicRead.thesis}
                        metricStyle="executive"
                        metrics={[
                            { label: 'Mechanic', value: extraction?.primary_mechanic || 'Pending' },
                            { label: 'Confidence', value: `${analysisLanguage.confidenceIndex} / 100` },
                            { label: 'Decision', value: integratedRecommendation.decision.toUpperCase() },
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
                        <div className="grid gap-6">
                            <div className="rounded-[2.5rem] border border-black/5 bg-[#1B1B19] p-10 text-white shadow-[0_18px_40px_rgba(20,20,20,0.12)]">
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D9B07A]">Campaign Identity</p>
                                        <div className="h-px w-8 bg-white/12" />
                                    </div>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <motion.div
                                            initial={{ opacity: 0, y: 22 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.45 }}
                                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                            className="rounded-[1.8rem] border border-white/8 bg-white/[0.03] p-8"
                                        >
                                            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#D9B07A]">Brand</p>
                                            <h2 className="mb-2 text-[28px] font-black leading-none tracking-tight text-white uppercase">{dossierCampaignBrand}</h2>
                                            <p className="text-[14px] font-semibold leading-none tracking-[0.14em] text-white/55 uppercase">{dossierCampaignCode}</p>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 22 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.45 }}
                                            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                                            className="rounded-[1.8rem] border border-white/8 bg-white/[0.03] p-8"
                                        >
                                            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#D9B07A]">Meta</p>
                                            <p className="mb-2 text-[15px] font-semibold leading-tight tracking-[-0.01em] text-white uppercase">{dossierPreparedFor}</p>
                                            <p className="text-[12px] font-medium tracking-[0.12em] text-white/55 uppercase">{dossierModeLabel} // {dossierReportDate}</p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Primary Scores</p>
                                    <div className="h-px w-8 bg-black/10" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                                    {analysisLanguage.primaryScores.map((score, index) => (
                                        <motion.div
                                            key={score.label}
                                            initial={{ opacity: 0, y: 18 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.45 }}
                                            transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                            className="rounded-2xl border border-black/5 bg-[#FBFBF6] p-6 transition-all hover:bg-white hover:shadow-md hover:border-[#D4A574]/20"
                                        >
                                            <p className="mb-4 text-[9px] font-black uppercase tracking-[0.24em] text-[#8B6A3D]">
                                                {(PRIMARY_SCORE_DISPLAY_LABELS as any)[score.label.toLowerCase()] || score.label}
                                            </p>
                                            <p className="text-[30px] font-black tracking-tighter text-[#141414] tabular-nums leading-none">
                                                <CountUpPercent value={score.value} />
                                            </p>
                                            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                                                <motion.div
                                                    className="h-full bg-[#8B6A3D]"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${Math.max(0, Math.min(100, score.value))}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.1, delay: 0.12 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Attention Path & Strategic Read */}
                        <div className="grid gap-8">
                            <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-10">Attention Path Analysis</p>
                                <div className="grid gap-5">
                                    {[
                                        ['Primary Focus', analysisLanguage.attentionPath.primaryFocus],
                                        ['Secondary Focus', analysisLanguage.attentionPath.secondaryFocus],
                                        ['Drop-off Point', supportingCopyPath],
                                    ].map(([title, detail], index) => (
                                        <motion.div
                                            key={title as string}
                                            initial={{ opacity: 0, x: -18 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.4 }}
                                            transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                            className="relative rounded-2xl border border-black/5 bg-[#FBFBF6] p-6"
                                        >
                                            <div className="flex items-start gap-4">
                                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-black/10 text-[13px] font-black text-[#141414] shadow-sm">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                <p className="text-[11px] font-black uppercase tracking-widest text-[#141414] mb-2 leading-none">{title as string}</p>
                                                <p className="text-[13px] leading-relaxed text-[#515151] font-medium">{detail as string}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-12 pt-10 border-t border-black/5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-10">The Strategic Protocol</p>
                                    <div className="grid gap-8">
                                        {[
                                            ['Central Thesis', firstSentence(analysisLanguage.strategicRead.thesis)],
                                            ['Trigger Mechanic', firstSentence(analysisLanguage.strategicRead.triggerMechanic)],
                                            ['Friction Points', firstSentence(analysisLanguage.strategicRead.frictionPoints)],
                                            ['Category Positioning', firstSentence(analysisLanguage.strategicRead.categoryPositioning)],
                                        ].map(([label, value], index) => (
                                            <motion.div
                                                key={label as string}
                                                initial={{ opacity: 0, y: 16 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, amount: 0.35 }}
                                                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                                className="border-l-2 border-[#D4A574]/25 pl-5"
                                            >
                                                <p className="text-[11px] font-black uppercase tracking-widest text-[#141414] mb-3">{label as string}</p>
                                                <p className="text-[14px] leading-relaxed text-[#515151] font-medium">{value as string}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-10">Structural Signals</p>
                                <div className="grid gap-4 xl:grid-cols-2">
                                    {analysisLanguage.structuralSignals.map((signal, index) => (
                                        <motion.div
                                            key={signal.label}
                                            initial={{ opacity: 0, y: 18 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.35 }}
                                            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                            className="flex flex-col justify-between rounded-2xl border border-black/5 bg-[#FBFBF6] p-6 hover:bg-white transition-all hover:shadow-md"
                                        >
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[#8B6A3D] mb-4">{signal.label}</span>
                                            <span className="text-[14px] font-black uppercase tracking-widest text-[#141414]">{signal.value}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-10 border-t border-black/5 pt-10">
                                    <p className="mb-4 text-[11px] font-black uppercase tracking-widest text-[#141414]">Structural Verdict</p>
                                    <p className="max-w-[72ch] text-[13px] leading-relaxed text-[#515151] font-medium">{structuralSummary}</p>
                                </div>
                            </div>

                            <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)]">
                                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-10">Persuasion Density</p>
                                    <div className="flex h-full flex-col justify-center">
                                        <p className="max-w-[72ch] text-[14px] leading-relaxed text-[#515151] font-medium">
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

                                        <div className="mt-10">
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
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
                                </div>

                                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                                    <div className="flex items-center justify-between mb-10">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Forensic Index</p>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#141414]/20 font-mono">Forensic Index v2</span>
                                    </div>
                                    <div className="flex items-baseline gap-4">
                                        <p className="text-[64px] font-black tracking-tighter text-[#141414] tabular-nums leading-none">
                                            <CountUpPercent value={confidenceValue} />
                                            +
                                        </p>
                                        <p className="text-[14px] font-black tracking-[0.2em] uppercase text-[#8B6A3D]">/ 100</p>
                                    </div>
                                    <p className="mt-8 text-[12px] font-medium leading-relaxed text-[#6B6B6B]">
                                        Mathematical certainty of the extraction based on architectural alignment and semantic consistency.
                                    </p>
                                    <div className="mt-10">
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
                                            <motion.div
                                                className="h-full bg-[#141414]"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${confidenceValue}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        </div>
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
                                        {typeof frictionScore === 'number' ? (
                                            <>
                                                <CountUpPercent value={Math.round(frictionScore)} />%
                                            </>
                                        ) : (
                                            '—'
                                        )}
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
