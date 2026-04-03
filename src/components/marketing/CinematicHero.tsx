'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HOMEPAGE_PRIMARY_CTA, HOMEPAGE_CTA_ICON } from '@/components/marketing/ctaStyles';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

// ── Ad images for the parallax mosaic ──────────────────────────────────────────
const AD_IMAGES = [
    { src: '/images/examples/Miss_DIOR.jpg',          alt: 'Miss Dior campaign',         aspect: 'portrait' },
    { src: '/images/examples/Chanel_No5.webp',        alt: 'Chanel No.5',                aspect: 'portrait' },
    { src: '/images/examples/valentino-voce-viva.png',alt: 'Valentino Voce Viva',        aspect: 'portrait' },
    { src: '/images/examples/ACNE.png',               alt: 'ACNE Studios',               aspect: 'portrait' },
    { src: '/images/examples/CHLOE.jpg',              alt: 'Chloé campaign',             aspect: 'portrait' },
    { src: '/images/examples/Watch.png',              alt: 'Watch campaign',             aspect: 'portrait' },
];

// ── Marquee words ─────────────────────────────────────────────────────────────
const MARQUEE_WORDS = [
    'DECODE', '·', 'DIAGNOSE', '·', 'DIRECT', '·',
    'DECODE', '·', 'DIAGNOSE', '·', 'DIRECT', '·',
];

// ── Dossier findings ──────────────────────────────────────────────────────────
const FINDINGS = [
    { label: 'Primary Mechanic', value: 'Status-coded restraint creates desire without verbal selling.' },
    { label: 'Risk Signal',      value: 'Message clarity drops if elegance overwhelms product proof.' },
    { label: 'Direction',        value: 'Preserve the authority layer. Tighten the value transfer.' },
] as const;

// ── Individual parallax image tile ────────────────────────────────────────────
function ParallaxTile({
    src, alt, delay, speed, offsetY, rotation
}: {
    src: string; alt: string; delay: number;
    speed: number; offsetY: number; rotation: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [offsetY, -offsetY * speed]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[1.6rem] will-change-transform"
            style={{
                y,
                rotate: rotation,
                boxShadow: '0 32px 72px rgba(20,20,20,0.18)',
            }}
        >
            <Image
                src={src}
                alt={alt}
                width={380}
                height={520}
                className="w-full h-full object-cover"
                priority
            />
            {/* subtle dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
        </motion.div>
    );
}

// ── SVG Text Mask over the mosaic ─────────────────────────────────────────────
function TextMaskLayer({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
    const maskY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

    return (
        <motion.div
            style={{ y: maskY }}
            className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center"
        >
            {/* The SVG text used as a clipping mask to reveal the images underneath */}
            <svg
                className="w-full h-auto select-none"
                viewBox="0 0 1400 280"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <style>{`
                        .hero-text {
                            font-family: 'Inter', -apple-system, sans-serif;
                            font-weight: 900;
                            font-size: 192px;
                            letter-spacing: -0.06em;
                            fill: #141414;
                        }
                    `}</style>
                </defs>
                <text className="hero-text" x="50%" y="160" textAnchor="middle" dominantBaseline="middle">
                    VISUAL
                </text>
            </svg>
            <svg
                className="w-full h-auto select-none -mt-8"
                viewBox="0 0 1400 280"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <style>{`
                        .hero-text-2 {
                            font-family: 'Inter', -apple-system, sans-serif;
                            font-weight: 900;
                            font-size: 192px;
                            letter-spacing: -0.06em;
                            fill: transparent;
                            -webkit-text-stroke: 2px #141414;
                        }
                    `}</style>
                </defs>
                <text className="hero-text-2" x="50%" y="160" textAnchor="middle" dominantBaseline="middle">
                    DECOMPILER
                </text>
            </svg>
        </motion.div>
    );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function CinematicHero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

    // Parallax for mosaic background — faster than scroll
    const mosaicY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    // Dossier card floats up slightly on scroll
    const dossierY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden bg-[#F0EDE6]"
            style={{ minHeight: '100svh' }}
        >
            {/* ── LAYER 1: Full-bleed parallax photo mosaic ───────────────── */}
            <motion.div
                style={{ y: mosaicY }}
                className="absolute inset-0 z-0 grid grid-cols-3 gap-4 px-4 pt-8 pb-8 will-change-transform"
                aria-hidden="true"
            >
                {/* Column 1 — offset down */}
                <div className="flex flex-col gap-4 pt-12">
                    <ParallaxTile src={AD_IMAGES[0].src} alt={AD_IMAGES[0].alt} delay={0}    speed={0.3} offsetY={40} rotation={-1.5} />
                    <ParallaxTile src={AD_IMAGES[3].src} alt={AD_IMAGES[3].alt} delay={0.1}  speed={0.4} offsetY={50} rotation={0.5}  />
                </div>
                {/* Column 2 — starts higher, slight overlap feel */}
                <div className="flex flex-col gap-4 -mt-6">
                    <ParallaxTile src={AD_IMAGES[1].src} alt={AD_IMAGES[1].alt} delay={0.05} speed={0.5} offsetY={60} rotation={1.0}  />
                    <ParallaxTile src={AD_IMAGES[4].src} alt={AD_IMAGES[4].alt} delay={0.15} speed={0.3} offsetY={30} rotation={-0.8} />
                </div>
                {/* Column 3 — offset down again */}
                <div className="flex flex-col gap-4 pt-8">
                    <ParallaxTile src={AD_IMAGES[2].src} alt={AD_IMAGES[2].alt} delay={0.08} speed={0.4} offsetY={55} rotation={1.8}  />
                    <ParallaxTile src={AD_IMAGES[5].src} alt={AD_IMAGES[5].alt} delay={0.18} speed={0.5} offsetY={45} rotation={-1.2} />
                </div>

                {/* Overlay to unify the mosaic into the bone background */}
                <div className="absolute inset-0 bg-[#F0EDE6]/60 pointer-events-none" />
            </motion.div>

            {/* ── LAYER 2: Giant SVG text ──────────────────────────────────── */}
            <TextMaskLayer scrollYProgress={scrollYProgress} />

            {/* ── LAYER 3: Kinetic marquee strip ──────────────────────────── */}
            <div
                className="absolute top-[62%] left-0 right-0 z-20 overflow-hidden whitespace-nowrap border-y border-[#141414]/10 bg-[#141414]/[0.03] py-3 backdrop-blur-[2px]"
                aria-hidden="true"
            >
                <div className="marquee-track inline-flex gap-0">
                    {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
                        <span
                            key={i}
                            className={`
                                inline-block px-5
                                text-[11px] font-black uppercase tracking-[0.45em]
                                ${word === '·' ? 'text-[#D4A574]' : 'text-[#141414]'}
                            `}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── LAYER 4: Floating dossier card ──────────────────────────── */}
            <motion.div
                style={{ y: dossierY }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-10 right-10 z-30 w-[400px]"
            >
                <div className="rounded-[2rem] border border-[#D9CCB8] bg-[rgba(255,251,244,0.88)] p-6 shadow-[0_40px_80px_rgba(20,20,20,0.18)] backdrop-blur-xl">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.38em] text-[#D4A574]">Campaign Dossier</p>
                            <p className="mt-1 text-[12px] font-medium tracking-tight text-[#5E5A53]">Miss Dior · Print Campaign</p>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full border border-[#D4A574]/30 bg-[#F8F3EA] px-3 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00b85e]" />
                            <span className="text-[10px] font-bold text-[#5E5A53]">94 confidence</span>
                        </div>
                    </div>

                    {/* Findings list */}
                    <div className="space-y-3">
                        {FINDINGS.map((f) => (
                            <div key={f.label} className="rounded-[1.2rem] border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-3">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4A574]">{f.label}</p>
                                <p className="mt-1.5 text-[13px] leading-snug text-[#141414]">{f.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="mt-5 flex gap-3">
                        <a
                            href="/ingest"
                            className={`${HOMEPAGE_PRIMARY_CTA} flex-1 text-center justify-center`}
                        >
                            <span>Start Decompiling</span>
                            <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                        </a>
                        <a
                            href={SAMPLE_DOSSIER_HREF}
                            className="flex items-center gap-1.5 rounded-full border border-[#D4A574]/30 bg-transparent px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4A574] transition hover:border-[#D4A574]/60"
                        >
                            See Sample
                        </a>
                    </div>

                    <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-[#9A9486]">
                        No card · 5 free analyses
                    </p>
                </div>
            </motion.div>

            {/* ── LAYER 5: Top-left brand statement ───────────────────────── */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-32 left-10 z-30 max-w-[260px]"
            >
                <p className="text-[10px] font-black uppercase tracking-[0.42em] text-[#D4A574]">
                    Forensic Creative Intelligence
                </p>
                <p className="mt-3 text-[15px] font-semibold leading-snug tracking-tight text-[#141414]">
                    Drop any ad.<br />
                    See the invisible.
                </p>
            </motion.div>

            {/* Bottom gradient fade into next section */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-[#FBFBF6] to-transparent pointer-events-none" />

            <style>{`
                /* Infinite marquee scroll */
                .marquee-track {
                    animation: marquee-scroll 22s linear infinite;
                }
                @keyframes marquee-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
