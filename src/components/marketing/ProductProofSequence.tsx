'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HOMEPAGE_CTA_ICON } from '@/components/marketing/ctaStyles';
import HeroAppPreview from '@/components/marketing/HeroAppPreview';

function AccentBar() {
    return (
        <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-8 rounded-full bg-[#F4A700]" />
            <span className="h-1.5 w-5 rounded-full bg-[#C8230A]" />
            <span className="h-1.5 w-4 rounded-full bg-[#D4A574]" />
            <span className="h-1.5 w-3 rounded-full bg-[#F5EDE3]" />
            <span className="h-1.5 w-5 rounded-full bg-[#D7B07A]" />
        </div>
    );
}

const DIFFERENTIAL_METRICS = [
    { label: 'Strategic Delta', value: '+27% novelty advantage' },
    { label: 'Persuasion Lift', value: '+18% identity pull' },
    { label: 'Fatigue Gap', value: '-22% repetition risk' },
] as const;

const REVEAL = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const SECTION_BAND = 'px-6 py-18 md:py-24';
const LIGHT_SURFACE = 'bg-transparent';
const TAN_CTA =
    'group inline-flex items-center justify-center gap-2 rounded-full border border-[#D4A574] bg-[#D4A574] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#141414] shadow-[0_16px_34px_rgba(20,20,20,0.2)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#D7B07A] hover:border-[#D7B07A] hover:shadow-[0_20px_38px_rgba(20,20,20,0.24)] sm:min-w-[220px] sm:w-auto sm:px-8 sm:py-4 sm:text-[12px] sm:tracking-[0.2em]';
const OUTLINE_TAN_CTA =
    'group inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(212,165,116,0.28)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B8925B] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#D7B07A] hover:bg-[#1B1814] hover:text-[#D7B07A] sm:min-w-[220px] sm:w-auto sm:px-6 sm:text-[11px] sm:tracking-[0.2em]';

function DifferentialDiagnosisSection() {
    return (
        <section className={`relative overflow-hidden scroll-mt-20 ${LIGHT_SURFACE} ${SECTION_BAND} md:scroll-mt-24 lg:scroll-mt-[104px]`}>
            <motion.div {...REVEAL} className="relative z-10 mx-auto max-w-7xl rounded-[2.5rem] border border-[#D9CCB8] bg-[rgba(255,251,244,0.74)] px-6 py-8 shadow-[0_24px_58px_rgba(20,20,20,0.05)] backdrop-blur-[2px] md:px-8 md:py-10">
                <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-12 bg-gradient-to-r from-[#D4A574] to-transparent" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">Intelligence Pulse</p>
                </div>
                <AccentBar />

                <h3 className="max-w-4xl text-[34px] font-bold leading-[1.1] tracking-tight text-[#141414] md:text-5xl">
                    Differential <span className="text-[#F4A700]">Diagnostic</span>
                </h3>
                <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-[#474238] md:text-[18px] font-medium tracking-tight">
                    Choose two assets and surface the strategic delta, persuasion lift, and fatigue gap before you commit creative direction.
                </p>

                <div className="mt-8 mx-auto max-w-5xl grid gap-6 lg:grid-cols-2">
                    {/* Asset A */}
                    <div className="group relative overflow-hidden rounded-[3rem] border border-[#D3C4AD] bg-[#FBFBF6] p-3 shadow-[0_20px_42px_rgba(20,20,20,0.07)] sm:p-4">
                        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-[#EEE6D8]">
                            <div className="absolute left-4 top-4 z-20 rounded-full border border-[#5A4A34] bg-[#171510]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B386]">
                                CONTROL (ASSET A)
                            </div>
                            <Image
                                src="/images/examples/Chanel_No5.webp"
                                alt="Control asset for differential diagnostic"
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.02] opacity-90"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0E0D0B] to-transparent" />
                            <div className="absolute bottom-5 left-6 z-20 text-sm text-[#E7D7BF] font-medium italic">Heritage-led prestige framing</div>
                        </div>
                    </div>

                    {/* Asset B */}
                    <div className="group relative overflow-hidden rounded-[3rem] border border-[#D3C4AD] bg-[#FBFBF6] p-3 shadow-[0_20px_42px_rgba(20,20,20,0.07)] sm:p-4">
                        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-[#EEE6D8] aspect-[4/5]">
                            <div className="absolute left-4 top-4 z-20 rounded-full border border-[#5A4A34] bg-[#171510]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B386]">
                                PROPOSED (ASSET B)
                            </div>
                            <Image
                                src="/images/examples/Miss_DIOR.jpg"
                                alt="Proposed route for differential diagnostic"
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.02] opacity-90"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0E0D0B] to-transparent" />
                            <div className="absolute bottom-5 left-6 z-20 text-sm text-[#E7D7BF] font-medium italic">Modern identity-led persuasion</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-center">
                    <span className="rounded-full border border-[#D3C4AD] bg-[#FBFBF6] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574] shadow-[0_12px_28px_rgba(20,20,20,0.05)]">
                        Differential Read
                    </span>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {DIFFERENTIAL_METRICS.map((metric, i) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: i * 0.08, duration: 0.45 }}
                            className="rounded-xl border border-[#D3C4AD] bg-[#FBFBF6] px-4 py-4 shadow-[0_14px_28px_rgba(20,20,20,0.05)]"
                        >
                            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                                i === 0 ? 'text-[#F4A700]' : i === 1 ? 'text-[#D4A574]' : 'text-[#C8230A]'
                            }`}>{metric.label}</p>
                            <p className="mt-2 text-base font-semibold text-[#141414]">{metric.value}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6">
                    <a
                        href="/compare"
                        className={TAN_CTA}
                    >
                        <span>Run Differential Diagnostic</span>
                        <ArrowUpRight aria-hidden="true" className={HOMEPAGE_CTA_ICON} />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

function TrustBoundaryPanel() {
    return (
        <section className={`relative overflow-hidden scroll-mt-20 ${LIGHT_SURFACE} ${SECTION_BAND} md:scroll-mt-24 lg:scroll-mt-[104px]`}>
            <motion.div {...REVEAL} className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#D9CCB8] bg-[rgba(255,251,244,0.74)] px-6 py-8 shadow-[0_24px_58px_rgba(20,20,20,0.05)] backdrop-blur-[2px] md:px-8 md:py-10">
                <div className="max-w-4xl">
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#9B8662]">
                        What VD is / What VD is not
                    </p>
                    <AccentBar />
                    <h2 className="mt-5 max-w-4xl text-[34px] font-bold leading-[1] tracking-tight text-[#141414] md:text-5xl">
                        A forensic intelligence system for <span className="text-[#D4A574]">creative quality</span> decisions.
                    </h2>
                    <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-[#474238] md:text-[18px] font-medium tracking-tight">
                        Visual Decompiler exists to judge, diagnose, and direct quality. It explains why an ad is working, where it is fragile, and what decision the team should make next.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-[2rem] border border-[#D3C4AD] bg-[#FBFBF6] p-6 shadow-[0_16px_34px_rgba(20,20,20,0.04)]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">VD is</p>
                        <ul className="mt-5 space-y-4">
                            {[
                                'A forensic intelligence system for ad quality decisions',
                                'A diagnostic layer for creative mechanism and risk',
                                'A strategic direction tool for teams and agencies',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#474238]">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A574]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-[2rem] border border-[#D3C4AD] bg-[#FBFBF6] p-6 shadow-[0_16px_34px_rgba(20,20,20,0.04)]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">VD is not</p>
                        <ul className="mt-5 space-y-4">
                            {[
                                'An ad generator',
                                'A design editor',
                                'A prompt factory',
                                'An ad-spy tool',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#474238]">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8230A]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="mt-8 max-w-4xl text-sm leading-relaxed text-[#5B5449]">
                    Blueprint reconstruction paths are provided for audit transparency and reproducibility — not generation inside VD.
                </p>
            </motion.div>
        </section>
    );
}

function SingleAssetDeconstruction() {
    return (
        <section className="relative overflow-hidden scroll-mt-20 bg-transparent px-6 py-18 md:scroll-mt-24 md:py-24 lg:scroll-mt-[104px]">
            <motion.div {...REVEAL} className="relative z-10 mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.8fr] lg:items-start lg:gap-12">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-12 bg-gradient-to-r from-[#D4A574] to-transparent" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">Dossier Construction</p>
                        </div>
                        <AccentBar />
                        <h2 className="max-w-2xl text-[32px] font-bold leading-[1.06] tracking-tight text-[#141414] md:text-[42px]">
                            Deconstruct the hidden <span className="text-[#D7B07A]">persuasion</span> architecture.
                        </h2>
                        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#474238] md:text-[17px] font-medium tracking-tight">
                            Upload any competitor ad and get a client-ready strategic dossier — psychology, signals, and a reconstruction blueprint — in under 60 seconds.
                        </p>

                        <div className="mt-8 grid gap-5 sm:grid-cols-2">
                            <div className="rounded-r-xl border-l-[3px] border-[#D4A574] bg-[#F8F3EA] py-3 pl-6 shadow-[0_10px_22px_rgba(20,20,20,0.03)]">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574] mb-2">Automated Extraction</p>
                                <p className="text-[14px] leading-relaxed text-[#474238]">Hidden signals and subtext surfaced instantly.</p>
                            </div>
                            <div className="rounded-r-xl border-l-[3px] border-[#D4A574] bg-[#F8F3EA] py-3 pl-6 shadow-[0_10px_22px_rgba(20,20,20,0.03)]">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574] mb-2">Strategic Interpretation</p>
                                <p className="text-[14px] leading-relaxed text-[#474238]">Raw data turned into clinical, action-ready moves.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative lg:pt-1">
                        <div className="mx-auto max-w-[520px] lg:mr-0">
                            <HeroAppPreview />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default function ProductProofSequence() {
    return (
        <div id="funnel" className="bg-transparent">
            <SingleAssetDeconstruction />
            <DifferentialDiagnosisSection />
            <TrustBoundaryPanel />
        </div>
    );
}
