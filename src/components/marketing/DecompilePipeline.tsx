'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Pill, PreviewCard, StageImage } from '@/types/homepage';

type Props = {
  id?: string;
  stageImage: StageImage;
  pills: Pill[];
  reportPreviewCards: PreviewCard[];
};

export default function DecompilePipeline({ id = 'how', stageImage, pills, reportPreviewCards }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const signals = pills.slice(0, 6);

  const fadeUp = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id={id} className="relative bg-[#F6F1E7] pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(20,20,20,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.024)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
        >
          <div className="text-center w-full mx-auto mb-16 lg:mb-20 px-4">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#C1A67B]">
                The Extraction Protocol
              </span>
              <h2 className="text-4xl md:text-7xl font-semibold text-[#141414] tracking-tight uppercase leading-[0.9]">
                Drop an Ad.<br />
                <span className="text-[#C1A67B]">Get the Invisible Brief.</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed font-medium mt-8">
              13 forensic dimensions. Every ad contains a hidden persuasion architecture: trigger mechanics, semiotic subtext, gaze topology, competitive displacement, and more. We surface all of it.
            </p>
          </div>
        </motion.div>

        {/* ─── Unified Decompilation Process ─── */}
        <div className="w-full max-w-[1440px] mx-auto rounded-[32px] overflow-hidden border border-[#E7DED1] shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-[#FBF7EF] p-8 lg:p-12 xl:p-16 relative">
          {/* Subtle Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(193,166,123,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(193,166,123,0.03) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 w-full flex flex-col lg:grid lg:grid-cols-[1fr_1.3fr_1fr] gap-10 lg:gap-12 xl:gap-16">
            {/* ── PHASE 01 — INPUT ── */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }} variants={fadeUp}
              className="flex flex-col gap-6 md:gap-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[40px] font-bold text-[#141414]/[0.04] leading-none tracking-tighter select-none">01</span>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-[#C1A67B] uppercase">Phase 01</div>
                  <div className="text-xs tracking-wider text-[#6B6B6B] uppercase">01 - Ingest</div>
                </div>
              </div>
              <div className="text-2xl md:text-3xl leading-tight text-[#141414] font-semibold tracking-tight">Drop any ad. JPG, PNG, WebP.<br />It&apos;s secured and deduplicated instantly.</div>

              {/* Watch Image — Dark Frame */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#141414] border-0 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(193,166,123,0.15)] transition-all duration-300">
                <img src={stageImage.src} alt={stageImage.alt} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.85) contrast(1.05)' }} />

                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-5 h-5 border-l-[1.5px] border-t-[1.5px] border-[#C1A67B]/40 pointer-events-none" />
                <div className="absolute top-2 right-2 w-5 h-5 border-r-[1.5px] border-t-[1.5px] border-[#C1A67B]/40 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-l-[1.5px] border-b-[1.5px] border-[#C1A67B]/40 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-r-[1.5px] border-b-[1.5px] border-[#C1A67B]/40 pointer-events-none" />

                {/* Header bar */}
                <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-0 text-white/70 text-[8px] font-bold tracking-[0.2em] px-3 py-2 uppercase flex justify-between items-center z-10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#C1A67B] rounded-full animate-pulse shadow-[0_0_6px_rgba(193,166,123,0.5)]" />
                    Input Target
                  </span>
                  <span className="text-white/20 font-mono">ASSET_01</span>
                </div>
              </div>
            </motion.div>

            {/* ── PHASE 02 — SIGNALS ── */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }} variants={fadeUp}
              className="flex flex-col gap-6 md:gap-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[40px] font-bold text-[#141414]/[0.04] leading-none tracking-tighter select-none">02</span>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-[#C1A67B] uppercase">Phase 02</div>
                  <div className="text-xs tracking-wider text-[#6B6B6B] uppercase">02 - Deconstruct</div>
                </div>
              </div>
              <div className="text-2xl md:text-3xl leading-tight text-[#141414] font-semibold tracking-tight">13 forensic dimensions.<br />Extracted in under 3 minutes.</div>

              {/* Palette Logic — Watch: Navy, Rose Gold, Amber */}
              <div className="bg-white rounded-xl border-0 p-6 md:p-8 hover:shadow-lg transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="text-[9px] font-bold tracking-[0.2em] text-[#9a9a94] uppercase mb-3">Palette Logic</div>
                <div className="flex w-full h-5 rounded overflow-hidden mb-3 border-0 shadow-sm">
                  <div className="w-[30%] bg-[#1B2A4A]" />
                  <div className="w-[25%] bg-[#B8860B]" />
                  <div className="w-[20%] bg-[#C9A96E]" />
                  <div className="w-[15%] bg-[#2C3E50]" />
                  <div className="w-[10%] bg-[#F5E6CC]" />
                </div>
                <p className="text-[11px] text-[#6B6B6B] leading-relaxed">Deep navy and rose-gold tones encode authority, precision, and legacy-tier positioning.</p>
              </div>

              {/* Trigger Mechanic */}
              <div className="bg-white rounded-xl border border-[#C1A67B]/20 p-6 md:p-8 shadow-[0_4px_20px_rgba(193,166,123,0.12)] hover:shadow-[0_8px_32px_rgba(193,166,123,0.2)] transition-all duration-300">
                <div className="text-[9px] font-bold tracking-[0.2em] text-[#C1A67B] uppercase mb-3">Trigger Mechanic</div>
                <div className="bg-[#C1A67B]/10 border-0 rounded px-4 py-2 text-sm text-[#141414] font-semibold mb-3">
                  Craftsmanship Authority
                </div>
                <p className="text-[11px] text-[#6B6B6B] leading-relaxed">Macro-detail of horological complexity signals artisanal mastery as proof of value.</p>
              </div>

              {/* Semiotics */}
              <div className="bg-white rounded-xl border-0 p-6 md:p-8 hover:shadow-lg transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="text-[9px] font-bold tracking-[0.2em] text-[#9a9a94] uppercase mb-3">Semiotics</div>
                <p className="text-[11px] text-[#141414] leading-relaxed border-l-2 border-[#C1A67B]/40 pl-3 mb-3">
                  <strong>Precision as Legacy.</strong><br />
                  <span className="text-[#6B6B6B]">Diamond indices and sapphire crystal map to generational permanence.</span>
                </p>
                <p className="text-[11px] text-[#141414] leading-relaxed border-l-2 border-[#C1A67B]/40 pl-3">
                  <strong>Material Fidelity.</strong><br />
                  <span className="text-[#6B6B6B]">Rose gold bezel + deep navy dial encode exclusionary pricing without stating it.</span>
                </p>
              </div>

              {/* Signal Cards Grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {signals.slice(0, 4).map((p) => (
                  <div key={p.key} className="bg-[#F6F1E7] rounded-lg border-0 p-4 hover:bg-white hover:shadow-md transition-all duration-300 shadow-sm">
                    <div className="text-[8px] font-bold tracking-[0.15em] text-[#9a9a94] uppercase mb-1.5 font-mono">{p.label}</div>
                    <div className="text-[10px] leading-[1.4] text-[#6B6B6B]">{p.micro}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── PHASE 03 — OUTPUT ── */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }} variants={fadeUp}
              className="flex flex-col gap-6 md:gap-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[40px] font-bold text-[#141414]/[0.04] leading-none tracking-tighter select-none">03</span>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-[#C1A67B] uppercase">Phase 03</div>
                  <div className="text-xs tracking-wider text-[#6B6B6B] uppercase">03 - Export</div>
                </div>
              </div>
              <div className="text-2xl md:text-3xl leading-tight text-[#141414] font-semibold tracking-tight">A boardroom-ready Strategic Dossier.<br />White-labeled. One click.</div>

              {/* Intelligence Report Panel */}
              <div className="rounded-2xl bg-white border-0 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-8 space-y-6 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-sm bg-[#C1A67B] shadow-[0_0_8px_rgba(193,166,123,0.4)]" />
                  <span className="text-[10px] font-bold tracking-[0.22em] text-[#9a9a94] uppercase">Intelligence Report</span>
                </div>

                {reportPreviewCards.map((card, i) => (
                  <div key={i} className="rounded-xl border-0 bg-[#F6F1E7] p-5 hover:bg-[#f0f0ec] transition-all duration-300 shadow-sm">
                    <h4 className="text-sm font-semibold text-[#141414] mb-2">{card.title}</h4>
                    <p className="text-[11px] text-[#6B6B6B] leading-[1.5] mb-3">{card.micro}</p>
                    {card.bullets && (
                      <ul className="space-y-1.5">
                        {card.bullets.map((b, bi) => (
                          <li key={bi} className="text-[11px] text-[#6B6B6B] flex gap-2">
                            <span className="text-[#C1A67B]">•</span> {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Confidence Score — PROMINENT */}
                <div className="text-center pt-8 pb-4 border-t border-[#E7DED1]">
                  <div className="text-[8px] text-[#9a9a94] uppercase tracking-widest mb-3 font-mono">[CERTAINTY_INDEX]</div>
                  <div className="text-6xl md:text-7xl font-bold text-[#141414] leading-none mb-3 tracking-tight">94%</div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#C1A67B] uppercase tracking-wide py-2 px-5 border-0 rounded-full bg-[#C1A67B]/10">
                    High Confidence
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-center gap-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#9a9a94] border-0 rounded-full px-4 py-1.5 hover:text-[#6B6B6B] bg-[#F6F1E7] hover:bg-[#f0f0ec] transition-all cursor-pointer">PDF Export</span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#9a9a94] border-0 rounded-full px-4 py-1.5 hover:text-[#6B6B6B] bg-[#F6F1E7] hover:bg-[#f0f0ec] transition-all cursor-pointer">Share-Ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
          <Link
            href="/ingest"
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B4513] transition-colors hover:text-[#141414]"
          >
            [ Analyse Your First Ad - Free ]
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#6B6B6B]">
            No credit card. Results in under 3 minutes.
          </span>
        </div>
      </div>
    </section>
  );
}
