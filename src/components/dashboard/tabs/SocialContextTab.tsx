"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CountUpPercent from '@/components/CountUpPercent';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import { SocialContextModel, SOCIAL_PLATFORM_GLYPHS } from '@/types/dashboard';

interface SocialContextTabProps {
    socialContext: SocialContextModel;
    strongestSocialPlatform: { platform: string; score: number; signal: string };
    socialRiskCount: number;
}

export default function SocialContextTab({
    socialContext,
    strongestSocialPlatform,
}: SocialContextTabProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-6">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="SOCIAL CONTEXT"
                        title="Social-First Execution"
                        intro="Evaluates how this asset performs under feed conditions: stop power, retention, readability, and platform adaptation requirements."
                    />
                </div>

                <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px_260px]">
                        <div className="rounded-[2rem] border border-black/5 bg-[#FBFBF6] p-8">
                            <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Social Interpretation</p>
                            <div className="space-y-6">
                                <p className="max-w-[68ch] text-[15px] font-medium leading-relaxed text-[#515151]">
                                    {socialContext.socialInterpretation}
                                </p>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Execution Verdict</p>
                                    <p className="mt-3 max-w-[64ch] text-[15px] font-medium leading-relaxed text-[#515151]">
                                        {socialContext.executionVerdict}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Trade-Off</p>
                                    <p className="mt-3 max-w-[64ch] text-[15px] font-medium leading-relaxed text-[#515151]">
                                        {socialContext.tradeOff}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-black/5 bg-[#1A1A1A] p-8 text-white shadow-sm">
                            <p className="mb-6 text-[10px] font-black uppercase tracking-[0.16em] text-[#D9B07A]">Top Score</p>
                            <div className="flex items-end gap-3">
                                <div className="text-[60px] font-black leading-none tracking-tight tabular-nums">
                                    <CountUpPercent value={strongestSocialPlatform.score} />
                                </div>
                                <p className="pb-2 text-[12px] font-black uppercase tracking-[0.18em] text-white/50">/ 100</p>
                            </div>
                            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[#D9B07A]">
                                Signal: {strongestSocialPlatform.signal}
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-sm">
                            <p className="mb-6 text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">Top Platform</p>
                            <p className="text-[28px] font-black tracking-tight text-[#141414]">{strongestSocialPlatform.platform}</p>
                        </div>
                    </div>
                </section>

                <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                    <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Platform Scoreboard</p>
                    <div className="grid gap-4 xl:grid-cols-2">
                        {socialContext.platformScores.map((row) => (
                            <div key={row.platform} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-6 transition-colors hover:bg-white hover:shadow-md">
                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#141414]">{row.platform}</p>
                                        <p className={`mt-3 text-[10px] font-medium uppercase tracking-[0.14em] ${
                                            row.signal === 'Strong'
                                                ? 'text-[#8B6A3D]'
                                                : row.signal === 'Usable'
                                                    ? 'text-[#141414]/70'
                                                    : 'text-[#d9a69c]'
                                        }`}>
                                            {row.signal === 'Usable' ? 'Moderate' : row.signal}
                                        </p>
                                    </div>
                                    <span className="text-[28px] font-black leading-none text-[#141414] tabular-nums">{row.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                    <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Feed Mechanics</p>
                    <div className="grid gap-4 xl:grid-cols-2">
                        {socialContext.feedMechanics.map((item) => (
                            <div key={item.title} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-7 transition-all hover:bg-white hover:shadow-md">
                                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8B6A3D]">{item.title}</p>
                                <p className="mt-4 text-[26px] font-black tracking-tight text-[#141414]">{item.signal}</p>
                                <p className="mt-4 text-[14px] font-medium leading-relaxed text-[#515151]">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                    <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Platform Adaptation Protocol</p>
                    <div className="grid gap-4 xl:grid-cols-2">
                        {socialContext.adaptationMoves.map((move) => (
                            <div key={move.platform} className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-6 transition-all hover:bg-white hover:shadow-md">
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

                <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 text-[#141414] shadow-sm">
                    <p className="mb-8 border-b border-black/5 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6A3D]">Risk Flags</p>
                    <div className="grid gap-4">
                        {socialContext.riskFlags.map((flag, index) => (
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

            </div>
        </div>
    );
}
