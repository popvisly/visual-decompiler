'use client';

import { ChevronRight } from 'lucide-react';
import ResultsCard from '@/components/ResultsCard';

interface SchemaSegment {
    label: string;
    duration_hint: string;
    trigger_used: string;
    note: string;
}

interface Props {
    segments: SchemaSegment[];
}

const SEGMENT_COLORS = ['#141414', '#6B6B6B', '#B5A99A', '#C1A67B', '#E7DED1'];

export default function SchemaAutopsy({ segments }: Props) {
    return (
        <ResultsCard title="Schema Autopsy" variant="strategy" tooltip="A frame-by-frame structural extraction that reveals the 'Persuasion Blueprint' — the exact timing and sequence of hooks, social proof, and closing triggers.">
            <div className="space-y-8">
                <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">
                    Persuasion Sequence — Structural DNA
                </p>

                {/* Horizontal timeline bar */}
                <div>
                    <div className="flex gap-[2px] mb-3 rounded-lg overflow-hidden">
                        {segments.map((seg, idx) => (
                            <div
                                key={idx}
                                className="flex-1 h-6 relative group cursor-help"
                                style={{ backgroundColor: SEGMENT_COLORS[idx % SEGMENT_COLORS.length] }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/80 truncate px-2">
                                        {seg.label}
                                    </span>
                                </div>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#141414] text-white text-[9px] py-2 px-3 rounded-lg whitespace-nowrap z-50 shadow-lg">
                                    {seg.label}: {seg.duration_hint}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-[#6B6B6B]/50 uppercase tracking-widest px-1">
                        <span>Entry</span>
                        <span>Exit</span>
                    </div>
                </div>

                {/* Segment detail cards */}
                <div className="space-y-2">
                    {segments.map((seg, idx) => (
                        <div key={idx} className="group flex items-stretch gap-4">
                            {/* Node connector */}
                            <div className="flex flex-col items-center pt-5 w-8 shrink-0">
                                <div
                                    className="w-3 h-3 rounded-full border-2 group-hover:scale-125 transition-transform"
                                    style={{ borderColor: SEGMENT_COLORS[idx % SEGMENT_COLORS.length], backgroundColor: idx === 0 ? SEGMENT_COLORS[0] : 'transparent' }}
                                />
                                {idx < segments.length - 1 && (
                                    <div className="flex-1 w-[1.5px] bg-[#E7DED1] mt-1" />
                                )}
                            </div>

                            {/* Card */}
                            <div className="flex-1 p-5 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1] group-hover:border-[#141414]/20 transition-all mb-1">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[12px] font-bold text-[#141414] uppercase tracking-[0.1em]">{seg.label}</span>
                                        <span className="text-[9px] font-bold text-[#C1A67B] uppercase tracking-widest bg-[#C1A67B]/10 px-2.5 py-1 rounded-full">
                                            {seg.duration_hint}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-[#6B6B6B]/30 group-hover:text-[#141414] group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em]">
                                        Trigger: {seg.trigger_used}
                                    </p>
                                    <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                                        {seg.note}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ResultsCard>
    );
}
