'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';
import { PRICING, PRICING_COMPARISON_ROWS, PRICING_POSITIONING_LINES } from '@/lib/pricing';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function CheckItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-4 text-sm leading-relaxed">
            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#8B6A3D]">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
            </span>
            <span className="text-[#6B6B6B]">{children}</span>
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
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader />

            <MarketingPageHeader
                kicker="Sovereign Infrastructure · Pricing OS"
                title={
                    <>
                        Start free. <br />
                        <span className="text-[#8B6A3D]">Scale when it matters.</span>
                    </>
                }
                description="Choose the depth your team needs to defend decisions, align faster, and get work approved without costly back-and-forth."
            />

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
                            className="rounded-[3rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-4">{PRICING.observer.name}</p>
                                <h3 className="text-6xl font-medium tracking-tightest mb-4">{PRICING.observer.priceLabel}</h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8A8A84] mb-10">{PRICING.observer.cadenceLabel}</p>
                                
                                <p className="text-xl font-black uppercase leading-tight mb-4">{PRICING.observer.tagline}</p>
                                <p className="text-[#6B6B6B] mb-10 leading-relaxed">{PRICING.observer.subline}</p>
                                
                                <ul className="space-y-6 mb-12">
                                    {PRICING.observer.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                                <a
                                    href={PRICING.observer.ctaHref}
                                    className="inline-flex w-full items-center justify-center rounded-[999px] border border-black/10 bg-[#141414] px-8 pt-6 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#FBF7EF] transition hover:bg-black"
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
                            className="rounded-[3rem] border border-black/5 bg-white p-10 shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-4">{PRICING.strategic.name}</p>
                                <h3 className="text-6xl font-medium tracking-tightest mb-2">${PRICING.strategic.monthlyPrice}</h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8B6A3D]/70 mb-10">Monthly Protocol</p>
                                
                                <p className="text-xl font-black uppercase leading-tight mb-4">{PRICING.strategic.tagline}</p>
                                <p className="text-[#6B6B6B] mb-8 leading-relaxed italic border-l border-black/10 pl-4">Everything in Observer, plus:</p>
                                
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
                            className="rounded-[3.5rem] border border-[#8B6A3D]/25 bg-[#FBFBF6] p-10 shadow-sm flex flex-col justify-between relative"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#141414] px-6 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-[#FBF7EF] whitespace-nowrap">
                                Highly Recommended
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-4">{PRICING.professional.name}</p>
                                <h3 className="text-6xl font-medium tracking-tightest mb-2">${PRICING.professional.monthlyPrice}</h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8B6A3D]/70 mb-10">Unlimited Inbound</p>
                                
                                <p className="text-xl font-black uppercase leading-tight mb-4">{PRICING.professional.tagline}</p>
                                <p className="text-[#6B6B6B] mb-8 leading-relaxed italic border-l border-black/10 pl-4">Everything in Strategic, plus:</p>
                                
                                <ul className="space-y-6 mb-12">
                                    {PRICING.professional.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            
                            <button
                                onClick={() => handleCheckout(PRICING.professional.checkoutPlanKey)}
                                disabled={loading !== null}
                                className="inline-flex w-full items-center justify-center rounded-[999px] bg-[#141414] px-8 pt-6 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#FBF7EF] transition hover:bg-black disabled:opacity-50"
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
                            className="rounded-[3rem] border border-[#8B6A3D]/15 bg-[#141414] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.18)] flex flex-col justify-between text-[#FBF7EF]"
                        >
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4A574] mb-4">{PRICING.agency.name}</p>
                                <h3 className="text-5xl font-medium tracking-tightest mb-2">Let's Talk</h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-10">Infrastructure Tier</p>
                                
                                <p className="text-xl font-black uppercase leading-tight mb-4">{PRICING.agency.tagline}</p>
                                
                                <blockquote className="my-8 bg-white/[0.04] px-6 py-6 border-l-2 border-[#D4A574]/70 text-sm leading-relaxed text-white/70 italic">
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
                                className="inline-flex w-full items-center justify-center rounded-[999px] border border-[#D4A574]/60 px-8 pt-6 pb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#D4A574] transition hover:bg-[#D4A574] hover:text-[#141414]"
                            >
                                {PRICING.agency.ctaLabel}
                            </a>
                        </motion.article>

                    </div>
                </div>
            </section>

            {/* Capability Matrix - Dark Refinement */}
            <section className="border-t border-black/5 bg-[#F6F1E7] py-48 lg:py-64">
                <div className="mx-auto max-w-[1400px] px-6">
                    <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-[8vw] lg:text-[4.5vw] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#141414] mb-8">
                                Capability <br /> <span className="text-[#141414]/25">Matrix.</span>
                            </h2>
                            <p className="text-xl text-[#6B6B6B] leading-relaxed">
                                Lower tiers unlock the core diagnostic layer. Higher tiers expand intelligence depth, 
                                collaborative use, and client-ready delivery output.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-[1000px] w-full border-separate border-spacing-0 rounded-[3rem] border border-black/5 overflow-hidden bg-white shadow-sm">
                            <thead className="bg-[#FBFBF6]">
                                <tr>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-[#8B6A3D]/80">System Feature</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-[#8A8A84]">Observer</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-[#8A8A84]">Strategic</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-[#8A8A84]">Professional</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-[#8A8A84]">Sovereignty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PRICING_COMPARISON_ROWS.map((row, index) => (
                                    <tr key={row[0]} className="border-t border-black/5 group hover:bg-black/[0.02] transition-colors">
                                        <td className="px-10 py-6 border-t border-black/5 text-[13px] font-bold uppercase tracking-wider text-[#141414]">{row[0]}</td>
                                        <td className="px-10 py-6 border-t border-black/5 text-[14px] text-[#6B6B6B]">{row[1]}</td>
                                        <td className="px-10 py-6 border-t border-black/5 text-[14px] text-[#141414] font-semibold">{row[2]}</td>
                                        <td className="px-10 py-6 border-t border-black/5 text-[14px] text-[#141414] font-semibold">{row[3]}</td>
                                        <td className="px-10 py-6 border-t border-black/5 text-[14px] text-[#8B6A3D] font-semibold">{row[4]}</td>
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
