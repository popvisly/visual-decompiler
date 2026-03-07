'use client';

import { motion } from 'framer-motion';
import { Database, Search, Layout, FileText } from 'lucide-react';

const PILLARS = [
    {
        icon: <Database className="w-6 h-6" />,
        subtext: "Sovereign Memory & Hashing",
        title: "The Intelligence Vault",
        copy: "A private, searchable database where your agency indexes all parsed assets. Powered by SHA-256 deduplication to ensure you never burn neural credits analyzing the exact same asset twice."
    },
    {
        icon: <Search className="w-6 h-6" />,
        subtext: "Single-Asset Deconstruction",
        title: "Forensic Extraction",
        copy: "Ingest a static asset and deconstruct the semiotic subtext, trigger mechanics, and evidence anchors using our optimized Claude 3.5 Sonnet neural pipeline."
    },
    {
        icon: <Layout className="w-6 h-6" />,
        subtext: "Execution Ready",
        title: "Production Blueprints",
        copy: "Don't just analyze the past; build the future. The OS automatically generates verified DNA prompts and structural pacing guides to eliminate subjective interpretation for your art directors."
    },
    {
        icon: <FileText className="w-6 h-6" />,
        subtext: "White-Labeled Delivery",
        title: "The Boardroom Artifact",
        copy: "Strategy only matters if you can sell it. Export your intelligence as a high-fashion, white-labeled \"Strategic Dossier\" (PDF) that dynamically injects your agency's hex codes and branding."
    }
];

export default function IntelligenceEcosystem() {
    return (
        <section className="bg-[#F6F1E7] border-y border-[#141414]/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {PILLARS.map((pillar, idx) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className={`
                                p-12 lg:p-16 border-[#141414]/10
                                ${idx === 0 ? 'border-b md:border-r' : ''}
                                ${idx === 1 ? 'border-b' : ''}
                                ${idx === 2 ? 'border-b md:border-b-0 md:border-r' : ''}
                                group hover:bg-white/40 transition-colors duration-500
                            `}
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center justify-between">
                                    <div className="p-4 bg-[#141414] text-white rounded-2xl shadow-xl shadow-[#141414]/10 group-hover:scale-110 transition-transform duration-500">
                                        {pillar.icon}
                                    </div>
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#141414]/30 group-hover:text-[#C1A67B] transition-colors">
                                        PILLAR_{idx + 1}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <span className="text-[11px] font-bold text-[#C1A67B] uppercase tracking-[0.2em]">
                                            {pillar.subtext}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-semibold text-[#141414] tracking-tightest uppercase">
                                            {pillar.title}
                                        </h3>
                                    </div>
                                    <p className="text-base md:text-lg text-[#141414]/60 leading-relaxed font-medium max-w-md">
                                        {pillar.copy}
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <div className="inline-flex h-[1px] w-12 bg-[#141414]/20 group-hover:w-24 group-hover:bg-[#C1A67B] transition-all duration-700" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
