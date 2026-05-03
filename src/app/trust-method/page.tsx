'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Share2, Library, Award, MinusCircle, ArrowUpRight, Activity } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const METHOD_PILLARS = [
    {
        title: 'Input Integrity',
        body: 'We analyze the exact creative asset you provide, including your own work-in-progress, competitor campaigns, and client references. No hidden prompt shortcuts, no generic template scoring.',
        icon: ShieldCheck,
    },
    {
        title: 'Fixed System Language',
        body: 'Each extraction moves through a fixed operating sequence: source asset, quality gate, intelligence, mechanics, psychology, context, stress testing, market pulse, and decision record.',
        icon: Cpu,
    },
    {
        title: 'Decision Artifact',
        body: 'Outputs are organized for decision use: what is happening, why it matters, and what evidence supports it. The goal is not just interpretation, but execution-ready direction.',
        icon: Share2,
    },
    {
        title: 'Compounding Intelligence',
        body: 'Analyses are stored in Vault, so intelligence improves over time through cross-asset comparison and pattern recall. You are not starting from zero on every brief.',
        icon: Library,
    },
    {
        title: 'Agency-Grade Delivery',
        body: 'White-label controls let agencies and consultants deliver outputs under their own brand with boardroom-ready presentation standards.',
        icon: Award,
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

            {/* Forensic Grid Background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:40px_40px]"
                aria-hidden="true"
            />

            <div className="relative z-10 pt-32 lg:pt-44">
                <MarketingPageHeader
                    kicker="Operational Protocol"
                    title={
                        <>
                            Intelligence you can <span className="text-[#8B6A3D]">defend.</span>
                        </>
                    }
                    description="Visual Decompiler is designed to produce client-defensible outputs, not generic AI commentary. Every dossier is built from structured visual analysis, vault memory, and a fixed workflow your team can review."
                />
            </div>

            <section className="relative z-10 px-6 py-20 lg:py-32">
                <div className="mx-auto max-w-[1200px]">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {METHOD_PILLARS.map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.article
                                    key={pillar.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                    className={`relative flex flex-col justify-between rounded-[2.5rem] border p-10 transition-all hover:shadow-xl ${
                                        index === METHOD_PILLARS.length - 1
                                            ? 'lg:col-span-1 bg-[#141414] text-[#FBF7EF] border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.2)]'
                                            : 'bg-white border-black/5 shadow-sm hover:border-[#D4A574]/30'
                                    }`}
                                >
                                    <div>
                                        <div className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl ${index === METHOD_PILLARS.length - 1 ? 'bg-[#D4A574]/10 text-[#D4A574]' : 'bg-[#FBFBF6] text-[#8B6A3D]'}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <p className={`text-[10px] font-bold uppercase tracking-[0.4em] ${index === METHOD_PILLARS.length - 1 ? 'text-[#D4A574]' : 'text-[#8B6A3D]'}`}>
                                            {pillar.title}
                                        </p>
                                        <p className={`mt-6 text-[15px] leading-[1.75] font-medium ${index === METHOD_PILLARS.length - 1 ? 'text-white/60' : 'text-[#515151]'}`}>
                                            {pillar.body}
                                        </p>
                                    </div>
                                    <div className={`mt-8 pt-6 border-t ${index === METHOD_PILLARS.length - 1 ? 'border-white/10' : 'border-black/5'}`}>
                                        <div className="flex items-center gap-2">
                                            <Activity className={`h-3 w-3 ${index === METHOD_PILLARS.length - 1 ? 'text-[#D4A574]' : 'text-black/20'}`} />
                                            <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${index === METHOD_PILLARS.length - 1 ? 'text-white/40' : 'text-black/30'}`}>Protocol Active</span>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative z-10 border-y border-black/5 bg-[#141414] px-6 py-24 lg:py-32">
                <div className="mx-auto max-w-[1200px]">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4A574]">Safety Protocol</p>
                            <h2 className="mt-8 text-[40px] font-black leading-[0.92] tracking-[-0.03em] uppercase text-white md:text-[56px]">
                                Operational <br /> Boundaries.
                            </h2>
                            <p className="mt-8 text-[18px] leading-relaxed text-white/50 max-w-md">
                                Visual Decompiler is an analytical operating system, not a creative shortcut. We enforce strict boundaries to ensure intelligence integrity.
                            </p>
                        </div>
                        <div className="grid gap-4">
                            {WHAT_IT_IS_NOT.map((line, i) => (
                                <motion.div 
                                    key={line}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-5 text-[14px] font-bold uppercase tracking-[0.15em] text-white/80"
                                >
                                    <MinusCircle className="h-4 w-4 text-[#D4A574] shrink-0" />
                                    {line}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-32 lg:py-48">
                <div className="mx-auto max-w-[800px] text-center">
                    <h2 className="text-[32px] font-black uppercase leading-tight tracking-tight text-[#141414] md:text-[48px]">
                        The clinical path to creative alignment.
                    </h2>
                    <p className="mt-8 text-[19px] leading-relaxed text-[#515151]">
                        Built to defend creative decisions, align teams faster, and turn analysis into an artifact people can actually review.
                    </p>
                    <div className="mt-12 flex justify-center">
                        <Link
                            href={SAMPLE_DOSSIER_HREF}
                            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#141414] px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBF7EF] transition hover:bg-black"
                        >
                            View Sample Dossier
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

