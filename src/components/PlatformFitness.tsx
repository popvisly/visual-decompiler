'use client';

import React, { useState } from 'react';
import ForensicTooltip from './ForensicTooltip';
import SafeZoneOverlay, { PlatformType } from './SafeZoneOverlay';

type FitnessData = {
    platform: PlatformType;
    fitness_score: number;
    safe_zone_violation: boolean;
    notes: string;
};

type Props = {
    imageUrl: string;
    fitnessData: FitnessData[];
};

export default function PlatformFitness({ imageUrl, fitnessData }: Props) {
    const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | null>(null);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fitnessData.map((item) => (
                    <button
                        key={item.platform}
                        onClick={() => setSelectedPlatform(selectedPlatform === item.platform ? null : item.platform)}
                        className={`group p-4 rounded-2xl border transition-all text-left relative overflow-hidden
                            ${selectedPlatform === item.platform
                                ? 'bg-[#141414] border-[#141414] shadow-lg'
                                : 'bg-white border-[#E7DED1] hover:border-accent/40 shadow-sm'
                            }
                        `}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h4 className={`text-[12px] font-bold uppercase tracking-wide
                                ${selectedPlatform === item.platform ? 'text-white' : 'text-[#141414]'}
                            `}>
                                {item.platform.replace(/_/g, ' ')}
                            </h4>
                            <span className={`text-[11px] font-mono font-bold
                                ${item.fitness_score >= 80 ? 'text-green-500' : item.fitness_score >= 60 ? 'text-yellow-500' : 'text-red-500'}
                            `}>
                                {item.fitness_score}%
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className={`h-1 w-full rounded-full overflow-hidden mb-3
                            ${selectedPlatform === item.platform ? 'bg-white/10' : 'bg-[#FBF7EF]'}
                        `}>
                            <div
                                className={`h-full rounded-full transition-all duration-700
                                    ${item.fitness_score >= 80 ? 'bg-green-500' : item.fitness_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}
                                `}
                                style={{ width: `${item.fitness_score}%` }}
                            />
                        </div>

                        <p className={`text-[11px] leading-relaxed line-clamp-2
                            ${selectedPlatform === item.platform ? 'text-white/70' : 'text-[#6B6B6B]'}
                        `}>
                            {item.notes}
                        </p>

                        {item.safe_zone_violation && (
                            <div className="mt-2 flex items-center gap-1.5 text-[9px] font-bold text-red-500 uppercase tracking-widest">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                UI Overlap Detected
                            </div>
                        )}

                        <div className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity
                            ${selectedPlatform === item.platform ? 'text-white/40' : 'text-[#141414]/20'}
                        `}>
                            <span className="text-[8px] font-bold uppercase tracking-tighter">
                                {selectedPlatform === item.platform ? 'Hide Overlay' : 'View Overlay'}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Platform Preview Modal/Container */}
            {selectedPlatform && (
                <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-[#141414] rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden relative">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-white text-lg font-bold uppercase tracking-tight">
                                    {selectedPlatform.replace(/_/g, ' ')} Preview
                                </h3>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                    Safe Zone Verification Active
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedPlatform(null)}
                                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <div className="max-w-[400px] mx-auto relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                            <SafeZoneOverlay
                                imageUrl={imageUrl}
                                platform={selectedPlatform}
                            />
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                            <div className="space-y-1">
                                <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest">Platform Specifics</p>
                                <p className="text-white/70 text-[11px] leading-relaxed">
                                    {selectedPlatform === 'Instagram_Stories' || selectedPlatform === 'TikTok'
                                        ? 'Full-screen 9:16 portrait. Crucial safe zones for headers and footers.'
                                        : 'Feed 4:5 aspect ratio. High engagement but strict cropping bounds.'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest">UI Interactions</p>
                                <p className="text-white/70 text-[11px] leading-relaxed">
                                    Checking overlaps with Profile, Captions, and Navigation elements unique to {selectedPlatform.replace(/_/g, ' ')}.
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest">Adoption Strategy</p>
                                <p className="text-white/70 text-[11px] leading-relaxed">
                                    Recommend centralizing key copy by 15% to clear platform-native interactive zones.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
