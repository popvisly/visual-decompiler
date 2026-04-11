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

    // Fetch mock assets from DB to use in the selector
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
            // Silently handle or expose explicitly to UI
            setStatus('error');
        }
    };

    // Convert API radar data to Recharts format
    const chartData = result?.radar_metrics.axes.map((axis, i) => ({
        subject: axis,
        A: result.radar_metrics.asset_a_scores[i],
        B: result.radar_metrics.asset_b_scores[i],
        fullMark: 100,
    })) || [];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* 50/50 Image Split Section */}
            <div className="flex-1 flex flex-col md:flex-row border-b border-neutral-800 relative">
                <AssetSelectorPanel
                    label="Control (Asset A)"
                    selected={assetA}
                    onSelect={(a) => setAssetA(a)}
                    availableAssets={vaultAssets}
                    side="left"
                />
                <div className="w-px bg-neutral-800 hidden md:block" />
                <AssetSelectorPanel
                    label="Proposed (Asset B)"
                    selected={assetB}
                    onSelect={(a) => setAssetB(a)}
                    availableAssets={vaultAssets}
                    side="right"
                />

                {/* Action Button positioned over the seam */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
                    <div className="bg-black p-2 border border-neutral-800 rounded-none shadow-2xl">
                        <button
                            onClick={handleAnalyze}
                            disabled={!assetA || !assetB || status === 'analyzing'}
                            className="bg-neutral-900 border border-neutral-700 hover:bg-white hover:text-black transition-colors px-6 py-4 font-sans text-[10px] font-bold tracking-[0.2em] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'analyzing' ? 'Processing Delta...' : 'Initiate Differential Diagnostic'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Action Button */}
            <div className="md:hidden p-4 border-b border-neutral-800 flex justify-center bg-black">
                <button
                    onClick={handleAnalyze}
                    disabled={!assetA || !assetB || status === 'analyzing'}
                    className="bg-neutral-900 border border-neutral-700 hover:bg-white hover:text-black w-full py-4 text-[10px] font-bold tracking-widest uppercase"
                >
                    {status === 'analyzing' ? 'Processing...' : 'Initiate Diagnostic'}
                </button>
            </div>

            {/* Results Workspace */}
            <div className="p-8 md:p-16 min-h-[50vh] relative">
                {status === 'idle' && (
                    <div className="flex h-full items-center justify-center opacity-30 text-neutral-500 font-sans text-[10px] uppercase tracking-[0.3em]">
                        Awaiting Command
                    </div>
                )}

                {status === 'analyzing' && (
                    <div className="flex h-full items-center justify-center py-20">
                        {/* Sleek Geometric Indeterminate Loader */}
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-[1px] border-neutral-700 animate-[spin_3s_linear_infinite]" />
                            <div className="absolute inset-2 border-[1px] border-neutral-500 rotate-45 animate-[spin_4s_linear_infinite_reverse]" />
                            <div className="absolute inset-4 bg-white animate-pulse" />
                        </div>
                    </div>
                )}

                {status === 'success' && result && (
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        {/* Header: Macro Synthesis */}
                        <div className="mb-16 border-l-[3px] border-neutral-300 pl-6">
                            <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-500 mb-4">Macro Synthesis</h2>
                            <h1 className="text-3xl md:text-5xl font-light tracking-tightest text-white leading-[1.1] mb-6">
                                {result.macro_synthesis.primary_shift}
                            </h1>
                            <p className="text-neutral-400 max-w-3xl text-sm leading-relaxed md:text-base">
                                {result.macro_synthesis.strategic_delta_summary}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Left Col: The Radar Chart */}
                            <div>
                                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-8 border-b border-neutral-800 pb-4">
                                    Strategic Topography Map
                                </h3>
                                <div className="w-full aspect-square relative bg-neutral-950 border border-neutral-800">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                                            <PolarGrid stroke="#333333" strokeDasharray="3 3" />
                                            <PolarAngleAxis
                                                dataKey="subject"
                                                tick={{ fill: '#888888', fontSize: 10, textAnchor: 'middle' }}
                                                tickFormatter={(value) => value.toUpperCase()}
                                            />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            {/* Asset A (Control) - Muted Slate */}
                                            <Radar name="Control (A)" dataKey="A" stroke="#52525B" fill="#52525B" fillOpacity={0.4} strokeWidth={1} />
                                            {/* Asset B (Variant) - Stark White/Light Gray */}
                                            <Radar name="Variant (B)" dataKey="B" stroke="#F4F4F5" fill="#F4F4F5" fillOpacity={0.6} strokeWidth={2} />
                                        </RadarChart>
                                    </ResponsiveContainer>

                                    {/* Legend Overlay */}
                                    <div className="absolute bottom-4 left-4 flex gap-6">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 bg-zinc-600/40 border border-zinc-600" />
                                            <span className="text-[9px] uppercase tracking-widest text-neutral-500">Asset A</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 bg-zinc-100/60 border border-white" />
                                            <span className="text-[9px] uppercase tracking-widest text-white">Asset B</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Semiotic Shifts Data Cards */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-8 border-b border-neutral-800 pb-4">
                                    Variable Deltas & Conversion Impact
                                </h3>

                                {result.semiotic_shifts.map((shift, idx) => (
                                    <div key={idx} className="bg-neutral-950 border border-neutral-800 p-6 flex flex-col gap-4 group hover:border-neutral-600 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white">
                                                {shift.variable_isolated}
                                            </h4>
                                            <span className="text-[9px] text-neutral-600 font-mono tracking-widest">
                                                VAR_{idx + 1}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                                            <div className="pr-4 border-r border-neutral-800">
                                                <span className="block text-[9px] uppercase tracking-widest text-neutral-600 mb-1">State A</span>
                                                <span className="text-neutral-400">{shift.asset_a_state}</span>
                                            </div>
                                            <div className="pl-2">
                                                <span className="block text-[9px] uppercase tracking-widest text-neutral-600 mb-1">State B</span>
                                                <span className="text-white">{shift.asset_b_state}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-neutral-900">
                                            <span className="text-[9px] uppercase tracking-widest text-neutral-500 block mb-1">Impact Diagnosis</span>
                                            <p className="text-sm text-neutral-300 italic">"{shift.impact_on_conversion}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
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
    availableAssets,
    side
}: {
    label: string,
    selected: Asset | null,
    onSelect: (a: Asset) => void,
    availableAssets: Asset[],
    side: 'left' | 'right'
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex-1 min-h-[40vh] md:min-h-[50vh] relative group bg-neutral-950">
            {/* Background Image if selected */}
            {selected ? (
                <img
                    src={selected.file_url}
                    alt="Selected Asset"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale transition-all group-hover:opacity-70 group-hover:grayscale-0"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-10 font-sans text-4xl font-light tracking-tighter mix-blend-overlay pointer-events-none">
                    {side === 'left' ? 'CONTROL' : 'VARIANT'}
                </div>
            )}

            {/* Selector UI Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 bg-gradient-to-b from-black/80 via-transparent to-black/80">
                <div>
                    <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">
                        {label}
                    </h3>
                </div>

                <div className="flex justify-center pb-8 md:pb-0">
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="bg-black border border-neutral-700 hover:border-white px-6 py-3 transition-colors text-[10px] font-bold tracking-widest uppercase"
                        >
                            {selected ? 'Change Asset' : 'Select from Vault'}
                        </button>

                        {open && (
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-80 bg-black border border-neutral-800 shadow-2xl z-50 max-h-96 overflow-y-auto">
                                <div className="p-3 border-b border-neutral-800 bg-neutral-950 text-[9px] uppercase tracking-widest text-neutral-500">
                                    Intelligence Vault Manifest
                                </div>
                                {availableAssets.map(a => (
                                    <button
                                        key={a.id}
                                        onClick={() => { onSelect(a); setOpen(false); }}
                                        className="w-full flex items-center gap-4 p-3 border-b border-neutral-900 hover:bg-neutral-900 text-left transition-colors"
                                    >
                                        <img src={a.file_url} className="w-10 h-10 object-cover grayscale" />
                                        <span className="text-xs uppercase tracking-wide truncate max-w-[200px]">{a.brand?.name || 'Unknown'}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
