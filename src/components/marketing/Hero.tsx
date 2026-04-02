'use client';

import { motion } from 'framer-motion';

type Props = {
    eyebrow?: string;
    headline?: string;
    subhead?: string;
};

export default function Hero({
    eyebrow = 'Strategic Architecture',
}: Props) {
    return (
        <section className="relative z-20 mt-8 scroll-mt-20 overflow-hidden rounded-t-[32px] bg-transparent pb-14 pt-16 text-[#141414] md:mt-10 md:scroll-mt-24 md:rounded-t-[44px] md:pb-16 md:pt-20 lg:mt-12 lg:scroll-mt-[104px] lg:rounded-t-[56px] lg:pb-20 lg:pt-24">
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="rounded-[2.25rem] border border-[#D9CCB8] bg-[rgba(255,251,244,0.78)] px-6 py-8 shadow-[0_24px_56px_rgba(20,20,20,0.05)] backdrop-blur-[2px] md:px-8 md:py-9">
                    <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-12">
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
                                Strategy beyond the
                                <span className="mt-2 block text-[#D7B07A]">creative surface.</span>
                            </h2>

                            <p className="mt-5 max-w-lg text-[15px] font-medium leading-[1.65] text-[#4F4941] md:text-[17px]">
                                Visual Decompiler maps the hidden persuasion architecture that drives category movement — from high-concept prestige storytelling to utility-led performance.
                            </p>
                        </motion.div>

                        <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
                            {[
                                { label: 'Signals', body: 'Trigger distribution, friction points, and narrative pressure in one strategic readout.' },
                                { label: 'Mechanics', body: 'Dominant persuasion system, blueprint logic, and the structure behind response.' },
                                { label: 'Vault', body: 'A compounding intelligence memory that sharpens with every asset you deconstruct.' }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                                    className="rounded-[1.6rem] border border-[#D3C4AD] bg-[#FBFBF6] p-6 text-left shadow-[0_18px_36px_rgba(20,20,20,0.06)]"
                                >
                                    <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">{item.label}</p>
                                    <p className="text-[14px] font-medium leading-relaxed text-[#504A41]">{item.body}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
