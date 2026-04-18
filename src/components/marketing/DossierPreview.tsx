'use client';

import { motion } from 'framer-motion';
import CanonicalDossierArtifact from '@/components/marketing/CanonicalDossierArtifact';

function DossierFlowMapCard() {
    return (
        <aside className="w-full rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(14,14,14,0.96)_34%)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#C1A674]">Attention Flow</p>

            <svg viewBox="0 0 320 230" className="mt-6 h-[220px] w-full" aria-hidden="true">
                <defs>
                    <linearGradient id="vdFlowStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F28C28" />
                        <stop offset="50%" stopColor="#F7B43A" />
                        <stop offset="100%" stopColor="#FFD600" />
                    </linearGradient>
                </defs>

                <path
                    d="M 54 168 C 94 86, 140 70, 166 72 C 194 75, 228 104, 266 58"
                    fill="none"
                    stroke="url(#vdFlowStroke)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />

                <circle cx="54" cy="168" r="6" fill="#F28C28" />
                <circle cx="166" cy="72" r="6" fill="#F7B43A" />
                <circle cx="266" cy="58" r="6" fill="#FFD600" />

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

            <div className="mt-2 space-y-3 border-t border-white/10 pt-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#C1A674]">Decision Sequence</p>
                <p className="text-[15px] leading-[1.65] text-[#F6F1E7]/74">
                    Entry is captured by contrast, recognition is secured through brand cues, and engagement holds when meaning stays clear.
                </p>
            </div>
        </aside>
    );
}

export default function DossierPreview() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] py-24 text-[#F6F1E7] lg:py-32" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)] lg:gap-12"
                >
                    <div className="min-w-0">
                        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Dossier Layer</p>
                        <CanonicalDossierArtifact mode="attention-zoom" />
                    </div>
                    <div className="lg:pt-9">
                        <DossierFlowMapCard />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
