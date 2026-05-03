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
        id: 'decision',
        label: 'Decision read',
        title: 'Definitive Verdict',
        desc: 'A clear recommendation, confidence signal, and risk/reward tension.',
        icon: Fingerprint,
    },
    {
        id: 'anchors',
        label: 'Evidence anchors',
        title: 'Visual Proof',
        desc: 'Specific visual claims tied back to what is actually present in the asset.',
        icon: FileSearch,
    },
    {
        id: 'vault',
        label: 'Reusable artifact',
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
                    className="mb-20"
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.article
                                key={feature.id}
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={prefersReducedMotion ? undefined : { duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative flex flex-col justify-between rounded-[2rem] border border-black/5 bg-white p-7 transition-all hover:border-[#D4A574]/30 hover:shadow-xl hover:shadow-[#D4A574]/5"
                            >
                                <div>
                                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBFBF6] text-[#8B6A3D] transition-colors group-hover:bg-[#8B6A3D] group-hover:text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D]">{feature.label}</p>
                                    <h3 className="mt-4 text-[18px] font-semibold uppercase leading-tight tracking-tight text-[#141414]">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B]">
                                        {feature.desc}
                                    </p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-black/5 opacity-0 transition-opacity group-hover:opacity-100">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B6A3D] italic">Forensic Module Active</p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
