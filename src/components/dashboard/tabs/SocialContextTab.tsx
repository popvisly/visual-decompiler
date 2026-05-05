"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CountUpPercent from '@/components/CountUpPercent';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import { SocialContextModel, SOCIAL_PLATFORM_GLYPHS } from '@/types/dashboard';

interface SocialContextTabProps {
    socialContext: SocialContextModel;
    strongestSocialPlatform: { platform: string; score: number; signal: string };
    socialRiskCount: number;
}

export default function SocialContextTab({
    socialContext,
    strongestSocialPlatform,
    socialRiskCount,
}: SocialContextTabProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-6">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="SOCIAL CONTEXT"
                        title="Social-First Execution"
                        intro="Platform-context scoring that translates creative quality into feed performance readiness."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="Platform Readiness"
                        title={`${strongestSocialPlatform.platform} is the strongest current social lane.`}
                        body="This module translates the single-asset read into feed behavior: where the creative can hold attention, where it risks drop-off, and what adaptation moves should happen before distribution."
                        metrics={[
                            { label: 'Top Score', value: `${strongestSocialPlatform.score}/100` },
                            { label: 'Signal', value: strongestSocialPlatform.signal },
                            { label: 'Risk Flags', value: socialRiskCount },
                        ]}
                        actions={[
                            socialContext.hookHoldDiagnostics.first2sClarity,
                            socialContext.hookHoldDiagnostics.thumbStopStrength,
                            socialContext.adaptationMoves[0]?.move || 'Create a platform-specific adaptation before export.',
                        ].filter(Boolean)}
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Social Context Scoreboard</p>
                        <div className="grid gap-4 xl:grid-cols-2">
                            {socialContext.platformScores.map((row) => (
                                <div key={row.platform} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-6 transition-colors hover:bg-white hover:shadow-md">
                                    <div className="flex items-start justify-between gap-6">
                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#141414]">{row.platform}</p>
                                            <p className={'mt-3 text-[10px] font-black uppercase tracking-[0.12em] ' + (row.signal === 'Strong' ? 'text-[#8B6A3D]' : row.signal === 'Usable' ? 'text-[#141414]' : 'text-[#d9a69c]')}>
                                                {row.signal}
                                            </p>
                                        </div>
                                        <span className="text-[28px] font-black leading-none text-[#141414] tabular-nums">{row.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Hook & Hold Diagnostics</p>
                        <div className="grid gap-4">
                            {[
                                ['First-2s Clarity', socialContext.hookHoldDiagnostics.first2sClarity],
                                ['Thumb-Stop Strength', socialContext.hookHoldDiagnostics.thumbStopStrength],
                                ['Readability at Speed', socialContext.hookHoldDiagnostics.readabilityAtSpeed],
                                ['Message Retention', socialContext.hookHoldDiagnostics.messageRetention],
                            ].map(([label, detail]) => (
                                <div key={label as string} className="rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6 transition-all hover:bg-white hover:shadow-md">
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">{label}</p>
                                    <p className="mt-3 max-w-[72ch] text-[14px] font-medium leading-relaxed text-[#515151]">{detail as string}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {socialContext.riskFlags.length > 0 && (
                        <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Creative Risk Flags</p>
                            <div className="grid gap-4">
                                {socialContext.riskFlags.map((flag, index) => (
                                    <div key={index} className="rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6 text-[#141414] relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d9a69c] opacity-40" />
                                        <p className="max-w-[72ch] text-[14px] font-medium leading-relaxed text-[#515151]">{flag}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Social Adaptation Protocol</p>
                        <div className="grid gap-4 xl:grid-cols-2">
                            {socialContext.adaptationMoves.map((move) => (
                                <div key={move.platform} className="rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6 transition-all hover:bg-white hover:shadow-md">
                                    <div className="flex items-start gap-5">
                                        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white shadow-sm text-[12px] font-black tracking-wider text-[#8B6A3D]">
                                            {SOCIAL_PLATFORM_GLYPHS[move.platform] || 'SP'}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#141414]">{move.platform}</p>
                                            <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#515151]">{move.move}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                        <div className="flex items-center justify-between gap-6 mb-8 border-b border-black/5 pb-6">
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Top Score</p>
                            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.14em] text-[#141414]/45">
                                {strongestSocialPlatform.platform}
                            </span>
                        </div>
                        <p className="max-w-[68ch] text-[14px] font-medium leading-relaxed text-[#515151]">
                            The strongest current platform lane shows where the asset already has the best chance of holding attention without heavy adaptation.
                        </p>
                        <div className="mt-10 flex items-end justify-between gap-6">
                            <div className="text-[84px] font-black leading-none tracking-tight text-[#141414] tabular-nums">
                                <CountUpPercent value={strongestSocialPlatform.score} />%
                            </div>
                            <p className="pb-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">
                                {strongestSocialPlatform.signal}
                            </p>
                        </div>
                        <div className="mt-8">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
                                <motion.div
                                    className="h-full bg-[#8B6A3D]"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${Math.max(0, Math.min(100, strongestSocialPlatform.score))}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
