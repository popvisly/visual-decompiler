'use client';

import React from 'react';
import { motion } from 'framer-motion';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';

const USE_CASES = [
    {
        title: 'Pre-Pitch',
        body: 'Break down references before the room does.',
    },
    {
        title: 'Creative Review',
        body: 'Remove opinion. Align on structure.',
    },
    {
        title: 'Client Presentation',
        body: 'Defend decisions with clarity, not instinct.',
    },
];

const STEPS = [
    {
        title: 'Step 1',
        body: 'Upload your ad',
    },
    {
        title: 'Step 2',
        body: 'Visual Decompiler analyzes structure, hierarchy, and intent',
    },
    {
        title: 'Step 3',
        body: 'Receive a structured dossier designed for decision-making',
    },
];

const OUTPUTS = [
    {
        title: 'Primary Scores',
        body: 'Clarity, Attention, Cohesion, Intent, Distinction',
    },
    {
        title: 'Attention Path',
        body: 'A mapped sequence of how the eye moves',
    },
    {
        title: 'Structural Signals',
        body: 'Hierarchy, balance, contrast, density, focus integrity',
    },
    {
        title: 'Strategic Read',
        body: 'What the work is doing, why it works, and where it breaks',
    },
    {
        title: 'Confidence Index',
        body: 'Final structured verdict',
    },
];

const ADVANCED_USAGE = [
    {
        title: 'Route Comparison',
        body: 'Compare multiple creative routes to identify strategic differences.',
    },
    {
        title: 'Performance Isolation',
        body: 'Use the system to isolate why one execution outperforms another.',
    },
    {
        title: 'Cross-Campaign Consistency',
        body: 'Apply findings across campaigns to keep decision logic aligned over time.',
    },
];

export default function UserGuidePage() {
    return (
        <main className="min-h-screen bg-[#050505] text-[#F6F1E7]">
            <UnifiedSovereignHeader forceDark />

            <section className="px-6 pt-30 pb-28 lg:pt-36 lg:pb-36">
                <div className="mx-auto max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-[900px]"
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">User Guide</p>
                        <h1 className="mt-5 max-w-[14ch] text-[clamp(52px,6.4vw,102px)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#F6F1E7]">
                            Using Visual Decompiler
                        </h1>
                        <p className="mt-10 max-w-[760px] text-[16px] leading-[1.7] text-[#F6F1E7]/78">
                            How to turn creative instinct into decisions that move forward.
                        </p>
                    </motion.div>

                    <div className="mt-16 border-t border-white/10 pt-14 lg:mt-20 lg:pt-16">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">Where this is used</p>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                {USE_CASES.map((item, idx) => (
                                    <motion.article
                                        key={item.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                        className="rounded-[20px] border border-white/10 bg-white/[0.02] p-6"
                                    >
                                        <h2 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#F6F1E7]">{item.title}</h2>
                                        <p className="mt-4 text-[16px] leading-[1.7] text-[#F6F1E7]/75">{item.body}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-16"
                        >
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">How it works</p>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                {STEPS.map((step, idx) => (
                                    <motion.article
                                        key={step.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                        className="rounded-[20px] border border-white/10 bg-white/[0.02] p-6"
                                    >
                                        <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-[#C1A674]">{step.title}</p>
                                        <p className="mt-4 text-[16px] leading-[1.7] text-[#F6F1E7]/78">{step.body}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-16"
                        >
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">What you get</p>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {OUTPUTS.map((output, idx) => (
                                    <motion.article
                                        key={output.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                        className="rounded-[20px] border border-white/10 bg-[#101010] p-6"
                                    >
                                        <h3 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#F6F1E7]">
                                            {output.title}
                                        </h3>
                                        <p className="mt-4 text-[16px] leading-[1.7] text-[#F6F1E7]/75">{output.body}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-16 rounded-[24px] border border-white/10 bg-white/[0.02] p-8"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">How to use it properly</p>
                            <ul className="mt-6 space-y-4 text-[16px] leading-[1.7] text-[#F6F1E7]/78">
                                <li>– align internal teams faster</li>
                                <li>– remove subjective feedback</li>
                                <li>– present decisions clearly to clients</li>
                                <li>– reduce revision cycles</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-10 rounded-[24px] border border-[#C1A674]/25 bg-[#0F0F0F] p-8"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">What not to do</p>
                            <ul className="mt-6 space-y-4 text-[16px] leading-[1.7] text-[#F6F1E7]/78">
                                <li>– an idea generator</li>
                                <li>– a creative shortcut</li>
                                <li>– a replacement for judgment</li>
                            </ul>
                            <p className="mt-6 text-[16px] leading-[1.7] text-[#F6F1E7]/75">
                                It is a system for explaining and defending work — not replacing it.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-10"
                        >
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">Advanced usage</p>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                {ADVANCED_USAGE.map((item, idx) => (
                                    <motion.article
                                        key={item.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                        className="rounded-[20px] border border-white/10 bg-white/[0.02] p-6"
                                    >
                                        <h3 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#F6F1E7]">
                                            {item.title}
                                        </h3>
                                        <p className="mt-4 text-[16px] leading-[1.7] text-[#F6F1E7]/75">{item.body}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-12 max-w-[900px] text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#F6F1E7]"
                        >
                            Visual Decompiler is most effective when used in real decision environments — not in isolation.
                        </motion.p>
                    </div>
                </div>
            </section>

            <FooterStartNow />
        </main>
    );
}
