     1|'use client';
     2|
     3|import { motion } from 'framer-motion';
     4|import Link from 'next/link';
     5|import { ArrowUpRight } from 'lucide-react';
     6|import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
     7|
     8|export default function DossierPreview() {
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
    20|                        What you get back
    21|                    </p>
    22|                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#F6F1E7] max-w-[16ch] mb-10">
    23|                        Not vibes.<br />
    24|                        <span className="text-[#C1A674]">Structured judgment.</span>
    25|                    </h2>
    26|                    <p className="text-[18px] leading-[1.7] text-[#9a9a94] max-w-[520px]">
    27|                        A dossier with a verdict, prioritized fixes, confidence scores, and evidence-separated claims. Built to hold up in a client room.
    28|                    </p>
    29|                </motion.div>
    30|
    31|                {/* Sample dossier card */}
    32|                <motion.div
    33|                    initial={{ opacity: 0, y: 30 }}
    34|                    whileInView={{ opacity: 1, y: 0 }}
    35|                    viewport={{ once: true, margin: '-50px' }}
    36|                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    37|                    className="mt-16 rounded-[1.4rem] border border-[#222] bg-[#111] p-8 lg:p-12"
    38|                >
    39|                    {/* Top bar */}
    40|                    <div className="flex items-center justify-between pb-6 border-b border-[#222] mb-8">
    41|                        <div className="flex items-center gap-3">
    42|                            <div className="w-2 h-2 rounded-full bg-[#C1A674]" />
    43|                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C1A674]">Sample Dossier</span>
    44|                        </div>
    45|                        <span className="text-[10px] font-bold text-[#9a9a94]">CHANEL No.5</span>
    46|                    </div>
    47|
    48|                    {/* Metrics row */}
    49|                    <div className="grid grid-cols-3 gap-6 mb-8">
    50|                        {[
    51|                            { label: 'Confidence', value: '99/100' },
    52|                            { label: 'Cognitive Friction', value: '8%' },
    53|                            { label: 'Persuasion Density', value: '91%' },
    54|                        ].map(m => (
    55|                            <div key={m.label}>
    56|                                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9a9a94] mb-1">{m.label}</p>
    57|                                <p className="text-[28px] lg:text-[36px] font-black text-[#F6F1E7] tabular-nums">{m.value}</p>
    58|                            </div>
    59|                        ))}
    60|                    </div>
    61|
    62|                    {/* Palette bar */}
    63|                    <div className="mb-8">
    64|                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9a9a94] mb-3">Palette Logic</p>
    65|                        <div className="flex w-full h-3 rounded-full overflow-hidden">
    66|                            {[
    67|                                { color: '#D4A574', w: '30%' },
    68|                                { color: '#2C2C2C', w: '25%' },
    69|                                { color: '#F5F0E8', w: '20%' },
    70|                                { color: '#8B7355', w: '15%' },
    71|                                { color: '#E8D4B8', w: '10%' },
    72|                            ].map((seg, i) => (
    73|                                <div key={i} style={{ width: seg.w, backgroundColor: seg.color }} />
    74|                            ))}
    75|                        </div>
    76|                    </div>
    77|
    78|                    {/* Decision */}
    79|                    <div className="grid grid-cols-3 gap-3 mb-8">
    80|                        {['KEEP', 'REFINE', 'KILL'].map(s => (
    81|                            <div
    82|                                key={s}
    83|                                className={`rounded-[1.4rem] border px-4 py-3 ${
    84|                                    s === 'KEEP'
    85|                                        ? 'border-[#C1A674]/40 bg-[#C1A674]/5'
    86|                                        : 'border-[#222] bg-[#0B0B0B]'
    87|                                }`}
    88|                            >
    89|                                <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${s === 'KEEP' ? 'text-[#C1A674]' : 'text-[#9a9a94]'}`}>{s}</p>
    90|                                <p className={`mt-1 text-[11px] ${s === 'KEEP' ? 'text-[#F6F1E7]/60' : 'text-[#9a9a94]/50'}`}>
    91|                                    {s === 'KEEP' ? 'Recommended.' : s === 'REFINE' ? 'Tighten mechanism.' : 'Rework route.'}
    92|                                </p>
    93|                            </div>
    94|                        ))}
    95|                    </div>
    96|
    97|                    {/* Quick reads */}
    98|                    <div className="space-y-4">
    99|                        {[
   100|                            { label: 'Primary Mechanic', value: 'Celebrity Aspirational Transfer' },
   101|                            { label: 'Strategic Move', value: 'Heritage reactivation via contemporary embodiment' },
   102|                        ].map(line => (
   103|                            <div key={line.label} className="flex flex-col sm:flex-row sm:items-start gap-2 border-t border-[#222] pt-4">
   104|                                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9a9a94] w-[160px] shrink-0">{line.label}</span>
   105|                                <span className="text-[14px] text-[#F6F1E7]/70">{line.value}</span>
   106|                            </div>
   107|                        ))}
   108|                    </div>
   109|                </motion.div>
   110|
   111|                {/* Bottom link */}
   112|                <motion.div
   113|                    initial={{ opacity: 0, y: 20 }}
   114|                    whileInView={{ opacity: 1, y: 0 }}
   115|                    viewport={{ once: true }}
   116|                    transition={{ duration: 0.8, delay: 0.5 }}
   117|                    className="mt-10 flex items-center gap-3"
   118|                >
   119|                    <Link
   120|                        href={SAMPLE_DOSSIER_HREF}
   121|                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F6F1E7] transition hover:text-[#C1A674]"
   122|                    >
   123|                        Open full sample dossier
   124|                        <ArrowUpRight size={16} />
   125|                    </Link>
   126|                </motion.div>
   127|            </div>
   128|        </section>
   129|    );
   130|}
   131|