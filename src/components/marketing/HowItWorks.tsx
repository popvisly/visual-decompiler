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
        headline: 'Drop any ad. It enters the read.',
        detail: 'Upload JPG, PNG, WebP, MP4 or paste a URL. The asset is secured, fingerprinted, and queued for decomposition.',
        accent: '#141414',
    },
    {
        icon: Scan,
        number: '02',
        phase: 'Phase 02',
        label: 'Decompose',
        headline: '13 forensic dimensions extracted.',
        detail: 'Trigger mechanics, semiotic subtext, gaze topology, persuasion density, friction mapping — every signal the work is emitting gets catalogued.',
        accent: '#C1A674',
    },
    {
        icon: FileText,
        number: '03',
        phase: 'Phase 03',
        label: 'Dossier',
        headline: 'A strategic read you can defend.',
        detail: 'Keep, Refine, or Kill. Fix priorities ranked by impact. Confidence scores. The output travels straight into client rooms and creative reviews.',
        accent: '#C1A674',
    },
];

export default function HowItWorks() {
    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] py-24 lg:py-40 overflow-hidden" data-presence-tone="light">
            {/* Subtle grid background */}
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

                {/* Steps */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 xl:gap-16">
                    {STEPS.map((step, idx) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            {/* Step number (ghost) */}
                            <div className="text-[80px] lg:text-[120px] font-black leading-none text-[#141414]/[0.04] select-none absolute -top-8 -left-2">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                {/* Phase label */}
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="h-px w-8 bg-[#141414]/30" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#9a9a94]">
                                        {step.phase}
                                    </p>
                                </div>

                                {/* Icon badge */}
                                <div className="mb-8">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-[#141414]/10 bg-white text-[#141414]"
                                    >
                                        <step.icon size={20} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Headline */}
                                <h3 className="text-[22px] lg:text-[26px] font-black leading-[1.05] tracking-[-0.02em] uppercase text-[#141414] mb-6">
                                    {step.headline}
                                </h3>

                                {/* Detail */}
                                <p className="text-[15px] leading-[1.65] text-[#6B6B6B]">
                                    {step.detail}
                                </p>

                                {/* Label pill */}
                                <div className="mt-8">
                                    <span className="inline-block rounded-full border border-[#141414]/10 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#6B6B6B]">
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
