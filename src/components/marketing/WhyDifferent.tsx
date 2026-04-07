'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const COMPARISONS = [
    {
        label: 'Ad Repositories · Meta Library, TikTok Creative Center',
        they: 'Show you what ads exist.',
        vd: 'We read why the creative persuades, what to keep, and what to fix next.',
    },
    {
        label: 'Ad-Spy & Spend Tools · Pathmatics, SimilarWeb',
        they: 'Track distribution, budget, and placement.',
        vd: 'We complement spend data with creative causality and execution-level direction.',
    },
    {
        label: 'AI Ad Generators · Flair, Munch',
        they: 'Produce more ads, faster.',
        vd: 'We don\'t generate. We diagnose, critique, and direct quality.',
    },
    {
        label: 'ChatGPT · Ask a general AI to "review this ad"',
        they: 'Broad observations in casual language.',
        vd: 'Standardized analysis, vault memory, and client-presentable output.',
    },
];

export default function WhyDifferent() {
    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] py-32 lg:py-48 overflow-hidden" data-presence-tone="light">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        Why VD
                    </p>
                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#141414] max-w-[14ch] mb-10">
                        Every tool shows <br />you <span className="text-[#C1A674]">what.</span><br />
                        We read <span className="text-[#C1A674]">why.</span>
                    </h2>
                </motion.div>

                {/* Comparison rows */}
                <div className="mt-16 space-y-0">
                    {COMPARISONS.map((comp, idx) => (
                        <motion.div
                            key={comp.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="py-8 border-t border-[#E7DED1] grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 lg:gap-16"
                        >
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#9a9a94] mb-3">{comp.label}</p>
                                <p className="text-[16px] leading-[1.6] text-[#6B6B6B]">{comp.they}</p>
                            </div>
                            <div className="flex items-start">
                                <p className="text-[16px] leading-[1.6] text-[#141414]">{comp.vd}</p>
                            </div>
                        </motion.div>
                    ))}
                    <div className="border-t border-[#E7DED1]" />
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 flex items-center gap-6"
                >
                    <Link
                        href="/ingest"
                        className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#141414]"
                    >
                        Start Decompiling Free
                        <ArrowUpRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
