'use client';

import Link from 'next/link';
import Image from 'next/image';

const ORBIT_CAPABILITIES = [
    'Trigger Mechanics',
    'Semiotic Subtext',
    'Narrative Framework',
    'Evidence Anchors',
    'Objection Dismantling',
    'Visual Style',
    'Confidence Scoring',
    'Behavioral Nudge',
];

export default function HeroSection() {
    return (
        <section className="hero-light light-grid relative overflow-hidden pt-32 pb-48">
            <div className="max-w-5xl mx-auto px-6 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-txt-primary text-surface text-[11px] font-bold uppercase tracking-[0.1em] mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-canvas-alt" />
                    AI-Powered Ad Intelligence
                </div>

                {/* Headline */}
                <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-medium text-txt-primary leading-[1.05] tracking-tight mb-6">
                    See what ads<br />
                    <span className="text-txt-secondary">don&apos;t want you<br />to see.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-txt-secondary max-w-xl mx-auto leading-relaxed mb-10">
                    Drop any advertisement. Our AI deconstructs the architecture of persuasion
                    to understand & comprehend the hidden mechanics in seconds.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 z-10 relative">
                    <Link
                        href="/app"
                        className="bg-txt-primary text-surface px-8 py-3.5 rounded-full text-[15px] font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        Start Analyzing — Free
                    </Link>
                    <a
                        href="#how-it-works"
                        className="text-[13px] font-medium text-txt-secondary hover:text-txt-primary transition-colors flex items-center gap-2"
                    >
                        See how it works
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                    </a>
                </div>

                {/* Stage: Dior Tile + Pills */}
                <div className="relative max-w-4xl mx-auto flex items-center justify-center mt-12 mb-20 h-[400px]">

                    {/* Floating Pills (Back Layer) */}
                    <div className="absolute inset-0 flex flex-wrap justify-between content-between p-8 pointer-events-none">
                        {ORBIT_CAPABILITIES.slice(0, 4).map((cap, i) => (
                            <span
                                key={cap}
                                className="float-pill px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] text-txt-secondary self-start mx-4"
                                style={{ animationDelay: `${i * -0.6}s`, transform: `translateY(${i % 2 === 0 ? '-20px' : '10px'})` }}
                            >
                                {cap}
                            </span>
                        ))}
                    </div>

                    {/* Dior Stage Image */}
                    <div className="relative z-10 w-[240px] md:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-line bg-surface transition-transform hover:scale-[1.02] duration-500 ease-in-out cursor-pointer group">
                        <Image
                            src="/assets/Dior.png"
                            alt="Dior Ad Example"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                            <span className="bg-surface text-txt-primary px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">Decompile Image</span>
                        </div>
                    </div>

                    {/* Floating Pills (Front Layer) */}
                    <div className="absolute inset-0 flex flex-wrap justify-between content-between p-4 pointer-events-none z-20">
                        {ORBIT_CAPABILITIES.slice(4, 8).map((cap, i) => (
                            <span
                                key={cap}
                                className="float-pill px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] text-txt-secondary self-end mx-8"
                                style={{ animationDelay: `${(i + 4) * -0.4}s`, transform: `translateY(${i % 2 === 0 ? '20px' : '-10px'})` }}
                            >
                                {cap}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
