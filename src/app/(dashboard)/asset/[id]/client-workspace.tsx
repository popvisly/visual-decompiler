"use client";

import { useState } from 'react';
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
    const [activeTab, setActiveTab] = useState<'INTELLIGENCE' | 'MARKET PULSE' | 'PSYCHOLOGY' | 'BLUEPRINT'>('INTELLIGENCE');
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
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { 
                        background: white !important; 
                        color: #141414 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        padding: 20mm !important;
                    }
                    .md\\:h-screen { height: auto !important; }
                    .md\\:sticky { position: relative !important; }
                    .bg-[#F5F5DC] { background: white !important; }
                    .bg-[#F5F5DC] { background: #fafafa !important; }
                    .text-[#1A1A1A] { color: #141414 !important; }
                    .text-[#8B4513]/70 { color: #666 !important; }
                    .border-[#D4A574] { border-color: #eee !important; }
                    
                    /* Force grid on print */
                    .flex-col { display: block !important; }
                    .md\\:flex-row { display: block !important; }
                    .w-full { width: 100% !important; }
                    
                    /* Tabs management */
                    .sticky { position: relative !important; background: transparent !important; }
                    
                    /* Accent Color Injection */
                    h2, .text-[#1A1A1A] { color: ${agency?.primary_hex || '#141414'} !important; }
                }
            `}</style>
            <GatekeeperIntercept isVisible={showGatekeeper} onClose={() => setShowGatekeeper(false)} />
            <div className="flex flex-col md:flex-row min-h-screen bg-[#F5F5DC] text-[#1A1A1A]">

                {/* LEFT COLUMN: Sticky Media Viewer (45%) */}
                <div className="w-full md:w-[45%] border-r border-[#D4A574] relative bg-[#F5F5DC]">
                    <div className="md:sticky md:top-0 h-[50vh] md:h-screen p-8 flex flex-col justify-center items-center">

                        <div className="w-full relative h-[80%] flex items-center justify-center overflow-hidden border border-[#D4A574] bg-[#F5F5DC] group">
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
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#F5F5DC] border border-[#D4A574] px-3 py-1 flex gap-2">
                                    {fileUrls.map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8B4513]/30" />
                                    ))}
                                </div>
                            )}
                            <div className="absolute top-4 left-4 bg-[#F5F5DC]/80 border border-[#D4A574] px-3 py-1 backdrop-blur-sm">
                                <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]">{asset.type}</span>
                            </div>
                        </div>

                        <div className="w-full mt-6 flex justify-between items-end border-b border-[#D4A574] pb-4">
                            <div>
                                <h1 className="text-2xl font-light tracking-tightest text-[#8B4513] uppercase">{asset.brand?.name}</h1>
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8B4513]/70">{asset.brand?.market_sector}</span>
                            </div>
                            <div className="flex flex-col items-end gap-2 relative">
                                <span className="text-[9px] font-mono tracking-widest text-[#8B4513]/50">ID: {asset.id.split('-')[0]}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCopyEmbed}
                                        className="no-print flex items-center gap-2 px-3 py-1.5 bg-[#F5F5DC] border border-[#D4A574] text-[#1A1A1A] text-[9px] font-bold tracking-widest uppercase hover:bg-[#D4A574]/10 transition-colors"
                                    >
                                        <Code className="w-3 h-3" />
                                        Copy Embed Widget
                                    </button>
                                    <button
                                        onClick={() => window.print()}
                                        className="no-print flex items-center gap-2 px-3 py-1.5 bg-[#8B4513] text-[#F5F5DC] text-[9px] font-bold tracking-widest uppercase hover:bg-[#1A1A1A] transition-colors"
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
                <div className="w-full md:w-[55%] bg-[#F5F5DC] min-h-screen">

                    {/* Minimalist Segmented Controls */}
                    <div className="sticky top-0 z-10 bg-[#F5F5DC]/95 backdrop-blur-md border-b border-[#D4A574] px-8 pt-8 md:pt-12 pb-0 flex gap-8">
                        {(['INTELLIGENCE', 'MARKET PULSE', 'PSYCHOLOGY', 'BLUEPRINT'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors relative ${activeTab === tab ? 'text-[#1A1A1A]' : 'text-[#8B4513]/50 hover:text-[#1A1A1A]/80'
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
                                        <div className="grid grid-cols-2 border-b border-[#D4A574] pb-12">
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-widest text-[#8B4513]/70 mb-2">Primary Mechanic</span>
                                                <h2 className="text-3xl font-light leading-tight text-[#8B4513]">{extraction.primary_mechanic}</h2>
                                            </div>
                                            <div className="pl-8 border-l border-[#D4A574] flex flex-col justify-center">
                                                <span className="block text-[9px] uppercase tracking-widest text-[#8B4513]/70 mb-2">System Confidence</span>
                                                <div className="text-4xl font-mono text-[#1A1A1A] tracking-tighter">
                                                    {extraction.confidence_score <= 1 ? Math.round(extraction.confidence_score * 100) : extraction.confidence_score}<span className="text-[#8B4513]/50">%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Visual Style */}
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-widest text-[#8B4513]/70 mb-2">Synthesized Visual Style</span>
                                            <p className="text-lg text-[#1A1A1A]">{extraction.visual_style}</p>
                                        </div>

                                        {/* Color Palette Grid */}
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-widest text-[#8B4513]/70 mb-6">Dominant Chromatic Base</span>
                                            {extraction.color_palette && extraction.color_palette.length > 0 ? (
                                                <div className="flex flex-wrap gap-4">
                                                    {extraction.color_palette.map((hex: string, i: number) => (
                                                        <div key={i} className="group border border-[#D4A574] p-2 bg-[#F5F5DC] flex items-center gap-4 min-w-[140px]">
                                                            <div className="w-8 h-8 flex-shrink-0 border border-[#D4A574]" style={{ backgroundColor: hex }} />
                                                            <span className="text-[10px] font-mono tracking-widest text-[#1A1A1A]/80 group-hover:text-[#1A1A1A] transition-colors">{hex}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-[10px] font-mono text-[#8B4513]/50">NO PALETTE DETECTED.</div>
                                            )}
                                        </div>

                                        {/* DEEP SEMIOTIC DOSSIER */}
                                        {extraction.full_dossier && (
                                            <div className="pt-12 border-t border-[#D4A574] space-y-6">
                                                
                                                {/* Narrative & Subtext Cards */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="border border-[#D4A574] bg-[#1A1A1A] p-6 flex flex-col hover:border-[#D4A574] transition-colors">
                                                        <span className="block text-[9px] uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/30 pb-2">Narrative Framework</span>
                                                        <p className="text-sm text-[#F5F5DC] leading-relaxed font-light">{extraction.full_dossier.narrative_framework}</p>
                                                    </div>
                                                    <div className="border border-[#D4A574] bg-[#1A1A1A] p-6 flex flex-col hover:border-[#D4A574] transition-colors">
                                                        <span className="block text-[9px] uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/30 pb-2">Semiotic Subtext</span>
                                                        <p className="text-sm text-[#F5F5DC] leading-relaxed font-light">{extraction.full_dossier.semiotic_subtext}</p>
                                                    </div>
                                                </div>

                                                {/* Plausible Readings Card */}
                                                {extraction.full_dossier.possible_readings && extraction.full_dossier.possible_readings.length > 0 && (
                                                    <div className="border border-[#D4A574] bg-[#1A1A1A] p-6">
                                                       <span className="block text-[9px] uppercase tracking-widest text-[#D4A574] mb-6 border-b border-[#D4A574]/30 pb-2">Plausible Readings</span>
                                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            {extraction.full_dossier.possible_readings.map((reading, i) => (
                                                                <div key={i} className="bg-[#1A1A1A] border border-[#D4A574]/30 p-5">
                                                                    <p className="text-sm font-medium text-[#F5F5DC] mb-3">{reading.reading}</p>
                                                                    <div className="flex items-start gap-2 text-xs text-[#F5F5DC]/70">
                                                                        <span className="text-[#D4A574]/50 mt-0.5">↳</span>
                                                                        <span className="leading-relaxed">{reading.support.join(" • ")}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                       </div>
                                                    </div>
                                                )}

                                                {/* Strategic Archetype & Objections Cards */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="border border-[#D4A574] bg-[#1A1A1A] p-6">
                                                        <span className="block text-[9px] uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/30 pb-2">Archetype Posture</span>
                                                        <p className="text-base text-[#F5F5DC] tracking-tight">{extraction.full_dossier.archetype_mapping?.target_posture}</p>
                                                        {(extraction.full_dossier.archetype_mapping as any)?.strategic_moves && (
                                                            <div className="mt-6 space-y-3 p-4 bg-[#1A1A1A] border border-[#D4A574]/20">
                                                                {(extraction.full_dossier.archetype_mapping as any).strategic_moves.map((move: string, i: number) => (
                                                                    <div key={i} className="flex gap-3 text-sm text-[#F5F5DC]/80 leading-relaxed group">
                                                                        <div className="w-1.5 h-1.5 bg-[#D4A574]/40 rounded-none mt-1 shrink-0" />
                                                                        <span>{move}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="border border-[#D4A574] bg-[#1A1A1A] p-6">
                                                        <span className="block text-[9px] uppercase tracking-widest text-[#D4A574] mb-4 border-b border-[#D4A574]/30 pb-2">Objection Dismantled</span>
                                                        <p className="text-sm text-[#F5F5DC] leading-relaxed font-light">{extraction.full_dossier.objection_dismantling}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-[#8B4513]/70 text-xs tracking-widest uppercase">No forensic extraction linked to this asset.</div>
                                )}
                            </div>
                        )}

                        {/* NEW TAB: MARKET PULSE */}
                        {activeTab === 'MARKET PULSE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <AdAnalyticsTab brand={asset.brand?.name} />
                            </div>
                        )}

                        {/* TAB 3: PSYCHOLOGY */}
                        {activeTab === 'PSYCHOLOGY' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Trigger Distribution Radar */}
                                    <div className="border border-[#D4A574] bg-[#1A1A1A] p-8 flex flex-col items-center">
                                        <h3 className="text-[11px] font-bold text-[#D4A574] uppercase tracking-[0.2em] mb-8 self-start w-full border-b border-[#D4A574]/30 pb-4">
                                            Trigger Distribution Map
                                        </h3>
                                        <div className="w-full max-w-[320px]">
                                            <RadarChart 
                                                data={Object.entries((extraction?.full_dossier as any)?.archetype_mapping?.trigger_distribution || {}).map(([label, value]) => ({ label, value: value as number }))}
                                                forceLight={true}
                                            />
                                        </div>
                                    </div>

                                    {/* Emotional DNA Heatmap (Placeholder/Text Metric) */}
                                    <div className="border border-[#D4A574] bg-[#1A1A1A] p-8 flex flex-col">
                                        <div className="w-full mb-6">
                                            <h3 className="text-[11px] font-bold text-[#D4A574] uppercase tracking-[0.2em] border-b border-[#D4A574]/30 pb-4">
                                                Emotional DNA Heatmap
                                            </h3>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                                                    <span className="text-[#D4A574]/60">Persuasion Density</span>
                                                    <span className="text-[#F5F5DC]">Max</span>
                                                </div>
                                                <div className="w-full bg-[#1A1A1A] h-1.5 border border-[#D4A574]/30">
                                                <div className="h-full bg-[#D4A574] w-[95%]" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                                                    <span className="text-[#D4A574]/60">Cognitive Friction</span>
                                                    <span className="text-[#F5F5DC]">Low</span>
                                                </div>
                                                <div className="w-full bg-[#1A1A1A] h-1.5 border border-[#D4A574]/30">
                                                <div className="h-full bg-[#D4A574]/40 w-[30%]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: BLUEPRINT */}
                        {activeTab === 'BLUEPRINT' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {!blueprintData ? (
                                    <div className="border border-[#D4A574] bg-[#F5F5DC] p-12 flex flex-col items-center justify-center text-center">
                                        <h3 className="text-[#8B4513] text-lg font-light mb-2">Production Blueprint Uninitialized</h3>
                                        <p className="text-[#8B4513]/70 text-sm max-w-sm mb-8">Synthesize the extraction data into elite execution constraints.</p>
                                        <button
                                            onClick={handleGenerateBlueprint}
                                            disabled={isGeneratingBlueprint || !extraction}
                                            className="bg-[#8B4513] text-[#F5F5DC] px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#1A1A1A] transition-colors disabled:opacity-50"
                                        >
                                            {isGeneratingBlueprint ? 'Synthesizing Blueprint...' : 'Generate Blueprint'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-12">

                                        {/* Iteration Test Plan (Remixing) */}
                                        {extraction?.full_dossier?.test_plan && (
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-widest text-[#8B4513]/70 mb-4 border-b border-[#D4A574] pb-2">Iteration & Test Plan</span>
                                                <p className="text-sm text-[#1A1A1A] mb-6 border-l-2 border-[#BB9E7B] pl-4">{extraction.full_dossier.test_plan.hypothesis}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    {extraction.full_dossier.test_plan.test_cells.map((cell: any, i: number) => (
                                                        <div key={i} className="border border-[#D4A574] p-6 bg-[#F5F5DC] flex flex-col">
                                                            <span className="text-[10px] font-bold tracking-widest text-[#BB9E7B] uppercase block mb-3">{cell.lever}</span>
                                                            <p className="text-sm text-[#1A1A1A] font-light mb-4">{cell.change}</p>
                                                            <p className="text-[9px] text-[#8B4513]/70 uppercase tracking-widest mt-auto border-t border-[#D4A574]/50 pt-3">{cell.rationale}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* DNA Prompt Code Block */}
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-widest text-[#8B4513]/70 mb-4 border-b border-[#D4A574] pb-2">Verified DNA Prompt (Midjourney Native)</span>
                                            <div className="bg-[#F5F5DC] border border-[#D4A574] p-6 relative group">
                                                <code className="text-[#1A1A1A] font-mono text-xs leading-relaxed break-all">
                                                    {blueprintData.verified_dna_prompt}
                                                </code>
                                                <button
                                                    className="absolute top-4 right-4 text-[9px] font-bold tracking-widest uppercase text-[#8B4513]/50 hover:text-[#1A1A1A] transition-colors"
                                                    onClick={() => navigator.clipboard.writeText(blueprintData.verified_dna_prompt)}
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>

                                        {/* Execution Constraints Checklist */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-widest text-[#8B4513]/70 mb-4 border-b border-[#D4A574] pb-2">Primary Trigger</span>
                                                <p className="text-lg text-[#1A1A1A] font-light">{blueprintData.execution_constraints.primary_trigger}</p>
                                            </div>
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-widest text-[#8B4513]/70 mb-4 border-b border-[#D4A574] pb-2">Technical Specs</span>
                                                <ul className="space-y-2 text-sm text-[#1A1A1A]/80">
                                                    <li><span className="text-[#1A1A1A] uppercase text-[10px] tracking-widest">Lighting:</span> {blueprintData.technical_specs.lighting_architecture}</li>
                                                    <li><span className="text-[#1A1A1A] uppercase text-[10px] tracking-widest">Gaze Vector:</span> {blueprintData.technical_specs.gaze_vector}</li>
                                                    <li><span className="text-[#1A1A1A] uppercase text-[10px] tracking-widest">Material Cues:</span> {blueprintData.technical_specs.material_cues.join(', ')}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Brutalist [+] / [-] constraints */}
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-widest text-[#8B4513]/70 mb-6 border-b border-[#D4A574] pb-2">Strict Inclusion/Exclusion Constraints</span>
                                            <div className="space-y-3 font-mono text-sm">
                                                {blueprintData.execution_constraints.must_include.map((item: string, i: number) => (
                                                    <div key={`inc-${i}`} className="flex items-start gap-3">
                                                        <span className="text-[#1A1A1A]">[+]</span>
                                                        <span className="text-[#1A1A1A] uppercase">{item}</span>
                                                    </div>
                                                ))}
                                                {blueprintData.execution_constraints.must_not_include.map((item: string, i: number) => (
                                                    <div key={`exc-${i}`} className="flex items-start gap-3">
                                                        <span className="text-[#8B4513]/50">[-]</span>
                                                        <span className="text-[#8B4513]/70 uppercase line-through">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sovereign PDF Footer */}
                        <SovereignPrintFooter agency={agency} assetId={asset.id} />
                    </div>
                </div>
            </div>
        </>
    );
}
