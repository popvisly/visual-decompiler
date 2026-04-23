'use client';

import { motion } from 'framer-motion';

const STEPS = [
    {
        n: '1',
        title: 'Upload the Ad',
        detail: 'Bring in a campaign frame, concept, or reference.',
    },
    {
        n: '2',
        title: 'Decompile the Creative',
        detail: 'Get a structured read on what the work is doing, where attention goes, and what may weaken the message.',
    },
    {
        n: '3',
        title: 'Present with Clarity',
        detail: 'Use the dossier to sharpen decks, align teams, and support client conversations.',
    },
];

export default function HowItWorks() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] pt-24 pb-28 text-[#F6F1E7] lg:pt-32 lg:pb-36" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[900px]"
                >
                    <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.36em] text-[#C1A674]">Core Value</p>
                    <h2 className="max-w-[14ch] text-[10vw] font-black uppercase leading-[0.88] tracking-[-0.04em] text-[#F6F1E7] lg:text-[64px]">
                        Make the work easier to defend.
                    </h2>
                    <p className="mt-8 max-w-[780px] text-[18px] leading-[1.78] text-[#F6F1E7]/74">
                        Visual Decompiler breaks down hierarchy, attention flow, tone, friction, and strategic intent — in language teams and clients can actually use.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-14 rounded-[26px] border border-white/10 bg-white/[0.02] px-7 py-8 md:px-10"
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#C1A674]">Why it matters</p>
                    <h3 className="mt-4 text-[30px] font-black uppercase leading-[1.02] tracking-[-0.025em] text-[#F6F1E7] md:text-[38px]">
                        Creative reviews break down when everything stays subjective.
                    </h3>
                    <p className="mt-5 max-w-[860px] text-[17px] leading-[1.75] text-[#F6F1E7]/74">
                        Visual Decompiler gives teams a shared language for discussing the work — so stronger ideas are easier to explain, align around, and approve.
                    </p>
                </motion.div>

                <div className="mt-16 h-px w-full bg-white/10 lg:mt-20" />

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-16 lg:mt-20"
                >
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.36em] text-[#C1A674]">Workflow</p>
                    <h3 className="text-[34px] font-black uppercase tracking-[-0.03em] text-[#F6F1E7] md:text-[44px]">
                        From upload to approval-ready reasoning.
                    </h3>

                    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {STEPS.map((step, idx) => (
                            <motion.article
                                key={step.n}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="rounded-[20px] border border-white/10 bg-white/[0.02] p-6"
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C1A674]">Step {step.n}</p>
                                <h4 className="mt-4 text-[22px] font-black leading-[1.08] tracking-[-0.015em] text-[#F6F1E7]">{step.title}</h4>
                                <p className="mt-4 text-[15px] leading-[1.7] text-[#F6F1E7]/74">{step.detail}</p>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
