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

const PERSONAS: Persona[] = [
    {
        role: 'Advertising',
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
        role: 'New Business',
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
    {
        role: 'Copywriters',
        subtitle: 'Extract narrative frameworks, hook mechanics, and objection dismantling patterns from any ad — ready to adapt into your next brief.',
        color: '#C8230A',
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
        <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#141414] text-[#FBFBF6]">
            {/* Subtle gold grid */}
            <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.045] [background-image:linear-gradient(#D4A574_1px,transparent_1px),linear-gradient(90deg,#D4A574_1px,transparent_1px)] [background-size:56px_56px]" />

            {/* Radial vignette */}
            <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_60%_at_30%_50%,rgba(212,165,116,0.06)_0%,transparent_70%)]" />

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
                                <span className="text-[#FBFBF6]/50">for</span>
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
        </section>
    );
}
