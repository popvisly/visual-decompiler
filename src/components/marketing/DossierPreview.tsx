'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function DossierPreview() {
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
                        What you get back
                    </p>
                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#F6F1E7] max-w-[16ch] mb-10">
                        Not vibes.<br />
                        <span className="text-[#C1A674]">Structured judgment.</span>
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#9a9a94] max-w-[520px]">
                        A dossier with a verdict, prioritized fixes, confidence scores, and evidence-separated claims. Built to hold up in a client room.
                    </p>
                </motion.div>

                {/* Sample dossier card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-16 rounded-[1.4rem] border border-[#222] bg-[#111] p-8 lg:p-12"
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between pb-6 border-b border-[#222] mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#C1A674]" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C1A674]">Sample Dossier</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#9a9a94]">CHANEL No.5</span>
                    </div>

                    {/* Metrics row */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {[
                            { label: 'Confidence', value: '99/100' },
                            { label: 'Cognitive Friction', value: '8%' },
                            { label: 'Persuasion Density', value: '91%' },
                        ].map(m => (
                            <div key={m.label}>
                                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9a9a94] mb-1">{m.label}</p>
                                <p className="text-[28px] lg:text-[36px] font-black text-[#F6F1E7] tabular-nums">{m.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Palette bar */}
                    <div className="mb-8">
                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9a9a94] mb-3">Palette Logic</p>
                        <div className="flex w-full h-3 rounded-full overflow-hidden">
                            {[
                                { color: '#D4A574', w: '30%' },
                                { color: '#2C2C2C', w: '25%' },
                                { color: '#F5F0E8', w: '20%' },
                                { color: '#8B7355', w: '15%' },
                                { color: '#E8D4B8', w: '10%' },
                            ].map((seg, i) => (
                                <div key={i} style={{ width: seg.w, backgroundColor: seg.color }} />
                            ))}
                        </div>
                    </div>

                    {/* Decision */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {['KEEP', 'REFINE', 'KILL'].map(s => (
                            <div
                                key={s}
                                className={`rounded-[1.4rem] border px-4 py-3 ${
                                    s === 'KEEP'
                                        ? 'border-[#C1A674]/40 bg-[#C1A674]/5'
                                        : 'border-[#222] bg-[#0B0B0B]'
                                }`}
                            >
                                <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${s === 'KEEP' ? 'text-[#C1A674]' : 'text-[#9a9a94]'}`}>{s}</p>
                                <p className={`mt-1 text-[11px] ${s === 'KEEP' ? 'text-[#F6F1E7]/60' : 'text-[#9a9a94]/50'}`}>
                                    {s === 'KEEP' ? 'Recommended.' : s === 'REFINE' ? 'Tighten mechanism.' : 'Rework route.'}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Quick reads */}
                    <div className="space-y-4">
                        {[
                            { label: 'Primary Mechanic', value: 'Celebrity Aspirational Transfer' },
                            { label: 'Strategic Move', value: 'Heritage reactivation via contemporary embodiment' },
                        ].map(line => (
                            <div key={line.label} className="flex flex-col sm:flex-row sm:items-start gap-2 border-t border-[#222] pt-4">
                                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9a9a94] w-[160px] shrink-0">{line.label}</span>
                                <span className="text-[14px] text-[#F6F1E7]/70">{line.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-10 flex items-center gap-3"
                >
                    <Link
                        href={SAMPLE_DOSSIER_HREF}
                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F6F1E7] transition hover:text-[#C1A674]"
                    >
                        Open full sample dossier
                        <ArrowUpRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
