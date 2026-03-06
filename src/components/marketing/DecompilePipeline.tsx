'use client';

import { motion, useReducedMotion } from 'framer-motion';
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
                How It Works
              </span>
              <h2 className="text-4xl md:text-7xl font-semibold text-[#141414] tracking-tight uppercase leading-[0.9]">
                Decode the Invisible<br />
                <span className="text-[#C1A67B]">Architecture of Persuasion.</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed font-medium mt-8">
              This isn't a surface-level semantic scan. The visual reasoning engine deconstructs the structural architecture of the creative—drilling into subtext to isolate the precise trigger mechanics, evidence anchors, and behavioral nudges being deployed.
            </p>
          </div>
        </motion.div>

        {/* ─── Unified Dark Deconstruction Map ─── */}
        <div className="w-full max-w-[1440px] mx-auto rounded-[32px] overflow-hidden border border-[rgba(0,240,255,0.12)] shadow-[0_30px_90px_rgba(0,0,0,0.4)] bg-[#0D0D0D] p-6 lg:p-10 relative">
          {/* Forensic Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 w-full flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-10">
            {/* ── PHASE 01 — INPUT ── */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }} variants={fadeUp}
              className="flex flex-col gap-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[40px] font-bold text-white/[0.04] leading-none tracking-tighter select-none">01</span>
                <div>
                  <div className="text-[9px] font-bold tracking-[0.3em] text-[#00F0FF]/60 uppercase">Phase 01</div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Input</div>
                </div>
              </div>
              <div className="text-[15px] leading-[1.25] text-white/80 font-medium tracking-tight">Single asset in.<br />Full reconstruction out.</div>

              {/* Watch Image — Dark Frame */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#141414] border border-[#00F0FF]/15 shadow-[0_0_30px_rgba(0,240,255,0.04)]">
                <img src={stageImage.src} alt={stageImage.alt} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.85) contrast(1.05)' }} />

                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-5 h-5 border-l-[1.5px] border-t-[1.5px] border-[#00F0FF]/40 pointer-events-none" />
                <div className="absolute top-2 right-2 w-5 h-5 border-r-[1.5px] border-t-[1.5px] border-[#00F0FF]/40 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-l-[1.5px] border-b-[1.5px] border-[#00F0FF]/40 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-r-[1.5px] border-b-[1.5px] border-[#00F0FF]/40 pointer-events-none" />

                {/* Header bar */}
                <div className="absolute top-0 left-0 right-0 bg-[#00F0FF]/5 border-b border-[#00F0FF]/10 text-[#00F0FF] text-[8px] font-bold tracking-[0.2em] px-3 py-2 uppercase flex justify-between items-center z-10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
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
              className="flex flex-col gap-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[40px] font-bold text-white/[0.04] leading-none tracking-tighter select-none">02</span>
                <div>
                  <div className="text-[9px] font-bold tracking-[0.3em] text-[#00F0FF]/60 uppercase">Phase 02</div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Signals</div>
                </div>
              </div>
              <div className="text-[15px] leading-[1.25] text-white/80 font-medium tracking-tight">Mechanics extracted.<br />Evidence attached.</div>

              {/* Palette Logic — Watch: Navy, Rose Gold, Amber */}
              <div className="bg-[#141414]/80 backdrop-blur-md rounded-xl border border-white/5 p-4 hover:border-[#00F0FF]/20 transition-colors">
                <div className="text-[9px] font-bold tracking-[0.2em] text-[#00F0FF]/60 uppercase mb-2">Palette Logic</div>
                <div className="flex w-full h-5 rounded overflow-hidden mb-2 border border-white/5">
                  <div className="w-[30%] bg-[#1B2A4A]" />
                  <div className="w-[25%] bg-[#B8860B]" />
                  <div className="w-[20%] bg-[#C9A96E]" />
                  <div className="w-[15%] bg-[#2C3E50]" />
                  <div className="w-[10%] bg-[#F5E6CC]" />
                </div>
                <p className="text-[10px] text-white/50 leading-relaxed">Deep navy and rose-gold tones encode authority, precision, and legacy-tier positioning.</p>
              </div>

              {/* Trigger Mechanic */}
              <div className="bg-[#141414]/80 backdrop-blur-md rounded-xl border border-[#00F0FF]/15 p-4 shadow-[0_0_15px_rgba(0,240,255,0.04)]">
                <div className="text-[9px] font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-2">Trigger Mechanic</div>
                <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/15 rounded px-3 py-1.5 text-[11px] text-white font-medium mb-2">
                  Craftsmanship Authority
                </div>
                <p className="text-[10px] text-white/50 leading-relaxed">Macro-detail of horological complexity signals artisanal mastery as proof of value.</p>
              </div>

              {/* Semiotics */}
              <div className="bg-[#141414]/80 backdrop-blur-md rounded-xl border border-white/5 p-4 hover:border-[#00F0FF]/20 transition-colors">
                <div className="text-[9px] font-bold tracking-[0.2em] text-[#00F0FF]/60 uppercase mb-2">Semiotics</div>
                <p className="text-[10px] text-white/80 leading-relaxed border-l-2 border-[#00F0FF]/30 pl-3 mb-2">
                  <strong>Precision as Legacy.</strong><br />
                  <span className="text-white/40">Diamond indices and sapphire crystal map to generational permanence.</span>
                </p>
                <p className="text-[10px] text-white/80 leading-relaxed border-l-2 border-[#00F0FF]/30 pl-3">
                  <strong>Material Fidelity.</strong><br />
                  <span className="text-white/40">Rose gold bezel + deep navy dial encode exclusionary pricing without stating it.</span>
                </p>
              </div>

              {/* Signal Cards Grid */}
              <div className="grid grid-cols-2 gap-2">
                {signals.slice(0, 4).map((p) => (
                  <div key={p.key} className="bg-[#141414]/60 rounded-lg border border-white/5 p-3 hover:border-[#00F0FF]/15 transition-colors">
                    <div className="text-[8px] font-bold tracking-[0.15em] text-[#00F0FF]/40 uppercase mb-1 font-mono">{p.label}</div>
                    <div className="text-[10px] leading-[1.4] text-white/50">{p.micro}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── PHASE 03 — OUTPUT ── */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }} variants={fadeUp}
              className="flex flex-col gap-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[40px] font-bold text-white/[0.04] leading-none tracking-tighter select-none">03</span>
                <div>
                  <div className="text-[9px] font-bold tracking-[0.3em] text-[#00F0FF]/60 uppercase">Phase 03</div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Output</div>
                </div>
              </div>
              <div className="text-[15px] leading-[1.25] text-white/80 font-medium tracking-tight">A report you can<br />defend in a room.</div>

              {/* Intelligence Report Panel */}
              <div className="rounded-2xl bg-[#0A0A0A] border border-[#00F0FF]/25 shadow-[0_0_40px_rgba(0,240,255,0.06)] p-6 space-y-4 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-sm bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
                  <span className="text-[10px] font-bold tracking-[0.22em] text-white/50 uppercase">Intelligence Report</span>
                </div>

                {reportPreviewCards.map((card, i) => (
                  <div key={i} className="rounded-xl border border-white/8 bg-white/[0.02] p-4 hover:bg-white/[0.05] transition-colors">
                    <h4 className="text-[12px] font-semibold text-white mb-1">{card.title}</h4>
                    <p className="text-[10px] text-white/40 leading-[1.4] mb-2">{card.micro}</p>
                    {card.bullets && (
                      <ul className="space-y-1">
                        {card.bullets.map((b, bi) => (
                          <li key={bi} className="text-[10px] text-white/60 flex gap-2">
                            <span className="text-[#00F0FF]/60">•</span> {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Confidence Score */}
                <div className="text-center pt-4 border-t border-white/5">
                  <div className="text-[8px] text-[#00F0FF]/50 uppercase tracking-widest mb-1 font-mono">[CERTAINTY_INDEX]</div>
                  <div className="text-[36px] tracking-tight font-light text-white leading-none">94%</div>
                  <div className="text-[9px] text-[#00F0FF] mt-2 uppercase tracking-widest py-1 border border-[#00F0FF]/25 rounded bg-[#00F0FF]/5 w-fit mx-auto px-3">High Confidence</div>
                </div>

                <div className="pt-3 flex items-center justify-center gap-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 border border-white/8 rounded-full px-3 py-1">PDF Export</span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 border border-white/8 rounded-full px-3 py-1">Share-Ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
