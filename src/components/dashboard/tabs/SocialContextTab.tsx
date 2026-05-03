"use client";

import React from 'react';
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

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
                    {/* Left Column Stack */}
                    <div className="flex flex-col gap-6">
                        <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Social Context Scoreboard</p>
                            <div className="overflow-hidden rounded-[1.8rem] border border-black/5 bg-[#FBFBF6]">
                                <div className="grid grid-cols-12 border-b border-black/5 px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#141414]/60">
                                    <span className="col-span-5">Platform Channel</span>
                                    <span className="col-span-4 text-center">Efficiency Score</span>
                                    <span className="col-span-3 text-right">Protocol Signal</span>
                                </div>
                                {socialContext.platformScores.map((row) => (
                                    <div key={row.platform} className="grid grid-cols-12 items-center border-b border-black/5 px-8 py-6 text-[15px] last:border-b-0 bg-white transition-colors hover:bg-[#FBFBF6]">
                                        <span className="col-span-5 font-black uppercase tracking-tight text-[#141414]">{row.platform}</span>
                                        <span className="col-span-4 text-center text-[24px] font-black leading-none text-[#141414] tabular-nums">{row.score}</span>
                                        <span className={'col-span-3 text-right text-[10px] font-black uppercase tracking-[0.1em] ' + (row.signal === 'Strong' ? 'text-[#8B6A3D]' : row.signal === 'Usable' ? 'text-[#141414]' : 'text-[#d9a69c]')}>
                                            {row.signal}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Creative Risk Flags</p>
                            <div className="space-y-4">
                                {socialContext.riskFlags.map((flag, index) => (
                                    <div key={index} className="rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6 text-[#141414] relative overflow-hidden group">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d9a69c] opacity-40" />
                                        <p className="text-[14px] font-medium leading-relaxed text-[#515151] group-hover:text-[#141414] transition-colors">{flag}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column Stack */}
                    <div className="flex flex-col gap-6">
                        <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Hook & Hold Diagnostics</p>
                            <div className="space-y-4">
                                {[
                                    ['First-2s Clarity', socialContext.hookHoldDiagnostics.first2sClarity],
                                    ['Thumb-Stop Strength', socialContext.hookHoldDiagnostics.thumbStopStrength],
                                    ['Readability at Speed', socialContext.hookHoldDiagnostics.readabilityAtSpeed],
                                    ['Message Retention', socialContext.hookHoldDiagnostics.messageRetention],
                                ].map(([label, detail]) => (
                                    <div key={label as string} className="rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6 transition-all hover:bg-white hover:shadow-md">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B6A3D]">{label}</p>
                                        <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#515151]">{detail as string}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm flex flex-col">
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D] mb-8 border-b border-black/5 pb-6">Social Adaptation Protocol</p>
                            <div className="space-y-4">
                                {socialContext.adaptationMoves.map((move) => (
                                    <div key={move.platform} className="rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6 transition-all hover:bg-white hover:shadow-md">
                                        <div className="flex items-start gap-5">
                                            <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white shadow-sm text-[12px] font-black tracking-wider text-[#8B6A3D]">
                                                {SOCIAL_PLATFORM_GLYPHS[move.platform] || 'SP'}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#141414]">{move.platform}</p>
                                                <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#515151]">{move.move}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
