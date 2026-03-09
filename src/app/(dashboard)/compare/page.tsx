"use client";

import { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { supabaseAdmin } from '@/lib/supabase';
import { Asset } from '@/lib/intelligence_service';
import IntelligenceArchiveDrawer from '@/components/IntelligenceArchiveDrawer';

// API Response Type mapping
interface DifferentialDiagnosticResponse {
    diagnostic_id: string;
    status: 'success' | 'error';
    macro_synthesis: {
        primary_shift: string;
        strategic_delta_summary: string;
    };
    matrix_cubes: {
        winning_variant: {
            label: string;
            rationale: string;
            winner: 'a' | 'b';
        };
        psychological_edge: {
            trigger: string;
            delta: string;
        };
        fatigue_differential: {
            longevity_delta: string;
            comparison: string;
        };
    };
    behavioral_bars: {
        persuasion_density: { a: number; b: number };
        cognitive_friction: { a: number; b: number };
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
    const [result, setResult] = useState<DifferentialDiagnosticResponse | null>(null);
    const [agency, setAgency] = useState<{ name: string; is_whitelabel_active: boolean } | null>(null);

    useEffect(() => {
        async function fetchAgency() {
            const { data } = await supabaseAdmin
                .from('agencies')
                .select('name, is_whitelabel_active')
                .limit(1)
                .single();
            if (data) setAgency(data);
        }
        fetchAgency();

        // Load Persistent Workspace
        const savedA = localStorage.getItem('pulse_asset_a');
        const savedB = localStorage.getItem('pulse_asset_b');
        const savedResults = localStorage.getItem('pulse_results');

        if (savedA) setAssetA(JSON.parse(savedA));
        if (savedB) setAssetB(JSON.parse(savedB));
        if (savedResults) {
            setResult(JSON.parse(savedResults));
            setStatus('success');
        }

        async function fetchAssets() {
            const { data } = await supabaseAdmin
                .from('assets')
                .select('id, file_url, brand:brands(name), extractions(primary_mechanic)')
                .limit(20);
            
            if (data) {
                const formatted = data.map((item: any) => ({
                    ...item,
                    extractions: item.extractions?.[0] || item.extractions
                }));
                setVaultAssets(formatted as Asset[]);
            }
        }
        fetchAssets();
    }, []);

    // Sync state to localStorage
    useEffect(() => {
        if (assetA) localStorage.setItem('pulse_asset_a', JSON.stringify(assetA));
        else localStorage.removeItem('pulse_asset_a');
    }, [assetA]);

    useEffect(() => {
        if (assetB) localStorage.setItem('pulse_asset_b', JSON.stringify(assetB));
        else localStorage.removeItem('pulse_asset_b');
    }, [assetB]);

    useEffect(() => {
        if (result) localStorage.setItem('pulse_results', JSON.stringify(result));
        else localStorage.removeItem('pulse_results');
    }, [result]);

    const [drawerState, setDrawerState] = useState<{ open: boolean, target: 'A' | 'B' | null }>({ open: false, target: null });

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

    const handleReset = () => {
        if (confirm("CLEAR ALL ACTIVE DIAGNOSTICS? [ YES ]")) {
            setAssetA(null);
            setAssetB(null);
            setResult(null);
            setStatus('idle');
            localStorage.removeItem('pulse_asset_a');
            localStorage.removeItem('pulse_asset_b');
            localStorage.removeItem('pulse_results');
        }
    };

    const chartData = result?.radar_metrics.axes.map((axis, i) => ({
        subject: axis,
        A: result.radar_metrics.asset_a_scores[i],
        B: result.radar_metrics.asset_b_scores[i],
        fullMark: 100,
    })) || [];

    const isReady = assetA && assetB && status !== 'analyzing';
    
    // Check if current assets already match cached results
    const hasCachedResults = result && assetA && assetB; // Simplification: any result counts as "cached" if assets are present
    const buttonLabel = status === 'analyzing' 
        ? 'Processing Delta...' 
        : hasCachedResults 
            ? '[ RE-RUN DIFFERENTIAL ]' 
            : 'Initiate Differential Diagnostic';

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
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
            `}</style>

            {/* 2.5% Geometric Grid Overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:40px_40px]" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-[1600px] mx-auto">
                {/* Header Actions */}
                <div className="flex justify-end mb-8">
                    <button 
                        onClick={handleReset}
                        className="group flex items-center gap-3 px-6 py-3 border border-[#1A1A1A]/10 hover:border-[#D4A574]/40 rounded-full transition-all bg-white/40 backdrop-blur-sm"
                    >
                        <div className="w-1.5 h-1.5 bg-[#D4A574]/40 group-hover:bg-[#D4A574] rounded-full transition-colors" />
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#1A1A1A]/40 group-hover:text-[#D4A574] transition-colors">
                            [ RESET LABORATORY ]
                        </span>
                    </button>
                </div>

                {/* Lab Panels Section */}
                <div className="flex flex-col lg:flex-row gap-8 mb-12 relative">
                    <AssetSelectorPanel
                        label="CONTROL (ASSET A)"
                        selected={assetA}
                        onOpenDrawer={() => setDrawerState({ open: true, target: 'A' })}
                    />
                    
                    {/* Central Command Hub Action */}
                    <div className="flex items-center justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20">
                        <button
                            onClick={handleAnalyze}
                            disabled={!isReady}
                            className={`group relative px-8 py-5 bg-[#D4A574] text-[#1A1A1A] text-[11px] font-bold tracking-[0.4em] uppercase rounded-full transition-all disabled:opacity-50 disabled:grayscale ${isReady ? 'tan-pulse hover:scale-105 active:scale-95' : ''}`}
                        >
                            <span className="relative z-10">
                                {buttonLabel}
                            </span>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity rounded-full" />
                        </button>
                    </div>

                    <AssetSelectorPanel
                        label="PROPOSED (ASSET B)"
                        selected={assetB}
                        onOpenDrawer={() => setDrawerState({ open: true, target: 'B' })}
                    />

                    {/* New Forensic Archive Drawer */}
                    <IntelligenceArchiveDrawer 
                        isOpen={drawerState.open}
                        label={drawerState.target === 'A' ? 'CONTROL (ASSET A)' : 'PROPOSED (ASSET B)'}
                        onClose={() => setDrawerState({ open: false, target: null })}
                        onSelect={(asset) => {
                            if (drawerState.target === 'A') setAssetA(asset);
                            else setAssetB(asset);
                            setDrawerState({ open: false, target: null });
                        }}
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
                        <div className="flex flex-col items-center justify-center py-32 space-y-12 animate-in fade-in duration-500">
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 border-[1.5px] border-[#D4A574]/40 animate-[spin_4s_linear_infinite]" />
                                <div className="absolute inset-4 border-[1px] border-[#D4A574]/20 -rotate-45 animate-[spin_6s_linear_infinite_reverse]" />
                                <div className="absolute inset-8 bg-[#D4A574] animate-pulse rounded-sm" />
                            </div>
                            
                            <div className="w-full max-w-md space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D4A574] animate-pulse">
                                        CALIBRATING PERSUASION DELTA...
                                    </span>
                                    <span className="text-[9px] font-mono text-[#D4A574]/40">EST_LOAD: 8.2s</span>
                                </div>
                                <div className="h-[1px] w-full bg-[#1A1A1A]/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#D4A574] w-1/3 animate-[loading_3s_ease-in-out_infinite]" />
                                </div>
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

                            {/* COMPARISON MATRIX & BEHAVIORAL BARS */}
                            <div className="mt-24 space-y-16">
                                <div className="border-t border-[#D4A574]/10 pt-16">
                                    <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#1A1A1A]/40 mb-12 text-center">
                                        {agency?.is_whitelabel_active ? (agency.name || 'DECOMPILER') : 'VISUAL DECOMPILER'} COMPARISON MATRIX
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {/* Winning Variant Cube */}
                                        <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-[#D4A574]/30 shadow-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4">
                                                <div className="w-2 h-2 bg-[#D4A574] rounded-full animate-pulse" />
                                            </div>
                                            
                                            {/* Winning Asset Thumbnail with Glow */}
                                            <div className="mb-6 relative h-20 w-full overflow-hidden rounded-xl border border-[#D4A574]/10">
                                                <img 
                                                    src={result.matrix_cubes.winning_variant.winner === 'a' ? assetA?.file_url : assetB?.file_url} 
                                                    className="w-full h-full object-cover grayscale opacity-40" 
                                                    style={{ boxShadow: '0 0 20px rgba(212,165,116,0.4)' }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
                                            </div>

                                            <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#D4A574]/60 mb-2">Winning Variant</h4>
                                            <div className="text-2xl font-light tracking-tight text-white mb-4 uppercase">
                                                {result.matrix_cubes.winning_variant.label}
                                            </div>
                                            <p className="text-[11px] text-[#D4A574]/40 leading-relaxed uppercase tracking-wider">
                                                {result.matrix_cubes.winning_variant.rationale}
                                            </p>
                                        </div>

                                        {/* Psychological Edge Cube */}
                                        <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-[#D4A574]/10 shadow-xl">
                                            <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#D4A574]/60 mb-6">Psychological Edge</h4>
                                            <div className="text-xl font-bold tracking-widest text-[#D4A574] mb-2 uppercase">
                                                {result.matrix_cubes.psychological_edge.trigger}
                                            </div>
                                            <div className="text-[11px] text-white/60 font-mono tracking-widest uppercase">
                                                {result.matrix_cubes.psychological_edge.delta}
                                            </div>
                                        </div>

                                        {/* Fatigue Differential Cube */}
                                        <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-[#D4A574]/10 shadow-xl">
                                            <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#D4A574]/60 mb-6">Fatigue Differential</h4>
                                            <div className="text-3xl font-light tracking-tighter text-white mb-2 uppercase">
                                                {result.matrix_cubes.fatigue_differential.longevity_delta}
                                            </div>
                                            <p className="text-[11px] text-[#D4A574]/40 leading-relaxed uppercase tracking-wider">
                                                {result.matrix_cubes.fatigue_differential.comparison}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-8">
                                    {/* Persuasion Density Bars */}
                                    <div className="space-y-8">
                                        <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#1A1A1A]/40 border-b border-[#D4A574]/10 pb-4">
                                            Persuasion Density
                                        </h4>
                                        <div className="space-y-10">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/40 uppercase">ASSET A</span>
                                                    <span className="text-2xl font-light tracking-tighter text-[#1A1A1A]">{result.behavioral_bars.persuasion_density.a}%</span>
                                                </div>
                                                <div className="h-[2px] w-full bg-[#1A1A1A]/5 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-[#4A4A4A] transition-all duration-1000 ease-out"
                                                        style={{ width: `${result.behavioral_bars.persuasion_density.a}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[9px] font-bold tracking-widest text-[#D4A574] uppercase">ASSET B</span>
                                                    <span className="text-2xl font-light tracking-tighter text-[#1A1A1A]">{result.behavioral_bars.persuasion_density.b}%</span>
                                                </div>
                                                <div className="h-[2px] w-full bg-[#1A1A1A]/5 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-[#D4A574] transition-all duration-1000 ease-out"
                                                        style={{ width: `${result.behavioral_bars.persuasion_density.b}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cognitive Friction Bars */}
                                    <div className="space-y-8">
                                        <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#1A1A1A]/40 border-b border-[#D4A574]/10 pb-4">
                                            Cognitive Friction
                                        </h4>
                                        <div className="space-y-10">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/40 uppercase">ASSET A</span>
                                                    <span className="text-2xl font-light tracking-tighter text-[#1A1A1A]">{result.behavioral_bars.cognitive_friction.a}%</span>
                                                </div>
                                                <div className="h-[2px] w-full bg-[#1A1A1A]/5 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-[#4A4A4A] transition-all duration-1000 ease-out"
                                                        style={{ width: `${result.behavioral_bars.cognitive_friction.a}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[9px] font-bold tracking-widest text-[#D4A574] uppercase">ASSET B</span>
                                                    <span className="text-2xl font-light tracking-tighter text-[#1A1A1A]">{result.behavioral_bars.cognitive_friction.b}%</span>
                                                </div>
                                                <div className="h-[2px] w-full bg-[#1A1A1A]/5 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-[#D4A574] transition-all duration-1000 ease-out"
                                                        style={{ width: `${result.behavioral_bars.cognitive_friction.b}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
    onOpenDrawer
}: {
    label: string,
    selected: Asset | null,
    onOpenDrawer: () => void
}) {
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
                            onClick={onOpenDrawer}
                            className="w-full bg-transparent border border-[#D4A574]/40 hover:border-[#D4A574] hover:bg-[#D4A574]/5 py-4 transition-all text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4A574] rounded-full"
                        >
                            {selected ? '[ CHANGE ASSET ]' : '[ SELECT ASSET FROM ARCHIVE ]'}
                        </button>
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
