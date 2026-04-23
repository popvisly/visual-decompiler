"use client";

import { useMemo, useState } from 'react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import { ChevronRight, Mail } from 'lucide-react';

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
    {
        question: 'Can I export without white-labeling?',
        answer:
            'Yes. Exports still work without white-label mode and will include Visual Decompiler branding.',
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
        <main className="min-h-screen bg-[#050505] text-[#FBF7EF]">
            <UnifiedSovereignHeader forceDark primaryCta={{ label: 'Bring In The Work', href: '/ingest' }} />

            <div className="px-6 pb-24 pt-30">
                <div className="mx-auto max-w-[1400px]">
                    <div className="mb-14">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">
                            Operational Manual
                        </span>
                        <h1 className="mt-5 text-[clamp(52px,6.4vw,102px)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#F6F1E7] max-w-[14ch]">
                            Support
                            <br />
                            <span className="text-[#C1A674]">for Decision Workflows.</span>
                        </h1>
                        <p className="mt-10 max-w-[760px] text-[16px] leading-[1.7] text-[#F6F1E7]/78">
                            Use this centre to help agency teams defend decisions, align faster, and get work approved with less back-and-forth.
                        </p>
                    </div>

                    <nav className="mb-10 rounded-[1.8rem] border border-[#C1A674]/22 bg-[#101010] p-5">
                        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C1A674]">Navigate Help Centre</p>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                            <a
                                href="#product-overview"
                                className="rounded-full border border-[#C1A674]/22 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F6F1E7]/80 transition hover:border-[#C1A674]/50 hover:text-[#F6F1E7]"
                            >
                                Product Overview
                            </a>
                            <a
                                href="#core-features"
                                className="rounded-full border border-[#C1A674]/22 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F6F1E7]/80 transition hover:border-[#C1A674]/50 hover:text-[#F6F1E7]"
                            >
                                Core Features
                            </a>
                            <a
                                href="#getting-started"
                                className="rounded-full border border-[#C1A674]/22 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F6F1E7]/80 transition hover:border-[#C1A674]/50 hover:text-[#F6F1E7]"
                            >
                                Getting Started
                            </a>
                            <a
                                href="#advanced-workflows"
                                className="rounded-full border border-[#C1A674]/22 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F6F1E7]/80 transition hover:border-[#C1A674]/50 hover:text-[#F6F1E7]"
                            >
                                Advanced
                            </a>
                            <a
                                href="#common-questions"
                                className="rounded-full border border-[#C1A674]/22 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F6F1E7]/80 transition hover:border-[#C1A674]/50 hover:text-[#F6F1E7]"
                            >
                                Common Questions
                            </a>
                            <a
                                href="#support"
                                className="rounded-full border border-[#C1A674]/22 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F6F1E7]/80 transition hover:border-[#C1A674]/50 hover:text-[#F6F1E7]"
                            >
                                Support
                            </a>
                        </div>
                    </nav>

                    <section className="mb-14 rounded-[2rem] border border-[#C1A674]/22 bg-[#141414] p-8 md:p-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C1A674]">Fast Access</p>
                        <h2 className="mt-4 text-[24px] font-semibold uppercase leading-[1.2] text-[#F6F1E7]">Training Protocol 001</h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-[1.7] text-[#F6F1E7]/62">
                            Start with the official workflow guide if you are onboarding a new operator or setting up a fresh agency process.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a
                                href="/docs/user-guide"
                                className="rounded-full bg-[#C1A674] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414] transition hover:bg-[#d0b384]"
                            >
                                Open Training Protocol
                            </a>
                            <a
                                href="/docs/schema-contract"
                                className="rounded-full border border-white/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F6F1E7]/80 transition hover:border-[#C1A674]/60 hover:text-[#F6F1E7]"
                            >
                                View System Schema
                            </a>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
                        {SECTIONS.map((section) => (
                            <article id={section.id} key={section.id} className="rounded-[2rem] border border-[#C1A674]/22 bg-[#141414] p-8 md:p-10">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C1A674]">{section.kicker}</p>
                                <h3 className="mt-4 text-[24px] font-semibold uppercase leading-[1.2] text-[#F6F1E7]">{section.title}</h3>
                                <p className="mb-8 text-[13px] font-medium leading-relaxed text-[#F6F1E7]/62">{section.description}</p>

                                <ul className="space-y-4">
                                    {section.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-start gap-3 text-[13px] font-medium leading-relaxed text-[#F6F1E7]/78">
                                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#C1A674]" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 rounded-[1.2rem] border border-[#C1A674]/20 bg-[#0F0F0F] p-5">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C1A674]">Use Case Example</p>
                                    <p className="mt-3 text-[13px] leading-relaxed text-[#F6F1E7]/68">{section.example}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <section id="common-questions" className="mt-24">
                        <div className="mb-10">
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#C1A674]">Frequently Asked Questions</p>
                            <h2 className="text-3xl font-semibold uppercase leading-[0.92] tracking-tight text-[#F6F1E7] md:text-5xl">
                                Common
                                <br />
                                <span className="text-[#C1A674]">Operational Questions</span>
                            </h2>
                            <div className="mt-6 max-w-xl">
                                <input
                                    type="text"
                                    value={faqQuery}
                                    onChange={(event) => setFaqQuery(event.target.value)}
                                    placeholder="Search a question or keyword..."
                                    className="w-full rounded-full border border-white/15 bg-[#111111] px-5 py-3 text-[13px] text-[#F6F1E7] outline-none transition placeholder:text-[#F6F1E7]/35 focus:border-[#C1A674]/70"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {filteredFaqs.map((faq) => (
                                <article key={faq.question} className="rounded-[28px] border border-[#C1A674]/22 bg-[#141414] p-8 shadow-[0_4px_24px_rgba(20,20,20,0.02)]">
                                    <h3 className="mb-4 text-[24px] font-semibold leading-[1.25] tracking-tight text-[#F6F1E7]">{faq.question}</h3>
                                    <p className="text-[13px] font-medium leading-relaxed text-[#F6F1E7]/62">{faq.answer}</p>
                                    <div className="mt-6 border-t border-white/10 pt-4">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C1A674]/80">Was this helpful?</p>
                                        <div className="mt-3 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setFaqFeedback((prev) => ({ ...prev, [faq.question]: 'yes' }))}
                                                className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                                                    faqFeedback[faq.question] === 'yes'
                                                        ? 'border-[#C1A674] bg-[#C1A674]/20 text-[#F6F1E7]'
                                                        : 'border-white/15 text-[#F6F1E7]/70 hover:border-[#C1A674]/55'
                                                }`}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFaqFeedback((prev) => ({ ...prev, [faq.question]: 'no' }))}
                                                className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                                                    faqFeedback[faq.question] === 'no'
                                                        ? 'border-[#C1A674] bg-[#C1A674]/20 text-[#F6F1E7]'
                                                        : 'border-white/15 text-[#F6F1E7]/70 hover:border-[#C1A674]/55'
                                                }`}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {filteredFaqs.length === 0 && (
                            <p className="mt-6 text-[13px] text-[#F6F1E7]/55">No matching questions found. Try another keyword.</p>
                        )}
                    </section>

                    <section
                        id="support"
                        className="mt-24 rounded-[32px] border border-[#C1A674]/22 bg-[#141414] p-8 text-[#FBF7EF] shadow-[0_24px_60px_rgba(20,20,20,0.08)] md:p-12"
                    >
                        <div className="max-w-3xl">
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-[#C1A674]">Need Further Assistance?</p>
                            <h2 className="mb-5 text-3xl font-semibold uppercase leading-[0.95] tracking-tight md:text-5xl">
                                Support for technical, billing, and enterprise questions.
                            </h2>
                            <p className="text-base font-medium leading-relaxed text-[#FBF7EF]/65">
                                If your question is not answered above, our team can help with analysis delays, billing, whitelabel setup, and enterprise deployment enquiries.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
                                <a
                                    href="mailto:support@visualdecompiler.com"
                                    className="inline-flex items-center gap-3 rounded-full bg-[#C1A674] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414] transition-colors hover:bg-[#D4B88A]"
                                >
                                    <Mail className="h-4 w-4" />
                                    Email Support
                                </a>
                                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#FBF7EF]/40">
                                    Typical response: within 24 hours
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
