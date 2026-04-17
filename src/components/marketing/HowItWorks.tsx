'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
    return (
        <section className="relative bg-[#0B0B0B] text-[#F6F1E7] py-32 lg:py-48 overflow-hidden" data-presence-tone="dark">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        Core Value
                    </p>
                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#F6F1E7] max-w-[14ch] mb-10">
                        Make the work make sense.
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#9a9a94] max-w-[520px]">
                        Creative work doesn't fail because it's bad.
                        <br />
                        <br />
                        It fails because it can't be explained.
                        <br />
                        <br />
                        Visual Decompiler turns instinct into structured reasoning — so clients understand, align, and approve.
                    </p>
                </motion.div>

                <div className="mt-20 mb-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-4">How it works</p>
                    <p className="text-[34px] font-black uppercase tracking-[-0.03em] text-[#F6F1E7]">From concept to conviction.</p>
                </div>

                <div className="mt-0 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12">
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
                                    <h3 className="text-[18px] font-black uppercase tracking-[-0.01em] text-[#F6F1E7] mb-2">{step.title}</h3>
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
