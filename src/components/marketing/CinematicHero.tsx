'use client';

import { useRef, useState } from 'react';
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

// ── Dossier findings ──────────────────────────────────────────────────────────
const FINDINGS = [
    { label: `What it's doing`, value: 'Status-coded restraint creates desire without verbal selling.' },
    { label: 'What weakens it', value: 'Message clarity slips when elegance outruns product read.' },
    { label: 'Push this',       value: 'Keep the authority. Increase the sense of product arrival.' },
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



// ── Main component ─────────────────────────────────────────────────────────────
export default function CinematicHero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
    const [isFocused, setIsFocused] = useState(false);

    // Parallax for mosaic background — faster than scroll
    const mosaicY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    // Dossier card floats up slightly on scroll
    const dossierY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden bg-[#F0EDE6]"
            style={{ minHeight: '980px' }}
            data-presence-tone="bone"
        >
            {/* ── LAYER 1: Full-bleed parallax photo mosaic ───────────────── */}
            <motion.div
                style={{ y: mosaicY, filter: isFocused ? 'saturate(1)' : 'saturate(0.92)' }}
                className="absolute inset-0 z-0 grid grid-cols-2 gap-3 px-3 pt-24 pb-8 will-change-transform sm:gap-4 sm:px-4 sm:pt-28 md:grid-cols-3 md:pt-8"
                aria-hidden="true"
            >
                {/* Column 1 — offset down */}
                <div className="flex flex-col gap-3 pt-12 sm:gap-4">
                    <ParallaxTile src={AD_IMAGES[0].src} alt={AD_IMAGES[0].alt} delay={0}    speed={0.3} offsetY={40} rotation={-1.5} />
                    <ParallaxTile src={AD_IMAGES[3].src} alt={AD_IMAGES[3].alt} delay={0.1}  speed={0.4} offsetY={50} rotation={0.5}  />
                </div>
                {/* Column 2 — starts higher, slight overlap feel */}
                <div className="flex flex-col gap-3 -mt-6 sm:gap-4">
                    <ParallaxTile src={AD_IMAGES[1].src} alt={AD_IMAGES[1].alt} delay={0.05} speed={0.5} offsetY={60} rotation={1.0}  />
                    <ParallaxTile src={AD_IMAGES[4].src} alt={AD_IMAGES[4].alt} delay={0.15} speed={0.3} offsetY={30} rotation={-0.8} />
                </div>
                {/* Column 3 — offset down again */}
                <div className="hidden flex-col gap-4 pt-8 md:flex">
                    <ParallaxTile src={AD_IMAGES[2].src} alt={AD_IMAGES[2].alt} delay={0.08} speed={0.4} offsetY={55} rotation={1.8}  />
                    <ParallaxTile src={AD_IMAGES[5].src} alt={AD_IMAGES[5].alt} delay={0.18} speed={0.5} offsetY={45} rotation={-1.2} />
                </div>

                {/* Overlay to unify the mosaic into the bone background */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isFocused ? 'bg-[#F0EDE6]/56' : 'bg-[#F0EDE6]/66'}`} />
            </motion.div>



            {/* ── LAYER 4: Floating dossier card ──────────────────────────── */}
            <motion.div
                style={{ y: dossierY }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-6 left-4 right-4 z-30 sm:bottom-8 sm:left-6 sm:right-6 md:bottom-10 md:left-auto md:right-10 md:w-[400px]"
                onHoverStart={() => setIsFocused(true)}
                onHoverEnd={() => setIsFocused(false)}
                whileHover={{ y: -8 }}
                data-presence-target="annotation"
            >
                <div className="rounded-[2rem] border border-[#D9CCB8] bg-[rgba(255,251,244,0.9)] p-5 shadow-[0_40px_80px_rgba(20,20,20,0.18)] backdrop-blur-xl sm:p-6">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.38em] text-[#D4A574]">Creative Reading</p>
                            <p className="mt-1 text-[12px] font-medium tracking-tight text-[#5E5A53]">Miss Dior · print still</p>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full border border-[#D4A574]/30 bg-[#F8F3EA] px-3 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
                            <span className="text-[10px] font-bold text-[#5E5A53]">Held read</span>
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
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <a
                            href="/ingest"
                            className={`${HOMEPAGE_PRIMARY_CTA} flex-1 text-center justify-center`}
                            data-presence-target="cta"
                        >
                            <span>Start Decompiling</span>
                            <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                        </a>
                        <a
                            href={SAMPLE_DOSSIER_HREF}
                            className="flex items-center gap-1.5 rounded-full border border-[#D4A574]/30 bg-transparent px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4A574] transition hover:border-[#D4A574]/60"
                            data-presence-target="inspect"
                        >
                            See Sample
                        </a>
                    </div>

                    <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-[#9A9486]">
                        No card · 5 free reads
                    </p>
                </div>
            </motion.div>

            {/* ── LAYER 5: Top-left brand statement ───────────────────────── */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-4 top-28 z-30 max-w-[220px] sm:left-6 sm:top-32 sm:max-w-[260px] md:left-10"
            >
                <p className="text-[10px] font-black uppercase tracking-[0.42em] text-[#D4A574]">
                    For Working Creatives
                </p>
                <p className="mt-3 text-[14px] font-semibold leading-snug tracking-tight text-[#141414] sm:text-[15px]">
                    Bring a sharper read into the room.<br />
                    See what the work is really doing.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-4 right-4 top-[20rem] z-30 sm:left-6 sm:right-6 sm:top-[22rem] md:left-10 md:right-auto md:top-[38%] md:max-w-[460px]"
            >
                <p className="text-[38px] font-black leading-[0.92] tracking-[-0.05em] text-[#141414] sm:text-[54px] lg:text-[78px]">
                    Read the posture.<br />
                    Hold the distinctiveness.
                </p>
                <p className="mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#4F493F] sm:mt-6 sm:text-[16px]">
                    Decompile the work into a sharper read of hierarchy, tension, identity pull, and where it starts giving too much away.
                </p>
                <p className="mt-4 max-w-[32rem] text-[11px] font-bold uppercase tracking-[0.24em] text-[#8A7B64]">
                    Designers, strategists, founders, art directors, and teams shaping perception.
                </p>
                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                    <a href="/ingest" className={HOMEPAGE_PRIMARY_CTA} data-presence-target="cta">
                        <span>Start Decompiling Free</span>
                        <ArrowUpRight className={HOMEPAGE_CTA_ICON} />
                    </a>
                    <a
                        href={SAMPLE_DOSSIER_HREF}
                        className="inline-flex items-center gap-2 rounded-full border border-[#D4A574]/28 bg-[#FBF7EF]/70 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B6544] transition hover:border-[#D4A574]/60 hover:bg-[#FBF7EF]"
                        data-presence-target="inspect"
                    >
                        Open Sample Read
                        <ArrowUpRight size={14} />
                    </a>
                </div>
            </motion.div>

            {/* Bottom gradient fade into next section */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-[#FBFBF6] to-transparent pointer-events-none" />


        </section>
    );
}
