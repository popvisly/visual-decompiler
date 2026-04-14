'use client';

import { motion } from 'framer-motion';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';

export default function DossierPreview() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] py-24 text-[#F6F1E7] lg:py-32" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-[980px]"
                >
                    <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Dossier Layer</p>
                    <CanonicalDossierArtifact mode="attention-zoom" />
                </motion.div>
            </div>
        </section>
    );
}
