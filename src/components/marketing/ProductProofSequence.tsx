'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// ─── Shared reveal preset ────────────────────────────────────────────────────
const REVEAL = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const REVEAL_FAST = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

// ─── 1. SINGLE ASSET DECONSTRUCTION ─────────────────────────────────────────
// Full-bleed dark section. Large ad image bleeds edge-to-edge.
// Dossier findings float as annotation pins layered on top.
// ─────────────────────────────────────────────────────────────────────────────
type Annotation = {
    id: string;
    label: string;
    desc: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
};

const ANNOTATIONS: readonly Annotation[] = [
    { id: 'A', label: 'Focal Pull', desc: 'Subject gaze locks viewer — active eye-contact triggers status recognition before copy reads.', top: '12%', left: '5%' },
    { id: 'B', label: 'Chromatic Restraint', desc: 'Palette compressed to 2 tones. Scarcity of colour signals rarity and editorial authority.', top: '38%', right: '4%' },
    { id: 'C', label: 'Hierarchy Lock', desc: 'Product occupies lower-right — desire is established by posture before product is consciously noticed.', bottom: '18%', left: '7%' },
];

function SingleAssetDeconstruction() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

    return (
        <section ref={ref} className="relative w-full overflow-hidden bg-[#0E0C0A]" style={{ minHeight: '90vh' }}>
            {/* ── Full-bleed ad image with parallax ── */}
            <motion.div style={{ y: imageY }} className="absolute inset-0 will-change-transform">
                <Image
                    src="/images/examples/Natalie Portman Miss Dior Absolutely Blooming.jpg"
                    alt="Miss Dior — forensic analysis"
                    fill
                    className="object-cover object-top"
                    priority
                />
                {/* Heavy vignette so text reads over image */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0E0C0A]/90 via-[#0E0C0A]/40 to-[#0E0C0A]/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A] via-transparent to-[#0E0C0A]/30" />
            </motion.div>

            {/* ── Section content ── */}
            <div className="relative z-10 mx-auto max-w-[1400px] px-10 py-24 lg:py-32">

                {/* Top label */}
                <motion.div {...REVEAL_FAST} className="mb-16">
                    <p className="text-[10px] font-black uppercase tracking-[0.55em] text-[#D4A574]">
                        Single Asset · Deconstruction
                    </p>
                </motion.div>

                {/* Giant headline */}
                <motion.div {...REVEAL} className="max-w-2xl">
                    <h2 className="text-[56px] font-black leading-[0.92] tracking-[-0.04em] text-white lg:text-[80px]">
                        Deconstruct<br />
                        <span className="text-[#D4A574]">the invisible</span><br />
                        architecture.
                    </h2>
                    <p className="mt-8 max-w-md text-[16px] leading-[1.6] text-white/60">
                        Upload any ad. Get the persuasion mechanics, execution risk, and strategic direction — in under 60 seconds.
                    </p>
                    <a
                        href="/ingest"
                        className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-[#D4A574] px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#0E0C0A] transition hover:bg-[#E0B882]"
                    >
                        Start Decompiling Free
                        <ArrowUpRight size={14} />
                    </a>
                </motion.div>

                {/* Annotation pins */}
                {ANNOTATIONS.map((ann, i) => (
                    <motion.div
                        key={ann.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute hidden lg:block"
                        style={{
                            top: ann.top ?? undefined,
                            bottom: ann.bottom ?? undefined,
                            left: ann.left ?? undefined,
                            right: ann.right ?? undefined,
                        }}
                    >
                        <div className="flex items-start gap-3 max-w-[200px]">
                            {/* Pin dot */}
                            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#D4A574] bg-[#D4A574]/20 text-[9px] font-black text-[#D4A574]">
                                {ann.id}
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4A574]">{ann.label}</p>
                                <p className="mt-1.5 text-[12px] leading-[1.5] text-white/70">{ann.desc}</p>
                            </div>
                        </div>
                        {/* Connecting line */}
                        <div className="mt-2 ml-2.5 h-px w-16 bg-gradient-to-r from-[#D4A574]/60 to-transparent" />
                    </motion.div>
                ))}
            </div>

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FBFBF6] to-transparent pointer-events-none z-20" />
        </section>
    );
}

// ─── 2. DIFFERENTIAL DIAGNOSIS ───────────────────────────────────────────────
// Two raw images side-by-side, full section width, no containing card.
// Three stats displayed as a huge horizontal row between or below.
// ─────────────────────────────────────────────────────────────────────────────
const DIFF_METRICS = [
    { label: 'Strategic Delta',  value: '+27%', sub: 'novelty advantage' },
    { label: 'Persuasion Lift',  value: '+18%', sub: 'identity pull'     },
    { label: 'Fatigue Gap',      value: '−22%', sub: 'repetition risk'   },
] as const;

function DifferentialDiagnosisSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imgAY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);
    const imgBY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

    return (
        <section ref={ref} className="relative w-full overflow-hidden bg-[#FBFBF6] py-24 lg:py-32">
            {/* ── Section label ── */}
            <motion.div {...REVEAL_FAST} className="mx-auto max-w-[1400px] px-10 mb-10">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.55em] text-[#D4A574]">
                        Differential · Diagnostic
                    </p>
                    <a
                        href="/compare"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#141414] hover:text-[#D4A574] transition"
                    >
                        Run Comparison <ArrowUpRight size={12} />
                    </a>
                </div>
            </motion.div>

            {/* ── Giant section headline ── */}
            <motion.div {...REVEAL} className="mx-auto max-w-[1400px] px-10 mb-12">
                <h2 className="text-[52px] font-black leading-[0.9] tracking-[-0.04em] text-[#141414] lg:text-[72px]">
                    Choose two.<br />
                    <span className="text-[#D4A574]">Surface the delta.</span>
                </h2>
            </motion.div>

            {/* ── Raw two-image spread ── */}
            <div className="relative mx-auto max-w-[1400px] px-10">
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                    {/* Control */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden rounded-[1.75rem] will-change-transform"
                        style={{ aspectRatio: '4/5', y: imgAY }}
                    >
                        <Image
                            src="/images/examples/Chanel_No5.webp"
                            alt="Control asset"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/70 via-transparent to-transparent" />
                        {/* Label */}
                        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 backdrop-blur-sm">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/80">Control · Asset A</p>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-[13px] font-semibold italic text-white/80">Heritage-led prestige framing</p>
                        </div>
                    </motion.div>

                    {/* Proposed */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden rounded-[1.75rem] will-change-transform"
                        style={{ aspectRatio: '4/5', y: imgBY }}
                    >
                        <Image
                            src="/images/examples/Miss_DIOR.jpg"
                            alt="Proposed asset"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/70 via-transparent to-transparent" />
                        {/* Label */}
                        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 backdrop-blur-sm">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/80">Proposed · Asset B</p>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-[13px] font-semibold italic text-white/80">Modern identity-led persuasion</p>
                        </div>
                    </motion.div>
                </div>

                {/* Connecting bridge label */}
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A574]/40 bg-[#FBFBF6] px-4 py-2 shadow-lg">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4A574]">vs</p>
                </div>
            </div>

            {/* ── Huge stat row ── */}
            <div className="mx-auto max-w-[1400px] px-10 mt-12">
                <div className="grid grid-cols-3 divide-x divide-[#E7DED1] border border-[#E7DED1] rounded-[1.5rem] overflow-hidden">
                    {DIFF_METRICS.map((m, i) => (
                        <motion.div
                            key={m.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="flex flex-col px-10 py-8"
                        >
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#9A8A72]">{m.label}</p>
                            <p className="mt-3 text-[52px] font-black leading-none tracking-[-0.04em] text-[#141414] lg:text-[64px]">{m.value}</p>
                            <p className="mt-2 text-[12px] font-medium text-[#7A6A55]">{m.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── 3. TRUST BOUNDARY PANEL ─────────────────────────────────────────────────
// Swiss editorial poster split. Left column: massive "IS" / "IS NOT" in
// huge black tracked type. Right column: clean lists. Dark background island.
// ─────────────────────────────────────────────────────────────────────────────
const VD_IS = [
    'A forensic intelligence system for creative quality decisions',
    'A diagnostic layer for mechanism and strategic risk',
    'A direction tool for teams and agencies who build ads',
    'A credibility layer for pitches and client rationale',
] as const;

const VD_IS_NOT = [
    'An ad generator or copy factory',
    'A design editor or creative suite',
    'An ad-spy or inspiration feed',
    'A performance dashboard',
] as const;

function TrustBoundaryPanel() {
    return (
        <section className="relative w-full overflow-hidden bg-[#141414] py-24 lg:py-32">

            {/* ── Section label ── */}
            <motion.div {...REVEAL_FAST} className="mx-auto max-w-[1400px] px-10 mb-16">
                <p className="text-[10px] font-black uppercase tracking-[0.55em] text-[#D4A574]">
                    What Visual Decompiler is — and is not
                </p>
            </motion.div>

            {/* ── Swiss two-column poster split ── */}
            <div className="mx-auto max-w-[1400px] px-10">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/10">

                    {/* LEFT: IS */}
                    <motion.div
                        {...REVEAL}
                        className="lg:pr-16"
                    >
                        {/* Big label acting as a design element */}
                        <p
                            className="font-black uppercase leading-none text-white/[0.06] select-none pointer-events-none"
                            style={{ fontSize: 'clamp(80px, 14vw, 180px)', letterSpacing: '-0.06em', lineHeight: 0.85 }}
                            aria-hidden="true"
                        >
                            IS
                        </p>
                        <div className="-mt-2 lg:-mt-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4A574] mb-8">VD is</p>
                            <ul className="space-y-5">
                                {VD_IS.map((item, i) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: i * 0.08 }}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A574]" />
                                        <span className="text-[17px] font-medium leading-snug text-white/75">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* RIGHT: IS NOT */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:pl-16"
                    >
                        <p
                            className="font-black uppercase leading-none text-white/[0.06] select-none pointer-events-none"
                            style={{ fontSize: 'clamp(80px, 14vw, 180px)', letterSpacing: '-0.06em', lineHeight: 0.85 }}
                            aria-hidden="true"
                        >
                            NOT
                        </p>
                        <div className="-mt-2 lg:-mt-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4A574] mb-8">VD is not</p>
                            <ul className="space-y-5">
                                {VD_IS_NOT.map((item, i) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, x: 16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: i * 0.08 }}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="mt-2 h-px w-4 shrink-0 bg-white/30" />
                                        <span className="text-[17px] font-medium leading-snug text-white/40 line-through decoration-white/20">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* ── Bottom CTA row ── */}
                <motion.div
                    {...REVEAL}
                    className="mt-20 flex items-end justify-between border-t border-white/10 pt-12"
                >
                    <p className="max-w-sm text-[14px] leading-relaxed text-white/40">
                        Blueprint reconstruction paths are provided for audit transparency and reproducibility — not generation inside VD.
                    </p>
                    <a
                        href="/ingest"
                        className="inline-flex items-center gap-2.5 rounded-full bg-[#D4A574] px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#141414] transition hover:bg-[#E0B882] hover:-translate-y-0.5"
                    >
                        Start Decompiling Free
                        <ArrowUpRight size={14} />
                    </a>
                </motion.div>
            </div>

            {/* Bottom fade into FooterStartNow */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FBFBF6] to-transparent pointer-events-none" />
        </section>
    );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export default function ProductProofSequence() {
    return (
        <div id="funnel">
            <SingleAssetDeconstruction />
            <DifferentialDiagnosisSection />
            <TrustBoundaryPanel />
        </div>
    );
}
