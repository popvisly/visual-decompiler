'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import NeuralParticleHero from './NeuralParticleHero';

export default function NeuralMapSection() {
    return (
        <section className="relative bg-[#0B0B0B] text-[#F6F1E7] py-32 lg:py-48 overflow-hidden" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        The intelligence layer
                    </p>
                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#F6F1E7] max-w-[14ch] mb-10">
                        13 dimensions.<br />
                        <span className="text-[#C1A674]">Working together.</span>
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#9a9a94] max-w-[520px]">
                        Trigger mechanics connect to semiotic subtext. Gaze routing flows into persuasion density. The read is only as strong as the connections between the surfaces.
                    </p>
                </motion.div>

                {/* Neural Map */}
                <NeuralParticleHero />
            </div>
        </section>
    );
}
