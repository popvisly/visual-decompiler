'use client';

import React from 'react';
import { motion } from 'framer-motion';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';

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
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader />

            <MarketingPageHeader
                kicker="User Guide"
                title="Using Visual Decompiler"
                description="How to turn creative instinct into decisions that move forward."
            />

            <section className="pb-28 lg:pb-36">
                <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                    <div className="mt-16 border-t border-black/5 pt-14 lg:mt-20 lg:pt-16">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">Where this is used</p>
                            <p className="mb-7 max-w-[760px] text-[16px] leading-[1.7] text-[#6B6B6B]">
                                Three real decision environments where teams use Visual Decompiler to move work forward.
                            </p>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                {USE_CASES.map((item, idx) => (
                                    <motion.article
                                        key={item.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                        className="rounded-[20px] border border-black/5 bg-white p-6 shadow-sm"
                                    >
                                        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B6A3D]/80">Use case {idx + 1}</p>
                                        <h2 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#141414]">{item.title}</h2>
                                        <p className="mt-4 text-[16px] leading-[1.7] text-[#6B6B6B]">{item.body}</p>
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
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">How it works</p>
                            <p className="mb-7 max-w-[760px] text-[16px] leading-[1.7] text-[#6B6B6B]">
                                A simple operating sequence you can run in minutes before review or presentation.
                            </p>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                {STEPS.map((step, idx) => (
                                    <motion.article
                                        key={step.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                        className="rounded-[20px] border border-black/5 bg-white p-6 shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-black/10 bg-[#FBFBF6] px-2 text-[13px] font-bold text-[#8B6A3D]">
                                                {idx + 1}
                                            </span>
                                            <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-[#8B6A3D]/80">{step.title}</p>
                                        </div>
                                        <p className="mt-5 text-[16px] leading-[1.7] text-[#6B6B6B]">{step.body}</p>
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
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">What you get</p>
                            <p className="mb-7 max-w-[760px] text-[16px] leading-[1.7] text-[#6B6B6B]">
                                Fixed outputs designed to make reasoning readable and decisions easier to approve.
                            </p>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {OUTPUTS.map((output, idx) => (
                                    <motion.article
                                        key={output.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                        className="rounded-[20px] border border-black/5 bg-white p-6 shadow-sm"
                                    >
                                        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B6A3D]/80">System Output</p>
                                        <h3 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#141414]">
                                            {output.title}
                                        </h3>
                                        <p className="mt-4 text-[16px] leading-[1.7] text-[#6B6B6B]">{output.body}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-16 rounded-[24px] border border-black/5 bg-white p-8 shadow-sm"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">How to use it properly</p>
                            <ul className="mt-6 space-y-4 text-[16px] leading-[1.7] text-[#6B6B6B]">
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
                            className="mt-10 rounded-[24px] border border-[#8B6A3D]/15 bg-[#141414] p-8 text-[#FBF7EF] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">What not to do</p>
                            <ul className="mt-6 space-y-4 text-[16px] leading-[1.7] text-white/80">
                                <li>– an idea generator</li>
                                <li>– a creative shortcut</li>
                                <li>– a replacement for judgment</li>
                            </ul>
                            <p className="mt-6 text-[16px] leading-[1.7] text-white/75">
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
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">Advanced usage</p>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                {ADVANCED_USAGE.map((item, idx) => (
                                    <motion.article
                                        key={item.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                        className="rounded-[20px] border border-black/5 bg-white p-6 shadow-sm"
                                    >
                                        <h3 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#141414]">
                                            {item.title}
                                        </h3>
                                        <p className="mt-4 text-[16px] leading-[1.7] text-[#6B6B6B]">{item.body}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-12 max-w-[900px] text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#141414]"
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
