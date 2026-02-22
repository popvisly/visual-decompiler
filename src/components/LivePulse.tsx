'use client';

import { useState, useEffect, useRef } from 'react';
import { Activity, Zap, TrendingUp, TrendingDown, AlertCircle, Info } from 'lucide-react';
import { LiveSignalService, BoardLiveStatus, LiveSignal } from '@/lib/live_signal_service';

type Props = {
    category?: string;
    boardMetrics?: any;
};

export default function LivePulse({ category = 'General', boardMetrics }: Props) {
    const [status, setStatus] = useState<BoardLiveStatus | null>(null);
    const [points, setPoints] = useState<number[]>([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial load
        const signals = LiveSignalService.getLiveSignals(category);
        const initialStatus = LiveSignalService.calculateLiveStatus(boardMetrics, signals);
        setStatus(initialStatus);

        // Update EKG points
        const interval = setInterval(() => {
            setPoints(prev => {
                const next = [...prev, Math.random() * 100];
                if (next.length > 50) return next.slice(1);
                return next;
            });
            setCurrentTime(new Date());
        }, 2000);

        return () => clearInterval(interval);
    }, [category, boardMetrics]);

    if (!status) return null;

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Live EKG Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
                        <div className="relative w-3 h-3 bg-accent rounded-full" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-1">Live Market Pulse</h3>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-light text-[#141414] uppercase tracking-tightest">{status.marketPulseLabel}</span>
                            <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest bg-[#FBF7EF] px-3 py-1 rounded-full border border-[#E7DED1]">
                                VOL: {(status.volatility * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Time (UTC)</p>
                        <p className="text-[14px] font-light text-[#141414] font-mono">{currentTime.toISOString().split('T')[1].split('.')[0]}</p>
                    </div>
                    <div className="h-10 w-px bg-[#E7DED1]" />
                    <div className="text-right">
                        <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Resonance Index</p>
                        <p className="text-[14px] font-light text-[#141414]">{(status.currentResonance * 100).toFixed(0)}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Volatility EKG */}
                <div className="lg:col-span-2 bg-[#141414] rounded-[2.5rem] p-10 overflow-hidden relative group">
                    <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(#FBF7EF_1px,transparent_1px),linear-gradient(90deg,#FBF7EF_1px,transparent_1px)] [background-size:32px_32px]" />

                    <div className="relative z-10 h-48 w-full flex items-end gap-1 px-4">
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-accent/50 rounded-t-sm transition-all duration-1000"
                                style={{
                                    height: `${p}%`,
                                    opacity: 0.2 + (i / points.length) * 0.8
                                }}
                            />
                        ))}
                    </div>

                    <div className="absolute top-8 right-10 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-accent animate-pulse" />
                        <span className="text-[8px] font-bold text-[#FBF7EF] uppercase tracking-[0.2em]">Real-Time Variance</span>
                    </div>

                    {/* Scanning Line */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-scan" style={{ animationDuration: '4s' }} />
                </div>

                {/* Live Signal Ticker */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em] flex items-center gap-2">
                            <Zap className="w-3 h-3" /> Incoming Signals
                        </h4>
                        <span className="text-[10px] font-bold text-accent uppercase">{status.activeSignals.length} Active</span>
                    </div>

                    <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {status.activeSignals.map((signal) => (
                            <div key={signal.id} className="p-4 bg-white border border-[#E7DED1] rounded-2xl flex gap-4 group hover:border-[#141414] transition-colors">
                                <div className="shrink-0 mt-1">
                                    {signal.impact > 0 ? (
                                        <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                                    ) : (
                                        <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] text-[#141414] leading-relaxed font-medium">
                                        {signal.content}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">{signal.source}</span>
                                        <span className="text-[8px] font-bold text-[#6B6B6B]/40 uppercase tracking-widest">{signal.dimension}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {status.currentResonance > 0.7 && (
                        <div className="p-5 bg-accent/5 border border-accent/20 rounded-2xl flex gap-4 animate-in zoom-in-95 duration-500">
                            <AlertCircle className="w-5 h-5 text-accent shrink-0" />
                            <div className="space-y-1">
                                <h5 className="text-[10px] font-bold text-accent uppercase tracking-widest">Resonance Alert</h5>
                                <p className="text-[12px] text-[#141414] leading-tight">Board strategy aligns with current {category} shifts. Strategic window open.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
