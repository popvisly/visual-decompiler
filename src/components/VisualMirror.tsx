'use client';

import React from 'react';
import { Camera, ArrowRight, Sparkles, Zap } from 'lucide-react';

interface VisualMirrorProps {
    competitorImage: string;
    competitorLabel: string;
    directiveTitle: string;
    directiveText: string;
    rationale: string;
}

export default function VisualMirror({
    competitorImage,
    competitorLabel,
    directiveTitle,
    directiveText,
    rationale,
}: VisualMirrorProps) {
    return (
        <div className="group relative bg-white/50 backdrop-blur-xl border border-[#E7DED1] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-black/5">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

            <div className="flex flex-col lg:flex-row h-full">
                {/* Competitor Reality */}
                <div className="relative flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#E7DED1]">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-[#141414] flex items-center justify-center text-[#FBF7EF]">
                            <Camera className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Competitor Reality</span>
                    </div>

                    <div className="aspect-video rounded-3xl overflow-hidden border border-[#E7DED1] bg-black/5 mb-8 group-hover:scale-[1.02] transition-transform duration-700">
                        <img
                            src={competitorImage}
                            alt={competitorLabel}
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[11px] font-bold text-[#141414] uppercase tracking-widest">{competitorLabel}</h4>
                        <p className="text-sm text-[#6B6B6B] leading-relaxed italic">
                            Analyzing existing aesthetic patterns and creative saturation.
                        </p>
                    </div>
                </div>

                {/* Strategic Directive (The Gap) */}
                <div className="flex-1 p-8 lg:p-12 bg-gradient-to-br from-[#141414] to-[#2A2A2A] text-[#FBF7EF] relative overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Strategic Directive</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                <Zap className="w-3 h-3 text-accent" />
                                <span className="text-[8px] font-bold uppercase tracking-widest">High IQ Impact</span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-2xl font-light tracking-tight uppercase mb-4 leading-tight">
                                {directiveTitle}
                            </h3>
                            <div className="h-0.5 w-12 bg-accent mb-6" />
                            <p className="text-lg font-light text-[#FBF7EF]/80 leading-relaxed">
                                {directiveText}
                            </p>
                        </div>

                        <div className="mt-auto pt-10 border-t border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <ArrowRight className="w-4 h-4 text-accent" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Strategic Rationale</span>
                            </div>
                            <p className="text-xs text-[#FBF7EF]/50 leading-relaxed uppercase tracking-wider font-medium">
                                {rationale}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
