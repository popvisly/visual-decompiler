"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check, ChevronDown, ChevronUp, Database, Filter, ArrowRight, Trash2 } from 'lucide-react';
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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
            await supabaseClient.from('extractions').delete().in('asset_id', idsToDelete);
            const { error } = await supabaseClient.from('assets').delete().in('id', idsToDelete);
            if (error) throw error;
            setAssets(prev => prev.filter(a => !selectedIds.has(a.id)));
            setSelectedIds(new Set());
            setShowConfirm(false);
        } catch (err) {
            console.error('Deletion Failed:', err);
            alert('Failed to remove assets from the Vault.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#F6F1E7] text-[#141414] selection:bg-[#C1A674] selection:text-white">
            
            {/* Selection HUD */}
            <AnimatePresence>
                {selectedIds.size > 0 && (
                    <motion.div 
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="fixed top-0 left-0 right-0 z-[100] bg-[#141414]/90 backdrop-blur-3xl border-b border-[#C1A674]/20"
                    >
                        <div className="max-w-[1500px] mx-auto h-24 md:h-20 px-8 flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#C1A674] animate-pulse" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#C1A674]">
                                        {selectedIds.size} Assets Engaged
                                    </span>
                                </div>
                                <button 
                                    onClick={clearSelection}
                                    className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
                                >
                                    [ ABORT ]
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                {!showConfirm ? (
                                    <button 
                                        onClick={() => setShowConfirm(true)}
                                        className="px-8 py-3 bg-[#C1A674] text-[#141414] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all"
                                    >
                                        [ REMOVE ]
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C1A674]">PERMANENT REMOVAL?</span>
                                        <div className="flex gap-2">
                                            <button 
                                                disabled={isDeleting}
                                                onClick={handleDelete}
                                                className="px-6 py-2 border border-[#C1A674] text-[#C1A674] text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#C1A674] hover:text-black transition-all"
                                            >
                                                {isDeleting ? 'REMOVING...' : '[ YES ]'}
                                            </button>
                                            <button 
                                                onClick={() => setShowConfirm(false)}
                                                className="px-6 py-2 bg-white/10 text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-white/20 transition-all"
                                            >
                                                [ NO ]
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1600px] mx-auto px-8 py-20 lg:py-32">
                
                {/* Header */}
                <header className="mb-24">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 mb-10"
                            >
                                <Database className="w-5 h-5 text-[#C1A674]" />
                                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-[#C1A674]">Intelligence Vault</span>
                            </motion.div>
                            
                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: EASE }}
                                className="text-[12vw] lg:text-[8vw] font-black leading-[0.82] tracking-[-0.05em] uppercase text-[#141414] mb-12"
                            >
                                Vault <br />
                                <span className="text-[#141414]/15">Memory.</span>
                            </motion.h1>

                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl lg:text-3xl text-[#6B6B6B] leading-relaxed font-medium max-w-2xl"
                            >
                                Processed intelligence archive. {filteredAssets.length} forensic extractions secured.
                            </motion.p>
                        </div>

                        {/* Search */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="w-full max-w-xl space-y-8"
                        >
                            <div className="relative group">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C1A674] transition-all group-focus-within:scale-125" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="SEARCH — BRAND, SECTOR, MECHANIC..."
                                    className="w-full bg-transparent border-b-2 border-[#141414]/10 py-5 pl-10 pr-10 text-[12px] font-black uppercase tracking-[0.3em] text-[#141414] focus:border-[#C1A674] outline-none transition-colors placeholder:text-[#141414]/20"
                                />
                                {query && (
                                    <button onClick={() => setQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#141414]/30 hover:text-[#C1A674]">
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <VaultSelect label="Sector" value={sectorFilter} onChange={setSectorFilter} options={sectorOptions} />
                                <VaultSelect label="Mechanic" value={mechanicFilter} onChange={setMechanicFilter} options={mechanicOptions} />
                                <VaultSelect label="Sort" value={sortOrder} onChange={setSortOrder} options={['NEWEST', 'OLDEST', 'CONFIDENCE HIGH', 'CONFIDENCE LOW']} />
                                <button 
                                    onClick={clearFilters}
                                    className="h-full border border-[#141414]/10 flex items-center justify-center text-[9px] font-black uppercase tracking-[0.3em] text-[#141414]/40 hover:bg-[#141414]/5 hover:text-[#C1A674] transition-all"
                                >
                                    [ RESET ]
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </header>

                {/* Grid */}
                <div className="mt-32">
                    {filteredAssets.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-24">
                            {filteredAssets.map((asset, i) => (
                                <VaultCard 
                                    key={asset.id} 
                                    asset={asset} 
                                    isSelected={selectedIds.has(asset.id)}
                                    onToggle={() => toggleSelect(asset.id)}
                                    index={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-64 flex flex-col items-center justify-center text-center border-t border-[#141414]/8">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <p className="text-[12px] font-black uppercase tracking-[0.5em] text-[#C1A674] mb-6">No Results</p>
                                <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tightest mb-12 text-[#141414]">No data found in <br />this partition.</h3>
                                {assets.length > 0 ? (
                                    <button onClick={clearFilters} className="px-12 py-5 bg-[#141414] text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#C1A674] hover:text-black transition-all">
                                        [ CLEAR ACTIVE FILTERS ]
                                    </button>
                                ) : (
                                    <Link href="/ingest" className="px-12 py-5 bg-[#C1A674] text-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#141414] hover:text-white transition-all">
                                        [ INITIATE FIRST EXTRACTION ]
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function VaultSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
    return (
        <div className="space-y-3">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#9a9a94] block px-1">{label}</span>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-[#FBF7EF] border border-[#E7DED1] px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#141414] appearance-none focus:border-[#C1A674] outline-none cursor-pointer"
                >
                    {options.map((opt) => <option key={opt} value={opt} className="bg-[#F6F1E7] text-[#141414]">{opt}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#C1A674] pointer-events-none" />
            </div>
        </div>
    );
}

function VaultCard({ asset, isSelected, onToggle, index }: { asset: VaultAsset, isSelected: boolean, onToggle: () => void, index: number }) {
    const rawExtraction = asset.extraction || asset.extractions;
    const extraction = Array.isArray(rawExtraction) ? rawExtraction[0] : rawExtraction;
    const isAnalysed = !!extraction?.full_dossier;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
            className="group relative"
        >
            {/* Selection */}
            <div 
                onClick={(e) => { e.preventDefault(); onToggle(); }}
                className={`absolute top-6 left-6 z-30 w-8 h-8 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-500 overflow-hidden ${
                    isSelected ? 'bg-[#C1A674] border-[#C1A674] scale-110 shadow-[0_0_20px_rgba(193,166,116,0.4)]' : 'bg-[#141414]/40 border-white/20 opacity-0 group-hover:opacity-100'
                }`}
            >
                {isSelected && <Check className="w-4 h-4 text-black stroke-[4]" />}
            </div>

            <Link href={`/asset/${asset.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden transition-all duration-700 bg-[#1A1A1A] rounded-[1.4rem] border border-[#E7DED1]">
                    <img
                        src={asset.file_url}
                        alt={asset.brand?.name || 'Vault Asset'}
                        className={`w-full h-full object-cover transition-all duration-1000 ease-out grayscale hover:grayscale-0 ${isSelected ? 'scale-110 opacity-40' : 'group-hover:scale-110'}`}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start pointer-events-none">
                        <div className="bg-[#141414]/80 backdrop-blur-md px-3 py-1 border border-white/10">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C1A674]">{asset.type}</span>
                        </div>
                        {isAnalysed && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C1A674] shadow-[0_0_8px_#C1A674]" />
                        )}
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-3xl font-black uppercase tracking-tightest leading-none mb-2 text-[#141414] group-hover:text-[#C1A674] transition-colors">
                                {asset.brand?.name || 'Unknown'}
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#9a9a94]">{asset.brand?.market_sector || 'General Sector'}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#141414]/10 group-hover:text-[#C1A674] group-hover:translate-x-2 transition-all" />
                    </div>

                    <div className="pt-6 border-t border-[#E7DED1]">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#C1A674] mb-3">Core Mechanic</p>
                        <p className="text-[14px] text-[#6B6B6B] leading-relaxed font-medium line-clamp-2 uppercase">
                            {extraction?.primary_mechanic || 'Awaiting forensic deep-dive...'}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
