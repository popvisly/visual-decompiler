'use client';

import { motion, useReducedMotion } from 'framer-motion';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';

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

function DecisionRadarCard() {
    return (
        <aside className="w-full rounded-[24px] border border-black/10 bg-[#141414] p-6 text-[#FBF7EF] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4A574]">Decision Radar</p>

            <svg viewBox="0 0 320 250" className="mt-6 h-[220px] w-full" aria-hidden="true">
                <defs>
                    <linearGradient id="vdDecisionStroke" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B6A3D" />
                        <stop offset="52%" stopColor="#D4A574" />
                        <stop offset="100%" stopColor="#E0B882" />
                    </linearGradient>
                    <radialGradient id="vdDecisionFill" cx="50%" cy="45%" r="65%">
                        <stop offset="0%" stopColor="rgba(247,180,58,0.2)" />
                        <stop offset="100%" stopColor="rgba(247,180,58,0.02)" />
                    </radialGradient>
                </defs>

                {/* Concentric Grid */}
                <circle cx="160" cy="122" r="88" stroke="rgba(251,247,239,0.14)" fill="none" strokeDasharray="4 4" />
                <circle cx="160" cy="122" r="60" stroke="rgba(251,247,239,0.11)" fill="none" />
                <circle cx="160" cy="122" r="32" stroke="rgba(251,247,239,0.09)" fill="none" />

                {/* Animated Radar Polygon */}
                <motion.polygon 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    animate={{ 
                        scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    points="160,34 84,167 236,167" 
                    fill="url(#vdDecisionFill)" 
                    stroke="url(#vdDecisionStroke)" 
                    strokeWidth="1.6" 
                    style={{ transformOrigin: '160px 122px' }}
                />

                <motion.line 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    x1="160" y1="122" x2="160" y2="34" 
                    stroke="url(#vdDecisionStroke)" 
                    strokeWidth="1.8" 
                    strokeDasharray="4 2"
                />

                {/* Points */}
                <motion.circle 
                    animate={{ r: [6.5, 8, 6.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    cx="160" cy="34" r="6.5" fill="#D4A574" 
                />
                <circle cx="84" cy="167" r="4.5" fill="rgba(251,247,239,0.75)" />
                <circle cx="236" cy="167" r="4.5" fill="rgba(251,247,239,0.75)" />

                {/* Labels */}
                <text x="160" y="14" textAnchor="middle" style={{ fill: 'rgba(251,247,239,0.86)', fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.25em' }}>
                    UNDERSTAND
                </text>
                <text x="74" y="186" textAnchor="middle" style={{ fill: 'rgba(251,247,239,0.74)', fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.25em' }}>
                    APPROVE
                </text>
                <text x="246" y="186" textAnchor="middle" style={{ fill: 'rgba(251,247,239,0.74)', fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.25em' }}>
                    ALIGN
                </text>
            </svg>

            <div className="mt-2 space-y-3 border-t border-white/10 pt-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#D4A574]">Decision Sequence</p>
                <p className="text-[15px] leading-[1.65] text-[#FBF7EF]/78">
                    Structured reasoning helps teams understand faster, align tighter, and move approvals forward with less debate.
                </p>
            </div>
        </aside>
    );
}

export default function HowItWorks() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-24 text-[#141414] lg:py-32">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={prefersReducedMotion ? undefined : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)] lg:gap-12"
                >
                    <div className="max-w-[900px]">
                        <MarketingSectionHeading
                            kicker="Core Value"
                            title="Make the work easier to defend."
                            description="Visual Decompiler breaks down hierarchy, attention flow, tone, friction, and strategic intent — in language teams and clients can actually use."
                            className="max-w-[900px]"
                        />
                    </div>
                    <div className="lg:pt-9">
                        <DecisionRadarCard />
                    </div>
                </motion.div>

                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={prefersReducedMotion ? undefined : { duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-14 rounded-[24px] border border-black/5 bg-white px-7 py-8 shadow-sm md:px-10"
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8B6A3D]/80">Why it matters</p>
                    <h3 className="mt-4 text-[30px] font-semibold uppercase leading-[1.02] tracking-tight text-[#141414] md:text-[38px]">
                        Creative reviews break down when everything stays subjective.
                    </h3>
                    <p className="mt-5 max-w-[860px] text-[17px] leading-[1.75] text-[#6B6B6B]">
                        Visual Decompiler gives teams a shared language for discussing the work — so stronger ideas are easier to explain, align around, and approve.
                    </p>
                </motion.div>

                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={prefersReducedMotion ? undefined : { duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 rounded-[24px] border border-black/5 bg-white px-6 py-9 shadow-sm lg:mt-24 lg:px-8 lg:py-11"
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#8B6A3D]/80">Workflow</p>
                    <h3 className="mt-4 max-w-[22ch] text-[34px] font-semibold uppercase leading-[0.96] tracking-tight text-[#141414] md:text-[44px]">
                        From upload to approval-ready reasoning.
                    </h3>
                    <p className="mt-5 max-w-[66ch] text-[17px] leading-[1.75] text-[#6B6B6B]">
                        A simple operating sequence you can run in minutes before review or presentation — consistent, repeatable, and easy to defend.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {STEPS.map((step, idx) => (
                            <motion.article
                                key={step.n}
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={prefersReducedMotion ? undefined : { duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="rounded-[24px] border border-black/5 bg-[#FBFBF6] p-6"
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8B6A3D]/80">Step {step.n}</p>
                                <h4 className="mt-4 text-[22px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#141414]">{step.title}</h4>
                                <p className="mt-4 text-[15px] leading-[1.7] text-[#6B6B6B]">{step.detail}</p>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
