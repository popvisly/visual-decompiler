'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowRight, Package, Box, Search, Activity, ShieldCheck, Lock } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Link from 'next/link';

const SCHEMA_LAYERS = [
    { name: "meta", type: "System Metadata", desc: "Version, brand detection, and trend velocity." },
    { name: "classification", type: "Strategic DNA", desc: "Trigger mechanics and weighted persuasion stacks." },
    { name: "extraction", type: "Forensic Evidence", desc: "Coordinates-aware Receipts and Scan Path." },
    { name: "strategy", type: "Tactical Operations", desc: "Test Plan Builder and Competitive Intelligence." },
    { name: "diagnostics", type: "Actionable Levers", desc: "Friction analysis, platform fitness, and risk assessment." }
];

const RELATED_ARTICLES = [
    { title: "Visual Decompiler v2.0 Overview", href: "/docs/v1-overview" },
    { title: "ResultsView User Guide", href: "/docs/user-guide" },
    { title: "QA Checklist", href: "/docs/qa-checklist" },
    { title: "v2.0 Release Notes", href: "/docs/release-notes" }
];

export default function SchemaContractPage() {
    return (
        <main className="bg-[#141414] min-h-screen text-white">
            <UnifiedSovereignHeader forceDark={true} />
            <section className="pt-48 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B]">
                        <Link href="/docs" className="hover:text-white transition-colors">Help Center</Link>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-white/60">Schema Contract</span>
                    </div>

                    <div className="mb-20">
                        <h1 className="text-5xl font-light tracking-tightest text-white mb-6 uppercase">
                            Schema Contract v2.0 <br />
                            <span className="italic font-serif lowercase tracking-normal text-accent">Sovereign Intelligence SPEC</span>
                        </h1>
                        <p className="text-xl text-white/50 font-light leading-relaxed max-w-2xl">
                            Defining the formal data structure for the v2.0 forensic engine.
                            Powered by Claude 3.5 Sonnet and SHA-256 hash integrity.
                        </p>
                    </div>

                    <div className="space-y-4 mb-32">
                        {SCHEMA_LAYERS.map((layer, idx) => (
                            <div key={idx} className="flex items-center justify-between p-8 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                                <div>
                                    <span className="text-accent text-[9px] font-bold uppercase tracking-widest mb-1 block">{layer.type}</span>
                                    <h3 className="text-2xl font-light text-white tracking-tight">digest.<span className="text-accent">{layer.name}</span></h3>
                                </div>
                                <p className="text-right text-sm text-white/40 font-light max-w-xs">{layer.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-12 bg-accent/5 rounded-[3rem] border border-accent/20">
                        <div className="flex items-center gap-4 mb-10">
                            <Lock className="w-6 h-6 text-accent" />
                            <h2 className="text-2xl font-light uppercase tracking-tight">Non-Negotiable Invariants</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Asset Hash Integrity</h3>
                                <p className="text-sm text-white/60 leading-relaxed font-light">
                                    All assets are fingerprinted via SHA-256 hashing.
                                    The engine will automatically bypass processing if a matching hash is detected in the vault.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Risk Granularity</h3>
                                <p className="text-sm text-white/60 leading-relaxed font-light">
                                    Every RiskFlag MUST contain severity, strategic rationale (why), and linked receipt references.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 p-12 bg-white/5 rounded-[3rem] border border-white/10 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Code className="w-5 h-5 text-accent" />
                            <h2 className="text-xl font-light uppercase tracking-tight text-white">Development Integration</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4">CI/CD Validation</h3>
                                <p className="text-[13px] text-white/50 font-light leading-relaxed">
                                    Integrate the `zod` schema from this contract into your ingestion worker's pull request workflow to prevent breaking downstream analytical models.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4">API Synchronization</h3>
                                <p className="text-[13px] text-white/50 font-light leading-relaxed">
                                    Ensure all frontend diagnostic components (`ResultsView`, `PlatformFitness`) are scoped to the `v2.0` namespace for Sovereign Intelligence compatibility.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Related Articles ── */}
                    <div className="pt-20 mt-32 border-t border-white/10">
                        <h2 className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 mb-8">Related articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {RELATED_ARTICLES.map((article) => (
                                <Link
                                    key={article.title}
                                    href={article.href}
                                    className="group flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-accent transition-all"
                                >
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-white group-hover:text-accent transition-colors">{article.title}</span>
                                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-accent transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
