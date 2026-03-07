"use client";

import React from 'react';

interface Agency {
    name?: string;
    whitelabel_logo?: string;
    primary_hex?: string;
    tier?: string;
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
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="hidden print:flex flex-col mt-24 pt-8 border-t border-neutral-200">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <p className="text-[8px] font-bold tracking-widest uppercase text-neutral-400">Classification: Confidential / Forensic</p>
                    <p className="text-[8px] font-mono text-neutral-300 uppercase">Asset ID: {assetId}</p>
                </div>

                <div className="text-right">
                    {!isSovereignTier && (
                        <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-neutral-300 mb-2">Powered By Visual Decompiler</p>
                    )}
                    <p className="text-[8px] font-mono text-neutral-400 uppercase">Generated: {date}</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-[7px] tracking-[0.4em] uppercase text-neutral-200">End of Sovereign Briefing</p>
            </div>
        </div>
    );
};
