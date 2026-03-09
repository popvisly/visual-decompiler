"use client";

import { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { supabaseAdmin } from '@/lib/supabase';

interface Asset {
    id: string;
    file_url: string;
    brand: { name: string };
}

// API Response Type mapping
interface CompareResult {
    diagnostic_id: string;
    status: string;
    macro_synthesis: {
        primary_shift: string;
        strategic_delta_summary: string;
    };
    radar_metrics: {
        axes: string[];
        asset_a_scores: number[];
        asset_b_scores: number[];
    };
    semiotic_shifts: Array<{
        variable_isolated: string;
        asset_a_state: string;
        asset_b_state: string;
        impact_on_conversion: string;
    }>;
}

export default function DifferentialDiagnosticsPage() {
    const [vaultAssets, setVaultAssets] = useState<Asset[]>([]);
    const [assetA, setAssetA] = useState<Asset | null>(null);
    const [assetB, setAssetB] = useState<Asset | null>(null);
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<CompareResult | null>(null);

    useEffect(() => {
        async function fetchAssets() {
            const { data } = await supabaseAdmin.from('assets').select('id, file_url, brand:brands(name)').limit(10);
            if (data) setVaultAssets(data as unknown as Asset[]);
        }
        fetchAssets();
    }, []);

    const handleAnalyze = async () => {
        if (!assetA || !assetB) return;
        setStatus('analyzing');
        setResult(null);
        try {
            const res = await fetch('/api/compare', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assetAId: assetA.id, assetBId: assetB.id })
            });
            if (!res.ok) throw new Error("Analysis failed");
            const data = await res.json();
            setResult(data);
            setStatus('success');
        } catch (err) {
            setStatus('error');
        }
    };

    const chartData = result?.radar_metrics.axes.map((axis, i) => ({
        subject: axis,
        A: result.radar_metrics.asset_a_scores[i],
        B: result.radar_metrics.asset_b_scores[i],
        fullMark: 100,
    })) || [];

    return (
        <div className="min-h-screen bg-[#FBFBF6] text-[#1A1A1A] relative overflow-hidden">
            {/* 2.5% Geometric Grid Overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:40px_40px]" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-[1600px] mx-auto">
                {/* Lab Panels Section */}
                <div className="flex flex-col lg:flex-row gap-8 mb-12 relative">
                    <AssetSelectorPanel
                        label="CONTROL (ASSET A)"
                        selected={assetA}
                        onSelect={(a) => setAssetA(a)}
                        availableAssets={vaultAssets}
                    />
                    
                    {/* Central Command Hub Action */}
                    <div className="flex items-center justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20">
                        <button
                            onClick={handleAnalyze}
                            disabled={!assetA || !assetB || status === 'analyzing'}
                            className="group relative px-8 py-5 bg-[#D4A574] text-[#1A1A1A] text-[11px] font-bold tracking-[0.4em] uppercase rounded-full shadow-[0_0_30px_rgba(212,165,116,0.3)] hover:shadow-[0_0_50px_rgba(212,165,116,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                        >
                            <span className="relative z-10">
                                {status === 'analyzing' ? 'Processing Delta...' : 'Initiate Differential Diagnostic'}
                            </span>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity rounded-full" />
                        </button>
                    </div>

                    <AssetSelectorPanel
                        label="PROPOSED (ASSET B)"
                        selected={assetB}
                        onSelect={(a) => setAssetB(a)}
                        availableAssets={vaultAssets}
                    />
                </div>

                {/* Diagnostic Ledger Section */}
                <div className="border-t border-[#D4A574]/20 pt-16">
                    {status === 'idle' && (
                        <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-in fade-in duration-700">
                            {/* Comparison Matrix Data Cube Geometry Placeholder */}
                            <div className="relative w-20 h-20 opacity-20 group">
                                <div className="absolute inset-0 border border-[#1A1A1A] rotate-45 transform group-hover:rotate-90 transition-transform duration-1000" />
                                <div className="absolute inset-2 border border-[#D4A574] -rotate-12 transform group-hover:rotate-12 transition-transform duration-1000" />
                                <div className="absolute inset-6 bg-[#D4A574]" />
                            </div>
                            <div className="text-center space-y-2">
                                <span className="block text-[12px] font-bold tracking-[0.5em] uppercase text-[#1A1A1A]/40">
                                    COMPARISON MATRIX
                                </span>
                                <span className="block text-[10px] font-mono tracking-[0.3em] uppercase text-[#1A1A1A]/20">
                                    Awaiting Forensic Diagnostic Protocol
                                </span>
                            </div>
                        </div>
                    )}

                    {status === 'analyzing' && (
                        <div className="flex h-full items-center justify-center py-32">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 border-[1.5px] border-[#D4A574]/40 animate-[spin_3s_linear_infinite]" />
                                <div className="absolute inset-2 border-[1px] border-[#8B4513]/20 rotate-45 animate-[spin_4s_linear_infinite_reverse]" />
                                <div className="absolute inset-4 bg-[#D4A574] animate-pulse" />
                            </div>
                        </div>
                    )}

                    {status === 'success' && result && (
                        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <div className="mb-16 border-l-[3px] border-[#D4A574] pl-8">
                                <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1A1A1A]/40 mb-4">Macro Synthesis</h2>
                                <h1 className="text-3xl md:text-5xl font-light tracking-tightest text-[#1A1A1A] leading-[1.1] mb-6 uppercase">
                                    {result.macro_synthesis.primary_shift}
                                </h1>
                                <p className="text-[#1A1A1A]/60 max-w-3xl text-sm leading-relaxed md:text-base font-medium">
                                    {result.macro_synthesis.strategic_delta_summary}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-[#D4A574]/20 shadow-xl">
                                    <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4A574] mb-8 border-b border-[#D4A574]/10 pb-4">
                                        Strategic Topography Map
                                    </h3>
                                    <div className="w-full aspect-square relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                                                <PolarGrid stroke="#D4A574" strokeOpacity={0.1} />
                                                <PolarAngleAxis
                                                    dataKey="subject"
                                                    tick={{ fill: '#D4A574', fontSize: 9, textAnchor: 'middle', opacity: 0.6 }}
                                                    tickFormatter={(value) => value.toUpperCase()}
                                                />
                                                <Radar name="Control (A)" dataKey="A" stroke="#4A4A4A" fill="#4A4A4A" fillOpacity={0.3} strokeWidth={1} />
                                                <Radar name="Variant (B)" dataKey="B" stroke="#D4A574" fill="#D4A574" fillOpacity={0.5} strokeWidth={2} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                        <div className="absolute bottom-4 left-4 flex gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-[#4A4A4A]" />
                                                <span className="text-[8px] uppercase tracking-widest text-[#D4A574]/40 font-bold">ASSET A</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-[#D4A574]" />
                                                <span className="text-[8px] uppercase tracking-widest text-[#D4A574] font-bold">ASSET B</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-8 border-b border-[#D4A574]/10 pb-4">
                                        Variable Deltas & Conversion Impact
                                    </h3>

                                    {result.semiotic_shifts.map((shift, idx) => (
                                        <div key={idx} className="bg-white border border-[#D4A574]/20 p-8 rounded-[1.5rem] shadow-sm flex flex-col gap-6 hover:border-[#D4A574]/50 transition-all">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#1A1A1A]">
                                                    {shift.variable_isolated}
                                                </h4>
                                                <span className="text-[9px] text-[#D4A574] font-mono font-bold tracking-widest">[ VAR_{idx + 1} ]</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <span className="block text-[9px] uppercase tracking-widest text-[#1A1A1A]/30 font-bold">State A</span>
                                                    <span className="text-[#1A1A1A]/60 text-xs font-medium">{shift.asset_a_state}</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="block text-[9px] uppercase tracking-widest text-[#D4A574] font-bold">State B</span>
                                                    <span className="text-[#1A1A1A] text-xs font-bold font-serif italic">{shift.asset_b_state}</span>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-[#D4A574]/10">
                                                <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/20 font-bold block mb-2">Impact Diagnosis</span>
                                                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed italic">{shift.impact_on_conversion}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

function AssetSelectorPanel({
    label,
    selected,
    onSelect,
    availableAssets
}: {
    label: string,
    selected: Asset | null,
    onSelect: (a: Asset) => void,
    availableAssets: Asset[]
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex-1 bg-[#1A1A1A] border border-[#D4A574]/20 rounded-[2.5rem] overflow-hidden min-h-[450px] relative transition-all duration-500 hover:border-[#D4A574]/50 group shadow-2xl">
            {/* Background Media View */}
            {selected ? (
                <div className="absolute inset-0">
                    <img
                        src={selected.file_url}
                        alt="Selected Asset"
                        className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A]/80" />
                </div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <span className="text-8xl font-black tracking-tighter text-white uppercase">VAULT</span>
                </div>
            )}

            {/* Panel UI Layer */}
            <div className="relative z-10 w-full h-full p-10 flex flex-col justify-between">
                <div>
                    <h3 className="text-[11px] font-bold tracking-[0.5em] uppercase text-[#D4A574]">
                        {label}
                    </h3>
                    {selected && (
                        <div className="mt-4 animate-in fade-in slide-in-from-left-4 duration-500">
                            <span className="block text-2xl font-light tracking-tight text-white uppercase">{selected.brand.name}</span>
                            <span className="text-[10px] text-[#D4A574]/50 font-mono tracking-widest uppercase">ID: {selected.id.split('-')[0]}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    <div className="relative w-full max-w-[240px]">
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full bg-transparent border border-[#D4A574]/40 hover:border-[#D4A574] hover:bg-[#D4A574]/5 py-4 transition-all text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4A574] rounded-full"
                        >
                            {selected ? '[ CHANGE ASSET ]' : '[ SELECT FROM VAULT ]'}
                        </button>

                        {open && (
                            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-80 bg-[#1A1A1A] border border-[#D4A574]/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-50 rounded-3xl overflow-hidden max-h-96">
                                <div className="p-4 border-b border-[#D4A574]/10 bg-[#1A1A1A] text-[9px] uppercase tracking-[0.4em] text-[#D4A574]/40 font-bold">
                                    INTELLIGENCE VAULT MANIFEST
                                </div>
                                <div className="overflow-y-auto max-h-[300px] scrollbar-hide">
                                    {availableAssets.map(a => (
                                        <button
                                            key={a.id}
                                            onClick={() => { onSelect(a); setOpen(false); }}
                                            className="w-full flex items-center gap-4 p-4 border-b border-[#D4A574]/5 hover:bg-[#D4A574]/10 text-left transition-colors group/item"
                                        >
                                            <div className="w-12 h-12 bg-black border border-[#D4A574]/20 rounded-lg overflow-hidden shrink-0">
                                                <img src={a.file_url} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A574]/60 group-hover/item:text-[#D4A574] truncate">{a.brand?.name || 'Unknown'}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-[#D4A574]/20" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-[#D4A574]/20" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-[#D4A574]/20" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-[#D4A574]/20" />
        </div>
    );
}
