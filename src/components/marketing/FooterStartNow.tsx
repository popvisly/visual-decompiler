     1|'use client';
     2|
     3|import { useState } from 'react';
     4|import { motion, AnimatePresence } from 'framer-motion';
     5|import { ArrowUpRight, Plus, Minus } from 'lucide-react';
     6|import Logo from '@/components/Logo';
     7|import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
     8|
     9|const FAQS = [
    10|    {
    11|        q: 'What kind of ads can I analyse?',
    12|        a: 'Any static or video ad: print, digital, social, OOH. Upload JPG, PNG, WebP, MP4, or bring in a URL. Visual Decompiler reads the creative itself, not just the media placement around it.',
    13|    },
    14|    {
    15|        q: 'Is this an AI generation tool?',
    16|        a: 'No. It does not generate ads or replace creative judgment. It helps you articulate why a piece holds, where it weakens, and what to change next.',
    17|    },
    18|    {
    19|        q: 'How is this different from an ad-spy tool?',
    20|        a: 'Ad-spy tools and scrapers tell you what is out there. Visual Decompiler is for reading what the work is doing once it is in front of you: its hierarchy, tension, identity pull, and distinctiveness.',
    21|    },
    22|    {
    23|        q: 'Who is this actually for?',
    24|        a: 'Art directors, designers, strategists, founders, and creative teams who need a sharper read in reviews, pitches, and internal decision-making.',
    25|    },
    26|    {
    27|        q: 'Can I use this with clients or in pitches?',
    28|        a: 'Yes. The reads are designed to travel into client rooms, decks, strategy sessions, and creative reviews without feeling like software output.',
    29|    },
    30|];
    31|
    32|function FaqRow({ q, a, index }: { q: string; a: string; index: number }) {
    33|    const [open, setOpen] = useState(false);
    34|    return (
    35|        <motion.div
    36|            initial={{ opacity: 0, y: 16 }}
    37|            whileInView={{ opacity: 1, y: 0 }}
    38|            viewport={{ once: true, amount: 0.4 }}
    39|            transition={{ duration: 0.5, delay: index * 0.07 }}
    40|            className="border-t border-[#222]"
    41|        >
    42|            <button
    43|                onClick={() => setOpen((v) => !v)}
    44|                className="flex w-full items-start justify-between gap-6 py-6 text-left"
    45|                aria-expanded={open}
    46|            >
    47|                <span className="text-[15px] font-semibold leading-snug text-[#F6F1E7]/80 lg:text-[16px]">{q}</span>
    48|                <span className="mt-0.5 shrink-0 text-[#C1A674]">
    49|                    {open ? <Minus size={16} /> : <Plus size={16} />}
    50|                </span>
    51|            </button>
    52|            <AnimatePresence initial={false}>
    53|                {open && (
    54|                    <motion.div
    55|                        key="content"
    56|                        initial={{ height: 0, opacity: 0 }}
    57|                        animate={{ height: 'auto', opacity: 1 }}
    58|                        exit={{ height: 0, opacity: 0 }}
    59|                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    60|                        className="overflow-hidden"
    61|                    >
    62|                        <p className="pb-6 text-[14px] leading-relaxed text-[#9a9a94]">{a}</p>
    63|                    </motion.div>
    64|                )}
    65|            </AnimatePresence>
    66|        </motion.div>
    67|    );
    68|}
    69|
    70|export default function FooterStartNow() {
    71|    return (
    72|        <footer className="relative bg-[#0B0B0B] text-[#F6F1E7] border-t border-[#222]">
    73|            {/* ── OUTRO CTA BLOCK ── */}
    74|            <div className="mx-auto max-w-[1200px] px-6 pt-32 pb-24 sm:px-8 lg:px-10 lg:pt-48 lg:pb-32">
    75|                <motion.div
    76|                    initial={{ opacity: 0, y: 40 }}
    77|                    whileInView={{ opacity: 1, y: 0 }}
    78|                    viewport={{ once: true, margin: '-100px' }}
    79|                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    80|                >
    81|                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-8">
    82|                        Get started
    83|                    </p>
    84|                    <h2 className="font-black leading-[0.88] tracking-[-0.05em] text-[#F6F1E7] uppercase mb-10"
    85|                        style={{ fontSize: 'clamp(48px, 9vw, 100px)' }}
    86|                    >
    87|                        Bring in the frame.<br />
    88|                        <span className="text-[#C1A674]">Get the creative read.</span>
    89|                    </h2>
    90|                    <p className="text-[18px] leading-[1.7] text-[#9a9a94] max-w-[480px]">
    91|                        Built for art directors, designers, strategists, founders, and teams who need language for what the work is doing before the room moves on.
    92|                    </p>
    93|                </motion.div>
    94|
    95|                <motion.div
    96|                    initial={{ opacity: 0, y: 20 }}
    97|                    whileInView={{ opacity: 1, y: 0 }}
    98|                    viewport={{ once: true }}
    99|                    transition={{ duration: 0.8, delay: 0.3 }}
   100|                    className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
   101|                >
   102|                    <a
   103|                        href={SAMPLE_DOSSIER_HREF}
   104|                        className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#F6F1E7]"
   105|                    >
   106|                        Open Sample Read
   107|                        <ArrowUpRight size={16} />
   108|                    </a>
   109|                    <a
   110|                        href="/ingest"
   111|                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a9a94] transition hover:text-[#F6F1E7]"
   112|                    >
   113|                        <span className="w-6 h-px bg-[#141414]/20" />
   114|                        Start Decompiling Free
   115|                    </a>
   116|                </motion.div>
   117|            </div>
   118|
   119|            {/* ── FAQ STRIP ── */}
   120|            <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
   121|                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-10">Common questions</p>
   122|                <div>
   123|                    {FAQS.map((item, i) => (
   124|                        <FaqRow key={item.q} q={item.q} a={item.a} index={i} />
   125|                    ))}
   126|                    <div className="border-t border-[#222]" />
   127|                </div>
   128|            </div>
   129|
   130|            {/* ── FOOTER BAR ── */}
   131|            <div className="mx-auto max-w-[1200px] px-6 py-8 sm:px-8 lg:px-10 border-t border-[#222]">
   132|                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
   133|                    <Logo sublabel="VISUAL JUDGMENT FOR WORKING CREATIVES" forceDark={false} className="scale-[0.85] origin-left" />
   134|                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
   135|                        {[
   136|                            { label: 'About', href: '/about' },
   137|                            { label: 'Pricing', href: '/pricing' },
   138|                            { label: 'Method', href: '/trust-method' },
   139|                            { label: 'Vault', href: '/vault' },
   140|                            { label: 'Help', href: '/docs/user-guide' },
   141|                            { label: 'Login', href: '/login' },
   142|                        ].map((link) => (
   143|                            <a
   144|                                key={link.label}
   145|                                href={link.href}
   146|                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6F1E7]/30 transition hover:text-[#F6F1E7]"
   147|                            >
   148|                                {link.label}
   149|                            </a>
   150|                        ))}
   151|                    </div>
   152|                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6F1E7]/15">
   153|                        <a href="/legal/terms" className="hover:text-[#F6F1E7]/40 transition">Terms</a>
   154|                        <a href="/legal/privacy" className="hover:text-[#F6F1E7]/40 transition">Privacy</a>
   155|                        <span>© 2026</span>
   156|                    </div>
   157|                </div>
   158|            </div>
   159|        </footer>
   160|    );
   161|}
   162|