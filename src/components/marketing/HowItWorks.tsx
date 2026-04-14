'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function HowItWorks() {
    return (
        <section className="relative bg-[#0B0B0B] text-[#F6F1E7] py-32 lg:py-48 overflow-hidden" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        Core Value
                    </p>
                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#F6F1E7] max-w-[14ch] mb-10">
                        Make the work make sense.
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#9a9a94] max-w-[520px]">
                        You already know when something works.
                        <br />
                        <br />
                        Visual Decompiler shows you why.
                        <br />
                        <br />
                        Upload your ad and receive a structured breakdown of composition, hierarchy, tone, and strategic intent — translated into language a client understands.
                        <br />
                        <br />
                        No guesswork. No filler. Just clarity you can stand behind.
                    </p>
                </motion.div>

                {/* How it works */}
                <div className="mt-20 mb-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-4">How it works</p>
                    <p className="text-[34px] font-black uppercase tracking-[-0.03em] text-[#F6F1E7]">From concept to conviction.</p>
                </div>

                <div className="mt-0 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12">
                    {[
                        { n: '1', title: 'Upload the Work', detail: 'Your concept, your layout, your frame.' },
                        { n: '2', title: 'Decompile', detail: 'Analyze the creative at a structural level — beyond surface description.' },
                        { n: '3', title: 'Present with Authority', detail: 'Receive a structured read — ready for decks, internal reviews, and client conversations.' },
                    ].map((step, idx) => (
                        <motion.div
                            key={step.n}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-start gap-5">
                                <span className="text-[48px] font-black leading-none text-[#F6F1E7]/[0.06]">{step.n}</span>
                                <div>
                                    <h3 className="text-[18px] font-black uppercase tracking-[-0.01em] text-[#F6F1E7] mb-2">{step.title}</h3>
                                    <p className="text-[15px] leading-[1.65] text-[#9a9a94]">{step.detail}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                    <Link
                        href="/ingest"
                        className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#F6F1E7]"
                    >
                        Decompile an Ad
                        <ArrowUpRight size={16} />
                    </Link>
                    <Link
                        href={SAMPLE_DOSSIER_HREF}
                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a9a94] transition hover:text-[#F6F1E7]"
                    >
                        <span className="w-6 h-px bg-[#141414]/20" />
                        View Sample Dossier
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
