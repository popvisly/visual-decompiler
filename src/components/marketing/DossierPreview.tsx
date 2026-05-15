'use client';

import { motion, useReducedMotion } from 'framer-motion';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';

function DossierFlowMapCard() {
    return (
        <aside className="w-full rounded-[24px] border border-[#8B6A3D]/15 bg-[#141414] p-6 text-[#FBF7EF] shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4A574]">Attention Flow</p>

            <svg viewBox="0 0 320 230" className="mt-6 h-[220px] w-full" aria-hidden="true">
                <defs>
                    <linearGradient id="vdFlowStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B6A3D" />
                        <stop offset="50%" stopColor="#D4A574" />
                        <stop offset="100%" stopColor="#E0B882" />
                    </linearGradient>
                </defs>

                <path
                    d="M 54 168 C 94 86, 140 70, 166 72 C 194 75, 228 104, 266 58"
                    fill="none"
                    stroke="url(#vdFlowStroke)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />

                <circle cx="54" cy="168" r="6" fill="#8B6A3D" />
                <circle cx="166" cy="72" r="6" fill="#D4A574" />
                <circle cx="266" cy="58" r="6" fill="#E0B882" />

                <line x1="54" y1="168" x2="54" y2="196" stroke="rgba(246,241,231,0.22)" />
                <line x1="166" y1="72" x2="166" y2="34" stroke="rgba(246,241,231,0.22)" />
                <line x1="266" y1="58" x2="266" y2="26" stroke="rgba(246,241,231,0.22)" />

                <text x="54" y="212" textAnchor="middle" style={{ fill: 'rgba(246,241,231,0.70)', fontSize: '10px', letterSpacing: '0.2em' }}>
                    ENTRY
                </text>
                <text x="166" y="22" textAnchor="middle" style={{ fill: 'rgba(246,241,231,0.78)', fontSize: '10px', letterSpacing: '0.2em' }}>
                    RECOGNITION
                </text>
                <text x="266" y="16" textAnchor="middle" style={{ fill: 'rgba(246,241,231,0.86)', fontSize: '10px', letterSpacing: '0.2em' }}>
                    ENGAGEMENT
                </text>
            </svg>

            <div className="mt-5 space-y-3 pt-2">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#D4A574]">Decision Sequence</p>
                <p className="text-[15px] leading-[1.65] text-[#F6F1E7]/74">
                    Entry is captured by contrast, recognition is secured through brand cues, and engagement holds when meaning stays clear.
                </p>
            </div>
        </aside>
    );
}

export default function DossierPreview() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-24 text-[#141414] lg:py-32" data-presence-tone="light">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <MarketingSectionHeading
                    kicker="Dossier Layer"
                    title="Evidence you can present."
                    description="Structured outputs built to travel into decks, client rooms, and team alignment sessions."
                    className="mb-12 max-w-[940px]"
                />

                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={prefersReducedMotion ? undefined : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)] lg:gap-12"
                >
                    <div className="min-w-0">
                        <div className="rounded-[24px] border border-black/5 bg-white p-10 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">New Analysis</p>
                            <h3 className="mt-6 text-[26px] font-black uppercase leading-[1.05] tracking-tight text-[#141414]">
                                Multi-frame reads for modern ads.
                            </h3>
                            <p className="mt-5 max-w-[68ch] text-[15px] font-medium leading-[1.75] text-[#515151]">
                                Upload a sequence and get a hook → proof → CTA diagnosis with prioritized fixes. Built for fast, real-world creative review workflows.
                            </p>

                            <div className="mt-10 grid gap-4 sm:grid-cols-2">
                                {[
                                    {
                                        title: 'Up to 5 frames',
                                        body: 'Drop a carousel or keyframes instead of guessing from one still.',
                                    },
                                    {
                                        title: 'Platform target',
                                        body: 'Shape critique to placement norms (safe zones, crop risk, caption reliance).',
                                    },
                                    {
                                        title: 'Sequence coherence',
                                        body: 'Detect when the hook promises one thing and the CTA pays off another.',
                                    },
                                    {
                                        title: 'Gaze overlay',
                                        body: 'A fast heuristic read of entry, vector, and endpoint attention routing.',
                                    },
                                    {
                                        title: 'Micro-clarifiers',
                                        body: 'Inline “what is this?” pills so non-specialists don’t get lost.',
                                    },
                                    {
                                        title: 'Vault-ready storage',
                                        body: 'Multi-frame assets render cleanly in the Vault and dossier context.',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-black/5 bg-[#FBFBF6] p-6 transition-all hover:bg-white hover:shadow-md"
                                    >
                                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#8B6A3D]">{item.title}</p>
                                        <p className="mt-3 text-[13px] font-medium leading-relaxed text-[#515151]">{item.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DossierFlowMapCard />
                </motion.div>
            </div>
        </section>
    );
}
