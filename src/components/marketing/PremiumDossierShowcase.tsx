'use client';

import { motion } from 'framer-motion';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';

export default function PremiumDossierShowcase() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] pt-20 pb-32 text-[#F6F1E7] lg:pt-28 lg:pb-40" data-presence-tone="dark">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B0B0B]/75 via-[#0B0B0B]/30 to-transparent" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
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
                            <br />
                            Built for the moment decisions are made.
                            <br />
                            Full system includes multi-layer analysis across structure, psychology, and decision logic.
                        </p>
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
