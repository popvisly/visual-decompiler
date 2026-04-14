'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function ProductHero() {
    return (
        <>
            <section className="relative overflow-hidden border-b border-white/10 pt-28 lg:pt-36" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-12 lg:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-[860px]"
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Product</p>
                        <h1 className="mt-6 text-[15vw] font-semibold uppercase leading-[0.88] tracking-[-0.04em] text-[#F6F1E7] sm:text-[12vw] lg:text-[96px]">
                            A system for visual due diligence.
                        </h1>
                        <p className="mt-8 max-w-[680px] text-[19px] leading-[1.8] text-[#F6F1E7]/72">
                            Visual Decompiler analyzes advertising at a structural level — turning creative instinct into clear, defensible reasoning.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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

                        <div className="mt-14 mb-6 max-w-[820px] opacity-60">
                            <div className="max-h-[126px] overflow-hidden blur-[0.2px]">
                                <CanonicalDossierArtifact mode="layer-primary" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="border-b border-white/10 py-24 lg:py-28" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[760px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">The Problem</p>
                        <h2 className="mt-6 text-[12vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[9vw] lg:text-[64px]">
                            Creative decisions are still defended with opinion.
                        </h2>
                        <p className="mt-8 text-[19px] leading-[1.8] text-[#F6F1E7]/70">
                            Work is judged on instinct.
                            <br />
                            Feedback slows.
                            <br />
                            Clients hesitate.
                            <br />
                            <br />
                            Not because the work is weak —
                            <br />
                            but because the reasoning isn&apos;t visible.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
