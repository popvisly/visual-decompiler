'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, FileText, GitCompare, Library, Users, Activity, ShieldCheck, Zap, Globe } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';
import { PRICING, PRICING_COMPARISON_ROWS, PRICING_POSITIONING_LINES } from '@/lib/pricing';
import LogoMark from '@/components/LogoMark';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PLAN_SUMMARIES = {
    observer: ['5 full dossiers', 'Private vault memory', 'No card required'],
    strategic: ['250 dossiers / cycle', 'Compare routes', 'Export decision artifacts'],
    professional: ['250 dossiers / cycle', '3-5 seats', 'Shared Vault + Boards'],
    agency: ['Custom volume', 'Up to 10 seats', 'White-label intelligence OS'],
} as const;

const WORKFLOW_VALUE = [
    {
        title: 'Structured Artifact',
        body: 'Every analysis resolves into a dossier with evidence anchors, caveats, and decision language.',
        icon: FileText,
    },
    {
        title: 'Vault Memory',
        body: 'Each saved read becomes reusable context for future work instead of disappearing into chat history.',
        icon: Library,
    },
    {
        title: 'Comparison Workflow',
        body: 'Move from one-off critique to route comparison, stress testing, and clearer recommendation logic.',
        icon: GitCompare,
    },
    {
        title: 'Team Delivery',
        body: 'Higher tiers turn the system into shared agency infrastructure: seats, boards, white-label exports, and client-ready output.',
        icon: Users,
    },
] as const;

function CheckItem({ children, tone = 'light' }: { children: React.ReactNode; tone?: 'light' | 'dark' }) {
    return (
        <li className="flex items-start gap-4 text-sm leading-relaxed">
            <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${tone === 'dark' ? 'bg-white/10 text-[#D4A574]' : 'bg-black/5 text-[#8B6A3D]'}`}>
                <Check className="h-2.5 w-2.5 stroke-[3]" />
            </span>
            <span className={tone === 'dark' ? 'text-white/72' : 'text-[#6B6B6B]'}>{children}</span>
        </li>
    );
}

function PlanSummary({ items, tone = 'light' }: { items: readonly string[]; tone?: 'light' | 'dark' }) {
    return (
        <div className={`mb-8 grid gap-2 rounded-[20px] border p-4 ${tone === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-black/5 bg-[#FBFBF6]'}`}>
            {items.map((item) => (
                <p key={item} className={`text-[11px] font-bold uppercase tracking-[0.18em] ${tone === 'dark' ? 'text-white/70' : 'text-[#141414]/70'}`}>
                    {item}
                </p>
            ))}
        </div>
    );
}

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleCheckout = async (planKey: string) => {
        setLoading(planKey);
        try {
            const res = await fetch('/api/billing/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planKey }),
            });
            const { url, error } = await res.json();
            if (error) throw new Error(error);
            if (url) window.location.href = url;
        } catch (err: any) {
            console.error('Checkout failed:', err);
            alert(`Unable to initiate checkout: ${err.message || 'Please try again later.'}`);
        } finally {
            setLoading(null);
        }
    };

    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader />

            <div className="pt-32 lg:pt-44">
                <MarketingPageHeader
                    kicker="Operational Intelligence"
                    title={
                        <>
                            Own the creative.
                            <span className="block">Defend the decision.</span>
                        </>
                    }
                    description="Visual Decompiler is more than a tool—it's a shared language for the people who actually have to defend creative work in the room."
                />
            </div>

            {/* Pricing Cards Grid */}
            <section className="px-6 pb-48">
                <div className="mx-auto max-w-[1440px]">
                    
                    <div className="mb-20 grid gap-8 lg:grid-cols-4">
                        
                        {/* Observer */}
                        <motion.article
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="flex flex-col justify-between rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm"
                        >
                            <div>
                                <div className="mb-6 flex items-center justify-between">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">{PRICING.observer.name}</p>
                                    <LogoMark size={20} className="text-black/10" />
                                </div>
                                <h3 className="text-6xl font-black tracking-tightest mb-2 leading-none">{PRICING.observer.priceLabel}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A84] mb-10">{PRICING.observer.cadenceLabel}</p>
                                
                                <p className="text-[18px] font-black uppercase leading-tight mb-4 text-[#141414]">Defensible Creative.</p>
                                <p className="text-[#6B6B6B] mb-8 leading-relaxed text-[15px]">{PRICING.observer.whoItsFor}</p>
                                <PlanSummary items={PLAN_SUMMARIES.observer} />
                                
                                <ul className="space-y-5 mb-12">
                                    {PRICING.observer.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                            <a
                                href={PRICING.observer.ctaHref}
                                className="inline-flex w-full items-center justify-center rounded-full bg-[#141414] px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                {PRICING.observer.ctaLabel}
                            </a>
                        </motion.article>

                        {/* Strategic */}
                        <motion.article
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                            className="flex flex-col justify-between rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-sm"
                        >
                            <div>
                                <div className="mb-6 flex items-center justify-between">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">{PRICING.strategic.name}</p>
                                    <LogoMark size={20} className="text-[#D4A574]" />
                                </div>
                                <h3 className="text-6xl font-black tracking-tightest mb-2 leading-none">${PRICING.strategic.monthlyPrice}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6A3D]/70 mb-10">Per month</p>
                                
                                <p className="text-[18px] font-black uppercase leading-tight mb-4 text-[#141414]">The Strategic Edge.</p>
                                <p className="text-[#6B6B6B] mb-8 leading-relaxed text-[15px]">{PRICING.strategic.whoItsFor}</p>
                                <PlanSummary items={PLAN_SUMMARIES.strategic} />
                                <p className="text-[11px] font-bold text-black/30 mb-8 leading-relaxed italic border-l-2 border-[#D4A574]/20 pl-4 uppercase tracking-[0.1em]">Plus all Observer tools</p>
                                
                                <ul className="space-y-5 mb-12">
                                    {PRICING.strategic.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                            <button
                                onClick={() => handleCheckout(PRICING.strategic.checkoutPlanKey)}
                                disabled={loading !== null}
                                className="inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition hover:border-black/20 hover:bg-[#FBFBF6] disabled:opacity-50"
                            >
                                {loading === PRICING.strategic.checkoutPlanKey ? 'Processing...' : PRICING.strategic.ctaLabel}
                            </button>
                        </motion.article>

                        {/* Professional */}
                        <motion.article
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                            className="relative flex flex-col justify-between rounded-[2.5rem] border border-[#D4A574]/40 bg-white p-10 shadow-[0_30px_100px_rgba(212,165,116,0.1)] ring-1 ring-[#D4A574]/20"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#141414] px-6 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#FBF7EF] whitespace-nowrap shadow-xl">
                                Standard Framework
                            </div>
                            <div>
                                <div className="mb-6 flex items-center justify-between">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">{PRICING.professional.name}</p>
                                    <LogoMark size={20} className="text-[#D4A574]" />
                                </div>
                                <h3 className="text-6xl font-black tracking-tightest mb-2 leading-none">${PRICING.professional.monthlyPrice}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6A3D]/70 mb-10">Per month</p>
                                
                                <p className="text-[18px] font-black uppercase leading-tight mb-4 text-[#141414]">Collective Memory.</p>
                                <p className="text-[#6B6B6B] mb-8 leading-relaxed text-[15px]">{PRICING.professional.whoItsFor}</p>
                                <PlanSummary items={PLAN_SUMMARIES.professional} />
                                <p className="text-[11px] font-bold text-black/30 mb-8 leading-relaxed italic border-l-2 border-[#D4A574]/20 pl-4 uppercase tracking-[0.1em]">Plus all Strategic tools</p>
                                
                                <ul className="space-y-5 mb-12">
                                    {PRICING.professional.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                            <button
                                onClick={() => handleCheckout(PRICING.professional.checkoutPlanKey)}
                                disabled={loading !== null}
                                className="inline-flex w-full items-center justify-center rounded-full bg-[#141414] px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBF7EF] transition hover:bg-black disabled:opacity-50"
                            >
                                {loading === PRICING.professional.checkoutPlanKey ? 'Processing...' : PRICING.professional.ctaLabel}
                            </button>
                        </motion.article>

                        {/* Agency Sovereignty */}
                        <motion.article
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                            className="flex flex-col justify-between rounded-[2.5rem] border border-white/10 bg-[#141414] p-10 text-[#FBF7EF] shadow-[0_40px_120px_rgba(0,0,0,0.3)]"
                        >
                            <div>
                                <div className="mb-6 flex items-center justify-between">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">{PRICING.agency.name}</p>
                                    <LogoMark size={20} tone="white" />
                                </div>
                                <h3 className="text-5xl font-black tracking-tightest mb-2 leading-none">Custom</h3>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-10">Annual contract</p>
                                
                                <p className="text-[18px] font-black uppercase leading-tight mb-4 text-white">Total Sovereignty.</p>
                                <p className="text-white/60 mb-8 leading-relaxed text-[15px]">{PRICING.agency.whoItsFor}</p>
                                <PlanSummary items={PLAN_SUMMARIES.agency} tone="dark" />
                                
                                <div className="my-8 rounded-2xl bg-white/[0.03] px-6 py-6 border border-white/5 italic">
                                    <p className="text-[13px] leading-[1.7] text-white/70 tracking-tight">“{PRICING.agency.positioningQuote}”</p>
                                </div>

                                <ul className="space-y-5 mb-12">
                                    {PRICING.agency.features.map((feature) => (
                                        <CheckItem key={feature} tone="dark">{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                            <a
                                href={PRICING.agency.ctaHref}
                                className="inline-flex w-full items-center justify-center rounded-full border border-[#D4A574]/60 px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4A574] transition hover:bg-[#D4A574] hover:text-[#141414]"
                            >
                                {PRICING.agency.ctaLabel}
                            </a>
                        </motion.article>

                    </div>

                    {/* Scale Logic Section */}
                    <div className="mb-12 rounded-[2.5rem] border border-black/5 bg-[#141414] p-10 text-[#FBF7EF] shadow-[0_24px_70px_rgba(20,20,20,0.14)] lg:p-14">
                        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-[700px]">
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">System Architecture</p>
                                <h2 className="mt-6 text-[32px] font-black uppercase leading-[0.92] tracking-tight md:text-[52px]">
                                    More workflow depth, not just more credits.
                                </h2>
                                <p className="mt-8 text-[17px] leading-relaxed text-white/50">
                                    The upgrade path follows the real operating model: artifact, memory, comparison, collaboration, and agency delivery.
                                </p>
                            </div>
                            <div className="h-px w-full bg-white/10 lg:hidden" />
                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <Activity className="h-4 w-4 text-[#D4A574]" />
                                Scalable Core v2.4
                            </div>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {WORKFLOW_VALUE.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.article 
                                        key={item.title}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="rounded-3xl border border-white/5 bg-white/[0.02] p-7 transition-colors hover:bg-white/[0.04]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4A574]/10 text-[#D4A574]">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-6 text-[13px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">{item.title}</h3>
                                        <p className="mt-4 text-[14px] leading-[1.65] text-white/50 font-medium">{item.body}</p>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Capability Matrix - Spec Sheet Refinement */}
            <section className="bg-[#141414] py-32 lg:py-56">
                <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
                    <div className="mb-24">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A574] text-center">The Forensic Read</p>
                        <h2 className="mt-8 text-[clamp(40px,6vw,84px)] font-black leading-[0.88] tracking-[-0.04em] uppercase text-white">
                            Capability <br /> <span className="text-white/20">Matrix.</span>
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] border-separate border-spacing-0 overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.01]">
                            <thead>
                                <tr className="bg-white/[0.02]">
                                    <th className="px-10 py-10 text-left text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">Module Specification</th>
                                    <th className="px-10 py-10 text-left text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 font-mono">OBSRVR</th>
                                    <th className="px-10 py-10 text-left text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 font-mono">STRTGC</th>
                                    <th className="px-10 py-10 text-left text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 font-mono">PRFSNL</th>
                                    <th className="px-10 py-10 text-left text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A574] font-mono underline decoration-[#D4A574]/40 underline-offset-8">SVRGNTY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PRICING_COMPARISON_ROWS.map((row, index) => (
                                    <tr key={row[0]} className="group transition-colors hover:bg-white/[0.02]">
                                        <td className="px-10 py-8 border-t border-white/5 text-[12px] font-bold uppercase tracking-widest text-white/90">{row[0]}</td>
                                        <td className="px-10 py-8 border-t border-white/5 text-[14px] text-white/40">{row[1]}</td>
                                        <td className="px-10 py-8 border-t border-white/5 text-[14px] text-white/70 font-medium">{row[2]}</td>
                                        <td className="px-10 py-8 border-t border-white/5 text-[14px] text-white/90 font-bold">{row[3]}</td>
                                        <td className="px-10 py-8 border-t border-white/5 text-[14px] text-[#D4A574] font-black">{row[4]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <FooterStartNow />
        </main>
    );
}

