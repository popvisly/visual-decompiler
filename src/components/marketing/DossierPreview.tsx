'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Target, Zap } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const PILLARS = [
    {
        icon: ShieldCheck,
        label: 'Verdict',
        value: 'KEEP',
        tags: ['Ship', 'Refine', 'Kill'],
        activeIndex: 0,
        detail: 'A clear call on whether this creative is working — safe to discuss in a client room.',
    },
    {
        icon: Target,
        label: 'Fix Priorities',
        value: 'P1 · Gaze Routing',
        detail: 'Ordered actions ranked by impact. Sharpen eyeflow toward product without breaking monumental scale.',
    },
    {
        icon: Zap,
        label: 'Evidence',
        value: 'Fact & Inference Split',
        detail: 'Every claim separated into observed facts and reasoned inferences. Full transparency on confidence.',
    },
];

const METRICS = [
    { label: 'Confidence', value: 99, color: '#00C853' },
    { label: 'Cognitive Friction', value: 8, color: '#00E5FF' },
    { label: 'Persuasion Density', value: 91, color: '#C1A674' },
];

const PALETTE = [
    { color: '#D4A574', pct: 30 },
    { color: '#2C2C2C', pct: 25 },
    { color: '#F5F0E8', pct: 20 },
    { color: '#8B7355', pct: 15 },
    { color: '#E8D4B8', pct: 10 },
];

const PRIMARY_MECHANIC = 'Celebrity Aspirational Transfer';
const STRATEGIC_MOVE = 'Heritage reactivation via contemporary embodiment';
const RISK = 'Direct confrontational gaze collapses aspirational asymmetry';
const BRIEF_ALIGNMENT = 'On-brief';

function MetricRing({ label, value, color }: { label: string; value: number; color: string }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="4"
                    />
                    <circle
                        cx="50" cy="50" r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-[18px] font-black text-white tabular-nums`}>{value}{label === 'Confidence' ? '' : '%'}</span>
                </div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">{label}</span>
        </div>
    );
}

export default function DossierPreview() {
    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] py-24 lg:py-40 overflow-hidden" data-presence-tone="light">
            <div className="pointer-events-none absolute inset-0 opacity-[0.3] [background-image:linear-gradient(rgba(20,20,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.02)_1px,transparent_1px)] [background-size:48px_48px]" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 lg:mb-20 border-t border-[#141414]/10 pt-10"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <h2 className="text-[11vw] lg:text-[6vw] font-black leading-[0.82] tracking-[-0.04em] uppercase text-[#141414] max-w-[14ch]">
                            What comes <span className="text-[#C1A674]">out is decisive.</span>
                        </h2>
                        <div className="max-w-[440px]">
                            <p className="text-[18px] leading-[1.6] text-[#6B6B6B] mb-8">
                                Not vibes. Not AI fluff. A structured intelligence dossier with verifiable claims, fix priorities, and a clear verdict.
                            </p>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="group inline-flex items-center gap-3 border-b border-[#141414] pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#141414] transition hover:text-[#C1A674] hover:border-[#C1A674]"
                            >
                                Open Sample Dossier
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Top row: Three pillars + Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-8 lg:gap-6 mb-8">
                    {/* Three pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PILLARS.map((pillar, idx) => (
                            <motion.div
                                key={pillar.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="rounded-[1.4rem] bg-[#1F1F1F] text-white p-7 lg:p-8 h-full border border-[rgba(212,165,116,0.2)] flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <pillar.icon size={16} strokeWidth={1.5} style={{ color: '#D4A574' }} />
                                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4A574]/70">
                                            {pillar.label}
                                        </p>
                                    </div>

                                    <p className="text-[17px] font-black tracking-[-0.01em] text-white mb-3">
                                        {pillar.value}
                                    </p>

                                    {pillar.tags && (
                                        <div className="flex gap-2 mb-4">
                                            {pillar.tags.map((tag, ti) => (
                                                <span
                                                    key={tag}
                                                    className={`text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full ${
                                                        ti === pillar.activeIndex
                                                            ? 'bg-[#D4A574]/20 text-[#D4A574] border border-[#6B5337]'
                                                            : 'bg-[#171512] text-white/25 border border-[#4E3D2A]'
                                                    }`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <p className="text-[13px] leading-[1.65] text-white/40 flex-1">
                                        {pillar.detail}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Metrics panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="rounded-[1.4rem] bg-[#1F1F1F] text-white p-7 lg:p-8 h-full border border-[rgba(212,165,116,0.2)] flex flex-col items-center justify-center gap-2">
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4A574]/60 mb-2">
                                Module Scores
                            </p>
                            <div className="flex gap-4">
                                {METRICS.map(m => (
                                    <MetricRing key={m.label} label={m.label} value={m.value} color={m.color} />
                                ))}
                            </div>
                            <div className="w-full mt-4 pt-4 border-t border-white/[0.06]">
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 text-center">
                                    Confidence · Friction · Density
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Second row: Dossier preview card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[1.4rem] bg-[#1F1F1F] text-white border border-[rgba(212,165,116,0.2)] overflow-hidden mb-8"
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#D4A574] animate-pulse" />
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4A574]/60">
                                Sample Dossier · CHANEL No.5
                            </p>
                        </div>
                    </div>

                    {/* Content grid */}
                    <div className="p-6 lg:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Primary Mechanic */}
                            <div className="rounded-[1.4rem] border border-[#4E3D2A] bg-[#171512] px-4 py-4">
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">Primary Mechanic</p>
                                <p className="text-[13px] font-semibold text-white/70">{PRIMARY_MECHANIC}</p>
                            </div>
                            {/* Strategic Move */}
                            <div className="rounded-[1.4rem] border border-[#4E3D2A] bg-[#171512] px-4 py-4">
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">Strategic Move</p>
                                <p className="text-[13px] leading-[1.5] text-white/50">{STRATEGIC_MOVE}</p>
                            </div>
                            {/* Key Risk */}
                            <div className="rounded-[1.4rem] border border-[#FF5252]/30 bg-[#171512] px-4 py-4">
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF5252]/50 mb-2">Key Risk</p>
                                <p className="text-[13px] leading-[1.5] text-[#FF5252]/60">{RISK}</p>
                            </div>
                        </div>

                        {/* Confidence + Alignment bar */}
                        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-[1.4rem] bg-[#171512]">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-1">Confidence Score</p>
                                    <p className="text-[36px] font-black leading-none text-white tabular-nums">99 <span className="text-[16px] text-white/30">/100</span></p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">Brief Alignment</p>
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#00C853]/30 bg-[#00C853]/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#00C853]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
                                    {BRIEF_ALIGNMENT}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Palette Logic bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[1.4rem] bg-[#1F1F1F] text-white border border-[rgba(212,165,116,0.2)] p-6 lg:p-8"
                >
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
                            Palette Logic
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                            Chromatic Composition
                        </p>
                    </div>
                    {/* Color bar */}
                    <div className="flex w-full h-4 rounded-full overflow-hidden mb-3">
                        {PALETTE.map((seg, i) => (
                            <div
                                key={i}
                                style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
                            />
                        ))}
                    </div>
                    <p className="text-[13px] text-white/40 leading-[1.5]">
                        Warm golds and deep neutrals encode heritage authority and legacy positioning. The restrained palette signals confidence through absence — no competing chromatic system.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
