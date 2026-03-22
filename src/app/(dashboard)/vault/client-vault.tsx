"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { supabaseClient } from '@/lib/supabase-client';

interface VaultAsset {
    id: string;
    type: string;
    file_url: string;
    created_at: string;
    tags?: string[];
    brand?: { name: string; market_sector: string };
    extraction?: any;
    extractions?: any;
}

export default function VaultClient({ initialAssets }: { initialAssets: VaultAsset[] }) {
    const [assets, setAssets] = useState<VaultAsset[]>(initialAssets);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [query, setQuery] = useState('');
    const [sectorFilter, setSectorFilter] = useState('ALL SECTORS');
    const [mechanicFilter, setMechanicFilter] = useState('ALL MECHANICS');
    const [tagFilter, setTagFilter] = useState('ALL TAGS');
    const [sortOrder, setSortOrder] = useState('NEWEST');

    const sectorOptions = useMemo(() => {
        const sectors = new Set<string>();
        for (const asset of assets) {
            const sector = asset.brand?.market_sector?.trim();
            if (sector) sectors.add(sector);
        }
        return ['ALL SECTORS', ...Array.from(sectors).sort()];
    }, [assets]);

    const mechanicOptions = useMemo(() => {
        const mechanics = new Set<string>();
        for (const asset of assets) {
            const rawExtraction = asset.extraction || asset.extractions;
            const extraction = Array.isArray(rawExtraction) ? rawExtraction[0] : rawExtraction;
            const mechanic = extraction?.primary_mechanic?.trim();
            if (mechanic) mechanics.add(mechanic);
        }
        return ['ALL MECHANICS', ...Array.from(mechanics).sort()];
    }, [assets]);

    const tagOptions = useMemo(() => {
        const tags = new Set<string>();
        for (const asset of assets) {
            for (const tag of asset.tags || []) {
                const normalized = tag.trim();
                if (normalized) tags.add(normalized);
            }
        }
        return ['ALL TAGS', ...Array.from(tags).sort()];
    }, [assets]);

    const filteredAssets = useMemo(() => {
        let next = [...assets];
        const normalizedQuery = query.trim().toLowerCase();

        if (normalizedQuery) {
            next = next.filter((asset) => {
                const rawExtraction = asset.extraction || asset.extractions;
                const extraction = Array.isArray(rawExtraction) ? rawExtraction[0] : rawExtraction;

                return [
                    asset.brand?.name,
                    asset.brand?.market_sector,
                    extraction?.primary_mechanic,
                    ...(asset.tags || []),
                    asset.id,
                ]
                    .filter(Boolean)
                    .some((value) => String(value).toLowerCase().includes(normalizedQuery));
            });
        }

        if (sectorFilter !== 'ALL SECTORS') {
            next = next.filter((asset) => asset.brand?.market_sector === sectorFilter);
        }

        if (mechanicFilter !== 'ALL MECHANICS') {
            next = next.filter((asset) => {
                const rawExtraction = asset.extraction || asset.extractions;
                const extraction = Array.isArray(rawExtraction) ? rawExtraction[0] : rawExtraction;
                return extraction?.primary_mechanic === mechanicFilter;
            });
        }

        if (tagFilter !== 'ALL TAGS') {
            next = next.filter((asset) => (asset.tags || []).includes(tagFilter));
        }

        next.sort((a, b) => {
            const aExtraction = Array.isArray(a.extraction || a.extractions) ? (a.extraction || a.extractions)[0] : (a.extraction || a.extractions);
            const bExtraction = Array.isArray(b.extraction || b.extractions) ? (b.extraction || b.extractions)[0] : (b.extraction || b.extractions);
            const aConfidence = Number(aExtraction?.confidence_score || 0);
            const bConfidence = Number(bExtraction?.confidence_score || 0);

            switch (sortOrder) {
                case 'OLDEST':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case 'CONFIDENCE HIGH':
                    return bConfidence - aConfidence;
                case 'CONFIDENCE LOW':
                    return aConfidence - bConfidence;
                case 'BRAND A-Z':
                    return (a.brand?.name || '').localeCompare(b.brand?.name || '');
                default:
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
        });

        return next;
    }, [assets, query, sectorFilter, mechanicFilter, tagFilter, sortOrder]);

    const clearFilters = () => {
        setQuery('');
        setSectorFilter('ALL SECTORS');
        setMechanicFilter('ALL MECHANICS');
        setTagFilter('ALL TAGS');
        setSortOrder('NEWEST');
    };

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
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-center gap-3">
                            <p className="text-[#4A4A4A]/60 font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                                {filteredAssets.length} Forensic Extractions {query || sectorFilter !== 'ALL SECTORS' || mechanicFilter !== 'ALL MECHANICS' || tagFilter !== 'ALL TAGS' ? 'Matching' : 'Secured'}
                            </p>
                            <div className="h-px w-8 bg-[#D4A574]" />
                        </div>

                        <div className="w-full max-w-4xl space-y-3">
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B4513]/60" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="SEARCH — brand, sector, mechanic..."
                                    className="w-full border-b border-[#1A1A1A]/20 bg-transparent py-3 pl-7 pr-8 text-[11px] font-mono uppercase tracking-[0.22em] text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A]/30"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery('')}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 transition-colors hover:text-[#1A1A1A]"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
                                <VaultSelect label="Sector" value={sectorFilter} onChange={setSectorFilter} options={sectorOptions} />
                                <VaultSelect label="Mechanic" value={mechanicFilter} onChange={setMechanicFilter} options={mechanicOptions} />
                                <VaultSelect label="Tag" value={tagFilter} onChange={setTagFilter} options={tagOptions} />
                                <VaultSelect
                                    label="Sort"
                                    value={sortOrder}
                                    onChange={setSortOrder}
                                    options={['NEWEST', 'OLDEST', 'CONFIDENCE HIGH', 'CONFIDENCE LOW', 'BRAND A-Z']}
                                />
                                {(query || sectorFilter !== 'ALL SECTORS' || mechanicFilter !== 'ALL MECHANICS' || tagFilter !== 'ALL TAGS' || sortOrder !== 'NEWEST') && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="self-start rounded-full border border-[#D4A574]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] transition-all hover:border-[#D4A574] hover:bg-white"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Grid */}
                {filteredAssets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 select-none">
                        {filteredAssets.map((asset) => (
                            <VaultCard 
                                key={asset.id} 
                                asset={asset} 
                                isSelected={selectedIds.has(asset.id)}
                                onToggle={() => toggleSelect(asset.id)}
                            />
                        ))}
                    </div>
                ) : assets.length > 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center border border-[#E5E5E1] border-dashed rounded-3xl bg-white shadow-sm px-8 text-center">
                        <span className="text-[#1A1A1A] font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-bold text-center">
                            No Extractions Matching Your Filters.
                        </span>
                        <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#4A4A4A]/50 mb-6 max-w-xl">
                            Try searching by brand, sector, persuasion mechanic, tag, or clear the active filters.
                        </p>
                        <button 
                            type="button"
                            onClick={clearFilters}
                            className="text-[#D4A574] text-[10px] font-mono tracking-widest uppercase hover:underline"
                        >
                            [ CLEAR FILTERS ]
                        </button>
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

function VaultSelect({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
}) {
    return (
        <label className="relative min-w-[180px]">
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#4A4A4A]/50">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full appearance-none rounded-full border border-[#1A1A1A]/20 bg-white px-4 py-2.5 pr-10 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] outline-none transition-all hover:border-[#D4A574]/50 focus:border-[#D4A574]"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-[2.15rem] h-4 w-4 text-[#8B4513]/60" />
        </label>
    );
}

function VaultCard({ asset, isSelected, onToggle }: { asset: VaultAsset, isSelected: boolean, onToggle: () => void }) {
    const [showMechanicDetail, setShowMechanicDetail] = useState(false);
    const brandName = asset.brand?.name || 'Unknown Entity';
    const sector = asset.brand?.market_sector || 'Unclassified';
    
    // Standardize extraction normalization (handle array vs object and plural fallback)
    const rawExtraction = asset.extraction || asset.extractions;
    const extraction = Array.isArray(rawExtraction) ? rawExtraction[0] : rawExtraction;
    
    const isAnalysed = !!extraction?.full_dossier;
    const mechanic = isAnalysed ? extraction?.primary_mechanic : 'Awaiting Forensic Deep-Dive';
    const normalizedMechanic = mechanic || 'Awaiting Forensic Deep-Dive';
    const isLongMechanic = normalizedMechanic.length > 52;
    const tags = (asset.tags || []).slice(0, 3);

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
                            <h3 className={`text-[26px] font-light tracking-tight uppercase transition-colors ${isSelected ? 'text-[#D4A574]' : 'text-[#FFFFFF] group-hover:text-[#D4A574]'}`}>
                                {brandName}
                            </h3>
                            <p className="mt-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A574] border-l border-[#D4A574]/30 pl-3">
                                {sector}
                            </p>
                            {tags.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-[#D4A574]/18 bg-[#D4A574]/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#F5F3EE]/80"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-8 border-t border-[#D4A574]/20 pt-6">
                            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#D4A574]/40 mb-2">
                                Primary Mechanic
                            </p>
                            <p
                                title={normalizedMechanic}
                                className={`text-sm leading-snug ${
                                    isAnalysed ? (isSelected ? 'text-[#FFFFFF]/80' : 'text-[#FFFFFF]') : 'text-[#FFFFFF]/40 italic'
                                } ${showMechanicDetail ? '' : 'line-clamp-1'}`}
                            >
                                {normalizedMechanic}
                            </p>
                            {isAnalysed && isLongMechanic && (
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        setShowMechanicDetail((current) => !current);
                                    }}
                                    className="mt-3 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#D4A574]/75 transition-colors hover:text-[#D4A574]"
                                >
                                    {showMechanicDetail ? (
                                        <>
                                            Hide full mechanic
                                            <ChevronUp className="h-3.5 w-3.5" />
                                        </>
                                    ) : (
                                        <>
                                            View full mechanic
                                            <ChevronDown className="h-3.5 w-3.5" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
