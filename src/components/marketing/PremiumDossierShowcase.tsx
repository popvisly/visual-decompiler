'use client';

import { motion } from 'framer-motion';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';

export default function PremiumDossierShowcase() {
    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] pt-28 pb-24 text-[#141414] lg:pt-40 lg:pb-28">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FBFBF6] via-[#FBFBF6]/70 to-transparent" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="max-w-xl">
                        <MarketingSectionHeading
                            kicker="Proof"
                            title="Built for the room."
                            description="Not a chat response. Not vague AI commentary. A structured dossier designed for decks, internal reviews, and client conversations."
                        />
                        <p className="mt-8 max-w-xl text-[15px] leading-[1.75] text-[#6B6B6B]">
                            Built for strategists, creative leads, and agency teams presenting work under pressure.
                            <br />
                            <br />
                            This is the artifact you receive.
                        </p>
                    </div>

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
