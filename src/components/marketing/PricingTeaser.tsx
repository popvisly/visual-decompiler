'use client';

import Link from 'next/link';

const SAMPLE_CARDS = [
    { label: 'Trigger Mechanic', value: 'FOMO / Scarcity', locked: false },
    { label: 'Narrative Framework', value: 'Problem → Agitation → Solution', locked: false },
    { label: 'Semiotic Subtext', value: '"You deserve this — act now."', locked: true },
    { label: 'Evidence Anchors', value: '• Timer  • "3 left"  • Testimonial', locked: true },
    { label: 'Confidence Score', value: '94%', locked: false },
    { label: 'Objection Dismantling', value: '"Money-back guarantee" neutralizes regret', locked: true },
];

export default function PricingTeaser() {
    return (
        <section id="pricing" className="section-marketing bg-surface">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-txt-muted mb-3">
                        Free vs Pro
                    </p>
                    <h2 className="font-sans text-4xl md:text-5xl font-medium text-txt-primary tracking-tight leading-[1.1] mb-4">
                        See the preview.<br />
                        <span className="accent-dark">Unlock the full picture.</span>
                    </h2>
                    <p className="text-[15px] text-txt-secondary max-w-lg mx-auto leading-relaxed">
                        Free users get a taste of every analysis. Upgrade to see the hidden
                        strategies that make the difference.
                    </p>
                </div>

                {/* Card comparison grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {SAMPLE_CARDS.map((card) => (
                        <div key={card.label} className={`feature-panel p-5 ${card.locked ? 'blur-locked' : ''}`}>
                            {card.locked ? (
                                <>
                                    <div className="blur-content">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-txt-primary" />
                                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-txt-muted">
                                                {card.label}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-txt-primary leading-snug">
                                            {card.value}
                                        </p>
                                    </div>
                                    <div className="blur-overlay">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-txt-secondary">
                                            Pro Only
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-txt-primary" />
                                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-txt-muted">
                                            {card.label}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-txt-primary leading-snug">
                                        {card.value}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/app"
                        className="inline-block bg-txt-primary text-surface px-10 py-4 rounded-full text-[15px] font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        Start Now — Free
                    </Link>
                    <p className="text-[11px] text-txt-muted mt-3">
                        No credit card required · Upgrade anytime
                    </p>
                </div>
            </div>
        </section>
    );
}
