import type { Metadata } from 'next';
import Link from 'next/link';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export const metadata: Metadata = {
    title: 'Trust & Method | Visual Decompiler',
    description:
        'How Visual Decompiler turns ad analysis into a repeatable, reviewable intelligence workflow with structured visual analysis, transparent output logic, and agency-grade delivery.',
};

const METHOD_PILLARS = [
    {
        title: 'Input Integrity',
        body: 'We analyze the exact creative asset you provide, including your own work-in-progress, competitor campaigns, and client references. No hidden prompt shortcuts, no generic template scoring.',
    },
    {
        title: 'Fixed System Language',
        body: 'Each extraction moves through a fixed operating sequence: source asset, quality gate, intelligence, mechanics, psychology, context, stress testing, market pulse, and decision record. The system stays repeatable across every asset and every team.',
    },
    {
        title: 'Decision Artifact',
        body: 'Outputs are organized for decision use: what is happening, why it matters, what evidence supports it, what caveats remain, and what to do next. The goal is not just interpretation, but execution-ready direction.',
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
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Free', href: '/ingest' }} />

            <div className="border-b border-black/5">
                <MarketingPageHeader
                    kicker="Trust & Method"
                    title={
                        <>
                            How Visual Decompiler generates strategic intelligence you can defend.
                        </>
                    }
                    description="Visual Decompiler is designed to produce client-defensible outputs, not generic AI commentary. Every dossier is built from structured visual analysis, vault memory, decision logic, and a fixed workflow your team can review and rerun."
                />
            </div>

            <section className="px-6 py-14 md:py-16">
                <div className="mx-auto max-w-[1120px]">
                    <div className="grid gap-4 md:grid-cols-2">
                        {METHOD_PILLARS.map((pillar, index) => (
                            <article
                                key={pillar.title}
                                className={`rounded-[1.8rem] border px-6 py-6 ${
                                    index === METHOD_PILLARS.length - 1
                                        ? 'md:col-span-2 bg-[#141414] text-[#FBF7EF] border-[#8B6A3D]/15 shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
                                        : 'bg-white border-black/5 shadow-sm'
                                }`}
                            >
                                <p
                                    className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${
                                        index === METHOD_PILLARS.length - 1 ? 'text-[#D4A574]' : 'text-[#8B6A3D]/80'
                                    }`}
                                >
                                    {pillar.title}
                                </p>
                                <p
                                    className={`mt-4 max-w-2xl text-[15px] leading-7 ${
                                        index === METHOD_PILLARS.length - 1 ? 'text-white/75' : 'text-[#6B6B6B]'
                                    }`}
                                >
                                    {pillar.body}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-black/5 bg-[#F6F1E7] px-6 py-14 md:py-16">
                <div className="mx-auto max-w-[1120px]">
                    <div className="rounded-[1.8rem] border border-black/5 bg-white px-6 py-6 shadow-sm md:px-8">
                        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#141414] md:text-3xl">
                            What Visual Decompiler is not
                        </h2>
                        <div className="mt-6 grid gap-3 md:grid-cols-2">
                            {WHAT_IT_IS_NOT.map((line) => (
                                <p key={line} className="rounded-[1.2rem] border border-black/5 bg-[#FBFBF6] px-4 py-4 text-[15px] leading-7 text-[#141414]">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-20">
                <div className="mx-auto max-w-[1120px] text-center">
                    <p className="mx-auto max-w-3xl text-[18px] leading-relaxed text-[#6B6B6B] md:text-[22px]">
                        Built to defend creative decisions, align teams faster, and turn analysis into an artifact people can actually review.
                    </p>
                    <Link
                        href={SAMPLE_DOSSIER_HREF}
                        className="mt-8 inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#141414] shadow-sm transition hover:-translate-y-[1px] hover:border-black/20 hover:bg-[#FBFBF6]"
                    >
                        View Sample Dossier
                    </Link>
                </div>
            </section>
        </main>
    );
}
