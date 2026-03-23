"use client";

import { useState, useEffect, useRef } from 'react';
import posthog from 'posthog-js';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { supabaseAdmin } from '@/lib/supabase';
import { Asset } from '@/lib/intelligence_service';
import IntelligenceArchiveDrawer from '@/components/IntelligenceArchiveDrawer';
import { FileDown } from 'lucide-react';

type PulseAsset = Asset & {
    brand: {
        name: string;
        market_sector?: string;
    };
    extractions?: {
        primary_mechanic: string;
        confidence_score?: number;
        full_dossier?: {
            archetype_mapping?: {
                target_posture?: string;
            };
            persuasion_metrics?: {
                predictive_longevity?: string;
            };
        };
    };
};

// API Response Type mapping
interface DifferentialDiagnosticResponse {
    pulse_result_id?: string | null;
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

function firstSentence(value?: string | null) {
    if (!value) return '';

    const trimmed = value.trim();
    const match = trimmed.match(/^.*?[.!?](?:\s|$)/);
    return (match?.[0] || trimmed).trim();
}

export default function DifferentialDiagnosticsPage() {
    const [vaultAssets, setVaultAssets] = useState<PulseAsset[]>([]);
    const [assetA, setAssetA] = useState<PulseAsset | null>(null);
    const [assetB, setAssetB] = useState<PulseAsset | null>(null);
    const [status, setStatus] = useState<'idle' | 'analysing' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<DifferentialDiagnosticResponse | null>(null);
    const [agency, setAgency] = useState<{ name: string; is_whitelabel_active: boolean } | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [loadingLabelIndex, setLoadingLabelIndex] = useState(0);
    const [preparedFor, setPreparedFor] = useState('');
    const [exportPreset, setExportPreset] = useState<'standard' | 'pitch'>('standard');
    const printRef = useRef<HTMLDivElement>(null);

    const loadingLabels = [
        'Isolating persuasion deltas',
        'Comparing trigger mechanics',
        'Mapping strategic divergence',
        'Synthesizing conversion impact',
    ];

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
                .select('id, file_url, type, brand:brands(name, market_sector), extractions(primary_mechanic, confidence_score, full_dossier)')
                .limit(20);
            
            if (data) {
                const formatted = data.map((item: any) => ({
                    ...item,
                    extractions: item.extractions?.[0] || item.extractions
                }));
                setVaultAssets(formatted as PulseAsset[]);
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

    const handleAnalyse = async () => {
        if (!assetA || !assetB) return;
        setStatus('analysing');
        setResult(null);
        setErrorMessage(null);
        setAnalysisProgress(7);
        setElapsedSeconds(0);
        setLoadingLabelIndex(0);
        try {
            const res = await fetch('/api/compare', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assetAId: assetA.id, assetBId: assetB.id })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || 'Differential diagnostic failed');
            }
            setAnalysisProgress(100);
            setResult(data);
            setStatus('success');
            if (!window.localStorage.getItem('vd_trial_try_2_completed')) {
                posthog.capture('trial_try_2_completed', {
                    surface: 'compare',
                    step: 'try_2',
                    asset_a_id: assetA.id,
                    asset_b_id: assetB.id,
                });
                window.localStorage.setItem('vd_trial_try_2_completed', '1');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Differential diagnostic failed';
            setErrorMessage(message);
            setStatus('error');
        }
    };

    const handleReset = () => {
        if (confirm("CLEAR ALL ACTIVE DIAGNOSTICS? [ YES ]")) {
            setAssetA(null);
            setAssetB(null);
            setResult(null);
            setStatus('idle');
            setErrorMessage(null);
            setAnalysisProgress(0);
            setElapsedSeconds(0);
            localStorage.removeItem('pulse_asset_a');
            localStorage.removeItem('pulse_asset_b');
            localStorage.removeItem('pulse_results');
        }
    };

    useEffect(() => {
        if (status !== 'analysing') return;

        const progressInterval = setInterval(() => {
            setAnalysisProgress((prev) => {
                if (prev >= 95) return 95;
                const increment = prev < 45 ? 6 : prev < 75 ? 4 : 2;
                return Math.min(95, prev + increment);
            });
        }, 1400);

        const elapsedInterval = setInterval(() => {
            setElapsedSeconds((prev) => prev + 1);
        }, 1000);

        const labelInterval = setInterval(() => {
            setLoadingLabelIndex((prev) => (prev + 1) % loadingLabels.length);
        }, 2600);

        return () => {
            clearInterval(progressInterval);
            clearInterval(elapsedInterval);
            clearInterval(labelInterval);
        };
    }, [status]);

    const chartData = result?.radar_metrics.axes.map((axis, i) => ({
        subject: axis,
        A: result.radar_metrics.asset_a_scores[i],
        B: result.radar_metrics.asset_b_scores[i],
        fullMark: 100,
    })) || [];

    const isReady = assetA && assetB && status !== 'analysing';
    const selectedCount = Number(Boolean(assetA)) + Number(Boolean(assetB));
    const compareProgressLabel = selectedCount === 2 ? '2 / 2 ready' : `${selectedCount} / 2 selected`;
    
    // Check if current assets already match cached results
    const hasCachedResults = result && assetA && assetB; // Simplification: any result counts as "cached" if assets are present
    const buttonLabel = status === 'analysing' 
        ? 'Processing Delta...' 
        : hasCachedResults 
            ? '[ RE-RUN DIFFERENTIAL ]' 
            : 'Initiate Differential Diagnostic';

    const handleExportDifferentialDossier = () => {
        if (!result || !assetA || !assetB) return;

        const originalTitle = document.title;
        document.body.classList.add('printing-differential');

        const cleanup = () => {
            document.title = originalTitle;
            document.body.classList.remove('printing-differential');
            window.removeEventListener('afterprint', cleanup);
        };

        window.addEventListener('afterprint', cleanup);
        document.title = '';
        window.setTimeout(cleanup, 10000);
        requestAnimationFrame(() => window.print());
    };

    const persuasionDelta = result
        ? result.behavioral_bars.persuasion_density.b - result.behavioral_bars.persuasion_density.a
        : 0;
    const frictionDelta = result
        ? result.behavioral_bars.cognitive_friction.b - result.behavioral_bars.cognitive_friction.a
        : 0;
    const pitchNarrative = result && assetA && assetB
        ? {
            problem: `The category is compressing around familiar creative patterns, making it harder for ${assetB.brand.name} to claim a sharper strategic position without clear evidence.`,
            insight:
                firstSentence(result.macro_synthesis.primary_shift) ||
                firstSentence(result.macro_synthesis.strategic_delta_summary) ||
                'The diagnostic surfaced a meaningful strategic difference between the control and proposed routes.',
            recommendation:
                firstSentence(result.matrix_cubes.winning_variant.rationale) ||
                `Prioritise ${result.matrix_cubes.winning_variant.label} as the route with the stronger client-facing case.`,
            strategicDelta:
                firstSentence(result.macro_synthesis.strategic_delta_summary) ||
                'The differential layer is directional for now, but it already shows a clearer strategic advantage for the recommended route.',
        }
        : null;

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
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .differential-print-layout,
                    .differential-print-layout * {
                        visibility: visible;
                    }
                    .differential-print-layout {
                        position: absolute;
                        inset: 0;
                        background: white;
                        color: #1A1A1A;
                        display: block !important;
                    }
                    .differential-section {
                        break-before: page;
                        page-break-before: always;
                    }
                    .differential-section:first-child {
                        break-before: avoid;
                        page-break-before: avoid;
                    }
                    .differential-block {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }
                    @page {
                        size: A4;
                        margin: 18mm 16mm;
                    }
                }
            `}</style>

            {/* 2.5% Geometric Grid Overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:40px_40px]" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-[1600px] mx-auto">
                {/* Header Actions */}
                <div className="flex flex-col gap-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#D4A574]/20 pb-8">
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#D4A574] mb-4">Intelligence Pulse</p>
                            <h1 className="text-4xl md:text-6xl font-light tracking-tightest uppercase text-[#1A1A1A] leading-[0.92]">
                                Differential
                                <br />
                                Diagnostic
                            </h1>
                            <p className="mt-5 max-w-2xl text-[12px] font-medium uppercase tracking-[0.18em] text-[#1A1A1A]/45">
                                Choose two assets from the Intelligence Vault and surface the strategic delta, persuasion lift, and fatigue gap.
                            </p>
                        </div>

                        <div className="flex justify-end">
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
                    </div>

                    {status === 'analysing' && (
                        <div className="rounded-[2rem] border border-[#D4A574]/20 bg-white/70 px-6 py-6 shadow-sm">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4A574]">
                                        {loadingLabels[loadingLabelIndex]}
                                    </p>
                                    <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#1A1A1A]/45">
                                        Elapsed {elapsedSeconds}s
                                    </p>
                                </div>
                                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1A1A1A]/55">
                                    {analysisProgress}% complete
                                </div>
                            </div>
                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#EDE8DE]">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] transition-all duration-1000"
                                    style={{ width: `${analysisProgress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-8 rounded-[2rem] border border-[#D4A574]/18 bg-white px-6 py-6 shadow-sm">
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Setup Path</p>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                <div className={`rounded-[1.4rem] border px-4 py-4 ${assetA ? 'border-[#D4A574]/40 bg-[#FBF7EF]' : 'border-[#E7DED1] bg-[#FCFAF5]'}`}>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Step A</p>
                                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.06em] text-[#1A1A1A]">Select Control Asset</p>
                                    <p className="mt-2 text-[12px] leading-relaxed text-[#6B6B6B]">
                                        {assetA ? `${assetA.brand.name} loaded as control.` : 'Choose the baseline asset you want every other route measured against.'}
                                    </p>
                                </div>
                                <div className={`rounded-[1.4rem] border px-4 py-4 ${assetB ? 'border-[#D4A574]/40 bg-[#FBF7EF]' : 'border-[#E7DED1] bg-[#FCFAF5]'}`}>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Step B</p>
                                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.06em] text-[#1A1A1A]">Select Proposed Asset</p>
                                    <p className="mt-2 text-[12px] leading-relaxed text-[#6B6B6B]">
                                        {assetB ? `${assetB.brand.name} loaded as proposed route.` : 'Choose the challenger route so the diagnostic can calculate lift, fatigue, and strategic delta.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="min-w-[210px] rounded-[1.4rem] border border-[#D4A574]/18 bg-[#141414] px-5 py-5 text-[#FBF7EF]">
                            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Progress State</p>
                            <p className="mt-3 text-2xl font-light uppercase tracking-tight">{compareProgressLabel}</p>
                            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/55">
                                {isReady ? 'Differential diagnostic unlocked' : 'Select both assets to unlock the diagnostic'}
                            </p>
                        </div>
                    </div>
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
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={handleAnalyse}
                                disabled={!isReady}
                                className={`group relative px-8 py-5 bg-[#D4A574] text-[#1A1A1A] text-[11px] font-bold tracking-[0.4em] uppercase rounded-full transition-all disabled:opacity-50 disabled:grayscale ${isReady ? 'tan-pulse hover:scale-105 active:scale-95' : ''}`}
                            >
                                <span className="relative z-10">
                                    {buttonLabel}
                                </span>
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity rounded-full" />
                            </button>
                            <p className="max-w-[220px] text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A]/45">
                                {isReady ? 'Both assets selected. Run the differential now.' : 'Select control and proposed assets to enable the diagnostic.'}
                            </p>
                        </div>
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
                            if (drawerState.target === 'A') setAssetA(asset as PulseAsset);
                            else setAssetB(asset as PulseAsset);
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
                                <p className="pt-3 text-[11px] font-mono uppercase tracking-[0.15em] text-[#1A1A1A]/35">
                                    Select your control asset first, then your proposed route.
                                </p>
                            </div>

                            <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
                                <div className="rounded-[1.8rem] border border-[#E7DED1] bg-white px-5 py-5 text-left shadow-sm">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Step A</p>
                                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]">Select Control Asset</p>
                                    <p className="mt-3 text-[12px] leading-relaxed text-[#6B6B6B]">
                                        Start with the route that defines the baseline you want to measure against.
                                    </p>
                                </div>
                                <div className="rounded-[1.8rem] border border-[#E7DED1] bg-white px-5 py-5 text-left shadow-sm">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Step B</p>
                                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]">Select Proposed Asset</p>
                                    <p className="mt-3 text-[12px] leading-relaxed text-[#6B6B6B]">
                                        Choose the challenger concept to see strategic delta, persuasion lift, and fatigue risk.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'analysing' && (
                        <div className="flex flex-col items-center justify-center py-32 space-y-12 animate-in fade-in duration-500">
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 border-[1.5px] border-[#D4A574]/40 animate-[spin_4s_linear_infinite]" />
                                <div className="absolute inset-4 border-[1px] border-[#D4A574]/20 -rotate-45 animate-[spin_6s_linear_infinite_reverse]" />
                                <div className="absolute inset-8 bg-[#D4A574] animate-pulse rounded-sm" />
                            </div>
                            
                            <div className="w-full max-w-md space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D4A574] animate-pulse">
                                        {loadingLabels[loadingLabelIndex].toUpperCase()}...
                                    </span>
                                    <span className="text-[9px] font-mono text-[#D4A574]/40">ELAPSED: {elapsedSeconds}s</span>
                                </div>
                                <div className="h-[1px] w-full bg-[#1A1A1A]/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#D4A574] w-1/3 animate-[loading_3s_ease-in-out_infinite]" />
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-in fade-in duration-500 bg-white/60 rounded-[2.5rem] border border-dashed border-[#D4A574]/20">
                            <div className="w-16 h-16 rounded-full border border-[#D4A574]/20 bg-[#1A1A1A] flex items-center justify-center text-[#D4A574] text-2xl">
                                !
                            </div>
                            <div className="text-center space-y-3 max-w-xl px-6">
                                <p className="text-[12px] font-bold tracking-[0.4em] uppercase text-[#D4A574]">Differential Diagnostic Failed</p>
                                <p className="text-[12px] text-[#1A1A1A]/60 leading-relaxed font-medium">
                                    {errorMessage || 'The comparison engine could not complete the analysis. Try re-running the diagnostic in a moment.'}
                                </p>
                            </div>
                            <button
                                onClick={handleAnalyse}
                                disabled={!assetA || !assetB}
                                className="px-8 py-4 rounded-full bg-[#1A1A1A] text-[#FBF7EF] text-[10px] font-bold uppercase tracking-[0.25em] transition-all hover:bg-[#8B4513] disabled:opacity-40"
                            >
                                [ RE-RUN DIFFERENTIAL ]
                            </button>
                        </div>
                    )}

                    {status === 'success' && result && (
                        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-[#D4A574]/15 bg-white/70 p-6 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4A574]">Differential Dossier</p>
                                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/60">
                                        Export a five-page client-facing report from this live differential analysis. Prepared-for name is optional and appears on the cover.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 md:min-w-[320px]">
                                    <div className="inline-flex rounded-full border border-[#D4A574]/20 bg-white/70 p-1">
                                        <button
                                            type="button"
                                            onClick={() => setExportPreset('standard')}
                                            className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                                                exportPreset === 'standard' ? 'bg-[#D4A574] text-[#141414]' : 'text-[#8B4513] hover:bg-[#D4A574]/10'
                                            }`}
                                        >
                                            Standard Dossier
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setExportPreset('pitch')}
                                            className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                                                exportPreset === 'pitch' ? 'bg-[#D4A574] text-[#141414]' : 'text-[#8B4513] hover:bg-[#D4A574]/10'
                                            }`}
                                        >
                                            Pitch Narrative
                                        </button>
                                    </div>
                                    {exportPreset === 'pitch' && (
                                        <p className="text-[11px] leading-relaxed text-[#1A1A1A]/55">
                                            Adds a concise pitch-ready narrative: Problem, Insight, Recommendation, and Strategic Delta.
                                        </p>
                                    )}
                                    <input
                                        type="text"
                                        value={preparedFor}
                                        onChange={(event) => setPreparedFor(event.target.value)}
                                        placeholder="Prepared for (optional)"
                                        className="rounded-full border border-[#D4A574]/20 bg-white px-5 py-3 text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#D4A574]"
                                    />
                                    <button
                                        onClick={handleExportDifferentialDossier}
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4A4A4A] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-all hover:bg-[#1A1A1A]"
                                    >
                                        <FileDown className="h-3.5 w-3.5" />
                                        Export Differential Dossier
                                    </button>
                                </div>
                            </div>
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
            {result && assetA && assetB && (
                <div ref={printRef} className="differential-print-layout hidden">
                    <section className="differential-section min-h-[100vh] px-10 py-12">
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#C9A96E]">Differential Intelligence Report</p>
                        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-6 differential-block">
                            <div className="space-y-3">
                                <div className="aspect-[4/3] overflow-hidden border border-[#C9A96E]/40">
                                    <img src={assetA.file_url} alt={assetA.brand.name} className="h-full w-full object-cover" />
                                </div>
                                <p className="text-lg font-semibold uppercase">{assetA.brand.name}</p>
                                <p className="text-xs uppercase tracking-[0.18em] text-[#6B6B6B]">{assetA.brand.market_sector || 'Uncategorised'}</p>
                            </div>
                            <div className="text-center text-xl font-light uppercase tracking-[0.45em] text-[#C9A96E]">vs</div>
                            <div className="space-y-3">
                                <div className="aspect-[4/3] overflow-hidden border border-[#C9A96E]/40">
                                    <img src={assetB.file_url} alt={assetB.brand.name} className="h-full w-full object-cover" />
                                </div>
                                <p className="text-lg font-semibold uppercase">{assetB.brand.name}</p>
                                <p className="text-xs uppercase tracking-[0.18em] text-[#6B6B6B]">{assetB.brand.market_sector || 'Uncategorised'}</p>
                            </div>
                        </div>
                        <div className="mt-10 border-t border-b border-[#C9A96E] py-6 text-sm leading-relaxed">
                            <p>Control: {assetA.brand.name} — {assetA.brand.market_sector || 'Uncategorised'}</p>
                            <p>Proposed: {assetB.brand.name} — {assetB.brand.market_sector || 'Uncategorised'}</p>
                            <p>Prepared by: {agency?.is_whitelabel_active ? agency.name : 'Visual Decompiler'}</p>
                            {preparedFor && <p>Prepared for: {preparedFor}</p>}
                            <p>Classification: Confidential / Forensic</p>
                            <p>Date: {new Date().toLocaleDateString()}</p>
                        </div>
                    </section>

                    {exportPreset === 'pitch' && pitchNarrative && (
                        <section className="differential-section min-h-[100vh] px-10 py-12">
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">Pitch Narrative</p>
                            <div className="mt-8 grid gap-6">
                                {[
                                    ['Problem', pitchNarrative.problem],
                                    ['Insight', pitchNarrative.insight],
                                    ['Recommendation', pitchNarrative.recommendation],
                                    ['Strategic Delta', pitchNarrative.strategicDelta],
                                ].map(([label, value]) => (
                                    <div key={label} className="differential-block border border-[#C9A96E]/30 p-6">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">{label}</p>
                                        <p className="mt-4 text-base leading-relaxed text-[#1A1A1A]">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="differential-section min-h-[100vh] px-10 py-12">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">Executive Delta</p>
                        <div className="mt-8 grid gap-6">
                            <div className="differential-block border border-[#C9A96E]/30 p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">Primary Mechanic Comparison</p>
                                <div className="mt-4 grid gap-3 text-sm">
                                    <p><strong>Control:</strong> {assetA.extractions?.primary_mechanic || 'Unknown'}</p>
                                    <p><strong>Proposed:</strong> {assetB.extractions?.primary_mechanic || 'Unknown'}</p>
                                    <p><strong>Delta:</strong> {result.macro_synthesis.primary_shift}</p>
                                </div>
                            </div>
                            <div className="differential-block border border-[#C9A96E]/30 p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">Confidence Delta</p>
                                <div className="mt-4 grid grid-cols-2 gap-6 text-sm">
                                    <p><strong>Control:</strong> {assetA.extractions?.confidence_score ?? '—'}%</p>
                                    <p><strong>Proposed:</strong> {assetB.extractions?.confidence_score ?? '—'}%</p>
                                </div>
                            </div>
                            <div className="differential-block border border-[#C9A96E]/30 p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">Persuasion Metrics Comparison</p>
                                <table className="mt-4 w-full text-left text-sm">
                                    <thead>
                                        <tr>
                                            <th className="border-b border-[#C9A96E]/30 py-2">Metric</th>
                                            <th className="border-b border-[#C9A96E]/30 py-2">Control</th>
                                            <th className="border-b border-[#C9A96E]/30 py-2">Proposed</th>
                                            <th className="border-b border-[#C9A96E]/30 py-2">Delta</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2">Persuasion Density</td>
                                            <td className="py-2">{result.behavioral_bars.persuasion_density.a}%</td>
                                            <td className="py-2">{result.behavioral_bars.persuasion_density.b}%</td>
                                            <td className="py-2">{persuasionDelta > 0 ? '+' : ''}{persuasionDelta}%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Cognitive Friction</td>
                                            <td className="py-2">{result.behavioral_bars.cognitive_friction.a}%</td>
                                            <td className="py-2">{result.behavioral_bars.cognitive_friction.b}%</td>
                                            <td className="py-2">{frictionDelta > 0 ? '+' : ''}{frictionDelta}%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Predictive Longevity</td>
                                            <td className="py-2">{assetA.extractions?.full_dossier?.persuasion_metrics?.predictive_longevity || '—'}</td>
                                            <td className="py-2">{assetB.extractions?.full_dossier?.persuasion_metrics?.predictive_longevity || '—'}</td>
                                            <td className="py-2">{result.matrix_cubes.fatigue_differential.longevity_delta}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <section className="differential-section min-h-[100vh] px-10 py-12">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">Strategic Divergence</p>
                        <div className="mt-8 space-y-8">
                            <div className="differential-block border border-[#C9A96E]/30 p-6">
                                <p className="text-base leading-relaxed">{result.macro_synthesis.strategic_delta_summary}</p>
                            </div>
                            <div className="differential-block border border-[#C9A96E]/30 p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">Trigger Distribution Delta</p>
                                <div className="mt-4 grid gap-3 text-sm">
                                    {result.radar_metrics.axes.map((axis, index) => (
                                        <div key={axis} className="grid grid-cols-[1.2fr_0.4fr_0.4fr] gap-4">
                                            <span>{axis}</span>
                                            <span>{result.radar_metrics.asset_a_scores[index]}</span>
                                            <span>{result.radar_metrics.asset_b_scores[index]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="differential-block border border-[#C9A96E]/30 p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">Archetype Posture Delta</p>
                                <div className="mt-4 grid gap-3 text-sm">
                                    <p><strong>Control:</strong> {assetA.extractions?.full_dossier?.archetype_mapping?.target_posture || 'Not available'}</p>
                                    <p><strong>Proposed:</strong> {assetB.extractions?.full_dossier?.archetype_mapping?.target_posture || 'Not available'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="differential-section min-h-[100vh] px-10 py-12">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">Semiotic Shift Ledger</p>
                        <div className="mt-8 space-y-6">
                            {result.semiotic_shifts.map((shift, index) => (
                                <div key={`${shift.variable_isolated}-${index}`} className="differential-block border border-[#C9A96E]/30 p-6">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">{shift.variable_isolated}</p>
                                    <div className="mt-4 grid gap-3 text-sm">
                                        <p><strong>Control:</strong> {shift.asset_a_state}</p>
                                        <p><strong>Proposed:</strong> {shift.asset_b_state}</p>
                                        <p><strong>Impact:</strong> {shift.impact_on_conversion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="differential-section min-h-[100vh] px-10 py-12">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">Strategic Recommendation</p>
                        <div className="mt-8 grid gap-6">
                            <div className="differential-block border border-[#C9A96E]/30 p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">Winning Variant</p>
                                <p className="mt-4 text-base leading-relaxed">{result.matrix_cubes.winning_variant.label} — {result.matrix_cubes.winning_variant.rationale}</p>
                            </div>
                            <div className="differential-block border border-[#C9A96E]/30 p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">Opportunity Represented by the Gap</p>
                                <p className="mt-4 text-base leading-relaxed">{result.matrix_cubes.psychological_edge.delta}</p>
                            </div>
                            <div className="differential-block border border-[#C9A96E]/30 p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A96E]">Strategic Recommendations</p>
                                <ol className="mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed">
                                    <li>Prioritise the persuasion architecture signalled by {result.matrix_cubes.winning_variant.label} when briefing the next client-facing concept.</li>
                                    <li>Exploit the psychological edge around {result.matrix_cubes.psychological_edge.trigger.toLowerCase()} to widen the conversion gap.</li>
                                    <li>Use the semiotic deltas to reduce fatigue risk while preserving the stronger performance signals identified in this report.</li>
                                </ol>
                            </div>
                            <div className="pt-8 text-sm text-[#6B6B6B]">
                                <p>{agency?.is_whitelabel_active ? agency.name : 'Visual Decompiler'}</p>
                                <p>Classification: Confidential</p>
                                <p>Pulse Result ID: {result.pulse_result_id || 'In-session analysis'}</p>
                            </div>
                        </div>
                    </section>
                </div>
            )}
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
    selected: PulseAsset | null,
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
