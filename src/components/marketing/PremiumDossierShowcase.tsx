'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
import { MARKETING_CARD_PADDED_SM } from '@/components/marketing/cardStyles';

export default function PremiumDossierShowcase() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-24 text-[#141414] lg:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FBFBF6] via-[#FBFBF6]/70 to-transparent" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="max-w-xl">
                        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#8B6A3D]/80">
                            This is what a creative decision looks like.
                        </p>
                        <MarketingSectionHeading
                            kicker="Proof"
                            title="A clinical read. A decision-ready verdict."
                            description="Visual Decompiler does not return a loose AI answer. It produces a structured forensic artifact with decision logic, evidence anchors, and language your team can defend in the room."
                        />

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#141414] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                View Sample Dossier
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414] transition hover:bg-[#FBFBF6]"
                            >
                                Start Free
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Decorative background element */}
                        <div className="absolute -inset-4 rounded-[3rem] bg-[#D4A574]/5 blur-2xl" />
                        
                        <motion.div
                            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98, y: 20 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={prefersReducedMotion ? undefined : { duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10"
                        >
                            <CanonicalDossierArtifact mode="preview" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
