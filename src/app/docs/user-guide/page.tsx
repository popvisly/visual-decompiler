'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scan, MousePointer2, TrendingUp, Info } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import Link from 'next/link';

const SECTIONS = [
    {
        title: "Forensic Intelligence",
        icon: <Scan className="w-6 h-6" />,
        content: "The v2.0 dashboard is an auditable evidence base powered by our proprietary Neural Pipeline. Move past high-level summaries into concrete proof-points.",
        subsections: [
            {
                subtitle: "1. Unified Persuasion Stack",
                desc: "A weighted DNA of the ad's psychological architecture. Identify the 'Primary Driver'—the strongest visual weight—to either duplicate or counter-program."
            },
            {
                subtitle: "2. Evidence Layer ('The Receipts')",
                desc: "Precise coordinate-based bounding boxes pointing to concrete visual cues. Use these as 'Proof Points' for strategy decks and client presentations."
            },
            {
                subtitle: "3. 14-Day Tactical Sprint",
                desc: "A hypothesis-driven test plan generated from the reading. Focus on 'High Impact' cells to resolve detected visual density bottlenecks."
            }
        ]
    },
    {
        title: "Platform Forensics",
        icon: <MousePointer2 className="w-6 h-6" />,
        content: "Ensure your creative survives the platform constraints before a single dollar is spent. We deconstruct the UI layer to protect your narrative.",
        subsections: [
            {
                subtitle: "Safe Zone Overlays",
                desc: "Toggle interactive overlays for TikTok, IG, and YouTube to ensure CTA buttons aren't occluded by native sidebar navigation."
            },
            {
                subtitle: "Regulatory Risk Scoring",
                desc: "Scores > 70 indicate high algorithmic ban risk. Review the 'Diagnostic' section for potential policy-triggering visual cues."
            }
        ]
    }
];

const RELATED_ARTICLES = [
    { title: "v2.0 Neural Engine Overview", href: "/docs/v1-overview" },
    { title: "The Forensic QA Checklist", href: "/docs/qa-checklist" },
    { title: "Standard Schema v1.0", href: "/docs/schema-contract" },
    { title: "Release Archive", href: "/docs/release-notes" }
];

export default function UserGuidePage() {
    return (
        <main className="bg-[#050505] min-h-screen text-white">
            <UnifiedSovereignHeader forceDark />
            
            <section className="pt-48 pb-32 px-6 lg:pt-64 lg:pb-64">
                <div className="max-w-[1400px] mx-auto">
                    
                    {/* Navigation Breadcrumb */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-4 mb-24 text-[10px] font-black uppercase tracking-[0.4em] text-white/30"
                    >
                        <Link href="/vault" className="hover:text-white transition-colors">Intelligence Hub</Link>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-white">User Guide</span>
                    </motion.div>

                    {/* Hero Branding */}
                    <div className="mb-48">
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[12px] font-black uppercase tracking-[0.6em] text-[#00E5FF] mb-10"
                        >
                            Training Protocol 001
                        </motion.p>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="text-[10vw] lg:text-[7vw] font-black leading-[0.85] tracking-[-0.05em] text-white mb-12 uppercase max-w-[12ch]"
                        >
                            The Agency <br />
                            <span className="text-white/20">Handoff.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl lg:text-2xl text-white/50 leading-relaxed max-w-3xl font-medium"
                        >
                            Welcome to the new standard in advertising intelligence. 
                            Move from browsing surface-level insights to executing forensic deconstruction.
                        </motion.p>
                    </div>

                    {/* Core Intelligence Briefs */}
                    <div className="space-y-48 lg:space-y-64">
                        {SECTIONS.map((section, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-white/10 pt-16">
                                    <div className="lg:col-span-5">
                                        <div className="flex items-center gap-6 mb-12">
                                            <div className="text-[#00E5FF]">
                                                {section.icon}
                                            </div>
                                            <h2 className="text-4xl font-black text-white uppercase tracking-[-0.03em]">{section.title}</h2>
                                        </div>
                                        <p className="text-[20px] lg:text-[24px] text-white font-medium leading-[1.5] mb-12">
                                            {section.content}
                                        </p>
                                    </div>
                                    
                                    <div className="lg:col-span-6 lg:col-start-7">
                                        <div className="space-y-16">
                                            {section.subsections.map((sub, sIdx) => (
                                                <div key={sIdx} className="space-y-5">
                                                    <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-[#00E5FF]">{sub.subtitle}</h3>
                                                    <p className="text-[18px] text-white/50 leading-relaxed max-w-xl">{sub.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Process UI */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-64 p-12 lg:p-24 bg-white/5 rounded-[4rem] border border-white/10 backdrop-blur-3xl"
                    >
                        <div className="flex items-center gap-4 mb-16">
                            <TrendingUp className="w-6 h-6 text-[#00E5FF]" />
                            <h2 className="text-3xl font-black uppercase tracking-[-0.02em] text-white">Execution Cycle</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                            {['Ingest competitor asset', 'Identify Persuasion DNA', 'Deconstruct Strategic Move'].map((step, i) => (
                                <div key={i} className="space-y-6 relative">
                                    <span className="text-[10px] font-black text-[#00E5FF] block uppercase tracking-[0.4em]">Phase 0{i + 1}</span>
                                    <p className="text-2xl font-black text-white uppercase leading-tight">{step}</p>
                                    {i < 2 && (
                                        <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-white/10">
                                            <ArrowRight size={32} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Resources Area */}
                    <div className="pt-32 mt-64 border-t border-white/10">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
                            <div className="max-w-sm">
                                <h2 className="text-[12px] font-black uppercase tracking-[0.6em] text-[#00E5FF] mb-8">Intelligence Archive</h2>
                                <p className="text-white/40 text-lg leading-relaxed">
                                    Access the full technical specifications of the Visual Decompiler OS pipeline.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 w-full max-w-2xl">
                                {RELATED_ARTICLES.map((article) => (
                                    <Link
                                        key={article.title}
                                        href={article.href}
                                        className="group flex items-center justify-between p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-[#00E5FF] transition-all duration-500"
                                    >
                                        <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors">{article.title}</span>
                                        <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-black group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <FooterStartNow />
        </main>
    );
}
