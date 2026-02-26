'use client';

import { Activity, AlertTriangle } from 'lucide-react';
import ResultsCard from '@/components/ResultsCard';

interface CognitiveLoadZone {
    zone: string;
    load: number;
    note: string;
}

interface Props {
    score: number;
    zones: CognitiveLoadZone[];
}

function getLoadLabel(score: number): { label: string; color: string; bg: string } {
    if (score < 30) return { label: 'Low Friction', color: 'text-green-600', bg: 'bg-green-50 border-green-100' };
    if (score < 55) return { label: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' };
    if (score < 75) return { label: 'High Load', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' };
    return { label: 'Overloaded', color: 'text-red-600', bg: 'bg-red-50 border-red-100' };
}

function getBarColor(load: number): string {
    if (load < 30) return '#22C55E';
    if (load < 55) return '#F59E0B';
    if (load < 75) return '#F97316';
    return '#EF4444';
}

export default function CognitiveLoadMap({ score, zones }: Props) {
    const status = getLoadLabel(score);

    return (
        <ResultsCard title="Cognitive Load Map" variant="gauge" tooltip="A neuro-analytical overlay that identifies areas of 'Visual Friction,' ensuring the core persuasion message isn't buried by excessive detail or poor hierarchy.">
            <div className="space-y-8">
                {/* Score Hero */}
                <div className="flex items-end gap-5 pb-8 border-b border-[#E7DED1]">
                    <div>
                        <span className="text-6xl font-bold text-[#141414] leading-none tracking-tight">{score}</span>
                        <span className="text-lg font-light text-[#6B6B6B] ml-1">%</span>
                    </div>
                    <div className="mb-1.5 space-y-1">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${status.bg}`}>
                            {score > 70 ? <AlertTriangle className={`w-3 h-3 ${status.color}`} /> : <Activity className={`w-3 h-3 ${status.color}`} />}
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${status.color}`}>{status.label}</span>
                        </div>
                        <p className="text-[11px] text-[#6B6B6B] leading-relaxed max-w-sm">
                            {score < 40
                                ? 'Clean composition — trigger mechanic is unobstructed.'
                                : score < 65
                                    ? 'Moderate processing demand. Key signals may compete for attention.'
                                    : 'High cognitive load risks diluting the primary trigger mechanic in visual noise.'}
                        </p>
                    </div>
                </div>

                {/* Global heatmap bar */}
                <div>
                    <div className="flex gap-1 mb-2">
                        {[20, 40, 60, 80, 100].map((threshold, i) => (
                            <div key={i} className="flex-1 h-4 rounded-sm overflow-hidden" style={{ backgroundColor: '#E7DED1' }}>
                                <div
                                    className="h-full rounded-sm transition-all duration-1000"
                                    style={{
                                        width: score >= threshold ? '100%' : score > threshold - 20 ? `${((score - (threshold - 20)) / 20) * 100}%` : '0%',
                                        backgroundColor: threshold <= 30 ? '#22C55E' : threshold <= 55 ? '#F59E0B' : threshold <= 75 ? '#F97316' : '#EF4444',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-[#6B6B6B]/50 uppercase tracking-widest px-1">
                        <span>Effortless</span>
                        <span>Moderate</span>
                        <span>Overloaded</span>
                    </div>
                </div>

                {/* Zone Breakdown */}
                {zones.length > 0 && (
                    <div className="space-y-3">
                        <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em]">Zone Breakdown</p>
                        {zones.map((zone, idx) => (
                            <div key={idx} className="group p-5 bg-white rounded-2xl border border-[#E7DED1] hover:border-[#141414]/20 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.15em]">{zone.zone}</span>
                                    <span className="text-[10px] font-bold" style={{ color: getBarColor(zone.load) }}>{zone.load}%</span>
                                </div>
                                <div className="h-[3px] bg-[#E7DED1]/50 rounded-full overflow-hidden mb-3">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{ width: `${zone.load}%`, backgroundColor: getBarColor(zone.load) }}
                                    />
                                </div>
                                <p className="text-[10px] text-[#6B6B6B] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tight">
                                    {zone.note}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ResultsCard>
    );
}
