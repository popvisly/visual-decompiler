'use client';

import React from 'react';

export type PlatformType = 'Instagram_Post' | 'Instagram_Stories' | 'TikTok' | 'Facebook_Feed' | 'LinkedIn_Ad';

type Props = {
    imageUrl: string;
    platform: PlatformType;
};

export default function SafeZoneOverlay({ imageUrl, platform }: Props) {
    // Render different UI layers based on platform
    const renderOverlay = () => {
        switch (platform) {
            case 'Instagram_Stories':
            case 'TikTok':
                return (
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Header Safe Zone */}
                        <div className="absolute top-0 inset-x-0 h-[10%] bg-gradient-to-b from-black/20 to-transparent flex items-start justify-between p-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
                                <div className="w-24 h-2 bg-white/20 rounded-full" />
                            </div>
                            <div className="w-6 h-6 rounded-full bg-white/20" />
                        </div>

                        {/* Right Sidebar Interaction Zone (TikTok style) */}
                        <div className="absolute right-2 bottom-32 flex flex-col gap-6 items-center">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm" />
                            ))}
                        </div>

                        {/* Bottom Safe Zone */}
                        <div className="absolute bottom-0 inset-x-0 h-[20%] bg-gradient-to-t from-black/40 to-transparent p-6 flex flex-col justify-end gap-3">
                            <div className="w-[70%] h-3 bg-white/30 rounded-full" />
                            <div className="w-[50%] h-2 bg-white/20 rounded-full" />
                            <div className="w-full h-10 bg-white/20 border border-white/30 rounded-lg flex items-center justify-center">
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Learn More</span>
                            </div>
                        </div>

                        {/* Safe Zone Boundary Lines (Dashed) */}
                        <div className="absolute inset-x-0 top-[10%] bottom-[20%] border-x border-white/20 border-dashed" />
                    </div>
                );
            case 'Instagram_Post':
            case 'Facebook_Feed':
                return (
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Header */}
                        <div className="absolute top-0 inset-x-0 h-12 flex items-center px-3 border-b border-black/5 bg-white/50 backdrop-blur-sm">
                            <div className="w-8 h-8 rounded-full bg-black/10 mr-3" />
                            <div className="w-32 h-2.5 bg-black/10 rounded-full" />
                        </div>

                        {/* Interaction Bar */}
                        <div className="absolute bottom-12 inset-x-0 h-12 flex items-center px-4 gap-4 bg-white/50 backdrop-blur-sm">
                            <div className="w-5 h-5 rounded-full bg-red-400/30" />
                            <div className="w-5 h-5 rounded-full bg-black/10" />
                            <div className="w-5 h-5 rounded-full bg-black/10" />
                        </div>

                        {/* Bottom Caption Zone */}
                        <div className="absolute bottom-0 inset-x-0 h-12 p-3 bg-white/80 border-t border-black/5 flex flex-col gap-1.5">
                            <div className="w-[40%] h-2 bg-black/15 rounded-full" />
                            <div className="w-[90%] h-1.5 bg-black/10 rounded-full" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full aspect-[4/5] bg-black overflow-hidden group">
            <img
                src={imageUrl}
                alt={`${platform} preview`}
                className={`w-full h-full object-cover transition-transform duration-[2000ms]
                    ${platform === 'Instagram_Stories' || platform === 'TikTok' ? 'scale-110 object-center' : ''}
                `}
            />
            {renderOverlay()}

            {/* Legend Overlay */}
            <div className="absolute top-4 left-4 z-50 px-2 py-1 bg-accent text-[#141414] text-[8px] font-bold uppercase tracking-widest rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                Platform Sim: {platform.replace(/_/g, ' ')}
            </div>
        </div>
    );
}
