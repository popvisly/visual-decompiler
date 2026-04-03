'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
const HERO_AD_IMAGE = '/images/examples/Miss_DIOR.jpg';
const HERO_FINDINGS = [
    {
        label: 'Primary Mechanic',
        value: 'Status-coded restraint creates desire without verbal selling.',
    },
    {
        label: 'Risk Signal',
        value: 'Message clarity drops if elegance overwhelms product proof.',
    },
    {
        label: 'Decision',
        value: 'Preserve the authority layer. Tighten the value transfer.',
    },
] as const;

const HERO_EVIDENCE = [
    'Semiotic luxury posture is coherent across image, palette, and distance.',
    'Fragrance skepticism is neutralized through control, not explanation.',
    'Memory potential is driven by composition and archetypal restraint.',
] as const;

const PERSONAS: Persona[] = [
    {
        role: 'Creative Diagnosis',
        subtitle: 'Drop any ad. See the invisible persuasion mechanics, strategic signals, and reconstruction blueprint — in under 60 seconds. Decision system, not an ad-spy feed.',
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
            className="relative isolate min-h-[100svh] overflow-hidden bg-[#FBFBF6] text-[#141414]"
            data-hero-rotation={HERO_PERSONA_ROTATION_VERSION}
        >
            {/* Editorial forensic field */}
            <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#D4A574_1px,transparent_1px),linear-gradient(90deg,#D4A574_1px,transparent_1px)] [background-size:64px_64px]" />
                <div
                    className="absolute left-[-14%] top-[6%] h-[420px] w-[420px] rounded-full blur-3xl"
                    style={{ background: `radial-gradient(circle, ${persona.color}20 0%, transparent 70%)` }}
                />
                <div
                    className="absolute right-[-8%] top-[16%] h-[360px] w-[360px] rounded-full blur-3xl"
                    style={{ background: `radial-gradient(circle, ${persona.color}16 0%, transparent 72%)` }}
                />
                <div className="absolute bottom-[-10%] left-[18%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(212,165,116,0.11)_0%,transparent_72%)] blur-3xl" />
                <div className="absolute right-[10%] bottom-[14%] h-[300px] w-[300px] rounded-full border border-[#D4A574]/[0.12]" />
                <div className="absolute left-[6%] top-[16%] h-[420px] w-[420px] rounded-full border border-[#D4A574]/[0.1]" />
            </div>

            <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_60%_at_30%_50%,rgba(212,165,116,0.08)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_95%_85%_at_50%_50%,transparent_52%,rgba(20,20,20,0.03)_100%)]" />

            <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-24 md:py-32">
                <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
                    <div className="flex flex-col text-center lg:text-left">
                        <div className="mb-8 flex flex-col gap-4 items-center lg:items-start">
                            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#D4A574]/80">Forensic Intelligence System</span>
                            <div className="h-px w-12 bg-[#D4A574]/30" />
                        </div>

                        <h1 className="text-[44px] font-bold leading-[1.0] tracking-tight text-[#141414] sm:text-[56px] md:text-[68px] lg:text-[80px]">
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
                            className="mt-8 max-w-[32rem] text-[17px] leading-[1.65] text-[#5E5A53] font-medium tracking-tight md:text-[19px] mx-auto lg:mx-0"
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

                        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A7B64]">
                            No card required · 5 free analyses · White-label ready
                        </p>
                    </div>

                    <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000">
                        <div className="relative w-full max-w-[430px] lg:max-w-[700px] lg:[transform:perspective(1200px)_rotateY(-4deg)] transition-transform duration-700">
                            <div className="rounded-[2rem] border border-[#D9CCB8] bg-[rgba(255,251,244,0.84)] p-3 shadow-[0_24px_60px_rgba(20,20,20,0.1)] backdrop-blur-md">
                                <div className="rounded-[1.65rem] border border-[#E2D8C8] bg-[#FBFBF6] p-5 sm:p-6">
                                    <div className="flex items-center justify-between gap-4 border-b border-[#E7DED1] pb-4">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4A574]">Forensic Dossier</p>
                                            <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-[#7C6F5B]">Decision-quality creative judgment</p>
                                        </div>
                                        <div className="rounded-full border border-[#D4A574]/24 bg-[#F8F3EA] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A6840]">
                                            Confidence 94
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
                                        <div className="space-y-4">
                                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-[#D8CCB5] bg-[#F3ECE0]">
                                                <Image
                                                    src={HERO_AD_IMAGE}
                                                    alt="Luxury fragrance ad under forensic analysis"
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.42)_100%)]" />
                                                <div className="absolute left-3 top-3 rounded-full border border-[#FBFBF6]/12 bg-black/45 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#FBFBF6]/82 backdrop-blur-md">
                                                    Source Asset
                                                </div>
                                            </div>
                                            <div className="rounded-[1.25rem] border border-[#D8CCB5] bg-[#F8F3EA] px-4 py-4">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]">Verdict</p>
                                                <p className="mt-2 text-[28px] font-semibold leading-none tracking-tight text-[#141414]">Preserve. Tighten.</p>
                                                <p className="mt-3 text-[13px] leading-6 text-[#5E5A53]">Strong authority structure. Improve value transfer before scale-up.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {HERO_FINDINGS.map((item) => (
                                                <div key={item.label} className="rounded-[1.25rem] border border-[#D8CCB5] bg-[#F8F3EA] px-4 py-4">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">{item.label}</p>
                                                    <p className="mt-2 text-[14px] leading-7 text-[#141414]">{item.value}</p>
                                                </div>
                                            ))}

                                            <div className="rounded-[1.25rem] border border-[#D8CCB5] bg-[#F8F3EA] px-4 py-4">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">Evidence Notes</p>
                                                <div className="mt-3 space-y-3">
                                                    {HERO_EVIDENCE.map((item, index) => (
                                                        <p key={item} className="text-[13px] leading-6 text-[#5E5A53]">
                                                            <span className="mr-2 font-bold text-[#D4A574]">{index + 1}.</span>
                                                            {item}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
