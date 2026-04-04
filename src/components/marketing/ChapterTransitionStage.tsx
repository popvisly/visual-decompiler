'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const CHAPTER_POINTS = [
    { label: 'Visual intake', value: '01', x: '12%', y: '72%' },
    { label: 'Emotional cueing', value: '02', x: '31%', y: '49%' },
    { label: 'Product arrival', value: '03', x: '60%', y: '34%' },
    { label: 'Decision momentum', value: '04', x: '79%', y: '18%' },
] as const;

function GeometryField() {
    return (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[9%] top-[62%] h-28 w-28 rotate-[16deg] border border-white/10" />
            <div className="absolute left-[20%] top-[36%] h-16 w-16 rounded-full border border-[#D4A574]/22" />
            <div className="absolute left-[46%] top-[55%] h-24 w-24 rotate-45 border border-white/8" />
            <div className="absolute right-[17%] top-[28%] h-20 w-20 rounded-full border border-[#4C72E0]/24" />
            <div className="absolute right-[12%] top-[62%] h-24 w-24 border border-white/10" />
        </div>
    );
}

export default function ChapterTransitionStage() {
    const ref = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

    const routeY = useTransform(scrollYProgress, [0, 1], ['8%', '-14%']);
    const routeScale = useTransform(scrollYProgress, [0, 1], [0.96, 1.04]);
    const intakeOpacity = useTransform(scrollYProgress, [0.08, 0.2, 0.34], [0.25, 1, 0.42]);
    const cueOpacity = useTransform(scrollYProgress, [0.24, 0.4, 0.56], [0.25, 1, 0.42]);
    const arrivalOpacity = useTransform(scrollYProgress, [0.46, 0.6, 0.76], [0.25, 1, 0.42]);
    const decisionOpacity = useTransform(scrollYProgress, [0.66, 0.82, 0.98], [0.25, 1, 0.42]);
    const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

    const pointOpacities = [intakeOpacity, cueOpacity, arrivalOpacity, decisionOpacity];

    return (
        <section ref={ref} className="relative overflow-hidden bg-[#141210] text-[#FBF7EF]" data-presence-tone="ink">
            <div className="absolute inset-0 opacity-90" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(212,165,116,0.18)_0%,rgba(212,165,116,0)_24%),radial-gradient(circle_at_78%_70%,rgba(76,114,224,0.12)_0%,rgba(76,114,224,0)_26%)]" />
            </div>

            <div className="relative mx-auto max-w-[1560px] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
                <div className="grid gap-16 lg:grid-cols-[0.38fr_0.62fr] lg:gap-10">
                    <motion.div style={{ y: headlineY }} className="max-w-[34rem] lg:pt-12">
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[10px] font-black uppercase tracking-[0.48em] text-[#D4A574]"
                        >
                            Act Two
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.45 }}
                            transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-8 text-[40px] font-black leading-[0.92] tracking-[-0.05em] text-[#FBF7EF] sm:text-[58px] lg:text-[88px]"
                        >
                            Move from the image
                            <br />
                            into the system
                            <br />
                            beneath it.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-8 max-w-[30rem] text-[16px] leading-[1.85] text-white/64"
                        >
                            The page needs a moment where the room understands this is not just image curation. The route now does the explaining itself, surfacing signals as it moves through the section.
                        </motion.p>
                    </motion.div>

                    <div className="relative min-h-[840px] lg:min-h-[1100px]">
                        <div className="sticky top-24 flex min-h-[840px] items-center justify-center lg:min-h-[820px]">
                            <div className="relative h-[820px] w-full max-w-[860px] overflow-hidden rounded-[3rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)]">
                                <GeometryField />

                                <motion.p
                                    style={{ opacity: intakeOpacity }}
                                    className="pointer-events-none absolute left-[7%] top-[8%] hidden text-[11vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.045] lg:block"
                                >
                                    visual
                                </motion.p>
                                <motion.p
                                    style={{ opacity: decisionOpacity }}
                                    className="pointer-events-none absolute bottom-[2%] right-[5%] hidden text-[8.5vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.045] lg:block"
                                >
                                    legible
                                </motion.p>

                                <motion.div
                                    style={{ y: routeY, scale: routeScale }}
                                    className="absolute inset-x-[6%] top-[4%] bottom-[6%]"
                                >
                                    <svg viewBox="0 0 760 920" className="h-full w-full" aria-hidden="true">
                                        <g fill="none" stroke="rgba(255,248,236,0.12)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M92 784 H198 V668 H286 V520 H422 V410 H530 V276 H658" />
                                            <path d="M164 840 V724 H250 V616 H362 V616 H436 V522 H598 V522" />
                                            <path d="M86 622 H172 V622 H172 V508 H286 V384 H386 V384 H386 V246 H590" />
                                            <circle cx="382" cy="452" r="236" />
                                            <circle cx="382" cy="452" r="168" />
                                            <circle cx="382" cy="452" r="92" />
                                        </g>

                                        <motion.path
                                            d="M92 784 H198 V668 H286 V520 H422 V410 H530 V276 H658"
                                            fill="none"
                                            stroke="#D4A574"
                                            strokeWidth="4.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={reduceMotion ? false : { pathLength: 0.04, opacity: 0.4 }}
                                            style={reduceMotion ? undefined : { pathLength: scrollYProgress }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />

                                        <motion.path
                                            d="M382 640 A188 188 0 0 1 560 484 A142 142 0 0 0 470 310 A82 82 0 0 1 382 326"
                                            fill="none"
                                            stroke="#F2E8D7"
                                            strokeWidth="3.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={reduceMotion ? false : { pathLength: 0.08, opacity: 0.24 }}
                                            style={reduceMotion ? undefined : { pathLength: scrollYProgress }}
                                            animate={{ opacity: 0.85 }}
                                            transition={{ duration: 0.2 }}
                                        />

                                        <circle cx="92" cy="784" r="7" fill="#4E9A67" />
                                        <motion.circle
                                            cx="658"
                                            cy="276"
                                            r="7"
                                            fill="#4C72E0"
                                            initial={false}
                                            animate={{ scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }}
                                            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                                        />

                                        <motion.rect
                                            x="132"
                                            y="676"
                                            width="72"
                                            height="72"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.18)"
                                            style={{ opacity: intakeOpacity }}
                                        />
                                        <motion.circle
                                            cx="286"
                                            cy="520"
                                            r="36"
                                            fill="none"
                                            stroke="rgba(212,165,116,0.38)"
                                            strokeWidth="2.6"
                                            style={{ opacity: cueOpacity }}
                                        />
                                        <motion.rect
                                            x="390"
                                            y="378"
                                            width="64"
                                            height="64"
                                            rx="16"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.2)"
                                            transform="rotate(45 422 410)"
                                            style={{ opacity: arrivalOpacity }}
                                        />
                                        <motion.path
                                            d="M530 236 L554 276 L530 316 L506 276 Z"
                                            fill="none"
                                            stroke="rgba(76,114,224,0.42)"
                                            strokeWidth="2.6"
                                            style={{ opacity: decisionOpacity }}
                                        />
                                    </svg>
                                </motion.div>

                                {CHAPTER_POINTS.map((point, index) => (
                                    <motion.div
                                        key={point.label}
                                        style={{ left: point.x, top: point.y, opacity: pointOpacities[index] }}
                                        className="absolute w-[12rem] -translate-x-1/2"
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 4 + index, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                                        initial={false}
                                    >
                                        <div className="border border-white/10 bg-[rgba(17,15,13,0.74)] px-4 py-4 backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8A8175]">{point.value}</p>
                                            <p className="mt-2 text-[12px] font-black uppercase tracking-[0.18em] text-[#FBF7EF]">{point.label}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
