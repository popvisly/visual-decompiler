"use client";

import React from 'react';

interface Agency {
    name?: string;
    whitelabel_logo?: string;
    primary_hex?: string;
    tier?: string;
    is_whitelabel_active?: boolean;
}

export const SovereignPrintHeader = ({ agency }: { agency: Agency | null }) => {
    if (!agency) return null;

    return (
        <div className="hidden print:flex flex-col items-center justify-center w-full py-12 border-b-2 mb-12" style={{ borderColor: agency.primary_hex || '#141414' }}>
            {agency.whitelabel_logo ? (
                <img src={agency.whitelabel_logo} alt={agency.name} className="h-16 mb-4 object-contain" />
            ) : (
                <div className="w-12 h-12 bg-black rounded-sm mb-4 flex items-center justify-center text-white font-bold text-xl">V</div>
            )}
            <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-black">{agency.name || 'STRATEGIC DOSSIER'}</h1>
            <div className="mt-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">Forensic Intelligence Briefing</div>
        </div>
    );
};

export const SovereignPrintFooter = ({ agency, assetId }: { agency: Agency | null, assetId: string }) => {
    const isSovereignTier = agency?.tier?.toLowerCase().includes('sovereignty');
    const timestamp = new Date().toISOString();
    const date = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: false });

    // Generate unique ingestion_id (epoch-based forensic identifier)
    const ingestionId = `VD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    return (
        <div className="hidden print:flex flex-col mt-24 pt-8 border-t-2 border-[#C1A67B]">
            {/* Primary Metadata Row */}
            <div className="flex justify-between items-end mb-6">
                <div className="space-y-2">
                    <p className="text-[8px] font-bold tracking-[0.25em] uppercase text-[#C1A67B]">Classification: Confidential / Forensic</p>
                    <p className="text-[9px] font-mono text-[#141414] uppercase">Ingestion ID: {ingestionId}</p>
                    <p className="text-[8px] font-mono text-[#141414]/60 uppercase">Asset ID: {assetId}</p>
                </div>

                <div className="text-right space-y-1">
                    {!isSovereignTier && !agency?.is_whitelabel_active && (
                        <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-[#141414]/50 mb-2">Powered By Visual Decompiler</p>
                    )}
                    <p className="text-[8px] font-mono text-[#141414]/70 uppercase">Generated: {date} at {time}</p>
                    <p className="text-[7px] font-mono text-[#141414]/40 uppercase">{timestamp}</p>
                </div>
            </div>

            {/* Seal of Extraction Watermark */}
            <div className="mt-8 pt-6 border-t border-[#E7DED1] flex flex-col items-center gap-3">
                <div className="relative">
                    {/* Forensic Seal Badge */}
                    <div className="w-16 h-16 rounded-full border-2 border-[#C1A67B] flex items-center justify-center bg-[#FBF7EF]">
                        <div className="text-center">
                            <div className="text-[10px] font-bold text-[#C1A67B] leading-none mb-0.5">VD</div>
                            <div className="text-[6px] font-mono text-[#141414]/60 leading-none">FORENSIC</div>
                        </div>
                    </div>
                    {/* Outer ring */}
                    <svg className="absolute inset-0 w-16 h-16" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="30" fill="none" stroke="#C1A67B" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4"/>
                    </svg>
                </div>

                <div className="text-center space-y-1">
                    <p className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#C1A67B]">Seal of Extraction</p>
                    <p className="text-[7px] tracking-[0.4em] uppercase text-[#141414]/30">End of Sovereign Briefing</p>
                </div>
            </div>
        </div>
    );
};
