'use client';

import { motion } from 'framer-motion';

type Props = {
    eyebrow?: string;
    headline?: string;
    subhead?: string;
};

const PILLARS = [
    {
        label: 'Mechanic Extraction',
        body: 'Decode the persuasion mechanisms driving response.',
    },
    {
        label: 'Execution DNA',
        body: 'Surface compositional, chromatic, gaze, and hierarchy conditions.',
    },
    {
        label: 'Stress Tests',
        body: 'Controlled variable shifts to reveal causal creative leverage.',
    },
    {
        label: 'Constraint Map',
        body: 'Define non-negotiables, avoidances, and safe adaptation boundaries.',
    },
    {
        label: 'Forensic Copy Logic',
        body: 'Diagnose message pressure and clarity, not copy generation tooling.',
    },
    {
        label: 'Market Pulse Context',
        body: 'Benchmark category saturation, novelty, and strategic opportunity.',
    },
] as const;

export default function Hero({
    eyebrow = 'Forensic Creative Intelligence Pillars',
}: Props) {
    return (
        <section className="relative z-20 mt-8 scroll-mt-20 overflow-hidden rounded-t-[32px] bg-transparent pb-14 pt-16 text-[#141414] md:mt-10 md:scroll-mt-24 md:rounded-t-[44px] md:pb-16 md:pt-20 lg:mt-12 lg:scroll-mt-[104px] lg:rounded-t-[56px] lg:pb-20 lg:pt-24">
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="rounded-[2.25rem] border border-[#D9CCB8] bg-[rgba(255,251,244,0.78)] px-6 py-8 shadow-[0_24px_56px_rgba(20,20,20,0.05)] backdrop-blur-[2px] md:px-8 md:py-9">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65 }}
                            className="max-w-xl"
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-px w-8 bg-gradient-to-r from-[#D4A574] to-transparent" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B8A47E]">{eyebrow}</p>
                            </div>
                            <div className="mb-5 flex items-center gap-1.5">
                                <span className="h-1.5 w-8 rounded-full bg-[#F4A700]" />
                                <span className="h-1.5 w-5 rounded-full bg-[#C8230A]" />
                                <span className="h-1.5 w-4 rounded-full bg-[#D4A574]" />
                                <span className="h-1.5 w-3 rounded-full bg-[#F5EDE3]" />
                                <span className="h-1.5 w-5 rounded-full bg-[#D7B07A]" />
                            </div>

                            <h2 className="max-w-xl text-[30px] font-bold leading-[1.04] tracking-tight text-[#141414] md:text-[38px]">
                                Forensic creative intelligence
                                <span className="mt-2 block text-[#D7B07A]">that judges quality.</span>
                            </h2>

                            <p className="mt-5 max-w-lg text-[15px] font-medium leading-[1.65] text-[#474238] md:text-[17px]">
                                We don’t generate ads. We judge, diagnose, and direct quality. Visual Decompiler is the forensic layer for creative mechanism, execution risk, and decision-ready strategic direction.
                            </p>

                            <a
                                href="/ingest"
                                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#141414] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FBF7EF] shadow-[0_16px_34px_rgba(20,20,20,0.18)] transition hover:bg-black md:px-8"
                            >
                                Run a forensic readout
                            </a>
                        </motion.div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 lg:gap-5">
                            {PILLARS.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                                    className="rounded-[1.6rem] border border-[#D3C4AD] bg-[#FBFBF6] p-6 text-left shadow-[0_18px_36px_rgba(20,20,20,0.06)]"
                                >
                                    <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">{item.label}</p>
                                    <p className="text-[14px] font-medium leading-relaxed text-[#474238]">{item.body}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
