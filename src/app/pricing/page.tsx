'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';

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
        } catch (err: any) {
            console.error('Upgrade failed:', err);
            alert(`Unable to initiate checkout: ${err.message || 'Please try again later.'}`);
        } finally {
            setLoading(null);
        }
    };

    return (
        <main className="bg-[#F6F1E7] min-h-screen">
            <UnifiedSovereignHeader />

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

                    {/* ══════════════════════════════════════════════════════ */}
                    {/* UPGRADE TO SOVEREIGNTY */}
                    {/* ══════════════════════════════════════════════════════ */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-32 mb-32"
                    >
                        <div className="max-w-3xl mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-[1px] bg-[#141414]" />
                                <span className="text-[#141414] text-[11px] font-bold tracking-[0.4em] uppercase">
                                    The Sovereign Advantage
                                </span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light leading-[0.9] tracking-tightest uppercase text-[#141414] mb-6">
                                Move From<br />
                                <span className="italic font-serif lowercase tracking-normal">Observation</span> to<br />
                                Forensic Authority
                            </h2>
                            <p className="text-lg text-[#6B6B6B] font-light leading-relaxed max-w-xl">
                                The Observer tier is for exploration. Agency Sovereignty is for deployment.
                                When the stakes are high and the strategy requires absolute precision,
                                elite units require a sovereign infrastructure.
                            </p>
                        </div>

                        {/* Comparison Table */}
                        <div className="bg-white rounded-[2.5rem] border border-[#E7DED1] overflow-hidden shadow-[0_40px_80px_rgba(20,20,20,0.04)] mb-16">
                            <div className="grid grid-cols-3 text-center border-b border-[#E7DED1]">
                                <div className="p-6 md:p-8 text-left border-r border-[#E7DED1]">
                                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Capability</p>
                                </div>
                                <div className="p-6 md:p-8 border-r border-[#E7DED1]">
                                    <p className="text-[9px] font-bold text-[#6B6B6B]/50 uppercase tracking-[0.3em]">The Observer</p>
                                    <p className="text-lg font-light text-[#6B6B6B] mt-1">$0</p>
                                </div>
                                <div className="p-6 md:p-8 bg-[#141414]/[0.02]">
                                    <p className="text-[9px] font-bold text-accent uppercase tracking-[0.3em]">Agency Sovereignty</p>
                                    <p className="text-lg font-light text-[#141414] mt-1">$199<span className="text-[#6B6B6B] text-xs">/mo</span></p>
                                </div>
                            </div>
                            {[
                                { capability: 'Forensic Depth', observer: 'Basic persistence', sovereign: 'Full Intelligence Suite (Cognitive Load, Schema Autopsy, Neural Sentiment)' },
                                { capability: 'Strategic Output', observer: 'Dashboard view only', sovereign: 'White-Label Strategic Dossiers (PDF Export)' },
                                { capability: 'Identity Control', observer: 'Branded "V" Mark', sovereign: 'Full Agency Branding (Your logo, your colors, your authority)' },
                                { capability: 'Security Layer', observer: 'Standard Access', sovereign: 'ISO-27001 Compliant Infrastructure (Audit-ready for Enterprise)' },
                                { capability: 'Neural Priority', observer: 'Standard Queue', sovereign: 'Priority Processor Access (Sub-60s Deconstructions)' },
                            ].map((row, idx) => (
                                <div key={idx} className={`grid grid-cols-3 ${idx < 4 ? 'border-b border-[#E7DED1]' : ''}`}>
                                    <div className="p-5 md:p-6 text-left border-r border-[#E7DED1]">
                                        <p className="text-[10px] font-bold text-[#141414] uppercase tracking-[0.15em]">{row.capability}</p>
                                    </div>
                                    <div className="p-5 md:p-6 border-r border-[#E7DED1]">
                                        <p className="text-[11px] text-[#6B6B6B]/60 font-light leading-relaxed">{row.observer}</p>
                                    </div>
                                    <div className="p-5 md:p-6 bg-[#141414]/[0.02]">
                                        <p className="text-[11px] text-[#141414] font-medium leading-relaxed">{row.sovereign}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Value Propositions */}
                        <div className="space-y-8 mb-16">
                            <p className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] mb-6">
                                Why Elite Agencies Choose Sovereignty
                            </p>

                            {/* White-Label Intelligence */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_60px_rgba(20,20,20,0.02)]"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-accent/10 rounded-xl"><Globe className="w-4 h-4 text-accent" /></div>
                                    <h3 className="text-sm font-bold text-[#141414] uppercase tracking-[0.15em]">White-Label Intelligence</h3>
                                </div>
                                <p className="text-base text-[#6B6B6B] font-light leading-relaxed max-w-2xl">
                                    Don&apos;t just provide data — provide a <strong className="text-[#141414] font-medium">proprietary audit</strong>.
                                    Our Sovereignty tier removes all Visual Decompiler branding. Upload your agency&apos;s identity in Settings,
                                    and every Strategic Dossier you export will appear as your own proprietary internal intelligence.
                                    Your clients see your logo, your &ldquo;Neural Verdict,&rdquo; and your forensic authority.
                                </p>
                            </motion.div>

                            {/* ISO-27001 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_60px_rgba(20,20,20,0.02)]"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-accent/10 rounded-xl"><ShieldCheck className="w-4 h-4 text-accent" /></div>
                                    <h3 className="text-sm font-bold text-[#141414] uppercase tracking-[0.15em]">Enterprise-Grade Security</h3>
                                </div>
                                <p className="text-base text-[#6B6B6B] font-light leading-relaxed max-w-2xl">
                                    In high-stakes advertising, data privacy is <strong className="text-[#141414] font-medium">non-negotiable</strong>.
                                    Our Sovereign Infrastructure is hosted on Vercel&apos;s global edge network, utilizing ISO-27001 and SOC2 compliant protocols.
                                    We provide the security documentation and encrypted data sovereignty required to pass strict corporate procurement audits —
                                    ensuring your &ldquo;Persuasion Blueprints&rdquo; never leave the lab.
                                </p>
                            </motion.div>

                            {/* Neural Processor */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_60px_rgba(20,20,20,0.02)]"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-accent/10 rounded-xl"><Zap className="w-4 h-4 text-accent" /></div>
                                    <h3 className="text-sm font-bold text-[#141414] uppercase tracking-[0.15em]">The Neural Processor Workflow</h3>
                                </div>
                                <p className="text-base text-[#6B6B6B] font-light leading-relaxed max-w-2xl">
                                    Stop wasting senior strategist hours on manual ad breakdowns. The Intelligence Tab automates the
                                    &ldquo;Schema Autopsy,&rdquo; revealing the competitor&apos;s 3-second hook logic and persuasion sequence
                                    in seconds. It&apos;s not just a tool — it&apos;s a <strong className="text-[#141414] font-medium">force multiplier</strong> for your strategy unit.
                                </p>
                            </motion.div>
                        </div>

                        {/* Blurred Dossier Preview */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative bg-[#141414] rounded-[2.5rem] p-10 md:p-16 overflow-hidden mb-16"
                        >
                            {/* Blurred dossier "preview" */}
                            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                                <div className="absolute inset-8 bg-[#1a1a1a] rounded-2xl p-10 blur-[3px] opacity-40">
                                    <div className="space-y-4">
                                        <div className="flex justify-center mb-6">
                                            <div className="w-16 h-16 border border-white/10 flex items-center justify-center text-white/20 text-2xl font-light">V</div>
                                        </div>
                                        <div className="w-32 h-[1px] bg-white/10 mx-auto" />
                                        <div className="h-4 bg-white/5 rounded w-2/3 mx-auto" />
                                        <div className="h-3 bg-white/3 rounded w-1/2 mx-auto" />
                                        <div className="w-32 h-[1px] bg-white/10 mx-auto mt-6" />
                                        <div className="grid grid-cols-3 gap-4 mt-8">
                                            <div className="h-16 bg-white/5 rounded-lg" />
                                            <div className="h-16 bg-white/5 rounded-lg" />
                                            <div className="h-16 bg-white/5 rounded-lg" />
                                        </div>
                                        <div className="space-y-2 mt-6">
                                            <div className="h-2 bg-white/5 rounded w-full" />
                                            <div className="h-2 bg-white/5 rounded w-5/6" />
                                            <div className="h-2 bg-white/5 rounded w-4/6" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Overlay content */}
                            <div className="relative z-10 text-center py-12">
                                <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-accent/30 mx-auto flex items-center justify-center mb-8">
                                    <p className="text-[8px] font-bold text-accent/50 uppercase tracking-widest leading-tight">Your<br />Logo<br />Here</p>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-light text-white uppercase tracking-tight mb-3">
                                    The Strategic Dossier
                                </h3>
                                <p className="text-[11px] text-white/30 uppercase tracking-[0.3em] font-bold mb-8">
                                    Confidential Forensic Audit for Your Agency
                                </p>
                                <p className="text-base text-white/40 font-light max-w-md mx-auto leading-relaxed">
                                    A 5-section intelligence report, exported as PDF, white-labeled with your agency&apos;s identity.
                                    The deliverable your clients didn&apos;t know they needed.
                                </p>
                            </div>
                        </motion.div>

                        {/* Strategic Close */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center py-16"
                        >
                            <p className="text-xl md:text-2xl font-light text-[#141414] leading-relaxed max-w-2xl mx-auto mb-12 italic">
                                &ldquo;Sovereignty isn&apos;t just about more data — it&apos;s about the right
                                to <strong className="font-medium not-italic">own the insight</strong>.
                                Deploy your agency&apos;s forensic layer today.&rdquo;
                            </p>

                            <button
                                onClick={() => handleUpgrade('price_1T4BU70LZZUO4xz4b4A57HNV')}
                                disabled={loading !== null}
                                className="px-14 py-6 bg-[#141414] hover:bg-black text-[#FBF7EF] font-bold text-[12px] uppercase tracking-[0.2em] rounded-full shadow-[0_20px_60px_rgba(20,20,20,0.2)] transition-all active:scale-[0.98]"
                            >
                                {loading ? 'Initializing...' : 'Upgrade to Sovereignty — $199/mo'}
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Trust Block */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-12 pt-20 border-t border-[#E7DED1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
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
