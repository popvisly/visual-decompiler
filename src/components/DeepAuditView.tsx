'use client';

import { DeepAuditService, DeepAuditResult } from '@/lib/deep_audit';
import { Activity, Palette, Search, Info, History, Sparkles, Zap, ChevronRight } from 'lucide-react';
import ResultsCard from '@/components/ResultsCard';

interface DeepAuditViewProps {
    digest: any;
}

export default function DeepAuditView({ digest }: DeepAuditViewProps) {
    const audit = DeepAuditService.perform(digest);

    return (
        <div className="space-y-12">
            {/* 1. Visual Pacing Analysis */}
            <ResultsCard title="Visual Pacing Audit" variant="gauge">
                <div className="flex items-center justify-between mb-8">
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
            </ResultsCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 2. Color Psychology */}
                <ResultsCard title="Color Theory Logic" variant="gauge">
                    <div className="flex items-center gap-6 mb-6">
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

                    {/* Palette swatches (when available) */}
                    {Array.isArray(digest?.extraction?.palette_hex) && digest.extraction.palette_hex.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {digest.extraction.palette_hex.slice(0, 6).map((hex: string) => {
                                const clean = String(hex).replace(/^#/, '');
                                return (
                                    <div key={clean} className="flex items-center gap-2 bg-[#FBF7EF] border border-[#E7DED1] rounded-xl px-3 py-2">
                                        <div
                                            className="w-4 h-4 rounded-full border border-[#E7DED1]"
                                            style={{ backgroundColor: `#${clean}` }}
                                        />
                                        <span className="text-[10px] font-mono text-[#6B6B6B]">#{clean}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

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
                </ResultsCard>

                {/* 3. Semiotic Mapping */}
                <ResultsCard title="Semiotics & Subtext" variant="strategy">
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
                </ResultsCard>
            </div>

            {/* 4. Temporal Intelligence (Universal History) */}
            <ResultsCard title="Temporal Genealogy" variant="strategy" accentBorder>
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/3">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-light text-[#141414] tracking-tightest uppercase leading-none">
                                {audit.temporal.aestheticYear}<br />
                                <span className="text-accent italic">Archetype</span>
                            </h2>
                            <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em]">{audit.temporal.eraArchetype}</p>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="p-8 bg-[#FBF7EF] border border-[#E7DED1] rounded-[2rem] space-y-6">
                            <p className="text-[9px] font-bold text-[#6B6B6B]/40 uppercase tracking-[0.4em]">Genealogy of Strategy</p>
                            <p className="text-sm font-light text-[#141414] leading-relaxed italic border-l-2 border-accent/40 pl-6">
                                {audit.temporal.historicalGenealogy}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <p className="text-[9px] font-bold text-[#6B6B6B]/40 uppercase tracking-[0.4em]">Trend Revival Potential</p>
                                    <span className="text-xs font-bold text-accent">{audit.temporal.revivalPotential}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#FBF7EF] border border-[#E7DED1] rounded-full overflow-hidden">
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
            </ResultsCard>

            {/* 5. Trend Intelligence (Market Adoption) */}
            <ResultsCard title="Trend Intelligence" variant="gauge">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-[40%] space-y-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Adoption: {audit.trend.adoptionTier}</span>
                            </div>

                            <h4 className="text-3xl font-light text-[#141414] leading-tight uppercase tracking-tight">
                                {audit.trend.adoptionTier === 'Edgy' ? 'Early Signal Detection' : audit.trend.adoptionTier === 'Trendy' ? 'Peak Market Resonance' : 'Mass Market Saturation'}
                            </h4>

                            <p className="text-sm font-light text-[#6B6B6B] leading-relaxed italic border-l-2 border-accent/20 pl-6">
                                Predicated resonance window of <span className="font-bold text-[#141414] not-italic">{audit.trend.resonanceWindow}</span>. Creative velocity suggests high probability of categorical migration.
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-[60%] flex flex-col justify-between pt-4">
                        <div className="relative h-40 flex items-end justify-between px-12 pb-6 border-b border-[#E7DED1]">
                            {/* Curve SVG */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 px-8" viewBox="0 0 200 100" preserveAspectRatio="none">
                                <path
                                    d="M20,80 C50,20 100,20 180,80"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                    className="text-accent"
                                />
                                {audit.trend.adoptionTier === 'Edgy' && <circle cx="45" cy="45" r="4" className="fill-accent animate-pulse" />}
                                {audit.trend.adoptionTier === 'Trendy' && <circle cx="100" cy="25" r="4" className="fill-accent animate-pulse" />}
                                {audit.trend.adoptionTier === 'Mainstream' && <circle cx="155" cy="65" r="4" className="fill-accent animate-pulse" />}
                            </svg>

                            <div className="flex flex-col items-center gap-4">
                                <div className={`w-1 bg-accent/10 h-12 rounded-t-full transition-all duration-700 ${audit.trend.adoptionTier === 'Edgy' ? 'h-16 bg-accent opacity-100' : 'opacity-40'}`} />
                                <span className={`text-[9px] font-bold tracking-widest ${audit.trend.adoptionTier === 'Edgy' ? 'text-accent' : 'opacity-30'}`}>EDGY</span>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className={`w-1 bg-accent/10 h-12 rounded-t-full transition-all duration-700 ${audit.trend.adoptionTier === 'Trendy' ? 'h-24 bg-accent opacity-100' : 'opacity-40'}`} />
                                <span className={`text-[9px] font-bold tracking-widest ${audit.trend.adoptionTier === 'Trendy' ? 'text-accent' : 'opacity-30'}`}>TRENDY</span>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className={`w-1 bg-accent/10 h-12 rounded-t-full transition-all duration-700 ${audit.trend.adoptionTier === 'Mainstream' ? 'h-16 bg-accent opacity-100' : 'opacity-40'}`} />
                                <span className={`text-[9px] font-bold tracking-widest ${audit.trend.adoptionTier === 'Mainstream' ? 'text-accent' : 'opacity-30'}`}>MAINSTREAM</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-12 pt-10">
                            <div>
                                <div className="flex justify-between items-end mb-3">
                                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em]">Creative Velocity</p>
                                    <span className="text-xs font-bold text-accent">{audit.trend.momentum}%</span>
                                </div>
                                <div className="h-1 w-full bg-[#FBF7EF] border border-[#E7DED1] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent"
                                        style={{ width: `${audit.trend.momentum}%` }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <button className="flex items-center gap-2 group/btn">
                                    <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest group-hover/btn:text-accent transition-colors">Forecasting Logic</span>
                                    <ChevronRight className="w-3 h-3 text-[#6B6B6B] group-hover/btn:text-accent group-hover/btn:translate-x-0.5 transition-all" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ResultsCard>
        </div>
    );
}
