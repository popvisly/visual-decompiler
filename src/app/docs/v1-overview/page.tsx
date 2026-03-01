'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Info,
    CheckCircle2,
    Users,
    BookOpen,
    ArrowRight,
    ShieldCheck,
    Activity,
    Target,
    Layers,
    FileText
} from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Link from 'next/link';

const SECTIONS = [
    {
        icon: <Layers className="w-5 h-5 text-accent" />,
        title: "Receipts (Auditable Evidence)",
        content: "Visual anchors and OCR/text snippets that back strategic claims. Designed for cross-team alignment: strategists, creatives, and reviewers can reference the same evidence."
    },
    {
        icon: <Activity className="w-5 h-5 text-accent" />,
        title: "Platform Integrity Diagnostics",
        content: "Safe-zone overlays for major social platforms (e.g., Instagram, TikTok). Aspect ratio survivability insights to predict how the creative holds up under crops and UI occlusion."
    },
    {
        icon: <ShieldCheck className="w-5 h-5 text-accent" />,
        title: "Compliance & Policy Risk (Explainable Flags)",
        content: "Compliance risk flags include clear \"why\" triggers so fixes are specific and grounded in policy requirements. Where applicable, flags link back to the supporting Receipts."
    },
    {
        icon: <Target className="w-5 h-5 text-accent" />,
        title: "14-Day Tactical Sprint Plan (Operational Output)",
        content: "A production-ready plan that converts insights into hypotheses, test matrices/variants, and measurement guidance. Built to be executed immediately by a growth or creative testing team."
    }
];

const GUARANTEES = [
    "Auditable evidence: key claims are backed by Receipts (not subjective interpretation).",
    "Deterministic evidence linking: Receipt identifiers are stable (no drifting references).",
    "Explainable risk flags: every risk flag includes an id, severity, and a plain-language why (plus evidence links when available).",
    "Actionability: outputs are designed to become a real testing sprint, not a static report."
];

const TARGET_AUDIENCE = [
    { role: "Strategists", action: "Interpret why a creative works and what to test next." },
    { role: "Creative Teams", action: "Get specific, evidence-linked adjustments (safe zones, copy/claim risks, layout survivability)." },
    { role: "Compliance/Review", action: "See exactly what triggered a risk flag and why." },
    { role: "Growth Teams", action: "Execute the 14-day sprint matrix with clear hypotheses and variants." }
];

const GLOSSARY = [
    { term: "Receipt", def: "Anchored evidence (visual region + OCR snippet) supporting a claim." },
    { term: "Safe Zone", def: "Platform UI overlay regions that can cover key content." },
    { term: "Survivability", def: "How well the creative survives aspect ratio changes and safe-zone occlusion." },
    { term: "Risk Flag", def: "A compliance/policy warning with severity and an explicit explanation (why)." }
];

const RELATED_ARTICLES = [
    { title: "ResultsView Reading Guide", href: "/docs/user-guide" },
    { title: "QA Checklist", href: "/docs/qa-checklist" },
    { title: "Schema Contract v1.0", href: "/docs/schema-contract" },
    { title: "v1.0 Release Notes", href: "/docs/release-notes" }
];

export default function AgencyOverviewPage() {
    return (
        <main className="bg-[#F6F1E7] min-h-screen">
            <UnifiedSovereignHeader />

            <section className="pt-48 pb-32 px-6">
                <div className="max-w-4xl mx-auto">

                    {/* ── Breadcrumbs ── */}
                    <div className="flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B]">
                        <Link href="/docs" className="hover:text-[#141414] transition-colors">Help Center</Link>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-[#141414]">v1.0 Overview</span>
                    </div>

                    {/* ── Header ── */}
                    <div className="mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl lg:text-6xl font-light leading-tight tracking-tightest text-[#141414] mb-8"
                        >
                            Visual Decompiler v1.0 <br />
                            <span className="italic font-serif">(Agency‑Grade)</span> — Overview
                        </motion.h1>

                        <div className="p-8 bg-white border border-[#E7DED1] rounded-[2.5rem] shadow-[0_20px_60px_rgba(20,20,20,0.03)]">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#141414] mb-4">What is Visual Decompiler?</h2>
                            <p className="text-lg text-[#6B6B6B] font-light leading-relaxed">
                                Visual Decompiler v1.0 is an enterprise-grade system that transforms a single ad creative into forensic, evidence-backed insights and an actionable production strategy. It standardizes how teams move from “opinions about creative” to auditable proof, platform diagnostics, compliance clarity, and a 14‑day testing plan.
                            </p>
                        </div>
                    </div>

                    {/* ── What you get ── */}
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center text-white">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-light text-[#141414] uppercase tracking-tight">What you get (end-to-end)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {SECTIONS.map((section, idx) => (
                                <div key={idx} className="p-8 bg-white/50 border border-[#E7DED1] rounded-3xl hover:bg-white hover:border-accent/20 transition-all group">
                                    <div className="mb-4">{section.icon}</div>
                                    <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#141414] mb-3">{section.title}</h3>
                                    <p className="text-[13px] text-[#6B6B6B] leading-relaxed font-light">{section.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Guarantees ── */}
                    <div className="mb-24 p-12 bg-[#141414] rounded-[3rem] text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-2xl font-light uppercase tracking-[0.1em] mb-10 relative z-10">The v1.0 “Agency‑Grade” guarantees</h2>
                        <ul className="space-y-6 relative z-10">
                            {GUARANTEES.map((g, idx) => (
                                <li key={idx} className="flex gap-4 items-start border-l border-accent/30 pl-6 py-1">
                                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                    <p className="text-sm text-white/70 font-light leading-relaxed">{g}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Who it's for ── */}
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center text-white">
                                <Users className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-light text-[#141414] uppercase tracking-tight">Who it’s for</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {TARGET_AUDIENCE.map((item, idx) => (
                                <div key={idx} className="border-l-2 border-[#E7DED1] pl-6 hover:border-accent transition-colors">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#141414] mb-2">{item.role}</h3>
                                    <p className="text-xs text-[#6B6B6B] font-light leading-relaxed">{item.action}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Glossary ── */}
                    <div className="mb-24">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#141414]/40 mb-10 text-center">Key terms (quick glossary)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {GLOSSARY.map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-1">
                                    <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest">{item.term}</span>
                                    <p className="text-xs text-[#6B6B6B] font-light leading-relaxed">{item.def}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Next Steps ── */}
                    <div className="mb-24 text-center">
                        <h2 className="text-2xl font-light text-[#141414] uppercase tracking-tight mb-8">Next steps</h2>
                        <div className="inline-flex flex-wrap justify-center gap-3 p-2 bg-white/50 border border-[#E7DED1] rounded-2xl">
                            {['Receipts', 'Platform diagnostics', 'Risk flags', '14-day sprint plan'].map((step, idx) => (
                                <div key={step} className="flex items-center gap-2 px-4 py-2 border border-[#E7DED1] rounded-xl bg-white text-[10px] font-bold uppercase tracking-widest text-[#141414]">
                                    <span className="w-4 h-4 rounded-full bg-[#141414] text-white flex items-center justify-center text-[8px]">{idx + 1}</span>
                                    {step}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Related Articles ── */}
                    <div className="pt-20 border-t border-[#E7DED1]">
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
