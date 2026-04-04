'use client';

import { motion, useReducedMotion } from 'framer-motion';

const CHAPTER_POINTS = [
    { label: 'Visual intake', value: '01' },
    { label: 'Emotional cueing', value: '02' },
    { label: 'Product arrival', value: '03' },
    { label: 'Decision momentum', value: '04' },
] as const;

export default function ChapterTransitionStage() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[#141210] text-[#FBF7EF]" data-presence-tone="ink">
            <div className="absolute inset-0 opacity-90" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(212,165,116,0.18)_0%,rgba(212,165,116,0)_24%),radial-gradient(circle_at_78%_70%,rgba(76,114,224,0.12)_0%,rgba(76,114,224,0)_26%)]" />
            </div>

            <div className="relative mx-auto min-h-[88vh] max-w-[1480px] px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
                <div className="grid min-h-[78vh] items-end gap-16 lg:grid-cols-[0.46fr_0.54fr] lg:gap-12">
                    <div className="max-w-[34rem]">
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
                            The page needs a moment where the room understands this is not just image curation. This is where the visual read opens into the analytical engine.
                        </motion.p>
                    </div>

                    <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[620px]">
                        <div className="absolute inset-0 hidden rounded-[3rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.01)_100%)] lg:block" />

                        <div className="relative mx-auto aspect-square w-full max-w-[540px]">
                            <svg viewBox="0 0 540 540" className="h-full w-full" aria-hidden="true">
                                <g fill="none" stroke="rgba(255,248,236,0.16)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M70 470 H166 L166 384 H224 V308 H300 V226 H390 V150 H470" />
                                    <path d="M70 388 H130 V332 H204 V248 H300 V248 H378 V168 H470" />
                                    <path d="M70 312 H152 V312 H152 V230 H244 V152 H324 V152 H324 V94 H470" />
                                    <circle cx="270" cy="270" r="188" />
                                    <circle cx="270" cy="270" r="134" />
                                    <circle cx="270" cy="270" r="76" />
                                </g>

                                <motion.path
                                    d="M70 470 H166 L166 384 H224 V308 H300 V226 H390 V150 H470"
                                    fill="none"
                                    stroke="#D4A574"
                                    strokeWidth="4.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={reduceMotion ? false : { pathLength: 0.08, opacity: 0.45 }}
                                    whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                                    viewport={{ once: true, amount: 0.55 }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                />

                                <motion.path
                                    d="M270 458 A188 188 0 0 1 410 332 A134 134 0 0 0 336 174 A76 76 0 0 1 270 194"
                                    fill="none"
                                    stroke="#F2E8D7"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={reduceMotion ? false : { pathLength: 0.1, opacity: 0.2 }}
                                    whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 0.85 }}
                                    viewport={{ once: true, amount: 0.55 }}
                                    transition={{ duration: 1.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                />

                                <circle cx="70" cy="470" r="7" fill="#4E9A67" />
                                <motion.circle
                                    cx="470"
                                    cy="150"
                                    r="7"
                                    fill="#4C72E0"
                                    initial={{ scale: 0.9, opacity: 0.8 }}
                                    whileInView={{ scale: [1, 1.22, 1], opacity: 1 }}
                                    viewport={{ once: true, amount: 0.55 }}
                                    transition={{ duration: 1.4, delay: 0.45, ease: 'easeInOut' }}
                                />
                            </svg>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.55 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute left-1/2 top-1/2 w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/10 bg-[rgba(18,16,14,0.72)] p-6 shadow-[0_34px_80px_rgba(0,0,0,0.28)] backdrop-blur-md"
                            >
                                <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#D4A574]">Chapter transition</p>
                                <p className="mt-4 text-[26px] font-black leading-[1.02] tracking-[-0.04em] text-[#FBF7EF] sm:text-[34px]">
                                    The outside stays visual.
                                    <br />
                                    The inside becomes legible.
                                </p>
                                <p className="mt-4 max-w-[22rem] text-[14px] leading-[1.8] text-white/62">
                                    Not a scorecard. A route through posture, cueing, tension, arrival, and the exact structure shaping perception.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-16 grid gap-px border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {CHAPTER_POINTS.map((item) => (
                        <div key={item.label} className="border border-white/8 bg-white/[0.03] px-5 py-5">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8A8175]">{item.value}</p>
                            <p className="mt-3 text-[13px] font-black uppercase tracking-[0.18em] text-[#FBF7EF]">{item.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
