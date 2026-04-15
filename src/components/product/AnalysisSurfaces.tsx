'use client';

import { motion } from 'framer-motion';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';

const ANALYSIS_LAYERS = [
    {
        title: 'Primary Scores',
        body: 'Clarity. Attention. Cohesion. Intent. Distinction.',
        proof: 'layer-primary' as const,
    },
    {
        title: 'Attention Path',
        body: 'A mapped sequence of how the eye moves — and where it drops.',
        proof: 'layer-attention' as const,
    },
    {
        title: 'Structural Signals',
        body: 'Hierarchy, balance, contrast, density, and focus integrity.',
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
            <section className="py-32 lg:py-44" data-presence-tone="dark">
                <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
                    <div className="max-w-[560px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Sample Dossier</p>
                        <h2 className="mt-6 text-[10vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[7vw] lg:text-[56px]">
                            Visual Decompiler
                            <br />
                            Creative Intelligence Dossier
                        </h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-20 lg:mt-24"
                    >
                        <CanonicalDossierArtifact mode="preview" className="mx-auto max-w-[1260px] lg:scale-[1.12] lg:origin-top" />
                    </motion.div>
                </div>
            </section>

            <section className="py-24 lg:py-28" data-presence-tone="dark">
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

            <section className="py-24 lg:py-32" data-presence-tone="dark">
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
                                    <p className="mt-4 max-w-[48ch] text-[17px] leading-[1.9] text-[#F6F1E7]/74">{layer.body}</p>
                                </div>
                                <CanonicalDossierArtifact mode={layer.proof} />
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
