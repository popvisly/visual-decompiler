'use client';

import { motion } from 'framer-motion';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';

const STEPS = [
    {
        title: 'Upload the Ad',
        body: 'Bring in the work — or the references shaping it.',
    },
    {
        title: 'Decompile the Creative',
        body: 'Break down hierarchy, attention flow, tone, and strategic intent — so the reasoning behind the work becomes clear and defensible.',
    },
    {
        title: 'Present with Authority',
        body: 'Walk into reviews, pitches, and client conversations with a structured dossier built for alignment and approval.',
    },
];

const DOSSIER_REVEALS = [
    'Attention flow',
    'Visual hierarchy',
    'Emotional positioning',
    'Brand tension',
    'Audience fit',
    'Friction points',
    'Strategic clarity',
    'Trust signals',
];

export default function AnalysisSurfaces() {
    return (
        <>
            <section className="pt-20 pb-24 lg:pt-28 lg:pb-32" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[640px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Dossier Proof</p>
                        <h2 className="mt-6 text-[10vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[7vw] lg:text-[52px]">
                            Output designed for the room.
                        </h2>
                        <p className="mt-7 text-[19px] leading-[1.8] text-[#F6F1E7]/72">
                            Not a chat response. Not vague AI commentary.
                            <br />
                            <br />
                            A structured dossier designed for decks, internal reviews, and client conversations.
                        </p>
                        <p className="mt-5 text-[14px] font-medium uppercase tracking-[0.18em] text-[#C1A674]">
                            Built for the moments where creative decisions get made.
                        </p>
                        <p className="mt-3 text-[14px] uppercase tracking-[0.18em] text-[#F6F1E7]/70">
                            This is the artifact you receive.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-12"
                    >
                        <CanonicalDossierArtifact mode="preview" className="mx-auto max-w-[1000px]" />
                    </motion.div>
                </div>
            </section>

            <section className="pt-16 pb-20 lg:pt-20 lg:pb-24" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[900px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Core Value</p>
                        <h2 className="mt-6 text-[11vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[8vw] lg:text-[58px]">
                            Make the work make sense.
                        </h2>
                        <p className="mt-8 text-[19px] leading-[1.8] text-[#F6F1E7]/72">
                            Creative work doesn&apos;t fail because it&apos;s bad.
                            <br />
                            <br />
                            It fails because it can&apos;t be clearly explained.
                            <br />
                            <br />
                            Visual Decompiler turns instinct into structured reasoning — helping teams align faster, defend stronger ideas, and move work toward approval with more confidence.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pt-16 pb-16 lg:pt-20 lg:pb-20" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[860px] rounded-[28px] border border-[rgba(193,166,116,0.22)] bg-white/[0.02] p-8 md:p-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#C1A674]">Positioning</p>
                        <h3 className="mt-5 text-[10vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[7vw] lg:text-[46px]">
                            Built for creative decisions under pressure.
                        </h3>
                        <p className="mt-7 text-[18px] leading-[1.75] text-[#F6F1E7]/72">
                            Whether you&apos;re preparing for a pitch, reviewing campaign work internally, or presenting to clients, Visual Decompiler helps turn subjective reactions into structured discussion.
                        </p>
                        <p className="mt-5 text-[14px] font-medium uppercase tracking-[0.17em] text-[#C1A674]">
                            Less opinion loops. Clearer reasoning. Faster approvals.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pt-16 pb-20 lg:pt-20 lg:pb-24" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="rounded-[24px] border border-[rgba(193,166,116,0.20)] bg-white/[0.015] px-6 py-8 lg:px-8 lg:py-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#C1A674]">How it works</p>
                        <h2 className="mt-6 text-[11vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[8vw] lg:text-[58px]">
                            From concept to conviction.
                        </h2>

                        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {STEPS.map((step, idx) => (
                            <motion.article
                                key={step.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="rounded-[20px] border border-[rgba(193,166,116,0.22)] bg-white/[0.02] p-6"
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C1A674]">Step {idx + 1}</p>
                                <h3 className="mt-4 text-[24px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#F6F1E7]">
                                    {step.title}
                                </h3>
                                <p className="mt-4 text-[15px] leading-[1.7] text-[#F6F1E7]/72">{step.body}</p>
                            </motion.article>
                        ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-16 pb-16 lg:pt-20 lg:pb-20" data-presence-tone="dark">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[860px] rounded-[28px] border border-[rgba(193,166,116,0.22)] bg-white/[0.02] p-8 md:p-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#C1A674]">Dossier Clarity</p>
                        <h3 className="mt-5 text-[10vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[7vw] lg:text-[46px]">
                            What the dossier reveals
                        </h3>

                        <div className="mt-8 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                            {DOSSIER_REVEALS.map((item) => (
                                <p key={item} className="text-[16px] leading-[1.7] text-[#F6F1E7]/82">• {item}</p>
                            ))}
                        </div>

                        <p className="mt-8 text-[16px] leading-[1.75] text-[#F6F1E7]/68">
                            Structured analysis designed to support better creative conversations and stronger decisions.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
