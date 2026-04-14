'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import Logo from '@/components/Logo';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

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
        q: 'How is this different from ad monitoring platforms?',
        a: 'Visual Decompiler is for reading what the work is doing once it is in front of you: its hierarchy, tension, identity pull, and distinctiveness.',
    },
    {
        q: 'Who is this actually for?',
        a: 'Art directors, designers, strategists, founders, and creative teams who need a sharper read in reviews, pitches, and internal decision-making.',
    },
    {
        q: 'Can I use this with clients or in pitches?',
        a: 'Yes. The reads are designed to travel into client rooms, decks, strategy sessions, and creative reviews without feeling like software output.',
    },
];

function FaqRow({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className="border-t border-[#222]"
        >
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
                aria-expanded={open}
            >
                <span className="text-[15px] font-semibold leading-snug text-[#F6F1E7]/80 lg:text-[16px]">{q}</span>
                <span className="mt-0.5 shrink-0 text-[#C1A674]">
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
                        <p className="pb-6 text-[14px] leading-relaxed text-[#9a9a94]">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FooterStartNow() {
    return (
        <footer className="relative bg-[#0B0B0B] text-[#F6F1E7] border-t border-[#222]">
            {/* ── OUTRO CTA BLOCK ── */}
            <div className="mx-auto max-w-[1200px] px-6 pt-32 pb-24 sm:px-8 lg:px-10 lg:pt-48 lg:pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-8">
                        Final CTA
                    </p>
                    <h2 className="font-black leading-[0.88] tracking-[-0.05em] text-[#F6F1E7] uppercase mb-10"
                        style={{ fontSize: 'clamp(48px, 9vw, 100px)' }}
                    >
                        Don't just present the work.<br />
                        <span className="text-[#C1A674]">Explain it.</span>
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#9a9a94] max-w-[480px]">
                        Decompile your next ad before anyone else does.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                    <a
                        href="/ingest"
                        className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#F6F1E7]"
                    >
                        Decompile an Ad
                        <ArrowUpRight size={16} />
                    </a>
                    <a
                        href={SAMPLE_DOSSIER_HREF}
                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a9a94] transition hover:text-[#F6F1E7]"
                    >
                        <span className="w-6 h-px bg-[#141414]/20" />
                        View Sample Dossier
                    </a>
                </motion.div>
            </div>

            {/* ── FAQ STRIP ── */}
            <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-10">Common questions</p>
                <div>
                    {FAQS.map((item, i) => (
                        <FaqRow key={item.q} q={item.q} a={item.a} index={i} />
                    ))}
                    <div className="border-t border-[#222]" />
                </div>
            </div>

            {/* ── FOOTER BAR ── */}
            <div className="mx-auto max-w-[1200px] px-6 py-8 sm:px-8 lg:px-10 border-t border-[#222]">
                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                    <Logo sublabel="CREATIVE INTELLIGENCE, MADE READABLE." forceDark={false} className="scale-[0.85] origin-left" />
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {[
                            { label: 'About', href: '/about' },
                            { label: 'Pricing', href: '/pricing' },
                            { label: 'Method', href: '/trust-method' },
                            { label: 'Vault', href: '/vault' },
                            { label: 'Help', href: '/docs/user-guide' },
                            { label: 'Login', href: '/login' },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6F1E7]/30 transition hover:text-[#F6F1E7]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6F1E7]/15">
                        <a href="/legal/terms" className="hover:text-[#F6F1E7]/40 transition">Terms</a>
                        <a href="/legal/privacy" className="hover:text-[#F6F1E7]/40 transition">Privacy</a>
                        <span>© 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
