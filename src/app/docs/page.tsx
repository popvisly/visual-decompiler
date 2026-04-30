'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    Bug,
    FileText,
    Layers,
    Mail,
    Search,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';

type HubCard = {
    title: string;
    description: string;
    href: string;
    category: string;
    icon: React.ReactNode;
    keywords: string;
};

const TOP_TASKS = [
    { label: 'Read the tabs', href: '/docs/user-guide' },
    { label: 'Export a dossier', href: '/docs/user-guide' },
    { label: 'Find it in Vault', href: '/vault' },
    { label: 'Compare two routes', href: '/compare' },
    { label: 'QA checklist', href: '/docs/qa-checklist' },
] as const;

const HUB_CARDS: HubCard[] = [
    {
        title: 'User Guide',
        description: 'How to read the dossier, run the tabs in order, and export decision-ready artifacts.',
        href: '/docs/user-guide',
        category: 'Start Here',
        icon: <BookOpen className="h-5 w-5" />,
        keywords: 'user guide, tabs, dossier, export, reading, workflow, onboarding',
    },
    {
        title: 'v2.0 Overview',
        description: 'High-level operating overview of receipts, diagnostics, risk flags, and sprint outputs.',
        href: '/docs/v1-overview',
        category: 'Overview',
        icon: <Sparkles className="h-5 w-5" />,
        keywords: 'overview, v2.0, receipts, diagnostics, sprint, outputs',
    },
    {
        title: 'QA Checklist',
        description: 'A practical quality checklist for repeatable, agency-grade forensic reads.',
        href: '/docs/qa-checklist',
        category: 'Operations',
        icon: <ShieldCheck className="h-5 w-5" />,
        keywords: 'qa, checklist, quality, verification, reliability',
    },
    {
        title: 'Schema Contract',
        description: 'Reference spec for the forensic engine data structure and field definitions.',
        href: '/docs/schema-contract',
        category: 'Technical',
        icon: <FileText className="h-5 w-5" />,
        keywords: 'schema, contract, types, fields, spec',
    },
    {
        title: 'Release Notes',
        description: 'What shipped, what changed, and what to expect next.',
        href: '/docs/release-notes',
        category: 'Updates',
        icon: <Layers className="h-5 w-5" />,
        keywords: 'release notes, changes, updates, performance',
    },
    {
        title: 'Lexicon',
        description: 'Definitions for system terms, modules, and reference language used in reads.',
        href: '/docs/lexicon',
        category: 'Reference',
        icon: <Search className="h-5 w-5" />,
        keywords: 'lexicon, glossary, definitions, terms, modules',
    },
    {
        title: 'Troubleshooting',
        description: 'Common issues, expected behavior, and how to recover fast.',
        href: '/docs/user-guide',
        category: 'Support',
        icon: <Bug className="h-5 w-5" />,
        keywords: 'troubleshooting, errors, issues, stuck, loading, export',
    },
] as const;

export default function DocsHubPage() {
    const prefersReducedMotion = useReducedMotion();
    const [query, setQuery] = useState('');

    const filteredCards = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return HUB_CARDS;
        return HUB_CARDS.filter((card) => {
            return (
                card.title.toLowerCase().includes(q) ||
                card.description.toLowerCase().includes(q) ||
                card.category.toLowerCase().includes(q) ||
                card.keywords.toLowerCase().includes(q)
            );
        });
    }, [query]);

    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader />

            <MarketingPageHeader
                kicker="Help Center"
                title={
                    <>
                        Find answers <br />
                        <span className="text-[#141414]/35">fast.</span>
                    </>
                }
                description="Task-first guides for operators: how to read tabs, export dossiers, and move work through review with less debate."
            />

            <section className="px-6 pb-28 lg:pb-36">
                <div className="mx-auto w-full max-w-[1200px] lg:px-12">
                    <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? undefined : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center">
                            <Search className="h-4 w-4 text-[#6B6B6B]" />
                        </div>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search help articles and reference terms..."
                            className="w-full rounded-[24px] border border-black/10 bg-white py-4 pl-12 pr-5 text-[15px] font-medium text-[#141414] placeholder:text-[#6B6B6B]/55 shadow-sm transition focus:border-black/20 focus:outline-none"
                        />
                    </motion.div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6B6B6B]">Top tasks</p>
                        {TOP_TASKS.map((task) => (
                            <Link
                                key={task.label}
                                href={task.href}
                                className="rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B6B6B] shadow-sm transition hover:border-black/20 hover:text-[#141414]"
                            >
                                {task.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCards.map((card, idx) => (
                            <motion.div
                                key={card.href}
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={prefersReducedMotion ? undefined : { duration: 0.55, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link
                                    href={card.href}
                                    className="group flex h-full flex-col justify-between rounded-[24px] border border-black/10 bg-white p-7 shadow-sm transition hover:border-black/20 hover:shadow-md"
                                >
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-[18px] border border-black/10 bg-[#FBFBF6] p-3 text-[#141414]">
                                                {card.icon}
                                            </div>
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">{card.category}</p>
                                        </div>

                                        <h2 className="mt-6 text-[18px] font-semibold leading-tight tracking-[-0.01em] text-[#141414]">
                                            {card.title}
                                        </h2>
                                        <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">
                                            {card.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#141414]">
                                        Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 rounded-[24px] border border-black/10 bg-[#141414] p-8 text-[#FBF7EF] shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">Support</p>
                        <h3 className="mt-4 text-[24px] font-semibold uppercase leading-[1.1] tracking-tight">
                            Need help fast?
                        </h3>
                        <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-white/70">
                            If something looks stuck, check Vault first — extractions can complete before the UI updates. If it is still blocked, send the asset id and the page URL.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a
                                href="mailto:hello@popvisly.com?subject=Visual%20Decompiler%20Help"
                                className="inline-flex items-center gap-3 rounded-full bg-[#D4A574] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414] transition hover:bg-[#e2b47f]"
                            >
                                <Mail className="h-4 w-4" />
                                Email support
                            </a>
                            <Link
                                href="/ingest"
                                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 transition hover:border-white/30 hover:text-white"
                            >
                                Open ingest
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
