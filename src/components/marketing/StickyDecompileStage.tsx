'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Pill, PreviewCard, StageImage } from '@/types/homepage';

type Props = {
    id: string;
    stageImage: StageImage;
    pills: Pill[];
    reportPreviewCards: PreviewCard[];
};

export default function StickyDecompileStage({ id, stageImage, pills, reportPreviewCards }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll over the 300vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Beat A (0.00–0.25): ad tile only + "INPUT" label fades in
    const inputOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.3], [0, 1, 1, 0]);

    // Beat B (0.25–0.50): pills fade/slide in
    const signalsOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
    const pillsOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
    const pillsY = useTransform(scrollYProgress, [0.25, 0.4], [16, 0]);

    // Beat C (0.50–0.75): connector lines draw
    const linePathLength = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

    // Beat D (0.75–1.00): report preview panel slides in
    const outputOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
    const reportOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
    const reportX = useTransform(scrollYProgress, [0.75, 0.9], [40, 0]);

    // Center focal point for SVG lines
    const STAGE_CENTER_X = 50;
    const STAGE_CENTER_Y = 50;

    return (
        <section id={id} ref={containerRef} className="relative h-[400vh] bg-[#F6F1E7]">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-7xl mx-auto px-6 h-[80vh] flex items-center justify-center">

                    {/* Stage Labels (Absolute Top Left) */}
                    <div className="absolute top-10 left-4 md:left-8 xl:left-20 z-40">
                        {/* INPUT Label */}
                        <motion.div style={{ opacity: inputOpacity }} className="absolute top-0 left-0 w-64">
                            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase mb-2">Input</h3>
                            <p className="text-[20px] leading-[1.2] text-[#141414] font-medium tracking-tight">Single asset in.<br />Full reconstruction out.</p>
                        </motion.div>

                        {/* SIGNALS Label */}
                        <motion.div style={{ opacity: signalsOpacity }} className="absolute top-0 left-0 w-64 pointer-events-none">
                            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase mb-2">Signals</h3>
                            <p className="text-[20px] leading-[1.2] text-[#141414] font-medium tracking-tight">Mechanics extracted.<br />Evidence attached.</p>
                        </motion.div>

                        {/* OUTPUT Label */}
                        <motion.div style={{ opacity: outputOpacity }} className="absolute top-0 left-0 w-64 pointer-events-none">
                            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase mb-2">Output</h3>
                            <p className="text-[20px] leading-[1.2] text-[#141414] font-medium tracking-tight">A report you can<br />defend in a room.</p>
                        </motion.div>
                    </div>

                    {/* INTERACTIVE STAGE AREA */}
                    <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center">

                        {/* Connector SVG Lines (Beat C) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                            {pills.map((pill, i) => (
                                <motion.line
                                    key={`line-${pill.key}`}
                                    x1={`${pill.x}%`}
                                    y1={`${pill.y}%`}
                                    x2={`${STAGE_CENTER_X}%`}
                                    y2={`${STAGE_CENTER_Y}%`}
                                    className="stroke-[#141414]/20"
                                    strokeWidth={1}
                                    strokeDasharray="4 4"
                                    strokeLinecap="round"
                                    style={{ pathLength: linePathLength }}
                                />
                            ))}
                        </svg>

                        {/* Center Ad Tile (Always visible) */}
                        <div className="relative z-10 w-[240px] md:w-[280px] aspect-[4/5] rounded-[20px] overflow-hidden border border-[#E7DED1] shadow-[0_20px_60px_rgba(20,20,20,0.08)] bg-white">
                            <img src={stageImage.src} alt={stageImage.alt} className="w-full h-full object-cover" />
                        </div>

                        {/* Orbiting Pills (Beat B) */}
                        {pills.map((pill) => (
                            <motion.div
                                key={pill.key}
                                className="absolute z-20 group"
                                style={{
                                    left: `${pill.x}%`,
                                    top: `${pill.y}%`,
                                    x: '-50%',
                                    y: '-50%',
                                    opacity: pillsOpacity,
                                    marginTop: pillsY // using marginTop to slightly override framer motion y transform conflict if any, or just separate wrappers
                                }}
                            >
                                <button className="
                                    inline-flex items-center gap-2 whitespace-nowrap
                                    rounded-full border border-[#E7DED1]
                                    bg-[#FBF7EF]/90 backdrop-blur
                                    px-4 py-2
                                    text-[13px] font-medium tracking-[-0.01em] text-[#141414]
                                    shadow-[0_10px_30px_rgba(20,20,20,0.07)]
                                    transition-all duration-300
                                    hover:-translate-y-[1px]
                                    hover:border-[#D8CCBC]
                                    hover:shadow-[0_16px_40px_rgba(20,20,20,0.10)]
                                    group-hover:border-[#CDBFAF] group-hover:bg-[#F2EBDD]
                                ">
                                    {pill.label}
                                </button>

                                {/* Hover Tooltip (Microcopy) */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-30">
                                    <div className="w-[260px] rounded-2xl border border-[#E7DED1] bg-[#FBF7EF]/95 backdrop-blur shadow-[0_20px_60px_rgba(20,20,20,0.10)] p-4 relative">
                                        {/* pointer triangle */}
                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border-l border-t border-[#E7DED1] bg-[#FBF7EF] rotate-45" />
                                        <div className="relative text-[11px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase">
                                            {pill.label}
                                        </div>
                                        <div className="relative mt-2 text-[13px] leading-[1.35] text-[#141414]/85">
                                            {pill.micro}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Report Panel Slide-in (Beat D) */}
                    <motion.div
                        className="absolute right-4 md:right-8 xl:right-16 top-1/2 -translate-y-1/2 w-[280px] md:w-[320px] xl:w-full xl:max-w-sm z-30"
                        style={{ opacity: reportOpacity, x: reportX }}
                    >
                        <div className="rounded-[24px] border border-[#E7DED1] bg-[#FBF7EF]/90 backdrop-blur-xl shadow-[0_30px_90px_rgba(20,20,20,0.14)] p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-[#141414]" />
                                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase">Intelligence Report</span>
                            </div>

                            {reportPreviewCards.map((card, i) => (
                                <div key={i} className="rounded-xl border border-[#E7DED1] bg-white p-4">
                                    <h4 className="text-[13px] font-semibold text-[#141414] mb-1">{card.title}</h4>
                                    <p className="text-[12px] text-[#6B6B6B] leading-[1.4] mb-3">{card.micro}</p>

                                    {card.bullets && (
                                        <ul className="space-y-1">
                                            {card.bullets.map((b, bi) => (
                                                <li key={bi} className="text-[11px] text-[#141414]/80 flex gap-2">
                                                    <span className="text-[#141414]/30">•</span> {b}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
