'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const STEPS = [
    {
        title: 'Import the asset',
        body: 'Bring in the work, or the references shaping it.',
    },
    {
        title: 'Run the fixed read',
        body: 'Break down hierarchy, attention flow, tone, strategic intent, and risk through the same structured modules every time.',
    },
    {
        title: 'Export the decision',
        body: 'Walk into reviews, pitches, and client conversations with a dossier, audit trail, and recommendation built for alignment.',
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
            <section className="pt-10 pb-20 lg:pt-14 lg:pb-24">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[640px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#8B6A3D]/80">Dossier Proof</p>
                        <h2 className="mt-5 text-[10vw] font-semibold uppercase leading-[0.9] tracking-tight text-[#141414] sm:text-[7vw] lg:text-[52px]">
                            Output designed for the room.
                        </h2>
                        <div className="mt-7 space-y-5 text-[19px] leading-[1.8] text-[#6B6B6B]">
                            <p>A structured dossier designed for clarity, direction, validation, caveats, and conversation.</p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-10"
                    >
                        <div className="mx-auto max-w-[1000px] overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm">
                            <Image
                                src="/images/marketing/decompiler-workspace.png"
                                alt="Visual Decompiler product interface screenshot"
                                width={1600}
                                height={900}
                                className="h-auto w-full origin-left scale-[1.01] bg-[#FBFBF6] object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="pt-12 pb-16 lg:pt-16 lg:pb-20">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[900px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#8B6A3D]/80">Core Value</p>
                        <h2 className="mt-6 text-[11vw] font-semibold uppercase leading-[0.9] tracking-tight text-[#141414] sm:text-[8vw] lg:text-[58px]">
                            Make the work make sense.
                        </h2>
                        <div className="mt-8 space-y-6 text-[19px] leading-[1.8] text-[#6B6B6B]">
                            <p>Creative work doesn&apos;t fail because it&apos;s bad.</p>
                            <p>It fails because it can&apos;t be clearly explained.</p>
                            <p>Visual Decompiler turns instinct into structured reasoning, helping teams align faster, defend stronger ideas, and move work toward approval with more confidence.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-12 pb-16 lg:pt-16 lg:pb-20">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[860px] rounded-[28px] border border-black/5 bg-white p-8 shadow-sm md:p-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#8B6A3D]/80">Positioning</p>
                        <h3 className="mt-5 text-[10vw] font-semibold uppercase leading-[0.9] tracking-tight text-[#141414] sm:text-[7vw] lg:text-[46px]">
                            Built for creative decisions under pressure.
                        </h3>
                        <p className="mt-7 text-[18px] leading-[1.75] text-[#6B6B6B]">
                            Whether you&apos;re preparing for a pitch, reviewing campaign work internally, or presenting to clients, Visual Decompiler helps turn subjective reactions into structured discussion.
                        </p>
                        <p className="mt-5 text-[14px] font-medium uppercase tracking-[0.17em] text-[#8B6A3D]/70">
                            Less opinion loops. Clearer reasoning. Faster approvals.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pt-12 pb-16 lg:pt-16 lg:pb-20">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="rounded-[24px] border border-black/5 bg-white px-6 py-8 shadow-sm lg:px-8 lg:py-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#8B6A3D]/80">How it works</p>
                        <h2 className="mt-6 text-[11vw] font-semibold uppercase leading-[0.9] tracking-tight text-[#141414] sm:text-[8vw] lg:text-[58px]">
                            From asset to artifact.
                        </h2>

                        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {STEPS.map((step, idx) => (
                            <motion.article
                                key={step.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="rounded-[20px] border border-black/5 bg-[#FBFBF6] p-6"
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8B6A3D]/80">Step {idx + 1}</p>
                                <h3 className="mt-4 text-[24px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#141414]">
                                    {step.title}
                                </h3>
                                <p className="mt-4 text-[15px] leading-[1.7] text-[#6B6B6B]">{step.body}</p>
                            </motion.article>
                        ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-12 pb-16 lg:pt-16 lg:pb-20">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[860px] rounded-[28px] border border-black/5 bg-white p-8 shadow-sm md:p-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#8B6A3D]/80">Dossier Clarity</p>
                        <h3 className="mt-5 text-[10vw] font-semibold uppercase leading-[0.9] tracking-tight text-[#141414] sm:text-[7vw] lg:text-[46px]">
                            What the dossier reveals
                        </h3>

                        <div className="mt-8 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                            {DOSSIER_REVEALS.map((item) => (
                                <p key={item} className="text-[16px] leading-[1.7] text-[#5E5A53]">• {item}</p>
                            ))}
                        </div>

                        <p className="mt-8 text-[16px] leading-[1.75] text-[#6B6B6B]">
                            Structured analysis designed to support better creative conversations and stronger decisions.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
