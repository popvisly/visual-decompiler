'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Upload, Scan, FileText } from 'lucide-react';

const STEPS = [
    {
        icon: Upload,
        number: '01',
        phase: 'Phase 01',
        label: 'Ingest',
        headline: 'Drop any ad.',
        detail: 'Upload JPG, PNG, WebP, MP4 or paste a URL. The asset is secured, fingerprinted, and queued for decomposition.',
    },
    {
        icon: Scan,
        number: '02',
        phase: 'Phase 02',
        label: 'Decompose',
        headline: '13 forensic dimensions extracted.',
        detail: 'Trigger mechanics, semiotic subtext, gaze topology, persuasion density, friction mapping — every signal gets catalogued.',
    },
    {
        icon: FileText,
        number: '03',
        phase: 'Phase 03',
        label: 'Dossier',
        headline: 'A strategic read you can defend.',
        detail: 'Keep, Refine, or Kill. Fix priorities ranked by impact. Confidence scores. Output that travels straight into client rooms.',
    },
];

export default function HowItWorks() {
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
                            See exactly <span className="text-[#C1A674]">what any ad is doing.</span>
                        </h2>
                        <div className="max-w-[440px]">
                            <p className="text-[18px] leading-[1.6] text-[#6B6B6B] mb-8">
                                Three steps from blind spot to boardroom-ready strategic direction. No prompt engineering. No guesswork. Just structured judgment.
                            </p>
                            <Link
                                href="/ingest"
                                className="group inline-flex items-center gap-3 border-b border-[#141414] pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#141414] transition hover:text-[#C1A674] hover:border-[#C1A674]"
                            >
                                Start Decompiling Free
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
                    {STEPS.map((step, idx) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="rounded-[32px] bg-[#1A1A1A] text-white p-10 lg:p-12 h-full border border-[#D4A574]/10 flex flex-col">
                                {/* Phase label */}
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-px w-6 bg-[#C1A674]/40" />
                                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#C1A674]/70">
                                        {step.phase}
                                    </p>
                                </div>

                                {/* Step number */}
                                <p className="text-[64px] font-black leading-none text-white/[0.04] select-none -mt-4 mb-4">
                                    {step.number}
                                </p>

                                {/* Headline */}
                                <h3 className="text-[22px] lg:text-[26px] font-black leading-[1.05] tracking-[-0.02em] uppercase text-white mb-6">
                                    {step.headline}
                                </h3>

                                {/* Detail */}
                                <p className="text-[14px] leading-[1.7] text-white/40 mb-8 flex-1">
                                    {step.detail}
                                </p>

                                {/* Icon + label pill */}
                                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#C1A674]">
                                        <step.icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                                        {step.label}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
