'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowRight, Eye, Smartphone, AlertTriangle, Settings, TrendingUp } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Link from 'next/link';

const QA_SECTIONS = [
    {
        title: "Visual & Evidence QA",
        icon: <Eye className="w-5 h-5 text-accent" />,
        items: [
            "Coordinate Precision: Verify normalized 0-100 correlation.",
            "OCR Persistence: Low-contrast, stylized, and vertical text tests.",
            "Overlay Z-Index: Ensure safe-zone graphics sit atop video controls."
        ]
    },
    {
        title: "Platform & Ratio QA",
        icon: <Smartphone className="w-5 h-5 text-accent" />,
        items: [
            "Extreme Ratios: 9:16 vs 1.91:1 survivability verification.",
            "UI Scaling: Confirm sidebar graphics scale to card width.",
            "Interaction: Verify PlatformFitness toggles correct overlays."
        ]
    },
    {
        title: "Risk & Strategy QA",
        icon: <AlertTriangle className="w-5 h-5 text-accent" />,
        items: [
            "Explainability: Verify 'Why' anchor citations for high risk.",
            "Nearest-Neighbor: confirm similarity/differentiation correlation.",
            "Variant Sprints: ensure 'High Impact' cell presence."
        ]
    },
    {
        title: "Schema Compliance",
        icon: <Settings className="w-5 h-5 text-accent" />,
        items: [
            "Strict Typing: verify zero 'any' types in pipeline.",
            "Versioning: ensure schema_version matches v2.2."
        ]
    }
];

const RELATED_ARTICLES = [
    { title: "Visual Decompiler v1.0 Overview", href: "/docs/v1-overview" },
    { title: "ResultsView User Guide", href: "/docs/user-guide" },
    { title: "Schema Contract v1.0", href: "/docs/schema-contract" },
    { title: "v1.0 Release Notes", href: "/docs/release-notes" }
];

export default function QAChecklistPage() {
    return (
        <main className="bg-[#F6F1E7] min-h-screen">
            <UnifiedSovereignHeader />
            <section className="pt-48 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B]">
                        <Link href="/docs" className="hover:text-[#141414] transition-colors">Help Center</Link>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-[#141414]">QA Checklist</span>
                    </div>

                    <div className="mb-20">
                        <h1 className="text-5xl font-light tracking-tightest text-[#141414] mb-6 uppercase">
                            v1.0 QA Checklist: <br />
                            <span className="italic font-serif lowercase tracking-normal text-accent">Agency-Grade Rigor</span>
                        </h1>
                        <p className="text-xl text-[#6B6B6B] font-light leading-relaxed max-w-2xl">
                            Ensuring the decompiler remains robust across high-stakes agency use cases.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {QA_SECTIONS.map((section, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-[#E7DED1] shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-2.5 bg-[#FBF7EF] rounded-xl border border-[#E7DED1] text-[#141414]">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#141414]">{section.title}</h2>
                                </div>
                                <ul className="space-y-4">
                                    {section.items.map((item, iIdx) => (
                                        <li key={iIdx} className="flex gap-3 items-start group">
                                            <div className="w-5 h-5 rounded border border-[#E7DED1] bg-white mt-0.5 group-hover:border-accent transition-colors" />
                                            <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-32 p-12 bg-white rounded-[3rem] border border-[#E7DED1] shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-5 h-5 text-accent" />
                            <h2 className="text-xl font-light uppercase tracking-tight text-[#141414]">Operationalizing QA</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414] mb-4">Ad-Hoc Audits</h3>
                                <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                                    Strategic leads should perform a manual pass of all Evidence Receipts before client delivery to ensure "Why" fields are contextually accurate.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414] mb-4">Regression Testing</h3>
                                <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                                    When the Forensic Engine updates, rerun the Golden Path asset and compare the JSON output against the Schema Contract.
                                </p>
                            </div>
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
