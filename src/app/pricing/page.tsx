'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import { PRICING, PRICING_COMPARISON_ROWS, PRICING_POSITIONING_LINES } from '@/lib/pricing';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function CheckItem({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
    return (
        <li className="flex items-start gap-3 text-sm leading-relaxed">
            <span
                className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
                    dark ? 'border-[#D7B07A]/30 text-[#D7B07A]' : 'border-[#D7CCBB] text-[#8A7354]'
                }`}
            >
                <Check className="h-3 w-3" />
            </span>
            <span className={dark ? 'text-[#EADCC9]' : 'text-[#4E493F]'}>{children}</span>
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

            <section className="border-b border-[#E2D8C8] px-6 pb-14 pt-40 md:pb-20 md:pt-48">
                <div className="mx-auto max-w-7xl">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: EASE }}
                        className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]"
                    >
                        Pricing & Plans
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: EASE, delay: 0.03 }}
                        className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]"
                    >
                        Forensic Advertising Intelligence OS
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
                        className="mt-5 max-w-5xl text-[40px] font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-[#141414] md:text-[72px]"
                    >
                        Start free.
                        <br />
                        <span className="text-[#C1A67B]">Scale when it matters.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
                        className="mt-8 max-w-2xl text-lg leading-relaxed text-[#5E5A53] md:text-xl"
                    >
                        Every tier includes real analysis — not a demo. Observer gives you five complete dossiers to prove the product works before you spend a dollar.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
                        className="mt-8 max-w-3xl border-l border-[#D8CCB5] pl-5 text-sm uppercase tracking-[0.14em] text-[#756D61] md:text-[13px]"
                    >
                        Observer is free forever. Strategic Unit is for individual practitioners. Professional is for small teams. Agency Sovereignty is infrastructure — priced for teams that bill it back to clients.
                    </motion.p>
                </div>
            </section>

            <section className="border-b border-[#E2D8C8] px-6 py-8 md:py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-[2rem] border border-[#D8CCB5] bg-[#F8F3EA] px-6 py-6 md:px-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8A7B64]">Category Positioning</p>
                        <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[#6F675B]">You’re not selling analysis. You’re selling what agencies hand to clients.</p>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                            {PRICING_POSITIONING_LINES.map((line) => (
                                <p key={line} className="text-base leading-relaxed text-[#3F3A33] md:text-lg">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-14 md:py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-6 xl:grid-cols-4">
                        <motion.article
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65, ease: EASE }}
                            className="rounded-[2rem] border border-[#D8CCB5] bg-[#FBFBF6] p-8"
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A7B64]">{PRICING.observer.name}</p>
                            <p className="mt-6 text-[56px] font-semibold leading-none tracking-[-0.05em] text-[#141414]">
                                {PRICING.observer.priceLabel}
                            </p>
                            <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A7B64]">
                                {PRICING.observer.cadenceLabel}
                            </p>
                            <p className="mt-6 text-xl font-medium leading-snug text-[#141414]">{PRICING.observer.tagline}</p>
                            <p className="mt-4 text-base leading-relaxed text-[#5E5A53]">{PRICING.observer.subline}</p>

                            <ul className="mt-8 space-y-4">
                                {PRICING.observer.features.map((feature) => (
                                    <CheckItem key={feature}>{feature}</CheckItem>
                                ))}
                            </ul>

                            <p className="mt-8 border-t border-[#E4DACC] pt-6 text-sm leading-relaxed text-[#756D61]">
                                {PRICING.observer.whoItsFor}
                            </p>

                            <a
                                href={PRICING.observer.ctaHref}
                                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#141414] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                {PRICING.observer.ctaLabel}
                            </a>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
                            className="rounded-[2rem] border border-[#D8CCB5] bg-[#FBFBF6] p-8"
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A7B64]">{PRICING.strategic.name}</p>
                            <p className="mt-6 text-[56px] font-semibold leading-none tracking-[-0.05em] text-[#141414]">
                                ${PRICING.strategic.monthlyPrice}
                            </p>
                            <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A7B64]">per month</p>
                            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#A27B43]">
                                or {PRICING.strategic.yearlyLabel} · {PRICING.strategic.savingsLabel}
                            </p>
                            <p className="mt-6 text-xl font-medium leading-snug text-[#141414]">{PRICING.strategic.tagline}</p>
                            <p className="mt-4 text-base leading-relaxed text-[#5E5A53]">{PRICING.strategic.subline}</p>

                            <div className="mt-8 border-t border-[#E1D4C0] pt-6">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6840]">Everything in Observer, plus:</p>
                                <ul className="mt-4 space-y-4">
                                    {PRICING.strategic.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>

                            <p className="mt-8 border-t border-[#E1D4C0] pt-6 text-sm leading-relaxed text-[#756D61]">
                                {PRICING.strategic.whoItsFor}
                            </p>

                            <button
                                onClick={() => handleCheckout(PRICING.strategic.checkoutPlanKey)}
                                disabled={loading !== null}
                                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#141414] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FBF7EF] transition hover:bg-black disabled:cursor-wait disabled:opacity-60"
                            >
                                {loading === PRICING.strategic.checkoutPlanKey ? 'Initializing…' : PRICING.strategic.ctaLabel}
                            </button>
                            <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">
                                {PRICING.strategic.trialLabel}
                            </p>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65, ease: EASE, delay: 0.16 }}
                            className="relative rounded-[2rem] border border-[#D8CCB5] bg-[#F8F3EA] p-8 shadow-[0_24px_80px_rgba(20,20,20,0.08)]"
                        >
                            <div className="absolute right-6 top-6 rounded-full border border-[#D9C1A0] bg-[#FBFBF6] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A6840]">
                                Most Popular
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A7B64]">{PRICING.professional.name}</p>
                            <p className="mt-6 text-[56px] font-semibold leading-none tracking-[-0.05em] text-[#141414]">
                                ${PRICING.professional.monthlyPrice}
                            </p>
                            <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A7B64]">per month</p>
                            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#A27B43]">
                                or {PRICING.professional.yearlyLabel} · {PRICING.professional.savingsLabel}
                            </p>
                            <p className="mt-6 text-xl font-medium leading-snug text-[#141414]">{PRICING.professional.tagline}</p>
                            <p className="mt-4 text-base leading-relaxed text-[#5E5A53]">{PRICING.professional.subline}</p>

                            <div className="mt-8 border-t border-[#E1D4C0] pt-6">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6840]">Everything in Strategic Unit, plus:</p>
                                <ul className="mt-4 space-y-4">
                                    {PRICING.professional.features.map((feature) => (
                                        <CheckItem key={feature}>{feature}</CheckItem>
                                    ))}
                                </ul>
                            </div>

                            <p className="mt-8 border-t border-[#E1D4C0] pt-6 text-sm leading-relaxed text-[#756D61]">
                                {PRICING.professional.whoItsFor}
                            </p>

                            <button
                                onClick={() => handleCheckout(PRICING.professional.checkoutPlanKey)}
                                disabled={loading !== null}
                                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#141414] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FBF7EF] transition hover:bg-black disabled:cursor-wait disabled:opacity-60"
                            >
                                {loading === PRICING.professional.checkoutPlanKey ? 'Initializing…' : PRICING.professional.ctaLabel}
                            </button>
                            <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">
                                {PRICING.professional.trialLabel}
                            </p>
                        </motion.article>

                        <motion.article
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65, ease: EASE, delay: 0.24 }}
                            className="rounded-[2rem] border border-[#3C3428] bg-[#15130F] p-8 text-[#F4E9D9]"
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D7B07A]">{PRICING.agency.name}</p>
                            <p className="mt-6 text-[52px] font-semibold leading-none tracking-[-0.05em] text-[#F7EEDC]">
                                From $1,000
                            </p>
                            <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.2em] text-[#B89A70]">per month · annual contract</p>
                            <p className="mt-6 text-xl font-medium leading-snug text-[#F7EEDC]">{PRICING.agency.tagline}</p>
                            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#E5D5BC]">
                                {PRICING.agency.subline}
                            </p>

                            <div className="mt-8 border-t border-[#342D24] pt-6">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D7B07A]">Everything in Strategic Unit, plus:</p>
                                <ul className="mt-4 space-y-4">
                                    {PRICING.agency.features.map((feature) => (
                                        <CheckItem key={feature} dark>
                                            {feature}
                                        </CheckItem>
                                    ))}
                                </ul>
                            </div>

                            <p className="mt-8 border-t border-[#342D24] pt-6 text-sm leading-relaxed text-[#D4C4AB]">
                                {PRICING.agency.whoItsFor}
                            </p>

                            <blockquote className="mt-8 rounded-[1.5rem] border border-[#4A3F31] bg-[#1B1813] px-5 py-5 text-sm leading-relaxed text-[#E6D7BF]">
                                “{PRICING.agency.positioningQuote}”
                            </blockquote>

                            <a
                                href={PRICING.agency.ctaHref}
                                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#E2C08B] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A1712] transition hover:bg-[#EACB9A]"
                            >
                                {PRICING.agency.ctaLabel}
                            </a>
                            <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#B89A70]">
                                {PRICING.agency.contactLabel}
                            </p>
                        </motion.article>
                    </div>
                </div>
            </section>

            <section className="border-t border-[#E2D8C8] bg-[#F8F3EA] px-6 py-14 md:py-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-[#141414] md:text-4xl">
                        What’s included at each tier
                    </h2>
                    <div className="mt-8 overflow-x-auto rounded-[2rem] border border-[#D8CCB5] bg-[#FBFBF6]">
                        <table className="min-w-[860px] w-full">
                            <thead className="border-b border-[#E2D8C8] bg-[#F8F3EA]">
                                <tr>
                                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.26em] text-[#8A7B64]">Feature</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.26em] text-[#8A7B64]">Observer</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.26em] text-[#8A7B64]">Strategic Unit</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.26em] text-[#8A7B64]">Professional</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.26em] text-[#8A7B64]">Agency Sovereignty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PRICING_COMPARISON_ROWS.map((row, index) => (
                                    <tr key={row[0]} className={index < PRICING_COMPARISON_ROWS.length - 1 ? 'border-b border-[#EEE5D8]' : ''}>
                                        <td className="px-6 py-4 text-sm font-medium text-[#141414]">{row[0]}</td>
                                        <td className="px-6 py-4 text-sm text-[#5E5A53]">{row[1]}</td>
                                        <td className="px-6 py-4 text-sm text-[#3F3A33]">{row[2]}</td>
                                        <td className="px-6 py-4 text-sm text-[#3F3A33]">{row[3]}</td>
                                        <td className="px-6 py-4 text-sm text-[#3F3A33]">{row[4]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="px-6 py-14 md:py-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-[#141414] md:text-4xl">
                        Questions worth asking
                    </h2>
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {[
                            {
                                q: 'Is Observer really free — or is it a crippled trial?',
                                a: 'Observer gives you five complete analyses every month, permanently. All five intelligence surfaces. Full dossier output. No artificial limits on what the analysis returns. It’s free because we’d rather you see the real product than a version of it.',
                            },
                            {
                                q: 'When does Strategic Unit make sense over Observer?',
                                a: 'The moment you find yourself wanting a sixth analysis. Or when you want Differential Diagnosis, Clone Engine, or the full Vault. Most practitioners hit that point in the first two weeks.',
                            },
                            {
                                q: 'Why is Agency Sovereignty priced at 1K+?',
                                a: 'Because it’s not a per-seat tool — it’s billable intelligence infrastructure. The white-label output alone is worth more than the subscription cost when it’s presented to a single client as a premium strategic deliverable.',
                            },
                            {
                                q: 'Can I white-label the output on Strategic Unit?',
                                a: 'Yes — every tier from Strategic Unit up includes white-label export. Agency Sovereignty adds the full dossier identity layer: custom logo, cover design, and agency branding controls.',
                            },
                            {
                                q: 'We’re a small agency — do we need Agency Sovereignty?',
                                a: 'If you have more than one person using it for client work, yes. The shared Vault, Sovereign Boards, and team seat management are what turn individual analyses into a coordinated agency intelligence system.',
                            },
                            {
                                q: 'Is there an Enterprise tier above Agency Sovereignty?',
                                a: 'For agencies with specific volume, integration, or white-label infrastructure requirements — yes. Contact us directly: hello@visualdecompiler.com',
                            },
                        ].map((item) => (
                            <div key={item.q} className="rounded-[1.75rem] border border-[#D8CCB5] bg-[#FBFBF6] px-6 py-6">
                                <h3 className="text-lg font-semibold leading-snug text-[#141414]">{item.q}</h3>
                                <p className="mt-3 text-[15px] leading-7 text-[#5E5A53]">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-[#E2D8C8] bg-[#F8F3EA] px-6 py-16 md:py-20">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Observer Tier</p>
                    <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.96] tracking-tight text-[#141414] md:text-6xl">
                        Start with five free analyses.
                        <br />
                        <span className="text-[#C1A67B]">No pitch required.</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#5E5A53]">
                        Upload a competitor ad. Get a complete strategic readout. See what the product actually produces before you decide anything.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
                        <a
                            href="/ingest"
                            className="inline-flex items-center justify-center rounded-full bg-[#141414] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FBF7EF] transition hover:bg-black"
                        >
                            Start Decompiling Free
                        </a>
                        <a
                            href={PRICING.agency.ctaHref}
                            className="inline-flex items-center justify-center rounded-full border border-[#D8CCB5] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5E5A53] transition hover:border-[#141414] hover:text-[#141414]"
                        >
                            Book an Agency Demo
                        </a>
                    </div>

                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A7B64]">
                        Observer is free forever · Strategic Unit includes a 14-day trial · Agency Sovereignty includes a dedicated onboarding session
                    </p>
                </div>
            </section>
        </main>
    );
}
