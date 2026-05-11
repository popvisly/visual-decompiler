'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
import { ArrowUpRight, Activity } from 'lucide-react';

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
                            Live System Active
                        </span>
                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-black/30">Module: Core_Workflow</p>
                    </div>

                    <h1 className="max-w-[15ch] text-[clamp(48px,7.5vw,96px)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#141414]">
                        Know Why<br />It Works.
                    </h1>

                    <div className="mt-10 max-w-[880px] rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] lg:p-12">
                        <div className="space-y-6 text-[18px] leading-[1.8] text-[#515151]">
                            <p>Creative work rarely fails because it lacks quality.</p>
                            <p>It fails because teams struggle to <span className="text-[#141414] font-semibold underline decoration-[#D4A574]/30 underline-offset-4">explain, defend, and align</span> around it in the room.</p>
                            <p>Stop guessing. Start knowing. Every creative decision becomes a defensible visual logic your team can repeat.</p>
                        </div>

                        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#141414] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                Decompile an Ad
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

