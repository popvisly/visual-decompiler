"use client";

import React from 'react';
import CountUpPercent from '@/components/CountUpPercent';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import { ContentSystemModel } from '@/types/dashboard';

interface ContentSystemContextTabProps {
    contentSystemContext: ContentSystemModel;
}

export default function ContentSystemContextTab({
    contentSystemContext,
}: ContentSystemContextTabProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-6">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="CONTENT SYSTEM CONTEXT"
                        title="Creator & Campaign Intelligence"
                        intro="Evaluates whether this asset can operate as part of a repeatable content system: role, sequence fit, creator-readiness, audience conditioning, and format scalability."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="System Active"
                        title={
                            contentSystemContext.secondaryRole
                                ? `${contentSystemContext.primaryRole} with ${contentSystemContext.secondaryRole.toLowerCase()} support.`
                                : `${contentSystemContext.primaryRole}.`
                        }
                        body="Use this module to decide sequence role, repeatability, and creator compatibility before scaling distribution."
                        metrics={[
                            { label: 'System Score', value: `${contentSystemContext.overallScore}/100` },
                            { label: 'Signal', value: contentSystemContext.overallSignal },
                            { label: 'Best Fit', value: contentSystemContext.sequenceRecommendation.bestFit },
                        ]}
                    />
                </div>

                <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                        <div className="rounded-[2rem] border border-black/5 bg-[#FBFBF6] p-8">
                            <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Strategic Read</p>
                            <div className="grid gap-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Primary Role</p>
                                    <p className="mt-3 text-[28px] font-black tracking-tight text-[#141414]">{contentSystemContext.primaryRole}</p>
                                </div>
                                {contentSystemContext.secondaryRole ? (
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Secondary Role</p>
                                        <p className="mt-3 text-[18px] font-semibold tracking-tight text-[#141414]">{contentSystemContext.secondaryRole}</p>
                                    </div>
                                ) : null}
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">System Interpretation</p>
                                    <p className="mt-3 max-w-[70ch] text-[15px] font-medium leading-relaxed text-[#515151]">
                                        {contentSystemContext.systemInterpretation}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Trade-Off</p>
                                    <p className="mt-3 max-w-[70ch] text-[15px] font-medium leading-relaxed text-[#515151]">
                                        {contentSystemContext.tradeOff}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-black/5 bg-[#1A1A1A] p-8 text-white shadow-sm">
                            <p className="mb-8 border-b border-white/10 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#D9B07A]">System Scorecard</p>
                            <div className="flex items-end justify-between gap-4">
                                <div className="text-[72px] font-black leading-none tracking-tight tabular-nums">
                                    <CountUpPercent value={contentSystemContext.overallScore} />
                                </div>
                                <div className="pb-2 text-right">
                                    <p className="text-[12px] font-black uppercase tracking-[0.18em] text-white/80">/ 100</p>
                                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D9B07A]">
                                        Signal: {contentSystemContext.overallSignal}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 space-y-4">
                                {contentSystemContext.breakdown.map((row) => (
                                    <div key={row.label} className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-5 py-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white">{row.label}</p>
                                                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#D9B07A]">{row.signal}</p>
                                            </div>
                                            <span className="text-[26px] font-black leading-none text-white tabular-nums">{row.score}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                    <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Diagnostic Cards</p>
                    <div className="grid gap-4 xl:grid-cols-3">
                        {contentSystemContext.diagnostics.map((card) => (
                            <div key={card.title} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-7 transition-all hover:bg-white hover:shadow-md">
                                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">{card.title}</p>
                                <p className="mt-4 text-[26px] font-black tracking-tight text-[#141414]">{card.heading}</p>
                                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#8B6A3D]">{card.signal}</p>
                                <p className="mt-4 text-[14px] font-medium leading-relaxed text-[#515151]">{card.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid gap-6 xl:grid-cols-2">
                    <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                        <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Content System Risk Flags</p>
                        <div className="grid gap-4">
                            {contentSystemContext.riskFlags.map((flag, index) => (
                                <div key={index} className="relative overflow-hidden rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6">
                                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#d9a69c] opacity-40" />
                                    <div className="flex items-start gap-4">
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[11px] font-black text-[#141414] shadow-sm">
                                            {index + 1}
                                        </span>
                                        <p className="text-[14px] font-medium leading-relaxed text-[#515151]">{flag}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                        <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Operational Next Actions</p>
                        <div className="grid gap-4">
                            {contentSystemContext.operationalNextActions.map((action, index) => (
                                <div key={index} className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-4 rounded-[1.5rem] border border-black/5 bg-[#FBFBF6] p-6">
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[11px] font-black text-[#141414] shadow-sm">
                                        {index + 1}
                                    </span>
                                    <p className="text-[14px] font-medium leading-relaxed text-[#515151]">{action}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                    <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Recommended Sequence Position</p>
                    <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
                        <div className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-7">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Sequence</p>
                            <p className="mt-4 text-[24px] font-black tracking-tight text-[#141414]">{contentSystemContext.sequenceRecommendation.sequence}</p>
                            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Best Fit</p>
                            <p className="mt-3 text-[18px] font-semibold tracking-tight text-[#141414]">{contentSystemContext.sequenceRecommendation.bestFit}</p>
                        </div>
                        <div className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-7">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Why</p>
                            <p className="mt-4 max-w-[72ch] text-[15px] font-medium leading-relaxed text-[#515151]">
                                {contentSystemContext.sequenceRecommendation.why}
                            </p>
                            <div className="mt-8 rounded-[1.4rem] border border-black/5 bg-white px-5 py-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Audience Conditioning</p>
                                <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#515151]">
                                    {contentSystemContext.audienceConditioningSummary}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
