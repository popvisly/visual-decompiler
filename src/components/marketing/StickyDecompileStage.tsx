'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue, useReducedMotion } from 'framer-motion';
import { Pill, PreviewCard, StageImage } from '@/types/homepage';

type Props = {
    id: string;
    stageImage: StageImage;
    pills: Pill[];
    reportPreviewCards: PreviewCard[];
};

function ConnectorLine({ i, pill, scrollYProgress, STAGE_CENTER_X, STAGE_CENTER_Y }: { i: number, pill: Pill, scrollYProgress: MotionValue<number>, STAGE_CENTER_X: number, STAGE_CENTER_Y: number }) {
    const pathLength = useTransform(scrollYProgress, [0.5 + i * 0.015, 0.7 + i * 0.015], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0.45 + i * 0.015, 0.55 + i * 0.015], [0, 1]);
    return (
        <motion.line
            x1={`${pill.x}%`}
            y1={`${pill.y}%`}
            x2={`${STAGE_CENTER_X}%`}
            y2={`${STAGE_CENTER_Y}%`}
            className="stroke-[#141414]/20"
            strokeWidth={0.75}
            strokeLinecap="round"
            style={{ pathLength, opacity }}
        />
    );
}

export default function StickyDecompileStage({ id, stageImage, pills, reportPreviewCards }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll over the 300vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Beat A (0.00–0.25): ad tile only + "INPUT" label fades in
    const inputOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.3], [0, 1, 1, 0]);

    // Beat B Label
    const signalsOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);

    // Beat D Label
    const outputOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

    // State triggers for variants
    const [pillsVisible, setPillsVisible] = useState(false);
    const [reportVisible, setReportVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setPillsVisible(latest >= 0.25);
        setReportVisible(latest >= 0.75);
    });

    // Center focal point for SVG lines
    const STAGE_CENTER_X = 50;
    const STAGE_CENTER_Y = 50;

    const shouldReduceMotion = useReducedMotion();

    return (
        <section id={id} ref={containerRef} className="relative h-[400vh] bg-[#F6F1E7]">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-7xl mx-auto px-6 h-full flex items-center justify-center">

                    {/* Stage Labels (Absolute Top Left) */}
                    <div className="absolute top-48 left-6 md:left-12 xl:left-24 z-40 max-w-xl">
                        {/* INPUT Label */}
                        <motion.div style={{ opacity: inputOpacity }} className="absolute top-0 left-0">
                            <h3 className="text-luxury-label mb-6">Input</h3>
                            <p className="text-[32px] md:text-[48px] xl:text-[64px] leading-[0.95] text-[#141414] font-semibold tracking-luxury uppercase">
                                Single asset in.<br />
                                <span className="text-[#6B6B6B]/40">Full reconstruction.</span>
                            </p>
                        </motion.div>

                        {/* SIGNALS Label */}
                        <motion.div style={{ opacity: signalsOpacity }} className="absolute top-0 left-0 pointer-events-none">
                            <h3 className="text-luxury-label mb-6">Signals</h3>
                            <p className="text-[32px] md:text-[48px] xl:text-[64px] leading-[0.95] text-[#141414] font-semibold tracking-luxury uppercase">
                                Mechanics extracted.<br />
                                <span className="text-[#6B6B6B]/40">Evidence attached.</span>
                            </p>
                        </motion.div>

                        {/* OUTPUT Label */}
                        <motion.div style={{ opacity: outputOpacity }} className="absolute top-0 left-0 pointer-events-none">
                            <h3 className="text-luxury-label mb-6">Output</h3>
                            <p className="text-[32px] md:text-[48px] xl:text-[64px] leading-[0.95] text-[#141414] font-semibold tracking-luxury uppercase">
                                A report you can<br />
                                <span className="text-[#6B6B6B]/40">defend in a room.</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* INTERACTIVE STAGE AREA */}
                    <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center">

                        {/* Connector SVG Lines (Beat C) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                            {pills.map((pill, i) => (
                                <ConnectorLine
                                    key={`line-${pill.key}`}
                                    i={i}
                                    pill={pill}
                                    scrollYProgress={scrollYProgress}
                                    STAGE_CENTER_X={STAGE_CENTER_X}
                                    STAGE_CENTER_Y={STAGE_CENTER_Y}
                                />
                            ))}
                        </svg>

                        {/* Center Ad Tile (Always visible) */}
                        <div className="relative z-10 w-[240px] md:w-[280px] aspect-[4/5] rounded-[20px] overflow-hidden border border-[#E7DED1] shadow-[0_20px_60px_rgba(20,20,20,0.08)] bg-white">
                            <img src={stageImage.src} alt={stageImage.alt} className="w-full h-full object-cover" />
                        </div>

                        {/* Orbiting Pills (Beat B) */}
                        <motion.div
                            className="absolute inset-0 z-20 pointer-events-none"
                            initial="hidden"
                            animate={pillsVisible ? "visible" : "hidden"}
                            variants={{
                                visible: { transition: { staggerChildren: 0.06 } },
                                hidden: {}
                            }}
                        >
                            {pills.map((pill, i) => (
                                <div
                                    key={pill.key}
                                    className="absolute"
                                    style={{ left: `${pill.x}%`, top: `${pill.y}%`, transform: 'translate(-50%, -50%)' }}
                                >
                                    <motion.div
                                        className="group pointer-events-auto"
                                        variants={{
                                            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: shouldReduceMotion ? 1 : 0.98, filter: shouldReduceMotion ? "blur(0px)" : "blur(2px)" },
                                            visible: {
                                                opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
                                                transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8 }
                                            }
                                        }}
                                    >
                                        <motion.div
                                            animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                                        >
                                            <button className="
                                                inline-flex items-center gap-3 whitespace-nowrap
                                                rounded-full border border-[#141414]/10
                                                bg-white/80 backdrop-blur-md
                                                px-6 py-3
                                                text-[14px] font-semibold tracking-[-0.02em] text-[#141414]
                                                shadow-[0_8px_32px_rgba(20,20,20,0.04)]
                                                transition-all duration-500
                                                hover:-translate-y-1
                                                hover:border-[#141414]
                                                hover:bg-[#141414] hover:text-[#FBF7EF]
                                                hover:shadow-[0_12px_48px_rgba(20,20,20,0.12)]
                                            ">
                                                {pill.label}
                                            </button>

                                            {/* Hover Tooltip (Microcopy) */}
                                            <div
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 scale-[0.98] translate-y-2 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-30"
                                                style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                                            >
                                                <div className="w-[260px] rounded-2xl border border-[#E7DED1] bg-[#FBF7EF]/95 backdrop-blur shadow-[0_12px_40px_rgba(20,20,20,0.06)] p-4 relative">
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
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Report Panel Slide-in (Beat D) */}
                    <div className="absolute inset-y-0 right-4 md:right-8 xl:right-16 flex items-center pointer-events-none z-30">
                        <motion.div
                            className="w-[280px] md:w-[320px] xl:w-full xl:max-w-sm pointer-events-auto"
                            initial={false}
                            animate={{
                                opacity: reportVisible ? 1 : 0,
                                x: reportVisible ? 0 : (shouldReduceMotion ? 0 : 48),
                                filter: reportVisible ? "blur(0px)" : (shouldReduceMotion ? "blur(0px)" : "blur(6px)")
                            }}
                            transition={shouldReduceMotion ? { duration: 0.3 } : {
                                type: "spring",
                                stiffness: 120,
                                damping: 18,
                                mass: 0.8,
                                restDelta: 0.001
                            }}
                        >
                            <div className="rounded-[32px] border border-[#E7DED1] bg-[#FBF7EF]/95 backdrop-blur-2xl shadow-[0_40px_100px_rgba(20,20,20,0.16)] p-6 md:p-8 space-y-6 md:space-y-8 max-h-[75vh] overflow-y-auto dark-scroll">
                                <div className="flex items-center justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#141414]" />
                                        <span className="text-luxury-label">Intelligence Report</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#141414]/20 tabular-nums">V1.0.8</span>
                                </div>

                                {reportPreviewCards.map((card, i) => (
                                    <div key={i} className="group/card">
                                        <h4 className="text-[20px] md:text-[24px] font-semibold text-[#141414] mb-2 tracking-tight leading-none uppercase">{card.title}</h4>
                                        <p className="text-[13px] md:text-[14px] text-[#6B6B6B] leading-[1.4] mb-4 md:mb-6 max-w-[280px]">{card.micro}</p>

                                        {card.bullets && (
                                            <div className="grid grid-cols-1 gap-2 border-t border-[#141414]/5 pt-4">
                                                {card.bullets.map((b, bi) => (
                                                    <div key={bi} className="text-[11px] md:text-[12px] font-medium text-[#141414] flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#141414]/10 group-hover/card:bg-[#141414] transition-colors" />
                                                        {b}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
