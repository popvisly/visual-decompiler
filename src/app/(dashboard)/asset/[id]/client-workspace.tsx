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
                    .bg-black { background: white !important; }
                    .bg-neutral-950 { background: #fafafa !important; }
                    .text-white { color: #141414 !important; }
                    .text-neutral-500 { color: #666 !important; }
                    .border-neutral-800 { border-color: #eee !important; }
                    
                    /* Force grid on print */
                    .flex-col { display: block !important; }
                    .md\\:flex-row { display: block !important; }
                    .w-full { width: 100% !important; }
                    
                    /* Tabs management */
                    .sticky { position: relative !important; background: transparent !important; }
                    
                    /* Accent Color Injection */
                    h2, .text-white { color: ${agency?.primary_hex || '#141414'} !important; }
                }
            `}</style>
            <GatekeeperIntercept isVisible={showGatekeeper} onClose={() => setShowGatekeeper(false)} />
            <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">

                {/* LEFT COLUMN: Sticky Media Viewer (45%) */}
                <div className="w-full md:w-[45%] border-r border-neutral-800 relative bg-neutral-950">
                    <div className="md:sticky md:top-0 h-[50vh] md:h-screen p-8 flex flex-col justify-center items-center">

                        <div className="w-full relative h-[80%] flex items-center justify-center overflow-hidden border border-neutral-800 bg-black group">
                            {/* If multiple images, render a horizontal CSS scroll snap setup */}
                            <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                                {fileUrls.map((url, idx) => (
                                    <img
                                        key={idx}
                                        src={url}
                                        alt={`Asset frame ${idx}`}
                                        className="w-full h-full object-contain shrink-0 snap-center grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                    />
                                ))}
                            </div>
                            {fileUrls.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black border border-neutral-800 px-3 py-1 flex gap-2">
                                    {fileUrls.map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                                    ))}
                                </div>
                            )}
                            <div className="absolute top-4 left-4 bg-black/80 border border-neutral-800 px-3 py-1 backdrop-blur-sm">
                                <span className="text-[9px] uppercase tracking-widest text-white">{asset.type}</span>
                            </div>
                        </div>

                        <div className="w-full mt-6 flex justify-between items-end border-b border-neutral-800 pb-4">
                            <div>
                                <h1 className="text-2xl font-light tracking-tightest text-white uppercase">{asset.brand?.name}</h1>
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">{asset.brand?.market_sector}</span>
                            </div>
                            <div className="flex flex-col items-end gap-2 relative">
                                <span className="text-[9px] font-mono tracking-widest text-neutral-600">ID: {asset.id.split('-')[0]}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCopyEmbed}
                                        className="no-print flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-white text-[9px] font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
                                    >
                                        <Code className="w-3 h-3" />
                                        Copy Embed Widget
                                    </button>
                                    <button
                                        onClick={() => window.print()}
                                        className="no-print flex items-center gap-2 px-3 py-1.5 bg-white text-black text-[9px] font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                                    >
                                        <FileDown className="w-3 h-3" />
                                        Export Dossier
                                    </button>
                                </div>
                                {/* Simple Toast Notification */}
                                {showCopiedToast && (
                                    <div className="absolute top-full mt-2 right-0 bg-white text-black text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                        Embed Code Copied
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Scrollable Forensic Console (55%) */}
                <div className="w-full md:w-[55%] bg-black min-h-screen">

                    {/* Minimalist Segmented Controls */}
                    <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-md border-b border-neutral-800 px-8 pt-8 md:pt-12 pb-0 flex gap-8">
                        {(['INTELLIGENCE', 'MARKET PULSE', 'PSYCHOLOGY', 'BLUEPRINT'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors relative ${activeTab === tab ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
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
                                        <div className="grid grid-cols-2 border-b border-neutral-800 pb-12">
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-2">Primary Mechanic</span>
                                                <h2 className="text-3xl font-light leading-tight text-white">{extraction.primary_mechanic}</h2>
                                            </div>
                                            <div className="pl-8 border-l border-neutral-800 flex flex-col justify-center">
                                                <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-2">System Confidence</span>
                                                <div className="text-4xl font-mono text-white tracking-tighter">
                                                    {extraction.confidence_score <= 1 ? Math.round(extraction.confidence_score * 100) : extraction.confidence_score}<span className="text-neutral-600">%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Visual Style */}
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-2">Synthesized Visual Style</span>
                                            <p className="text-lg text-neutral-300">{extraction.visual_style}</p>
                                        </div>

                                        {/* Color Palette Grid */}
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-6">Dominant Chromatic Base</span>
                                            {extraction.color_palette && extraction.color_palette.length > 0 ? (
                                                <div className="flex flex-wrap gap-4">
                                                    {extraction.color_palette.map((hex: string, i: number) => (
                                                        <div key={i} className="group border border-neutral-800 p-2 bg-neutral-950 flex items-center gap-4 min-w-[140px]">
                                                            <div className="w-8 h-8 flex-shrink-0 border border-neutral-800" style={{ backgroundColor: hex }} />
                                                            <span className="text-[10px] font-mono tracking-widest text-neutral-400 group-hover:text-white transition-colors">{hex}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-[10px] font-mono text-neutral-600">NO PALETTE DETECTED.</div>
                                            )}
                                        </div>

                                        {/* DEEP SEMIOTIC DOSSIER */}
                                        {extraction.full_dossier && (
                                            <div className="pt-12 border-t border-neutral-800 space-y-6">
                                                
                                                {/* Narrative & Subtext Cards */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col hover:border-neutral-700 transition-colors">
                                                        <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800/50 pb-2">Narrative Framework</span>
                                                        <p className="text-sm text-neutral-300 leading-relaxed font-light">{extraction.full_dossier.narrative_framework}</p>
                                                    </div>
                                                    <div className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col hover:border-neutral-700 transition-colors">
                                                        <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800/50 pb-2">Semiotic Subtext</span>
                                                        <p className="text-sm text-neutral-300 leading-relaxed font-light">{extraction.full_dossier.semiotic_subtext}</p>
                                                    </div>
                                                </div>

                                                {/* Plausible Readings Card */}
                                                {extraction.full_dossier.possible_readings && extraction.full_dossier.possible_readings.length > 0 && (
                                                    <div className="border border-neutral-800 bg-neutral-950 p-6">
                                                       <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-6 border-b border-neutral-800/50 pb-2">Plausible Readings</span>
                                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            {extraction.full_dossier.possible_readings.map((reading, i) => (
                                                                <div key={i} className="bg-black border border-neutral-800 p-5">
                                                                    <p className="text-sm font-medium text-white mb-3">{reading.reading}</p>
                                                                    <div className="flex items-start gap-2 text-xs text-neutral-400">
                                                                        <span className="text-neutral-600 mt-0.5">↳</span>
                                                                        <span className="leading-relaxed">{reading.support.join(" • ")}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                       </div>
                                                    </div>
                                                )}

                                                {/* Strategic Archetype & Objections Cards */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="border border-neutral-800 bg-neutral-950 p-6">
                                                        <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800/50 pb-2">Archetype Posture</span>
                                                        <p className="text-base text-white tracking-tight">{extraction.full_dossier.archetype_mapping?.target_posture}</p>
                                                        {extraction.full_dossier.archetype_mapping?.strategic_moves && (
                                                            <div className="mt-6 space-y-3 p-4 bg-black border border-neutral-800/50">
                                                                {extraction.full_dossier.archetype_mapping.strategic_moves.map((move, i) => (
                                                                    <div key={i} className="text-xs text-neutral-400 flex items-start gap-3">
                                                                        <div className="w-1.5 h-1.5 bg-neutral-600 rounded-none mt-1 shrink-0" />
                                                                        <span className="leading-tight">{move}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="border border-neutral-800 bg-neutral-950 p-6">
                                                        <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800/50 pb-2">Objection Dismantled</span>
                                                        <p className="text-sm text-neutral-300 leading-relaxed font-light">{extraction.full_dossier.objection_dismantling}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-neutral-500 text-xs tracking-widest uppercase">No forensic extraction linked to this asset.</div>
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
                                    <div className="border border-neutral-800 bg-neutral-950 p-8 flex flex-col items-center justify-center">
                                        <div className="w-full mb-6">
                                            <span className="block text-[9px] uppercase tracking-widest text-neutral-500 border-b border-neutral-800/50 pb-2">Trigger Distribution</span>
                                        </div>
                                        <div className="w-full max-w-[300px]">
                                            <RadarChart
                                                data={[
                                                    { label: 'Visual Appeal', value: extraction?.primary_mechanic?.includes('Aesthetic') ? 95 : 70 },
                                                    { label: 'Status / Prestige', value: extraction?.primary_mechanic?.includes('Status') ? 90 : 60 },
                                                    { label: 'Trust / Legacy', value: extraction?.full_dossier?.archetype_mapping?.target_posture?.includes('Authority') ? 85 : 55 },
                                                    { label: 'Intellectual', value: extraction?.primary_mechanic?.includes('Minimalism') ? 80 : 40 },
                                                    { label: 'Urgency', value: extraction?.full_dossier?.objection_dismantling?.includes('Time') ? 75 : 30 }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Emotional DNA Heatmap (Placeholder/Text Metric) */}
                                    <div className="border border-neutral-800 bg-neutral-950 p-8 flex flex-col">
                                        <div className="w-full mb-6">
                                            <span className="block text-[9px] uppercase tracking-widest text-neutral-500 border-b border-neutral-800/50 pb-2">Emotional DNA</span>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center space-y-6">
                                            <div>
                                                <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-2">
                                                    <span>Aspirational Gap</span>
                                                    <span className="text-white">High</span>
                                                </div>
                                                <div className="w-full bg-black h-1.5 border border-neutral-800">
                                                    <div className="h-full bg-[#BB9E7B] w-[85%]" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-2">
                                                    <span>Accessibility Friction</span>
                                                    <span className="text-white">Max</span>
                                                </div>
                                                <div className="w-full bg-black h-1.5 border border-neutral-800">
                                                    <div className="h-full bg-neutral-400 w-[95%]" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-2">
                                                    <span>Rational Justification</span>
                                                    <span className="text-white">Low</span>
                                                </div>
                                                <div className="w-full bg-black h-1.5 border border-neutral-800">
                                                    <div className="h-full bg-neutral-700 w-[30%]" />
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
                                    <div className="border border-neutral-800 bg-neutral-950 p-12 flex flex-col items-center justify-center text-center">
                                        <h3 className="text-white text-lg font-light mb-2">Production Blueprint Uninitialized</h3>
                                        <p className="text-neutral-500 text-sm max-w-sm mb-8">Synthesize the extraction data into elite execution constraints.</p>
                                        <button
                                            onClick={handleGenerateBlueprint}
                                            disabled={isGeneratingBlueprint || !extraction}
                                            className="bg-white text-black px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-300 transition-colors disabled:opacity-50"
                                        >
                                            {isGeneratingBlueprint ? 'Synthesizing Blueprint...' : 'Generate Blueprint'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-12">

                                        {/* Iteration Test Plan (Remixing) */}
                                        {extraction?.full_dossier?.test_plan && (
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800 pb-2">Iteration & Test Plan</span>
                                                <p className="text-sm text-neutral-300 mb-6 border-l-2 border-[#BB9E7B] pl-4">{extraction.full_dossier.test_plan.hypothesis}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    {extraction.full_dossier.test_plan.test_cells.map((cell: any, i: number) => (
                                                        <div key={i} className="border border-neutral-800 p-6 bg-neutral-950 flex flex-col">
                                                            <span className="text-[10px] font-bold tracking-widest text-[#BB9E7B] uppercase block mb-3">{cell.lever}</span>
                                                            <p className="text-sm text-white font-light mb-4">{cell.change}</p>
                                                            <p className="text-[9px] text-neutral-500 uppercase tracking-widest mt-auto border-t border-neutral-800/50 pt-3">{cell.rationale}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* DNA Prompt Code Block */}
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800 pb-2">Verified DNA Prompt (Midjourney Native)</span>
                                            <div className="bg-neutral-950 border border-neutral-800 p-6 relative group">
                                                <code className="text-neutral-300 font-mono text-xs leading-relaxed break-all">
                                                    {blueprintData.verified_dna_prompt}
                                                </code>
                                                <button
                                                    className="absolute top-4 right-4 text-[9px] font-bold tracking-widest uppercase text-neutral-600 hover:text-white transition-colors"
                                                    onClick={() => navigator.clipboard.writeText(blueprintData.verified_dna_prompt)}
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>

                                        {/* Execution Constraints Checklist */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800 pb-2">Primary Trigger</span>
                                                <p className="text-lg text-white font-light">{blueprintData.execution_constraints.primary_trigger}</p>
                                            </div>
                                            <div>
                                                <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800 pb-2">Technical Specs</span>
                                                <ul className="space-y-2 text-sm text-neutral-400">
                                                    <li><span className="text-white uppercase text-[10px] tracking-widest">Lighting:</span> {blueprintData.technical_specs.lighting_architecture}</li>
                                                    <li><span className="text-white uppercase text-[10px] tracking-widest">Gaze Vector:</span> {blueprintData.technical_specs.gaze_vector}</li>
                                                    <li><span className="text-white uppercase text-[10px] tracking-widest">Material Cues:</span> {blueprintData.technical_specs.material_cues.join(', ')}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Brutalist [+] / [-] constraints */}
                                        <div>
                                            <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-6 border-b border-neutral-800 pb-2">Strict Inclusion/Exclusion Constraints</span>
                                            <div className="space-y-3 font-mono text-sm">
                                                {blueprintData.execution_constraints.must_include.map((item: string, i: number) => (
                                                    <div key={`inc-${i}`} className="flex items-start gap-3">
                                                        <span className="text-white">[+]</span>
                                                        <span className="text-neutral-300 uppercase">{item}</span>
                                                    </div>
                                                ))}
                                                {blueprintData.execution_constraints.must_not_include.map((item: string, i: number) => (
                                                    <div key={`exc-${i}`} className="flex items-start gap-3">
                                                        <span className="text-neutral-600">[-]</span>
                                                        <span className="text-neutral-500 uppercase line-through">{item}</span>
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
