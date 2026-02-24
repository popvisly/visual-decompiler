'use client';

import { motion } from 'framer-motion';
import { Target, Fingerprint, Landmark, ArrowUpRight } from 'lucide-react';

export default function StrategicLaboratory() {
    const pillars = [
        {
            title: "Evidence-based counsel",
            description: "Replace 'trust us' with 'here is the data'. Show the mechanics, triggers, and semiotic subtext behind every recommendation.",
            icon: <Fingerprint className="w-5 h-5 text-accent" />,
            label: "01 / ARCHITECTURE"
        },
        {
            title: "Agency delivery layer",
            description: "Client-ready share links and a high-trust interface for delivering strategy. White‑labeling is standard for enterprise partners.",
            icon: <Landmark className="w-5 h-5 text-accent" />,
            label: "02 / SOVEREIGNTY"
        },
        {
            title: "The calm advisor UX",
            description: "Ditch messy decks. Deliver strategic insights in a high-fashion, high-trust format designed for leadership presentation.",
            icon: <Target className="w-5 h-5 text-accent" />,
            label: "03 / AUTHENTICITY"
        }
    ];

    return (
        <section className="bg-[#141414] text-[#FBF7EF] py-24 md:py-48 overflow-hidden relative">
            {/* Fine architectural grid background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(rgba(251,247,239,1)_1px,transparent_1px),linear-gradient(90deg,rgba(251,247,239,1)_1px,transparent_1px)] [background-size:100px_100px]" />

            {/* Subtle glow / light leak */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

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
                            <div className="w-8 h-[1px] bg-accent" />
                            <span className="text-accent text-[11px] font-bold tracking-[0.4em] uppercase">
                                Infrastructure for elite agencies
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[12vw] lg:text-[6.5vw] font-light leading-[0.85] tracking-tightest uppercase mb-10"
                        >
                            The Strategic<br />
                            <span className="text-[#FBF7EF] italic font-serif lowercase italic tracking-normal">Laboratory</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="max-w-md space-y-6"
                        >
                            <p className="text-xl text-[#FBF7EF]/80 leading-relaxed font-light">
                                Your agency's value isn't just creative—it's <span className="text-[#FBF7EF] font-medium">intelligence</span>.
                                We provide the sovereign infrastructure to justify your fees with forensic precision.
                            </p>

                            <div className="flex items-center gap-4 py-6 border-y border-white/5">
                                <div className="p-2 bg-accent/20 rounded-full">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                                </div>
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                                    Continuous Signal Extraction Active
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Specimen Pillar Cards */}
                    <div className="w-full lg:w-[55%] lg:pl-12 space-y-6">
                        {pillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30, x: idx % 2 === 0 ? 10 : -10 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx, duration: 0.8 }}
                                className={`relative group p-8 md:p-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.06] transition-all duration-500 overflow-hidden ${idx === 1 ? 'lg:ml-8' : idx === 2 ? 'lg:ml-16' : ''
                                    }`}
                            >
                                {/* Background Accent Glow */}
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center border border-accent/20">
                                                {pillar.icon}
                                            </div>
                                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
                                                {pillar.label}
                                            </span>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>

                                    <h3 className="text-3xl font-light uppercase tracking-tight mb-4 text-[#FBF7EF]">
                                        {pillar.title}
                                    </h3>

                                    <p className="text-lg text-[#FBF7EF]/70 font-light leading-relaxed group-hover:text-[#FBF7EF] transition-colors duration-500">
                                        {pillar.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* Footer: Credibility & CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full bg-[#1A1A1A] border-2 border-[#141414] flex items-center justify-center relative overflow-hidden group/avatar">
                                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                                    <span className="text-[10px] font-bold text-white/40 group-hover/avatar:text-accent transition-colors relative z-10">S{i}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#FBF7EF]">
                                Trusted by Elite Strategy Units
                            </p>
                            <p className="text-[10px] font-medium text-white/30 mt-1 uppercase tracking-widest">
                                ISO-27001 Certified Infrastructure
                            </p>
                        </div>
                    </div>

                    <a
                        href="/app"
                        className="group relative px-12 py-5 bg-[#FBF7EF] text-[#141414] rounded-full text-[12px] font-bold uppercase tracking-widest overflow-hidden transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                    >
                        <span className="relative z-10">Provision your portal</span>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
