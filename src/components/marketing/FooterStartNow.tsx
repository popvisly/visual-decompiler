'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';

// ─── FAQ data ────────────────────────────────────────────────────────────────
const FAQS = [
    {
        q: 'What kind of ads can I analyse?',
        a: 'Any static or video ad: print, digital, social, OOH. Upload JPG, PNG, WebP, MP4, or bring in a URL. Visual Decompiler reads the creative itself, not just the media placement around it.',
    },
    {
        q: 'Is this an AI generation tool?',
        a: 'No. It does not generate ads or replace creative judgment. It helps you articulate why a piece holds, where it weakens, and what to change next.',
    },
    {
        q: 'How is this different from an ad-spy tool?',
        a: 'Ad-spy tools and scrapers tell you what is out there. Visual Decompiler is for reading what the work is doing once it is in front of you: its hierarchy, tension, identity pull, and distinctiveness.',
    },
    {
        q: 'Who is this actually for?',
        a: 'Art directors, designers, strategists, founders, and creative teams who need a sharper read in reviews, pitches, and internal decision-making.',
    },
    {
        q: 'Can I use this with clients or in pitches?',
        a: 'Yes. The reads are designed to travel into client rooms, decks, strategy sessions, and creative reviews without feeling like software output.',
    },
] as const;

// ─── FAQ accordion row ───────────────────────────────────────────────────────
function FaqRow({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className="border-t border-white/10"
        >
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
                aria-expanded={open}
            >
                <span className="text-[15px] font-semibold leading-snug text-white/80 lg:text-[16px]">{q}</span>
                <span className="mt-0.5 shrink-0 text-[#D4A574]">
                    {open ? <Minus size={16} /> : <Plus size={16} />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-[14px] leading-relaxed text-white/45">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FooterStartNow() {
    return (
        <footer className="relative overflow-hidden bg-[#141414]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden="true">
                <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
                <div className="absolute left-[8%] top-24 h-[320px] w-[320px] bg-[radial-gradient(circle,rgba(212,165,116,0.2)_0%,rgba(212,165,116,0)_72%)]" />
                <div className="absolute right-[4%] bottom-16 h-[380px] w-[380px] bg-[radial-gradient(circle,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0)_74%)]" />
            </div>

            {/* ── OUTRO CTA BLOCK ── */}
            <div className="relative mx-auto max-w-[1400px] px-6 pt-32 pb-24 sm:px-8 lg:px-10 lg:pt-56 lg:pb-32">

                {/* Top label */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 border-t border-white/12 pt-5 text-[10px] font-black uppercase tracking-[0.55em] text-[#D4A574]"
                >
                    Bring in the work · Leave with a sharper read
                </motion.p>

                {/* Massive CTA headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="font-black leading-[0.88] tracking-[-0.05em] text-white"
                    style={{ fontSize: 'clamp(52px, 10vw, 140px)' }}
                >
                    Bring in the frame.<br />
                    <span className="text-[#D4A574]">Get the creative read.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="mt-8 max-w-2xl text-[16px] leading-[1.7] text-white/55"
                >
                    Built for art directors, designers, strategists, founders, and teams who need language for what the work is doing before the room moves on.
                </motion.p>

                {/* CTA row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-12 flex flex-col items-start gap-5 border-b border-white/10 pb-10 sm:flex-row sm:items-center sm:gap-6"
                >
                    <a
                        href="/share/sample-dossier"
                        className="inline-flex items-center gap-2.5 border border-[#D4A574] bg-[#D4A574] px-8 py-4 text-[11px] font-black uppercase tracking-[0.24em] text-[#141414] transition hover:bg-[#E0B882] hover:border-[#E0B882]"
                    >
                        Open Sample Read
                        <ArrowUpRight size={15} />
                    </a>
                    <a
                        href="/ingest"
                        className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-[10px] font-black uppercase tracking-[0.28em] text-white/46 transition hover:border-white/30 hover:text-white/78"
                    >
                        Bring In A Frame
                        <ArrowUpRight size={14} />
                    </a>
                </motion.div>
            </div>

            {/* ── FAQ STRIP ── */}
            <div className="relative mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-10 lg:py-40">
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">

                    {/* Left: label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-8 lg:mb-0 lg:pt-6"
                    >

                        <p className="-mt-1 text-[11px] font-black uppercase tracking-[0.5em] text-[#D4A574]">
                            Common questions
                        </p>
                    </motion.div>

                    {/* Right: accordion rows */}
                    <div>
                        {FAQS.map((item, i) => (
                            <FaqRow key={item.q} q={item.q} a={item.a} index={i} />
                        ))}
                        {/* Final border */}
                        <div className="border-t border-white/10" />
                    </div>
                </div>
            </div>

            {/* ── DIVIDER ── */}
            <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10">
                <div className="h-px bg-white/10" />
            </div>

            {/* ── FOOTER BAR ── */}
            <div className="mx-auto max-w-[1400px] px-6 py-8 sm:px-8 lg:px-10">
                <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/logo/Visual_Decompiler_Logo_v2_400px.png"
                            alt="Visual Decompiler"
                            width={24}
                            height={24}
                            className="h-6 w-6 object-contain invert opacity-60"
                        />
                        <div>
                            <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/60">Visual Decompiler</span>
                            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">Visual Judgment For Working Creatives</span>
                        </div>
                    </div>

                    {/* Nav links */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {[
                            { label: 'About', href: '/about' },
                            { label: 'Pricing', href: '/pricing' },
                            { label: 'Trust & Method', href: '/trust-method' },
                            { label: 'Vault', href: '/vault' },
                            { label: 'Help', href: '/docs/user-guide' },
                            { label: 'Login', href: '/login' },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="border-b border-transparent pb-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/35 transition hover:border-white/20 hover:text-white/70"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Legal */}
                    <div className="flex items-center gap-5 text-[10px] font-medium uppercase tracking-[0.15em] text-white/25">
                        <a href="/legal/terms" className="hover:text-white/50 transition">Terms</a>
                        <a href="/legal/privacy" className="hover:text-white/50 transition">Privacy</a>
                        <span>© 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
