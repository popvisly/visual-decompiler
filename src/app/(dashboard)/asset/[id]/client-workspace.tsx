"use client";

import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import GatekeeperIntercept from '@/components/GatekeeperIntercept';
import { SovereignPrintHeader, SovereignPrintFooter } from '@/components/SovereignDossierParts';
import AdAnalyticsTab from '@/components/AdAnalyticsTab';
import RadarChart from '@/components/RadarChart';
import { FileDown, Code, Info } from 'lucide-react';

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
    'Analysing trigger mechanics',
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

const INTELLIGENCE_DEFINITIONS = {
    PRIMARY_MECHANIC: {
        title: "Primary Mechanic",
        description: "The core psychological or strategic engine driving the ad's effectiveness. It identifies the fundamental 'how' behind the creative execution."
    },
    SYSTEM_CONFIDENCE: {
        title: "System Confidence",
        description: "The mathematical certainty of the extraction. Scores above 90% indicate high architectural alignment between the visual data and semantic analysis."
    },
    VISUAL_STYLE: {
        title: "Synthesized Visual Style",
        description: "A forensic breakdown of the asset's aesthetic DNA. It tracks the marriage of lighting, color, and composition.",
        breakdown: [
            { label: "LUMA", text: "Lighting intensity and exposure curves. High scores imply high-contrast, dramatic lighting architecture." },
            { label: "CHROMAT", text: "Color saturation and vibrance levels. Measures the intensity of the brand's 'Chromatic Punctuation'." },
            { label: "VECTOR", text: "Structural eyeflow and composition. Measures 'Visual Hierarchy' and lead-in lines toward the product." }
        ]
    },
    CHROMATIC_BASE: {
        title: "Chromatic Base",
        description: "The dominant color palette detected in the frame. These colors form the foundational 'mood' and brand identity anchors."
    }
};

const InfoButton = ({ section }: { section: keyof typeof INTELLIGENCE_DEFINITIONS }) => {
    const [isOpen, setIsOpen] = useState(false);
    const def = INTELLIGENCE_DEFINITIONS[section];

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 hover:bg-[#D4A574]/10 rounded-full transition-colors group flex items-center justify-center"
                aria-label="Information"
            >
                <Info className={`w-3.5 h-3.5 ${isOpen ? 'text-[#D4A574]' : 'text-[#D4A574]/40 group-hover:text-[#D4A574]'}`} />
            </button>
            
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-8 w-64 p-5 bg-[#F5F5DC] border border-[#1A1A1A]/20 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] mb-2 border-b border-[#1A1A1A]/10 pb-2">{def.title}</h4>
                        <p className="text-[11px] text-[#1A1A1A]/80 leading-relaxed font-medium">{def.description}</p>
                        
                        {'breakdown' in def && (
                            <div className="mt-4 space-y-3 pt-4 border-t border-[#1A1A1A]/10">
                                {def.breakdown.map((item, i) => (
                                    <div key={i}>
                                        <span className="block text-[9px] font-bold text-[#1A1A1A] uppercase tracking-tighter mb-0.5">{item.label}</span>
                                        <p className="text-[10px] text-[#1A1A1A]/70 leading-tight">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
const AnalyticWaveMap = ({ index, isActive }: { index: number, isActive?: boolean }) => {
    // Multi-layered "Neural Frequency" waves for each act
    const waves = [
        {
            paths: [
                "M 0 50 Q 20 10 40 60 Q 60 0 80 40 T 100 20 L 100 85 L 0 85 Z",
                "M 0 55 Q 25 25 50 65 Q 75 10 100 50 L 100 85 L 0 85 Z",
                "M 0 60 Q 30 45 60 75 Q 90 25 100 60 L 100 85 L 0 85 Z"
            ],
            color: "#D4A574"
        },
        {
            paths: [
                "M 0 40 Q 10 70 20 40 T 40 50 T 60 30 T 80 60 T 100 40 L 100 85 L 0 85 Z",
                "M 0 45 Q 15 75 30 45 T 50 55 T 70 35 T 90 65 T 100 45 L 100 85 L 0 85 Z",
                "M 0 50 Q 20 80 40 50 T 60 60 T 80 40 T 100 70 L 100 85 L 0 85 Z"
            ],
            color: "#8B4513"
        },
        {
            paths: [
                "M 0 60 Q 50 60 100 60 L 100 85 L 0 85 Z",
                "M 0 55 Q 50 65 100 55 L 100 85 L 0 85 Z",
                "M 0 65 Q 50 55 100 65 L 100 85 L 0 85 Z"
            ],
            color: "#D4A574"
        }
    ];

    const currentWaves = waves[index] || waves[0];
    
    return (
        <div className={`w-full h-32 relative transition-all duration-700 my-8 ${isActive ? 'opacity-100 scale-[1.02]' : 'opacity-40 group-hover/block:opacity-80'}`}>
            <svg className="w-full h-full" viewBox="0 0 100 85" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={currentWaves.color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={currentWaves.color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                
                {/* Vertical Forensic Grid-lines */}
                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="85" stroke="#D4A574" strokeWidth="0.2" strokeDasharray="1 3" strokeOpacity="0.15" />
                ))}

                {/* Layered Waves */}
                {currentWaves.paths.map((p, i) => (
                    <path 
                        key={i}
                        d={p} 
                        fill={`url(#grad-${index})`}
                        stroke={currentWaves.color} 
                        strokeWidth="0.75"
                        strokeOpacity={0.6 - (i * 0.15)}
                        className="vector-path"
                        style={{ 
                            transform: `translateY(${i * 2}px)`,
                            opacity: 1 - (i * 0.2)
                        }}
                    />
                ))}

                {/* Vertical High-Density Markers */}
                <line x1="25" y1="0" x2="25" y2="85" stroke="#D4A574" strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.2" />
                <line x1="50" y1="0" x2="50" y2="85" stroke="#D4A574" strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.2" />
                <line x1="75" y1="0" x2="75" y2="85" stroke="#D4A574" strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.2" />

                {/* Bottom Border Anchor Line */}
                <line x1="0" y1="84.5" x2="100" y2="84.5" stroke="#D4A574" strokeWidth="1" strokeOpacity="0.3" />
            </svg>
            
            {/* Legend Labels / Anchors */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 py-1">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="w-1.5 h-1.5 bg-[#D4A574]/30 rounded-full shadow-[0_0_5px_rgba(212,165,116,0.2)]" />
                ))}
            </div>
        </div>
    );
};

const DossierGrid = ({ title, content, type, activeAct }: { title: string, content: string, type: 'ACT' | 'CHANNEL', activeAct?: string | null }) => {
    if (!content) return null;

    // Parsing logic
    const regex = type === 'ACT' ? /\bACT\s+[IVX]+:/i : /\bCHANNEL\s+\d+:/i;
    const parts = content.split(regex);
    const matches = content.match(new RegExp(regex, 'gi')) || [];
    
    // The first part is usually intro text (Overture)
    const overture = parts[0]?.trim();
    const blocks = parts.slice(1).map((text, i) => ({
        label: matches[i]?.replace(':', '').trim(),
        text: text.trim().split(' — ')[1] || text.trim(),
        title: text.trim().split(' — ')[0] || ''
    }));

    return (
        <div className="col-span-full flex flex-col gap-8">
            {/* Header & Lead-in Card (Consolidated) */}
            {(title || overture || blocks.length > 0) && (
                <div 
                    id={type === 'ACT' ? blocks[0]?.label : undefined} 
                    className={`forensic-act-block border p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group/block transition-all duration-500 ${
                        activeAct === blocks[0]?.label ? 'border-[#D4A574] bg-[#1A1A1A]/90 ring-1 ring-[#D4A574]/30' : 'border-[#D4A574]/20 bg-[#1A1A1A]'
                    }`}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A574]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        {/* Section Header */}
                        <div className="flex justify-between items-center mb-10 border-b border-[#D4A574]/20 pb-6">
                            <h3 className="text-[14px] font-bold uppercase tracking-[0.4em] text-[#D4A574]">{title}</h3>
                            <span className="text-[10px] font-mono text-[#D4A574]/30 uppercase tracking-widest">Forensic Map v2.0</span>
                        </div>
                        
                        {/* Overture / Prologue */}
                        {overture && (
                            <div className="mb-12 max-w-4xl">
                                <p className="text-[15px] text-white/90 leading-relaxed font-light italic border-l-2 border-[#D4A574] pl-6 py-2">
                                    {overture}
                                </p>
                            </div>
                        )}

                        {/* Integrated First Block (Act I / Channel 1) */}
                        {blocks.length > 0 && (
                            <div className="flex flex-col gap-6 pt-4">
                                <div className="flex justify-between items-start border-b border-[#D4A574]/10 pb-4 relative">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-2 h-2 rounded-full bg-[#D4A574] shadow-[0_0_10px_#D4A574]" />
                                            <span className="text-[11px] font-bold text-[#D4A574] uppercase tracking-[0.4em]">{blocks[0].label}</span>
                                        </div>
                                        <h4 className="text-[28px] font-bold text-white uppercase tracking-[0.05em]">{blocks[0].title}</h4>
                                    </div>
                                    <div className="group/info relative cursor-help pt-2">
                                        <svg className="w-4 h-4 text-[#D4A574]/40 group-hover/info:text-[#D4A574] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="absolute top-full right-0 mt-4 w-64 bg-[#1A1A1A] border border-[#D4A574]/30 p-4 rounded-xl shadow-2xl opacity-0 translate-y-2 group-hover/info:opacity-100 group-hover/info:translate-y-0 transition-all z-50 pointer-events-none">
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-[#D4A574] mb-2">Forensic Protocol {blocks[0].label}</p>
                                            <p className="text-[12px] text-white/70 leading-relaxed font-light">
                                                {type === 'ACT' 
                                                    ? "Monitors the neural 'Neural Frequency' across this strategic act. The wave density indicates persuasion pressure and cognitive resonance." 
                                                    : "Isolated semiotic channel audit. Cross-referencing visual signals with underlying brand machinery."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {type === 'ACT' && <AnalyticWaveMap index={0} isActive={activeAct === blocks[0].label} />}
                                
                                <div className="space-y-6 max-w-5xl">
                                    {blocks[0].text.split('\n').filter(p => p.trim()).map((paragraph, pi) => (
                                        <p key={pi} className="text-[15px] text-white/70 leading-[1.8] font-light">
                                            {paragraph.trim()}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Remaining Modular Block Cards */}
            {blocks.slice(1).map((block, i) => (
                <div 
                    key={i + 1} 
                    id={type === 'ACT' ? block.label : undefined} 
                    className={`forensic-act-block border p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group/block transition-all duration-500 ${
                        activeAct === block.label ? 'border-[#D4A574] bg-[#1A1A1A]/90 ring-1 ring-[#D4A574]/30' : 'border-[#D4A574]/20 bg-[#1A1A1A]'
                    }`}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A574]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-start border-b border-[#D4A574]/10 pb-4 relative">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-[#D4A574] shadow-[0_0_10px_#D4A574]" />
                                        <span className="text-[11px] font-bold text-[#D4A574] uppercase tracking-[0.4em]">{block.label}</span>
                                    </div>
                                    <h4 className="text-[28px] font-bold text-white uppercase tracking-[0.05em]">{block.title}</h4>
                                </div>
                                <div className="group/info relative cursor-help pt-2">
                                    <svg className="w-4 h-4 text-[#D4A574]/40 group-hover/info:text-[#D4A574] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="absolute top-full right-0 mt-4 w-64 bg-[#1A1A1A] border border-[#D4A574]/30 p-4 rounded-xl shadow-2xl opacity-0 translate-y-2 group-hover/info:opacity-100 group-hover/info:translate-y-0 transition-all z-50 pointer-events-none">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#D4A574] mb-2">Forensic Protocol {block.label}</p>
                                        <p className="text-[12px] text-white/70 leading-relaxed font-light">
                                            {type === 'ACT' 
                                                ? "Monitors the neural 'Neural Frequency' across this strategic act. The wave density indicates persuasion pressure and cognitive resonance." 
                                                : "Isolated semiotic channel audit. Cross-referencing visual signals with underlying brand machinery."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {type === 'ACT' && <AnalyticWaveMap index={i + 1} isActive={activeAct === block.label} />}
                            
                            <div className="space-y-6 max-w-5xl">
                                {block.text.split('\n').filter(p => p.trim()).map((paragraph, pi) => (
                                    <p key={pi} className="text-[15px] text-white/70 leading-[1.8] font-light">
                                        {paragraph.trim()}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Final Section Separator */}
            <div className="pt-8 mb-8 border-t border-[#D4A574]/20 opacity-30" />
        </div>
    );
};


function SovereignProcessingView({ assetId, agency }: { assetId: string, agency?: any }) {
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

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        
        // Initial trigger and occasional poll check
        fetch('/api/vault-extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ assetId })
        }).then(res => res.json()).then(data => {
            if (!isMounted) return;
            if (data.success) {
                setProgress(100);
                setTimeout(() => window.location.reload(), 800);
            } else if (data.error) {
                setError(data.error);
            }
        }).catch((err) => {
            if (isMounted) setError("Extraction engine timeout or network failure. This usually happens with very complex forensic dossiers.");
        });
        
        return () => { isMounted = false; };
    }, [assetId, checkTrigger]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700 bg-rose-50/10 rounded-[3rem] border border-rose-500/10 mb-12">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h2 className="text-[14px] font-bold text-rose-900 uppercase tracking-widest mb-3">Intelligence Extraction Failed</h2>
                <p className="text-[11px] text-[#1A1A1A]/60 text-center max-w-[320px] leading-relaxed mb-8 px-4 font-medium uppercase tracking-tighter">
                    {error}
                </p>
                <button
                    onClick={() => setCheckTrigger(prev => prev + 1)}
                    className="px-10 py-4 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#8B4513] transition-all rounded-full"
                >
                    Re-Trigger Forensic Scan
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-1000">
            {/* Header branding placeholder */}
            <div className="text-center mb-12">
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#D4A574] mb-3">
                    {agency?.is_whitelabel_active ? (agency.name || 'Visual Decompiler') : 'Visual Decompiler'}
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
                            <span className="ml-auto text-[8px] font-mono text-[#D4A574]/40 tracking-widest">ANALYSED</span>
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
                    Analysing takes roughly 2–3 minutes. Your report will be waiting here when complete.
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

    const [sequenceData, setSequenceData] = useState<SequenceData | null>(null);
    const [blueprintData, setBlueprintData] = useState<BlueprintData | null>(null);
    const [activeAct, setActiveAct] = useState<string | null>(null);

    // Normalize extraction payload (V1 array vs V2 object)
    const extraction = Array.isArray(asset.extraction) ? asset.extraction[0] : asset.extraction;
    
    // Parse visual style string if it's stringified JSON
    let parsedStyle = extraction?.visual_style;

    // Intersection Observer for "Focal Zoom" evolution
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveAct(entry.target.id);
                }
            });
        }, {
            // Focus on elements in the center 40% of the viewport
            rootMargin: '-30% 0% -30% 0%',
            threshold: 0.2
        });

        const targets = document.querySelectorAll('.forensic-act-block');
        targets.forEach(t => observer.observe(t));

        return () => observer.disconnect();
    }, [activeTab, extraction]);

    // Dynamic Asset Transforms
    const getAssetStyle = () => {
        const base = {
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            filter: 'none',
            transform: 'none',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        };

        if (activeAct === 'ACT I') {
            return {
                ...base,
                boxShadow: '0 0 40px rgba(212, 165, 116, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            };
        }
        if (activeAct === 'ACT II') {
            return {
                ...base,
                transform: 'scale(1.15) translateY(-10%)',
                filter: 'brightness(1.05)'
            };
        }
        if (activeAct === 'ACT III') {
            return {
                ...base,
                transform: 'scale(1.25) translateY(20%)',
                filter: 'brightness(1.1)'
            };
        }
        return base;
    };

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
                <div className="flex flex-col md:flex-row md:items-start min-h-screen w-full max-w-[1440px] bg-[#FBFBF6] border-x border-[#D4A574]/10 shadow-[0_0_80px_rgba(0,0,0,0.03)] text-[#1A1A1A]">

                    {/* LEFT COLUMN: Sticky Media Viewer (45%) */}
                    <aside className="w-full md:w-[45%] border-r border-[#D4A574]/20 relative bg-[#FBFBF6] md:sticky md:top-0 z-10">
                        <div className="pt-14 pb-8 px-8 flex flex-col justify-center items-center">

                            <div className="w-full relative h-[80%] flex items-center justify-center overflow-hidden border border-[#D4A574]/30 bg-[#1A1A1A] group rounded-2xl shadow-2xl" style={getAssetStyle()}>
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
                                {asset.type !== 'STATIC' && (
                                    <div className="absolute top-4 left-4 bg-[#1A1A1A]/90 border border-[#D4A574]/40 px-3 py-1 backdrop-blur-sm rounded-none">
                                        <span className="text-[9px] uppercase tracking-widest text-[#D4A574]">{asset.type}</span>
                                    </div>
                                )}
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
                    </aside>

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
                                        {(!extraction.primary_mechanic || !extraction.full_dossier) && <SovereignProcessingView assetId={asset.id} agency={agency} />}

                                        {/* Top 4 Extraction Metrics as Intelligence Cards */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-2">
                                            
                                            {/* Unified Primary Intelligence Metric */}
                                            <div className="col-span-1 lg:col-span-3 bg-[#1A1A1A] border border-[#D4A574]/20 rounded-3xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center gap-6 min-h-[140px]">
                                                {/* Left: Primary Mechanic */}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center mb-4 border-b border-[#D4A574]/20 pb-2">
                                                        <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">Primary Mechanic</span>
                                                        <InfoButton section="PRIMARY_MECHANIC" />
                                                    </div>
                                                    <h2 className="text-xl lg:text-2xl font-light uppercase tracking-[0.2em] text-[#FFFFFF] leading-snug">
                                                        {extraction.primary_mechanic}
                                                    </h2>
                                                </div>

                                                {/* Vertical Divider (Desktop Only) */}
                                                <div className="hidden lg:block w-[1px] h-24 bg-[#D4A574]/20 mx-4" />

                                                {/* Right: System Confidence */}
                                                <div className="w-full lg:w-48 flex flex-col">
                                                    <div className="flex justify-between items-center mb-4 border-b border-[#D4A574]/20 pb-2">
                                                        <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">Confidence</span>
                                                        <InfoButton section="SYSTEM_CONFIDENCE" />
                                                    </div>
                                                    <div className="text-5xl font-mono text-[#FFFFFF] tracking-tighter mt-auto lg:text-right">
                                                        {extraction.confidence_score <= 1 ? Math.round(extraction.confidence_score * 100) : extraction.confidence_score}<span className="text-[#D4A574]/50">%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Visual Style */}
                                            <div className="col-span-1 lg:col-span-2 border border-[#D4A574]/20 bg-[#1A1A1A] rounded-3xl p-6 shadow-sm flex flex-col min-h-[140px]">
                                                <div className="flex justify-between items-center mb-4 border-b border-[#D4A574]/20 pb-2">
                                                    <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">Synthesized Visual Style</span>
                                                    <InfoButton section="VISUAL_STYLE" />
                                                </div>
                                                <div className="flex flex-col h-full">
                                                    <p className="text-sm text-[#FFFFFF] font-light leading-relaxed uppercase tracking-[0.15em] mt-2 mb-8">
                                                        {extraction.visual_style}
                                                    </p>

                                                    {/* Aesthetic Signature Matrix */}
                                                    <div className="mt-auto pt-6 border-t border-[#D4A574]/10 space-y-4">
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[10px] font-bold text-[#D4A574]/60 uppercase tracking-[0.2em] w-14">Luma</span>
                                                            <div className="flex-1 h-2 bg-[#1A1A1A] border border-[#D4A574]/20 rounded-full overflow-hidden">
                                                                <div className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full w-[72%] animate-pulse" />
                                                            </div>
                                                            <span className="text-[10px] font-mono text-[#D4A574]">0.82V</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[10px] font-bold text-[#D4A574]/60 uppercase tracking-[0.2em] w-14">Chromat</span>
                                                            <div className="flex-1 h-2 bg-[#1A1A1A] border border-[#D4A574]/20 rounded-full overflow-hidden">
                                                                <div className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full w-[45%] animate-pulse [animation-delay:200ms]" />
                                                            </div>
                                                            <span className="text-[10px] font-mono text-[#D4A574]">0.44Δ</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[10px] font-bold text-[#D4A574]/60 uppercase tracking-[0.2em] w-14">Vector</span>
                                                            <div className="flex-1 h-2 bg-[#1A1A1A] border border-[#D4A574]/20 rounded-full overflow-hidden">
                                                                <div className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full w-[89%] animate-pulse [animation-delay:400ms]" />
                                                            </div>
                                                            <span className="text-[10px] font-mono text-[#D4A574]">0.91Λ</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Color Palette */}
                                            <div className="col-span-1 border border-[#D4A574]/20 bg-[#1A1A1A] rounded-3xl p-6 shadow-sm flex flex-col min-h-[140px]">
                                                <div className="flex justify-between items-center mb-4 border-b border-[#D4A574]/20 pb-2">
                                                    <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">Chromatic Base</span>
                                                    <InfoButton section="CHROMATIC_BASE" />
                                                </div>
                                                <div className="mt-auto">
                                                    {extraction.color_palette && extraction.color_palette.length > 0 ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {extraction.color_palette.map((hex: string, i: number) => (
                                                                <div key={i} className="group border border-[#D4A574]/30 p-1.5 bg-[#1A1A1A]/80 flex items-center gap-2 rounded-full pr-3 relative hover:scale-[1.02] transition-transform">
                                                                    <div className="w-4 h-4 flex-shrink-0 border border-[#D4A574]/20 rounded-full" style={{ backgroundColor: hex }} />
                                                                    <span className="text-[8px] font-mono tracking-widest text-[#FFFFFF]/70 group-hover:text-[#D4A574] transition-colors">{hex}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-[10px] font-mono text-[#D4A574]/50 uppercase tracking-widest">No Palette Detected.</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* DEEP SEMIOTIC DOSSIER -> 3-COLUMN ELITE GRID */}
                                        {extraction.full_dossier && (
                                            <div className="pt-12 border-t border-[#D4A574]/20 space-y-8">
                                                
                                                {/* FULL-WIDTH FORENSIC DOSSIER */}
                                                <div className="grid grid-cols-1 gap-8">
                                                    <DossierGrid 
                                                        title="Narrative Framework" 
                                                        content={extraction.full_dossier.narrative_framework || ''} 
                                                        type="ACT" 
                                                        activeAct={activeAct}
                                                    />
                                                    
                                                    {/* Section Break Line */}
                                                    <div className="my-10 border-t border-[#D4A574]/10 w-full" />

                                                    <DossierGrid 
                                                        title="Semiotic Subtext" 
                                                        content={extraction.full_dossier.semiotic_subtext || ''} 
                                                        type="CHANNEL" 
                                                    />
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
                                                    <div className="flex justify-between items-end mb-3">
                                                        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">Persuasion Density</span>
                                                        <span className="text-[11px] font-mono text-[#D4A574]/80">{((extraction?.full_dossier as any)?.persuasion_metrics?.persuasion_density as number)}%</span>
                                                    </div>
                                                    <div className="w-full bg-white/5 h-1.5 border border-[#D4A574]/10 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full transition-all duration-1000" 
                                                            style={{ width: `${(extraction?.full_dossier as any)?.persuasion_metrics?.persuasion_density}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-end mb-3">
                                                        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#D4A574]/60">Cognitive Friction</span>
                                                        <span className="text-[11px] font-mono text-[#8B4513]">{((extraction?.full_dossier as any)?.persuasion_metrics?.cognitive_friction as number)}%</span>
                                                    </div>
                                                    <div className="w-full bg-white/5 h-1.5 border border-[#D4A574]/10 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-[#8B4513]/40 rounded-full transition-all duration-1000" 
                                                            style={{ width: `${(extraction?.full_dossier as any)?.persuasion_metrics?.cognitive_friction}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-8 pt-6 border-t border-[#D4A574]/10">
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-3.5 h-3.5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            <span className="text-[13px] font-bold text-[#D4A574] uppercase tracking-[0.3em]">Predictive Longevity</span>
                                                        </div>
                                                        <p className="text-[13px] text-[#FFFFFF]/80 leading-relaxed font-light pl-[22px] border-l border-[#D4A574]/20">
                                                            {((extraction?.full_dossier as any)?.persuasion_metrics?.predictive_longevity as string)}
                                                        </p>
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
