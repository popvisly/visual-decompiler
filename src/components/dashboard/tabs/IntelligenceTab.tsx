"use client";

import React from 'react';
import CountUpPercent from '@/components/CountUpPercent';
import { firstSentence } from '@/lib/utils';
import { PRIMARY_SCORE_DISPLAY_LABELS } from '@/lib/constants';

interface IntelligenceTabProps {
    dossier: any;
    analysisLanguage: any;
    sampleMode: boolean;
    dossierCampaignBrand: string;
    dossierCampaignCode: string;
    dossierPreparedFor: string;
    dossierModeLabel: string;
    dossierReportDate: string;
    supportingCopyPath: string;
    structuralSummary: string;
    confidenceRationale: string;
}

export default function IntelligenceTab({
    dossier,
    analysisLanguage,
    sampleMode,
    dossierCampaignBrand,
    dossierCampaignCode,
    dossierPreparedFor,
    dossierModeLabel,
    dossierReportDate,
    supportingCopyPath,
    structuralSummary,
    confidenceRationale,
}: IntelligenceTabProps) {
    return (
        <div className="flex flex-col gap-6">
            {sampleMode ? (
                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Dossier Snapshot</p>
                        <div className="h-px w-8 bg-black/10" />
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="rounded-[1.8rem] border border-black/5 bg-[#FCFBF9] p-8">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-4">Campaign</p>
                            <h2 className="text-[26px] font-black tracking-tight text-[#141414] leading-none mb-2 uppercase">{dossierCampaignBrand}</h2>
                            <p className="text-[14px] font-bold tracking-widest text-[#6B6B6B] leading-none uppercase">{dossierCampaignCode}</p>
                        </div>
                        <div className="rounded-[1.8rem] border border-black/5 bg-[#FCFBF9] p-8">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-4">Prepared For</p>
                            <p className="text-[18px] font-black tracking-tight text-[#141414] uppercase leading-tight">{dossierPreparedFor}</p>
                        </div>
                        <div className="rounded-[1.8rem] border border-black/5 bg-[#FCFBF9] p-8">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-4">Mode & Date</p>
                            <p className="text-[18px] font-black tracking-tight text-[#141414] mb-2 uppercase leading-tight">{dossierModeLabel}</p>
                            <p className="text-[12px] font-bold tracking-[0.1em] text-[#6B6B6B] uppercase">{dossierReportDate}</p>
                        </div>
                    </div>

                    <div className="mt-10 pt-10 border-t border-black/5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-8">Primary Scores</p>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                            {analysisLanguage.primaryScores.map((score: any) => (
                                <div
                                    key={score.label}
                                    className="group rounded-[1.8rem] border border-black/5 bg-[#FCFBF9] p-8 text-center transition-all hover:bg-white hover:shadow-md hover:border-[#D4A574]/30"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-4 group-hover:text-[#141414] transition-colors">
                                        {PRIMARY_SCORE_DISPLAY_LABELS[score.label] || score.label}
                                    </p>
                                    <p className="text-[38px] font-black tracking-tighter text-[#141414] tabular-nums leading-none">
                                        {score.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-2 rounded-[2.5rem] border border-black/5 bg-[#1B1B19] p-10 shadow-[0_18px_40px_rgba(20,20,20,0.12)] flex flex-col justify-center text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D9B07A]">Campaign Identity</p>
                                <div className="h-px w-8 bg-white/12" />
                            </div>
                            <h2 className="text-[32px] font-black tracking-tight text-white leading-none mb-2 uppercase">{dossierCampaignBrand}</h2>
                            <p className="text-[16px] font-semibold tracking-[0.1em] text-white/55 leading-none uppercase">{dossierCampaignCode}</p>
                        </div>
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col justify-center">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-6">Prepared For</p>
                            <p className="text-[18px] font-black tracking-tight text-[#141414] uppercase leading-tight">{dossierPreparedFor}</p>
                        </div>
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col justify-center">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-6">Mode & Date</p>
                            <p className="text-[18px] font-black tracking-tight text-[#141414] mb-2 uppercase leading-tight">{dossierModeLabel}</p>
                            <p className="text-[12px] font-bold tracking-[0.1em] text-[#6B6B6B] uppercase">{dossierReportDate}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                        {analysisLanguage.primaryScores.map((score: any) => (
                            <div key={score.label} className="group rounded-[2rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:border-[#D4A574]/30">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] mb-6 group-hover:text-[#141414] transition-colors">
                                    {PRIMARY_SCORE_DISPLAY_LABELS[score.label] || score.label}
                                </p>
                                <p className="text-[44px] font-black tracking-tighter text-[#141414] tabular-nums leading-none">{score.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid gap-6 xl:grid-cols-3 items-start mt-6">
                <div className="xl:col-span-2 flex flex-col gap-6">
                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">The Strategic Ritual</p>
                            <div className="h-px w-8 bg-black/10" />
                        </div>
                        <div className="grid gap-10 md:grid-cols-2">
                            {[
                                ['Strategic Thesis', firstSentence(analysisLanguage.strategicRead.thesis)],
                                ['Trigger Mechanic', firstSentence(analysisLanguage.strategicRead.triggerMechanic)],
                                ['Friction Points', firstSentence(analysisLanguage.strategicRead.frictionPoints)],
                                ['Category Positioning', firstSentence(analysisLanguage.strategicRead.categoryPositioning)],
                            ].map(([label, value]) => (
                                <div key={label as string}>
                                    <p className="text-[11px] font-black uppercase tracking-widest text-[#141414] mb-3">{label as string}</p>
                                    <p className="text-[14px] leading-relaxed text-[#515151] font-medium">{value as string}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Attention Path</p>
                            <div className="h-px w-8 bg-black/10" />
                        </div>
                        <div className="grid gap-10 md:grid-cols-3">
                            {[
                                ['Product Silhouette', analysisLanguage.attentionPath.primaryFocus],
                                ['Brand Mark', analysisLanguage.attentionPath.secondaryFocus],
                                ['Supporting Copy Layer', supportingCopyPath],
                            ].map(([title, detail], index) => (
                                <div key={title as string} className="flex flex-col gap-5">
                                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBFBF6] border border-black/10 text-[13px] font-black text-[#141414] shadow-sm">{index + 1}</span>
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-widest text-[#141414] mb-2">{title as string}</p>
                                        <p className="text-[13px] leading-relaxed text-[#515151] font-medium">{detail as string}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1 flex flex-col gap-6">
                    <div className="border border-black/5 bg-white shadow-sm flex flex-col rounded-[2.5rem] overflow-hidden">
                        <div className="p-10 border-b border-black/5">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-8">Structural Signals</p>
                            <div className="space-y-4">
                                {analysisLanguage.structuralSignals.map((signal: any) => (
                                    <div key={signal.label} className="flex justify-between items-center bg-[#FBFBF6] px-6 py-4 rounded-2xl border border-black/5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B]">{signal.label}</span>
                                        <span className="text-[11px] font-black uppercase tracking-widest text-[#141414]">{signal.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-10 bg-[#FCFBF9]">
                            <p className="text-[11px] font-black uppercase tracking-widest text-[#141414] mb-4">Structural Verdict</p>
                            <p className="text-[13px] leading-relaxed text-[#515151] font-medium">{structuralSummary}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="border border-black/5 p-10 shadow-sm flex flex-col bg-[#FBFBF6] rounded-[2.5rem]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] mb-6">Drop-Off Detected</p>
                            <p className="text-[14px] leading-relaxed text-[#515151] font-medium">{analysisLanguage.attentionPath.dropOff}</p>
                        </div>
                        <div className="rounded-[2.5rem] border border-black/5 bg-[#1A1A1A] text-white p-10 shadow-sm flex flex-col min-h-[260px]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A574] mb-8">Confidence Index</p>
                            <div className="flex items-baseline gap-3 mb-6">
                                <p className="text-5xl font-black tracking-tighter text-white tabular-nums">{analysisLanguage.confidenceIndex}</p>
                                <p className="text-[14px] font-bold tracking-[0.2em] uppercase text-white/40">/ 100</p>
                            </div>
                            <p className="text-[13px] leading-relaxed text-white/50 font-medium mt-auto block">{confidenceRationale}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
