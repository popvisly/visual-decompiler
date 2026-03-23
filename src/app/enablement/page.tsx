import type { Metadata } from 'next';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import ObjectionCard from '@/components/enablement/ObjectionCard';
import StickyEnablementNav from '@/components/enablement/StickyEnablementNav';
import {
    ENABLEMENT_DEMO_FLOW,
    ENABLEMENT_GUARDRAILS,
    ENABLEMENT_HOMEPAGE_READOUT_RULES,
    ENABLEMENT_HOMEPAGE_SOURCE_NOTES,
    ENABLEMENT_HOMEPAGE_READOUT_TARGETS,
    ENABLEMENT_POSITIONING_ANCHOR,
    ENABLEMENT_POSITIONING_LOCK,
    ENABLEMENT_PROOF_MAP,
    ENABLEMENT_SNIPPETS,
    loadSalesObjections,
} from '@/lib/enablement-content';

export const metadata: Metadata = {
    title: 'Enablement | Visual Decompiler',
    description:
        'Internal positioning, objections, proof points, and demo sequencing for Visual Decompiler calls and demos.',
};

const NAV_ITEMS = [
    { id: 'positioning', label: 'Positioning' },
    { id: 'objections', label: 'Objections' },
    { id: 'demo-flow', label: 'Demo Flow' },
    { id: 'proof-map', label: 'Proof Map' },
    { id: 'homepage-readout', label: 'Homepage Readout' },
    { id: 'snippets', label: 'Snippets' },
] as const;

export default async function EnablementPage() {
    const objections = await loadSalesObjections();

    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Analysis', href: '/ingest' }} />

            <section className="border-b border-[#E2D8C8] px-6 pb-12 pt-36 md:pb-16 md:pt-44">
                <div className="mx-auto max-w-5xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Enablement</p>
                    <h1 className="mt-5 max-w-4xl text-[38px] font-semibold leading-[0.94] tracking-[-0.04em] text-[#141414] md:text-[68px]">
                        Fast in-call positioning, objections, proof points, and demo flow.
                    </h1>
                    <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#5E5A53] md:text-xl">
                        Use this page to keep calls, demos, and follow-up language aligned. It is designed for quick navigation under pressure, not long reading.
                    </p>
                </div>
            </section>

            <section className="px-6 py-10 md:py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-10 md:grid-cols-[220px,minmax(0,1fr)] md:gap-8">
                        <div>
                            <StickyEnablementNav items={NAV_ITEMS} />
                        </div>

                        <div className="space-y-8 md:space-y-10">
                            <section id="positioning" className="scroll-mt-28 rounded-[1.9rem] border border-[#D8CCB5] bg-[#FCFAF5] px-6 py-6 md:px-8 md:py-8">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8E7450]">Positioning lock</p>
                                <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#141414] md:text-[34px]">
                                    {ENABLEMENT_POSITIONING_LOCK}
                                </h2>
                                <p className="mt-4 max-w-3xl text-[16px] leading-8 text-[#4F4A43]">
                                    {ENABLEMENT_POSITIONING_ANCHOR}
                                </p>
                            </section>

                            <section id="objections" className="scroll-mt-28 space-y-4 md:space-y-5">
                                <div className="rounded-[1.5rem] border border-[#D8CCB5] bg-[#F8F3EA] px-5 py-5 md:px-6">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8E7450]">Objections</p>
                                    <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#5E5A53]">
                                        Jump straight to the objection you need, then anchor the response to live product proof.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2.5">
                                        {objections.map((objection) => (
                                            <a
                                                key={objection.slug}
                                                href={`#${objection.slug}`}
                                                className="rounded-full border border-[#D8CCB5] bg-[#FBFBF6] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7E6948] transition hover:border-[#B89462] hover:text-[#5F4724]"
                                            >
                                                {objection.objection}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {objections.map((objection) => (
                                    <ObjectionCard key={objection.slug} objection={objection} />
                                ))}
                            </section>

                            <section id="demo-flow" className="scroll-mt-28 rounded-[1.85rem] border border-[#D8CCB5] bg-[#FCFAF5] px-6 py-6 md:px-8">
                                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                    <div className="max-w-2xl">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8E7450]">Demo Flow</p>
                                        <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#141414] md:text-[32px]">
                                            7-minute demo arc
                                        </h2>
                                        <p className="mt-4 text-[15px] leading-7 text-[#5E5A53]">
                                            Keep the sequence tight. Show the product as a decision system, not a feature tour.
                                        </p>
                                    </div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A7B64]">
                                        Use live screens, not static slides
                                    </p>
                                </div>
                                <div className="mt-6 grid gap-3 md:grid-cols-2">
                                    {ENABLEMENT_DEMO_FLOW.map((step, index) => (
                                        <div
                                            key={step}
                                            className="rounded-[1.2rem] border border-[#E5DDCF] bg-[#FBFBF6] px-4 py-4"
                                        >
                                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B28D56]">
                                                {String(index + 1).padStart(2, '0')}
                                            </p>
                                            <p className="mt-2 text-[15px] leading-7 text-[#3F3A33]">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section id="proof-map" className="scroll-mt-28 rounded-[1.85rem] border border-[#D8CCB5] bg-[#FCFAF5] px-6 py-6 md:px-8">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8E7450]">Proof Map</p>
                                <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#141414] md:text-[32px]">
                                    Objection to product screen
                                </h2>
                                <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-[#E5DDCF]">
                                    {ENABLEMENT_PROOF_MAP.map((row, index) => (
                                        <div
                                            key={row.objection}
                                            className={`grid gap-3 bg-[#FBFBF6] px-5 py-4 md:grid-cols-[220px,minmax(0,1fr)] ${
                                                index !== ENABLEMENT_PROOF_MAP.length - 1 ? 'border-b border-[#E5DDCF]' : ''
                                            }`}
                                        >
                                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7E6948]">
                                                {row.objection}
                                            </p>
                                            <p className="text-[15px] leading-7 text-[#4F4A43]">{row.screens}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section id="homepage-readout" className="scroll-mt-28 rounded-[1.85rem] border border-[#D8CCB5] bg-[#FCFAF5] px-6 py-6 md:px-8">
                                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                    <div className="max-w-3xl">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8E7450]">Homepage Readout</p>
                                        <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#141414] md:text-[32px]">
                                            Week-one interpretation for the ad-to-intelligence block
                                        </h2>
                                        <p className="mt-4 text-[15px] leading-7 text-[#5E5A53]">
                                            Use this to decide whether the block needs a placement change, a persuasion tweak, or no change at all.
                                        </p>
                                    </div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A7B64]">
                                        Variant v1
                                    </p>
                                </div>

                                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                                    {ENABLEMENT_HOMEPAGE_READOUT_TARGETS.map((target) => (
                                        <article
                                            key={target.metric}
                                            className="rounded-[1.2rem] border border-[#E5DDCF] bg-[#FBFBF6] px-4 py-4"
                                        >
                                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B28D56]">
                                                {target.metric}
                                            </p>
                                            <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7E6948]">
                                                {target.event}
                                            </p>
                                            <p className="mt-3 text-[22px] font-semibold tracking-tight text-[#141414]">
                                                {target.target}
                                            </p>
                                            <p className="mt-3 text-[14px] leading-6 text-[#4F4A43]">{target.meaning}</p>
                                        </article>
                                    ))}
                                </div>

                                <div className="mt-6 grid gap-3 md:grid-cols-2">
                                    {ENABLEMENT_HOMEPAGE_READOUT_RULES.map((rule) => (
                                        <article
                                            key={rule.title}
                                            className="rounded-[1.2rem] border border-[#E5DDCF] bg-[#FBFBF6] px-4 py-4"
                                        >
                                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B28D56]">
                                                {rule.title}
                                            </p>
                                            <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#7E6948]">
                                                {rule.threshold}
                                            </p>
                                            <p className="mt-3 text-[15px] leading-7 text-[#3F3A33]">{rule.action}</p>
                                        </article>
                                    ))}
                                </div>

                                <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-[#E5DDCF]">
                                    {ENABLEMENT_HOMEPAGE_SOURCE_NOTES.map((note, index) => (
                                        <div
                                            key={note.label}
                                            className={`grid gap-3 bg-[#FBFBF6] px-5 py-4 md:grid-cols-[180px,minmax(0,1fr)] ${
                                                index !== ENABLEMENT_HOMEPAGE_SOURCE_NOTES.length - 1 ? 'border-b border-[#E5DDCF]' : ''
                                            }`}
                                        >
                                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7E6948]">
                                                {note.label}
                                            </p>
                                            <p className="text-[15px] leading-7 text-[#4F4A43]">{note.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr),minmax(0,0.85fr)]">
                                <section className="rounded-[1.85rem] border border-[#D8CCB5] bg-[#FCFAF5] px-6 py-6 md:px-8">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8E7450]">Do not say</p>
                                    <div className="mt-5 space-y-3">
                                        {ENABLEMENT_GUARDRAILS.map((rule) => (
                                            <p
                                                key={rule}
                                                className="rounded-[1.2rem] border border-[#E5DDCF] bg-[#FBFBF6] px-4 py-4 text-[15px] leading-7 text-[#3F3A33]"
                                            >
                                                {rule}
                                            </p>
                                        ))}
                                    </div>
                                </section>

                                <section id="snippets" className="scroll-mt-28 rounded-[1.85rem] border border-[#3C3428] bg-[#15130F] px-6 py-6 text-[#F4E9D9] md:px-8">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D7B07A]">Snippets</p>
                                    <div className="mt-5 space-y-4">
                                        {ENABLEMENT_SNIPPETS.map((snippet) => (
                                            <article
                                                key={snippet.title}
                                                className="rounded-[1.25rem] border border-[#4A4031] bg-[#1B1813] px-4 py-4"
                                            >
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7B07A]">
                                                    {snippet.title}
                                                </p>
                                                <p className="mt-3 text-[15px] leading-7 text-[#E1D3BD]">{snippet.body}</p>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
