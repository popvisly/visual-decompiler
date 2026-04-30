'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';

type GuideSection = {
    id: string;
    title: string;
    description: string;
    bullets: string[];
    example: string;
};

const TAB_SECTIONS: GuideSection[] = [
    {
        id: 'asset',
        title: 'ASSET',
        description:
            'The source workspace for the creative you are analysing. Confirm you are looking at the correct execution before you interpret any outputs.',
        bullets: [
            'Confirm the asset is correct (format, crop, version, market, campaign context).',
            'Add tags early so the read is searchable later in Vault.',
            'Treat this as the evidence reference for every claim made in the dossier.',
        ],
        example:
            'Example: Before review, tag “Client: Nike”, “Market: AU”, “Format: 9:16”, then export once the team agrees the asset is final.',
    },
    {
        id: 'quality-gate',
        title: 'QUALITY GATE',
        description:
            'A first-pass integrity check. Quality Gate isolates execution risks that can sabotage performance regardless of strategy (legibility, hierarchy clarity, format survivability).',
        bullets: [
            'Catch breakpoints: unreadable type, competing focal points, weak CTA visibility, safe-zone issues.',
            'Treat it as a “fix-first” layer before deeper interpretation.',
            'If Quality Gate is failing, do not over-index on Psychology until fundamentals are corrected.',
        ],
        example:
            'Example: If the CTA is low-contrast or near platform UI chrome, adjust contrast/placement first, then rerun the read.',
    },
    {
        id: 'intelligence',
        title: 'INTELLIGENCE',
        description:
            'The strategic layer: how the creative is positioned, what it signals, and what it implies about category pressure and differentiation.',
        bullets: [
            'Translate execution into decision language stakeholders can approve.',
            'Pull out “why this works” as simple, defensible claims (not vibes).',
            'Define what must remain stable as variants are tested (the invariant).',
        ],
        example:
            'Example: “Restraint + visual isolation signals premium status; do not add density that breaks the status read.”',
    },
    {
        id: 'mechanics',
        title: 'MECHANICS',
        description:
            'Structural decomposition of how the ad works: hierarchy, pacing, contrast control, and attention routing.',
        bullets: [
            'Identify the exact elements doing the heavy lifting (and the elements diluting it).',
            'Look for mismatches between where attention goes and what you want the viewer to do.',
            'Turn insight into action: reposition, reduce density, tighten hierarchy, rebalance contrast.',
        ],
        example:
            'Example: If the product locks attention but the CTA is peripheral, restructure the hierarchy so the CTA inherits attention after recognition.',
    },
    {
        id: 'psychology',
        title: 'PSYCHOLOGY',
        description:
            'The behavioural layer: what the asset asks the viewer to feel, believe, and do — and which levers it uses to produce that shift.',
        bullets: [
            'Explain the persuasion mechanism (status, belonging, authority, scarcity, relief, aspiration).',
            'Pair psychological claims with visible evidence in the asset (not abstract theory).',
            'Anticipate objections: what the viewer might resist, distrust, or ignore.',
        ],
        example:
            'Example: “Authority tone + restrained palette builds trust; playful copy may undermine credibility.”',
    },
    {
        id: 'social-context',
        title: 'SOCIAL CONTEXT',
        description:
            'The context layer: where the asset lives, who is likely viewing it, and what surrounding cues shape interpretation.',
        bullets: [
            'Align on audience reality, not internal assumptions.',
            'Check cultural fit and category adjacency (what does it resemble in the wild?).',
            'Prepare stakeholder conversation: “this is how it reads in-feed / in-market.”',
        ],
        example:
            'Example: If a route reads as premium internally but looks like commodity content in-feed, tighten distinctiveness signals and spacing.',
    },
    {
        id: 'constraint-map',
        title: 'CONSTRAINT MAP',
        description:
            'A constraint-first view of what the asset cannot violate: safe zones, legibility thresholds, and structural limits across formats.',
        bullets: [
            'Prevent “pretty but broken” variants.',
            'Protect key claims, brand marks, and CTA from occlusion.',
            'Use when adapting a hero execution across placements and ratios.',
        ],
        example:
            'Example: When converting 9:16 to 4:5, preserve hierarchy so the conversion mechanism still holds.',
    },
    {
        id: 'blueprint-trace',
        title: 'BLUEPRINT TRACE',
        description:
            'A blueprint-level trace of the creative’s construction: how layers stack, what’s doing what, and where the pattern holds or leaks.',
        bullets: [
            'Understand the internal “design system” inside the asset.',
            'Replicate winning structure across a campaign system.',
            'Isolate which elements can change and which must remain stable.',
        ],
        example:
            'Example: Keep identity cue and hero framing stable, but test copy compression and CTA prominence.',
    },
    {
        id: 'stress-lab',
        title: 'STRESS LAB',
        description:
            'A stress-test layer for decision confidence. Pressure-test variables and predict where confidence breaks under review, risk, or uncertainty.',
        bullets: [
            'Validate the biggest “room-risk” variables before presentation.',
            'Define what to test next (not what to endlessly debate).',
            'Protect decision confidence: reduce ambiguity and tighten execution.',
        ],
        example:
            'Example: If “copy compression” is flagged, test shorter variants that preserve the core promise while reducing density.',
    },
    {
        id: 'market-pulse',
        title: 'MARKET PULSE',
        description:
            'Competitive context and market pressure signals. Market Pulse helps you interpret the route against saturation, novelty conditions, and timing.',
        bullets: [
            'Explain “why now” and “what we’re up against.”',
            'Justify differentiation with simple metrics + context statements.',
            'Anticipate fatigue: which cues are already overused in the category?',
        ],
        example:
            'Example: If saturation is high, remove generic category cues and tighten distinctiveness signals.',
    },
    {
        id: 'decision-log',
        title: 'DECISION LOG',
        description:
            'The final decision record: what you are choosing, why you are choosing it, and what gets tested next — designed to prevent circular review loops.',
        bullets: [
            'Capture approved rationale in one place.',
            'Align next actions (what changes, what stays).',
            'Use as handoff for production, client comms, or testing teams.',
        ],
        example:
            'Example: “Hold: gaze direction. Test: CTA prominence. Change: supporting copy compression.”',
    },
];

const NAV_SECTIONS: GuideSection[] = [
    {
        id: 'decompiler',
        title: 'Decompiler (Core)',
        description:
            'The Decompiler is the operating interface. Analyse assets, move through tabs in order, and export dossiers designed for review rooms.',
        bullets: [
            'Run the tabs in sequence to keep reads consistent across the team.',
            'Export only once the decision narrative is coherent (execution → meaning → decision).',
            'Use Vault + Boards so every read stays retrievable and reusable.',
        ],
        example:
            'Example: Treat the Decompiler like a pre-meeting protocol: upload → run tabs → export → present.',
    },
    {
        id: 'analyze-asset',
        title: 'Analyze Asset',
        description:
            'Upload the creative and trigger the analysis. This is the start point for every workflow.',
        bullets: [
            'Use final or near-final creative when possible (small changes can alter reads).',
            'If the file is identical, the system may return an existing analysis (deduplication).',
            'Name and tag the asset immediately to avoid losing it in larger workspaces.',
        ],
        example:
            'Example: If you need a fresh run, upload a revised version so it hashes differently.',
    },
    {
        id: 'intelligence-vault',
        title: 'Intelligence Vault',
        description:
            'Vault is the memory system. It stores analyses so they can be retrieved, compared, and reused instead of re-created.',
        bullets: [
            'Use search + tags to find reads by campaign, market, or format.',
            'Treat Vault like your evidence library for future decks and reviews.',
            'Use Vault retrieval to avoid unnecessary reruns when usage is tight.',
        ],
        example:
            'Example: Before pitch, pull three past category reads from Vault to identify stable persuasion patterns.',
    },
    {
        id: 'intelligence-pulse',
        title: 'Intelligence Pulse',
        description:
            'Pulse is route comparison. It is built for moments when two directions are contested and you need clear deltas.',
        bullets: [
            'Surface strategic differences (not just aesthetic differences).',
            'Identify which route holds attention and meaning more reliably.',
            'Produce a defensible “why” for the final selection.',
        ],
        example:
            'Example: Compare incumbent vs challenger routes to decide whether to iterate the current pattern or pivot.',
    },
    {
        id: 'market-pulse-dashboard',
        title: 'Market Pulse (Dashboard)',
        description:
            'Market Pulse also exists as a standalone area for competitive and context signals across your work.',
        bullets: [
            'Track category pressure across multiple assets.',
            'Justify timing and differentiation decisions.',
            'Use when planning a system of variants, not just a single asset.',
        ],
        example:
            'Example: If category fatigue is rising, plan a distinctiveness-focused variant set early.',
    },
    {
        id: 'sovereign-boards',
        title: 'Sovereign Boards',
        description:
            'Boards group analyses into curated sets for delivery, comparison, or internal review.',
        bullets: [
            'Package multiple reads into one review flow.',
            'Build campaign systems (hero + variants + competitor references).',
            'Create “one link” collections for internal alignment.',
        ],
        example:
            'Example: Build a board with five category exemplars + your preferred route read for pitch review.',
    },
    {
        id: 'settings-agency',
        title: 'Agency Settings',
        description:
            'Configure agency identity and output controls. This is where you set the system to feel like your team.',
        bullets: [
            'Set agency name, brand details, and output identity preferences.',
            'Use white-label output where enabled by plan.',
            'Keep identity consistent so exports look native in client rooms.',
        ],
        example:
            'Example: Use white-labeling for client-facing exports to reduce “tool output” feel and increase trust.',
    },
    {
        id: 'settings-team-seats',
        title: 'Team & Seats',
        description:
            'Invite operators and assign access. Seats keep collaboration clean and accountability clear.',
        bullets: [
            'Give strategists and creative leads access to read + export.',
            'Use roles to control who can manage settings and billing.',
            'Remove seats when contractors roll off to protect workspace privacy.',
        ],
        example:
            'Example: Add a producer seat for export + delivery responsibility, and keep billing access limited to owners.',
    },
    {
        id: 'usage-plans',
        title: 'Usage based on plan',
        description:
            'Usage depends on your subscription plan and the volume of analyses your team runs. Higher plans unlock deeper workflows and larger operating capacity.',
        bullets: [
            'Plans usually differ by analysis volume, collaboration features, and export / identity controls.',
            'Use Vault retrieval before rerunning analyses unnecessarily.',
            'For the latest details, refer to the Pricing page.',
        ],
        example:
            'Example: If you run frequent comparisons, choose a plan that supports higher-volume workflows.',
    },
];

function SectionHeading({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
    return (
        <header className="max-w-[860px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#8B6A3D]/80">{kicker}</p>
            <h2 className="mt-4 text-[34px] font-semibold uppercase leading-[0.96] tracking-tight text-[#141414] md:text-[44px]">
                {title}
            </h2>
            {description ? <p className="mt-5 text-[17px] leading-[1.75] text-[#6B6B6B]">{description}</p> : null}
        </header>
    );
}

export default function UserGuidePage() {
    const prefersReducedMotion = useReducedMotion();

    const jumpItems = [
        { label: 'Quick Start', href: '#quick-start' },
        { label: 'Tabs', href: '#tabs' },
        { label: 'Vault', href: '#intelligence-vault' },
        { label: 'Pulse', href: '#intelligence-pulse' },
        { label: 'Boards', href: '#sovereign-boards' },
        { label: 'Settings', href: '#settings-agency' },
        { label: 'Troubleshooting', href: '#troubleshooting' },
    ] as const;

    const [activeJump, setActiveJump] = React.useState<(typeof jumpItems)[number]['href']>('#quick-start');

    React.useEffect(() => {
        const idToHref = new Map(jumpItems.map((item) => [item.href.slice(1), item.href] as const));
        const sectionIds = jumpItems.map((item) => item.href.slice(1));
        const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const best = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
                if (!best?.target?.id) return;
                const next = idToHref.get(best.target.id);
                if (next) setActiveJump(next);
            },
            {
                root: null,
                threshold: [0.08, 0.18, 0.3],
                rootMargin: '-25% 0px -65% 0px',
            },
        );

        for (const el of sections) observer.observe(el);
        return () => observer.disconnect();
    }, [jumpItems]);

    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader />

            <div className="sticky top-[92px] z-40 mb-10 px-6 lg:top-[100px] lg:px-12">
                <div className="mx-auto w-full max-w-[1120px]">
                    <div className="max-w-[900px] rounded-[22px] border border-black/10 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="mr-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6B6B6B]">
                                Jump to
                            </p>
                            {jumpItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    aria-current={activeJump === item.href ? 'page' : undefined}
                                    className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] shadow-sm transition active:scale-[0.99] ${
                                        activeJump === item.href
                                            ? 'border-[#D4A574]/55 bg-[#FBF8F1] text-[#141414]'
                                            : 'border-black/10 bg-white text-[#6B6B6B] hover:border-[#D4A574]/40 hover:bg-[#FBF8F1] hover:text-[#141414]'
                                    }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <MarketingPageHeader
                kicker="User Guide"
                title="Using Visual Decompiler"
                description="A practical operator guide: run reads consistently, defend decisions, and export work that travels into review rooms."
                size="compact"
                sectionClassName="pt-24 pb-10 lg:pt-28 lg:pb-12"
            />

            <section className="pb-28 lg:pb-36">
                <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                    <div className="mt-2">
                        <motion.section
                            id="quick-start"
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={prefersReducedMotion ? undefined : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-14"
                        >
                            <SectionHeading
                                kicker="Quick Start"
                                title="From upload to decision-ready output."
                                description="Use this sequence for reviews, pitches, and client rooms. It keeps the read consistent across teams."
                            />

                            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                                {[
                                    {
                                        n: '01',
                                        title: 'Analyse the asset',
                                        body: 'Upload the creative you intend to defend. Add tags immediately so it is retrievable later.',
                                        href: '/ingest',
                                        cta: 'Open ingest',
                                    },
                                    {
                                        n: '02',
                                        title: 'Run the tabs in order',
                                        body: 'Quality Gate → Intelligence → Mechanics → Psychology → Stress Lab → Market Pulse → Decision Log.',
                                        href: '#tabs',
                                        cta: 'See the tabs',
                                    },
                                    {
                                        n: '03',
                                        title: 'Export the dossier',
                                        body: 'Once the team aligns, export a dossier designed for decks, internal reviews, and client conversation.',
                                        href: '#export',
                                        cta: 'Export guidance',
                                    },
                                ].map((step) => (
                                    <article key={step.n} className="rounded-[24px] border border-black/10 bg-white p-7 shadow-sm">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B6A3D]/80">Step {step.n}</p>
                                        <h3 className="mt-4 text-[18px] font-semibold leading-tight tracking-[-0.01em] text-[#141414]">
                                            {step.title}
                                        </h3>
                                        <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">{step.body}</p>
                                        <div className="mt-6">
                                            <a
                                                href={step.href}
                                                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#141414] transition hover:text-[#8B6A3D]"
                                            >
                                                {step.cta}
                                                <span aria-hidden="true">→</span>
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </motion.section>

                        <section id="tabs" className="mt-20 lg:mt-24">
                            <SectionHeading
                                kicker="Decompiler Tabs"
                                title="How the analysis sections work."
                                description="Each tab is a different lens. Use them in sequence so your rationale builds from execution → meaning → decision."
                            />

                            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {TAB_SECTIONS.map((section) => (
                                    <article key={section.id} id={section.id} className="rounded-[24px] border border-black/10 bg-white p-8 shadow-sm">
                                        <h3 className="text-[20px] font-semibold uppercase leading-[1.05] tracking-tight text-[#141414]">
                                            {section.title}
                                        </h3>
                                        <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">{section.description}</p>

                                        <ul className="mt-6 space-y-3">
                                            {section.bullets.map((bullet) => (
                                                <li key={bullet} className="text-[14px] leading-relaxed text-[#6B6B6B] font-medium">
                                                    <span className="mr-2 text-[#8B6A3D]/70">—</span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-7 rounded-[20px] border border-black/5 bg-[#FBFBF6] p-5">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B6A3D]/80">Example</p>
                                            <p className="mt-3 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">{section.example}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="mt-20 lg:mt-24">
                            <SectionHeading
                                kicker="Navigation Areas"
                                title="Vault, Pulse, Boards, and settings."
                                description="These areas support real workflows: retrieval, comparison, packaging, and governance."
                            />

                            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {NAV_SECTIONS.map((section) => (
                                    <article key={section.id} id={section.id} className="rounded-[24px] border border-black/10 bg-white p-8 shadow-sm">
                                        <h3 className="text-[20px] font-semibold uppercase leading-[1.05] tracking-tight text-[#141414]">
                                            {section.title}
                                        </h3>
                                        <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">{section.description}</p>

                                        <ul className="mt-6 space-y-3">
                                            {section.bullets.map((bullet) => (
                                                <li key={bullet} className="text-[14px] leading-relaxed text-[#6B6B6B] font-medium">
                                                    <span className="mr-2 text-[#8B6A3D]/70">—</span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-7 rounded-[20px] border border-black/5 bg-[#FBFBF6] p-5">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B6A3D]/80">Example</p>
                                            <p className="mt-3 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">{section.example}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section id="export" className="mt-20 lg:mt-24">
                            <SectionHeading
                                kicker="Export"
                                title="How to export and share a dossier."
                                description="Exports are designed to travel: decks, internal reviews, and client conversation."
                            />

                            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                                {[
                                    {
                                        title: 'When to export',
                                        body: 'Export after the team aligns on what holds, what changes, and what gets tested next.',
                                    },
                                    {
                                        title: 'What to include',
                                        body: 'Use the tab sequence so the dossier reads like a decision narrative, not a screenshot dump.',
                                    },
                                    {
                                        title: 'How to present',
                                        body: 'Lead with Decision Log, then show the evidence chain (Mechanics → Psychology → Market Pulse).',
                                    },
                                ].map((item) => (
                                    <article key={item.title} className="rounded-[24px] border border-black/10 bg-white p-7 shadow-sm">
                                        <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#141414]">{item.title}</h3>
                                        <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">{item.body}</p>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-10 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">
                                Want the latest plan capabilities? See <Link href="/pricing" className="text-[#141414] underline decoration-black/15 underline-offset-4 hover:decoration-black/35 transition">Pricing</Link>.
                            </div>
                        </section>

                        <section id="troubleshooting" className="mt-20 lg:mt-24">
                            <SectionHeading
                                kicker="Troubleshooting"
                                title="Common issues and fast fixes."
                                description="Most issues are workflow-related, not failures."
                            />

                            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {[
                                    {
                                        title: '“It analysed instantly / looks like old output”',
                                        body: 'Deduplication may have returned the existing analysis for an identical upload. Check Vault and confirm asset versioning.',
                                    },
                                    {
                                        title: '“The page looks stuck”',
                                        body: 'Refresh and check Vault. Results can complete before the UI updates. If it persists, try a revised asset version.',
                                    },
                                    {
                                        title: '“Export doesn’t look right”',
                                        body: 'Review the full tab sequence first. Check Agency Settings for identity/output controls that affect export styling.',
                                    },
                                    {
                                        title: '“We’re hitting usage limits”',
                                        body: 'Use Vault retrieval first (avoid reruns). If your workflow requires higher volume or white-labeling, see Pricing.',
                                    },
                                ].map((item) => (
                                    <article key={item.title} className="rounded-[24px] border border-black/10 bg-white p-7 shadow-sm">
                                        <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#141414]">{item.title}</h3>
                                        <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B] font-medium">{item.body}</p>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-10 rounded-[24px] border border-[#8B6A3D]/15 bg-[#141414] p-8 text-[#FBF7EF] shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">Support</p>
                                <p className="mt-4 text-[15px] leading-[1.75] text-white/70">
                                    If you still need help, include the asset id (or Vault link), the page URL, and what you expected to see.
                                </p>
                                <div className="mt-7 flex flex-wrap gap-3">
                                    <a
                                        href="mailto:hello@popvisly.com?subject=Visual%20Decompiler%20Help"
                                        className="rounded-full bg-[#D4A574] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414] transition hover:bg-[#e2b47f]"
                                    >
                                        Email support
                                    </a>
                                    <Link
                                        href="/docs/lexicon"
                                        className="rounded-full border border-white/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 transition hover:border-white/30 hover:text-white"
                                    >
                                        Open lexicon
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            <FooterStartNow />
        </main>
    );
}
