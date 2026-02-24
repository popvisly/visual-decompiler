'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const PERSONAS = [
    {
        category: "C-LEVELS",
        roles: "CEO, CMO, CIO, CDO...",
        image: "/images/personas/c-levels.png",
        color: "#BB9E7B"
    },
    {
        category: "CREATIVES",
        roles: "Art Directors, Advertising Agencies, Graphic Designers, Product and Insights Managers...",
        image: "/images/personas/creatives.png",
        color: "#BB9E7B"
    },
    {
        category: "ANALYTICS",
        roles: "Business Intelligence, Merchandisers, Buyers, Collection Directors, Retail Merchandisers...",
        image: "/images/personas/analytics.png",
        color: "#BB9E7B"
    },
    {
        category: "COMMUNICATORS",
        roles: "Marketing, Visual Merchandisers, Communication...",
        image: "/images/personas/communicators.png",
        color: "#BB9E7B"
    }
];

export default function PersonaGrid() {
    return (
        <section className="bg-[#F6F1E7] py-24 md:py-48 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
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

                            {/* Specific Roles */}
                            <p className="text-[13px] text-[#6B6B6B] leading-relaxed max-w-[240px] font-medium tracking-tight">
                                {persona.roles}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
