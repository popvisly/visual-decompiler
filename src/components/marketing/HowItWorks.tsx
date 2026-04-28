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

function DecisionRadarCard() {
    return (
        <aside className="w-full rounded-[1.8rem] border border-black/10 bg-[#141414] p-6 text-[#FBF7EF] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4A574]">Decision Radar</p>

            <svg viewBox="0 0 320 250" className="mt-6 h-[220px] w-full" aria-hidden="true">
                <defs>
                    <linearGradient id="vdDecisionStroke" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F28C28" />
                        <stop offset="52%" stopColor="#F7B43A" />
                        <stop offset="100%" stopColor="#FFD600" />
                    </linearGradient>
                    <radialGradient id="vdDecisionFill" cx="50%" cy="45%" r="65%">
                        <stop offset="0%" stopColor="rgba(247,180,58,0.16)" />
                        <stop offset="100%" stopColor="rgba(247,180,58,0.02)" />
                    </radialGradient>
                </defs>

                <circle cx="160" cy="122" r="88" stroke="rgba(251,247,239,0.14)" fill="none" />
                <circle cx="160" cy="122" r="60" stroke="rgba(251,247,239,0.11)" fill="none" />
                <circle cx="160" cy="122" r="32" stroke="rgba(251,247,239,0.09)" fill="none" />

                <polygon points="160,34 84,167 236,167" fill="url(#vdDecisionFill)" stroke="url(#vdDecisionStroke)" strokeWidth="1.4" />

                <line x1="160" y1="122" x2="160" y2="34" stroke="url(#vdDecisionStroke)" strokeWidth="1.8" />

                <circle cx="160" cy="34" r="6.5" fill="#FFD600" />
                <circle cx="84" cy="167" r="4.5" fill="rgba(251,247,239,0.75)" />
                <circle cx="236" cy="167" r="4.5" fill="rgba(251,247,239,0.75)" />

                <text x="160" y="14" textAnchor="middle" style={{ fill: 'rgba(251,247,239,0.86)', fontSize: '10px', letterSpacing: '0.2em' }}>
                    UNDERSTAND
                </text>
                <text x="74" y="186" textAnchor="middle" style={{ fill: 'rgba(251,247,239,0.74)', fontSize: '10px', letterSpacing: '0.2em' }}>
                    APPROVE
                </text>
                <text x="246" y="186" textAnchor="middle" style={{ fill: 'rgba(251,247,239,0.74)', fontSize: '10px', letterSpacing: '0.2em' }}>
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
    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] pt-24 pb-28 text-[#141414] lg:pt-32 lg:pb-36">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)] lg:gap-12"
                >
                    <div className="max-w-[900px]">
                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.36em] text-[#8B6A3D]/80">Core Value</p>
                        <h2 className="max-w-[14ch] text-[10vw] font-semibold uppercase leading-[0.88] tracking-tight text-[#141414] lg:text-[64px]">
                            Make the work easier to defend.
                        </h2>
                        <p className="mt-8 max-w-[780px] text-[18px] leading-[1.78] text-[#6B6B6B]">
                            Visual Decompiler breaks down hierarchy, attention flow, tone, friction, and strategic intent — in language teams and clients can actually use.
                        </p>
                    </div>
                    <div className="lg:pt-9">
                        <DecisionRadarCard />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-14 rounded-[26px] border border-black/5 bg-white px-7 py-8 shadow-sm md:px-10"
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
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 rounded-[24px] border border-black/5 bg-white px-6 py-8 shadow-sm lg:mt-24 lg:px-8 lg:py-10"
                >
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.36em] text-[#8B6A3D]/80">Workflow</p>
                    <h3 className="text-[34px] font-semibold uppercase tracking-tight text-[#141414] md:text-[44px]">
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
                                className="rounded-[20px] border border-black/5 bg-[#FBFBF6] p-6"
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
