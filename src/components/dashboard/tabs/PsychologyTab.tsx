"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import CountUpPercent from '@/components/CountUpPercent';
import { firstSentence, proseParagraphs } from '@/lib/utils';

interface PsychologyTabProps {
    dossier: any;
    extraction: any;
    analysisLanguage: any;
    persuasionDensity: number;
    frictionScore: number;
    scoreByLabel: Record<string, number>;
}

export default function PsychologyTab({
    dossier,
    extraction,
    analysisLanguage,
    persuasionDensity,
    frictionScore,
    scoreByLabel,
}: PsychologyTabProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-4">
                <div className="px-0">
                    <WorkspaceTabHeader
                        kicker="COGNITIVE DYNAMICS"
                        title="Semiotic Channel Interceptions"
                        intro="How the asset encodes meaning, identity cues, and emotional triggers to shape perception and approval momentum."
                    />
                    <WorkspaceDecisionSummary
                        eyebrow="Psychological Read"
                        title="Clarify why the asset persuades before defending the route."
                        body={firstSentence(dossier?.archetype_mapping?.target_posture) || firstSentence(dossier?.objection_dismantling) || 'This module reads the identity posture, trigger distribution, objection logic, and possible counter-readings behind the work.'}
                        metrics={[
                            { label: 'Clarity', value: `${scoreByLabel.Clarity}/100` },
                            { label: 'Intent', value: `${scoreByLabel.Intent}/100` },
                            { label: 'Distinction', value: `${scoreByLabel.Distinction}/100` },
                        ]}
                        actions={[
                            firstSentence(dossier?.objection_dismantling) || 'Identify the highest-risk objection before client review.',
                            firstSentence(analysisLanguage.strategicRead.triggerMechanic),
                            firstSentence(analysisLanguage.strategicRead.categoryPositioning),
                        ].filter(Boolean)}
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Trigger Distribution Map */}
                    <div className="flex h-full flex-col rounded-[2.5rem] border border-black/5 bg-[#141414] p-10 text-[#FBFBF6] shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                            <Target className="h-32 w-32" />
                        </div>
                        <div className="mb-10 flex min-h-[68px] items-start justify-between border-b border-white/10 pb-6 relative z-10">
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4A574]">
                                <span className="block">Trigger Distribution</span>
                                <span className="block">Surface Map</span>
                            </p>
                            <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-white/30">Optical Diagnostic v4.0</span>
                        </div>

                        <div className="flex h-[360px] items-center justify-center relative z-10">
                            {(() => {
                                const axes = [
                                    { key: 'STATUS', label: 'STATUS' },
                                    { key: 'SOCIAL PROOF', label: 'SOCIAL\nPROOF' },
                                    { key: 'AUTHORITY', label: 'AUTHORITY' },
                                    { key: 'SCARCITY', label: 'SCARCITY' },
                                    { key: 'UTILITY', label: 'UTILITY' },
                                ];

                                const dist = ((dossier as any)?.archetype_mapping?.trigger_distribution || {}) as Record<string, any>;
                                const byKey = new Map<string, number>();
                                Object.entries(dist).forEach(([k, v]) => {
                                    const n = typeof v === 'number' ? v : Number(v);
                                    if (!Number.isFinite(n)) return;
                                    byKey.set(String(k).trim().toUpperCase(), n);
                                });

                                const getVal = (k: string) => {
                                    const v = byKey.get(k);
                                    const n = typeof v === 'number' ? v : 0;
                                    return Math.max(0, Math.min(100, n));
                                };

                                const size = 360;
                                const cx = size / 2;
                                const cy = size / 2;
                                const r = 125;
                                const ringCount = 4;
                                const angle0 = -Math.PI / 2;

                                const polar = (i: number, radius: number) => {
                                    const theta = angle0 + (i * (Math.PI * 2)) / axes.length;
                                    return [cx + Math.cos(theta) * radius, cy + Math.sin(theta) * radius] as const;
                                };

                                const points = axes
                                    .map((a, i) => {
                                        const v = getVal(a.key);
                                        const radius = (v / 100) * r;
                                        const [x, y] = polar(i, radius);
                                        return `${x.toFixed(2)},${y.toFixed(2)}`;
                                    })
                                    .join(' ');

                                const rings = Array.from({ length: ringCount }, (_, ri) => {
                                    const rr = ((ri + 1) / ringCount) * r;
                                    const ringPoints = axes
                                        .map((_, i) => {
                                            const [x, y] = polar(i, rr);
                                            return `${x.toFixed(2)},${y.toFixed(2)}`;
                                        })
                                        .join(' ');
                                    return <polygon key={ri} points={ringPoints} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
                                });

                                const spokes = axes.map((_, i) => {
                                    const [x, y] = polar(i, r);
                                    return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
                                });

                                const labels = axes.map((a, i) => {
                                    const [x, y] = polar(i, r + 46);
                                    const lines = a.label.split('\n');

                                    const labelLayout: Record<string, { anchor: 'start' | 'middle' | 'end'; x: number; y: number }> = {
                                        STATUS: { anchor: 'middle', x: 0, y: -2 },
                                        UTILITY: { anchor: 'start', x: 8, y: 0 },
                                        'SOCIAL PROOF': { anchor: 'end', x: -8, y: 0 },
                                        AUTHORITY: { anchor: 'start', x: 18, y: 4 },
                                        SCARCITY: { anchor: 'end', x: -18, y: 18 },
                                    };

                                    const fallbackAnchor: 'start' | 'middle' | 'end' =
                                        x > cx + 8 ? 'end' : x < cx - 8 ? 'start' : 'middle';
                                    const fallbackX = x > cx + 8 ? -8 : x < cx - 8 ? 8 : 0;
                                    const layout = labelLayout[a.key] || { anchor: fallbackAnchor, x: fallbackX, y: 0 };

                                    return (
                                        <g key={a.key} transform={`translate(${x + layout.x},${y + layout.y})`}>
                                            {lines.map((t, li) => (
                                                <text
                                                    key={li}
                                                    x={0}
                                                    y={li * 16}
                                                    textAnchor={layout.anchor}
                                                    fontSize={10}
                                                    fontWeight={900}
                                                    letterSpacing={3}
                                                    fill="#D4A574"
                                                >
                                                    {t}
                                                </text>
                                            ))}
                                        </g>
                                    );
                                });

                                const dotTargets = axes.map((a, i) => {
                                    const v = getVal(a.key);
                                    const [x, y] = polar(i, (v / 100) * r);
                                    return { key: a.key, x, y, delay: 0.35 + i * 0.08 };
                                });

                                return (
                                    <motion.svg width="100%" height="100%" className="max-w-[480px] w-full" viewBox="-100 -20 560 400">
                                        <defs>
                                            <radialGradient id="vdRadarGlowModern" cx="50%" cy="50%" r="60%">
                                                <stop offset="0%" stopColor="rgba(212,165,116,0.3)" />
                                                <stop offset="100%" stopColor="rgba(212,165,116,0)" />
                                            </radialGradient>
                                        </defs>

                                        <motion.circle
                                            cx={cx}
                                            cy={cy}
                                            r={r + 30}
                                            fill="url(#vdRadarGlowModern)"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, amount: 0.6 }}
                                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                        />

                                        <motion.g
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true, amount: 0.6 }}
                                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            {rings}
                                            {spokes}
                                        </motion.g>

                                        <motion.polygon
                                            points={points}
                                            fill="rgba(212,165,116,0.2)"
                                            stroke="#D4A574"
                                            strokeWidth="2"
                                            pathLength={1}
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            whileInView={{ pathLength: 1, opacity: 1 }}
                                            viewport={{ once: true, amount: 0.6 }}
                                            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        />

                                        {dotTargets.map((d) => (
                                            <motion.circle
                                                key={d.key}
                                                cx={cx}
                                                cy={cy}
                                                r={4}
                                                fill="#FBFBF6"
                                                stroke="#D4A574"
                                                strokeWidth="2"
                                                initial={{ x: 0, y: 0, opacity: 0 }}
                                                whileInView={{ x: d.x - cx, y: d.y - cy, opacity: 1 }}
                                                viewport={{ once: true, amount: 0.6 }}
                                                transition={{ duration: 0.8, delay: d.delay, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        ))}

                                        <g className="radar-labels">
                                            {labels}
                                        </g>
                                    </motion.svg>
                                );
                            })()}
                        </div>

                        <p className="mt-auto pt-6 text-[13px] leading-relaxed text-[#D6D0C6]/70">
                            This distribution quantifies the creative's psychological surface area, identifying which aspiration levers are being engaged to command consumer compliance.
                        </p>
                    </div>

                    {/* Strategic Posture */}
                    <div className="flex h-full flex-col rounded-[2.5rem] border border-black/5 bg-[#141414] p-10 text-[#FBFBF6] shadow-xl overflow-hidden relative">
                        <div className="mb-10 flex min-h-[68px] items-start justify-between border-b border-white/10 pb-6 relative z-10">
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4A574]">
                                <span className="block">Strategic Posture</span>
                                <span className="block">Field Map</span>
                            </p>
                            <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-white/30">Vector Diagnostic v1.2</span>
                        </div>

                        <div className="flex h-[320px] items-center justify-center">
                            {(() => {
                                const size = 280;
                                const cx = size / 2;
                                const cy = size / 2;
                                const r1 = 92;
                                const r2 = 60;
                                const r3 = 28;

                                // Optional coordinates: { dominance: -1..1, emotional: -1..1 }
                                const coords = ((dossier as any)?.archetype_mapping?.posture_coordinates || null) as any;
                                const dx = typeof coords?.dominance === 'number' ? Math.max(-1, Math.min(1, coords.dominance)) : 0.15;
                                const dy = typeof coords?.emotional === 'number' ? Math.max(-1, Math.min(1, coords.emotional)) : 0.18;
                                const px = cx + dx * 62;
                                const py = cy - dy * 62;
                                return (
                                    <svg width="280" height="280" viewBox={`0 0 ${size} ${size}`}>
                                        <circle cx={cx} cy={cy} r={r1} fill="none" stroke="rgba(212,165,116,0.15)" strokeWidth="1" />
                                        <circle cx={cx} cy={cy} r={r2} fill="none" stroke="rgba(212,165,116,0.1)" strokeWidth="1" />
                                        <circle cx={cx} cy={cy} r={r3} fill="none" stroke="rgba(212,165,116,0.1)" strokeWidth="1" />
                                        <line x1={cx - r1} y1={cy} x2={cx + r1} y2={cy} stroke="rgba(212,165,116,0.1)" strokeWidth="1" />
                                        <line x1={cx} y1={cy - r1} x2={cx} y2={cy + r1} stroke="rgba(212,165,116,0.1)" strokeWidth="1" />

                                        <motion.circle 
                                            cx={px} cy={py} r={6} fill="#D4A574"
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
                                        />
                                        <motion.circle 
                                            cx={px} cy={py} r={16} fill="rgba(212,165,116,0.2)"
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.7 }}
                                        />

                                        <text x={cx} y={cy - r1 - 18} textAnchor="middle" fontSize="10" fontWeight="900" letterSpacing="4" fill="#D4A574">EMOTIONAL</text>
                                        <text x={cx} y={cy + r1 + 28} textAnchor="middle" fontSize="10" fontWeight="900" letterSpacing="4" fill="#D4A574">RATIONAL</text>
                                        <text x={cx - r1 - 34} y={cy + 4} textAnchor="start" fontSize="10" fontWeight="900" letterSpacing="4" fill="#D4A574">SUBMISSION</text>
                                        <text x={cx + r1 + 34} y={cy + 4} textAnchor="end" fontSize="10" fontWeight="900" letterSpacing="4" fill="#D4A574">DOMINANCE</text>
                                    </svg>
                                );
                            })()}
                        </div>

                        <div className="mt-auto pt-6 space-y-3">
                            {proseParagraphs((dossier as any)?.archetype_mapping?.target_posture, 2)
                                .slice(0, 2)
                                .map((paragraph: string, index: number) => (
                                    <p key={index} className="text-[13px] leading-relaxed text-[#D6D0C6]/70">
                                        {paragraph}
                                    </p>
                                ))}
                            {proseParagraphs((dossier as any)?.archetype_mapping?.target_posture, 2).length === 0 && (
                                <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70">
                                    Icon Maintenance — the brand is not challenging for position or disrupting the category; it is asserting the permanence of an already-won cultural throne.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Persuasion Density */}
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
                            <div className="text-[96px] font-black leading-none tracking-tight text-[#141414] tabular-nums">
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

                    {/* Cognitive Friction */}
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
                            <div className="text-[96px] font-black leading-none tracking-tight text-[#141414] tabular-nums">
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
        </div>
    );
}
