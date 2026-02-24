'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';
import Nav from '@/components/marketing/Nav';

const PLANS = [
    {
        id: 'free',
        name: 'The Observer',
        price: '$0',
        description: 'Perfect for individual designers exploring the deconstruction methodology.',
        features: [
            'Basic persistence',
            'Strategic Laboratory access',
            '3 deconstructions / month',
            'Community-level signals',
        ],
        cta: 'Current Plan',
        highlight: false,
    },
    {
        id: 'price_1T4BU70LZZUO4xz4b4A57HNV', // Real Stripe Price ID for Agency Sovereignty
        name: 'Agency Sovereignty',
        price: '$199',
        interval: '/mo',
        description: 'Full-spectrum deconstruction for leadership and elite strategy units.',
        features: [
            'Unlimited deconstructions',
            'White-label client portals',
            'Advanced Trend Forensics',
            'Priority Neural Processor',
            'Strategic Dossier exports',
            'ISO-27001 Security layer',
        ],
        cta: 'Upgrade to Sovereignty',
        highlight: true,
    },
];

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleUpgrade = async (planId: string) => {
        if (planId === 'free') return;

        setLoading(planId);
        try {
            const res = await fetch('/api/billing/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId }),
            });
            const { url, error } = await res.json();

            if (error) throw new Error(error);
            if (url) window.location.href = url;
        } catch (err) {
            console.error('Upgrade failed:', err);
            alert('Failed to initiate checkout. Please ensure API keys are configured.');
        } finally {
            setLoading(null);
        }
    };

    return (
        <main className="bg-[#F6F1E7] min-h-screen">
            <Nav />

            <section className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="max-w-3xl mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="w-8 h-[1px] bg-[#141414]" />
                            <span className="text-[#141414] text-[11px] font-bold tracking-[0.4em] uppercase">
                                Investment & Access
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[12vw] lg:text-[7vw] font-light leading-[0.85] tracking-tightest uppercase text-[#141414]"
                        >
                            Selective<br />
                            <span className="italic font-serif lowercase italic tracking-normal">Intelligence</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-xl text-[#6B6B6B] mt-10 font-light leading-relaxed max-w-xl"
                        >
                            Elite strategy requires sovereignty. Choose the level of forensic depth
                            required for your agency's output.
                        </motion.p>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {PLANS.map((plan, idx) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx + 0.4, duration: 0.8 }}
                                className={`
                                    relative p-10 md:p-16 rounded-[2.5rem] flex flex-col justify-between
                                    ${plan.highlight
                                        ? 'bg-[#141414] text-[#FBF7EF] shadow-[0_40px_80px_rgba(20,20,20,0.15)]'
                                        : 'bg-white border border-[#E7DED1] text-[#141414]'}
                                `}
                            >
                                {plan.highlight && (
                                    <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-widest uppercase">
                                        Most Deployed
                                    </div>
                                )}

                                <div>
                                    <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-12 opacity-40">
                                        {plan.name}
                                    </h2>

                                    <div className="mb-12">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-6xl md:text-8xl font-light tracking-tightest leading-none">
                                                {plan.price}
                                            </span>
                                            {plan.interval && (
                                                <span className="text-xl font-light opacity-40">{plan.interval}</span>
                                            )}
                                        </div>
                                        <p className="mt-6 text-lg font-light opacity-70 leading-relaxed max-w-xs">
                                            {plan.description}
                                        </p>
                                    </div>

                                    <ul className="space-y-4 mb-16">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-4 text-sm font-medium">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${plan.highlight ? 'border-white/20' : 'border-[#141414]/10'}`}>
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                <span className="opacity-80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => handleUpgrade(plan.id)}
                                    disabled={loading !== null}
                                    className={`
                                        w-full py-5 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] transition-all
                                        ${plan.highlight
                                            ? 'bg-[#FBF7EF] text-[#141414] hover:shadow-[0_20px_40px_rgba(251,247,239,0.2)] active:scale-[0.98]'
                                            : 'bg-[#141414] text-[#FBF7EF] hover:shadow-[0_20px_40px_rgba(20,20,20,0.1)] active:scale-[0.98]'}
                                        ${loading === plan.id ? 'opacity-50 cursor-wait' : ''}
                                    `}
                                >
                                    {loading === plan.id ? 'Initializing...' : plan.cta}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Block */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-32 pt-20 border-t border-[#E7DED1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
                    >
                        {[
                            { icon: <ShieldCheck />, title: "Forensic Trust", desc: "Enterprise-grade encryption for all deconstructed signals." },
                            { icon: <Zap />, title: "Instant Access", desc: "Unlock premium metrics the second the transaction clears." },
                            { icon: <Globe />, title: "Global Nodes", desc: "Intelligence gathered from all major luxury markets." },
                            { icon: <Lock />, title: "Sovereign Data", desc: "Your client's strategic data never leaves your instance." },
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">
                                <div className="text-[#141414] opacity-20 w-8 h-8">
                                    {item.icon}
                                </div>
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#141414]">
                                    {item.title}
                                </h3>
                                <p className="text-[12px] text-[#6B6B6B] leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
