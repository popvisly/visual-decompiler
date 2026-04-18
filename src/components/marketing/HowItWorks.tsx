'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CORE_VALUE_STATES = ['UNDERSTAND', 'ALIGN', 'APPROVE'] as const;

function CoreValueRadar() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % CORE_VALUE_STATES.length);
        }, 2400);

        return () => clearInterval(id);
    }, []);

    const points = [
        { x: 160, y: 44, label: 'UNDERSTAND' },
        { x: 262, y: 218, label: 'ALIGN' },
        { x: 58, y: 218, label: 'APPROVE' },
    ];

    const activePoint = points[activeIndex];

    return (
        <div className="mx-auto w-full max-w-[420px] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(13,13,13,0.96)_34%)] p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A674]">Decision Radar</p>
            <svg viewBox="0 0 320 320" className="mt-4 h-[300px] w-full" aria-hidden="true">
                <defs>
                    <radialGradient id="vdRadarGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#C1A674" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#C1A674" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="160" cy="160" r="126" fill="url(#vdRadarGlow)" />
                <circle cx="160" cy="160" r="112" fill="none" stroke="rgba(246,241,231,0.08)" />
                <circle cx="160" cy="160" r="84" fill="none" stroke="rgba(246,241,231,0.08)" />
                <circle cx="160" cy="160" r="56" fill="none" stroke="rgba(246,241,231,0.08)" />

                {points.map((point) => (
                    <line
                        key={point.label}
                        x1="160"
                        y1="160"
                        x2={point.x}
                        y2={point.y}
                        stroke="rgba(246,241,231,0.11)"
                    />
                ))}

                <polygon
                    points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(193,166,116,0.08)"
                    stroke="rgba(193,166,116,0.55)"
                    strokeWidth="1.5"
                />

                <line
                    x1="160"
                    y1="160"
                    x2={activePoint.x}
                    y2={activePoint.y}
                    stroke="#F28C28"
                    strokeWidth="2"
                    style={{ transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                />

                {points.map((point, idx) => (
                    <g key={point.label}>
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={idx === activeIndex ? 6 : 4}
                            fill={idx === activeIndex ? '#FFD600' : 'rgba(246,241,231,0.55)'}
                            style={{ transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                        />
                        <text
                            x={point.x}
                            y={point.y + (idx === 0 ? -14 : 20)}
                            textAnchor="middle"
                            className="fill-[#F6F1E7]"
                            style={{
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                opacity: idx === activeIndex ? 0.95 : 0.56,
                                transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                        >
                            {point.label}
                        </text>
                    </g>
                ))}
            </svg>

            <p className="mt-2 text-[13px] uppercase tracking-[0.2em] text-[#C1A674]">{CORE_VALUE_STATES[activeIndex]}</p>
            <p className="mt-2 text-[16px] leading-[1.6] text-[#F6F1E7]/72">
                Visual reasoning that helps teams understand faster, align tighter, and move decisions forward.
            </p>
        </div>
    );
}

export default function HowItWorks() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0B] py-32 text-[#F6F1E7] lg:py-48" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674]">Core Value</p>
                    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,560px)_minmax(0,420px)] lg:gap-16">
                        <div>
                            <h2 className="mb-10 max-w-[14ch] text-[10vw] font-black uppercase leading-[0.88] tracking-[-0.04em] text-[#F6F1E7] lg:text-[72px]">
                                Make the work make sense.
                            </h2>
                            <p className="max-w-[520px] text-[18px] leading-[1.7] text-[#9a9a94]">
                                Creative work doesn't fail because it's bad.
                                <br />
                                <br />
                                It fails because it can't be explained.
                                <br />
                                <br />
                                Visual Decompiler turns instinct into structured reasoning — so clients understand, align, and approve.
                            </p>
                        </div>
                        <div className="">
                            <CoreValueRadar />
                        </div>
                    </div>
                </motion.div>

                <div className="mb-10 mt-20">
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674]">How it works</p>
                    <p className="text-[34px] font-black uppercase tracking-[-0.03em] text-[#F6F1E7]">From concept to conviction.</p>
                </div>

                <div className="mt-0 grid grid-cols-1 gap-16 md:grid-cols-3 lg:gap-12">
                    {[
                        { n: '1', title: 'Upload the Work', detail: 'Your concept, your layout, your frame.' },
                        { n: '2', title: 'Decompile', detail: 'Analyze the creative at a structural level — beyond surface description.' },
                        { n: '3', title: 'Present with Authority', detail: 'Receive a structured read — ready for decks, internal reviews, and client conversations.' },
                    ].map((step, idx) => (
                        <motion.div
                            key={step.n}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-start gap-5">
                                <span className="text-[48px] font-black leading-none text-[#F6F1E7]/[0.06]">{step.n}</span>
                                <div>
                                    <h3 className="mb-2 text-[18px] font-black uppercase tracking-[-0.01em] text-[#F6F1E7]">{step.title}</h3>
                                    <p className="text-[15px] leading-[1.65] text-[#9a9a94]">{step.detail}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
