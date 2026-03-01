'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Rocket, ShieldCheck, Target, TrendingUp } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Link from 'next/link';

const HIGHLIGHTS = [
    {
        title: "Forensic Evidence Infrastructure",
        icon: <ShieldCheck className="w-5 h-5 text-accent" />,
        items: ["Coordinates-as-Code (0-1000 scale)", "Deep OCR extraction for brand copy"]
    },
    {
        title: "Operational Test Planning",
        icon: <Target className="w-5 h-5 text-accent" />,
        items: ["14-Day Tactical Sprintroadmaps", "Archetype-driven variant matrix"]
    },
    {
        title: "Platform & Compliance",
        icon: <Rocket className="w-5 h-5 text-accent" />,
        items: ["Interactive Safe Zones", "Explainable Risk Analysis flags"]
    },
    {
        title: "Competitive Intelligence",
        icon: <TrendingUp className="w-5 h-5 text-accent" />,
        items: ["Nearest-Neighbor Analysis", "Strategic Shift roadmaps"]
    }
];

const RELATED_ARTICLES = [
    { title: "Visual Decompiler v1.0 Overview", href: "/docs/v1-overview" },
    { title: "ResultsView User Guide", href: "/docs/user-guide" },
    { title: "QA Checklist", href: "/docs/qa-checklist" },
    { title: "Schema Contract v1.0", href: "/docs/schema-contract" }
];

export default function ReleaseNotesPage() {
    return (
        <main className="bg-[#F6F1E7] min-h-screen">
            <UnifiedSovereignHeader />
            <section className="pt-48 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B]">
                        <Link href="/docs" className="hover:text-[#141414] transition-colors">Help Center</Link>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-[#141414]">Release Notes</span>
                    </div>

                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-accent text-[9px] font-bold uppercase tracking-widest">v1.0 — Agency-Grade</div>
                        </div>
                        <h1 className="text-5xl font-light tracking-tightest text-[#141414] mb-6 uppercase">
                            Milestone Update: <br />
                            <span className="italic font-serif lowercase tracking-normal text-accent">The Forensic Shift</span>
                        </h1>
                        <p className="text-xl text-[#6B6B6B] font-light leading-relaxed max-w-2xl">
                            Transforming the Visual Decompiler from research tool into an auditable forensic execution engine.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {HIGHLIGHTS.map((h, idx) => (
                            <div key={idx} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white border border-[#E7DED1] rounded-2xl text-[#141414]">
                                        {h.icon}
                                    </div>
                                    <h2 className="text-lg font-light text-[#141414] uppercase tracking-tight">{h.title}</h2>
                                </div>
                                <ul className="space-y-3">
                                    {h.items.map((item, iIdx) => (
                                        <li key={iIdx} className="flex gap-2 items-center text-sm text-[#6B6B6B] font-light">
                                            <div className="w-1 h-1 rounded-full bg-accent" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-32 pt-16 border-t border-[#E7DED1] flex flex-col items-center text-center">
                        <Sparkles className="w-10 h-10 text-accent mb-6" />
                        <h2 className="text-2xl font-light uppercase tracking-tight text-[#141414] mb-4">Stable Standard v2.2</h2>
                        <p className="text-sm text-[#6B6B6B] font-light mb-8 max-w-lg">
                            This release formalizes the AdDigest schema (v2.2) and integrates strict typing across the entire tactical dashboard.
                        </p>
                        <Link href="/docs/schema-contract" className="text-[10px] font-bold uppercase tracking-widest text-[#141414] border-b-2 border-[#141414]/10 hover:border-accent transition-all pb-1">
                            View technical specification
                        </Link>
                    </div>

                    {/* ── Related Articles ── */}
                    <div className="pt-20 mt-32 border-t border-[#E7DED1]">
                        <h2 className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#6B6B6B] mb-8">Related articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {RELATED_ARTICLES.map((article) => (
                                <Link
                                    key={article.title}
                                    href={article.href}
                                    className="group flex items-center justify-between p-6 bg-white border border-[#E7DED1] rounded-2xl hover:border-accent transition-all"
                                >
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#141414] group-hover:text-accent transition-colors">{article.title}</span>
                                    <ArrowRight className="w-4 h-4 text-[#6B6B6B] group-hover:text-accent transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
