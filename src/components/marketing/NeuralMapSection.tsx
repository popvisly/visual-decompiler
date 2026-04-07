     1|'use client';
     2|
     3|import { motion } from 'framer-motion';
     4|import Link from 'next/link';
     5|import { ArrowUpRight } from 'lucide-react';
     6|import NeuralParticleHero from './NeuralParticleHero';
     7|
     8|export default function NeuralMapSection() {
     9|    return (
    10|        <section className="relative bg-[#0B0B0B] text-[#F6F1E7] py-32 lg:py-48 overflow-hidden" data-presence-tone="dark">
    11|            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
    12|                {/* Section header */}
    13|                <motion.div
    14|                    initial={{ opacity: 0, y: 40 }}
    15|                    whileInView={{ opacity: 1, y: 0 }}
    16|                    viewport={{ once: true, margin: '-100px' }}
    17|                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    18|                    className="mb-12"
    19|                >
    20|                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
    21|                        The intelligence layer
    22|                    </p>
    23|                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#F6F1E7] max-w-[14ch] mb-10">
    24|                        13 dimensions.<br />
    25|                        <span className="text-[#C1A674]">Working together.</span>
    26|                    </h2>
    27|                    <p className="text-[18px] leading-[1.7] text-[#9a9a94] max-w-[520px]">
    28|                        Trigger mechanics connect to semiotic subtext. Gaze routing flows into persuasion density. The read is only as strong as the connections between the surfaces.
    29|                    </p>
    30|                </motion.div>
    31|
    32|                {/* Neural Map */}
    33|                <NeuralParticleHero />
    34|            </div>
    35|        </section>
    36|    );
    37|}
    38|