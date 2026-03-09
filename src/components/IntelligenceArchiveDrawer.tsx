'use client';

import { useState, useEffect } from 'react';
import { X, Search, Database, Fingerprint } from 'lucide-react';
import { Asset, getAssets } from '@/lib/intelligence_service';

interface IntelligenceArchiveDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (asset: Asset) => void;
    label: string;
}

export default function IntelligenceArchiveDrawer({ 
    isOpen, 
    onClose, 
    onSelect, 
    label 
}: IntelligenceArchiveDrawerProps) {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isOpen) {
            const fetchLibrary = async () => {
                setIsLoading(true);
                const data = await getAssets();
                setAssets(data);
                setIsLoading(false);
            };
            fetchLibrary();
        }
    }, [isOpen]);

    const filteredAssets = assets.filter(a => 
        a.brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.extractions?.primary_mechanic?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                onClick={onClose} 
            />
            
            {/* Drawer Surface - Deep Charcoal Aesthetic */}
            <div className="relative w-full max-w-xl bg-[#1A1A1A] h-screen shadow-[0_0_100px_rgba(0,0,0,0.5)] border-l border-[#D4A574]/20 animate-in slide-in-from-right duration-500 flex flex-col overflow-hidden">
                
                {/* Forensic Header */}
                <div className="p-10 border-b border-[#D4A574]/10 flex justify-between items-center group">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#D4A574] animate-pulse" />
                            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-[#D4A574]">
                                INTELLIGENCE ARCHIVE
                            </h2>
                        </div>
                        <p className="text-[10px] text-[#D4A574]/40 font-mono tracking-[0.2em] uppercase">
                            Targeting: <span className="text-[#D4A574]/80">{label}</span>
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-[#D4A574]/40 hover:text-[#D4A574] hover:scale-110 transition-all p-3 border border-[#D4A574]/10 rounded-full hover:border-[#D4A574]/30"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Search / Filter Layer */}
                <div className="px-10 py-6 bg-black/20 border-b border-[#D4A574]/10">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A574]/20 group-focus-within:text-[#D4A574]/50 transition-colors" />
                        <input 
                            type="text"
                            placeholder="FILTER BY BRAND OR MECHANIC..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#141414] border border-[#D4A574]/10 rounded-xl py-4 pl-12 pr-6 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#D4A574]/40 transition-all placeholder:text-[#D4A574]/10 uppercase"
                        />
                    </div>
                </div>

                {/* Library Scroll Area */}
                <div className="flex-1 overflow-y-auto p-10 space-y-6 scrollbar-hide">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-6 opacity-20">
                            <Database className="w-12 h-12 text-[#D4A574] animate-pulse" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4A574]">Synchronizing Vault...</p>
                        </div>
                    ) : filteredAssets.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredAssets.map(a => (
                                <div
                                    key={a.id}
                                    className="group/card relative bg-[#141414] border border-[#D4A574]/10 rounded-2xl overflow-hidden hover:border-[#D4A574]/40 transition-all duration-500 shadow-xl"
                                >
                                    <div className="flex items-center gap-8 p-6">
                                        {/* Forensic Preview */}
                                        <div className="w-24 h-24 bg-black rounded-xl overflow-hidden shrink-0 border border-[#D4A574]/5 relative group-hover/card:border-[#D4A574]/20">
                                            <img 
                                                src={a.file_url} 
                                                className="w-full h-full object-cover grayscale opacity-40 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-700" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                                        </div>

                                        {/* Metadata */}
                                        <div className="flex flex-col text-left flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Fingerprint className="w-3 h-3 text-[#D4A574]/30" />
                                                <span className="text-[10px] font-mono text-[#D4A574]/20 uppercase">ID: {a.id.split('-')[0]}</span>
                                            </div>
                                            <span className="text-[14px] font-bold uppercase tracking-[0.1em] text-white truncate mb-1">
                                                {a.brand.name}
                                            </span>
                                            <span className="text-[10px] font-bold text-[#D4A574]/60 uppercase tracking-widest leading-relaxed">
                                                {a.extractions?.primary_mechanic || 'AWAITING ANALYSIS'}
                                            </span>
                                        </div>

                                        {/* Action Button - "Click-to-Inject" */}
                                        <button
                                            onClick={() => onSelect(a)}
                                            className="px-6 py-3 bg-transparent border border-[#D4A574]/30 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase text-[#D4A574] hover:bg-[#D4A574] hover:text-[#1A1A1A] transition-all shrink-0 active:scale-95"
                                        >
                                            [ LOAD INTO SLOT ]
                                        </button>
                                    </div>

                                    {/* Geometric Accent */}
                                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#D4A574]/[0.02] blur-3xl pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 border border-[#D4A574]/5 border-dashed rounded-3xl opacity-30">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">No matching forensic signatures found.</p>
                        </div>
                    )}
                </div>

                {/* Footer Signature */}
                <div className="p-10 border-t border-[#D4A574]/10 bg-black/40 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-[#D4A574]/20 uppercase tracking-[0.3em]">Vault Sync v2.1.0</span>
                    <button 
                        onClick={onClose}
                        className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4A574]/40 hover:text-white transition-colors"
                    >
                        [ CLOSE ARCHIVE ]
                    </button>
                </div>
            </div>
        </div>
    );
}
