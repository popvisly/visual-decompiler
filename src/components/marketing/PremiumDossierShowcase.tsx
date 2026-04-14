'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function PremiumDossierShowcase() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] py-32 text-[#F6F1E7] lg:py-44" data-presence-tone="dark">
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-xl"
                    >
                        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#C1A674]">Sample Dossier</p>

                        <h2 className="max-w-lg text-[13vw] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[8vw] lg:text-[72px]">
                            Output designed for the room.
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-8 text-[#F6F1E7]/72 sm:text-lg">
                            Not a chat response.
                            <br />
                            A structured document built for presentation, alignment, and decision-making.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
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
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.95, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <CanonicalDossierArtifact mode="preview" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
