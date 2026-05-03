"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import { ChevronRight, Mail, BookOpen, Terminal, Shield, Zap, Search, Activity, ArrowUpRight } from 'lucide-react';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';

const SECTIONS = [
    {
        id: 'product-overview',
        title: 'Product Overview',
        kicker: 'Platform Foundation',
        description:
            'Visual Decompiler is a creative intelligence system for reading ad structure, not generating assets. Every output is designed to be defensible in internal reviews and client rooms.',
        bullets: [
            'Primary Scores, Attention Path, Structural Signals, Strategic Read, and Confidence Index.',
            'Client-facing dossier exports for review, alignment, and decisions.',
            'Vault-based retrieval so every analysis remains searchable and reusable.',
        ],
        icon: BookOpen,
        example:
            'Before a client review, run one decompile and export the dossier as your strategic baseline artifact.',
    },
    {
        id: 'core-features',
        title: 'Core Features',
        kicker: 'System Capabilities',
        description:
            'The operating core is built for agency workflows: analyze, compare, export, and reuse. Each capability is designed to reduce subjectivity and speed up execution quality.',
        bullets: [
            'Intelligence Vault: every extraction is stored and instantly searchable.',
            'Intelligence Pulse: compare two routes with differential diagnostics.',
            'White Label Mode: publish outputs under your agency identity.',
        ],
        icon: Zap,
        example:
            'When a route is contested, move from Intelligence to Psychology and close with Confidence Index for clear decision language.',
    },
    {
        id: 'getting-started',
        title: 'Getting Started',
        kicker: 'Quick Start',
        description: 'Use this sequence to go from first upload to client-ready intelligence in minutes.',
        bullets: [
            'Analyze ad asset: upload JPG, PNG, or WEBP (up to 25MB).',
            'Review dossier tabs: Quality Gate through Decision Log.',
            'Export and share: generate a presentation-ready dossier when the route is approved.',
        ],
        icon: Terminal,
        example:
            'Upload, review tabs in order, then export. This keeps first-pass analysis fast and repeatable for the team.',
    },
    {
        id: 'advanced-workflows',
        title: 'Advanced Workflows',
        kicker: 'Agency Operations',
        description: 'Operational controls for high-volume and high-stakes teams.',
        bullets: [
            'SHA-256 deduplication to avoid duplicate analysis spend.',
            'Tagging and vault memory for faster retrieval by campaign or market.',
            'Board collections for grouped delivery and comparative strategy reviews.',
        ],
        icon: Shield,
        example:
            'Use Intelligence Pulse to compare incumbent vs challenger routes before pitch-room lock.',
    },
] as const;

const FAQS = [
    {
        question: 'Where do completed analyses go?',
        answer:
            'All analyses are stored automatically in Intelligence Vault. Use tags, campaign labels, or search terms to retrieve them instantly.',
    },
    {
        question: 'How long should an analysis take?',
        answer:
            'Standard analysis is usually 2–4 minutes. Differential Diagnostic is usually 3–5 minutes. If it looks delayed, check Vault first because results may complete before UI progress updates.',
    },
    {
        question: 'What file types are supported?',
        answer:
            'JPG, PNG, and WEBP are supported. Static image files only, up to 25MB. Higher-resolution source files produce cleaner reads.',
    },
    {
        question: 'Can I analyse the same ad twice?',
        answer: 'If the file is identical, deduplication returns the existing extraction. For a true fresh run, upload a revised version.',
    },
    {
        question: 'How do I enable white-label output?',
        answer:
            'Go to Agency Settings, add agency name, primary hex, and logo URL, then enable Sovereign Whitelabel Mode. This is available on Agency Sovereignty.',
    },
    {
        question: 'What is Intelligence Pulse?',
        answer:
            'Intelligence Pulse compares two assets side-by-side and reveals strategic deltas across signals, psychology, and route integrity.',
    },
] as const;

export default function HelpPage() {
    const [faqQuery, setFaqQuery] = useState('');
    const [faqFeedback, setFaqFeedback] = useState<Record<string, 'yes' | 'no'>>({});

    const filteredFaqs = useMemo(() => {
        const query = faqQuery.trim().toLowerCase();
        if (!query) return FAQS;

        return FAQS.filter(
            (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query),
        );
    }, [faqQuery]);

    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader />

            <div className="pt-32 lg:pt-44">
                <MarketingPageHeader
                    kicker="Operational Manual"
                    title="System Support & Directives"
                    description="The clinical reference for agency teams defending decisions and aligning creative strategy."
                />
            </div>

            <div className="px-6 pb-24">
                <div className="mx-auto max-w-[1200px]">
                    
                    {/* Premium Nav Chips */}
                    <nav className="mb-12 flex flex-wrap gap-2 rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
                        {['Product Overview', 'Core Features', 'Getting Started', 'Advanced', 'FAQ', 'Support'].map((label) => (
                            <a
                                key={label}
                                href={`#${label.toLowerCase().replace(' ', '-')}`}
                                className="rounded-full border border-black/5 bg-[#FBFBF6] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B] transition hover:border-[#D4A574]/40 hover:text-[#141414] hover:bg-white"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Master Training Protocol Card */}
                    <section className="relative mb-16 overflow-hidden rounded-[2.5rem] border border-[#D4A574]/20 bg-[#141414] p-10 text-[#FBF7EF] shadow-[0_40px_100px_rgba(0,0,0,0.15)] lg:p-14">
                        {/* Background detail */}
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Activity className="h-40 w-40 text-[#D4A574]" />
                        </div>
                        
                        <div className="relative z-10 max-w-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="rounded-full bg-[#D4A574]/10 border border-[#D4A574]/30 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">
                                    Protocol_001
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Release: stable_2.4</span>
                            </div>
                            <h2 className="text-[32px] font-black uppercase leading-[0.95] tracking-tight md:text-[52px]">
                                Master Onboarding Protocol.
                            </h2>
                            <p className="mt-8 text-[17px] leading-relaxed text-white/60">
                                Start here to standardize your agency workflow. This guide covers asset normalization, intelligence extraction, and clinical delivery standards.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <a
                                    href="/docs/user-guide"
                                    className="inline-flex items-center gap-3 rounded-full bg-[#D4A574] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414] transition hover:scale-[1.02]"
                                >
                                    Open Directive
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                                <a
                                    href="/docs/schema-contract"
                                    className="inline-flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/5"
                                >
                                    System Schema
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                        {SECTIONS.map((section, i) => {
                            const Icon = section.icon;
                            return (
                                <motion.article 
                                    id={section.id} 
                                    key={section.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative flex flex-col justify-between rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm transition-all hover:border-[#D4A574]/30 hover:shadow-xl"
                                >
                                    <div>
                                        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBFBF6] text-[#8B6A3D] transition-colors group-hover:bg-[#8B6A3D] group-hover:text-white">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">{section.kicker}</p>
                                        <h3 className="mt-4 text-[24px] font-black uppercase leading-tight tracking-tight text-[#141414]">{section.title}</h3>
                                        <p className="mt-6 text-[14px] leading-relaxed text-[#515151] font-medium">{section.description}</p>

                                        <ul className="mt-8 space-y-4">
                                            {section.bullets.map((bullet) => (
                                                <li key={bullet} className="flex items-start gap-4 text-[13px] font-medium leading-relaxed text-[#515151]">
                                                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A574]/40" />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-10 rounded-2xl border border-black/5 bg-[#FBFBF6] p-6">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8B6A3D]">Operational Use Case</p>
                                        <p className="mt-3 text-[13px] leading-relaxed text-[#6B6B6B] italic">"{section.example}"</p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>

                    {/* FAQ Section */}
                    <section id="faq" className="mt-32">
                        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                            <div className="max-w-2xl">
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">Technical Q&A</p>
                                <h2 className="mt-6 text-[32px] font-black uppercase leading-[0.92] tracking-tight md:text-[56px]">
                                    Common <br /> <span className="text-[#8B6A3D]">Operations.</span>
                                </h2>
                            </div>
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B6A3D]" />
                                <input
                                    type="text"
                                    value={faqQuery}
                                    onChange={(event) => setFaqQuery(event.target.value)}
                                    placeholder="Search keywords (e.g. Vault, Ingest...)"
                                    className="w-full rounded-full border border-black/10 bg-white py-4 pl-12 pr-6 text-[13px] font-medium outline-none transition focus:border-[#D4A574]/40 focus:ring-4 focus:ring-[#D4A574]/5"
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {filteredFaqs.map((faq) => (
                                <article key={faq.question} className="rounded-[2rem] border border-black/5 bg-white p-10 shadow-sm transition-all hover:border-[#D4A574]/20">
                                    <h3 className="text-[18px] font-black uppercase leading-tight tracking-tight text-[#141414]">{faq.question}</h3>
                                    <p className="mt-5 text-[14px] leading-[1.7] text-[#515151] font-medium">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* Final Support Block */}
                    <section id="support" className="mt-32 rounded-[3rem] border border-black/5 bg-white p-10 shadow-xl lg:p-20">
                        <div className="grid lg:grid-cols-2 gap-16 lg:items-center">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8B6A3D]">Personnel Support</p>
                                <h2 className="mt-8 text-[32px] font-black uppercase leading-[0.92] tracking-tight md:text-[52px]">
                                    Need direct assistance?
                                </h2>
                                <p className="mt-8 text-[18px] leading-relaxed text-[#515151]">
                                    Our technical team can assist with high-volume deployments, whitelabel configuration, and agency integration strategy.
                                </p>
                            </div>
                            <div className="flex flex-col items-start gap-6 rounded-3xl bg-[#FBFBF6] p-10 border border-black/5">
                                <a
                                    href="mailto:support@visualdecompiler.com"
                                    className="flex w-full items-center justify-between rounded-2xl bg-[#141414] p-6 text-white transition hover:scale-[1.02]"
                                >
                                    <div className="flex items-center gap-4">
                                        <Mail className="h-6 w-6 text-[#D4A574]" />
                                        <span className="text-[11px] font-bold uppercase tracking-[0.25em]">Email Protocol</span>
                                    </div>
                                    <ArrowUpRight className="h-5 w-5" />
                                </a>
                                <div className="flex items-center gap-3 px-2">
                                    <Activity className="h-3 w-3 text-[#D4A574]" />
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#141414]/40">
                                        Active Support Response: 24h Window
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

