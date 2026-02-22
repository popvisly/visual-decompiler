'use client';

import { useState } from 'react';
import { EmotionalMetric } from '@/lib/sentiment_analysis';
import { Activity, Brain, Shield, Zap, Heart, Radio, Sparkles } from 'lucide-react';
import LivePulse from './LivePulse';

interface Props {
    metrics: EmotionalMetric[];
    psychologicalFootprint: string;
    alignmentScore: number;
    category?: string;
    boardMetrics?: any;
}

const ICON_MAP: Record<string, any> = {
    'Trust': Shield,
    'Urgency': Zap,
    'Aspiration': Heart,
    'Fear': Activity,
    'Belonging': Brain
};

export default function SentimentMirror({
    metrics,
    psychologicalFootprint,
    alignmentScore,
    category,
    boardMetrics
}: Props) {
    const [liveMode, setLiveMode] = useState(false);

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-[#E7DED1] pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-light text-[#141414] tracking-tight uppercase">Sentiment Mirror</h3>
                        <button
                            onClick={() => setLiveMode(!liveMode)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${liveMode
                                    ? 'bg-accent text-[#FBF7EF] shadow-[0_4px_12px_rgba(var(--accent-rgb),0.3)]'
                                    : 'bg-[#FBF7EF] text-[#6B6B6B] border border-[#E7DED1] hover:border-[#141414]'
                                }`}
                        >
                            <Radio className={`w-3 h-3 ${liveMode ? 'animate-pulse' : ''}`} />
                            {liveMode ? 'Live Mode Active' : 'Enable Live Signals'}
                        </button>
                    </div>
                    <p className="text-[10px] text-[#6B6B6B] font-bold tracking-[0.3em] uppercase">Audience Resonance Heatmap</p>
                </div>

                <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.02)]">
                    <div className="text-right">
                        <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em] mb-1">Impact Alignment</p>
                        <p className="text-3xl font-light text-[#141414]">{alignmentScore}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center relative">
                        <Activity className="w-5 h-5 text-accent animate-pulse" />
                        <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping" />
                    </div>
                </div>
            </div>

            {liveMode && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                    <LivePulse category={category} boardMetrics={boardMetrics} />
                    <div className="h-px bg-gradient-to-r from-transparent via-[#E7DED1] to-transparent my-16" />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div className="relative group">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-accent/20 group-hover:bg-accent transition-colors" />
                        <p className="text-xl font-light text-[#141414] leading-relaxed italic pl-8 py-2">
                            "{psychologicalFootprint}"
                        </p>
                    </div>
                    <div className="p-8 bg-[#FBF7EF] rounded-[2.5rem] border border-[#E7DED1] space-y-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                            <Sparkles className="w-12 h-12 text-[#141414]" />
                        </div>
                        <p className="text-[10px] font-bold text-[#141414] uppercase tracking-[0.3em]">Psychological Footprint</p>
                        <p className="text-[13px] text-[#6B6B6B] leading-relaxed uppercase tracking-tight">
                            This collection manifests a specific cognitive resonance that prioritizes latent emotional anchors over direct tactical delivery.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {metrics.map((metric, idx) => {
                        const Icon = ICON_MAP[metric.label] || Brain;
                        return (
                            <div key={idx} className="group p-8 bg-white rounded-3xl border border-[#E7DED1] hover:border-[#141414] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(20,20,20,0.05)]">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl border border-[#E7DED1] group-hover:border-[#141414] transition-colors">
                                            <Icon className="w-4 h-4 text-[#141414]" />
                                        </div>
                                        <span className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.3em]">{metric.label}</span>
                                    </div>
                                    <span className={`text-[8px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest ${metric.resonance === 'High' ? 'bg-accent/10 text-accent border border-accent/20' :
                                            metric.resonance === 'Medium' ? 'bg-[#FBF7EF] text-[#6B6B6B] border border-[#E7DED1]' :
                                                'bg-red-50 text-red-500 border border-red-100'
                                        }`}>
                                        {metric.resonance} Resonance
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-[2px] bg-[#E7DED1]/30 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-accent transition-all duration-1000 ease-out"
                                            style={{ width: `${metric.score}%` }}
                                        />
                                    </div>
                                    <p className="text-[11px] text-[#6B6B6B] leading-relaxed uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                        {metric.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
