'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function ProductHero() {
    return (
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-36 lg:pt-36 lg:pb-44" data-presence-tone="dark">
            <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[900px]"
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">Product</p>
                    <h1 className="mt-5 text-[clamp(52px,6.4vw,102px)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#F6F1E7]">
                        A system for visual due diligence.
                    </h1>

                    <div className="mt-10 max-w-[760px] rounded-[1.75rem] border border-white/10 bg-[#0D0D0D]/70 px-8 py-8 shadow-[0_0_36px_rgba(0,0,0,0.34)] ring-1 ring-white/5 backdrop-blur-md">
                        <p className="text-[16px] leading-[1.7] text-[#F6F1E7]/78">
                            Visual Decompiler analyzes advertising at a structural level — turning creative instinct into clear, defensible reasoning.
                        </p>

                        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center border border-white/12 bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0B0B0B] transition hover:bg-[#F6F1E7]"
                            >
                                View Sample Dossier
                            </Link>
                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center border border-white/12 bg-white/5 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#F6F1E7] transition hover:border-white/20 hover:bg-white/10"
                            >
                                Decompile Your Ad
                            </Link>
                        </div>

                        <div className="mt-14 w-full max-w-[760px] rounded-[1rem] border border-white/12 bg-[#12110F]/78 px-5 py-5 opacity-90">
                            <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-5">
                                {[
                                    ['Clarity', '82'],
                                    ['Attention', '91'],
                                    ['Cohesion', '76'],
                                    ['Intent', '88'],
                                    ['Distinction', '67'],
                                ].map(([label, value]) => (
                                    <div key={label} className="text-left">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F6F1E7]/55">{label}</p>
                                        <p className="mt-2 text-[24px] font-semibold leading-none tracking-[-0.02em] text-[#F6F1E7]">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
