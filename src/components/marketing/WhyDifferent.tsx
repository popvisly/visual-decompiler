'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const COMPARISONS = [
    {
        label: 'Pre-Pitch Refinement',
        they: 'Pressure-test your work before it leaves the building.',
        vd: 'Arrive with defensible reasoning before the first slide.',
    },
    {
        label: 'Client Presentation',
        they: 'Walk in with clear reasoning behind every visual decision.',
        vd: 'Move the room from opinion to alignment.',
    },
    {
        label: 'Internal Reviews',
        they: 'Align teams with shared, structured language instead of taste debates.',
        vd: 'Keep creative quality high while reducing review-cycle drift.',
    },
    {
        label: 'Campaign Analysis',
        they: 'Break down competitor or reference work beyond surface-level inspiration.',
        vd: 'Identify what changes across campaigns and why it matters strategically.',
    },
];

export default function WhyDifferent() {
    return (
        <section className="relative bg-[#0B0B0B] text-[#F6F1E7] py-32 lg:py-48 overflow-hidden" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        Use cases
                    </p>
                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#F6F1E7] max-w-[14ch] mb-10">
                        Built for the moments<br />that <span className="text-[#C1A674]">matter.</span>
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
                            className="py-8 border-t border-[#222] grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 lg:gap-16"
                        >
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#9a9a94] mb-3">{comp.label}</p>
                                <p className="text-[16px] leading-[1.6] text-[#9a9a94]">{comp.they}</p>
                            </div>
                            <div className="flex items-start">
                                <p className="text-[16px] leading-[1.6] text-[#F6F1E7]">{comp.vd}</p>
                            </div>
                        </motion.div>
                    ))}
                    <div className="border-t border-[#222]" />
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
                        className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#F6F1E7]"
                    >
                        Decompile an Ad
                        <ArrowUpRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
