'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Target, Zap } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const PILLARS = [
    {
        icon: ShieldCheck,
        label: 'Verdict',
        value: 'SHIP',
        detail: 'Keep, Refine, or Kill — a clear call on whether this creative is working.',
        accent: '#00C853',
    },
    {
        icon: Target,
        label: 'Fix Priorities',
        value: 'P1 → P2 → P3',
        detail: 'Ordered actions ranked by impact. Know exactly what to change and in what sequence.',
        accent: '#FFB300',
    },
    {
        icon: Zap,
        label: 'Evidence',
        value: 'Fact vs Inference',
        detail: 'Every claim separated into observed facts and reasoned inferences. Full transparency on confidence.',
        accent: '#C1A674',
    },
];

const METRICS = [
    { label: 'Confidence', value: '99/100' },
    { label: 'Cognitive Friction', value: '8%' },
    { label: 'Persuasion Density', value: '91%' },
];

const SAMPLE_OUTPUT_LINES = [
    { label: 'Primary Mechanic', value: 'Celebrity Aspirational Transfer' },
    { label: 'Strategic Move', value: 'Heritage reactivation via contemporary embodiment to prevent icon fossilization' },
    { label: 'Key Risk', value: 'Direct confrontational gaze collapses aspirational asymmetry' },
];

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
                    className="mb-20 lg:mb-32 border-t border-[#141414]/10 pt-10"
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

                {/* Three pillars - dark cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mb-20">
                    {PILLARS.map((pillar, idx) => (
                        <motion.div
                            key={pillar.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="rounded-[32px] bg-[#1A1A1A] text-white p-10 lg:p-12 h-full border border-[#D4A574]/10 flex flex-col">
                                <div className="flex items-center gap-3 mb-8">
                                    <pillar.icon size={18} strokeWidth={1.5} style={{ color: pillar.accent }} />
                                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                                        {pillar.label}
                                    </p>
                                </div>

                                <p className="text-[22px] lg:text-[28px] font-black leading-[1.05] tracking-[-0.02em] uppercase text-white mb-6">
                                    {pillar.value}
                                </p>

                                <p className="text-[14px] leading-[1.7] text-white/40 flex-1">
                                    {pillar.detail}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sample output mock - dark card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[32px] bg-[#1A1A1A] text-white border border-[#D4A574]/10 overflow-hidden"
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#C1A674]" />
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C1A674]/60">
                                Sample Dossier Output · CHANEL No.5
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-6">
                            {METRICS.map(m => (
                                <div key={m.label} className="text-right">
                                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">{m.label}</p>
                                    <p className="text-[14px] font-bold text-white tabular-nums">{m.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-10 space-y-8">
                        {SAMPLE_OUTPUT_LINES.map((line, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-2 border-b border-white/[0.04] pb-6 last:border-0 last:pb-0">
                                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/25 sm:w-[200px] shrink-0 pt-0.5">
                                    {line.label}
                                </span>
                                <span className="text-[14px] leading-[1.6] text-white/60">
                                    {line.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
