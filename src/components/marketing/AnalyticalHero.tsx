'use client';

import { useEffect, useState } from 'react';
import AdRolodexScanner from '@/components/marketing/AdRolodexScanner';
import { ArrowUpRight } from 'lucide-react';
import { HOMEPAGE_PRIMARY_CTA, HOMEPAGE_SECONDARY_CTA, HOMEPAGE_CTA_ICON } from '@/components/marketing/ctaStyles';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

type Persona = {
    role: string;
    subtitle: string;
    color: string;
    weightClass?: string;
};

const HERO_PERSONA_ROTATION_VERSION = 'v2-no-copywriters';

const PERSONAS: Persona[] = [
    {
        role: 'Ad Analysis',
        subtitle: 'Drop any ad. See the invisible persuasion mechanics, strategic signals, and reconstruction blueprint — in under 60 seconds.',
        color: '#D4A574',
        weightClass: 'font-semibold',
    },
    {
        role: 'Art Directors',
        subtitle: 'Decode visual hierarchy, chromatic psychology, and composition mechanics — translate competitor creative into actionable design principles.',
        color: '#F4A700',
        weightClass: 'font-semibold',
    },
    {
        role: 'Pitch Teams',
        subtitle: 'Walk into pitches with forensic proof of what works in the category — competitive intelligence that positions you as the strategic authority.',
        color: '#D4A574',
        weightClass: 'font-semibold',
    },
    {
        role: 'Creative Directors',
        subtitle: 'Stop guessing what resonates. Get structured creative briefs, persuasion maps, and rebuild blueprints for every asset you analyze.',
        color: '#F4A700',
        weightClass: 'font-semibold',
    },
    {
        role: 'Strategy Directors',
        subtitle: 'Surface the invisible mechanics competitors deploy — signal stacks, trigger distribution, and strategic posture at category scale.',
        color: '#888888',
        weightClass: 'font-semibold',
    },
    {
        role: 'Brand Managers',
        subtitle: 'Benchmark your creative against category patterns. Identify what drives engagement and where your assets lose persuasion power.',
        color: '#D4A574',
        weightClass: 'font-semibold',
    },
];

export default function AnalyticalHero() {
    const [personaIndex, setPersonaIndex] = useState(0);
    const [personaVisible, setPersonaVisible] = useState(true);

    useEffect(() => {
        let holdTimeout = 0;
        let fadeTimeout = 0;
        let cancelled = false;

        const scheduleCycle = () => {
            holdTimeout = window.setTimeout(() => {
                if (cancelled) return;
                setPersonaVisible(false);

                fadeTimeout = window.setTimeout(() => {
                    if (cancelled) return;
                    setPersonaIndex((current) => (current + 1) % PERSONAS.length);
                    setPersonaVisible(true);
                    scheduleCycle();
                }, 600);
            }, 8000);
        };

        scheduleCycle();

        return () => {
            cancelled = true;
            window.clearTimeout(holdTimeout);
            window.clearTimeout(fadeTimeout);
        };
    }, []);

    const persona = PERSONAS[personaIndex];

    return (
        <section
            className="relative isolate min-h-[100svh] overflow-hidden bg-[#141414] text-[#FBFBF6]"
            data-hero-rotation={HERO_PERSONA_ROTATION_VERSION}
        >
            {/* Ambient forensic field */}
            <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#D4A574_1px,transparent_1px),linear-gradient(90deg,#D4A574_1px,transparent_1px)] [background-size:56px_56px]" />
                <div className="hero-drift-grid absolute inset-[-8%] opacity-[0.045] [background-image:linear-gradient(rgba(212,165,116,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(212,165,116,0.4)_1px,transparent_1px)] [background-size:112px_112px]" />
                <div className="hero-scanlines absolute inset-0 opacity-[0.1]" />
                <div
                    className="hero-bloom absolute left-[-12%] top-[8%] h-[420px] w-[420px] rounded-full blur-3xl"
                    style={{ background: `radial-gradient(circle, ${persona.color}22 0%, transparent 68%)` }}
                />
                <div
                    className="hero-bloom-delayed absolute right-[-6%] top-[18%] h-[360px] w-[360px] rounded-full blur-3xl"
                    style={{ background: `radial-gradient(circle, ${persona.color}18 0%, transparent 70%)` }}
                />
                <div className="hero-gold-bloom absolute bottom-[-12%] left-[20%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(212,165,116,0.12)_0%,transparent_72%)] blur-3xl" />
                <div className="hero-sweep absolute inset-y-0 left-[-20%] w-[22%] bg-[linear-gradient(90deg,transparent_0%,rgba(212,165,116,0.08)_45%,rgba(212,165,116,0.18)_50%,rgba(212,165,116,0.08)_55%,transparent_100%)] blur-xl" />
                <div className="hero-ring absolute left-[8%] top-[18%] h-[420px] w-[420px] rounded-full border border-[#D4A574]/[0.08]" />
                <div className="hero-ring-delayed absolute right-[10%] bottom-[12%] h-[280px] w-[280px] rounded-full border border-[#D4A574]/[0.07]" />
            </div>

            {/* Radial vignette */}
            <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_60%_at_30%_50%,rgba(212,165,116,0.07)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_90%_75%_at_50%_50%,transparent_42%,rgba(0,0,0,0.22)_100%)]" />

            <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-24 md:py-32">
                <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
                    <div className="flex flex-col text-center lg:text-left">
                        <div className="mb-8 flex flex-col gap-4 items-center lg:items-start">
                            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#D4A574]/80">Forensic Intelligence System</span>
                            <div className="h-px w-12 bg-[#D4A574]/30" />
                        </div>

                        <h1 className="text-[44px] font-bold leading-[1.0] tracking-tight text-[#FBFBF6] sm:text-[56px] md:text-[68px] lg:text-[80px]">
                            Forensic Intelligence
                            <br />
                            <span className="inline-flex items-baseline gap-3 mt-2">
                                <span className="font-serif text-[#D4A574]/82 italic tracking-[-0.03em]">for</span>
                                <span
                                    className={`font-serif tracking-[-0.02em] ${persona.weightClass || 'font-medium'}`}
                                    style={{
                                        color: persona.color,
                                        opacity: personaVisible ? 1 : 0,
                                        transition: 'opacity 0.6s ease-in-out, color 0.6s ease-in-out',
                                    }}
                                >
                                    {persona.role}
                                </span>
                            </span>
                        </h1>

                        <p
                            className="mt-8 max-w-[32rem] text-[17px] leading-[1.65] text-[#B5B0A7] font-medium tracking-tight md:text-[19px] mx-auto lg:mx-0"
                            style={{
                                opacity: personaVisible ? 1 : 0,
                                transition: 'opacity 0.6s ease-in-out',
                            }}
                        >
                            {persona.subtitle}
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                            <a href="/ingest" className={`${HOMEPAGE_PRIMARY_CTA} w-full sm:w-auto`}>
                                <span>Start Decompiling Free</span>
                                <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                            </a>
                            <a href={SAMPLE_DOSSIER_HREF} className={`${HOMEPAGE_SECONDARY_CTA} w-full sm:w-auto !bg-transparent !border-[#D4A574]/30 !text-[#D4A574]`}>
                                <span>Open Sample Dossier</span>
                                <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                            </a>
                        </div>

                        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]/40">
                            No card required · 5 free analyses · White-label ready
                        </p>
                    </div>

                    <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000">
                        <div className="relative w-full max-w-[425px] lg:max-w-[690px] transform lg:[transform:perspective(1200px)_rotateY(-5deg)] hover:[transform:perspective(1200px)_rotateY(0deg)] transition-transform duration-700">
                            <AdRolodexScanner />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hero-drift-grid {
                    animation: heroDriftGrid 28s linear infinite;
                }

                .hero-scanlines {
                    background-image: linear-gradient(
                        to bottom,
                        transparent 0%,
                        rgba(212, 165, 116, 0.08) 48%,
                        transparent 100%
                    );
                    background-size: 100% 18px;
                    animation: heroScanlines 18s linear infinite;
                }

                .hero-bloom {
                    animation: heroBloomFloat 16s ease-in-out infinite;
                }

                .hero-bloom-delayed {
                    animation: heroBloomFloat 20s ease-in-out infinite reverse;
                }

                .hero-gold-bloom {
                    animation: heroBloomPulse 14s ease-in-out infinite;
                }

                .hero-sweep {
                    animation: heroSweep 13s ease-in-out infinite;
                }

                .hero-ring {
                    animation: heroRingPulse 12s ease-in-out infinite;
                }

                .hero-ring-delayed {
                    animation: heroRingPulse 16s ease-in-out infinite reverse;
                }

                @keyframes heroDriftGrid {
                    0% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(-18px, 12px, 0); }
                    100% { transform: translate3d(0, 0, 0); }
                }

                @keyframes heroScanlines {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(18px); }
                }

                @keyframes heroBloomFloat {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.8; }
                    50% { transform: translate3d(20px, -18px, 0) scale(1.08); opacity: 1; }
                }

                @keyframes heroBloomPulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.14); opacity: 1; }
                }

                @keyframes heroSweep {
                    0% { transform: translateX(0); opacity: 0; }
                    12% { opacity: 0.45; }
                    50% { transform: translateX(420%); opacity: 0.2; }
                    88% { opacity: 0; }
                    100% { transform: translateX(420%); opacity: 0; }
                }

                @keyframes heroRingPulse {
                    0%, 100% { transform: scale(1); opacity: 0.45; }
                    50% { transform: scale(1.04); opacity: 0.85; }
                }
            `}</style>
        </section>
    );
}
