"use client";

import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import GatekeeperIntercept from '@/components/GatekeeperIntercept';
import { SovereignPrintHeader, SovereignPrintFooter } from '@/components/SovereignDossierParts';
import AdAnalyticsTab from '@/components/AdAnalyticsTab';
import RadarChart from '@/components/RadarChart';
import { FileDown, Code } from 'lucide-react';

interface WorkspaceAsset {
    id: string;
    type: string;
    file_url: string;
    brand_id?: string;
    brand?: { name: string; market_sector: string };
    extraction?: {
        primary_mechanic: string;
        visual_style: string;
        confidence_score: number;
        color_palette: string[];
        evidence_anchors: string[] | Record<string, unknown>[];
        dna_prompt: string;
        full_dossier?: {
            narrative_framework?: string;
            semiotic_subtext?: string;
            possible_readings?: { reading: string; support: string[]; note: string | null }[];
            objection_dismantling?: string;
            archetype_mapping?: {
                target_posture: string;
                strategic_moves: string[];
            };
            test_plan?: {
                hypothesis: string;
                test_cells: { lever: string; change: string; rationale: string }[];
            };
        };
    } | {
        primary_mechanic: string;
        visual_style: string;
        confidence_score: number;
        color_palette: string[];
        evidence_anchors: string[] | Record<string, unknown>[];
        dna_prompt: string;
        full_dossier?: {
            narrative_framework?: string;
            semiotic_subtext?: string;
            possible_readings?: { reading: string; support: string[]; note: string | null }[];
            objection_dismantling?: string;
            archetype_mapping?: {
                target_posture: string;
                strategic_moves: string[];
            };
            test_plan?: {
                hypothesis: string;
                test_cells: { lever: string; change: string; rationale: string }[];
            };
            persuasion_metrics?: {
                predictive_longevity: string;
                cognitive_friction: number;
                persuasion_density: number;
            };
        };
    }[];
}

interface SequenceData {
    tension_graph: {
        labels: string[];
        cognitive_load_scores: number[];
        aesthetic_retention_scores: number[];
    };
    frames: {
        frame_index: number;
        role: string;
        visual_mechanic: string;
        friction_warnings: string[];
    }[];
}

interface BlueprintData {
    verified_dna_prompt: string;
    execution_constraints: {
        primary_trigger: string;
        must_include: string[];
        must_not_include: string[];
    };
    technical_specs: {
        lighting_architecture: string;
        gaze_vector: string;
        material_cues: string[];
    };
    ad_copy_remixes?: {
        angle: string;
        copy: string;
    }[];
    visual_variant_prompts?: {
        concept: string;
        prompt: string;
    }[];
}

const ANALYSIS_STEPS = [
    'Extracting visual elements',
    'Analyzing trigger mechanics',
    'Decoding semiotic subtext',
    'Mapping narrative framework',
    'Identifying evidence anchors',
    'Evaluating persuasion strategy',
    'Computing confidence scores',
    'Assembling intelligence report',
];

const SIGNAL_NODES = [
    'Trigger', 'Narrative', 'Evidence',
    'Subtext', 'Archetype', 'Confidence',
];

function SovereignProcessingView({ assetId }: { assetId: string }) {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [activeNode, setActiveNode] = useState(0);
    const [checkTrigger, setCheckTrigger] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setStep((s) => (s + 1) % ANALYSIS_STEPS.length), 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 95) return 95;
                return Math.min(95, p + 2 + Math.floor(Math.random() * 4));
            });
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setActiveNode((n) => (n + 1) % SIGNAL_NODES.length), 2200);
        return () => clearInterval(interval);
    }, []);

    // Polling trigger: increment checkTrigger every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => setCheckTrigger(prev => prev + 1), 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let isMounted = true;
        
        // Initial trigger and occasional poll check
        fetch('/api/vault-extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ assetId })
        }).then(res => res.json()).then(data => {
            if (isMounted && data.success) {
                setProgress(100);
                setTimeout(() => window.location.reload(), 800);
            }
        }).catch(() => {});
        
        return () => { isMounted = false; };
    }, [assetId, checkTrigger]);

    return (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-1000">
            {/* Header branding placeholder */}
            <div className="text-center mb-12">
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#D4A574] mb-3">
                    Visual Decompiler
                </p>
                <h1 className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4A574]/80">
                    Intelligence Extraction In Progress
                </h1>
            </div>

            {/* Signal Nodes — horizontal cycle like screenshot or vertical list */}
            <div className="w-full max-w-sm space-y-3 mb-12">
                {SIGNAL_NODES.map((node, i) => (
                    <div
                        key={node}
                        className="flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-700"
                        style={{
                            borderColor: i === activeNode ? 'rgba(212,165,116,0.3)' : 'rgba(26,26,26,0.04)',
                            backgroundColor: i === activeNode ? 'rgba(212,165,116,0.04)' : 'transparent',
                            boxShadow: i === activeNode ? '0 10px 30px rgba(212,165,116,0.06)' : 'none',
                        }}
                    >
                        <div
                            className="w-1.5 h-1.5 rounded-full transition-all duration-700 flex-shrink-0"
                            style={{
                                backgroundColor: i < activeNode ? '#D4A574' : i === activeNode ? '#8B4513' : 'rgba(26,26,26,0.1)',
                                boxShadow: i === activeNode ? '0 0 10px rgba(139,69,19,0.4)' : 'none',
                            }}
                        />
                        <span
                            className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-700"
                            style={{
                                color: i === activeNode ? '#D4A574' : i < activeNode ? '#1A1A1A' : 'rgba(26,26,26,0.2)',
                            }}
                        >
                            {node}
                        </span>
                        {i === activeNode && (
                            <span className="ml-auto text-[8px] font-mono text-[#D4A574] tracking-widest animate-pulse">PROCESSING</span>
                        )}
                        {i < activeNode && (
                            <span className="ml-auto text-[8px] font-mono text-[#D4A574]/40 tracking-widest">ANALYZED</span>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="text-center space-y-5 w-full max-w-sm">
                <div className="flex items-center justify-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574] animate-pulse" />
                    <p className="text-[12px] font-medium text-[#1A1A1A]/70 tracking-widest uppercase">
                        {ANALYSIS_STEPS[step]}
                    </p>
                </div>
                
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#1A1A1A]/20">
                    Deep psychological analysis in progress
                </p>

                {/* Performance Progress Bar */}
                <div className="w-full h-[1px] bg-[#E5E5E1] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-[8px] font-mono text-[#1A1A1A]/30 pt-1 uppercase tracking-widest">
                    <span>Init</span>
                    <span>{progress}%</span>
                    <span>Complete</span>
                </div>
            </div>

            {/* Return to Library */}
            <div className="mt-12 flex flex-col items-center gap-6">
                <a
                    href="/vault"
                    className="px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/50 border border-[#E5E5E1] hover:bg-white hover:text-[#D4A574] transition-all"
                >
                    Return to Library
                </a>
                <p className="text-[10px] text-[#1A1A1A]/40 text-center max-w-[280px] leading-relaxed italic">
                    Analysis takes roughly 2–3 minutes. Your report will be waiting here when complete.
                </p>
            </div>
        </div>
    );
}

export default function AssetWorkspace({
    initialAsset,
    isSovereign,
    agency
}: {
    initialAsset: WorkspaceAsset,
    isSovereign: boolean,
    agency: any
}) {
    const [asset, setAsset] = useState(initialAsset);
    const [activeTab, setActiveTab] = useState<'INTELLIGENCE' | 'PSYCHOLOGY' | 'BLUEPRINT' | 'MARKET PULSE'>('INTELLIGENCE');
    const [isGeneratingPacing, setIsGeneratingPacing] = useState(false);
    const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false);
    const [showGatekeeper, setShowGatekeeper] = useState(false);
    const [showCopiedToast, setShowCopiedToast] = useState(false);

    // We'll store dynamically generated results here if they aren't strictly persisted in the rigid Phase 2 schema
    const [sequenceData, setSequenceData] = useState<SequenceData | null>(null);
    const [blueprintData, setBlueprintData] = useState<BlueprintData | null>(null);

    // Normalize extraction payload (V1 array vs V2 object)
    const extraction = Array.isArray(asset.extraction) ? asset.extraction[0] : asset.extraction;
    
    // Parse visual style string if it's stringified JSON
    let parsedStyle = extraction?.visual_style;

    const isCarousel = asset.type === 'CAROUSEL';

    // Handle Generate Sequence Analysis (Targeting /api/extract/sequence)
    const handleGenerateSequence = async () => {
        setIsGeneratingPacing(true);
        try {
            const res = await fetch('/api/extract/sequence', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // For carousel, if there are multiple URLs in string or just the primary URL
                body: JSON.stringify({ assetId: asset.id, fileUrls: [asset.file_url] })
            });
            if (!res.ok) throw new Error("Failed sequence extraction");
            const data = await res.json();
            setSequenceData(data);
        } catch (err) {
            // Silently handle or expose explicitly to UI
        } finally {
            setIsGeneratingPacing(false);
        }
    };

    // Handle Generate Blueprint (Targeting /api/blueprint)
    const handleGenerateBlueprint = async () => {
        // TIER CHECK INTERCEPT
        if (!isSovereign) {
            setShowGatekeeper(true);
            return;
        }

        setIsGeneratingBlueprint(true);
        try {
            const res = await fetch('/api/blueprint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assetId: asset.id, brandId: asset.brand_id })
            });
            if (!res.ok) throw new Error("Failed blueprint extraction");
            const data = await res.json();
            setBlueprintData(data);
        } catch (err) {
            // Silently handle or expose explicitly to UI
        } finally {
            setIsGeneratingBlueprint(false);
        }
    };

    const handleCopyEmbed = () => {
        const embedCode = `<iframe src="https://www.visualdecompiler.com/embed/${asset.id}" width="100%" height="600px" style="border: 1px solid #141414; border-radius: 8px;"></iframe>`;
        navigator.clipboard.writeText(embedCode).then(() => {
            setShowCopiedToast(true);
            setTimeout(() => setShowCopiedToast(false), 3000);
        });
    };

    // Safe parsing of arrays from strings if needed
    let fileUrls = [asset.file_url];
    try {
        const parsed = JSON.parse(asset.file_url);
        if (Array.isArray(parsed)) fileUrls = parsed;
    } catch (e) { }

    return (
        <>
            <GatekeeperIntercept isVisible={showGatekeeper} onClose={() => setShowGatekeeper(false)} />
            <div className="w-full bg-[#FBFBF6] min-h-screen flex justify-center">
                <div className="flex flex-col md:flex-row min-h-screen w-full max-w-[1440px] bg-[#FBFBF6] border-x border-[#D4A574]/10 shadow-[0_0_80px_rgba(0,0,0,0.03)] text-[#1A1A1A]">

                    {/* LEFT COLUMN: Sticky Media Viewer (45%) */}
                    <div className="w-full md:w-[45%] border-r border-[#D4A574]/20 relative bg-[#FBFBF6]">
                        <div className="md:sticky md:top-0 h-[50vh] md:h-screen p-8 flex flex-col justify-center items-center">

                            <div className="w-full relative h-[80%] flex items-center justify-center overflow-hidden border border-[#D4A574]/30 bg-[#1A1A1A] group rounded-2xl shadow-2xl">
                                {/* If multiple images, render a horizontal CSS scroll snap setup */}
                                <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                                    {fileUrls.map((url, idx) => (
                                        <img
                                            key={idx}
                                            src={url}
                                            alt={`Asset frame ${idx}`}
                                            className="w-full h-full object-contain shrink-0 snap-center transition-all duration-700"
                                        />
                                    ))}
                                </div>
                                {fileUrls.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 border border-[#E5E5E1] px-3 py-1 flex gap-2 rounded-full">
                                        {fileUrls.map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8B4513]/30" />
                                        ))}
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-[#1A1A1A]/90 border border-[#D4A574]/40 px-3 py-1 backdrop-blur-sm rounded-none">
                                    <span className="text-[9px] uppercase tracking-widest text-[#D4A574]">{asset.type}</span>
                                </div>
                            </div>

                            <div className="w-full mt-6 flex justify-between items-end border-b border-[#D4A574]/20 pb-4">
                                <div>
                                    <h1 className="text-2xl font-light tracking-tightest text-[#D4A574] uppercase">{asset.brand?.name}</h1>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4A574]">{asset.brand?.market_sector}</span>
                                </div>
                                <div className="flex flex-col items-end gap-2 relative">
                                    <span className="text-[9px] font-mono tracking-widest text-[#8B4513]/50">ID: {asset.id.split('-')[0]}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleCopyEmbed}
                                            className="no-print flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#D4A574]/30 text-[#D4A574] text-[10px] font-bold tracking-widest uppercase hover:bg-[#1A1A1A]/80 rounded-full transition-all"
                                        >
                                            <Code className="w-3 h-3" />
                                            Copy Embed Widget
                                        </button>
                                        <button
                                            onClick={() => window.print()}
                                            className="no-print flex items-center gap-2 px-4 py-2 bg-[#4A4A4A] text-white text-[10px] font-bold tracking-widest uppercase hover:bg-[#1A1A1A] rounded-full transition-all"
                                        >
                                            <FileDown className="w-3 h-3" />
                                            Export Dossier
                                        </button>
                                    </div>
                                    {/* Simple Toast Notification */}
                                    {showCopiedToast && (
                                        <div className="absolute top-full mt-2 right-0 bg-[#8B4513] text-[#F5F5DC] text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                            Embed Code Copied
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                {/* RIGHT COLUMN: Scrollable Forensic Console (55%) */}
                <div className="w-full md:w-[55%] bg-[#FBFBF6] min-h-screen relative">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(rgba(212,165,116,0.05)_48px,transparent_48px),linear-gradient(90deg,rgba(212,165,116,0.05)_48px,transparent_48px)] [background-size:48px_48px]" />
                    <div className="relative z-10 w-full min-h-screen bg-transparent">

                    {/* Minimalist Segmented Controls */}
                    <div className="sticky top-0 z-20 bg-[#FBFBF6]/95 backdrop-blur-md border-b border-[#D4A574]/20 px-8 pt-8 md:pt-12 pb-0 flex gap-8">
                        {(['INTELLIGENCE', 'PSYCHOLOGY', 'BLUEPRINT', 'MARKET PULSE'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors relative ${activeTab === tab ? 'text-[#8B4513]' : 'text-[#1A1A1A]/50 hover:text-[#8B4513]/80'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B4513]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content Area */}
                    <div className="p-8 md:p-12">
                        {/* Sovereign PDF Header */}
                        <SovereignPrintHeader agency={agency} />

                        {/* TAB 1: INTELLIGENCE */}
                        {activeTab === 'INTELLIGENCE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {extraction ? (
                                    <div className="space-y-12">

                                        {/* Primary Mechanic & Confidence */}
                                        <div className="grid grid-cols-2 border-b border-[#E5E5E1] pb-12">
                                            <div>
                                                <span className="block text-[12px] uppercase tracking-widest font-bold text-[#D4A574] mb-3">Primary Mechanic</span>
                                                <h2 className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">{extraction.primary_mechanic}</h2>
                                            </div>
                                            <div className="pl-8 border-l border-[#E5E5E1] flex flex-col justify-center">
                                                <span className="block text-[12px] uppercase tracking-widest font-bold text-[#D4A574] mb-2">System Confidence</span>
                                                <div className="text-4xl font-mono text-[#1A1A1A] tracking-tighter">
                                                    {extraction.confidence_score <= 1 ? Math.round(extraction.confidence_score * 100) : extraction.confidence_score}<span className="text-[#8B4513]/50">%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Visual Style & Color Palette Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#E5E5E1] pb-12">
                                            <div>
                                                <span className="block text-[12px] uppercase tracking-widest font-bold text-[#D4A574] mb-3">Synthesized Visual Style</span>
                                                <p className="text-sm font-medium text-[#1A1A1A] leading-relaxed uppercase tracking-[0.1em]">{extraction.visual_style}</p>
                                            </div>
                                            <div className="pl-8 border-l border-[#E5E5E1]">
                                                <span className="block text-[12px] uppercase tracking-widest font-bold text-[#D4A574] mb-6">Dominant Chromatic Base</span>
                                                {extraction.color_palette && extraction.color_palette.length > 0 ? (
                                                    <div className="flex flex-wrap gap-3">
                                                        {extraction.color_palette.map((hex: string, i: number) => (
                                                            <div key={i} className="group border border-[#D4A574]/30 p-1.5 bg-[#1A1A1A] flex items-center gap-2 rounded-full pr-3">
                                                                <div className="w-5 h-5 flex-shrink-0 border border-[#D4A574]/20 rounded-full" style={{ backgroundColor: hex }} />
                                                                <span className="text-[9px] font-mono tracking-tight text-[#FFFFFF]/80 group-hover:text-[#D4A574] transition-colors">{hex}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-[10px] font-mono text-[#D4A574]/50 uppercase tracking-widest">No Palette Detected.</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* DEEP SEMIOTIC DOSSIER -> 3-COLUMN ELITE GRID */}
                                        {extraction.full_dossier && (
                                            <div className="pt-12 border-t border-[#D4A574]/20 space-y-8">
                                                
                                                {/* The Core 2-Column Grid: Narrative, Semiotics */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 flex flex-col hover:border-[#D4A574] transition-all rounded-3xl shadow-sm min-h-[200px] max-h-[600px] overflow-y-auto dark-scroll">
                                                        <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/20 pb-2 flex-shrink-0 sticky top-0 bg-[#1A1A1A] z-10">Narrative Framework</span>
                                                        <p className="text-[13px] text-[#FFFFFF] leading-[1.625] font-light whitespace-pre-wrap mt-2">{extraction.full_dossier.narrative_framework}</p>
                                                    </div>
                                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 flex flex-col hover:border-[#D4A574] transition-all rounded-3xl shadow-sm min-h-[200px] max-h-[600px] overflow-y-auto dark-scroll">
                                                        <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/20 pb-2 flex-shrink-0 sticky top-0 bg-[#1A1A1A] z-10">Semiotic Subtext</span>
                                                        <p className="text-[13px] text-[#FFFFFF] leading-[1.625] font-light whitespace-pre-wrap mt-2">{extraction.full_dossier.semiotic_subtext}</p>
                                                    </div>
                                                </div>

                                                {/* Secondary Row: Archetypes, Readings and Objections */}
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 flex flex-col hover:border-[#D4A574] transition-all rounded-3xl shadow-sm min-h-[200px]">
                                                        <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/20 pb-2">Archetype Posture</span>
                                                        <p className="text-[13px] text-[#FFFFFF] leading-[1.625] tracking-tight mb-4">{extraction.full_dossier.archetype_mapping?.target_posture}</p>
                                                        {(extraction.full_dossier.archetype_mapping as any)?.strategic_moves && (
                                                            <div className="space-y-1.5 p-3 bg-white/5 border border-[#D4A574]/10 rounded-xl mt-auto">
                                                                {(extraction.full_dossier.archetype_mapping as any).strategic_moves.slice(0, 2).map((move: string, i: number) => (
                                                                    <div key={i} className="flex gap-2 text-[10px] text-[#FFFFFF]/70 leading-tight">
                                                                        <div className="w-1 h-1 bg-[#D4A574]/40 rounded-full mt-1.5 shrink-0" />
                                                                        <span>{move}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                     {/* Plausible Readings Card */}
                                                    {extraction.full_dossier.possible_readings && extraction.full_dossier.possible_readings.length > 0 && (
                                                        <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 rounded-3xl shadow-sm">
                                                           <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-6 border-b border-[#D4A574]/20 pb-2">Plausible Readings</span>
                                                           <div className="grid grid-cols-1 gap-4">
                                                                {extraction.full_dossier.possible_readings.slice(0, 2).map((reading, i) => (
                                                                    <div key={i} className="bg-[#1A1A1A]/50 border border-[#D4A574]/10 p-4 rounded-2xl">
                                                                        <p className="text-xs font-medium text-[#D4A574] mb-2">{reading.reading}</p>
                                                                        <p className="text-[10px] text-[#FFFFFF]/60 leading-[1.625] italic">{reading.support.join(" • ")}</p>
                                                                    </div>
                                                                ))}
                                                           </div>
                                                        </div>
                                                    )}
                                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 rounded-3xl shadow-sm flex flex-col">
                                                        <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-6 border-b border-[#D4A574]/20 pb-2">Objection Dismantled</span>
                                                        <p className="text-[13px] text-[#FFFFFF] leading-[1.625] font-light italic border-l-2 border-[#D4A574]/30 pl-4 py-1">{extraction.full_dossier.objection_dismantling}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <SovereignProcessingView assetId={asset.id} />
                                )}
                            </div>
                        )}

                        {/* MARKET PULSE (Locked / Last) */}
                        {activeTab === 'MARKET PULSE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                                <div className="absolute inset-0 z-10 backdrop-blur-md bg-[#FBFBF6]/60 flex items-center justify-center rounded-3xl">
                                    <div className="bg-[#1A1A1A] border border-[#D4A574]/40 p-8 rounded-3xl text-center shadow-2xl flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center border border-[#D4A574]/30 mb-4">
                                            <svg className="w-5 h-5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        </div>
                                        <span className="text-[#D4A574] font-bold tracking-[0.3em] uppercase text-[10px] mb-2">Sovereign Feature</span>
                                        <h3 className="text-[#FFFFFF] text-xl font-light mb-4 tracking-tight">Market Pulse Locked</h3>
                                        <p className="text-[#FFFFFF]/60 text-xs mb-8 max-w-xs leading-relaxed">Cross-asset statistical aggregation and category saturation density mapping is restricted to Enterprise tiers.</p>
                                        <button className="bg-[#D4A574] text-[#1A1A1A] px-8 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors">
                                            Premium Unlock
                                        </button>
                                    </div>
                                </div>
                                <div className="opacity-40 pointer-events-none select-none filter blur-[2px]">
                                    <AdAnalyticsTab brand={asset.brand?.name} />
                                </div>
                            </div>
                        )}

                        {/* TAB 3: PSYCHOLOGY */}
                        {activeTab === 'PSYCHOLOGY' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Trigger Distribution Radar */}
                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 flex flex-col items-center rounded-3xl shadow-sm self-start">
                                        <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 self-start w-full border-b border-[#D4A574]/20 pb-4">
                                            Trigger Distribution Map
                                        </h3>
                                        <div className="w-full max-w-[320px]">
                                            <RadarChart 
                                                data={Object.entries((extraction?.full_dossier as any)?.archetype_mapping?.trigger_distribution || {}).map(([label, value]) => ({ label, value: value as number }))}
                                                forceLight={false}
                                            />
                                        </div>
                                    </div>

                                    {/* Emotional DNA Heatmap replaced with Persuasion Metrics if available */}
                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 flex flex-col justify-between rounded-3xl shadow-sm h-full">
                                        <div className="w-full mb-4">
                                            <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest border-b border-[#D4A574]/20 pb-4">
                                                Persuasion Metrics
                                            </h3>
                                        </div>
                                        
                                        {(extraction?.full_dossier as any)?.persuasion_metrics ? (
                                             <div className="flex-1 space-y-8 flex flex-col justify-center">
                                                <div>
                                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                                                        <span className="text-[#D4A574]/60">Persuasion Density</span>
                                                        <span className="text-[#D4A574]">{((extraction?.full_dossier as any)?.persuasion_metrics?.persuasion_density as number)}%</span>
                                                    </div>
                                                    <div className="w-full bg-[#1A1A1A] h-2 border border-[#D4A574]/20 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full transition-all duration-1000" 
                                                            style={{ width: `${(extraction?.full_dossier as any)?.persuasion_metrics?.persuasion_density}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                                                        <span className="text-[#D4A574]/60">Cognitive Friction</span>
                                                        <span className="text-[#8B4513]">{((extraction?.full_dossier as any)?.persuasion_metrics?.cognitive_friction as number)}%</span>
                                                    </div>
                                                    <div className="w-full bg-[#1A1A1A] h-2 border border-[#D4A574]/20 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-[#8B4513]/40 rounded-full transition-all duration-1000" 
                                                            style={{ width: `${(extraction?.full_dossier as any)?.persuasion_metrics?.cognitive_friction}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-8 pt-6 border-t border-[#D4A574]/10">
                                                    <div className="flex gap-3 items-center">
                                                        <div className="w-8 h-8 rounded-full border border-[#D4A574]/30 flex items-center justify-center shrink-0 bg-[#D4A574]/5">
                                                            <svg className="w-3 h-3 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        </div>
                                                        <div>
                                                            <span className="block text-[8px] font-bold text-[#D4A574]/50 mb-1 uppercase tracking-[0.2em]">Predictive Longevity</span>
                                                            <span className="text-xs text-[#FFFFFF] tracking-tight">{((extraction?.full_dossier as any)?.persuasion_metrics?.predictive_longevity as string)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                             </div>
                                        ) : (
                                            <div className="flex-1 flex items-center justify-center">
                                                <div className="text-[10px] uppercase font-bold tracking-widest text-[#D4A574]/30">Legacy Asset - No Depth Metrics Available</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: BLUEPRINT */}
                        {activeTab === 'BLUEPRINT' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {!blueprintData ? (
                                <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-10 flex flex-col items-center justify-center text-center rounded-3xl shadow-sm">
                                        <h3 className="text-[#D4A574] text-lg font-light mb-2">Production Blueprint Uninitialized</h3>
                                        <p className="text-[#FFFFFF]/70 text-sm max-w-sm mb-8">Synthesize the extraction data into elite execution constraints.</p>
                                        <button
                                            onClick={handleGenerateBlueprint}
                                            disabled={isGeneratingBlueprint || !extraction}
                                            className="bg-[#D4A574] text-[#1A1A1A] px-8 py-3.5 text-[10px] font-bold tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white rounded-full transition-all disabled:opacity-50"
                                        >
                                            {isGeneratingBlueprint ? 'Synthesizing Blueprint...' : 'Generate Blueprint'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-12">

                                        {/* Iteration Test Plan (Remixing) */}
                                        {extraction?.full_dossier?.test_plan && (
                                            <div>
                                                <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/20 pb-2">Iteration & Test Plan</span>
                                                <p className="text-sm text-[#FFFFFF] mb-6 border-l-2 border-[#D4A574] pl-4 italic">{extraction.full_dossier.test_plan.hypothesis}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    {extraction.full_dossier.test_plan.test_cells.map((cell: any, i: number) => (
                                                        <div key={i} className="border border-[#D4A574]/20 p-5 bg-[#1A1A1A] flex flex-col rounded-3xl shadow-sm">
                                                            <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4A574] uppercase block mb-3">{cell.lever}</span>
                                                            <p className="text-sm text-[#FFFFFF] font-light mb-4 leading-relaxed">{cell.change}</p>
                                                            <p className="text-[9px] text-[#D4A574]/60 uppercase tracking-[0.2em] mt-auto border-t border-[#D4A574]/10 pt-4 font-bold">{cell.rationale}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* DNA Prompt Code Block */}
                                        <div>
                                            <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/20 pb-2">Verified DNA Prompt (Midjourney Native)</span>
                                            <div className="relative group">
                                                <div className="absolute top-4 right-4 text-[8px] font-bold text-[#D4A574] uppercase tracking-widest opacity-40">Forensic Copy</div>
                                                <pre className="p-5 bg-[#1A1A1A] border border-[#D4A574]/30 text-[#FFFFFF] text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap rounded-3xl">
                                                    {blueprintData.verified_dna_prompt}
                                                </pre>
                                                <button
                                                    className="absolute bottom-6 right-6 text-[9px] font-bold tracking-widest uppercase text-[#D4A574]/70 hover:text-[#D4A574] transition-colors bg-[#1A1A1A] px-3 py-1.5 rounded-none border border-[#D4A574]/40"
                                                    onClick={() => navigator.clipboard.writeText(blueprintData.verified_dna_prompt)}
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>

                                         {/* Execution Constraints Checklist */}
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                             <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 rounded-3xl shadow-sm">
                                                 <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/20 pb-2">Primary Trigger</span>
                                                 <p className="text-xl text-[#FFFFFF] font-light leading-snug">{blueprintData.execution_constraints.primary_trigger}</p>
                                             </div>
                                             <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 rounded-3xl shadow-sm">
                                                 <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/20 pb-2">Technical Specs</span>
                                                 <ul className="space-y-4 text-sm text-[#FFFFFF]/80">
                                                     <li className="flex flex-col gap-1"><span className="text-[#D4A574] uppercase text-[9px] font-bold tracking-widest opacity-60">Lighting Architecture</span> <span className="text-sm">{blueprintData.technical_specs.lighting_architecture}</span></li>
                                                     <li className="flex flex-col gap-1"><span className="text-[#D4A574] uppercase text-[9px] font-bold tracking-widest opacity-60">Gaze Vector</span> <span className="text-sm">{blueprintData.technical_specs.gaze_vector}</span></li>
                                                     <li className="flex flex-col gap-1"><span className="text-[#D4A574] uppercase text-[9px] font-bold tracking-widest opacity-60">Material Cues</span> <span className="text-sm italic">{blueprintData.technical_specs.material_cues.join(' • ')}</span></li>
                                                 </ul>
                                             </div>
                                         </div>

                                        {/* Brutalist [+] / [-] constraints */}
                                        <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-5 rounded-3xl shadow-sm">
                                            <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-6 border-b border-[#D4A574]/20 pb-2">Strict Inclusion/Exclusion Constraints</span>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
                                                <div className="space-y-4">
                                                    <span className="block text-[8px] font-bold text-[#D4A574] mb-2 uppercase tracking-[0.2em]">[+] Positive Benchmarks</span>
                                                    {blueprintData.execution_constraints.must_include.map((item: string, i: number) => (
                                                        <div key={`inc-${i}`} className="flex items-start gap-3 bg-[#1A1A1A]/50 p-3 border border-[#D4A574]/10 rounded-xl">
                                                            <span className="text-emerald-400 font-bold">✓</span>
                                                            <span className="text-[#FFFFFF] uppercase tracking-tight">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="space-y-4">
                                                    <span className="block text-[8px] font-bold text-[#D4A574]/50 mb-2 uppercase tracking-[0.2em]">[-] Critical Exclusions</span>
                                                    {blueprintData.execution_constraints.must_not_include.map((item: string, i: number) => (
                                                        <div key={`exc-${i}`} className="flex items-start gap-3 bg-[#1A1A1A]/50 p-3 border border-[#D4A574]/10 rounded-xl opacity-60">
                                                            <span className="text-rose-400 font-bold">×</span>
                                                            <span className="text-[#FFFFFF] uppercase tracking-tight line-through">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* REMIXES AND VARIANTS */}
                                        {blueprintData.ad_copy_remixes && blueprintData.ad_copy_remixes.length > 0 && (
                                            <div>
                                                <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/20 pb-2">Forensic Copy Remixes</span>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {blueprintData.ad_copy_remixes.map((remix: any, i: number) => (
                                                        <div key={i} className="bg-[#1A1A1A] border border-[#D4A574]/20 p-5 rounded-3xl shadow-sm relative group">
                                                            <div className="absolute -top-3 left-4 bg-[#8B4513] text-[#F5F5DC] px-3 py-1 text-[8px] font-bold tracking-widest uppercase rounded">
                                                                {remix.angle}
                                                            </div>
                                                            <p className="text-sm text-[#FFFFFF] font-light mt-2 leading-relaxed whitespace-pre-wrap">{remix.copy}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {blueprintData.visual_variant_prompts && blueprintData.visual_variant_prompts.length > 0 && (
                                            <div>
                                                <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/20 pb-2">Visual Concept Variants</span>
                                                <div className="space-y-6">
                                                    {blueprintData.visual_variant_prompts.map((variant: any, i: number) => (
                                                        <div key={i} className="bg-[#1A1A1A] border border-[#D4A574]/20 p-5 rounded-3xl shadow-sm relative">
                                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#D4A574] mb-3">{variant.concept}</span>
                                                            <pre className="p-4 bg-black/40 border border-[#D4A574]/10 text-[#FFFFFF]/80 text-xs font-mono leading-relaxed whitespace-pre-wrap rounded-2xl">
                                                                {variant.prompt}
                                                            </pre>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sovereign PDF Footer */}
                        <SovereignPrintFooter agency={agency} assetId={asset.id} />
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
);
}
