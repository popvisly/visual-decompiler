'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function ProductHero() {
    return (
        <section className="relative overflow-hidden pt-30 pb-24 lg:pt-36 lg:pb-28">
            <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[920px]"
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">Product</p>
                    <h1 className="mt-5 max-w-[14ch] text-[clamp(52px,6.4vw,102px)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#141414]">
                        A workflow for defensible creative decisions.
                    </h1>

                    <div className="mt-8 max-w-[840px] rounded-[1.75rem] border border-black/5 bg-white px-8 py-8 shadow-sm">
                        <div className="space-y-6 text-[17px] leading-[1.85] text-[#6B6B6B]">
                            <p>Creative work rarely fails because it lacks quality.</p>
                            <p>It fails because teams struggle to explain, defend, and align around it.</p>
                            <p>Visual Decompiler turns creative instinct into a saved, repeatable intelligence workflow: diagnose the asset, compare it against your vault, stress-test the route, and export the decision artifact.</p>
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center rounded-full bg-[#141414] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                Decompile an Ad
                            </Link>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#141414] transition hover:bg-[#FBFBF6]"
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
