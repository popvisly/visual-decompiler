     1|'use client';
     2|
     3|import { motion } from 'framer-motion';
     4|import Link from 'next/link';
     5|import { ArrowUpRight, ArrowDown } from 'lucide-react';
     6|import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
     7|
     8|export default function HowItWorks() {
     9|    return (
    10|        <section className="relative bg-[#0B0B0B] text-[#F6F1E7] py-32 lg:py-48 overflow-hidden" data-presence-tone="dark">
    11|            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
    12|                {/* Section header */}
    13|                <motion.div
    14|                    initial={{ opacity: 0, y: 40 }}
    15|                    whileInView={{ opacity: 1, y: 0 }}
    16|                    viewport={{ once: true, margin: '-100px' }}
    17|                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    18|                >
    19|                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
    20|                        How it works
    21|                    </p>
    22|                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#F6F1E7] max-w-[14ch] mb-10">
    23|                        Drop an ad.<br />
    24|                        <span className="text-[#C1A674]">Get the read.</span>
    25|                    </h2>
    26|                    <p className="text-[18px] leading-[1.7] text-[#9a9a94] max-w-[520px]">
    27|                        Upload a creative. Within minutes, receive a structured dossier with a clear verdict, fix priorities, and evidence you can defend in a client room.
    28|                    </p>
    29|                </motion.div>
    30|
    31|                {/* Three simple steps */}
    32|                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12">
    33|                    {[
    34|                        { n: '1', title: 'Ingest', detail: 'JPG, PNG, WebP or URL. The asset is secured and fingerprinted.' },
    35|                        { n: '2', title: 'Decompose', detail: '13 forensic surfaces extracted — mechanics, semiotics, gaze, friction.' },
    36|                        { n: '3', title: 'Dossier', detail: 'Boardroom-ready verdict. Fix priorities. Confidence scores. One click.' },
    37|                    ].map((step, idx) => (
    38|                        <motion.div
    39|                            key={step.n}
    40|                            initial={{ opacity: 0, y: 30 }}
    41|                            whileInView={{ opacity: 1, y: 0 }}
    42|                            viewport={{ once: true, margin: '-50px' }}
    43|                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
    44|                        >
    45|                            <div className="flex items-start gap-5">
    46|                                <span className="text-[48px] font-black leading-none text-[#F6F1E7]/[0.06]">{step.n}</span>
    47|                                <div>
    48|                                    <h3 className="text-[18px] font-black uppercase tracking-[-0.01em] text-[#F6F1E7] mb-2">{step.title}</h3>
    49|                                    <p className="text-[15px] leading-[1.65] text-[#9a9a94]">{step.detail}</p>
    50|                                </div>
    51|                            </div>
    52|                        </motion.div>
    53|                    ))}
    54|                </div>
    55|
    56|                <motion.div
    57|                    initial={{ opacity: 0, y: 20 }}
    58|                    whileInView={{ opacity: 1, y: 0 }}
    59|                    viewport={{ once: true }}
    60|                    transition={{ duration: 0.8, delay: 0.5 }}
    61|                    className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-6"
    62|                >
    63|                    <Link
    64|                        href="/ingest"
    65|                        className="inline-flex items-center gap-3 bg-[#F6F1E7] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#F6F1E7]"
    66|                    >
    67|                        Start Decompiling Free
    68|                        <ArrowUpRight size={16} />
    69|                    </Link>
    70|                    <Link
    71|                        href={SAMPLE_DOSSIER_HREF}
    72|                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a9a94] transition hover:text-[#F6F1E7]"
    73|                    >
    74|                        <span className="w-6 h-px bg-[#F6F1E7]/20" />
    75|                        See sample read
    76|                    </Link>
    77|                </motion.div>
    78|            </div>
    79|        </section>
    80|    );
    81|}
    82|