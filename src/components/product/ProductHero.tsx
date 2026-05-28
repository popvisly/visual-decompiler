'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
import { ArrowUpRight, Activity } from 'lucide-react';

const HERO_PROOF_POINTS = [
    'Read the signal beneath the style',
    'Turn taste into structured rationale',
    'Present decisions with evidence',
] as const;

export default function ProductHero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32">
            {/* Forensic Grid Background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:48px_48px]"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[960px]"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="flex items-center gap-2 rounded-full border border-[#D4A574]/30 bg-[#D4A574]/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B6A3D]">
                            <Activity className="h-3 w-3" />
                            Decision System Active
                        </span>
                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-black/30">Product / Visual Decompiler</p>
                    </div>

                    <h1 className="max-w-[15ch] text-[clamp(42px,7vw,96px)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#141414]">
                        Read the signal.<br />Trace the intent.<br />Defend the decision.
                    </h1>

                    <div className="mt-10 max-w-[880px] rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] lg:p-12">
                        <div className="space-y-6 text-[18px] leading-[1.8] text-[#515151]">
                            <p>Visual Decompiler turns a finished ad into a structured read of what the creative is actually doing.</p>
                            <p>Not just what it looks like. The hierarchy, persuasion cues, brand posture, and decision logic underneath the surface.</p>
                            <p>So when the room asks why this works, you have more than instinct. You have evidence you can present.</p>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            {HERO_PROOF_POINTS.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-[#D4A574]/20 bg-[#FBF7EF] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A6241]"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#141414] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                Start Free
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414] transition hover:bg-[#FBFBF6]"
                            >
                                View Sample Dossier
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
