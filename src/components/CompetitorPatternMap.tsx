'use client';

import React from 'react';
import { Target, Zap, Layers, RefreshCw } from 'lucide-react';

type StrategicShift = {
    target_posture: string;
    moves: string[];
};

type CompetitiveIntel = {
    nearest_neighbor_id?: string;
    similarity_score: number;
    pattern_overlaps: string[];
    differentiation_levers: string[];
    strategic_shift: StrategicShift;
};

type Props = {
    intel: CompetitiveIntel;
};

export default function CompetitorPatternMap({ intel }: Props) {
    return (
        <div className="space-y-10">
            {/* Similarity Score & Pattern DNA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-accent" />
                            <h4 className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.2em]">Nearest-Neighbor DNA</h4>
                        </div>
                        <span className="text-[10px] font-mono text-[#6B6B6B]">Scan Confidence: {(intel.similarity_score * 0.95).toFixed(0)}%</span>
                    </div>

                    <div className="relative h-24 bg-[#FBF7EF] rounded-3xl border border-[#E7DED1] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-around opacity-10">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="w-px h-full bg-[#141414] rotate-12" />
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-1 z-10">
                            <span className="text-4xl font-light text-[#141414] tracking-tighter">
                                {intel.similarity_score}%
                            </span>
                            <span className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">Competitive Overlap</span>
                        </div>
                    </div>

                    <div className="p-5 bg-white border border-[#E7DED1] rounded-2xl shadow-sm">
                        <p className="text-[9px] font-bold text-[#141414]/40 uppercase tracking-[0.15em] mb-3">Pattern Overlaps:</p>
                        <div className="flex flex-wrap gap-2">
                            {intel.pattern_overlaps.map((p, i) => (
                                <span key={i} className="px-3 py-1 rounded-lg bg-[#FBF7EF] text-[10px] text-[#141414] border border-[#E7DED1]">
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-accent" />
                        <h4 className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.2em]">Differentiation Levers</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {intel.differentiation_levers.map((lever, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white border border-[#E7DED1] rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                <div className="w-6 h-6 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                </div>
                                <p className="text-[12px] text-[#141414] font-medium tracking-tight">
                                    {lever}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Strategic Shift Roadmap */}
            <div className="pt-10 border-t border-[#E7DED1]">
                <div className="p-8 bg-[#141414] rounded-[2.5rem] relative overflow-hidden">
                    {/* Background Visual Logic */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                        <RefreshCw className="w-32 h-32 text-white" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div>
                            <p className="text-accent text-[9px] font-bold uppercase tracking-[0.3em] mb-2">Strategic Shift Roadmap</p>
                            <h3 className="text-[#FBF7EF] text-2xl font-light tracking-tight italic">
                                "{intel.strategic_shift.target_posture}"
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {intel.strategic_shift.moves.map((move, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-accent text-[#141414] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                        {i + 1}
                                    </div>
                                    <p className="text-white/80 text-[13px] leading-relaxed tracking-tight">
                                        {move}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                            <Target className="w-4 h-4 text-accent" />
                            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Objective: Break away from generic product-first framing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
