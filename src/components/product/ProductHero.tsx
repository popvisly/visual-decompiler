'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function ProductHero() {
    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] overflow-hidden" data-presence-tone="light">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12 pt-28 lg:pt-36 pb-16 lg:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        Product
                    </p>
                    <h1 className="text-[12vw] lg:text-[96px] font-black leading-[0.82] tracking-[-0.04em] uppercase text-[#141414] max-w-[12ch] mb-10">
                        See inside<br />
                        <span className="text-[#C1A674]">every ad.</span>
                    </h1>
                    <p className="text-[18px] lg:text-[20px] leading-[1.7] text-[#6B6B6B] max-w-[680px] mb-12">
                        Visual Decompiler reads the hidden architecture of any creative — persuasion mechanics, semiotic subtext, and psychological drivers. Across 9 analysis surfaces, each read forms a complete forensic view in minutes, not a three-hour review.
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Link
                            href="/ingest"
                            className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#141414]"
                        >
                            Start Decompiling Free
                            <ArrowUpRight size={16} />
                        </Link>
                        <Link
                            href={SAMPLE_DOSSIER_HREF}
                            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B] transition hover:text-[#141414]"
                        >
                            <span className="w-6 h-px bg-[#141414]/20" />
                            See a sample read
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
