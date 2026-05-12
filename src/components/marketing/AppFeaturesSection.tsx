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
                                    className="group relative bg-white p-8 transition-colors hover:bg-[#FBFBF6] xl:p-10"
                                >
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBFBF6] text-[#8B6A3D] shadow-inner transition-colors group-hover:bg-white group-hover:shadow-sm">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D]">{feature.label}</p>
                                        <div className="h-px flex-1 bg-gradient-to-r from-black/5 to-transparent" />
                                    </div>
                                    <h3 className="text-[18px] font-semibold uppercase leading-tight tracking-tight text-[#141414]">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-3 text-[15px] leading-[1.65] text-[#6B6B6B]">
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
