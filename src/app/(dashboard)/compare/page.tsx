"use client";

import { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { supabaseAdmin } from '@/lib/supabase';

interface Asset {
    id: string;
    file_url: string;
    brand: { name: string };
    extractions?: {
        primary_mechanic: string;
    };
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
            // Updated query to fetch brand and primary mechanic
            const { data } = await supabaseAdmin
                .from('assets')
                .select('id, file_url, brand:brands(name), extractions(primary_mechanic)')
                .limit(20);
            
            if (data) {
                // Formatting data to match interface
                const formatted = data.map((item: any) => ({
                    ...item,
                    extractions: item.extractions?.[0] || item.extractions // Handle potential array return
                }));
                setVaultAssets(formatted as Asset[]);
            }
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

    const isReady = assetA && assetB && status !== 'analyzing';

    return (
        <div className="min-h-screen bg-[#FBFBF6] text-[#1A1A1A] relative overflow-hidden">
            {/* pulse animation for button */}
            <style jsx global>{`
                @keyframes tanPulse {
                    0% { box-shadow: 0 0 30px rgba(212,165,116,0.3); }
                    50% { box-shadow: 0 0 60px rgba(212,165,116,0.6); }
                    100% { box-shadow: 0 0 30px rgba(212,165,116,0.3); }
                }
                .tan-pulse {
                    animation: tanPulse 2s infinite ease-in-out;
                }
            `}</style>

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
                            disabled={!isReady}
                            className={`group relative px-8 py-5 bg-[#D4A574] text-[#1A1A1A] text-[11px] font-bold tracking-[0.4em] uppercase rounded-full transition-all disabled:opacity-50 disabled:grayscale ${isReady ? 'tan-pulse hover:scale-105 active:scale-95' : ''}`}
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
                                <span className="block text-[12px] font-bold tracking-[0.5em] uppercase text-[#D4A574]">
                                    AWAITING DIFFERENTIAL PARSING...
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
            {selected && (
                <div className="absolute inset-0">
                    <img
                        src={selected.file_url}
                        alt="Selected Asset"
                        className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A]/80" />
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
                    <div className="relative w-full max-w-[260px]">
                        <button
                            onClick={() => setOpen(true)}
                            className="w-full bg-transparent border border-[#D4A574]/40 hover:border-[#D4A574] hover:bg-[#D4A574]/5 py-4 transition-all text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4A574] rounded-full"
                        >
                            {selected ? '[ CHANGE ASSET ]' : '[ SELECT ASSET FROM ARCHIVE ]'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Selection Drawer (Modal Over Right Side) */}
            {open && (
                <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
                    <div className="relative w-full max-w-md bg-[#FBFBF6] h-screen shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
                        <div className="p-8 border-b border-[#1A1A1A]/10 flex justify-between items-center bg-[#1A1A1A]">
                            <div className="space-y-1">
                                <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D4A574]">INTELLIGENCE ARCHIVE</h2>
                                <p className="text-[9px] text-[#D4A574]/50 font-mono tracking-[0.2em] uppercase transition-opacity">Select forensic footprint</p>
                            </div>
                            <button 
                                onClick={() => setOpen(false)}
                                className="text-[#D4A574] hover:scale-110 transition-transform p-2 border border-[#D4A574]/20 rounded-full"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                            {availableAssets.map(a => (
                                <button
                                    key={a.id}
                                    onClick={() => { onSelect(a); setOpen(false); }}
                                    className="w-full group/item flex items-center gap-6 p-4 bg-white border border-[#1A1A1A]/5 rounded-2xl hover:border-[#D4A574] hover:shadow-lg transition-all"
                                >
                                    <div className="w-16 h-16 bg-[#1A1A1A] rounded-xl overflow-hidden shrink-0 border border-[#1A1A1A]/10">
                                        <img src={a.file_url} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] group-hover/item:text-[#D4A574] transition-colors">{a.brand?.name || 'Unknown'}</span>
                                        <span className="text-[9px] font-bold text-[#D4A574] uppercase tracking-[0.2em] mt-1">
                                            {a.extractions?.primary_mechanic || 'ANALYSIS PENDING'}
                                        </span>
                                        <span className="text-[9px] font-mono text-[#1A1A1A]/40 uppercase tracking-tighter mt-1">Footprint ID: {a.id.split('-')[0]}</span>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity">
                                        <div className="w-6 h-6 border border-[#D4A574] rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-[#D4A574] rounded-full" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        
                        <div className="p-8 border-t border-[#1A1A1A]/5 bg-white/50">
                            <button 
                                onClick={() => setOpen(false)}
                                className="w-full py-4 text-[10px] font-bold tracking-[0.3em] uppercase text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                            >
                                [ CANCEL SELECTION ]
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Corner Accents */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-[#D4A574]/20" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-[#D4A574]/20" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-[#D4A574]/20" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-[#D4A574]/20" />
        </div>
    );
}
