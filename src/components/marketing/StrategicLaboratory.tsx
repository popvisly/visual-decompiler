'use client';

import { motion } from 'framer-motion';
import { Target, Fingerprint, Landmark, ArrowUpRight } from 'lucide-react';

export default function StrategicLaboratory() {
    const pillars = [
        {
            title: "Evidence-based counsel",
            description: "Replace 'trust us' with 'here is the data'. Show the mechanics, triggers, and semiotic subtext behind every recommendation.",
            icon: <Fingerprint className="w-5 h-5 text-[#BB9E7B]" />,
            label: "01 / ARCHITECTURE"
        },
        {
            title: "Agency delivery layer",
            description: "Client-ready share links and a high-trust interface for delivering strategy. White‑labeling is standard for enterprise partners.",
            icon: <Landmark className="w-5 h-5 text-[#BB9E7B]" />,
            label: "02 / SOVEREIGNTY"
        },
        {
            title: "The calm advisor UX",
            description: "Ditch messy decks. Deliver strategic insights in a high-fashion, high-trust format designed for leadership presentation.",
            icon: <Target className="w-5 h-5 text-[#BB9E7B]" />,
            label: "03 / AUTHENTICITY"
        }
    ];

    return (
        <section className="bg-[#F6F1E7] text-[#1A1A18] py-24 md:py-48 overflow-hidden relative border-t border-[#E7DED1]">
            {/* Fine architectural grid background */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none [background-image:linear-gradient(#E7DED1_1px,transparent_1px),linear-gradient(90deg,#E7DED1_1px,transparent_1px)] [background-size:100px_100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-start">

                    {/* Left: Dramatic Typography Column */}
                    <div className="w-full lg:w-[45%] lg:sticky lg:top-48">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="w-8 h-[1px] bg-[#BB9E7B]" />
                            <span className="text-[#BB9E7B] text-[11px] font-bold tracking-[0.4em] uppercase">
                                Infrastructure for elite agencies
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-8xl font-semibold leading-[0.9] tracking-tightest uppercase mb-10"
                        >
                            The Strategic<br />
                            <span className="text-[#BB9E7B]">Laboratory</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="max-w-md space-y-6"
                        >
                            <p className="text-xl text-[#1A1A18]/80 leading-relaxed font-medium">
                                Your agency's value isn't just creative—it's <span className="text-[#1A1A18] font-bold">intelligence</span>.
                                We provide the sovereign infrastructure to understand & comprehend the architecture of persuasion with forensic precision.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: Specimen Pillar Cards */}
                    <div className="w-full lg:w-[55%] lg:pl-12 space-y-6">
                        {pillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx, duration: 0.8 }}
                                className={`relative group p-8 md:p-10 rounded-[2.5rem] border border-[#E7DED1] bg-[#FBF7EF]/50 backdrop-blur-xl hover:bg-white transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#BB9E7B]/5 ${idx === 1 ? 'lg:ml-8' : idx === 2 ? 'lg:ml-16' : ''
                                    }`}
                            >
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-[#E7DED1] shadow-sm">
                                                {pillar.icon}
                                            </div>
                                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#BB9E7B]">
                                                {pillar.label}
                                            </span>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-[#1A1A18]/20 group-hover:text-[#BB9E7B] transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-semibold uppercase tracking-tight mb-4 text-[#1A1A18]">
                                        {pillar.title}
                                    </h3>

                                    <p className="text-lg text-[#6B6B6B] font-medium leading-relaxed group-hover:text-[#1A1A18] transition-colors duration-500">
                                        {pillar.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
