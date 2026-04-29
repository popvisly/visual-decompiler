'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    Layers,
    Tv,
    Target,
    Sparkles,
    ShieldCheck,
    BookOpen,
    Eye,
    Crosshair,
    Info,
    ArrowRight,
} from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import Link from 'next/link';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';

const INTELLIGENCE_MODULES = [
    {
        icon: <Brain className="w-5 h-5" />,
        title: 'Cognitive Load Map',
        definition:
            'A neuro-analytical heatmap that quantifies "Visual Friction" — the measurable cognitive demand placed on the viewer by layout complexity, element density, and information hierarchy.',
        strategicUse:
            "Identifies if background complexity is cannibalizing the viewer's attention from the primary conversion trigger. Ensures the core persuasion message is not buried by excessive detail or poor hierarchy.",
    },
    {
        icon: <Layers className="w-5 h-5" />,
        title: 'Schema Autopsy',
        definition:
            "A frame-by-frame structural extraction of the ad's timeline, deconstructing the creative into its constituent persuasion phases with precise timing markers.",
        strategicUse:
            'Reveals the "Persuasion Sequence" — mapping exactly when hooks deploy, social proof activates, objections are dismantled, and closing triggers fire. Essential for reverse-engineering competitor creative.',
    },
    {
        icon: <Tv className="w-5 h-5" />,
        title: 'Media Buy Projections',
        definition:
            'Algorithmic alignment between creative DNA and platform-specific user behaviors, scoring fit across Instagram, TikTok, CTV/OTT, YouTube, and Web Display.',
        strategicUse:
            'Justifies spend allocation between 9:16 vertical (high-motion) and 4:5 feed-based (high-aesthetic) environments. Prevents creative-platform mismatch before the media buy is committed.',
    },
    {
        icon: <Target className="w-5 h-5" />,
        title: 'Sovereign Benchmark',
        definition:
            'A proprietary percentile ranking against the top 5% of global category performers, derived from a composite of resonance signals, creative complexity, and market saturation metrics.',
        strategicUse:
            'Provides the "Audit-Ready" proof that a campaign is optimized for market-leading resonance. The standard of evidence required when presenting to C-suite or client procurement.',
    },
    {
        icon: <Sparkles className="w-5 h-5" />,
        title: 'Neural Sentiment Breakdown',
        definition:
            'High-resolution emotional tracking that moves beyond basic positive/negative polarity to identify complex "Elite" drivers operating within the creative assets.',
        strategicUse:
            'Identifies deep emotional levers such as Aspiration, Exclusive Scarcity, Authority, and Belonging — the drivers that separate premium creative from commodity advertising.',
    },
];

const STRATEGIC_TERMS = [
    {
        term: 'Asset Hash Integrity',
        definition:
            'The SHA-256 system that prevents redundant deconstructions and preserves neural credits by identifying unique asset fingerprints. Ensures the OS never processes the same forensic target twice.',
    },
    {
        term: 'Market Resonance',
        definition:
            'A quantitative measure of how well the creative DNA aligns with current high-performing industry benchmarks and cultural sentiment within a specific category. A high resonance score indicates the creative is operating within proven engagement corridors.',
    },
    {
        term: 'Tactical Window',
        definition:
            "The estimated lifespan of the ad's effectiveness before reaching \"Creative Fatigue\" or \"Pattern Saturation.\" Once exceeded, the creative requires a strategic pivot or complete asset refresh to maintain performance.",
    },
    {
        term: 'Invisible Machinery',
        definition:
            "The underlying psychological framework and technical composition — lighting geometry, color theory, spatial hierarchy — that drives subconscious brand recall without the viewer's conscious awareness. The architecture that the audience never sees, but always feels.",
    },
    {
        term: 'Objection Dismantling Logic',
        definition:
            'A forensic breakdown of how the creative specifically neutralizes common consumer hesitations — price resistance, effort aversion, trust deficit — through carefully deployed visual cues, copy sequencing, and social proof architecture.',
    },
    {
        term: 'Sovereign Score',
        definition:
            'A proprietary aggregate metric combining Market Resonance and Tactical Window into a single intelligence index. Derived using the Claude Sonnet neural pipeline for maximum forensic fidelity.',
    },
    {
        term: 'Neural Verdict',
        definition:
            "A one-sentence strategic synthesis generated by the Neural Processor, summarizing the structural integrity, persuasion effectiveness, and strategic positioning of the asset in decision-ready language.",
    },
];

const QUALITY_TERMS = [
    {
        icon: <ShieldCheck className="w-5 h-5" />,
        term: 'Quality Gate',
        definition:
            'The first pass integrity check: format survivability, readability, hierarchy clarity, and platform-safe execution fundamentals.',
    },
    {
        icon: <Eye className="w-5 h-5" />,
        term: 'Attention Path',
        definition:
            'A mapped sequence of visual entry, recognition anchors, and engagement sustain — including drop-off risk points.',
    },
    {
        icon: <Crosshair className="w-5 h-5" />,
        term: 'Decision Log',
        definition:
            'Final structured verdict: what holds, what weakens, and what to change next — written to travel into rooms.',
    },
    {
        icon: <BookOpen className="w-5 h-5" />,
        term: 'Dossier Export',
        definition:
            'Client-ready artifact packaging the analysis into a presentation format for alignment, review, and approval.',
    },
];

const HELP_ARTICLES = [
    {
        title: 'ResultsView Reading Guide',
        slug: 'user-guide',
        category: 'Start here',
        desc: 'How to read the dossier, use the system tabs, and export decision-ready outputs.',
        keywords: 'user guide, dossier, tabs, export, reading guide',
    },
    {
        title: 'v2.0 Overview',
        slug: 'v1-overview',
        category: 'Overview',
        desc: 'High-level operating overview: receipts, diagnostics, risk flags, sprint outputs.',
        keywords: 'overview, v2.0, sovereign, receipts, diagnostics',
    },
    {
        title: 'v2.0 QA Checklist',
        slug: 'qa-checklist',
        category: 'Technical',
        desc: 'Ensuring consistent extraction quality across high-stakes agency use cases.',
        keywords: 'qa, checklist, testing, coordinates, robustness',
    },
    {
        title: 'Schema Contract v2.0',
        slug: 'schema-contract',
        category: 'Technical',
        desc: 'Formal data structure for the forensic engine.',
        keywords: 'schema, contract, json, types, integrity',
    },
    {
        title: 'Release Notes',
        slug: 'release-notes',
        category: 'Milestones',
        desc: 'Highlights and performance improvements.',
        keywords: 'release notes, updates, changes, v2.0',
    },
];

export default function DocsLexiconPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArticles = HELP_ARTICLES.filter((article) => {
        const q = searchQuery.toLowerCase();
        return article.title.toLowerCase().includes(q) || article.desc.toLowerCase().includes(q) || article.keywords.toLowerCase().includes(q);
    });

    const filteredTerms = STRATEGIC_TERMS.filter((term) => {
        const q = searchQuery.toLowerCase();
        return term.term.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q);
    });

    return (
        <main className="bg-[#FBFBF6] min-h-screen text-[#141414]">
            <UnifiedSovereignHeader />
            <MarketingPageHeader
                kicker="Help Center"
                title={
                    <>
                        System <br />
                        <span className="text-[#141414]/35">Lexicon.</span>
                    </>
                }
                description="Definitions, modules, and reference terms used across the operating system."
            />

            <section className="px-6 pb-32">
                <div className="mx-auto w-full max-w-[1200px] px-0 lg:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative max-w-2xl"
                    >
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                            <Info className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search terms and reference articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-black/10 rounded-3xl py-6 pl-14 pr-8 text-lg font-medium text-[#141414] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-black/20 shadow-sm transition-all"
                        />
                    </motion.div>

                    <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B6B6B]">
                        <Link href="/docs" className="rounded-full border border-black/10 bg-white px-4 py-2 transition hover:border-black/20 hover:text-[#141414]">
                            Help Center
                        </Link>
                        <span className="text-[#141414]/20">/</span>
                        <span className="rounded-full border border-black/10 bg-[#FBFBF6] px-4 py-2 text-[#141414]">Lexicon</span>
                    </div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16">
                        <h2 className="text-[10px] font-bold text-[#141414]/30 uppercase tracking-[0.3em] mb-8">Reference Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredArticles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/docs/${article.slug}`}
                                    className="group p-8 bg-white border border-black/10 rounded-[24px] hover:border-black/20 hover:shadow-md transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="text-[9px] font-bold text-[#8B6A3D]/80 uppercase tracking-widest mb-3 block">{article.category}</span>
                                        <h3 className="text-sm font-bold text-[#141414] uppercase tracking-[0.1em] mb-4 group-hover:text-[#8B6A3D] transition-colors leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-[13px] text-[#6B6B6B] leading-relaxed font-medium line-clamp-2">{article.desc}</p>
                                    </div>
                                    <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#141414]">
                                        Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-24">
                        <h2 className="text-[10px] font-bold text-[#141414]/30 uppercase tracking-[0.3em] mb-8">Quality Terms</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {QUALITY_TERMS.map((item) => (
                                <div key={item.term} className="rounded-[24px] border border-black/10 bg-white p-8 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-[18px] border border-black/10 bg-[#FBFBF6] p-3 text-[#141414]">{item.icon}</div>
                                        <div>
                                            <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#141414]">{item.term}</h3>
                                            <p className="mt-3 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">{item.definition}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-24">
                        <h2 className="text-[10px] font-bold text-[#141414]/30 uppercase tracking-[0.3em] mb-8">Intelligence Modules</h2>
                        <div className="space-y-6">
                            {INTELLIGENCE_MODULES.map((mod, idx) => (
                                <motion.div
                                    key={mod.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05, duration: 0.6 }}
                                    className="bg-white p-8 md:p-12 rounded-[24px] border border-black/10 shadow-sm group hover:border-black/20 transition-all"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="p-3 bg-[#FBFBF6] rounded-[18px] border border-black/10 text-[#141414] shrink-0">
                                            {mod.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-[12px] font-bold text-[#141414] uppercase tracking-[0.15em] mb-4">{mod.title}</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#8B6A3D]/80 uppercase tracking-[0.3em] mb-1.5">Definition</p>
                                                    <p className="text-[14px] text-[#141414] leading-relaxed font-medium">{mod.definition}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] mb-1.5">Strategic Application</p>
                                                    <p className="text-[14px] text-[#6B6B6B] leading-relaxed font-medium">{mod.strategicUse}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-24">
                        <h2 className="text-[10px] font-bold text-[#141414]/30 uppercase tracking-[0.3em] mb-8">Strategic Terms</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredTerms.map((term) => (
                                <div key={term.term} className="rounded-[24px] border border-black/10 bg-white p-8 shadow-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414]">{term.term}</p>
                                    <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">{term.definition}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

