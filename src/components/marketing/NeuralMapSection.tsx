'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import NeuralParticleHero from './NeuralParticleHero';

export default function NeuralMapSection() {
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
                    className="mb-12 lg:mb-16 border-t border-[#141414]/10 pt-10"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <h2 className="text-[11vw] lg:text-[5.5vw] font-black leading-[0.82] tracking-[-0.04em] uppercase text-[#141414] max-w-[14ch]">
                            13 dimensions. <span className="text-[#C1A674]">One living map.</span>
                        </h2>
                        <div className="max-w-[440px] lg:pt-8">
                            <p className="text-[18px] leading-[1.6] text-[#6B6B6B] mb-8">
                                Every analysis surface connects. Trigger mechanics link to semiotic subtext, gaze vectors cascade into persuasion density, audience tension shapes strategic move.
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
            </div>

            {/* The neural map card — dark surface on light canvas */}
            <NeuralParticleHero />
        </section>
    );
}
