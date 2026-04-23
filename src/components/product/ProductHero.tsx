'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function ProductHero() {
    return (
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-28 lg:pt-32 lg:pb-36" data-presence-tone="dark">
            <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[920px]"
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">Product</p>
                    <h1 className="mt-5 text-[clamp(48px,6.1vw,94px)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#F6F1E7]">
                        Make the work make sense.
                    </h1>

                    <div className="mt-8 max-w-[840px] rounded-[1.75rem] border border-[#C1A674]/22 bg-[#0D0D0D]/72 px-8 py-8 shadow-[0_0_36px_rgba(0,0,0,0.34)] backdrop-blur-md">
                        <p className="text-[17px] leading-[1.85] text-[#F6F1E7]/78">
                            Creative work rarely fails because it lacks quality.
                            <br />
                            <br />
                            It fails because teams struggle to explain, defend, and align around it.
                            <br />
                            <br />
                            Visual Decompiler turns creative instinct into structured reasoning — so pitches land stronger, reviews move faster, and clients approve with confidence.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center border border-white/12 bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0B0B0B] transition hover:bg-[#F6F1E7]"
                            >
                                Decompile an Ad
                            </Link>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center border border-white/12 bg-white/5 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#F6F1E7] transition hover:border-white/22 hover:bg-white/10"
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
