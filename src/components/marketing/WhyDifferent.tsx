     1|'use client';
     2|
     3|import { motion } from 'framer-motion';
     4|import Link from 'next/link';
     5|import { ArrowUpRight } from 'lucide-react';
     6|
     7|const COMPARISONS = [
     8|    {
     9|        label: 'Ad Repositories · Meta Library, TikTok Creative Center',
    10|        they: 'Show you what ads exist.',
    11|        vd: 'We read why the creative persuades, what to keep, and what to fix next.',
    12|    },
    13|    {
    14|        label: 'Ad-Spy & Spend Tools · Pathmatics, SimilarWeb',
    15|        they: 'Track distribution, budget, and placement.',
    16|        vd: 'We complement spend data with creative causality and execution-level direction.',
    17|    },
    18|    {
    19|        label: 'AI Ad Generators · Flair, Munch',
    20|        they: 'Produce more ads, faster.',
    21|        vd: 'We don\'t generate. We diagnose, critique, and direct quality.',
    22|    },
    23|    {
    24|        label: 'ChatGPT · Ask a general AI to "review this ad"',
    25|        they: 'Broad observations in casual language.',
    26|        vd: 'Standardized analysis, vault memory, and client-presentable output.',
    27|    },
    28|];
    29|
    30|export default function WhyDifferent() {
    31|    return (
    32|        <section className="relative bg-[#0B0B0B] text-[#F6F1E7] py-32 lg:py-48 overflow-hidden" data-presence-tone="dark">
    33|            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
    34|                <motion.div
    35|                    initial={{ opacity: 0, y: 40 }}
    36|                    whileInView={{ opacity: 1, y: 0 }}
    37|                    viewport={{ once: true, margin: '-100px' }}
    38|                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    39|                >
    40|                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
    41|                        Why VD
    42|                    </p>
    43|                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#F6F1E7] max-w-[14ch] mb-10">
    44|                        Every tool shows <br />you <span className="text-[#C1A674]">what.</span><br />
    45|                        We read <span className="text-[#C1A674]">why.</span>
    46|                    </h2>
    47|                </motion.div>
    48|
    49|                {/* Comparison rows */}
    50|                <div className="mt-16 space-y-0">
    51|                    {COMPARISONS.map((comp, idx) => (
    52|                        <motion.div
    53|                            key={comp.label}
    54|                            initial={{ opacity: 0, y: 20 }}
    55|                            whileInView={{ opacity: 1, y: 0 }}
    56|                            viewport={{ once: true, margin: '-50px' }}
    57|                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
    58|                            className="py-8 border-t border-[#222] grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 lg:gap-16"
    59|                        >
    60|                            <div>
    61|                                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#9a9a94] mb-3">{comp.label}</p>
    62|                                <p className="text-[16px] leading-[1.6] text-[#9a9a94]">{comp.they}</p>
    63|                            </div>
    64|                            <div className="flex items-start">
    65|                                <p className="text-[16px] leading-[1.6] text-[#F6F1E7]">{comp.vd}</p>
    66|                            </div>
    67|                        </motion.div>
    68|                    ))}
    69|                    <div className="border-t border-[#222]" />
    70|                </div>
    71|
    72|                {/* Bottom CTA */}
    73|                <motion.div
    74|                    initial={{ opacity: 0, y: 20 }}
    75|                    whileInView={{ opacity: 1, y: 0 }}
    76|                    viewport={{ once: true }}
    77|                    transition={{ duration: 0.8, delay: 0.4 }}
    78|                    className="mt-16 flex items-center gap-6"
    79|                >
    80|                    <Link
    81|                        href="/ingest"
    82|                        className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#F6F1E7]"
    83|                    >
    84|                        Start Decompiling Free
    85|                        <ArrowUpRight size={16} />
    86|                    </Link>
    87|                </motion.div>
    88|            </div>
    89|        </section>
    90|    );
    91|}
    92|