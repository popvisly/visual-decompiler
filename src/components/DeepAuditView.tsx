'use client';

import { DeepAuditService, DeepAuditResult } from '@/lib/deep_audit';
import { Activity, Palette, Search, Info, History, Sparkles } from 'lucide-react';

interface DeepAuditViewProps {
    digest: any;
}

export default function DeepAuditView({ digest }: DeepAuditViewProps) {
    const audit = DeepAuditService.perform(digest);

    return (
        <div className="space-y-12">
            {/* 1. Visual Pacing Analysis */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.02)]">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-accent" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Visual Pacing Audit</h3>
                    </div>
                    <div className="px-4 py-2 bg-[#FBF7EF] rounded-full border border-[#E7DED1]">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
                            Cut Intensity: {audit.pacing.cutIntensity}%
                        </span>
                    </div>
                </div>

                <div className="flex items-end gap-1 h-24 mb-6">
                    {audit.pacing.timeline.map((item, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-accent/20 rounded-t-sm hover:bg-accent transition-all group relative cursor-help"
                            style={{ height: `${item.intensity}%` }}
                        >
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#141414] text-white text-[8px] py-1 px-2 rounded-sm whitespace-nowrap z-50">
                                {Math.round(item.t_ms / 1000)}s: {item.label}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-sm font-light text-[#6B6B6B] leading-relaxed italic border-l-2 border-accent/20 pl-6">
                    {audit.pacing.pacingNotes}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 2. Color Psychology */}
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.02)]">
                    <div className="flex items-center gap-3 mb-8">
                        <Palette className="w-5 h-5 text-accent" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Color Theory Logic</h3>
                    </div>

                    <div className="flex items-center gap-6 mb-8">
                        <div
                            className="w-20 h-20 rounded-3xl border border-[#E7DED1] shadow-inner"
                            style={{ backgroundColor: `#${audit.color.dominantHex.replace('#', '')}` }}
                        />
                        <div>
                            <p className="text-sm font-bold text-[#141414] uppercase tracking-tight mb-1">{audit.color.paletteTheme}</p>
                            <p className="text-[10px] text-[#6B6B6B] font-bold uppercase tracking-widest bg-[#FBF7EF] px-2 py-1 rounded-md border border-[#E7DED1] inline-block">
                                #{audit.color.dominantHex.replace('#', '')}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {audit.color.psychologicalTriggers.map(t => (
                                <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-accent border border-accent/20 px-3 py-1.5 rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <p className="text-[11px] text-[#6B6B6B] leading-relaxed font-bold tracking-wide uppercase opacity-60">
                            {audit.color.categoryNorms}
                        </p>
                    </div>
                </div>

                {/* 3. Semiotic Mapping */}
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.02)]">
                    <div className="flex items-center gap-3 mb-8">
                        <Search className="w-5 h-5 text-accent" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Semiotics & Subtext</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] mb-4">Cultural Icons</p>
                            <div className="flex flex-wrap gap-3">
                                {audit.semiotics.culturalIcons.map(icon => (
                                    <div key={icon} className="flex items-center gap-2 px-4 py-2 bg-[#FBF7EF] rounded-xl border border-[#E7DED1]">
                                        <Info className="w-3 h-3 text-accent/40" />
                                        <span className="text-[11px] font-light text-[#141414]">{icon}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] mb-3">Claim</p>
                            <p className="text-sm font-light text-[#141414] leading-relaxed italic border-l-2 border-accent/20 pl-6">
                                {audit.semiotics.meaningClaim}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Temporal Intelligence (Universal History) */}
            <div className="bg-[#141414] p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-5 [background-image:linear-gradient(#FBF7EF_1px,transparent_1px),linear-gradient(90deg,#FBF7EF_1px,transparent_1px)] [background-size:64px_64px]" />

                <div className="relative z-10 flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/3">
                        <div className="flex items-center gap-3 mb-6">
                            <History className="w-5 h-5 text-accent" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#FBF7EF]">Temporal Genealogy</h3>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-light text-[#FBF7EF] tracking-tightest uppercase leading-none">
                                {audit.temporal.aestheticYear}<br />
                                <span className="text-accent italic">Archetype</span>
                            </h2>
                            <p className="text-[10px] font-bold text-[#FBF7EF]/40 uppercase tracking-[0.2em]">{audit.temporal.eraArchetype}</p>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] space-y-6">
                            <p className="text-[9px] font-bold text-[#FBF7EF]/40 uppercase tracking-[0.4em]">Genealogy of Strategy</p>
                            <p className="text-sm font-light text-[#FBF7EF]/70 leading-relaxed italic border-l-2 border-accent/20 pl-6">
                                {audit.temporal.historicalGenealogy}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <p className="text-[9px] font-bold text-[#FBF7EF]/40 uppercase tracking-[0.4em]">Trend Revival Potential</p>
                                    <span className="text-xs font-bold text-accent">{audit.temporal.revivalPotential}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent animate-pulse"
                                        style={{ width: `${audit.temporal.revivalPotential}%` }}
                                    />
                                </div>
                            </div>

                            <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl flex items-center gap-4">
                                <Sparkles className="w-5 h-5 text-accent shrink-0" />
                                <p className="text-[11px] font-bold text-accent uppercase tracking-widest leading-normal">
                                    High cultural resonance window for "{audit.temporal.aestheticYear}" revivals in modern category clusters.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
