'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const PERSONAS = [
    {
        category: "NEW BUSINESS LEAD",
        objective: "Pitch Prep & Competitive Framing",
        roles: "Walk into the pitch with differential proof instead of opinion. Compare competitor assets, isolate the strategic delta, and turn the strongest patterns into client-facing ammunition.",
        image: "/images/personas/c-levels.png",
        color: "#C1A67B"
    },
    {
        category: "STRATEGY DIRECTOR",
        objective: "Landscape Mapping & Mechanic Intelligence",
        roles: "Use the Intelligence Vault as a living competitive archive. Track recurring trigger mechanics, semiotic codes, and category shifts across brands before they become mainstream.",
        image: "/images/personas/analytics.png",
        color: "#C1A67B"
    },
    {
        category: "CREATIVE DIRECTOR",
        objective: "Creative Translation & Blueprint Precision",
        roles: "Translate winning references into technical direction the team can actually build from. Move from taste-based interpretation to concrete production cues, narrative mechanics, and execution-ready briefs.",
        image: "/images/personas/creatives.png",
        color: "#C1A67B"
    }
];

export default function PersonaGrid() {
    return (
        <section className="bg-[#141414] py-32 md:py-40 px-6 border-t border-white/5">
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.018] pointer-events-none [background-image:linear-gradient(#FBF7EF_1px,transparent_1px),linear-gradient(90deg,#FBF7EF_1px,transparent_1px)] [background-size:100px_100px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-24 md:mb-32 space-y-8">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#C1A67B]">
                            Who Deploys It
                        </span>
                        <h2 className="text-4xl md:text-7xl font-semibold text-[#FBF7EF] tracking-tightest uppercase leading-[0.9]">
                            Built for the people
                            <br />
                            <span className="text-[#C1A67B]">who turn reference into advantage.</span>
                        </h2>
                    </div>
                    <p className="text-base md:text-lg text-[#FBF7EF]/40 max-w-2xl mx-auto leading-relaxed font-medium">
                        From pitch preparation to market mapping to creative direction, each view turns invisible persuasion structure into something an agency team can use immediately.
                    </p>
                </div>

                {/* Persona Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {PERSONAS.map((persona, idx) => (
                        <motion.div
                            key={persona.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Arched Image */}
                            <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden rounded-t-[10rem]">
                                <Image
                                    src={persona.image}
                                    alt={persona.category}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Dark vignette on dark bg — subtler */}
                                <div className="absolute inset-0 bg-[#141414]/15 group-hover:bg-transparent transition-all duration-700" />
                            </div>

                            {/* Category pill */}
                            <div className="inline-block bg-[#1C1C1A] px-8 py-2.5 rounded-full border border-white/8 mb-6 group-hover:border-[#C1A67B]/30 transition-colors duration-300">
                                <span
                                    className="text-[10px] font-bold tracking-[0.3em] uppercase"
                                    style={{ color: persona.color }}
                                >
                                    {persona.category}
                                </span>
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[11px] font-bold text-[#FBF7EF]/70 tracking-widest uppercase">
                                    Objective: {persona.objective}
                                </h3>
                                <p className="text-[13px] text-[#FBF7EF]/35 leading-relaxed max-w-[320px] mx-auto font-medium tracking-tight group-hover:text-[#FBF7EF]/55 transition-colors duration-500">
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
