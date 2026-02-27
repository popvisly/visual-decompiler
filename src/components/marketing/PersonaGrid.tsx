'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const PERSONAS = [
    {
        category: "THE STRATEGISTS",
        objective: "Market Intelligence & Narrative Mapping",
        roles: "For CMOs and Brand Leads who require a high-level view of the competitive landscape. Use the engine to deconstruct the visual DNA of market shifts, identify emerging semiotic patterns, and map the \"invisible\" mechanics of persuasion used by competitors to command market share.",
        image: "/images/personas/c-levels.png",
        color: "#BB9E7B"
    },
    {
        category: "THE OPTIMIZERS",
        objective: "Performance Lifting & Variable Isolation",
        roles: "For Growth and UA Specialists who manage high-stakes ad spend. Isolate the specific psychological triggers and \"Evidence Anchors\" that correlate with conversion. Move beyond creative guesswork by using forensic deconstruction to identify why specific assets scale while others fail.",
        image: "/images/personas/analytics.png",
        color: "#BB9E7B"
    },
    {
        category: "THE DIRECTORS",
        objective: "Creative Translation & Briefing Precision",
        roles: "For Creative Directors and Art Directors who bridge the gap between data and execution. Decompile winning references into objective, technical blueprints. Use the tool's analytics to provide production teams with high-fidelity briefs that eliminate subjective interpretation and creative drift.",
        image: "/images/personas/creatives.png",
        color: "#BB9E7B"
    }
];

export default function PersonaGrid() {
    return (
        <section className="bg-[#F6F1E7] py-24 md:py-48 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24 md:mb-32 space-y-8">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#BB9E7B]">Competitive Intelligence</span>
                        <h2 className="text-4xl md:text-7xl font-semibold text-[#1A1A18] tracking-tightest uppercase leading-[0.9]">
                            Built for every stage<br />
                            <span className="text-[#BB9E7B]">of the Strategy Loop.</span>
                        </h2>
                    </div>
                    <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed font-medium">
                        From C-suite macro intelligence to creative execution and pulse-monitoring.
                        A unified platform to deconstruct, synthesize, and outpace the market.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {PERSONAS.map((persona, idx) => (
                        <motion.div
                            key={persona.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Arched Image Container */}
                            <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden rounded-t-[10rem] group">
                                <Image
                                    src={persona.image}
                                    alt={persona.category}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-700" />
                            </div>

                            {/* Persona Pill Label */}
                            <div className="inline-block bg-[#FBF7EF] px-8 py-2.5 rounded-full border border-[#E7DED1] mb-6 shadow-sm">
                                <span
                                    className="text-[10px] font-bold tracking-[0.3em] uppercase"
                                    style={{ color: persona.color }}
                                >
                                    {persona.category}
                                </span>
                            </div>

                            {/* Objective & Description */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[11px] font-bold text-[#1A1A18] tracking-widest uppercase">
                                    Objective: {persona.objective}
                                </h3>
                                <p className="text-[13px] text-[#6B6B6B] leading-relaxed max-w-[320px] mx-auto font-medium tracking-tight">
                                    {persona.roles}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
