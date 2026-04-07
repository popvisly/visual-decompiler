'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, EyeOff, Search, Sparkles, Brain } from 'lucide-react';

const COMPARISONS = [
    {
        icon: EyeOff,
        label: 'Ad Repositories',
        example: 'Meta Library, TikTok Creative Center',
        does: 'Shows you what ads exist.',
        doesnt: 'Tells you nothing about why they work.',
        vd: 'VD reads why the creative persuades, what to keep, and what to fix next.',
    },
    {
        icon: Search,
        label: 'Ad-Spy & Spend Tools',
        example: 'Pathmatics, SimilarWeb',
        does: 'Tracks distribution, budget, and placement.',
        doesnt: 'Cannot evaluate creative quality or strategic direction.',
        vd: 'VD complements spend data with creative causality and execution-level direction.',
    },
    {
        icon: Sparkles,
        label: 'AI Ad Generators',
        example: 'Flair, Munch, AdCreative.ai',
        does: 'Produces more ads, faster.',
        doesnt: 'Cannot judge whether the ads are any good.',
        vd: 'VD doesn\'t generate. It diagnoses, critiques, and directs quality.',
    },
    {
        icon: Brain,
        label: 'ChatGPT + Prompting',
        example: 'Ask a general AI to "review this ad"',
        does: 'Gives broad observations in casual language.',
        doesnt: 'Delivers inconsistent structure with no vault memory, white-label control, or forensic system.',
        vd: 'VD standardizes the analysis, stores it, and makes it client-presentable.',
    },
];

export default function WhyDifferent() {
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
                    <p className="text-[10px] font-black uppercase tracking-[0.45em] text-[#C1A674] mb-6">
                        Category Positioning
                    </p>
                    <h2 className="text-[11vw] lg:text-[6vw] font-black leading-[0.82] tracking-[-0.04em] uppercase text-[#141414] max-w-[14ch] mb-10">
                        Every other tool shows you <span className="text-[#C1A674]">what.</span><br />We read <span className="text-[#C1A674]">why.</span>
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-[#6B6B6B] max-w-[600px]">
                        The market is full of tools that tell you what's out there. Visual Decompiler is the only one that tells you what your creative is actually doing — and what to do next.
                    </p>
                </motion.div>

                {/* Comparison rows - dark cards */}
                <div className="space-y-6">
                    {COMPARISONS.map((comp, idx) => (
                        <motion.div
                            key={comp.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="rounded-[32px] bg-[#1A1A1A] text-white p-8 lg:p-10 border border-[#D4A574]/10">
                                <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.35fr_0.35fr] gap-8 lg:gap-10">
                                    {/* Tool name */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/30">
                                                <comp.icon size={18} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h4 className="text-[15px] font-black uppercase tracking-[-0.01em] text-white">
                                                    {comp.label}
                                                </h4>
                                                <p className="text-[11px] text-white/30 mt-0.5">{comp.example}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* What they do / don't do */}
                                    <div>
                                        <div className="mb-4">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#00C853]/60 mb-2">
                                                Does
                                            </p>
                                            <p className="text-[14px] leading-[1.6] text-white/60">{comp.does}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FF5252]/50 mb-2">
                                                Doesn't
                                            </p>
                                            <p className="text-[14px] leading-[1.6] text-white/35">{comp.doesnt}</p>
                                        </div>
                                    </div>

                                    {/* VD advantage */}
                                    <div className="flex items-start">
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C1A674] mb-3">
                                                Visual Decompiler
                                            </p>
                                            <p className="text-[15px] leading-[1.65] text-white/70">{comp.vd}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 flex flex-col items-center text-center"
                >
                    <Link
                        href="/ingest"
                        className="group inline-flex items-center gap-3 border-b border-[#141414] pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#141414] transition hover:text-[#C1A674] hover:border-[#C1A674]"
                    >
                        Start Decompiling Free
                        <ArrowUpRight size={16} />
                    </Link>
                    <p className="mt-4 text-[12px] text-[#6B6B6B]">
                        No credit card. Results in under 3 minutes.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
