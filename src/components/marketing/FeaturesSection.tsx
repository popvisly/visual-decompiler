'use client';

import { useEffect, useRef, useState } from 'react';

const FEATURES = [
    {
        title: 'Trigger Mechanics',
        headline: 'Identify the psychological lever',
        desc: 'Every ad pulls a trigger — FOMO, status, desire, security. VisualDecompiler.com names it in seconds and explains exactly how the mechanic operates.',
        demo: {
            label: 'Trigger Mechanic',
            value: 'FOMO / Scarcity',
            pills: ['Limited Time', 'Countdown', 'Urgency'],
        },
    },
    {
        title: 'Semiotic Subtext',
        headline: 'Read the unspoken promise',
        desc: 'Beneath every headline is a deeper message. Our AI decodes the semiotic subtext — what the ad promises without explicitly saying it.',
        demo: {
            label: 'Subtext',
            value: '\u201CYou\u2019re not buying a product \u2014 you\u2019re buying belonging.\u201D',
            pills: ['Identity', 'Tribe', 'Status'],
        },
    },
    {
        title: 'Evidence-Bound Scoring',
        headline: 'Every claim cites its proof',
        desc: 'No hallucinations. Every strategic assessment is anchored to specific visual cues, on-screen text, or compositional choices found in the ad.',
        demo: {
            label: 'Evidence Anchors',
            value: '• Gold color palette  • "Members Only" text  • Trophy iconography',
            pills: ['Visual', 'Textual', 'Compositional'],
        },
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="section-marketing bg-canvas">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-20">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-txt-muted mb-3">
                        What You See
                    </p>
                    <h2 className="font-sans text-4xl md:text-6xl font-medium text-txt-primary tracking-tight leading-[1.1]">
                        The invisible machinery<br />
                        <span className="accent-dark">made visible.</span>
                    </h2>
                </div>

                {/* Feature panels */}
                <div className="space-y-12">
                    {FEATURES.map((feature, i) => (
                        <FeaturePanel key={feature.title} feature={feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturePanel({ feature, index }: { feature: typeof FEATURES[number]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const reversed = index % 2 === 1;

    return (
        <div
            ref={ref}
            className={`reveal-on-scroll ${visible ? 'revealed' : ''}`}
            style={{ transitionDelay: '0.1s' }}
        >
            <div className={`feature-panel p-0 grid grid-cols-1 lg:grid-cols-2 ${reversed ? '' : ''}`}>
                {/* Text side */}
                <div className={`p-10 md:p-14 flex flex-col justify-center ${reversed ? 'lg:order-2' : ''}`}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-txt-muted mb-3">
                        {feature.title}
                    </p>
                    <h3 className="font-sans text-3xl md:text-4xl font-medium text-txt-primary tracking-tight leading-[1.15] mb-4">
                        {feature.headline}
                    </h3>
                    <p className="text-[15px] text-txt-secondary leading-relaxed">
                        {feature.desc}
                    </p>
                </div>

                {/* Demo card side */}
                <div className={`p-10 md:p-14 flex items-center justify-center bg-surface ${reversed ? 'lg:order-1' : ''}`}
                >
                    <div className="w-full max-w-[300px] bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-txt-primary" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-txt-muted">
                                {feature.demo.label}
                            </span>
                        </div>
                        <p className="text-sm font-semibold text-txt-primary leading-snug mb-3">
                            {feature.demo.value}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {feature.demo.pills.map((pill) => (
                                <span
                                    key={pill}
                                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.05em] text-txt-secondary border border-[rgba(0,0,0,0.08)] bg-canvas"
                                >
                                    {pill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
