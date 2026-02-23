'use client';

import { motion } from 'framer-motion';
import { Sparkles, Microscope, ShieldCheck } from 'lucide-react';

export default function StrategicLaboratory() {
    const pillars = [
        {
            title: "Evidence-based counsel",
            description: "Replace 'trust us' with 'here is the data'. Show the mechanics, triggers, and semiotic subtext behind every recommendation.",
            icon: <Microscope className="w-6 h-6 text-accent" />,
            label: "PROOF, NOT OPINION"
        },
        {
            title: "Agency delivery layer (optional)",
            description: "Client-ready share links and a high-trust interface for delivering strategy. White‑labeling is available as it rolls out.",
            icon: <Sparkles className="w-6 h-6 text-accent" />,
            label: "CLIENT DELIVERY"
        },
        {
            title: "The calm advisor UX",
            description: "Ditch messy decks. Deliver strategic insights in a high-fashion, high-trust format that holds up in a room.",
            icon: <ShieldCheck className="w-6 h-6 text-accent" />,
            label: "HIGH-TRUST PRESENTATION"
        }
    ];

    return (
        <section className="bg-[#141414] text-[#FBF7EF] py-32 md:py-48 overflow-hidden relative">
            {/* Fine line background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none [background-image:linear-gradient(rgba(251,247,239,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(251,247,239,0.1)_1px,transparent_1px)] [background-size:64px_64px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                    {/* Massive Typography Side */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-accent text-[12px] font-bold tracking-[0.4em] uppercase mb-8"
                        >
                            Strategic Infrastructure
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tightest uppercase"
                        >
                            The Strategic<br />
                            <span className="text-[#6B6B6B]">Laboratory</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-[#6B6B6B] mt-12 max-w-xl leading-relaxed"
                        >
                            Your agency's value isn't just creative—it's intelligence.
                            We provide the white-labeled infrastructure to justify your fees with scientific precision.
                        </motion.p>
                    </div>

                    {/* Pillars Side */}
                    <div className="space-y-16">
                        {pillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-accent/50 transition-colors">
                                        {pillar.icon}
                                    </div>
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent/60">
                                        {pillar.label}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-light uppercase tracking-tight mb-4">
                                    {pillar.title}
                                </h3>
                                <p className="text-lg text-[#6B6B6B] leading-relaxed group-hover:text-[#FBF7EF]/70 transition-colors">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* Bottom Graphic / CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-32 pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-[#6B6B6B]/20 border border-[#141414] flex items-center justify-center text-[10px] font-bold">
                                    C{i}
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] font-bold tracking-widest uppercase text-[#6B6B6B]">
                            Deployed by elite agencies worldwide
                        </p>
                    </div>
                    <a
                        href="/app"
                        className="px-8 py-4 bg-[#FBF7EF] text-[#141414] rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all active:scale-95"
                    >
                        Provision your portal
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
