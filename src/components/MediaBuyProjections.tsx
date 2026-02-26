'use client';

import { Monitor, Smartphone, Tv, Play, Globe } from 'lucide-react';
import ResultsCard from '@/components/ResultsCard';

interface PlatformAffinity {
    platform: string;
    fit_score: number;
    rationale: string;
}

interface Props {
    platforms: PlatformAffinity[];
}

const PLATFORM_ICONS: Record<string, any> = {
    'Instagram': Smartphone,
    'TikTok': Smartphone,
    'CTV / OTT': Tv,
    'YouTube': Play,
    'Web Display': Globe,
};

function getScoreColor(score: number): string {
    if (score >= 75) return 'text-accent';
    if (score >= 55) return 'text-[#141414]';
    return 'text-[#6B6B6B]';
}

function getBarColor(score: number): string {
    if (score >= 75) return 'var(--accent, #C1A67B)';
    if (score >= 55) return '#141414';
    return '#B5A99A';
}

export default function MediaBuyProjections({ platforms }: Props) {
    const top = platforms[0];

    return (
        <ResultsCard title="Media Buy Projections" variant="strategy">
            <div className="space-y-8">
                <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">
                    Platform Affinity — Visual DNA Match
                </p>

                {/* Top recommendation hero */}
                {top && (
                    <div className="p-6 bg-[#141414] rounded-2xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full -translate-y-24 translate-x-24 blur-[80px] pointer-events-none" />
                        <div className="relative z-10">
                            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2">Recommended Primary Channel</p>
                            <div className="flex items-center gap-4 mb-3">
                                <span className="text-3xl font-light text-[#FBF7EF]">{top.platform}</span>
                                <span className="text-2xl font-bold text-accent">{top.fit_score}%</span>
                            </div>
                            <p className="text-[11px] text-white/50 leading-relaxed">{top.rationale}</p>
                        </div>
                    </div>
                )}

                {/* All platform cards */}
                <div className="space-y-3">
                    {platforms.map((p, idx) => {
                        const Icon = PLATFORM_ICONS[p.platform] || Monitor;
                        return (
                            <div key={idx} className="group p-5 bg-white rounded-2xl border border-[#E7DED1] hover:border-[#141414]/20 transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#FBF7EF] rounded-xl border border-[#E7DED1] group-hover:border-[#141414]/20 transition-colors">
                                            <Icon className="w-4 h-4 text-[#141414]" />
                                        </div>
                                        <span className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.2em]">{p.platform}</span>
                                    </div>
                                    <span className={`text-lg font-bold ${getScoreColor(p.fit_score)}`}>{p.fit_score}%</span>
                                </div>
                                <div className="h-[3px] bg-[#E7DED1]/50 rounded-full overflow-hidden mb-3">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{ width: `${p.fit_score}%`, backgroundColor: getBarColor(p.fit_score) }}
                                    />
                                </div>
                                <p className="text-[10px] text-[#6B6B6B] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                                    {p.rationale}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </ResultsCard>
    );
}
