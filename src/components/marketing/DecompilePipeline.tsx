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
    <div className="rounded-2xl border border-[#E7DED1] bg-[#FBF7EF]/90 backdrop-blur px-4 py-3 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
      <div className="text-[10px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase mb-1">{title}</div>
      <div className="text-[13px] leading-[1.35] text-[#141414]/85">{micro}</div>
    </div>
  );
}

export default function DecompilePipeline({ id = 'how', stageImage, pills, reportPreviewCards }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const signals = pills.slice(0, 6);

  return (
    <section id={id} className="relative bg-[#F6F1E7] pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(20,20,20,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.024)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Section Header */}
          <div className="text-center w-full mx-auto mb-16 lg:mb-24 px-4 overflow-visible">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#C1A67B]">
                How It Works
              </span>
              <h2 className="text-4xl md:text-7xl font-semibold text-[#141414] tracking-tightest uppercase leading-[0.9]">
                Decode the Invisible<br />
                <span className="text-[#C1A67B]">Architecture of Persuasion.</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed font-medium mt-8">
              This isn't a surface-level semantic scan. The visual reasoning engine deconstructs the structural architecture of the creative—drilling into subtext to isolate the precise trigger mechanics, evidence anchors, and behavioral nudges being deployed.
            </p>
          </div>

          <div className="relative mt-8">
            {/* Connector lines (subtle; desktop only) */}
            <svg aria-hidden="true" className="hidden lg:block pointer-events-none absolute inset-0 w-full h-[600px] -mt-4" viewBox="0 0 1200 600" preserveAspectRatio="none">
              {/* left → middle */}
              <path d="M220 280 C 360 200, 420 160, 520 140" fill="none" stroke="rgba(20,20,20,0.07)" strokeWidth="1" />
              <path d="M220 280 C 360 280, 420 250, 520 230" fill="none" stroke="rgba(20,20,20,0.07)" strokeWidth="1" />
              <path d="M220 280 C 360 360, 420 340, 520 320" fill="none" stroke="rgba(20,20,20,0.07)" strokeWidth="1" />

              {/* middle → right */}
              <path d="M680 140 C 780 140, 860 180, 980 200" fill="none" stroke="rgba(20,20,20,0.07)" strokeWidth="1" />
              <path d="M680 230 C 780 230, 860 290, 980 310" fill="none" stroke="rgba(20,20,20,0.07)" strokeWidth="1" />
              <path d="M680 320 C 780 320, 860 390, 980 430" fill="none" stroke="rgba(20,20,20,0.07)" strokeWidth="1" />
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
              {/* INPUT */}
              <div className="relative">
                <div className="text-[10px] font-semibold tracking-[0.22em] text-[#6B6B6B] uppercase mb-3">Input</div>
                <div className="text-[18px] leading-[1.2] text-[#141414] font-medium tracking-tight mb-6">Single asset in.<br />Full reconstruction out.</div>

                <div className="relative group cursor-pointer w-[200px] md:w-[240px] mx-auto lg:mx-0 aspect-[4/5] rounded-[22px] overflow-hidden border border-[#E7DED1] shadow-[0_24px_70px_rgba(20,20,20,0.10)] bg-white">
                  {/* The underlying ad (revealed on hover) */}
                  <img src={stageImage.src} alt={stageImage.alt} className="absolute inset-0 w-full h-full object-cover" />
                  {/* The overlay graphic (default visible, fades out on hover) */}
                  <div className="absolute inset-0 bg-[#F6F1E7] transition-opacity duration-500 ease-in-out group-hover:opacity-0 flex items-center justify-center">
                    <img src="/images/examples/page_video_element.jpg" alt="Input Assets" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414]/45">Image • Video • YouTube</div>
              </div>

              {/* SIGNALS */}
              <div className="relative">
                <div className="text-[10px] font-semibold tracking-[0.22em] text-[#6B6B6B] uppercase mb-3 text-center lg:text-left">Signals</div>
                <div className="text-[18px] leading-[1.2] text-[#141414] font-medium tracking-tight mb-6 text-center lg:text-left">Mechanics extracted.<br />Evidence attached.</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {signals.map((p) => (
                    <SignalCard key={p.key} title={p.label} micro={p.micro} />
                  ))}
                </div>
              </div>

              {/* OUTPUT */}
              <div className="relative">
                <div className="text-[10px] font-semibold tracking-[0.22em] text-[#6B6B6B] uppercase mb-3">Output</div>
                <div className="text-[18px] leading-[1.2] text-[#141414] font-medium tracking-tight mb-6">A report you can<br />defend in a room.</div>

                <div className="rounded-[24px] border border-[#E7DED1] bg-[#FBF7EF]/90 backdrop-blur-xl shadow-[0_30px_90px_rgba(20,20,20,0.10)] p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#141414]" />
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase">Intelligence Report</span>
                  </div>

                  {reportPreviewCards.map((card, i) => (
                    <div key={i} className="rounded-xl border border-[#E7DED1] bg-white p-4">
                      <h4 className="text-[13px] font-semibold text-[#141414] mb-1">{card.title}</h4>
                      <p className="text-[12px] text-[#6B6B6B] leading-[1.4] mb-3">{card.micro}</p>

                      {card.bullets && (
                        <ul className="space-y-1">
                          {card.bullets.map((b, bi) => (
                            <li key={bi} className="text-[11px] text-[#141414]/80 flex gap-2">
                              <span className="text-[#141414]/30">•</span> {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <div className="pt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414]/45">PDF export • Share-ready reports</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
