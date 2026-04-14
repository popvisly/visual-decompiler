'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, ShieldCheck, Zap, Globe, Package } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import { PRICING, PRICING_COMPARISON_ROWS, PRICING_POSITIONING_LINES } from '@/lib/pricing';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function CheckItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-4 text-sm leading-relaxed">
            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#C1A674]/10 text-[#C1A674]">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
            </span>
            <span className="text-white/60">{children}</span>
        </li>
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
        <main className="min-h-screen bg-[#050505] text-white">
            <UnifiedSovereignHeader forceDark />

            {/* Hero Section */}
            <section className="px-6 pt-32 pb-28 lg:pt-36 lg:pb-36">
                <div className="mx-auto max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: EASE }}
                        className="mb-12 border-t border-white/10 pt-8"
                    >
                        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-[#C1A674]">
                            Sovereign Infrastructure · Pricing OS
                        </p>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                        className="text-[clamp(64px,8vw,132px)] font-black leading-[0.88] tracking-[-0.05em] text-white uppercase max-w-[15ch]"
                    >
                        Start free. <br />
                        <span className="text-white/20">Scale when it matters.</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                        className="mt-10 max-w-3xl text-[clamp(20px,2.1vw,30px)] leading-relaxed text-white/55 font-medium"
                    >
                        Every tier includes real intelligence depth. Observer proves the diagnostic system. 
                        Professional and Agency expand analysis coverage, decision confidence, and delivery readiness.
                    </motion.p>
                </div>
            </section>

            {/* Pricing Cards Grid */}
            <section className="px-6 pb-48">
                <div className="mx-auto max-w-[1440px]">
                    <div className="grid gap-8 lg:grid-cols-4">
                        
                        {/* Observer */}
                        <motion.article
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl flex flex-col justify-between"
                        >
                            <div>
                                <Zap className="w-8 h-8 text-[#C1A674] mb-10" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C1A674] mb-4">{PRICING.observer.name}</p>
                                <h3 className="text-6xl font-black tracking-tightest mb-4">{PRICING.observer.priceLabel}</h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-10">{PRICING.observer.cadenceLabel}</p>
                                
                                <p className="text-xl font-black uppercase leading-tight mb-4">{PRICING.observer.tagline}</p>
                                <p className="text-white/50 mb-10 leading-relaxed">{PRICING.observer.subline}</p>
                                
                                <ul className="space-y-6 mb-12">
                                    {PRICING.observer.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                            <a
                                href={PRICING.observer.ctaHref}
                                className="inline-flex w-full items-center justify-center border border-white/10 bg-white/5 px-8 pt-6 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black"
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
                            className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl flex flex-col justify-between"
                        >
                            <div>
                                <Package className="w-8 h-8 text-[#C1A674] mb-10" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C1A674] mb-4">{PRICING.strategic.name}</p>
                                <h3 className="text-6xl font-black tracking-tightest mb-2">${PRICING.strategic.monthlyPrice}</h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C1A674] mb-10">Monthly Protocol</p>
                                
                                <p className="text-xl font-black uppercase leading-tight mb-4">{PRICING.strategic.tagline}</p>
                                <p className="text-white/50 mb-8 leading-relaxed italic border-l border-white/20 pl-4">Everything in Observer, plus:</p>
                                
                                <ul className="space-y-6 mb-12">
                                    {PRICING.strategic.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                            <button
                                onClick={() => handleCheckout(PRICING.strategic.checkoutPlanKey)}
                                disabled={loading !== null}
                                className="inline-flex w-full items-center justify-center bg-white px-8 pt-6 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-black transition hover:bg-[#C1A674] disabled:opacity-50"
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
                            className="bg-white/10 border border-[#C1A674]/40 p-10 rounded-[3.5rem] backdrop-blur-3xl flex flex-col justify-between relative"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C1A674] text-black px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
                                Highly Recommended
                            </div>
                            <div>
                                <Globe className="w-8 h-8 text-[#C1A674] mb-10" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C1A674] mb-4">{PRICING.professional.name}</p>
                                <h3 className="text-6xl font-black tracking-tightest mb-2">${PRICING.professional.monthlyPrice}</h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C1A674] mb-10">Unlimited Inbound</p>
                                
                                <p className="text-xl font-black uppercase leading-tight mb-4">{PRICING.professional.tagline}</p>
                                <p className="text-white/50 mb-8 leading-relaxed italic border-l border-white/20 pl-4">Everything in Strategic, plus:</p>
                                
                                <ul className="space-y-6 mb-12">
                                    {PRICING.professional.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                            <button
                                onClick={() => handleCheckout(PRICING.professional.checkoutPlanKey)}
                                disabled={loading !== null}
                                className="inline-flex w-full items-center justify-center bg-[#C1A674] px-8 pt-6 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:opacity-50"
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
                            className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl flex flex-col justify-between"
                        >
                            <div>
                                <ShieldCheck className="w-8 h-8 text-[#C1A674] mb-10" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C1A674] mb-4">{PRICING.agency.name}</p>
                                <h3 className="text-5xl font-black tracking-tightest mb-2">From $1K</h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-10">Infrastructure Tier</p>
                                
                                <p className="text-xl font-black uppercase leading-tight mb-4">{PRICING.agency.tagline}</p>
                                
                                <blockquote className="my-8 bg-white/5 px-6 py-6 border-l-2 border-[#C1A674] text-sm leading-relaxed text-white/60 italic">
                                    “{PRICING.agency.positioningQuote}”
                                </blockquote>

                                <ul className="space-y-6 mb-12">
                                    {PRICING.agency.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                            <a
                                href={PRICING.agency.ctaHref}
                                className="inline-flex w-full items-center justify-center border border-[#C1A674] px-8 pt-6 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#C1A674] transition hover:bg-[#C1A674] hover:text-black"
                            >
                                {PRICING.agency.ctaLabel}
                            </a>
                        </motion.article>

                    </div>
                </div>
            </section>

            {/* Capability Matrix - Dark Refinement */}
            <section className="bg-white/5 py-48 lg:py-64">
                <div className="mx-auto max-w-[1400px] px-6">
                    <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-[8vw] lg:text-[4.5vw] font-black leading-[0.88] tracking-[-0.04em] uppercase text-white mb-8">
                                Capability <br /> <span className="text-white/20">Matrix.</span>
                            </h2>
                            <p className="text-xl text-white/50 leading-relaxed">
                                Lower tiers unlock the core diagnostic layer. Higher tiers expand intelligence depth, 
                                collaborative use, and client-ready delivery output.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-[1000px] w-full border-separate border-spacing-0 rounded-[3rem] border border-white/10 overflow-hidden">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-[#C1A674]">System Feature</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Observer</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Strategic</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Professional</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Sovereignty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PRICING_COMPARISON_ROWS.map((row, index) => (
                                    <tr key={row[0]} className="border-t border-white/5 group bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                        <td className="px-10 py-6 border-t border-white/5 text-[14px] font-black uppercase tracking-wider text-white">{row[0]}</td>
                                        <td className="px-10 py-6 border-t border-white/5 text-[14px] text-white/40">{row[1]}</td>
                                        <td className="px-10 py-6 border-t border-white/5 text-[14px] text-white/60 font-bold">{row[2]}</td>
                                        <td className="px-10 py-6 border-t border-white/5 text-[14px] text-white/60 font-bold">{row[3]}</td>
                                        <td className="px-10 py-6 border-t border-white/5 text-[14px] text-[#C1A674] font-black">{row[4]}</td>
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
