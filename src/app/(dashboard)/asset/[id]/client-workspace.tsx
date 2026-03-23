"use client";

import { useState, useEffect, useRef } from 'react';
import posthog from 'posthog-js';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import GatekeeperIntercept from '@/components/GatekeeperIntercept';
import AdAnalyticsTab from '@/components/AdAnalyticsTab';
import RadarChart from '@/components/RadarChart';
import StrategicPostureMap from '@/components/StrategicPostureMap';
import { FileDown, Code, Info, Sparkles, Copy } from 'lucide-react';
import RadiantArchitectureOverlay from '@/components/RadiantArchitectureOverlay';
import AddToBoard from '@/components/AddToBoard';
import AssetTagEditor from '@/components/AssetTagEditor';
import DossierDecisionSummary from '@/components/DossierDecisionSummary';

interface CloneConcept {
    concept_id?: number;
    title: string;
    hook_type: string;
    logline: string;
    scene: string;
    psychological_mechanism: string;
    copy_direction: string;
    casting_direction: string;
    visual_language: string;
    production_complexity: 'LOW' | 'MEDIUM' | 'HIGH' | string;
    dna_prompt: string;
}

interface CloneOutputData {
    extracted_mechanism: string;
    deployment_principle: string;
    concepts: CloneConcept[];
}

interface MarketPulseData {
    status: 'success' | 'error';
    scope: string;
    assetCount: number;
    dominant_mechanics: {
        mechanic: string;
        count: number;
        share: number;
    }[];
    category_trigger_profile: {
        label: string;
        value: number;
    }[];
    category_persuasion_benchmark: {
        avg_density: number;
        avg_friction: number;
        your_rank: string;
    };
    chromatic_saturation: {
        hex: string;
        count: number;
    }[];
    opportunity_gaps: string[];
}

interface WorkspaceAsset {
    id: string;
    type: string;
    file_url: string;
    brand_id?: string;
    tags?: string[];
    brand?: { name: string; market_sector: string };
    extraction?: {
        primary_mechanic: string;
        visual_style: string;
        confidence_score: number;
        color_palette: string[];
        evidence_anchors: string[] | Record<string, unknown>[];
        dna_prompt: string;
        clone_output?: CloneOutputData | string | null;
        blueprint?: BlueprintData | string | null;
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
        clone_output?: CloneOutputData | string | null;
        blueprint?: BlueprintData | string | null;
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
    blueprint_id?: string;
    status?: 'success' | 'error';
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

const parseBlueprint = (value: BlueprintData | string | null | undefined): BlueprintData | null => {
    if (!value) {
        return null;
    }

    if (typeof value === 'string') {
        try {
            return JSON.parse(value) as BlueprintData;
        } catch {
            return null;
        }
    }

    return value;
};

const parseCloneOutput = (value: CloneOutputData | string | null | undefined): CloneOutputData | null => {
    if (!value) {
        return null;
    }

    if (typeof value === 'string') {
        try {
            return JSON.parse(value) as CloneOutputData;
        } catch {
            return null;
        }
    }

    return value;
};

const splitLeadSentence = (value: string | undefined | null) => {
    if (!value) {
        return {
            lead: '',
            remainder: '',
        };
    }

    const trimmed = value.trim();
    const firstSentenceMatch = trimmed.match(/^.*?[.!?](?:\s|$)/);

    if (!firstSentenceMatch) {
        return {
            lead: trimmed,
            remainder: '',
        };
    }

    const lead = firstSentenceMatch[0].trim();
    const remainder = trimmed.slice(firstSentenceMatch[0].length).trim();

    return { lead, remainder };
};

const firstSentence = (value: string | undefined | null) => {
    if (!value) return '';

    const trimmed = value.trim();
    const match = trimmed.match(/^.*?[.!?](?:\s|$)/);
    return (match?.[0] || trimmed).trim();
};

const parseDossierSections = (content: string | undefined, type: 'ACT' | 'CHANNEL') => {
    if (!content) {
        return {
            intro: '',
            sections: [] as { label: string; title: string; text: string }[],
        };
    }

    const regex = type === 'ACT' ? /\bACT\s+[IVX]+:/gi : /\bCHANNEL\s+\d+:/gi;
    const parts = content.split(regex);
    const matches = content.match(regex) || [];

    return {
        intro: parts[0]?.trim() || '',
        sections: parts.slice(1).map((text, index) => {
            const trimmed = text.trim();
            const [title, ...rest] = trimmed.split(' — ');
            return {
                label: matches[index]?.replace(':', '').trim() || `${type} ${index + 1}`,
                title: rest.length > 0 ? title.trim() : '',
                text: rest.length > 0 ? rest.join(' — ').trim() : trimmed,
            };
        }),
    };
};

const stringifyValue = (value: unknown): string => {
    if (value == null) return '—';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) {
        return value.map((item) => stringifyValue(item)).join(' · ');
    }
    if (typeof value === 'object') {
        return Object.entries(value as Record<string, unknown>)
            .map(([key, entry]) => `${key}: ${stringifyValue(entry)}`)
            .join(' · ');
    }
    return '—';
};

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

const BLUEPRINT_STEPS = [
    'Mapping execution constraints',
    'Synthesizing test variations',
    'Encoding technical specifications',
    'Verifying copy remixes',
    'Finalizing production blueprint',
];

const CLONE_STEPS = [
    'Extracting transferable persuasion DNA',
    'Stripping incumbent aesthetics',
    'Drafting fresh concept routes',
    'Encoding DNA prompts',
    'Finalizing clone concepts',
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
        <div className="space-y-8">
            {/* Semiotic Subtext Header Card */}
            {(title || overture) && (
                <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-center mb-4 border-b border-[#D4A574]/20 pb-4">
                        <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">{title}</h3>
                        <span className="text-[10px] font-mono text-[#D4A574]/30 uppercase tracking-widest">Forensic Map v2.0</span>
                    </div>

                    {/* Overture */}
                    {overture && (
                        <div className="max-h-[400px] overflow-y-auto">
                            <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-light">
                                {overture}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Keep dossier sections vertically stacked to preserve reading width */}
            {blocks.length > 0 && (
                <div className="space-y-8">
                    {blocks.map((block, i) => (
                        <div
                            key={i}
                            id={type === 'ACT' ? block.label : undefined}
                            className={`border bg-[#1A1A1A] p-6 rounded-3xl shadow-sm flex flex-col ${
                                type === 'ACT'
                                    ? 'forensic-act-block min-h-[420px] scroll-mt-24'
                                    : 'min-h-[300px]'
                            } ${
                                type === 'ACT' && activeAct === block.label
                                    ? 'border-[#D4A574]/50 shadow-[0_0_0_1px_rgba(212,165,116,0.18)]'
                                    : 'border-[#D4A574]/20'
                            }`}
                        >
                            {type === 'ACT' ? (
                                <>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`w-2 h-2 rounded-full transition-all ${activeAct === block.label ? 'bg-[#D4A574] shadow-[0_0_14px_rgba(212,165,116,0.45)]' : 'bg-[#D4A574]/60'}`} />
                                        <span className="text-[11px] font-bold text-[#D4A574] uppercase tracking-[0.35em]">{block.label}</span>
                                    </div>
                                    <h3 className="text-[2rem] md:text-[2.5rem] font-bold uppercase tracking-tight text-[#F5F3EE] pb-5 border-b border-[#D4A574]/20">
                                        {block.title}
                                    </h3>
                                    <AnalyticWaveMap index={i} isActive={activeAct === block.label} />
                                    <div className="flex-1">
                                        <div className="space-y-5">
                                            {block.text.split('\n').filter(p => p.trim()).map((paragraph, pi) => (
                                                <p key={pi} className="text-[15px] text-[#FFFFFF]/70 leading-9 font-light">
                                                    {paragraph.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-2 h-2 rounded-full bg-[#D4A574]/60" />
                                        <span className="text-[11px] font-bold text-[#D4A574] uppercase tracking-[0.35em]">{block.label}</span>
                                    </div>
                                    <h3 className="text-[1.75rem] md:text-[2rem] font-bold uppercase tracking-tight text-[#F5F3EE] pb-5 border-b border-[#D4A574]/20">
                                        {block.title}
                                    </h3>
                                    <div className="flex-1 pt-6">
                                        <div className="space-y-4">
                                            {block.text.split('\n').filter(p => p.trim()).map((paragraph, pi) => (
                                                <p key={pi} className="text-[15px] text-[#FFFFFF]/70 leading-9 font-light">
                                                    {paragraph.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

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
    const [activeTab, setActiveTab] = useState<'INTELLIGENCE' | 'SIGNALS' | 'PSYCHOLOGY' | 'BLUEPRINT' | 'MARKET PULSE'>('INTELLIGENCE');
    const [isGeneratingPacing, setIsGeneratingPacing] = useState(false);
    const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false);
    const [isGeneratingClone, setIsGeneratingClone] = useState(false);
    const [showGatekeeper, setShowGatekeeper] = useState(false);
    const [showCopiedToast, setShowCopiedToast] = useState(false);
    const [showRadiant, setShowRadiant] = useState(false);
    const [showCloneDrawer, setShowCloneDrawer] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [isExecutiveSummary, setIsExecutiveSummary] = useState(false);
    const [exportPreset, setExportPreset] = useState<'standard' | 'pitch'>('standard');
    const [blueprintError, setBlueprintError] = useState<string | null>(null);
    const [cloneError, setCloneError] = useState<string | null>(null);
    const [marketPulseError, setMarketPulseError] = useState<string | null>(null);
    const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
    const [marketPulseData, setMarketPulseData] = useState<MarketPulseData | null>(null);
    const [isLoadingMarketPulse, setIsLoadingMarketPulse] = useState(false);
    const [exportClientName, setExportClientName] = useState('');
    const [blueprintProgress, setBlueprintProgress] = useState(0);
    const [blueprintStep, setBlueprintStep] = useState(0);
    const [cloneProgress, setCloneProgress] = useState(0);
    const [cloneStep, setCloneStep] = useState(0);

    const [sequenceData, setSequenceData] = useState<SequenceData | null>(null);
    const [blueprintData, setBlueprintData] = useState<BlueprintData | null>(
        parseBlueprint(Array.isArray(initialAsset.extraction) ? initialAsset.extraction[0]?.blueprint : initialAsset.extraction?.blueprint)
    );
    const [cloneData, setCloneData] = useState<CloneOutputData | null>(
        parseCloneOutput(Array.isArray(initialAsset.extraction) ? initialAsset.extraction[0]?.clone_output : initialAsset.extraction?.clone_output)
    );
    const [activeAct, setActiveAct] = useState<string | null>(null);

    const printRef = useRef<HTMLDivElement>(null);

    // Normalize extraction payload (V1 array vs V2 object)
    const extraction = Array.isArray(asset.extraction) ? asset.extraction[0] : asset.extraction;
    const dossier = extraction?.full_dossier as any;
    const cloneIntroSource = cloneData?.extracted_mechanism || extraction?.primary_mechanic || 'Creative DNA Extraction';
    const cloneIntroBody = cloneData?.deployment_principle || 'Generate five original campaign concepts that preserve the persuasion architecture while shifting the aesthetic, scene, and execution language.';
    const { lead: cloneIntroLead, remainder: cloneIntroRemainder } = splitLeadSentence(cloneIntroSource);
    
    // Parse visual style string if it's stringified JSON
    let parsedStyle = extraction?.visual_style;

    useEffect(() => {
        setBlueprintData(parseBlueprint(extraction?.blueprint));
    }, [extraction]);

    useEffect(() => {
        setCloneData(parseCloneOutput(extraction?.clone_output));
    }, [extraction]);

    useEffect(() => {
        if (!isGeneratingBlueprint) {
            setBlueprintProgress(0);
            setBlueprintStep(0);
            return;
        }

        setBlueprintProgress(12);

        const progressInterval = setInterval(() => {
            setBlueprintProgress((current) => {
                if (current >= 92) return 92;
                return Math.min(92, current + 5 + Math.floor(Math.random() * 7));
            });
        }, 1100);

        const stepInterval = setInterval(() => {
            setBlueprintStep((current) => (current + 1) % BLUEPRINT_STEPS.length);
        }, 1700);

        return () => {
            clearInterval(progressInterval);
            clearInterval(stepInterval);
        };
    }, [isGeneratingBlueprint]);

    useEffect(() => {
        if (!extraction?.full_dossier) {
            return;
        }

        if (window.localStorage.getItem('vd_trial_try_1_completed')) {
            return;
        }

        posthog.capture('trial_try_1_completed', {
            surface: 'asset_result',
            step: 'try_1',
            asset_id: asset.id,
        });
        window.localStorage.setItem('vd_trial_try_1_completed', '1');
    }, [asset.id, extraction?.full_dossier]);

    useEffect(() => {
        if (!isGeneratingClone) {
            setCloneProgress(0);
            setCloneStep(0);
            return;
        }

        setCloneProgress(10);

        const progressInterval = setInterval(() => {
            setCloneProgress((current) => {
                if (current >= 92) return 92;
                return Math.min(92, current + 5 + Math.floor(Math.random() * 7));
            });
        }, 1100);

        const stepInterval = setInterval(() => {
            setCloneStep((current) => (current + 1) % CLONE_STEPS.length);
        }, 1700);

        return () => {
            clearInterval(progressInterval);
            clearInterval(stepInterval);
        };
    }, [isGeneratingClone]);

    useEffect(() => {
        if (activeTab !== 'MARKET PULSE' || !isSovereign || marketPulseData || isLoadingMarketPulse) {
            return;
        }

        const fetchMarketPulse = async () => {
            setMarketPulseError(null);
            setIsLoadingMarketPulse(true);

            try {
                const res = await fetch('/api/market-pulse', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        assetId: asset.id,
                        marketSector: asset.brand?.market_sector || null,
                    }),
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to load Market Pulse');
                }

                setMarketPulseData(data);
            } catch (err) {
                setMarketPulseError(err instanceof Error ? err.message : 'Failed to load Market Pulse');
            } finally {
                setIsLoadingMarketPulse(false);
            }
        };

        void fetchMarketPulse();
    }, [activeTab, asset.brand?.market_sector, asset.id, isLoadingMarketPulse, isSovereign, marketPulseData]);

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

        setBlueprintError(null);
        setIsGeneratingBlueprint(true);
        try {
            const res = await fetch('/api/blueprint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assetId: asset.id })
            });
            const data = await res.json();

            if (!res.ok) {
                const message = typeof data?.message === 'string'
                    ? data.message
                    : typeof data?.error === 'string'
                        ? data.error
                        : 'Failed blueprint extraction';
                throw new Error(message);
            }

            setBlueprintData(data);
            setAsset((current) => {
                const nextExtraction = Array.isArray(current.extraction)
                    ? current.extraction.map((item, index) => index === 0 ? { ...item, blueprint: data } : item)
                    : current.extraction
                        ? { ...current.extraction, blueprint: data }
                        : current.extraction;

                return {
                    ...current,
                    extraction: nextExtraction,
                };
            });
        } catch (err) {
            setBlueprintError(err instanceof Error ? err.message : 'Failed blueprint extraction');
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

    const handleGenerateClone = async () => {
        if (!isSovereign) {
            setShowGatekeeper(true);
            return;
        }

        setCloneError(null);
        setIsGeneratingClone(true);

        try {
            const res = await fetch('/api/clone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assetId: asset.id }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to generate clone concepts');
            }

            setCloneData(data);
            setAsset((current) => {
                const nextExtraction = Array.isArray(current.extraction)
                    ? current.extraction.map((item, index) => index === 0 ? { ...item, clone_output: data } : item)
                    : current.extraction
                        ? { ...current.extraction, clone_output: data }
                        : current.extraction;

                return {
                    ...current,
                    extraction: nextExtraction,
                };
            });
        } catch (err) {
            setCloneError(err instanceof Error ? err.message : 'Failed to generate clone concepts');
        } finally {
            setIsGeneratingClone(false);
        }
    };

    const handleOpenCloneDrawer = () => {
        if (!isSovereign) {
            setShowGatekeeper(true);
            return;
        }

        setShowCloneDrawer(true);
        if (!cloneData && !isGeneratingClone) {
            void handleGenerateClone();
        }
    };

    const handleCopyPrompt = async (prompt: string, index: number) => {
        await navigator.clipboard.writeText(prompt);
        setCopiedPromptIndex(index);
        window.setTimeout(() => setCopiedPromptIndex((current) => (current === index ? null : current)), 1800);
    };

    const handleRefreshMarketPulse = async () => {
        setMarketPulseError(null);
        setIsLoadingMarketPulse(true);

        try {
            const res = await fetch('/api/market-pulse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    assetId: asset.id,
                    marketSector: asset.brand?.market_sector || null,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to load Market Pulse');
            }

            setMarketPulseData(data);
        } catch (err) {
            setMarketPulseError(err instanceof Error ? err.message : 'Failed to load Market Pulse');
        } finally {
            setIsLoadingMarketPulse(false);
        }
    };

    // Print/PDF export: force a dedicated print layout + suppress browser header title text
    const handleExportDossier = () => {
        // DOM inspection (requested): verify what we actually have at print time
        // eslint-disable-next-line no-console
        console.log('[PDF EXPORT] full_dossier:', extraction?.full_dossier);

        const originalTitle = document.title;
        document.body.classList.add('printing');

        const cleanup = () => {
            document.title = originalTitle;
            document.body.classList.remove('printing');
            window.removeEventListener('afterprint', cleanup);
        };

        window.addEventListener('afterprint', cleanup);

        // Removes the "Decompiler — Drop an ad…" title from Chrome's print header.
        // (Users can also disable "Headers and footers" in the print dialog for a fully clean page.)
        document.title = '';

        // Fallback cleanup if afterprint doesn't fire (some browsers)
        window.setTimeout(cleanup, 10_000);

        requestAnimationFrame(() => window.print());
    };

    const handleInitiateExport = () => {
        setShowExportModal(false);
        handleExportDossier();
    };

    // Safe parsing of arrays from strings if needed
    let fileUrls = [asset.file_url];
    try {
        const parsed = JSON.parse(asset.file_url);
        if (Array.isArray(parsed)) fileUrls = parsed;
    } catch (e) { }

    const accentHex = agency?.primary_hex || '#C9A96E';
    const isWhitelabel = Boolean(agency?.is_whitelabel_active);
    const dossierAgencyName = isWhitelabel ? agency?.name || 'Agency' : 'VISUAL DECOMPILER';
    const dossierDescriptor = isWhitelabel
        ? agency?.descriptor || 'FORENSIC INTELLIGENCE SYSTEM'
        : 'FORENSIC INTELLIGENCE SYSTEM';
    const dossierLogo = isWhitelabel ? agency?.logo_url || agency?.whitelabel_logo : null;
    const dossierPreparedBy = isWhitelabel ? agency?.name || 'Agency' : 'Visual Decompiler';
    const dossierContact = agency?.contact_email || 'hello@visualdecompiler.com';
    const dossierConfidentiality = agency?.confidentiality_notice || 'This dossier is confidential and intended solely for the named recipient.';
    const narrativeSections = parseDossierSections(dossier?.narrative_framework, 'ACT');
    const signalSections = parseDossierSections(dossier?.semiotic_subtext, 'CHANNEL');
    const firstFrameUrl = fileUrls[0] || asset.file_url;
    const pitchNarrative = {
        problem:
            `The current category is crowded with surface-level creative signals, which makes it harder for ${asset.brand?.name || 'this brand'} to hold a distinct position without a sharper mechanism.`,
        insight:
            firstSentence(dossier?.archetype_mapping?.target_posture) ||
            firstSentence(dossier?.objection_dismantling) ||
            firstSentence(narrativeSections.intro) ||
            'The strongest strategic insight is still emerging, but the asset is already showing a usable persuasion route.',
        recommendation:
            firstSentence(dossier?.archetype_mapping?.strategic_moves?.[0]) ||
            firstSentence(dossier?.test_plan?.hypothesis) ||
            'Use the current mechanic as the lead route, then tighten the message before client review.',
        strategicDelta:
            'No differential comparison is attached yet. Run Differential Diagnostic against a second route to quantify the strategic delta before pitch delivery.',
    };

    return (
        <>
            <GatekeeperIntercept isVisible={showGatekeeper} onClose={() => setShowGatekeeper(false)} />

            <style jsx global>{`
                /* FORCE PRINT ROUTING: only show the sovereign print layout during an export */
                @media screen {
                    body.printing .sovereign-print-layout { display: block !important; }
                    body.printing .screen-layout { display: none !important; }

                    body:not(.printing) .sovereign-print-layout { display: none !important; }
                    body:not(.printing) .screen-layout { display: block !important; }
                }

                @media print {
                    body.printing .sovereign-print-layout { display: block !important; }
                    body.printing .screen-layout { display: none !important; }

                    body.printing .sovereign-print-layout {
                        background: #FFFFFF !important;
                        color: #141414 !important;
                    }

                    body.printing .sovereign-print-layout .dossier-section {
                        page-break-before: always;
                        break-before: page;
                    }

                    body.printing .sovereign-print-layout .dossier-section:first-child {
                        page-break-before: avoid;
                        break-before: avoid;
                    }

                    body.printing .sovereign-print-layout .dossier-block {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }

                    body.printing .sovereign-print-layout * {
                        box-shadow: none !important;
                        text-shadow: none !important;
                    }

                    @page {
                        size: A4;
                        margin: 20mm 18mm;
                    }
                }
            `}</style>

            {/* Print-only sovereign briefing layout (includes Signals + Psychology after Narrative Framework) */}
            <div className="sovereign-print-layout bg-white text-[#141414]">
                <div ref={printRef} className="mx-auto max-w-[900px] px-12 py-14">
                    <section className="dossier-section min-h-[calc(100vh-40mm)] py-6">
                        <div className="flex min-h-[calc(100vh-64mm)] flex-col items-center text-center">
                            {dossierLogo ? (
                                <img src={dossierLogo} alt={dossierAgencyName} className="h-20 max-w-[220px] object-contain" />
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full border text-2xl font-bold" style={{ borderColor: accentHex, color: accentHex }}>
                                    V
                                </div>
                            )}
                            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.42em]" style={{ color: accentHex }}>{dossierAgencyName}</p>
                            <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-[#6B6B6B]">{dossierDescriptor}</p>
                            <h1 className="mt-12 text-3xl font-light uppercase tracking-[0.34em]">FORENSIC INTELLIGENCE DOSSIER</h1>
                            <div className="mt-8 h-px w-full" style={{ backgroundColor: accentHex }} />
                            <div className="mt-10 max-w-[60%] overflow-hidden border border-[#E7DED1] p-3">
                                <img src={firstFrameUrl} alt={asset.brand?.name || 'Asset'} className="max-h-[360px] w-full object-contain" />
                            </div>
                            <h2 className="mt-10 text-3xl font-semibold uppercase tracking-tight">{asset.brand?.name || 'Unknown Brand'}</h2>
                            <p className="mt-3 text-[12px] uppercase tracking-[0.24em] text-[#6B6B6B]">{asset.brand?.market_sector || 'Uncategorised Sector'}</p>
                            <div className="mt-10 h-px w-full" style={{ backgroundColor: accentHex }} />
                            <div className="mt-8 space-y-2 text-sm uppercase tracking-[0.16em] text-[#4A4A4A]">
                                <p>Classification: Confidential</p>
                                <p>Ingestion ID: VD-{asset.id.split('-')[0].toUpperCase()}</p>
                                <p>Generated: {new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p>Prepared by: {dossierPreparedBy}</p>
                                {exportClientName && <p>Prepared for: {exportClientName}</p>}
                            </div>
                        </div>
                    </section>

                    <section className="dossier-section min-h-[calc(100vh-40mm)] py-6">
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: accentHex }}>Executive Intelligence Summary</p>
                        <div className="mt-8 space-y-8">
                            {exportPreset === 'pitch' && (
                                <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Pitch Narrative</p>
                                    <div className="mt-6 grid gap-4">
                                        {[
                                            ['Problem', pitchNarrative.problem],
                                            ['Insight', pitchNarrative.insight],
                                            ['Recommendation', pitchNarrative.recommendation],
                                            ['Strategic Delta', pitchNarrative.strategicDelta],
                                        ].map(([label, value]) => (
                                            <div key={label} className="border-t border-[#E7DED1] pt-4 first:border-t-0 first:pt-0">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: accentHex }}>{label}</p>
                                                <p className="mt-2 text-sm leading-relaxed text-[#2F2B26]">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Primary Mechanic</p>
                                <p className="mt-4 text-2xl font-semibold uppercase tracking-tight">{extraction?.primary_mechanic || '—'}</p>
                                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>
                                    Confidence Score: {extraction?.confidence_score != null ? `${Math.round(extraction.confidence_score <= 1 ? extraction.confidence_score * 100 : extraction.confidence_score)}%` : '—'}
                                </p>
                            </div>
                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Synthesised Visual Style</p>
                                <p className="mt-4 text-sm leading-relaxed">{parsedStyle || '—'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Narrative Framework</p>
                                    <p className="mt-4 text-sm leading-relaxed">{narrativeSections.intro || narrativeSections.sections[0]?.text || '—'}</p>
                                </div>
                                <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Persuasion Metrics</p>
                                    <div className="mt-4 space-y-3 text-sm">
                                        <p>Persuasion Density: {dossier?.persuasion_metrics?.persuasion_density ?? '—'}</p>
                                        <p>Cognitive Friction: {dossier?.persuasion_metrics?.cognitive_friction ?? '—'}</p>
                                        <p>Predictive Longevity: {dossier?.persuasion_metrics?.predictive_longevity || '—'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Chromatic Base</p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {(extraction?.color_palette || []).map((hex: string, index: number) => (
                                        <div key={`${hex}-${index}`} className="flex items-center gap-2 border px-3 py-2" style={{ borderColor: accentHex }}>
                                            <span className="h-4 w-4 border border-[#E7DED1]" style={{ backgroundColor: hex }} />
                                            <span className="text-xs font-mono">{hex}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="dossier-section min-h-[calc(100vh-40mm)] py-6">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: accentHex }}>Narrative Framework</p>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-[#6B6B6B]">Forensic Map v2.0</p>
                        </div>
                        <div className="mt-4 h-px w-full" style={{ backgroundColor: accentHex }} />
                        {narrativeSections.intro && (
                            <div className="dossier-block mt-8 border-l-2 pl-6" style={{ borderColor: accentHex }}>
                                <p className="text-base italic leading-relaxed">{narrativeSections.intro}</p>
                            </div>
                        )}
                        <div className="mt-10 space-y-10">
                            {narrativeSections.sections.map((section, index) => (
                                <div key={`${section.label}-${index}`} className="dossier-block">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: accentHex }}>
                                        {section.label} {section.title ? `· ${section.title}` : ''}
                                    </p>
                                    <p className="mt-4 text-sm leading-7">{section.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="dossier-section min-h-[calc(100vh-40mm)] py-6">
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: accentHex }}>Signals Intelligence</p>
                        <div className="mt-4 h-px w-full" style={{ backgroundColor: accentHex }} />
                        <div className="mt-8 space-y-8">
                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Gaze Topology</p>
                                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                                    <p>Mode of Address: {(dossier?.gaze_topology?.mode_of_address) || '—'}</p>
                                    <p>Viewer Position: {(dossier?.gaze_topology?.viewer_position) || '—'}</p>
                                    <p>Primary Gaze Vector: {(dossier?.gaze_topology?.power_holder) || '—'}</p>
                                </div>
                                {dossier?.gaze_topology?.reading && <p className="mt-4 text-sm italic leading-relaxed">{dossier.gaze_topology.reading}</p>}
                            </div>
                            {signalSections.intro && (
                                <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Semiotic Overture</p>
                                    <p className="mt-4 text-sm leading-relaxed">{signalSections.intro}</p>
                                </div>
                            )}
                            {signalSections.sections.map((section, index) => (
                                <div key={`${section.label}-${index}`} className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>
                                        {section.label} {section.title ? `· ${section.title}` : ''}
                                    </p>
                                    <p className="mt-4 text-sm leading-relaxed">{section.text}</p>
                                </div>
                            ))}
                            {dossier?.radiant_architecture && (
                                <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Macro-Diagnostic Map</p>
                                    <p className="mt-4 text-sm leading-relaxed">{stringifyValue(dossier.radiant_architecture)}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="dossier-section min-h-[calc(100vh-40mm)] py-6">
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: accentHex }}>Psychological Profile</p>
                        <div className="mt-4 h-px w-full" style={{ backgroundColor: accentHex }} />
                        <div className="mt-8 space-y-8">
                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Archetype Posture</p>
                                <p className="mt-4 text-sm leading-relaxed">{dossier?.archetype_mapping?.target_posture || '—'}</p>
                            </div>
                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Trigger Distribution</p>
                                <div className="mt-4 space-y-2 text-sm">
                                    {Object.entries(dossier?.archetype_mapping?.trigger_distribution || {}).map(([label, value]) => (
                                        <p key={label}>{label}: {stringifyValue(value)}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Strategic Moves</p>
                                <p className="mt-4 text-sm leading-relaxed">{stringifyValue(dossier?.archetype_mapping?.strategic_moves)}</p>
                            </div>
                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Objection Dismantling</p>
                                <p className="mt-4 text-sm leading-relaxed">{dossier?.objection_dismantling || '—'}</p>
                            </div>
                            {dossier?.counter_reading_matrix && (
                                <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Counter-Reading Matrix</p>
                                    <div className="mt-4 space-y-4 text-sm">
                                        {(dossier.counter_reading_matrix as any[]).map((entry, index) => (
                                            <div key={index}>
                                                <p className="font-semibold uppercase">{entry.lens || `Reading ${index + 1}`}</p>
                                                <p className="mt-1 leading-relaxed">{entry.reading || stringifyValue(entry)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="dossier-section min-h-[calc(100vh-40mm)] py-6">
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: accentHex }}>Creative DNA Prompt</p>
                        <div className="mt-4 h-px w-full" style={{ backgroundColor: accentHex }} />
                        <div className="dossier-block mt-8 border p-6" style={{ borderColor: accentHex }}>
                            <p className="text-sm leading-relaxed">
                                The following prompt reconstructs the persuasion architecture of this asset for deployment in AI image generation systems.
                            </p>
                            <div className="mt-6 border p-5" style={{ borderColor: accentHex }}>
                                <pre className="whitespace-pre-wrap text-xs leading-6">{extraction?.dna_prompt || 'DNA prompt unavailable.'}</pre>
                            </div>
                            <p className="mt-6 text-sm leading-relaxed">
                                Strategic deployment note: this prompt captures the visual grammar, chromatic logic, semiotic register, and persuasion architecture of the original asset, not its surface appearance.
                            </p>
                        </div>
                    </section>

                    <section className="dossier-section min-h-[calc(100vh-40mm)] py-6">
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: accentHex }}>Evidence & Test Plan</p>
                        <div className="mt-4 h-px w-full" style={{ backgroundColor: accentHex }} />
                        <div className="mt-8 space-y-8">
                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Evidence Anchors</p>
                                <div className="mt-4 space-y-3 text-sm">
                                    {(Array.isArray(extraction?.evidence_anchors) ? extraction.evidence_anchors : []).length > 0 ? (
                                        (extraction?.evidence_anchors as any[]).map((entry, index) => (
                                            <p key={index} className="leading-relaxed">{typeof entry === 'string' ? entry : stringifyValue(entry)}</p>
                                        ))
                                    ) : (
                                        <p>—</p>
                                    )}
                                </div>
                            </div>
                            <div className="dossier-block border p-6" style={{ borderColor: accentHex }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accentHex }}>Strategic Test Plan</p>
                                {dossier?.test_plan ? (
                                    <div className="mt-4 space-y-4 text-sm">
                                        <p className="leading-relaxed">{dossier.test_plan.hypothesis}</p>
                                        <ol className="list-decimal space-y-3 pl-5">
                                            {(dossier.test_plan.test_cells || []).map((cell: any, index: number) => (
                                                <li key={index}>
                                                    <span className="font-semibold">{cell.lever}:</span> {cell.change} — {cell.rationale}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                ) : (
                                    <p className="mt-4 text-sm">—</p>
                                )}
                            </div>
                            <div className="border-t pt-8 text-xs leading-relaxed text-[#6B6B6B]" style={{ borderColor: accentHex }}>
                                <p>{dossierAgencyName}</p>
                                <p>{dossierContact}</p>
                                <p className="mt-3">{dossierConfidentiality}</p>
                                <p className="mt-3">Classification: Confidential · Asset ID: {asset.id} · Generated {new Date().toLocaleDateString('en-AU')}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className="screen-layout w-full bg-[#FBFBF6] min-h-screen flex justify-center">
                <div className="flex flex-col md:flex-row md:items-start min-h-screen w-full max-w-[1440px] bg-[#FBFBF6] border-x border-[#D4A574]/10 shadow-[0_0_80px_rgba(0,0,0,0.03)] text-[#1A1A1A]">

                    {/* LEFT COLUMN: Sticky Media Viewer (45%) */}
                    <aside className="w-full md:w-[45%] border-r border-[#D4A574]/20 relative bg-[#FBFBF6] md:sticky md:top-0 z-10">
                        <div className="pt-14 pb-8 px-8 flex flex-col justify-center items-center">

                            <div 
                                className={`w-full max-w-[480px] aspect-[4/5] relative flex items-center justify-center overflow-hidden border border-[#D4A574]/30 bg-[#1A1A1A] group rounded-2xl shadow-2xl transition-all duration-1000 ${activeTab === 'SIGNALS' && showRadiant ? 'brightness-75 saturate-50' : ''}`}
                                style={getAssetStyle()}
                            >
                                {/* If multiple images, render a horizontal CSS scroll snap setup */}
                                <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                                    {fileUrls.map((url, idx) => (
                                        <img
                                            key={idx}
                                            src={url}
                                            alt={`Asset frame ${idx}`}
                                            className="w-full h-full object-cover object-center shrink-0 snap-center transition-all duration-700"
                                        />
                                    ))}
                                </div>
                                {fileUrls.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2bg-white/90 border border-[#E5E5E1] px-3 py-1 flex gap-2 rounded-full">
                                        {fileUrls.map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8B4513]/30" />
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'SIGNALS' && showRadiant && <RadiantArchitectureOverlay data={(extraction?.full_dossier as any)?.radiant_architecture} />}
                                {asset.type !== 'STATIC' && (
                                    <div className="absolute top-4 left-4 bg-[#1A1A1A]/90 border border-[#D4A574]/40 px-3 py-1 backdrop-blur-sm rounded-none">
                                        <span className="text-[9px] uppercase tracking-widest text-[#D4A574]">{asset.type}</span>
                                    </div>
                                )}
                            </div>

                            <div className="w-full mt-6 border-b border-[#D4A574]/20 pb-4">
                                <div className="mb-4">
                                    <h1 className="text-2xl font-light tracking-tightest text-[#D4A574] uppercase">{asset.brand?.name}</h1>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4A574]">{asset.brand?.market_sector}</span>
                                </div>
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Next best action</p>
                                        <p className="mt-2 text-[12px] leading-relaxed text-[#FFFFFF]/70">
                                            Compare this against a second route, then move the strongest direction into a board or export.
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-4 grid gap-3 md:grid-cols-3">
                                    <div className="rounded-[1.25rem] border border-[#D4A574]/20 bg-[#1A1A1A] px-4 py-4">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Compare against another asset</p>
                                        <p className="mt-2 text-[12px] leading-relaxed text-[#FFFFFF]/70">
                                            Put this result beside another route and surface the strategic delta fast.
                                        </p>
                                        <a
                                            href="/compare"
                                            onClick={() =>
                                                posthog.capture('trial_next_action_compare_click', {
                                                    surface: 'asset_result',
                                                    step: 'try_2',
                                                    href: '/compare',
                                                })
                                            }
                                            className="mt-4 inline-flex items-center rounded-full border border-[#D4A574]/35 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4A574] transition hover:bg-[#D4A574]/10"
                                        >
                                            Run Differential Diagnosis
                                        </a>
                                    </div>
                                    <div className="rounded-[1.25rem] border border-[#D4A574]/20 bg-[#1A1A1A] px-4 py-4">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Save to Vault / Board</p>
                                        <p className="mt-2 text-[12px] leading-relaxed text-[#FFFFFF]/70">
                                            This dossier is already stored in Vault. Create a board to keep it active in the next review or client thread.
                                        </p>
                                        <div className="mt-4">
                                            <AddToBoard
                                                assetId={asset.id}
                                                triggerLabel="Create Board"
                                                analytics={{
                                                    clickEventName: 'trial_next_action_create_board_click',
                                                    completionEventName: 'trial_try_3_completed',
                                                    surface: 'asset_result',
                                                    step: 'try_3',
                                                    href: '/boards',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="rounded-[1.25rem] border border-[#D4A574]/20 bg-[#1A1A1A] px-4 py-4">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Export summary</p>
                                        <p className="mt-2 text-[12px] leading-relaxed text-[#FFFFFF]/70">
                                            Turn the readout into a shareable summary before you lose the room.
                                        </p>
                                        <button
                                            onClick={() => {
                                                posthog.capture('trial_next_action_export_summary_click', {
                                                    surface: 'asset_result',
                                                    step: 'try_3_alt',
                                                    action: 'export_summary',
                                                });
                                                setShowExportModal(true);
                                            }}
                                            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D4A574]/35 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4A574] transition hover:bg-[#D4A574]/10"
                                        >
                                            <FileDown className="w-3 h-3" />
                                            Export Summary
                                        </button>
                                    </div>
                                </div>
                                <div className="relative flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            onClick={handleOpenCloneDrawer}
                                            className="no-print flex items-center gap-2 px-4 py-2 bg-[#D4A574] text-[#141414] text-[10px] font-bold tracking-widest uppercase hover:bg-[#c8955b] rounded-full transition-all"
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            {cloneData ? 'Open Clone Engine' : 'Clone This Mechanic'}
                                        </button>
                                        <div className="relative group">
                                            <button
                                                onClick={handleCopyEmbed}
                                                className="no-print flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#D4A574]/30 text-[#D4A574] text-[10px] font-bold tracking-widest uppercase hover:bg-[#1A1A1A]/80 rounded-full transition-all"
                                            >
                                                <Code className="w-3 h-3" />
                                                Copy Embed Widget
                                                <Info className="w-3 h-3 text-[#D4A574]/70" />
                                            </button>
                                            <div className="pointer-events-none absolute right-0 top-full z-40 mt-3 w-[320px] rounded-[1.5rem] border border-[#D4A574]/20 bg-[#141414] p-5 text-left opacity-0 shadow-2xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 translate-y-1">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D4A574]">Embed Widget</p>
                                                <p className="mt-3 text-[12px] leading-relaxed text-[#FFFFFF]/70">
                                                    Paste this iFrame into a client portal, strategy deck, Notion page, or internal dashboard to display a self-contained forensic intelligence panel.
                                                </p>
                                                <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#D4A574]/60">
                                                    Use for: client-facing reports · internal strategy decks · agency dashboards
                                                </p>
                                                <pre className="mt-4 overflow-x-auto rounded-2xl border border-[#D4A574]/10 bg-black/30 p-3 text-[10px] leading-relaxed text-[#FFFFFF]/75">
{`<iframe src="visualdecompiler.com/embed/${asset.id}" width="100%" height="600px" />`}
                                                </pre>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowExportModal(true)}
                                            className="no-print flex items-center gap-2 px-4 py-2 bg-[#4A4A4A] text-white text-[10px] font-bold tracking-widest uppercase hover:bg-[#1A1A1A] rounded-full transition-all"
                                        >
                                            <FileDown className="w-3 h-3" />
                                            Export Dossier (Print/PDF)
                                        </button>
                                    </div>
                                    <div className="relative xl:min-w-[96px] xl:text-right">
                                        <span className="text-[9px] font-mono tracking-widest text-[#8B4513]/50">ID: {asset.id.split('-')[0]}</span>
                                    </div>
                                    {/* Simple Toast Notification */}
                                    {showCopiedToast && (
                                        <div className="absolute top-full mt-2 right-0 bg-[#8B4513] text-[#F5F5DC] text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                            Embed Code Copied
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5">
                                <AssetTagEditor
                                    assetId={asset.id}
                                    initialTags={asset.tags || []}
                                    onTagsChange={(nextTags) => {
                                        setAsset((currentAsset) => ({
                                            ...currentAsset,
                                            tags: nextTags,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </aside>

                    {showExportModal && (
                        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 px-6 backdrop-blur-sm no-print">
                            <div className="w-full max-w-xl rounded-[2rem] border border-[#D4A574]/20 bg-[#141414] p-8 text-[#F5F3EE] shadow-2xl">
                                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4A574]">Export Strategic Dossier</p>
                                <h3 className="mt-4 text-2xl font-light uppercase tracking-tight">Print-safe agency dossier</h3>
                                <p className="mt-4 text-sm leading-relaxed text-[#FFFFFF]/65">
                                    For best results use Chrome, choose Save as PDF, set paper size to A4, and disable browser headers and footers.
                                </p>

                                <div className="mt-6 space-y-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/80">Client Name</label>
                                    <input
                                        type="text"
                                        value={exportClientName}
                                        onChange={(event) => setExportClientName(event.target.value)}
                                        placeholder="Optional cover-page client name"
                                        className="w-full rounded-full border border-[#D4A574]/20 bg-black/30 px-5 py-3 text-sm text-[#F5F3EE] outline-none transition-colors focus:border-[#D4A574]"
                                    />
                                </div>

                                <div className="mt-6 rounded-2xl border border-[#D4A574]/15 bg-black/20 p-4 text-sm leading-relaxed text-[#FFFFFF]/65">
                                    {isWhitelabel
                                        ? `Agency branding active — ${dossierAgencyName}`
                                        : 'Visual Decompiler branding active for this export.'}
                                </div>

                                <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-end">
                                    <button
                                        onClick={() => setShowExportModal(false)}
                                        className="rounded-full border border-[#D4A574]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574] transition-colors hover:bg-[#D4A574]/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleInitiateExport}
                                        className="rounded-full bg-[#D4A574] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#141414] transition-colors hover:bg-[#c8955b]"
                                    >
                                        Initiate Export
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                {/* RIGHT COLUMN: Scrollable Forensic Console (55%) */}
                <div className="w-full md:w-[55%] bg-[#FBFBF6] min-h-screen relative">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(rgba(212,165,116,0.05)_48px,transparent_48px),linear-gradient(90deg,rgba(212,165,116,0.05)_48px,transparent_48px)] [background-size:48px_48px]" />
                    <div className="relative z-10 w-full min-h-screen bg-transparent">

                    {/* Minimalist Segmented Controls */}
                    <div className="sticky top-0 z-20 bg-[#FBFBF6]/95 backdrop-blur-md border-b border-[#D4A574]/20 px-8 pt-8 md:pt-12 pb-0 flex gap-8">
                        {(['INTELLIGENCE', 'SIGNALS', 'PSYCHOLOGY', 'BLUEPRINT', 'MARKET PULSE'] as const).map(tab => (
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
                        {/* TAB 1: INTELLIGENCE */}
                        {activeTab === 'INTELLIGENCE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {extraction ? (
                                    <div className="space-y-12">
                                        {(!extraction.primary_mechanic || !extraction.full_dossier) && <SovereignProcessingView assetId={asset.id} agency={agency} />}

                                        {extraction.primary_mechanic && extraction.full_dossier && (
                                            <DossierDecisionSummary
                                                extraction={extraction}
                                                dossier={dossier}
                                                narrativeIntro={narrativeSections.intro}
                                                isExecutiveSummary={isExecutiveSummary}
                                                onToggleExecutiveSummary={setIsExecutiveSummary}
                                                evidenceHref="#dossier-evidence"
                                            />
                                        )}

                                        {!isExecutiveSummary ? (
                                            <div className="space-y-12">
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
                                                {extraction.full_dossier ? (
                                                    <div id="dossier-evidence" className="pt-12 border-t border-[#D4A574]/20 space-y-8 scroll-mt-24">
                                                
                                                {/* FULL-WIDTH FORENSIC DOSSIER */}
                                                <div className="grid grid-cols-1 gap-8">
                                                    <DossierGrid 
                                                        title="Narrative Framework" 
                                                        content={extraction.full_dossier.narrative_framework || ''} 
                                                        type="ACT" 
                                                        activeAct={activeAct}
                                                    />
                                                </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <SovereignProcessingView assetId={asset.id} />
                                )}
                            </div>
                        )}

                        {/* TAB 2: SIGNALS (Technical Autopsy) */}
                        {activeTab === 'SIGNALS' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {extraction?.full_dossier ? (
                                    <div className="space-y-12">
                                        {/* RADIANT ARCHITECTURE TOGGLE */}
                                        <div className="border border-[#D4A574]/20 bg-[#1A1A1A] rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Macro-Diagnostic Map</h3>
                                                <p className="text-[11px] text-[#FFFFFF]/50 font-light tracking-wide">Visualize optical trajectories and focal anchors.</p>
                                            </div>
                                            <button 
                                                onClick={() => setShowRadiant(!showRadiant)}
                                                className={`px-6 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${showRadiant ? 'bg-[#D4A574] text-[#1A1A1A] border-[#D4A574] hover:bg-[#C1A67B]' : 'bg-transparent text-[#D4A574] border-[#D4A574]/30 hover:border-[#D4A574]/80'}`}
                                            >
                                                [ RADIANT ARCHITECTURE ]
                                            </button>
                                        </div>

                                        <div className="border-t border-[#D4A574]/20 pt-8 mt-2" />

                                        {/* Technical Autopsy: Channels Only */}
                                        <div className="grid grid-cols-1 gap-8">
                                            <div className="flex flex-col gap-2 mb-4 border-b border-[#D4A574]/20 pb-4">
                                                <h2 className="text-2xl font-light uppercase tracking-[0.3em] text-[#8B4513]">Technical Autopsy</h2>
                                                <p className="text-[10px] text-[#4A4A4A]/60 font-bold tracking-[0.2em] uppercase">Semiotic Channel Interceptions</p>
                                            </div>
                                            
                                            <DossierGrid 
                                                title="Semiotic Subtext" 
                                                content={extraction.full_dossier.semiotic_subtext || ''} 
                                                type="CHANNEL" 
                                            />
                                        </div>

                                        {/* ── Gaze Topology ── */}
                                        {(extraction.full_dossier as any)?.gaze_topology && (
                                            <section className="signals-section space-y-8">
                                                <div className="border-t border-[#D4A574]/20 pt-8 mt-2" />
                                                <div className="flex flex-col gap-2 mb-4 border-b border-[#D4A574]/20 pb-4">
                                                    <h2 className="text-2xl font-light uppercase tracking-[0.3em] text-[#8B4513]">Gaze Topology</h2>
                                                    <p className="text-[10px] text-[#4A4A4A]/60 font-bold tracking-[0.2em] uppercase">Mode of Address &amp; Viewer Positioning</p>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                    {[
                                                        { label: 'Mode of Address', value: (extraction.full_dossier as any).gaze_topology.mode_of_address },
                                                        { label: 'Viewer Position', value: (extraction.full_dossier as any).gaze_topology.viewer_position },
                                                        { label: 'Power Holder', value: (extraction.full_dossier as any).gaze_topology.power_holder },
                                                    ].map((item, i) => (
                                                        <div key={i} className="border border-[#D4A574]/20 bg-[#1A1A1A] rounded-3xl p-6 flex flex-col justify-between shadow-sm min-h-[300px]">
                                                            <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                                                {item.label}
                                                            </h3>
                                                            <div className="flex-1 flex items-center justify-center">
                                                                <span className="text-[24px] font-bold uppercase tracking-tight text-[#FFFFFF]">{item.value}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="border border-[#D4A574]/20 bg-[#1A1A1A] rounded-3xl p-6 shadow-sm">
                                                    <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 border-b border-[#D4A574]/20 pb-4">
                                                        Gaze Analysis
                                                    </h3>
                                                    <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-light">
                                                        {(extraction.full_dossier as any).gaze_topology.reading}
                                                    </p>
                                                </div>
                                            </section>
                                        )}

                                        {/* ── Counter-Reading Matrix ── */}
                                        {(extraction.full_dossier as any)?.counter_reading_matrix && (
                                            <section className="counter-reading-section space-y-8">
                                                <div className="border-t border-[#D4A574]/20 pt-8 mt-2" />
                                                <div className="flex flex-col gap-2 mb-4 border-b border-[#D4A574]/20 pb-4">
                                                    <h2 className="text-2xl font-light uppercase tracking-[0.3em] text-[#8B4513]">Counter-Reading Matrix</h2>
                                                    <p className="text-[10px] text-[#4A4A4A]/60 font-bold tracking-[0.2em] uppercase">Polysemic Deconstruction via Critical Theory</p>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {((extraction.full_dossier as any).counter_reading_matrix as { lens: string; reading: string }[]).map((item, i) => (
                                                        <div key={i} className="border border-[#D4A574]/20 bg-[#1A1A1A] rounded-3xl p-6 shadow-sm flex flex-col min-h-[300px]">
                                                            <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                                                {item.lens}
                                                            </h3>
                                                            <div className="flex-1 max-h-[400px] overflow-y-auto">
                                                                <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-light">{item.reading}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-64 flex flex-col items-center justify-center border border-[#D4A574]/10 border-dashed rounded-3xl opacity-30">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Deep Intelligence Required for Signal Interception</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* MARKET PULSE (Locked / Last) */}
                        {activeTab === 'MARKET PULSE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                                {!isSovereign ? (
                                    <>
                                        <div className="absolute inset-0 z-10 backdrop-blur-md bg-[#FBFBF6]/60 flex items-center justify-center rounded-3xl">
                                            <div className="bg-[#1A1A1A] border border-[#D4A574]/40 p-8 rounded-3xl text-center shadow-2xl flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center border border-[#D4A574]/30 mb-4">
                                                    <svg className="w-5 h-5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                </div>
                                                <span className="text-[#D4A574] font-bold tracking-[0.3em] uppercase text-[10px] mb-2">Sovereign Feature</span>
                                                <h3 className="text-[#FFFFFF] text-xl font-light mb-4 tracking-tight">Market Pulse Locked</h3>
                                                <p className="text-[#FFFFFF]/60 text-xs mb-8 max-w-xs leading-relaxed">Cross-asset statistical aggregation and category saturation density mapping is restricted to paid agency tiers.</p>
                                                <button className="bg-[#D4A574] text-[#1A1A1A] px-8 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors">
                                                    Premium Unlock
                                                </button>
                                            </div>
                                        </div>
                                        <div className="opacity-40 pointer-events-none select-none filter blur-[2px]">
                                            <AdAnalyticsTab brand={asset.brand?.name} />
                                        </div>
                                    </>
                                ) : isLoadingMarketPulse && !marketPulseData ? (
                                    <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] px-8 py-16 text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4A574]">Synthesising Market Pulse</p>
                                        <p className="mt-4 text-sm leading-relaxed text-[#FFFFFF]/65">
                                            Aggregating category mechanics, chromatic saturation, and persuasion benchmarks from the Intelligence Vault.
                                        </p>
                                    </div>
                                ) : marketPulseError ? (
                                    <div className="rounded-3xl border border-[#8B4513]/20 bg-[#1A1A1A] px-8 py-12">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Market Pulse Interrupted</p>
                                        <p className="mt-4 text-sm leading-relaxed text-[#FFFFFF]/70">{marketPulseError}</p>
                                        <button
                                            onClick={() => void handleRefreshMarketPulse()}
                                            className="mt-6 rounded-full bg-[#D4A574] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#141414]"
                                        >
                                            Retry Pulse
                                        </button>
                                    </div>
                                ) : marketPulseData ? (
                                    <div className="space-y-8">
                                        <div className="flex flex-col gap-6 rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-8 text-white shadow-sm md:flex-row md:items-end md:justify-between">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Market Pulse</p>
                                                <h3 className="mt-3 text-3xl font-light tracking-tight text-[#FFFFFF]">
                                                    {marketPulseData.scope}
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#FFFFFF]/65">
                                                    Vault-wide aggregation of persuasion mechanics, category trigger mix, and chromatic territory for {asset.brand?.market_sector || 'your active market'}.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => void handleRefreshMarketPulse()}
                                                disabled={isLoadingMarketPulse}
                                                className="rounded-full border border-[#D4A574]/25 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574] transition-colors hover:bg-[#D4A574]/10 disabled:opacity-50"
                                            >
                                                {isLoadingMarketPulse ? 'Refreshing...' : 'Refresh Pulse'}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-6">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/70">Assets sampled</p>
                                                <p className="mt-4 text-4xl font-light text-white">{marketPulseData.assetCount}</p>
                                            </div>
                                            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-6">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/70">Avg persuasion density</p>
                                                <p className="mt-4 text-4xl font-light text-white">{marketPulseData.category_persuasion_benchmark.avg_density}%</p>
                                            </div>
                                            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-6">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/70">Avg cognitive friction</p>
                                                <p className="mt-4 text-4xl font-light text-white">{marketPulseData.category_persuasion_benchmark.avg_friction}%</p>
                                                <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[#FFFFFF]/45">{marketPulseData.category_persuasion_benchmark.your_rank}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                                            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-6">
                                                <h3 className="border-b border-[#D4A574]/15 pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                    Dominant Mechanics
                                                </h3>
                                                <div className="mt-5 space-y-4">
                                                    {marketPulseData.dominant_mechanics.map((item) => (
                                                        <div key={item.mechanic} className="rounded-2xl border border-white/6 bg-black/20 p-4">
                                                            <div className="flex items-center justify-between gap-4">
                                                                <p className="text-sm font-medium uppercase tracking-[0.08em] text-white">{item.mechanic}</p>
                                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">{item.share}% share</span>
                                                            </div>
                                                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                                                                <div className="h-full rounded-full bg-gradient-to-r from-[#8B4513] to-[#D4A574]" style={{ width: `${item.share}%` }} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-6">
                                                <h3 className="border-b border-[#D4A574]/15 pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                    Trigger Profile
                                                </h3>
                                                <div className="mt-4">
                                                    <RadarChart data={marketPulseData.category_trigger_profile} forceLight={false} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                                            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-6">
                                                <h3 className="border-b border-[#D4A574]/15 pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                    Opportunity Gaps
                                                </h3>
                                                <div className="mt-5 grid gap-4">
                                                    {marketPulseData.opportunity_gaps.map((gap, index) => (
                                                        <div key={`${gap}-${index}`} className="rounded-2xl border border-white/6 bg-black/20 p-4">
                                                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/70">Whitespace {(index + 1).toString().padStart(2, '0')}</p>
                                                            <p className="mt-3 text-sm leading-relaxed text-[#FFFFFF]/72">{gap}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-6">
                                                <h3 className="border-b border-[#D4A574]/15 pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                    Chromatic Saturation
                                                </h3>
                                                <div className="mt-5 grid grid-cols-2 gap-4">
                                                    {marketPulseData.chromatic_saturation.map((color) => (
                                                        <div key={color.hex} className="rounded-2xl border border-white/6 bg-black/20 p-4">
                                                            <div className="h-16 rounded-xl border border-white/10" style={{ backgroundColor: color.hex }} />
                                                            <div className="mt-3 flex items-center justify-between gap-3">
                                                                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white">{color.hex}</span>
                                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">{color.count}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-3xl border border-dashed border-[#D4A574]/20 bg-[#1A1A1A] px-8 py-14 text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4A574]">Market Pulse Ready</p>
                                        <p className="mt-4 text-sm leading-relaxed text-[#FFFFFF]/65">
                                            Refresh this tab to aggregate the current category benchmark from the Intelligence Vault.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB 3: PSYCHOLOGY */}
                        {activeTab === 'PSYCHOLOGY' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Trigger Distribution Radar */}
                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-6 flex flex-col items-center justify-between rounded-3xl shadow-sm min-h-[300px]">
                                        <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                            Trigger Distribution Map
                                        </h3>
                                        <div className="w-full max-w-[320px] flex-1 flex items-center justify-center -mt-6">
                                            <RadarChart
                                                data={Object.entries((extraction?.full_dossier as any)?.archetype_mapping?.trigger_distribution || {}).map(([label, value]) => ({ label, value: value as number }))}
                                                forceLight={false}
                                            />
                                        </div>
                                        <p className="text-[12px] text-[#FFFFFF]/60 leading-relaxed font-light mt-4 pt-4 border-t border-[#D4A574]/10 text-center px-4 w-full">
                                            This distribution quantifies the creative's psychological surface area—identifying which aspiration levers are being engaged to command consumer compliance.
                                        </p>
                                    </div>

                                    {/* Strategic Posture Map */}
                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-6 flex flex-col justify-between rounded-3xl shadow-sm min-h-[300px]">
                                        <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                            Strategic Posture
                                        </h3>
                                        {extraction?.full_dossier?.archetype_mapping ? (
                                            <div className="flex-1 flex flex-col justify-between">
                                                <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-light mb-6">
                                                    {extraction.full_dossier.archetype_mapping?.target_posture}
                                                </p>
                                                <div className="flex items-center justify-center">
                                                    <StrategicPostureMap
                                                        posture={extraction.full_dossier.archetype_mapping?.target_posture || ''}
                                                        moves={(extraction.full_dossier.archetype_mapping as any)?.strategic_moves || []}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex-1 flex items-center justify-center">
                                                <div className="text-[10px] uppercase font-bold tracking-widest text-[#D4A574]/30">No Posture Data</div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Persuasion Density */}
                                    {(extraction?.full_dossier as any)?.persuasion_metrics && (
                                        <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-6 flex flex-col justify-between rounded-3xl shadow-sm min-h-[300px]">
                                            <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                                Persuasion Density
                                            </h3>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex justify-between items-end mb-4">
                                                    <span className="text-[11px] font-mono text-[#D4A574]/60 uppercase tracking-widest">Conversion Density</span>
                                                    <span className="text-[32px] font-bold text-[#D4A574] leading-none">{((extraction?.full_dossier as any)?.persuasion_metrics?.persuasion_density as number)}%</span>
                                                </div>
                                                <div className="w-full bg-white/5 h-2 border border-[#D4A574]/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full transition-all duration-1000"
                                                        style={{ width: `${(extraction?.full_dossier as any)?.persuasion_metrics?.persuasion_density}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-[12px] text-[#FFFFFF]/60 leading-relaxed font-light mt-4 pt-4 border-t border-[#D4A574]/10">
                                                Measures the creative's informational compression—how efficiently it transfers brand signal into consumer memory structures.
                                            </p>
                                        </div>
                                    )}

                                    {/* Cognitive Friction */}
                                    {(extraction?.full_dossier as any)?.persuasion_metrics && (
                                        <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-6 flex flex-col justify-between rounded-3xl shadow-sm min-h-[300px]">
                                            <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                                Cognitive Friction
                                            </h3>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex justify-between items-end mb-4">
                                                    <span className="text-[11px] font-mono text-[#8B4513]/80 uppercase tracking-widest">Resistance Index</span>
                                                    <span className="text-[32px] font-bold text-[#8B4513] leading-none">{((extraction?.full_dossier as any)?.persuasion_metrics?.cognitive_friction as number)}%</span>
                                                </div>
                                                <div className="w-full bg-white/5 h-2 border border-[#D4A574]/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#8B4513]/40 rounded-full transition-all duration-1000"
                                                        style={{ width: `${(extraction?.full_dossier as any)?.persuasion_metrics?.cognitive_friction}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-[12px] text-[#FFFFFF]/60 leading-relaxed font-light mt-4 pt-4 border-t border-[#D4A574]/10">
                                                Quantifies neural resistance to message adoption. Low scores indicate frictionless persuasion pathways.
                                            </p>
                                        </div>
                                    )}

                                    {/* Predictive Longevity */}
                                    {(extraction?.full_dossier as any)?.persuasion_metrics && (
                                        <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-6 flex flex-col justify-between rounded-3xl shadow-sm min-h-[300px]">
                                            <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                                Predictive Longevity
                                            </h3>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <svg className="w-4 h-4 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span className="text-[11px] font-mono text-[#D4A574]/60 uppercase tracking-widest">Fatigue Analysis</span>
                                                </div>
                                                <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-light">
                                                    {((extraction?.full_dossier as any)?.persuasion_metrics?.predictive_longevity as string)}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Behavioral Deconstruction */}
                                    {extraction?.full_dossier?.archetype_mapping && (
                                        <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-6 flex flex-col justify-between rounded-3xl shadow-sm min-h-[300px]">
                                            <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                                Behavioral Deconstruction
                                            </h3>
                                            <div className="flex-1 flex flex-col justify-center space-y-4">
                                                {((extraction.full_dossier.archetype_mapping as any)?.strategic_moves || []).slice(0, 3).map((move: string, i: number) => (
                                                    <div key={i} className="flex gap-3 items-start">
                                                        <div className="w-1.5 h-1.5 bg-[#D4A574] rounded-full mt-2 flex-shrink-0" />
                                                        <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-light">{move}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}

                        {/* TAB 4: BLUEPRINT */}
                        {activeTab === 'BLUEPRINT' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {!blueprintData ? (
                                <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-10 flex flex-col items-center justify-center text-center rounded-3xl shadow-sm">
                                        <h3 className="text-[#D4A574] text-lg font-light mb-2">Production Blueprint Uninitialized</h3>
                                        <p className="text-[#FFFFFF]/70 text-sm max-w-sm mb-4">Synthesize the extraction data into elite execution constraints.</p>
                                        <p className="text-[#D4A574]/60 text-[10px] font-bold uppercase tracking-[0.28em] mb-8">Generated blueprints are now saved to this asset automatically.</p>
                                        {blueprintError && (
                                            <div className="max-w-md mb-6 rounded-2xl border border-[#8B4513]/30 bg-[#8B4513]/10 px-5 py-4">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574] mb-2">Blueprint Generation Failed</p>
                                                <p className="text-sm text-[#FFFFFF]/75 leading-relaxed">{blueprintError}</p>
                                            </div>
                                        )}
                                        {isGeneratingBlueprint && (
                                            <div className="mb-8 w-full max-w-md rounded-[1.75rem] border border-[#D4A574]/15 bg-black/20 px-5 py-5">
                                                <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]">
                                                    <span>{BLUEPRINT_STEPS[blueprintStep]}</span>
                                                    <span>{blueprintProgress}%</span>
                                                </div>
                                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#2A2722]">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] transition-all duration-700"
                                                        style={{ width: `${blueprintProgress}%` }}
                                                    />
                                                </div>
                                                <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-[#FFFFFF]/45">
                                                    Building execution constraints, variant prompts, and copy remixes from the live forensic dossier.
                                                </p>
                                            </div>
                                        )}
                                        <button
                                            onClick={handleGenerateBlueprint}
                                            disabled={isGeneratingBlueprint || !extraction}
                                            className="bg-[#D4A574] text-[#1A1A1A] px-8 py-3.5 text-[10px] font-bold tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white rounded-full transition-all disabled:opacity-50"
                                        >
                                            {isGeneratingBlueprint ? 'Synthesizing Execution Constraints...' : 'Generate Blueprint'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-12">
                                        <div className="flex flex-col gap-4 rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-5 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574] mb-2">Production Blueprint Active</p>
                                                <p className="text-sm text-[#FFFFFF]/70">This blueprint is stored in the Intelligence Vault and will reload when you revisit the asset.</p>
                                            </div>
                                            <button
                                                onClick={handleGenerateBlueprint}
                                                disabled={isGeneratingBlueprint}
                                                className="border border-[#D4A574]/40 px-5 py-3 text-[10px] font-bold tracking-widest uppercase text-[#D4A574] rounded-full hover:bg-[#D4A574] hover:text-[#1A1A1A] transition-all disabled:opacity-50"
                                            >
                                                {isGeneratingBlueprint ? 'Refreshing...' : 'Regenerate Blueprint'}
                                            </button>
                                        </div>

                                        {isGeneratingBlueprint && (
                                            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] px-5 py-5">
                                                <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]">
                                                    <span>{BLUEPRINT_STEPS[blueprintStep]}</span>
                                                    <span>{blueprintProgress}%</span>
                                                </div>
                                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#2A2722]">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] transition-all duration-700"
                                                        style={{ width: `${blueprintProgress}%` }}
                                                    />
                                                </div>
                                                <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-[#FFFFFF]/45">
                                                    Regenerating the production blueprint against the current forensic dossier.
                                                </p>
                                            </div>
                                        )}

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

                                        {/* Plausible Readings & Objection Dismantled */}
                                        {extraction?.full_dossier && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {/* Plausible Readings */}
                                                {extraction.full_dossier.possible_readings && extraction.full_dossier.possible_readings.length > 0 && (
                                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-6 rounded-3xl shadow-sm flex flex-col min-h-[300px]">
                                                        <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                                            Plausible Readings
                                                        </h3>
                                                        <div className="flex-1 flex flex-col justify-center space-y-6">
                                                            {extraction.full_dossier.possible_readings.slice(0, 2).map((reading, i) => (
                                                                <div key={i} className="space-y-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-1.5 h-1.5 bg-[#D4A574] rounded-full" />
                                                                        <span className="text-[10px] font-bold text-[#D4A574] uppercase tracking-[0.2em]">
                                                                            {i === 0 ? 'Primary' : 'Secondary'}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-light pl-[18px]">
                                                                        {reading.reading}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Objection Dismantled */}
                                                {extraction.full_dossier.objection_dismantling && (
                                                    <div className="border border-[#D4A574]/20 bg-[#1A1A1A] p-6 rounded-3xl shadow-sm flex flex-col min-h-[300px]">
                                                        <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-4 w-full border-b border-[#D4A574]/20 pb-4">
                                                            Objection Dismantled
                                                        </h3>
                                                        <div className="flex-1 flex flex-col justify-center">
                                                            <p className="text-[12px] text-[#FFFFFF]/70 leading-relaxed font-light">
                                                                {extraction.full_dossier.objection_dismantling}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
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

                    </div>
                </div>
                </div>
            </div>
            </div>

            {showCloneDrawer && (
                <div className="fixed inset-0 z-[80] no-print">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowCloneDrawer(false)}
                    />
                    <div className="absolute inset-y-0 right-0 w-full max-w-3xl overflow-y-auto border-l border-[#D4A574]/20 bg-[#FBFBF6] text-[#1A1A1A] shadow-2xl">
                        <div className="border-b border-[#D4A574]/15 bg-[#FBFBF6] px-6 py-5 md:px-8">
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Clone Engine</p>
                                    <h2 className="mt-3 max-w-4xl text-[2rem] font-light uppercase tracking-tight leading-[1.08] text-[#1A1A1A] md:text-[2.35rem]">
                                        {cloneIntroLead}
                                    </h2>
                                    <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#1A1A1A]/72">
                                        {cloneIntroRemainder ? `${cloneIntroRemainder} ` : ''}
                                        {cloneIntroBody}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowCloneDrawer(false)}
                                    className="rounded-full border border-[#D4A574]/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B4513] transition-colors hover:bg-[#D4A574]/10"
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-8 md:px-8">
                            <div className="rounded-[2rem] border border-[#D4A574]/18 bg-white/55 p-6">
                                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/70">Source asset</p>
                                        <p className="mt-2 text-xl font-light uppercase tracking-tight text-[#1A1A1A]">{asset.brand?.name || 'Unknown Brand'}</p>
                                        <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#8B4513]/70">{asset.brand?.market_sector || 'Uncategorised'}</p>
                                    </div>
                                    <button
                                        onClick={() => void handleGenerateClone()}
                                        disabled={isGeneratingClone}
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A574] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#141414] transition-all hover:bg-[#c8955b] disabled:cursor-wait disabled:opacity-60"
                                    >
                                        <Sparkles className="h-3.5 w-3.5" />
                                        {isGeneratingClone ? 'Synthesising Concepts...' : cloneData ? 'Regenerate Concepts' : 'Generate Concepts'}
                                    </button>
                                </div>
                                {cloneError && (
                                    <p className="mt-4 rounded-2xl border border-[#8B4513]/25 bg-[#8B4513]/8 px-4 py-3 text-sm text-[#6E2E20]">
                                        {cloneError}
                                    </p>
                                )}
                                {isGeneratingClone && (
                                    <div className="mt-6 rounded-[1.75rem] border border-[#D4A574]/15 bg-[#FBFBF6] px-5 py-5">
                                        <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]">
                                            <span>{CLONE_STEPS[cloneStep]}</span>
                                            <span>{cloneProgress}%</span>
                                        </div>
                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E5DDD0]">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] transition-all duration-700"
                                                style={{ width: `${cloneProgress}%` }}
                                            />
                                        </div>
                                        <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-[#8B4513]/66">
                                            Translating the core persuasion architecture into original concept directions.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {isGeneratingClone && !cloneData ? (
                                <div className="mt-8 rounded-[2rem] border border-dashed border-[#D4A574]/20 bg-white/45 px-6 py-12 text-center">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Extracting transferable persuasion DNA</p>
                                    <p className="mt-4 text-sm leading-relaxed text-[#1A1A1A]/72">
                                        Clone Engine is unpacking the core mechanism, stripping out the incumbent aesthetic, and drafting five fresh deployment directions.
                                    </p>
                                </div>
                            ) : cloneData ? (
                                <div className="mt-8 space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-[2rem] border border-[#D4A574]/18 bg-white/55 p-5">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/80">Extracted Mechanism</p>
                                            <p className="mt-3 text-[15px] leading-8 text-[#1A1A1A]/78">{cloneData.extracted_mechanism}</p>
                                        </div>
                                        <div className="rounded-[2rem] border border-[#D4A574]/18 bg-white/55 p-5">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/80">Deployment Principle</p>
                                            <p className="mt-3 text-[15px] leading-8 text-[#1A1A1A]/78">{cloneData.deployment_principle}</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-5">
                                        {cloneData.concepts.map((concept, index) => (
                                            <article key={`${concept.title}-${index}`} className="rounded-[2rem] border border-[#D4A574]/18 bg-white/55 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
                                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D4A574]/82">
                                                            Concept {(concept.concept_id || index + 1).toString().padStart(2, '0')}
                                                        </p>
                                                        <h3 className="mt-3 text-[2rem] font-light uppercase tracking-tight text-[#1A1A1A]">{concept.title}</h3>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="rounded-full border border-[#D4A574]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">
                                                            {concept.hook_type}
                                                        </span>
                                                        <span className="rounded-full border border-[#D4A574]/18 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]/75">
                                                            {concept.production_complexity}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="mt-5 text-[15px] leading-8 text-[#1A1A1A]/74">{concept.logline}</p>

                                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                                    <div className="rounded-[1.5rem] border border-[#D4A574]/16 bg-[#FBFBF6] p-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]/78">Scene</p>
                                                        <p className="mt-3 text-[14px] leading-7 text-[#1A1A1A]/72">{concept.scene}</p>
                                                    </div>
                                                    <div className="rounded-[1.5rem] border border-[#D4A574]/16 bg-[#FBFBF6] p-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]/78">Psychological Mechanism</p>
                                                        <p className="mt-3 text-[14px] leading-7 text-[#1A1A1A]/72">{concept.psychological_mechanism}</p>
                                                    </div>
                                                    <div className="rounded-[1.5rem] border border-[#D4A574]/16 bg-[#FBFBF6] p-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]/78">Copy Direction</p>
                                                        <p className="mt-3 text-[14px] leading-7 text-[#1A1A1A]/72">{concept.copy_direction}</p>
                                                    </div>
                                                    <div className="rounded-[1.5rem] border border-[#D4A574]/16 bg-[#FBFBF6] p-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]/78">Casting + Visual Language</p>
                                                        <p className="mt-3 text-[14px] leading-7 text-[#1A1A1A]/72">{concept.casting_direction}</p>
                                                        <p className="mt-3 border-t border-[#D4A574]/15 pt-3 text-[14px] leading-7 text-[#1A1A1A]/68">{concept.visual_language}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 rounded-[1.5rem] border border-[#D4A574]/16 bg-[#FBFBF6] p-4">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]/82">DNA Prompt</p>
                                                        <button
                                                            onClick={() => void handleCopyPrompt(concept.dna_prompt, index)}
                                                            className="inline-flex items-center gap-2 rounded-full border border-[#D4A574]/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574] transition-colors hover:bg-[#D4A574]/10"
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                            {copiedPromptIndex === index ? 'Copied' : 'Copy'}
                                                        </button>
                                                    </div>
                                                    <pre className="mt-3 whitespace-pre-wrap text-[13px] leading-7 text-[#1A1A1A]/78">{concept.dna_prompt}</pre>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-8 rounded-[2rem] border border-dashed border-[#D4A574]/20 bg-white/45 px-6 py-12 text-center">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Clone Engine ready</p>
                                    <p className="mt-4 text-sm leading-relaxed text-[#1A1A1A]/72">
                                        Generate five original campaign routes that preserve the persuasion logic while breaking completely from the incumbent execution.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
    </>
);
}
