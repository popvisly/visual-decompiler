'use client';

import { useEffect, useRef, useState } from 'react';

const ANALYSIS_CARDS = [
    {
        side: 'left' as const,
        label: 'Trigger Mechanic',
        value: 'FOMO / Scarcity',
        desc: 'Limited-time urgency drives immediate action',
        color: 'var(--text-primary)',
    },
    {
        side: 'right' as const,
        label: 'Semiotic Subtext',
        value: '"You deserve this — but only if you act now."',
        desc: 'The unspoken promise beneath the surface',
        color: 'var(--text-primary)',
    },
    {
        side: 'left' as const,
        label: 'Narrative Framework',
        value: 'Problem → Agitation → Solution',
        desc: 'Classic persuasion arc in 3 beats',
        color: 'var(--text-primary)',
    },
    {
        side: 'right' as const,
        label: 'Evidence Anchors',
        value: '• Countdown timer  • "Only 3 left"  • Testimonial overlay',
        desc: 'Visual cues supporting the mechanic',
        color: 'var(--text-primary)',
    },
    {
        side: 'left' as const,
        label: 'Confidence Score',
        value: '94%',
        desc: 'High-confidence analysis with strong evidence',
        color: '#00b85e',
    },
    {
        side: 'right' as const,
        label: 'Objection Dismantling',
        value: '"Money-back guarantee" neutralizes purchase regret',
        desc: 'Pre-emptive friction removal',
        color: 'var(--text-primary)',
    },
];

export default function DecompositionSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visibleCards, setVisibleCards] = useState<number>(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Stagger card reveals
                        const timer = setInterval(() => {
                            setVisibleCards((prev) => {
                                if (prev >= ANALYSIS_CARDS.length) {
                                    clearInterval(timer);
                                    return prev;
                                }
                                return prev + 1;
                            });
                        }, 250);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="section-marketing relative overflow-hidden bg-surface"
        >
            <div className="max-w-6xl mx-auto px-6">
                {/* Title */}
                <div className="text-center mb-16">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-txt-muted mb-3">
                        How It Works
                    </p>
                    <h2 className="font-sans text-4xl md:text-6xl font-medium text-txt-primary tracking-tight leading-[1.1]">
                        The ad comes apart.<br />
                        <span className="accent-dark">The truth comes out.</span>
                    </h2>
                </div>

                {/* Decomposition layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px_1fr] gap-6 items-start">
                    {/* Left column cards */}
                    <div className="space-y-4 flex flex-col items-end">
                        {ANALYSIS_CARDS.filter(c => c.side === 'left').map((card, i) => (
                            <div
                                key={card.label}
                                className={`emerge-card from-left max-w-[280px] w-full ${visibleCards > i * 2 ? 'visible' : ''
                                    }`}
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                <AnalysisCard {...card} />
                            </div>
                        ))}
                    </div>

                    {/* Center — the "ad" */}
                    <div className="relative mx-auto">
                        <div className="w-[320px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.06)] shadow-xl bg-white">
                            {/* Placeholder ad — generated gradient to simulate a real ad */}
                            <div className="w-full h-full relative"
                                style={{
                                    background: 'linear-gradient(135deg, #FBF7EF 0%, #F6F1E7 40%, #E7DED1 100%)',
                                }}
                            >
                                {/* Simulated ad elements */}
                                <div className="absolute inset-0 flex flex-col justify-between p-8">
                                    <div>
                                        <div className="w-20 h-2.5 bg-txt-primary/10 rounded-full mb-2" />
                                        <div className="w-12 h-2 bg-txt-primary/5 rounded-full" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="w-3/4 h-3 bg-txt-primary/20 rounded-full" />
                                        <div className="w-1/2 h-3 bg-txt-primary/10 rounded-full" />
                                        <div className="mt-4 inline-block px-4 py-2 bg-txt-primary rounded-lg">
                                            <div className="w-16 h-2.5 bg-surface/80 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                {/* Scan lines overlay when animating */}
                                {visibleCards > 0 && (
                                    <div className="absolute inset-0 pointer-events-none opacity-20"
                                        style={{
                                            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, #141414 3px, #141414 4px)',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        {/* Pulsing scan indicator */}
                        {visibleCards > 0 && visibleCards < ANALYSIS_CARDS.length && (
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-txt-primary animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-txt-muted">
                                    Analyzing
                                </span>
                            </div>
                        )}
                        {visibleCards >= ANALYSIS_CARDS.length && (
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#00b85e]" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00b85e]">
                                    Complete
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right column cards */}
                    <div className="space-y-4">
                        {ANALYSIS_CARDS.filter(c => c.side === 'right').map((card, i) => (
                            <div
                                key={card.label}
                                className={`emerge-card from-right max-w-[280px] w-full ${visibleCards > i * 2 + 1 ? 'visible' : ''
                                    }`}
                                style={{ transitionDelay: `${i * 0.15 + 0.1}s` }}
                            >
                                <AnalysisCard {...card} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function AnalysisCard({
    label,
    value,
    desc,
    color,
}: {
    label: string;
    value: string;
    desc: string;
    color: string;
}) {
    return (
        <div className="feature-panel p-5">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-txt-muted">
                    {label}
                </span>
            </div>
            <p className="text-sm font-semibold text-txt-primary leading-snug mb-1">
                {value}
            </p>
            <p className="text-[11px] text-txt-muted leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
