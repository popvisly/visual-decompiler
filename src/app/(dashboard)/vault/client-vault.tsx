"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Trash2, X, Check } from 'lucide-react';
import { supabaseClient } from '@/lib/supabase-client';

interface VaultAsset {
    id: string;
    type: string;
    file_url: string;
    created_at: string;
    brand?: { name: string; market_sector: string };
    extraction?: { 
        primary_mechanic: string; 
        visual_style: string; 
        confidence_score: number;
        full_dossier: any;
    }[];
}

export default function VaultClient({ initialAssets }: { initialAssets: VaultAsset[] }) {
    const [assets, setAssets] = useState<VaultAsset[]>(initialAssets);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const toggleSelect = (id: string) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
        if (next.size === 0) setShowConfirm(false);
    };

    const clearSelection = () => {
        setSelectedIds(new Set());
        setShowConfirm(false);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const idsToDelete = Array.from(selectedIds);
            
            // 1. Delete Extractions first (Cascading usually handles this, but let's be safe if manually mapped)
            await supabaseClient.from('extractions').delete().in('asset_id', idsToDelete);
            
            // 2. Delete Assets
            const { error } = await supabaseClient.from('assets').delete().in('id', idsToDelete);
            
            if (error) throw error;

            // 3. Update Local State for Real-Time Sync
            setAssets(prev => prev.filter(a => !selectedIds.has(a.id)));
            setSelectedIds(new Set());
            setShowConfirm(false);
        } catch (err) {
            console.error('Forensic Deconstruction Failed:', err);
            alert('Failed to deconstruct assets from the Vault.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="p-8 md:p-12 lg:p-16 text-[#1A1A1A] min-h-screen bg-[#FBFBF6] relative">
            <div className="relative z-10 w-full">
                
                {/* Header Action Bar - Slides in when assets are selected */}
                <div 
                    className={`fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] border-b border-[#D4A574]/20 transition-all duration-500 overflow-hidden ${
                        selectedIds.size > 0 ? 'h-24 md:h-20' : 'h-0'
                    }`}
                >
                    <div className="h-full max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#D4A574]">
                                {selectedIds.size} Assets Targeted for Removal
                            </span>
                            <button 
                                onClick={clearSelection}
                                className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A574]/40 hover:text-[#D4A574] transition-colors"
                            >
                                [ CANCEL ]
                            </button>
                        </div>

                        {!showConfirm ? (
                            <button 
                                onClick={() => setShowConfirm(true)}
                                className="px-10 py-3 border border-[#D4A574]/40 rounded-full text-[11px] font-bold tracking-[0.4em] uppercase text-[#D4A574] hover:bg-[#D4A574] hover:text-[#1A1A1A] transition-all"
                            >
                                [ DELETE ]
                            </button>
                        ) : (
                            <div className="flex items-center gap-6 animate-in slide-in-from-right-4 duration-300">
                                <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-[#D4A574]">
                                    CONFIRM PERMANENT REMOVAL?
                                </span>
                                <div className="flex gap-4">
                                    <button 
                                        disabled={isDeleting}
                                        onClick={handleDelete}
                                        className="px-8 py-2 border border-[#D4A574] rounded-full text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4A574] hover:bg-[#D4A574] hover:text-[#1A1A1A] transition-all disabled:opacity-50"
                                    >
                                        [ YES ]
                                    </button>
                                    <button 
                                        onClick={() => setShowConfirm(false)}
                                        className="px-8 py-2 border border-[#D4A574]/40 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4A574] hover:bg-[#D4A574] hover:text-[#1A1A1A] transition-all"
                                    >
                                        [ NO ]
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Header */}
                <header className="mb-12 border-b border-[#E5E5E1] pb-8 pt-4">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tightest uppercase mb-4 text-[#8B4513]">
                        The Intelligence Vault
                    </h1>
                    <div className="flex items-center gap-3">
                        <p className="text-[#4A4A4A]/60 font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                            {assets.length} Forensic Extractions Secured
                        </p>
                        <div className="h-px w-8 bg-[#D4A574]" />
                    </div>
                </header>

                {/* Grid */}
                {assets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 select-none">
                        {assets.map((asset) => (
                            <VaultCard 
                                key={asset.id} 
                                asset={asset} 
                                isSelected={selectedIds.has(asset.id)}
                                onToggle={() => toggleSelect(asset.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center border border-[#E5E5E1] border-dashed rounded-3xl bg-white shadow-sm">
                        <span className="text-[#1A1A1A] font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-bold text-center">
                            THE VAULT IS EMPTY.
                        </span>
                        <Link 
                            href="/ingest"
                            className="text-[#D4A574] text-[10px] font-mono tracking-widest uppercase hover:underline"
                        >
                            [ INITIATE FORENSIC EXTRACTION ]
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

function VaultCard({ asset, isSelected, onToggle }: { asset: VaultAsset, isSelected: boolean, onToggle: () => void }) {
    const brandName = asset.brand?.name || 'Unknown Entity';
    const sector = asset.brand?.market_sector || 'Unclassified';
    
    const extraction = asset.extraction?.[0];
    const isAnalysed = !!extraction?.full_dossier;
    const mechanic = isAnalysed ? extraction?.primary_mechanic : 'Awaiting Forensic Deep-Dive';

    return (
        <div className="group relative">
            {/* Selection Checkbox - High end style */}
            <div 
                className={`absolute top-6 left-6 z-20 w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                    ? 'bg-[#D4A574] border-[#D4A574] scale-110 shadow-lg' 
                    : 'bg-black/20 backdrop-blur-md border-[#D4A574]/40 opacity-0 group-hover:opacity-100'
                }`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggle();
                }}
            >
                {isSelected && <Check className="w-3.5 h-3.5 text-[#1A1A1A] stroke-[4]" />}
            </div>

            <Link href={`/asset/${asset.id}`} className="block focus:outline-none">
                <div className={`bg-[#1A1A1A] border transition-all duration-500 flex flex-col h-full rounded-3xl overflow-hidden ${
                    isSelected 
                    ? 'border-[#D4A574] ring-2 ring-[#D4A574]/20 scale-[0.98]' 
                    : 'border-[#D4A574]/30 hover:border-[#D4A574] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]'
                }`}>

                    {/* Brutalist Image Top */}
                    <div className="aspect-[4/5] w-full overflow-hidden bg-[#1A1A1A] border-b border-[#D4A574]/20 relative">
                        <img
                            src={asset.file_url}
                            alt={brandName}
                            className={`w-full h-full object-cover transition-all duration-700 ease-out ${isSelected ? 'scale-105 opacity-60' : 'group-hover:scale-110'}`}
                        />

                        {asset.type !== 'STATIC' && (
                            <div className="absolute top-4 right-4 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#D4A574]/40 px-3 py-1 rounded-none">
                                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#D4A574]">
                                    {asset.type}
                                </span>
                            </div>
                        )}

                        {isAnalysed && (
                            <div className="absolute bottom-4 right-4 bg-[#D4A574] px-3 py-1 rounded-none">
                                <span className="text-[8px] font-bold tracking-[0.1em] uppercase text-[#1A1A1A]">
                                    Forensic Secured
                                </span>
                            </div>
                        )}
                        
                        {isSelected && (
                            <div className="absolute inset-0 bg-[#D4A574]/10 pointer-events-none" />
                        )}
                    </div>

                    {/* Stark Data Block underneath */}
                    <div className="p-8 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className={`text-xl font-light tracking-tight mb-1 uppercase transition-colors ${isSelected ? 'text-[#D4A574]' : 'text-[#FFFFFF] group-hover:text-[#D4A574]'}`}>
                                {brandName}
                            </h3>
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A574] mb-8 border-l border-[#D4A574]/30 pl-3">
                                {sector}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-[#D4A574]/20">
                            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#D4A574]/40 mb-2">
                                Structural Logic
                            </p>
                            <p className={`text-sm font-medium leading-snug ${isAnalysed ? (isSelected ? 'text-[#FFFFFF]/80' : 'text-[#FFFFFF]') : 'text-[#FFFFFF]/40 italic'}`}>
                                {mechanic}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
