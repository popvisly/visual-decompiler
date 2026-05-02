'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import Logo from '@/components/Logo';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
import { HOMEPAGE_CTA_ICON, MARKETING_PRIMARY_CTA_LG, MARKETING_SECONDARY_CTA_LG } from '@/components/marketing/ctaStyles';

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
    {
        q: 'Is Visual Decompiler secure and confidential for agencies?',
        a: 'Yes. Your workspace is private by default. Access is authenticated, and your data is served over HTTPS on Vercel infrastructure with baseline network and platform protections.',
    },
];

function FaqRow({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    return (
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: index * 0.07 }}
            className="border-t border-black/5"
        >
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
                aria-expanded={open}
            >
                <span className="text-[15px] font-semibold leading-snug text-[#141414] lg:text-[16px]">{q}</span>
                <span className="mt-0.5 shrink-0 text-[#8B6A3D]/80">
                    {open ? <Minus size={16} /> : <Plus size={16} />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={prefersReducedMotion ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-[14px] leading-relaxed text-[#6B6B6B]">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FooterStartNow() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <footer className="relative bg-[#FBFBF6] text-[#141414]">
            {/* ── OUTRO CTA BLOCK ── */}
            <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-20 sm:px-8 lg:px-10 lg:pt-32 lg:pb-24">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={prefersReducedMotion ? undefined : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-8">
                        Final CTA
                    </p>
                    <h2 className="font-black leading-[0.88] tracking-[-0.05em] text-[#141414] uppercase mb-10"
                        style={{ fontSize: 'clamp(44px, 8vw, 86px)' }}
                    >
                        Don't just show the work.<br />
                        <span className="mt-3 block text-[#D4A574] tracking-[0.01em]" style={{ wordSpacing: '0.14em' }}>Defend it.</span>
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#6B6B6B] max-w-[480px]">
                        Decompile your next ad before the room starts asking questions.
                    </p>
                </motion.div>

                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? undefined : { duration: 0.8, delay: 0.3 }}
                    className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                    <a
                        href="/ingest"
                        className={MARKETING_PRIMARY_CTA_LG}
                    >
                        Start Free
                        <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                    </a>
                    <a
                        href={SAMPLE_DOSSIER_HREF}
                        className={MARKETING_SECONDARY_CTA_LG}
                    >
                        View Sample Dossier
                    </a>
                </motion.div>
            </div>

            {/* ── FAQ STRIP ── */}
            <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/80 mb-10">Common questions</p>
                <div>
                    {FAQS.map((item, i) => (
                        <FaqRow key={item.q} q={item.q} a={item.a} index={i} />
                    ))}
                    <div className="border-t border-black/5" />
                </div>
            </div>

            {/* ── FOOTER BAR ── */}
            <div className="mx-auto max-w-[1200px] px-6 py-8 sm:px-8 lg:px-10 border-t border-black/5">
                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                    <Logo sublabel="CREATIVE INTELLIGENCE, MADE READABLE." hoverColor="yellow" className="scale-[0.85] origin-left" />
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
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A84] transition hover:text-[#141414]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A84]">
                        <a href="/legal/terms" className="hover:text-[#141414] transition">Terms</a>
                        <a href="/legal/privacy" className="hover:text-[#141414] transition">Privacy</a>
                        <span>© 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
