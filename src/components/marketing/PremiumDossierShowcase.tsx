'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function PremiumDossierShowcase() {
    return (
        <section className="relative bg-[#0B0B0B] text-[#F6F1E7] py-32 lg:py-48 overflow-hidden" data-presence-tone="dark">
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-xl"
                    >
                        <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#C1A674]">
                            Sample Dossier
                        </div>

                        <h2 className="max-w-lg text-[14vw] sm:text-[9vw] lg:text-[72px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7]">
                            From instinct to evidence.
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-8 text-[#F6F1E7]/70 sm:text-lg">
                            Visual Decompiler turns visual analysis into a refined, presentation-ready dossier — helping creatives and agencies explain not just what the work is, but why it lands.
                        </p>

                        <p className="mt-4 max-w-xl text-base leading-8 text-[#F6F1E7]/55">
                            Built for internal reviews, client presentations, and white-label agency delivery.
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            {[
                                'Structured creative analysis',
                                'Strategic interpretation',
                                'Clean exportable format',
                                'White label ready',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-[#F6F1E7]/80"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:bg-white/90"
                            >
                                View Sample Dossier
                            </Link>

                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white/85 transition hover:bg-white/[0.07] hover:text-white"
                            >
                                Decompile an Ad
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.99 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="relative mx-auto w-full max-w-3xl"
                    >
                        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(193,166,116,0.16),transparent_58%)] blur-3xl" />

                        <div className="relative h-[500px] sm:h-[560px] lg:h-[640px]">
                            <motion.div
                                whileHover={{ y: -4, rotate: 7.4 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute right-2 top-10 w-[72%] rotate-[2deg] md:rotate-[8deg] rounded-[28px] border border-[#C1A674]/20 bg-[#0B0B0B]/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md"
                            >
                                <div className="mb-8 flex items-center justify-between">
                                    <div className="text-[10px] uppercase tracking-[0.28em] text-[#C1A674]/80">
                                        White Label Export
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-[#C1A674]/80" />
                                </div>

                                <div className="text-xs uppercase tracking-[0.22em] text-white/45">Agency Mode</div>
                                <div className="mt-3 text-xl font-semibold uppercase tracking-[0.04em] text-white">Sovereign &amp; Co.</div>
                                <div className="mt-1 text-sm uppercase tracking-[0.18em] text-white/40">Creative Review Dossier</div>

                                <div className="mt-8 space-y-4">
                                    <div className="h-10 rounded-xl border border-white/10 bg-white/[0.03]" />
                                    <div className="h-10 rounded-xl border border-white/10 bg-white/[0.03]" />
                                    <div className="h-24 rounded-2xl border border-white/10 bg-white/[0.02]" />
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5, rotate: -4.6 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute left-4 top-20 w-[78%] -rotate-[1.5deg] md:-rotate-[5deg] rounded-[30px] border border-white/12 bg-[#101010]/92 p-6 shadow-[0_35px_100px_rgba(0,0,0,0.55)] backdrop-blur-md"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.28em] text-[#C1A674]">Internal Analysis</div>
                                        <div className="mt-2 text-lg font-semibold uppercase tracking-[0.05em] text-white">Campaign Breakdown</div>
                                    </div>
                                    <div className="rounded-full border border-white/12 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/55">
                                        Page 02
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                            <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Executive Summary</div>
                                            <div className="mt-4 space-y-2">
                                                <div className="h-2 rounded-full bg-white/12" />
                                                <div className="h-2 w-[92%] rounded-full bg-white/12" />
                                                <div className="h-2 w-[78%] rounded-full bg-white/12" />
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                            <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Tone Signal</div>
                                            <div className="mt-4 flex items-end gap-2">
                                                <div className="h-10 w-full rounded-md bg-[#C1A674]/50" />
                                                <div className="h-16 w-full rounded-md bg-[#C1A674]/70" />
                                                <div className="h-12 w-full rounded-md bg-[#C1A674]/40" />
                                                <div className="h-20 w-full rounded-md bg-[#C1A674]/85" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                            <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Hierarchy</div>
                                            <div className="mt-4 space-y-3">
                                                <div className="h-3 w-full rounded-full bg-white/12" />
                                                <div className="h-3 w-[82%] rounded-full bg-white/12" />
                                                <div className="h-3 w-[64%] rounded-full bg-white/12" />
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                            <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Brand Posture</div>
                                            <div className="mt-4 space-y-3">
                                                <div className="h-3 w-[88%] rounded-full bg-white/12" />
                                                <div className="h-3 w-[72%] rounded-full bg-white/12" />
                                                <div className="h-3 w-[56%] rounded-full bg-white/12" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-4">
                                        <div className="mb-4 text-[10px] uppercase tracking-[0.24em] text-white/45">Strategic Intent</div>
                                        <div className="grid grid-cols-[0.95fr_1.05fr] gap-4">
                                            <div className="h-32 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01]" />
                                            <div className="space-y-2">
                                                <div className="h-2 rounded-full bg-white/10" />
                                                <div className="h-2 w-[95%] rounded-full bg-white/10" />
                                                <div className="h-2 w-[82%] rounded-full bg-white/10" />
                                                <div className="h-2 w-[68%] rounded-full bg-white/10" />
                                                <div className="h-2 w-[74%] rounded-full bg-white/10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -7 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute bottom-0 left-1/2 z-10 w-[82%] -translate-x-1/2 rounded-[34px] border border-white/12 bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(10,10,10,0.98))] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-[10px] uppercase tracking-[0.32em] text-[#C1A674]">Visual Decompiler</div>
                                    <div className="rounded-full border border-white/12 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/45">
                                        Sample Export
                                    </div>
                                </div>

                                <div className="mt-16">
                                    <div className="text-xs uppercase tracking-[0.24em] text-white/40">Creative Intelligence Dossier</div>
                                    <h3 className="mt-4 max-w-md text-3xl font-semibold uppercase leading-[1.02] tracking-[-0.03em] text-white sm:text-4xl">
                                        Summer Brand Film
                                    </h3>
                                    <p className="mt-4 max-w-sm text-sm leading-7 text-white/58">
                                        Prepared for client review. Structured visual reasoning for presentation, alignment, and decision-making.
                                    </p>
                                </div>

                                <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.24em] text-white/35">Prepared For</div>
                                        <div className="mt-2 text-sm uppercase tracking-[0.14em] text-white/80">Client Review</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.24em] text-white/35">Delivery Mode</div>
                                        <div className="mt-2 text-sm uppercase tracking-[0.14em] text-white/80">White Label Ready</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
