'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, MousePointer2, Scan, Timer, ShieldAlert, TrendingUp } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Link from 'next/link';

const SECTIONS = [
    {
        title: "The Forensic Mindset",
        icon: <Scan className="w-5 h-5 text-accent" />,
        content: "The v1.0 dashboard is no longer just a summary; it is an auditable evidence base. Every claim now has a \"Receipt.\"",
        subsections: [
            {
                subtitle: "1. Unified Persuasion Stack",
                desc: "A weighted DNA of the ad's psychological architecture. Look for the \"Primary Driver\" (highest weight) to duplicate or defeat."
            },
            {
                subtitle: "2. Evidence Layer (\"Receipts\")",
                desc: "Interactive bounding boxes (0-1000 scale) pointing to concrete cues. Use these for \"Proof Points\" in client presentations."
            },
            {
                subtitle: "3. 14-Day Tactical Sprint",
                desc: "A hypothesis-driven test plan. Focus on \"High Impact\" cells to resolve detected visual density bottlenecks."
            }
        ]
    },
    {
        title: "Platform Optimization",
        icon: <MousePointer2 className="w-5 h-5 text-accent" />,
        content: "Ensure your creative survives the platform UI before you spend.",
        subsections: [
            {
                subtitle: "Safe Zone Overlays",
                desc: "Toggle overlays for TikTok/IG to ensure CTA buttons aren't occluded by sidebar navigation."
            },
            {
                subtitle: "Regulatory Risk",
                desc: "Scores > 70 indicate high ban risk. Review the \"Why\" section for detect policy violations."
            }
        ]
    }
];

const RELATED_ARTICLES = [
    { title: "Visual Decompiler v1.0 Overview", href: "/docs/v1-overview" },
    { title: "QA Checklist", href: "/docs/qa-checklist" },
    { title: "Schema Contract v1.0", href: "/docs/schema-contract" },
    { title: "v1.0 Release Notes", href: "/docs/release-notes" }
];

export default function UserGuidePage() {
    return (
        <main className="bg-[#F6F1E7] min-h-screen">
            <UnifiedSovereignHeader />
            <section className="pt-48 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B]">
                        <Link href="/docs" className="hover:text-[#141414] transition-colors">Help Center</Link>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-[#141414]">User Guide</span>
                    </div>

                    <div className="mb-20">
                        <h1 className="text-5xl font-light tracking-tightest text-[#141414] mb-6 uppercase">
                            Agency Handoff: <br />
                            <span className="italic font-serif lowercase tracking-normal">Master the ResultsView v1.0</span>
                        </h1>
                        <p className="text-xl text-[#6B6B6B] font-light leading-relaxed max-w-2xl">
                            Welcome to the new standard in advertising intelligence. Move from browsing insights to executing deconstruction.
                        </p>
                    </div>

                    <div className="space-y-20">
                        {SECTIONS.map((section, idx) => (
                            <div key={idx}>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-white border border-[#E7DED1] rounded-2xl text-[#141414]">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-light text-[#141414] uppercase tracking-tight">{section.title}</h2>
                                </div>
                                <p className="text-base text-[#6B6B6B] font-light leading-relaxed mb-10 pb-8 border-b border-[#E7DED1]">
                                    {section.content}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {section.subsections.map((sub, sIdx) => (
                                        <div key={sIdx} className="space-y-3">
                                            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#141414]">{sub.subtitle}</h3>
                                            <p className="text-[13px] text-[#6B6B6B] leading-relaxed font-light">{sub.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-32 p-12 bg-white rounded-[3rem] border border-[#E7DED1] shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-5 h-5 text-accent" />
                            <h2 className="text-xl font-light uppercase tracking-tight text-[#141414]">Standard Workflow</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {['Ingest competitor ad', 'Locate Persuasion Stack', 'Execute Strategic Move'].map((step, i) => (
                                <div key={i} className="p-6 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1]">
                                    <span className="text-[10px] font-bold text-accent mb-2 block uppercase">Step {i + 1}</span>
                                    <p className="text-sm font-medium text-[#141414]">{step}</p>
                                </div>
                            ))}
                        </div>
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
