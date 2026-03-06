'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Pill, PreviewCard, StageImage } from '@/types/homepage';

type Props = {
  id?: string;
  stageImage: StageImage;
  pills: Pill[];
  reportPreviewCards: PreviewCard[];
};

function SignalCard({ title, micro }: { title: string; micro: string }) {
  return (
    <div className="group rounded-xl border border-[#E7DED1] bg-white/80 backdrop-blur px-5 py-4 shadow-[0_8px_30px_rgba(20,20,20,0.04)] hover:shadow-[0_16px_50px_rgba(20,20,20,0.08)] hover:-translate-y-[2px] transition-all duration-300 relative overflow-hidden">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C1A67B] rounded-l-xl" />
      <div className="text-[9px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase mb-1.5 font-mono">{title}</div>
      <div className="text-[12px] leading-[1.45] text-[#141414]/80">{micro}</div>
    </div>
  );
}

export default function DecompilePipeline({ id = 'how', stageImage, pills, reportPreviewCards }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const signals = pills.slice(0, 6);

  const fadeUp = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id={id} className="relative bg-[#F6F1E7] pt-20 md:pt-28 pb-32 md:pb-40 overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(20,20,20,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.024)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="relative"
        >
          {/* Section Header */}
          <div className="text-center w-full mx-auto mb-16 lg:mb-24 px-4 overflow-visible">
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

          <div className="relative mt-8">
            {/* Connector lines (desktop only) */}
            <svg aria-hidden="true" className="hidden lg:block pointer-events-none absolute inset-0 w-full h-full z-0" preserveAspectRatio="none" style={{ top: '80px' }}>
              {/* Input → Signals flow line */}
              <line x1="33%" y1="45%" x2="36%" y2="45%" stroke="#C1A67B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.35" />
              <polygon points="0,-4 8,0 0,4" fill="#C1A67B" opacity="0.35" transform="translate(36%, 45%) rotate(0)">
              </polygon>
              {/* Signals → Output flow line */}
              <line x1="66%" y1="45%" x2="69%" y2="45%" stroke="#C1A67B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.35" />
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start relative z-10">

              {/* ── PHASE 01 — INPUT ── */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }} variants={fadeUp}
                className="relative"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-[48px] md:text-[64px] font-bold text-[#141414]/[0.04] leading-none tracking-tighter select-none">01</span>
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.3em] text-[#C1A67B] uppercase">Phase 01</div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase">Input</div>
                  </div>
                </div>
                <div className="text-[17px] leading-[1.25] text-[#141414] font-medium tracking-tight mb-6">Single asset in.<br />Full reconstruction out.</div>

                {/* Image with dark frame + brackets */}
                <div className="relative w-[260px] md:w-[300px] mx-auto lg:mx-0 aspect-[4/5] rounded-2xl overflow-hidden bg-[#141414] shadow-[0_24px_70px_rgba(20,20,20,0.15)]">
                  <img src={stageImage.src} alt={stageImage.alt} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.92)' }} />

                  {/* Corner brackets */}
                  <div className="absolute top-2 left-2 w-5 h-5 border-l-[1.5px] border-t-[1.5px] border-[#C1A67B]/60 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-5 h-5 border-r-[1.5px] border-t-[1.5px] border-[#C1A67B]/60 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-5 h-5 border-l-[1.5px] border-b-[1.5px] border-[#C1A67B]/60 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-5 h-5 border-r-[1.5px] border-b-[1.5px] border-[#C1A67B]/60 pointer-events-none" />

                  {/* Scanning dot */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
                    <span className="text-[8px] font-mono text-white/60 uppercase tracking-wider">Scanning</span>
                  </div>
                </div>
              </motion.div>

              {/* ── PHASE 02 — SIGNALS ── */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }} variants={fadeUp}
                className="relative"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-[48px] md:text-[64px] font-bold text-[#141414]/[0.04] leading-none tracking-tighter select-none">02</span>
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.3em] text-[#C1A67B] uppercase">Phase 02</div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase">Signals</div>
                  </div>
                </div>
                <div className="text-[17px] leading-[1.25] text-[#141414] font-medium tracking-tight mb-6 text-left">Mechanics extracted.<br />Evidence attached.</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {signals.map((p) => (
                    <SignalCard key={p.key} title={p.label} micro={p.micro} />
                  ))}
                </div>
              </motion.div>

              {/* ── PHASE 03 — OUTPUT ── */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }} variants={fadeUp}
                className="relative"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-[48px] md:text-[64px] font-bold text-[#141414]/[0.04] leading-none tracking-tighter select-none">03</span>
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.3em] text-[#C1A67B] uppercase">Phase 03</div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/40 uppercase">Output</div>
                  </div>
                </div>
                <div className="text-[17px] leading-[1.25] text-[#141414] font-medium tracking-tight mb-6">A report you can<br />defend in a room.</div>

                {/* Dark Intelligence Report Panel */}
                <div className="rounded-2xl bg-[#141414] border border-[#333] shadow-[0_30px_90px_rgba(20,20,20,0.25)] p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    <span className="text-[10px] font-bold tracking-[0.22em] text-white/50 uppercase">Intelligence Report</span>
                  </div>

                  {reportPreviewCards.map((card, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition-colors">
                      <h4 className="text-[13px] font-semibold text-white mb-1">{card.title}</h4>
                      <p className="text-[11px] text-white/50 leading-[1.4] mb-3">{card.micro}</p>

                      {card.bullets && (
                        <ul className="space-y-1">
                          {card.bullets.map((b, bi) => (
                            <li key={bi} className="text-[11px] text-white/70 flex gap-2">
                              <span className="text-[#C1A67B]">•</span> {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <div className="pt-2 flex items-center justify-center gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/25 border border-white/10 rounded-full px-3 py-1">PDF Export</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/25 border border-white/10 rounded-full px-3 py-1">Share-Ready</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
