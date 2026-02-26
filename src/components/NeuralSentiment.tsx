'use client';

import { Brain, Sparkles } from 'lucide-react';
import ResultsCard from '@/components/ResultsCard';

interface EmotionalDriver {
    driver: string;
    intensity: number;
    source: string;
}

interface Props {
    drivers: EmotionalDriver[];
    verdict: string;
}

function getIntensityColor(intensity: number): string {
    if (intensity >= 80) return 'var(--accent, #C1A67B)';
    if (intensity >= 60) return '#141414';
    if (intensity >= 40) return '#6B6B6B';
    return '#B5A99A';
}

function getIntensityLabel(intensity: number): string {
    if (intensity >= 85) return 'Dominant';
    if (intensity >= 65) return 'Strong';
    if (intensity >= 45) return 'Moderate';
    return 'Subtle';
}

export default function NeuralSentiment({ drivers, verdict }: Props) {
    return (
        <ResultsCard title="Neural Sentiment Breakdown" variant="strategy">
            <div className="space-y-8">
                <div className="flex items-center gap-3 text-[#C1A67B]/60">
                    <Brain className="w-4 h-4" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Emotional Architecture</p>
                </div>

                {/* Strategic Verdict — Neural Processor Output */}
                <div className="p-6 bg-[#141414] rounded-2xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-20 translate-x-20 blur-[60px] pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-3 h-3 text-accent/60" />
                            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Neural Processor Output — Strategic Verdict</p>
                        </div>
                        <p className="text-[13px] font-light text-[#FBF7EF]/90 leading-relaxed italic">
                            &ldquo;{verdict}&rdquo;
                        </p>
                    </div>
                </div>

                {/* Driver cards */}
                <div className="grid grid-cols-1 gap-3">
                    {drivers.map((drv, idx) => (
                        <div key={idx} className="group p-6 bg-white rounded-2xl border border-[#E7DED1] hover:border-[#141414]/20 transition-all hover:shadow-[0_20px_60px_rgba(20,20,20,0.04)]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: getIntensityColor(drv.intensity) }}
                                    />
                                    <span className="text-[12px] font-bold text-[#141414] uppercase tracking-[0.15em]">{drv.driver}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#6B6B6B]/60">
                                        {getIntensityLabel(drv.intensity)}
                                    </span>
                                    <span className="text-lg font-bold" style={{ color: getIntensityColor(drv.intensity) }}>{drv.intensity}%</span>
                                </div>
                            </div>
                            <div className="h-[3px] bg-[#E7DED1]/50 rounded-full overflow-hidden mb-3">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${drv.intensity}%`, backgroundColor: getIntensityColor(drv.intensity) }}
                                />
                            </div>
                            <p className="text-[10px] text-[#6B6B6B] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tight">
                                Source: {drv.source}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </ResultsCard>
    );
}
