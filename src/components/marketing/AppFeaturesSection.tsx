'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BarChart3, Fingerprint, FileSearch, History, Target, MousePointer2, Archive } from 'lucide-react';
import MarketingSectionHeading from '@/components/marketing/MarketingSectionHeading';

const FEATURES = [
    {
        id: 'scores',
        label: 'Scores',
        title: 'Primary Scores',
        desc: 'Quantified reads for clarity, attention, cohesion, intent, and distinction.',
        icon: BarChart3,
    },
    {
        id: 'path',
        label: 'Path',
        title: 'Attention Path',
        desc: 'A sequenced read of where the eye enters, travels, and drops away.',
        icon: MousePointer2,
    },
    {
        id: 'strategy',
        label: 'Strategy',
        title: 'Strategic Read',
        desc: 'The thesis, trigger mechanic, friction points, and defensible direction.',
        icon: Target,
    },
    {
        id: 'record',
        label: 'Record',
        title: 'Decision Log',
        desc: 'A captured verdict with rationale, evidence, and next-action language.',
        icon: History,
    },
    {
        id: 'anchors',
        label: 'Anchors',
        title: 'Visual Proof',
        desc: 'Specific visual claims tied back to what is actually present in the asset.',
        icon: FileSearch,
    },
    {
        id: 'vault',
        label: 'Memory',
        title: 'Compounding Vault',
        desc: 'A saved dossier your team can revisit, compare, export, and defend later.',
        icon: Archive,
    },
];

export default function AppFeaturesSection() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-24 text-[#141414] lg:py-32">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                
                <MarketingSectionHeading 
                    kicker="Forensic Inventory"
                    title="What’s inside the dossier."
                    description="Every analysis yields a multi-layered artifact designed to travel into decks, client rooms, and team alignment sessions."
                    className="mb-16 lg:mb-24"
                />

                {/* Forensic Grid Layout */}
                <div className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-black/5 shadow-sm">
                    <div className="grid gap-[1px] sm:grid-cols-2 lg:grid-cols-3">
                        {FEATURES.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <motion.article
                                    key={feature.id}
                                    initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    className="group relative overflow-hidden bg-white p-8 transition-colors duration-500 hover:bg-[#FAFAF5] xl:p-10"
                                >
                                    {/* Subtle interactive sheen */}
                                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#8B6A3D]/[0.03] to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                                    
                                    <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBFBF6] text-[#8B6A3D] shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-white group-hover:shadow-[0_8px_16px_rgba(139,106,61,0.08)]">
                                        <Icon className="h-5 w-5 transition-transform duration-500 ease-out group-hover:scale-110" />
                                    </div>
                                    <div className="relative z-10 flex items-center gap-3 mb-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D] transition-colors duration-500">{feature.label}</p>
                                        <div className="h-px flex-1 bg-gradient-to-r from-black/5 to-transparent transition-all duration-500 group-hover:from-[#8B6A3D]/20" />
                                    </div>
                                    <h3 className="relative z-10 text-[18px] font-semibold uppercase leading-tight tracking-tight text-[#141414] transition-colors duration-500">
                                        {feature.title}
                                    </h3>
                                    <p className="relative z-10 mt-3 text-[15px] leading-[1.65] text-[#6B6B6B] transition-colors duration-500 group-hover:text-[#4A4A4A]">
                                        {feature.desc}
                                    </p>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
