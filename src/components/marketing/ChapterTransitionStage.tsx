'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const SIGNALS = [
    { value: '01', label: 'Visual intake', left: '18%', top: '16%' },
    { value: '02', label: 'Identity cue', left: '69%', top: '31%' },
    { value: '03', label: 'Product arrival', left: '34%', top: '56%' },
    { value: '04', label: 'Decision momentum', left: '74%', top: '79%' },
] as const;

export default function ChapterTransitionStage() {
    const ref = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

    const mazeY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
    const mazeScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const routeProgress = useTransform(scrollYProgress, [0, 1], [0.02, 1]);
    const routeGlow = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
    const introOpacity = useTransform(scrollYProgress, [0, 0.18, 0.34], [1, 1, 0.14]);
    const outroOpacity = useTransform(scrollYProgress, [0.58, 0.82, 1], [0.08, 0.52, 1]);
    const signalOne = useTransform(scrollYProgress, [0.08, 0.16, 0.28], [0.16, 1, 0.3]);
    const signalTwo = useTransform(scrollYProgress, [0.24, 0.36, 0.48], [0.16, 1, 0.3]);
    const signalThree = useTransform(scrollYProgress, [0.44, 0.58, 0.72], [0.16, 1, 0.3]);
    const signalFour = useTransform(scrollYProgress, [0.68, 0.84, 1], [0.16, 1, 0.44]);

    const signalOpacities = [signalOne, signalTwo, signalThree, signalFour];

    return (
        <section ref={ref} className="relative h-[320vh] bg-[#0F0D0B] text-[#FBF7EF]" data-presence-tone="ink">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(212,165,116,0.2)_0%,rgba(212,165,116,0)_24%),radial-gradient(circle_at_78%_76%,rgba(76,114,224,0.14)_0%,rgba(76,114,224,0)_24%)]" />

                <motion.div
                    style={{ opacity: introOpacity }}
                    className="pointer-events-none absolute left-[5%] top-[7%] z-20 max-w-[34rem]"
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.48em] text-[#D4A574]">Act Two</p>
                    <h2 className="mt-8 text-[42px] font-black leading-[0.92] tracking-[-0.05em] text-[#FBF7EF] sm:text-[60px] lg:text-[92px]">
                        Enter the maze.
                        <br />
                        Follow the read.
                    </h2>
                    <p className="mt-7 max-w-[28rem] text-[15px] leading-[1.85] text-white/62">
                        This is the moment the homepage stops behaving like a normal page. Scroll turns into traversal. The route pulls the eye through the system and reveals what the image is doing on the way down.
                    </p>
                </motion.div>

                <motion.p
                    style={{ opacity: introOpacity }}
                    className="pointer-events-none absolute left-[5%] bottom-[7%] z-20 hidden text-[10px] font-black uppercase tracking-[0.34em] text-[#8A8175] lg:block"
                >
                    Scroll to descend through the reading path
                </motion.p>

                <motion.div
                    style={{ y: mazeY, scale: mazeScale }}
                    className="absolute left-1/2 top-0 h-[145vh] w-[145vh] -translate-x-1/2"
                >
                    <svg viewBox="0 0 1600 1800" className="h-full w-full" aria-hidden="true">
                        <g fill="none" stroke="rgba(255,247,235,0.1)" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter">
                            <path d="M802 0 V126 H650 V296 H996 V460 H588 V662 H1114 V906 H442 V1192 H1180 V1468 H720 V1800" />
                            <path d="M498 126 H960 V234 H760 V396 H1210" />
                            <path d="M320 736 H732 V870 H1052 V1060 H560" />
                            <path d="M420 1326 H908 V1468 H1238" />
                            <circle cx="804" cy="460" r="210" />
                            <circle cx="804" cy="460" r="140" />
                            <circle cx="804" cy="1192" r="188" />
                            <circle cx="804" cy="1192" r="116" />
                            <rect x="250" y="90" width="170" height="170" />
                            <rect x="1088" y="632" width="150" height="150" />
                            <rect x="316" y="1312" width="164" height="164" transform="rotate(45 398 1394)" />
                            <path d="M1108 1398 L1160 1470 L1108 1542 L1056 1470 Z" />
                        </g>

                        <motion.path
                            d="M802 0 V126 H650 V296 H996 V460 H588 V662 H1114 V906 H442 V1192 H1180 V1468 H720 V1800"
                            fill="none"
                            stroke="#D4A574"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={reduceMotion ? false : { pathLength: 0.03, opacity: 0.32 }}
                            style={reduceMotion ? { opacity: 1 } : { pathLength: routeProgress, opacity: routeGlow }}
                        />

                        <motion.path
                            d="M804 250 A210 210 0 1 1 804 670"
                            fill="none"
                            stroke="#F2E8D7"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={reduceMotion ? false : { pathLength: 0.04, opacity: 0.18 }}
                            style={reduceMotion ? { opacity: 0.82 } : { pathLength: routeProgress, opacity: 0.82 }}
                        />

                        <motion.path
                            d="M804 1006 A188 188 0 1 0 804 1382"
                            fill="none"
                            stroke="#F2E8D7"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={reduceMotion ? false : { pathLength: 0.04, opacity: 0.18 }}
                            style={reduceMotion ? { opacity: 0.74 } : { pathLength: routeProgress, opacity: 0.74 }}
                        />

                        <circle cx="802" cy="0" r="14" fill="#4E9A67" />
                        <motion.circle
                            cx="720"
                            cy="1800"
                            r="14"
                            fill="#4C72E0"
                            initial={false}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.75, 1, 0.75] }}
                            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                        />
                    </svg>
                </motion.div>

                <motion.p
                    style={{ opacity: introOpacity }}
                    className="pointer-events-none absolute right-[4%] top-[2%] hidden text-[11vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.045] lg:block"
                >
                    visual
                </motion.p>
                <motion.p
                    style={{ opacity: outroOpacity }}
                    className="pointer-events-none absolute bottom-[2%] left-[5%] hidden text-[10vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.045] lg:block"
                >
                    legible
                </motion.p>

                {SIGNALS.map((signal, index) => (
                    <motion.div
                        key={signal.label}
                        style={{ left: signal.left, top: signal.top, opacity: signalOpacities[index] }}
                        className="absolute z-20 w-[13rem] -translate-x-1/2"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4.2 + index, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                        initial={false}
                    >
                        <div className="border border-white/10 bg-[rgba(17,15,13,0.72)] px-4 py-4 backdrop-blur-sm">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8A8175]">{signal.value}</p>
                            <p className="mt-2 text-[12px] font-black uppercase tracking-[0.18em] text-[#FBF7EF]">{signal.label}</p>
                        </div>
                    </motion.div>
                ))}

                <motion.div
                    style={{ opacity: outroOpacity }}
                    className="pointer-events-none absolute bottom-[8%] right-[6%] z-20 max-w-[20rem] text-right"
                >
                    <p className="text-[9px] font-black uppercase tracking-[0.32em] text-[#D4A574]">System read</p>
                    <p className="mt-3 text-[14px] leading-[1.8] text-white/62">
                        The outside stays visual. The inside is discovered by travelling the path.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
