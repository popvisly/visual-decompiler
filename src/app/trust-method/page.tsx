import type { Metadata } from 'next';
import Link from 'next/link';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';

export const metadata: Metadata = {
    title: 'Trust & Method | Visual Decompiler',
    description:
        'How Visual Decompiler generates strategic intelligence you can defend through structured visual analysis, transparent output logic, and agency-grade delivery.',
};

const METHOD_PILLARS = [
    {
        title: 'Input Integrity',
        body: 'We analyze the exact creative asset you provide — including your own work-in-progress, competitor campaigns, and client references. No hidden prompt shortcuts, no generic template scoring.',
    },
    {
        title: 'Fixed System Language',
        body: 'Each extraction is organized into five fixed labels: Primary Scores, Attention Path, Structural Signals, Strategic Read, and Confidence Index. The system stays repeatable across every asset and every team.',
    },
    {
        title: 'Strategic Read',
        body: 'Outputs are organized for decision use: what is happening, why it matters, and what to do next. The goal is not just interpretation, but execution-ready direction.',
    },
    {
        title: 'Compounding Intelligence',
        body: 'Analyses are stored in Vault, so intelligence improves over time through cross-asset comparison, pattern recall, and category-level tracking. You are not starting from zero on every brief.',
    },
    {
        title: 'Agency-Grade Delivery',
        body: 'White-label controls let agencies and consultants deliver outputs under their own brand with boardroom-ready presentation standards.',
    },
] as const;

const WHAT_IT_IS_NOT = [
    'Not an ad generator',
    'Not a media spend dashboard',
    'Not a one-off research PDF factory',
    'Not generic AI chat wrapped in a UI',
] as const;

export default function TrustMethodPage() {
    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Decompiling Free', href: '/ingest' }} />

            <section className="border-b border-[#E2D8C8] px-6 pb-16 pt-36 md:pb-20 md:pt-44">
                <div className="mx-auto max-w-5xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Trust & Method</p>
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">Forensic Advertising Intelligence OS</p>
                    <h1 className="mt-5 max-w-4xl text-[40px] font-semibold leading-[0.94] tracking-[-0.04em] text-[#141414] md:text-[72px]">
                        How Visual Decompiler generates strategic intelligence you can defend.
                    </h1>
                    <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#5E5A53] md:text-xl">
                        Visual Decompiler is designed to produce client-defensible outputs — not generic AI commentary. Every dossier is built from structured visual analysis and a fixed system language: Primary Scores, Attention Path, Structural Signals, Strategic Read, and Confidence Index.
                    </p>
                </div>
            </section>

            <section className="px-6 py-14 md:py-16">
                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-4 md:grid-cols-2">
                        {METHOD_PILLARS.map((pillar, index) => (
                            <article
                                key={pillar.title}
                                className={`rounded-[1.8rem] border border-[#D8CCB5] px-6 py-6 ${
                                    index === METHOD_PILLARS.length - 1 ? 'md:col-span-2 bg-[#15130F] text-[#F4E9D9] border-[#3C3428]' : 'bg-[#FCFAF5]'
                                }`}
                            >
                                <p className={`text-[10px] font-bold uppercase tracking-[0.28em] ${index === METHOD_PILLARS.length - 1 ? 'text-[#D7B07A]' : 'text-[#8E7450]'}`}>
                                    {pillar.title}
                                </p>
                                <p className={`mt-4 max-w-2xl text-[15px] leading-7 ${index === METHOD_PILLARS.length - 1 ? 'text-[#D4C4AB]' : 'text-[#5E5A53]'}`}>
                                    {pillar.body}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-[#E2D8C8] bg-[#F8F3EA] px-6 py-14 md:py-16">
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-[1.8rem] border border-[#D8CCB5] bg-[#FBFBF6] px-6 py-6 md:px-8">
                        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#141414] md:text-3xl">
                            What Visual Decompiler is not
                        </h2>
                        <div className="mt-6 grid gap-3 md:grid-cols-2">
                            {WHAT_IT_IS_NOT.map((line) => (
                                <p key={line} className="rounded-[1.2rem] border border-[#E6DDCF] px-4 py-4 text-[15px] leading-7 text-[#3F3A33]">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-20">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mx-auto max-w-3xl text-[18px] leading-relaxed text-[#3F3A33] md:text-[22px]">
                        Built to defend creative decisions, align teams faster, and get work approved with less back-and-forth.
                    </p>
                    <Link
                        href="/compare"
                        className="mt-8 inline-flex items-center justify-center rounded-full border border-[#C9B08B] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7E6948] transition hover:-translate-y-[1px] hover:border-[#B89462] hover:text-[#5F4724]"
                    >
                        See Decompiler Output
                    </Link>
                </div>
            </section>
        </main>
    );
}
