'use client';

import { DeepAuditService, DeepAuditResult, ColorSwatch } from '@/lib/deep_audit';
import { Activity, Palette, Search, Info, History, Sparkles, Zap, ChevronRight, Clock, Layers } from 'lucide-react';
import ResultsCard from '@/components/ResultsCard';

interface DeepAuditViewProps {
    digest: any;
}

/* ── Helper: readable duration ── */
function formatDuration(ms: number): string {
    if (ms <= 0) return '—';
    const s = Math.round(ms / 1000);
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
}

/* ── Helper: text color for contrast on swatch ── */
function textColorForHex(hex: string): string {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
    return luminance > 160 ? '#141414' : '#FFFFFF';
}

export default function DeepAuditView({ digest }: DeepAuditViewProps) {
    const audit = DeepAuditService.perform(digest);

    return (
        <div className="space-y-10">
            {/* ═══════════════════════════════════════════════════
                1. VISUAL PACING AUDIT
            ═══════════════════════════════════════════════════ */}
            <ResultsCard title="Visual Pacing Audit" variant="gauge">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="px-4 py-2 bg-[#141414] rounded-full">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FBF7EF]">
                            Cut Intensity: {audit.pacing.cutIntensity}%
                        </span>
                    </div>
                    <div className="px-3 py-1.5 bg-[#FBF7EF] rounded-full border border-[#E7DED1]">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
                            Rhythm: {audit.pacing.rhythmicSync}
                        </span>
                    </div>
                    {audit.pacing.totalDurationMs > 0 && (
                        <div className="px-3 py-1.5 bg-[#FBF7EF] rounded-full border border-[#E7DED1] flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#6B6B6B]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
                                {formatDuration(audit.pacing.totalDurationMs)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Timeline bars — gradient from amber (low) to dark (high) */}
                <div className="flex items-end gap-1 h-28 mb-3">
                    {audit.pacing.timeline.map((item, i) => {
                        const pct = item.intensity / 100;
                        // Interpolate from warm amber (#D4A574) to dark charcoal (#1A1A1A)
                        const r = Math.round(212 - pct * 186);
                        const g = Math.round(165 - pct * 139);
                        const b = Math.round(116 - pct * 90);
                        return (
                            <div
                                key={i}
                                className="flex-1 rounded-t-lg hover:scale-105 transition-all group relative cursor-help"
                                style={{
                                    height: `${Math.max(20, item.intensity)}%`,
                                    backgroundColor: `rgb(${r}, ${g}, ${b})`,
                                }}
                            >
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#141414] text-white text-[9px] py-1.5 px-3 rounded-lg whitespace-nowrap z-50 shadow-lg">
                                    <span className="font-bold">{item.label}</span>
                                    {audit.pacing.totalDurationMs > 0 && (
                                        <span className="text-white/50 ml-1">@ {Math.round(item.t_ms / 1000)}s</span>
                                    )}
                                    <span className="text-white/50 ml-1">({item.intensity}%)</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Timeline labels */}
                <div className="flex justify-between text-[8px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B]/50 mb-8">
                    <span>Hook</span>
                    <span>Build</span>
                    <span>Peak</span>
                    <span>CTA</span>
                </div>

                <p className="text-sm font-light text-[#141414] leading-relaxed italic border-l-[3px] border-[#141414] pl-6">
                    {audit.pacing.pacingNotes}
                </p>
            </ResultsCard>

            {/* ═══════════════════════════════════════════════════
                2 & 3. COLOR THEORY + SEMIOTICS (side by side)
            ═══════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 2. Color Psychology */}
                <ResultsCard title="Color Theory Logic" variant="gauge">
                    {/* Color bar — full palette rendered as a continuous strip */}
                    <div className="flex rounded-2xl overflow-hidden h-16 mb-6 border border-[#E7DED1] shadow-inner">
                        {audit.color.swatches.map((swatch, i) => (
                            <div
                                key={i}
                                className="flex-1 flex items-center justify-center group relative cursor-help transition-all hover:flex-[2]"
                                style={{ backgroundColor: `#${swatch.hex}` }}
                            >
                                <span
                                    className="text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ color: textColorForHex(swatch.hex) }}
                                >
                                    #{swatch.hex}
                                </span>
                                {/* Hover tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#141414] text-white text-[9px] py-2 px-3 rounded-lg whitespace-nowrap z-50 shadow-lg">
                                    <span className="font-bold">{swatch.label}</span>
                                    <br />
                                    <span className="text-white/60">{swatch.psychologicalEffect}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Harmony badge */}
                    <div className="flex items-center gap-2 mb-5">
                        <Layers className="w-3.5 h-3.5 text-[#6B6B6B]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#141414]">
                            {audit.color.harmonyType} Harmony
                        </span>
                    </div>

                    {/* Swatch pills — each with psychological reasoning */}
                    <div className="space-y-2 mb-6">
                        {audit.color.swatches.map((swatch, i) => (
                            <div key={i} className="flex items-center gap-3 bg-[#FBF7EF] border border-[#E7DED1] rounded-xl px-3 py-2.5">
                                <div
                                    className="w-8 h-8 rounded-lg border border-[#E7DED1] shadow-sm shrink-0"
                                    style={{ backgroundColor: `#${swatch.hex}` }}
                                />
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-bold text-[#141414] uppercase tracking-wide">{swatch.label}</span>
                                        <span className="text-[8px] font-mono text-[#6B6B6B]">#{swatch.hex}</span>
                                    </div>
                                    <span className="text-[10px] text-[#6B6B6B] leading-tight">{swatch.psychologicalEffect}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Psychological triggers */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {audit.color.psychologicalTriggers.map(t => (
                                <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-[#141414] border border-[#141414]/20 bg-[#141414]/5 px-3 py-1.5 rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                            {audit.color.categoryNorms}
                        </p>
                    </div>
                </ResultsCard>

                {/* 3. Semiotic Mapping */}
                <ResultsCard title="Semiotics & Subtext" variant="strategy">
                    <div className="space-y-6">
                        <div>
                            <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em] mb-4">Cultural Icons</p>
                            <div className="flex flex-wrap gap-2">
                                {audit.semiotics.culturalIcons.map(icon => (
                                    <div key={icon} className="flex items-center gap-2 px-4 py-2.5 bg-[#141414]/5 rounded-xl border border-[#141414]/10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                                        <span className="text-[11px] font-medium text-[#141414]">{icon}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em] mb-3">Meaning Claim</p>
                            <p className="text-sm font-light text-[#141414] leading-relaxed italic border-l-[3px] border-[#141414] pl-6">
                                {audit.semiotics.meaningClaim}
                            </p>
                        </div>

                        {audit.semiotics.subtextualSignals.length > 0 && (
                            <div>
                                <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em] mb-3">Subtextual Signals</p>
                                <div className="flex flex-wrap gap-2">
                                    {audit.semiotics.subtextualSignals.map((s, i) => (
                                        <span key={i} className="text-[10px] text-[#6B6B6B] bg-[#FBF7EF] border border-[#E7DED1] px-3 py-1.5 rounded-lg">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </ResultsCard>
            </div>

            {/* ═══════════════════════════════════════════════════
                4. TEMPORAL GENEALOGY
            ═══════════════════════════════════════════════════ */}
            <ResultsCard title="Temporal Genealogy" variant="strategy">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-1/3">
                        <div className="space-y-4">
                            <div>
                                <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] mb-3">Aesthetic Era</p>
                                <h2 className="text-4xl font-bold text-[#141414] tracking-tight leading-none mb-2">
                                    {audit.temporal.aestheticYear}
                                </h2>
                                <div className="inline-flex px-3 py-1.5 bg-[#141414] rounded-full">
                                    <span className="text-[9px] font-bold text-[#FBF7EF] uppercase tracking-[0.15em]">{audit.temporal.eraArchetype}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl space-y-4">
                            <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em]">Genealogy of Strategy</p>
                            <p className="text-sm font-light text-[#141414] leading-relaxed italic border-l-[3px] border-[#141414]/30 pl-5">
                                {audit.temporal.historicalGenealogy}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-end mb-3">
                                    <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em]">Revival Potential</p>
                                    <span className="text-sm font-bold text-[#141414]">{audit.temporal.revivalPotential}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#E7DED1] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#141414] rounded-full transition-all duration-1000"
                                        style={{ width: `${audit.temporal.revivalPotential}%` }}
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-[#141414] rounded-2xl flex items-start gap-3">
                                <Sparkles className="w-4 h-4 text-[#FBF7EF]/60 shrink-0 mt-0.5" />
                                <p className="text-[10px] font-medium text-[#FBF7EF]/80 leading-relaxed">
                                    High cultural resonance window for &ldquo;{audit.temporal.aestheticYear}&rdquo; revivals in modern category clusters.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ResultsCard>

            {/* ═══════════════════════════════════════════════════
                5. TREND INTELLIGENCE
            ═══════════════════════════════════════════════════ */}
            <ResultsCard title="Trend Intelligence" variant="gauge">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-[40%] space-y-8">
                        <div className="space-y-5">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#141414] rounded-full">
                                <span className="w-2 h-2 rounded-full bg-[#FBF7EF] animate-pulse" />
                                <span className="text-[10px] font-bold text-[#FBF7EF] uppercase tracking-[0.15em]">Adoption: {audit.trend.adoptionTier}</span>
                            </div>

                            <h4 className="text-2xl font-bold text-[#141414] leading-tight tracking-tight">
                                {audit.trend.adoptionTier === 'Edgy' ? 'Early Signal Detection' : audit.trend.adoptionTier === 'Trendy' ? 'Peak Market Resonance' : 'Mass Market Saturation'}
                            </h4>

                            <p className="text-sm font-light text-[#6B6B6B] leading-relaxed border-l-[3px] border-[#141414] pl-5">
                                Predicated resonance window of <span className="font-bold text-[#141414]">{audit.trend.resonanceWindow}</span>. Creative velocity suggests high probability of categorical migration.
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-[60%] flex flex-col justify-between pt-2">
                        {/* Adoption curve */}
                        <div className="relative h-40 flex items-end justify-between px-8 pb-6 border-b border-[#E7DED1]">
                            {/* Curve SVG */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none px-8" viewBox="0 0 200 100" preserveAspectRatio="none">
                                <path
                                    d="M20,80 C50,20 100,20 180,80"
                                    fill="none"
                                    stroke="#141414"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                    opacity="0.15"
                                />
                                {audit.trend.adoptionTier === 'Edgy' && <circle cx="45" cy="45" r="5" fill="#141414" />}
                                {audit.trend.adoptionTier === 'Trendy' && <circle cx="100" cy="25" r="5" fill="#141414" />}
                                {audit.trend.adoptionTier === 'Mainstream' && <circle cx="155" cy="65" r="5" fill="#141414" />}
                            </svg>

                            {/* Adoption columns */}
                            {(['Edgy', 'Trendy', 'Mainstream'] as const).map(tier => {
                                const isActive = audit.trend.adoptionTier === tier;
                                return (
                                    <div key={tier} className="flex flex-col items-center gap-3 z-10">
                                        <div
                                            className="w-2 rounded-t-full transition-all duration-700"
                                            style={{
                                                height: isActive ? (tier === 'Trendy' ? '96px' : '64px') : '48px',
                                                backgroundColor: isActive ? '#141414' : '#E7DED1',
                                            }}
                                        />
                                        <span className={`text-[9px] font-bold tracking-widest ${isActive ? 'text-[#141414]' : 'text-[#6B6B6B]/40'}`}>
                                            {tier.toUpperCase()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Metrics row */}
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div>
                                <div className="flex justify-between items-end mb-3">
                                    <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em]">Creative Velocity</p>
                                    <span className="text-sm font-bold text-[#141414]">{audit.trend.momentum}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#E7DED1] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#141414] rounded-full transition-all duration-1000"
                                        style={{ width: `${audit.trend.momentum}%` }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <button className="flex items-center gap-2 group/btn px-4 py-2 rounded-full border border-[#E7DED1] hover:border-[#141414] hover:bg-[#141414] transition-all">
                                    <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest group-hover/btn:text-white transition-colors">Forecasting</span>
                                    <ChevronRight className="w-3 h-3 text-[#6B6B6B] group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ResultsCard>
        </div>
    );
}
