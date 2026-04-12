'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Database, Activity, Layers, Settings, Users } from 'lucide-react';

const PLATFORM_FEATURES = [
    {
        icon: Database,
        label: 'Intelligence Vault',
        detail: 'Every dossier stored. Every analysis retrievable. Search across campaigns, clients, and creative tactics to surface pattern intelligence.',
    },
    {
        icon: Activity,
        label: 'Intelligence Pulse',
        detail: 'Category-level persuasion data. See which mechanics dominate your space, where the blind spots are, and what gaps you can exploit.',
    },
    {
        icon: Layers,
        label: 'Sovereign Boards',
        detail: 'Group assets into boards for campaign reviews, client threads, or creative sprints. Keep the intelligence active, not archived.',
    },
    {
        icon: Settings,
        label: 'Agency Settings & Team',
        detail: 'White-label controls, brand guidelines, seats and permissions. Present VD intelligence under your own agency authority.',
    },
];

export default function PlatformLayer() {
    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] pt-6 lg:pt-8 pb-24 lg:pb-32 overflow-hidden" data-presence-tone="light">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 lg:mb-24"
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        Platform
                    </p>
                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#141414] max-w-[12ch] mb-10">
                        Intelligence <span className="text-[#C1A674]">compounds.</span>
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#6B6B6B] max-w-[560px]">
                        Single analyses are powerful. But the real advantage comes when every read becomes part of a growing, searchable intelligence layer your team builds on.
                    </p>
                </motion.div>

                {/* Features */}
                <div className="space-y-0">
                    {PLATFORM_FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="border-t border-[#E7DED1] py-12 lg:py-16 last:border-b"
                        >
                            <div className="flex items-start gap-5">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-[#E7DED1] bg-white text-[#C1A674] shrink-0">
                                    <feature.icon size={20} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-[20px] font-black leading-[1.1] tracking-[-0.01em] text-[#141414] mb-3">
                                        {feature.label}
                                    </h3>
                                    <p className="text-[15px] leading-[1.7] text-[#6B6B6B] max-w-[520px]">
                                        {feature.detail}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
