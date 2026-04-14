'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const ANALYSIS_LAYERS = [
    {
        title: 'Primary Scores',
        body: 'Clarity. Attention. Cohesion. Intent. Distinction. High-level signals that define how the work performs.',
        proof: 'layer-primary' as const,
    },
    {
        title: 'Attention Path',
        body: 'A mapped sequence of how the eye moves — and where it drops.',
        proof: 'layer-attention' as const,
    },
    {
        title: 'Structural Signals',
        body: 'Hierarchy, balance, contrast, density, and focus integrity — expressed as controlled diagnostics.',
        proof: 'layer-structural' as const,
    },
    {
        title: 'Strategic Read',
        body: 'A clear articulation of what the work is doing, why it works, and where it breaks.',
        proof: 'layer-strategic' as const,
    },
];

export default function AnalysisSurfaces() {
    return (
        <>
            <section className="border-b border-white/10 py-20 lg:py-24" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[920px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">The System</p>
                        <h2 className="mt-6 text-[12vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[9vw] lg:text-[64px]">
                            Visual Decompiler makes creative reasoning readable.
                        </h2>
                    </div>

                    <div className="mt-14 space-y-10">
                        {ANALYSIS_LAYERS.map((layer, index) => (
                            <motion.article
                                key={layer.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                className="grid items-start gap-7 border-t border-white/10 pt-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10"
                            >
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">{layer.title}</p>
                                    <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.82] text-[#F6F1E7]/74">{layer.body}</p>
                                </div>
                                <CanonicalDossierArtifact mode={layer.proof} />
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-white/10 py-20 lg:py-28" data-presence-tone="dark">
                <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
                    <div className="max-w-[640px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Dossier Preview</p>
                        <h3 className="mt-6 text-[10vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[7vw] lg:text-[56px]">
                            Output designed for the room.
                        </h3>
                        <p className="mt-7 text-[19px] leading-[1.8] text-[#F6F1E7]/72">
                            Not a chat response.
                            <br />
                            A structured document built for presentation, alignment, and decision-making.
                        </p>
                        <Link
                            href={SAMPLE_DOSSIER_HREF}
                            className="mt-9 inline-flex items-center justify-center border border-white/12 bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0B0B0B] transition hover:bg-[#F6F1E7]"
                        >
                            View Sample Dossier
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-12"
                    >
                        <CanonicalDossierArtifact mode="preview" className="mx-auto max-w-[1120px]" />
                    </motion.div>
                </div>
            </section>
        </>
    );
}
