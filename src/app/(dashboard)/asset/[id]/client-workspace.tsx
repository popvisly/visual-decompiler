"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import posthog from 'posthog-js';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import GatekeeperIntercept from '@/components/GatekeeperIntercept';
import AdAnalyticsTab from '@/components/AdAnalyticsTab';
import RadarChart from '@/components/RadarChart';
import StrategicPostureMap from '@/components/StrategicPostureMap';
import { FileDown, Code, Info, Sparkles, Copy, Lock, AlertCircle, Check, X } from 'lucide-react';
import RadiantArchitectureOverlay from '@/components/RadiantArchitectureOverlay';
import AddToBoard from '@/components/AddToBoard';
import AssetTagEditor from '@/components/AssetTagEditor';
import WorkspaceTabHeader from '@/components/dashboard/WorkspaceTabHeader';
import WorkspaceDecisionSummary from '@/components/dashboard/WorkspaceDecisionSummary';
import AssetContextTab from '@/components/dashboard/tabs/AssetContextTab';
import QualityGateTab from '@/components/dashboard/tabs/QualityGateTab';
import PsychologyTab from '@/components/dashboard/tabs/PsychologyTab';
import BlueprintTab from '@/components/dashboard/tabs/BlueprintTab';
import MarketPulseTab from '@/components/dashboard/tabs/MarketPulseTab';
import StressLabTab from '@/components/dashboard/tabs/StressLabTab';
import DecisionLogTab from '@/components/dashboard/tabs/DecisionLogTab';
import IntelligenceTab from '@/components/dashboard/tabs/IntelligenceTab';
import SignalsTab from '@/components/dashboard/tabs/SignalsTab';
import SocialContextTab from '@/components/dashboard/tabs/SocialContextTab';
import ContentSystemContextTab from '@/components/dashboard/tabs/ContentSystemContextTab';
import ConstraintMapTab from '@/components/dashboard/tabs/ConstraintMapTab';
import { 
    ANALYSIS_STEPS, 
    BLUEPRINT_STEPS, 
    CLONE_STEPS, 
    SIGNAL_NODES 
} from '@/lib/constants';



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
    computed_at?: string;
    cached?: boolean;
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
                trigger_distribution?: Record<string, number | string>;
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
                trigger_distribution?: Record<string, number | string>;
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

type DossierTab =
    | 'ASSET CONTEXT'
    | 'QUALITY GATE'
    | 'INTELLIGENCE'
    | 'SIGNALS'
    | 'PSYCHOLOGY'
    | 'SOCIAL CONTEXT'
    | 'CONTENT SYSTEM CONTEXT'
    | 'CONSTRAINT MAP'
    | 'BLUEPRINT'
    | 'STRESS LAB'
    | 'MARKET PULSE'
    | 'DECISION LOG';

const FULL_DOSSIER_TABS: readonly DossierTab[] = [
    'ASSET CONTEXT',
    'QUALITY GATE',
    'INTELLIGENCE',
    'SIGNALS',
    'PSYCHOLOGY',
    'SOCIAL CONTEXT',
    'CONTENT SYSTEM CONTEXT',
    'CONSTRAINT MAP',
    'BLUEPRINT',
    'STRESS LAB',
    'MARKET PULSE',
    'DECISION LOG',
] as const;

const SAMPLE_DOSSIER_TABS: readonly DossierTab[] = [
    'ASSET CONTEXT',
    'QUALITY GATE',
    'INTELLIGENCE',
    'SIGNALS',
    'PSYCHOLOGY',
    'SOCIAL CONTEXT',
    'CONTENT SYSTEM CONTEXT',
    'CONSTRAINT MAP',
    'BLUEPRINT',
    'DECISION LOG',
] as const;

const DOSSIER_TAB_LABELS: Record<DossierTab, string> = {
    'ASSET CONTEXT': 'ASSET',
    'QUALITY GATE': 'QUALITY GATE',
    'INTELLIGENCE': 'INTELLIGENCE',
    'SIGNALS': 'MECHANICS',
    'PSYCHOLOGY': 'PSYCHOLOGY',
    'SOCIAL CONTEXT': 'SOCIAL CONTEXT',
    'CONTENT SYSTEM CONTEXT': 'CONTENT SYSTEM',
    'CONSTRAINT MAP': 'CONSTRAINT MAP',
    'BLUEPRINT': 'BLUEPRINT TRACE',
    'STRESS LAB': 'STRESS LAB',
    'MARKET PULSE': 'MARKET PULSE',
    'DECISION LOG': 'DECISION LOG',
};

const DOSSIER_TAB_PHASES: readonly { label: string; tabs: readonly DossierTab[] }[] = [
    { label: 'Input', tabs: ['ASSET CONTEXT', 'QUALITY GATE', 'INTELLIGENCE'] },
    { label: 'Read', tabs: ['SIGNALS', 'PSYCHOLOGY', 'SOCIAL CONTEXT'] },
    { label: 'Context', tabs: ['CONTENT SYSTEM CONTEXT', 'CONSTRAINT MAP', 'BLUEPRINT'] },
    { label: 'Decision', tabs: ['STRESS LAB', 'MARKET PULSE', 'DECISION LOG'] },
] as const;

const SOCIAL_PLATFORM_GLYPHS: Record<SocialPlatformKey, string> = {
    'Meta Feed': 'MF',
    'Instagram Reels': 'IR',
    TikTok: 'TK',
    'YouTube Shorts': 'YS',
    LinkedIn: 'LI',
};

function formatMarketPulseDate(value?: string) {
    if (!value) return 'Just now';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'Just now';
    }

    return new Intl.DateTimeFormat('en-AU', {
        day: '2-digit',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);
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

type QualityVerdict = 'Ship' | 'Revise' | 'Reject';
type ConstraintSeverity = 'critical' | 'high' | 'optional';

type ConstraintItem = {
    text: string;
    severity: ConstraintSeverity;
};

type QualityReason = {
    title: string;
    detail: string;
};

type FixPriority = {
    priority: 'P1' | 'P2' | 'P3';
    title: string;
    detail: string;
};

type StressLabRow = {
    variable: string;
    currentState: string;
    proposedShift: string;
    predictedLift: 'Low' | 'Medium' | 'High';
    risk: 'Low' | 'Medium' | 'High';
    recommendation: 'Test' | 'Avoid' | 'Hold';
};

type DecisionLogEntry = {
    id: string;
    timestamp: string;
    verdict: QualityVerdict;
    confidence: number | null;
    rationale: string;
    p1Fix: string;
    teamNote?: string;
};

type TrustLevel = 'High' | 'Medium' | 'Low';
type EvidenceStrength = 'Strong' | 'Moderate' | 'Weak';
type AssumptionLoad = 'Low' | 'Medium' | 'High';

type ModuleScore = {
    label: 'Decision Quality' | 'Causal Confidence' | 'Strategic Fit' | 'Context Continuity';
    score: number;
};

type IntegratedRecommendationData = {
    thesis: string;
    whyNow: string;
    riskRewardTension: string;
    recommendedDirection: string;
    decision: string;
    rationale: string;
    executionNext3: string[];
    watchouts: string;
    fallback: string;
    confidence: TrustLevel;
    evidenceStrength: EvidenceStrength;
    assumptionLoad: AssumptionLoad;
    knownUnknowns: string[];
    facts: string[];
    inferences: string[];
    moduleScores: ModuleScore[];
};

type PrimaryScoreLabel = 'Clarity' | 'Attention' | 'Cohesion' | 'Intent' | 'Distinction';

const PRIMARY_SCORE_DISPLAY_LABELS: Record<PrimaryScoreLabel, string> = {
    Clarity: 'Clarity',
    Attention: 'Focus',
    Cohesion: 'Unity',
    Intent: 'Intent',
    Distinction: 'Edge',
};

type PrimaryScoreRow = {
    label: PrimaryScoreLabel;
    value: number;
};

type AttentionPathRead = {
    primaryFocus: string;
    secondaryFocus: string;
    dropOff: string;
};

type StructuralSignalRow = {
    label: 'Hierarchy' | 'Balance' | 'Contrast' | 'Density' | 'Focus Integrity';
    value: string;
};

type StrategicRead = {
    thesis: string;
    triggerMechanic: string;
    frictionPoints: string;
    categoryPositioning: string;
};

type AnalysisLanguageSystem = {
    primaryScores: PrimaryScoreRow[];
    attentionPath: AttentionPathRead;
    structuralSignals: StructuralSignalRow[];
    strategicRead: StrategicRead;
    confidenceIndex: 'High' | 'Medium' | 'Low';
};

type SocialPlatformKey = 'Meta Feed' | 'Instagram Reels' | 'TikTok' | 'YouTube Shorts' | 'LinkedIn';

type SocialPlatformScore = {
    platform: SocialPlatformKey;
    score: number;
    signal: 'Strong' | 'Usable' | 'At Risk';
};

type SocialContextModel = {
    platformScores: SocialPlatformScore[];
    socialInterpretation: string;
    tradeOff: string;
    feedMechanics: {
        title: 'First-Frame Clarity' | 'Scroll Stop Power' | 'Retention Stability' | 'Readability at Speed';
        signal: 'Strong' | 'Moderate' | 'Weak';
        detail: string;
    }[];
    riskFlags: string[];
    adaptationMoves: {
        platform: SocialPlatformKey;
        move: string;
    }[];
};

type ContentRole = 'Hook Asset' | 'Authority Asset' | 'Conversion Asset' | 'Retention Asset';
type ContentSystemSignal = 'Strong' | 'Moderate' | 'Weak';
type CreatorFitMode = 'Personal' | 'Produced' | 'Hybrid';
type ContentCadence = 'Daily' | 'Weekly' | 'Campaign-only';

type ContentSystemModel = {
    primaryRole: ContentRole;
    secondaryRole: string | null;
    systemInterpretation: string;
    tradeOff: string;
    overallScore: number;
    overallSignal: ContentSystemSignal;
    creatorFitMode: CreatorFitMode;
    audienceConditioningSummary: string;
    frequencyCadence: ContentCadence;
    breakdown: {
        label: 'Series Potential' | 'Creator Fit' | 'Audience Conditioning' | 'Frequency Viability' | 'Sequence Utility';
        score: number;
        signal: ContentSystemSignal;
    }[];
    diagnostics: {
        title: 'Series Potential' | 'Creator Fit' | 'Audience Conditioning' | 'Frequency Viability' | 'Sequence Utility';
        signal: ContentSystemSignal;
        heading: string;
        detail: string;
    }[];
    riskFlags: string[];
    operationalNextActions: string[];
    sequenceRecommendation: {
        sequence: string;
        bestFit: string;
        why: string;
    };
};

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

const normalizeProseText = (value: string | undefined | null) => {
    if (!value) return '';
    const cleaned = value.replace(/\s+/g, ' ').trim();
    if (!cleaned) return '';

    const alpha = cleaned.replace(/[^A-Za-z]/g, '');
    if (alpha.length < 24) return cleaned;

    const upperRatio = alpha.length === 0
      ? 0
      : (alpha.match(/[A-Z]/g)?.length || 0) / alpha.length;

    if (upperRatio < 0.72) return cleaned;

    const lowered = cleaned.toLowerCase();
    return lowered
      .replace(/(^|[.!?]\s+)([a-z])/g, (_m, start, ch) => `${start}${ch.toUpperCase()}`)
      .replace(/\b(chanel|vb|ad|cta|dna|hud)\b/gi, (m) => m.toUpperCase());
};

const proseParagraphs = (value: string | undefined | null, sentenceChunkSize = 2): string[] => {
    const normalized = normalizeProseText(value);
    if (!normalized) return [];

    const manual = String(value)
        .split(/\n+/)
        .map((p) => normalizeProseText(p))
        .filter(Boolean);

    if (manual.length > 1) return manual;

    const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length <= sentenceChunkSize) return [normalized];

    const chunks: string[] = [];
    for (let i = 0; i < sentences.length; i += sentenceChunkSize) {
        chunks.push(sentences.slice(i, i + sentenceChunkSize).join(' ').trim());
    }
    return chunks;
};

const normalizeConfidenceScore = (value?: number | null) => {
    if (value == null) return null;
    return value <= 1 ? Math.round(value * 100) : Math.round(value);
};


const clampHundred = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

const signalBand = (
    score: number,
    labels: [high: string, medium: string, low: string],
) => {
    if (score >= 75) return labels[0];
    if (score >= 50) return labels[1];
    return labels[2];
};

const deriveAnalysisLanguageSystem = ({
    extraction,
    dossier,
    confidenceScore,
    frictionScore,
    persuasionDensity,
    marketPulseData,
}: {
    extraction: any;
    dossier: any;
    confidenceScore: number | null;
    frictionScore: number | null;
    persuasionDensity: number | null;
    marketPulseData: MarketPulseData | null;
}): AnalysisLanguageSystem => {
    const confidence = confidenceScore ?? 62;
    const friction = frictionScore ?? 26;
    const density = persuasionDensity ?? 68;

    const hasNarrative = Boolean(dossier?.narrative_framework);
    const hasGaze = Boolean(dossier?.gaze_topology?.reading || dossier?.gaze_topology?.power_holder);
    const hasStrategicMoves = Boolean((dossier?.archetype_mapping?.strategic_moves?.length ?? 0) > 0);
    const paletteCount = Array.isArray(extraction?.color_palette) ? extraction.color_palette.length : 0;
    const hasCounterRead = Boolean((dossier?.counter_reading_matrix?.length ?? 0) > 0);

    const triggerDist = (dossier?.archetype_mapping?.trigger_distribution || {}) as Record<string, unknown>;
    const triggerValues = Object.values(triggerDist)
        .map((v) => (typeof v === 'number' ? v : Number(v)))
        .filter((v) => Number.isFinite(v)) as number[];
    const activeTriggers = triggerValues.filter((v) => v >= 20).length;
    const maxTrigger = triggerValues.length > 0 ? Math.max(...triggerValues) : 0;

    const clarity = clampHundred(confidence * 0.45 + (100 - friction) * 0.35 + (hasNarrative ? 84 : 62) * 0.2);
    const attention = clampHundred(density * 0.45 + confidence * 0.25 + (hasGaze ? 86 : 62) * 0.2 + (maxTrigger > 0 ? 76 : 58) * 0.1);
    const cohesion = clampHundred(confidence * 0.4 + (100 - friction) * 0.3 + (extraction?.primary_mechanic ? 84 : 58) * 0.2 + ((paletteCount >= 3 && paletteCount <= 6) ? 82 : 66) * 0.1);
    const intent = clampHundred(confidence * 0.5 + (100 - friction) * 0.2 + (hasStrategicMoves ? 84 : 60) * 0.2 + (dossier?.archetype_mapping?.target_posture ? 82 : 60) * 0.1);

    const rankSignal = marketPulseData?.category_persuasion_benchmark?.your_rank || '';
    const marketDistinctLift = rankSignal.toLowerCase().includes('outperform') ? 6 : rankSignal ? 2 : 0;
    const distinction = clampHundred(55 + activeTriggers * 6 - maxTrigger * 0.22 + (hasCounterRead ? 6 : 0) + (paletteCount >= 5 ? 4 : 0) + marketDistinctLift);

    const hierarchyScore = clampHundred(clarity * 0.5 + cohesion * 0.5);
    const balanceScore = clampHundred(cohesion * 0.65 + (100 - friction) * 0.35);
    const contrastScore = clampHundred(attention * 0.65 + distinction * 0.35);
    const densityScore = clampHundred(density);
    const focusIntegrityScore = clampHundred(clarity * 0.4 + attention * 0.4 + (100 - friction) * 0.2);

    const primaryFocus = firstSentence(dossier?.gaze_topology?.power_holder) || firstSentence(extraction?.evidence_anchors?.[0]) || 'Product silhouette (high contrast entry point).';
    const secondaryFocus = firstSentence(dossier?.gaze_topology?.viewer_position) || 'Brand mark (delayed recognition).';
    const dropOff =
        friction >= 30
            ? 'Drop-off detected between primary focus and supporting copy layer.'
            : friction >= 20
              ? 'Minor drop-off detected between secondary focus and supporting copy layer.'
              : 'No material drop-off detected across the primary reading path.';

    const strategicThesis = firstSentence(dossier?.archetype_mapping?.target_posture) || 'Signals premium restraint while preserving underlying visual pressure.';
    const triggerMechanic =
        extraction?.primary_mechanic
            ? `${extraction.primary_mechanic} drives entry through controlled visual dominance and focused contrast.`
            : 'High-contrast subject isolation establishes entry, reinforced by negative-space control.';
    const frictionPoints =
        friction >= 28
            ? 'Supporting copy competes with the primary focal object, reducing message hierarchy clarity.'
            : 'Message hierarchy is stable, with only minor compression pressure in the supporting layer.';
    const categoryPositioning =
        firstSentence(dossier?.archetype_mapping?.strategic_moves?.[0]) ||
        (rankSignal
            ? `Current route reads as ${rankSignal.toLowerCase()} against category pressure.`
            : 'Aligns with category signals, but needs stronger deviation to become unmistakably ownable.');

    return {
        primaryScores: [
            { label: 'Clarity', value: clarity },
            { label: 'Attention', value: attention },
            { label: 'Cohesion', value: cohesion },
            { label: 'Intent', value: intent },
            { label: 'Distinction', value: distinction },
        ],
        attentionPath: {
            primaryFocus,
            secondaryFocus,
            dropOff,
        },
        structuralSignals: [
            { label: 'Hierarchy', value: signalBand(hierarchyScore, ['Strong', 'Moderate', 'Fragmented']) },
            { label: 'Balance', value: signalBand(balanceScore, ['Controlled', 'Variable', 'Competing']) },
            { label: 'Contrast', value: signalBand(contrastScore, ['Strong', 'Moderate', 'Muted']) },
            { label: 'Density', value: signalBand(densityScore, ['High', 'Moderate', 'Lean']) },
            { label: 'Focus Integrity', value: signalBand(focusIntegrityScore, ['Locked', 'Stable', 'Fragmented']) },
        ],
        strategicRead: {
            thesis: strategicThesis,
            triggerMechanic,
            frictionPoints,
            categoryPositioning,
        },
        confidenceIndex: confidence >= 85 ? 'High' : confidence >= 65 ? 'Medium' : 'Low',
    };
};


const deriveSocialContext = ({
    analysisLanguage,
    confidenceScore,
    frictionScore,
    persuasionDensity,
}: {
    analysisLanguage: AnalysisLanguageSystem;
    confidenceScore: number | null;
    frictionScore: number | null;
    persuasionDensity: number | null;
}): SocialContextModel => {
    const byLabel = Object.fromEntries(
        analysisLanguage.primaryScores.map((score) => [score.label, score.value]),
    ) as Record<PrimaryScoreLabel, number>;

    const clarity = byLabel.Clarity ?? 60;
    const attention = byLabel.Attention ?? 60;
    const cohesion = byLabel.Cohesion ?? 60;
    const intent = byLabel.Intent ?? 60;
    const distinction = byLabel.Distinction ?? 60;
    const density = persuasionDensity ?? 68;
    const friction = frictionScore ?? 24;
    const confidence = confidenceScore ?? 72;

    const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
    const toSignal = (score: number): SocialPlatformScore['signal'] => {
        if (score >= 75) return 'Strong';
        if (score >= 60) return 'Usable';
        return 'At Risk';
    };

    const metaFeedScore = clamp(clarity * 0.36 + intent * 0.26 + cohesion * 0.2 + attention * 0.18);
    let reelsScore = clamp(attention * 0.34 + distinction * 0.24 + clarity * 0.22 + density * 0.2 - (clarity >= 80 ? 10 : 5));
    let tiktokScore = clamp(attention * 0.38 + distinction * 0.24 + density * 0.2 + clarity * 0.18 - (clarity >= 80 ? 12 : 6));
    const shortsScore = clamp(attention * 0.3 + clarity * 0.27 + intent * 0.23 + distinction * 0.2);
    const linkedinScore = clamp(clarity * 0.38 + intent * 0.32 + cohesion * 0.2 + confidence * 0.1);

    let platformScores: SocialPlatformScore[] = [
        { platform: 'Meta Feed', score: metaFeedScore, signal: toSignal(metaFeedScore) },
        { platform: 'Instagram Reels', score: reelsScore, signal: toSignal(reelsScore) },
        { platform: 'TikTok', score: tiktokScore, signal: toSignal(tiktokScore) },
        { platform: 'YouTube Shorts', score: shortsScore, signal: toSignal(shortsScore) },
        { platform: 'LinkedIn', score: linkedinScore, signal: toSignal(linkedinScore) },
    ];

    const strongPlatformCount = platformScores.filter((row) => row.signal === 'Strong').length;
    if (strongPlatformCount >= 4) {
        platformScores = platformScores.map((row) => {
            if (row.platform === 'Instagram Reels' || row.platform === 'TikTok') {
                const score = Math.min(row.score, row.platform === 'Instagram Reels' ? 78 : 75);
                return { ...row, score, signal: toSignal(score) };
            }
            return row;
        });
    }

    const socialInterpretation =
        clarity >= 78 && attention >= 75
            ? 'The asset stops effectively and holds through clear message delivery, but depends on a clean opening to prevent early drop-off.'
            : attention >= 75
                ? 'The asset can stop the scroll, but it does not hold long enough unless the first claim lands immediately.'
                : 'The asset needs a stronger first-frame proposition before feed behavior works in its favor.';

    const tradeOff =
        clarity >= 80
            ? 'High clarity supports retention, but reduces raw scroll curiosity in fast feeds.'
            : attention >= 78
                ? 'Higher stop power improves entry, but can weaken message retention if the reveal comes too late.'
                : 'The asset can either protect clarity or increase stop power, but not both without adaptation.';

    const feedMechanics: SocialContextModel['feedMechanics'] = [
        {
            title: 'First-Frame Clarity',
            signal: clarity >= 80 ? 'Strong' : clarity >= 65 ? 'Moderate' : 'Weak',
            detail:
                clarity >= 80
                    ? 'The core message is legible immediately.'
                    : clarity >= 65
                        ? 'The message lands, but not fast enough for every feed environment.'
                        : 'The message arrives too late to protect the first second.',
        },
        {
            title: 'Scroll Stop Power',
            signal: attention >= 80 ? 'Strong' : attention >= 65 ? 'Moderate' : 'Weak',
            detail:
                attention >= 80
                    ? 'The asset interrupts passive scrolling quickly.'
                    : attention >= 65
                        ? 'The asset can interrupt the scroll, but not with enough consistency.'
                        : 'The asset does not create enough interruption to win the first glance.',
        },
        {
            title: 'Retention Stability',
            signal: intent >= 80 && friction <= 20 ? 'Strong' : intent >= 65 ? 'Moderate' : 'Weak',
            detail:
                intent >= 80 && friction <= 20
                    ? 'The message holds once the user stops.'
                    : intent >= 65
                        ? 'Clarity holds attention, but lacks enough tension to deepen engagement.'
                        : 'The asset loses momentum before the message fully settles.',
        },
        {
            title: 'Readability at Speed',
            signal: cohesion >= 78 && friction <= 20 ? 'Strong' : cohesion >= 65 ? 'Moderate' : 'Weak',
            detail:
                cohesion >= 78 && friction <= 20
                    ? 'The reading path remains stable under fast scroll conditions.'
                    : cohesion >= 65
                        ? 'The reading path holds, but only if the user slows down.'
                        : 'The reading path breaks under feed-speed scanning.',
        },
    ];

    const riskFlags: string[] = [];
    if (clarity >= 80) riskFlags.push('High clarity can reduce curiosity, causing scroll-through in fast feeds.');
    if (attention < 82 || distinction < 72) riskFlags.push('If the first frame does not differentiate, the structure is never reached.');
    if (reelsScore < metaFeedScore || tiktokScore < metaFeedScore) riskFlags.push('Platform adaptation is required; direct reuse will underperform on short-form video.');
    if (riskFlags.length === 0) {
        riskFlags.push('The asset remains usable, but direct cross-platform reuse still risks feed inefficiency.');
    }

    const compactRiskFlags = riskFlags.slice(0, 3);

    const adaptationMoves: SocialContextModel['adaptationMoves'] = [
        {
            platform: 'Meta Feed',
            move: 'Keep structure, but reduce copy density in frame one.',
        },
        {
            platform: 'Instagram Reels',
            move: 'Increase contrast in the first second and tighten crop around the subject.',
        },
        {
            platform: 'TikTok',
            move: 'Replace the structured entry with a tension-first hook before revealing the message.',
        },
        {
            platform: 'YouTube Shorts',
            move: 'Introduce the brand cue earlier to avoid mid-scroll recognition loss.',
        },
        {
            platform: 'LinkedIn',
            move: 'Lead with outcome clarity and remove stylistic ambiguity from the opening claim.',
        },
    ];

    return {
        platformScores,
        socialInterpretation,
        tradeOff,
        feedMechanics,
        riskFlags: compactRiskFlags,
        adaptationMoves,
    };
};

const deriveContentSystemContext = ({
    analysisLanguage,
    confidenceScore,
    frictionScore,
    persuasionDensity,
}: {
    analysisLanguage: AnalysisLanguageSystem;
    confidenceScore: number | null;
    frictionScore: number | null;
    persuasionDensity: number | null;
}): ContentSystemModel => {
    const byLabel = Object.fromEntries(
        analysisLanguage.primaryScores.map((score) => [score.label, score.value]),
    ) as Record<PrimaryScoreLabel, number>;

    const clarity = byLabel.Clarity ?? 60;
    const attention = byLabel.Attention ?? 60;
    const cohesion = byLabel.Cohesion ?? 60;
    const intent = byLabel.Intent ?? 60;
    const distinction = byLabel.Distinction ?? 60;
    const density = persuasionDensity ?? 68;
    const friction = frictionScore ?? 24;
    const confidence = confidenceScore ?? 72;

    const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
    const toSignal = (score: number): ContentSystemSignal => {
        if (score >= 80) return 'Strong';
        if (score >= 65) return 'Moderate';
        return 'Weak';
    };

    const roleScores: Record<ContentRole, number> = {
        'Hook Asset': clamp(attention * 0.42 + distinction * 0.22 + clarity * 0.18 + density * 0.18),
        'Authority Asset': clamp(clarity * 0.34 + cohesion * 0.24 + intent * 0.2 + confidence * 0.22),
        'Conversion Asset': clamp(intent * 0.38 + clarity * 0.24 + attention * 0.18 + (100 - friction) * 0.2),
        'Retention Asset': clamp(cohesion * 0.3 + density * 0.22 + distinction * 0.18 + (100 - friction) * 0.18 + intent * 0.12),
    };

    const rankedRoles = (Object.entries(roleScores) as [ContentRole, number][])
        .sort((a, b) => b[1] - a[1]);

    const primaryRole = rankedRoles[0]?.[0] || 'Authority Asset';
    const secondaryRole =
        rankedRoles[1] && rankedRoles[1][1] >= 74 && rankedRoles[0] && rankedRoles[0][1] - rankedRoles[1][1] <= 6
            ? rankedRoles[1][0] === 'Conversion Asset'
                ? 'Conversion Support'
                : rankedRoles[1][0]
            : null;

    const polishPenalty = clarity >= 82 && cohesion >= 78 ? 8 : clarity >= 76 && cohesion >= 72 ? 4 : 0;
    const repetitionPenalty = friction >= 24 ? 10 : friction >= 18 ? 6 : friction >= 12 ? 3 : 0;
    const seriesPotentialScore = clamp(cohesion * 0.34 + clarity * 0.28 + distinction * 0.2 + (100 - friction) * 0.18 - repetitionPenalty);
    const creatorFitScore = clamp(attention * 0.24 + distinction * 0.18 + cohesion * 0.18 + (100 - friction) * 0.18 + intent * 0.12 + clarity * 0.1 - polishPenalty);
    const audienceConditioningScore = clamp(intent * 0.28 + clarity * 0.27 + cohesion * 0.25 + density * 0.2 - (friction >= 20 ? 4 : 0));
    let frequencyViabilityScore = clamp(seriesPotentialScore * 0.35 + audienceConditioningScore * 0.25 + creatorFitScore * 0.2 + (100 - friction) * 0.2 - repetitionPenalty);
    const sequenceUtilityScore = clamp(intent * 0.3 + attention * 0.28 + clarity * 0.22 + cohesion * 0.2);
    let overallScore = clamp(
        seriesPotentialScore * 0.22 +
        creatorFitScore * 0.16 +
        audienceConditioningScore * 0.22 +
        frequencyViabilityScore * 0.16 +
        sequenceUtilityScore * 0.24
    );

    const creatorFitMode: CreatorFitMode =
        clarity >= 82 && cohesion >= 78 && friction <= 22
            ? 'Produced'
            : attention >= 78 && distinction >= 74 && cohesion < 74
                ? 'Personal'
                : 'Hybrid';

    const frequencyCadence: ContentCadence =
        frequencyViabilityScore >= 84
            ? 'Daily'
        : frequencyViabilityScore >= 68
                ? 'Weekly'
                : 'Campaign-only';

    const systemInterpretationByRole: Record<ContentRole, string> = {
        'Hook Asset': 'This belongs at the front of the sequence. Its job is to create entry, then hand off quickly to proof.',
        'Authority Asset': 'This belongs in the middle of the sequence. Its job is to organize belief before the ask arrives.',
        'Conversion Asset': 'This belongs near the end of the sequence. Its job is to convert existing intent, not create interest from zero.',
        'Retention Asset': 'This belongs between larger campaign beats. Its job is to maintain continuity, not carry the main decision.',
    };

    const creatorFitHeadingByMode: Record<CreatorFitMode, string> = {
        Personal: 'Personal',
        Produced: 'Produced',
        Hybrid: 'Hybrid',
    };

    const creatorFitDetailByMode: Record<CreatorFitMode, string> = {
        Personal: 'The asset feels creator-native and immediate, with enough looseness to sit naturally in personality-led feeds.',
        Produced: 'The asset feels polished and brand-controlled, which supports campaign deployment but can read formal in creator-led environments.',
        Hybrid: 'The asset balances strategic polish with enough immediacy to adapt into creator-led and brand-led environments.',
    };

    const audienceConditioningSummary =
        audienceConditioningScore >= 82
            ? 'Trains return behavior by setting a repeatable payoff expectation.'
            : audienceConditioningScore >= 68
                ? 'Creates expectation, but not enough to lock a repeat habit on its own.'
                : 'Does not establish a reliable reason to return for the next post.';

    const tradeOffByRole: Record<ContentRole, string> = {
        'Hook Asset': 'Creates entry pressure, but sacrifices proof depth and sequence stability.',
        'Authority Asset': 'Builds clarity and trust, but sacrifices immediacy and creator-native pull.',
        'Conversion Asset': 'Sharpens the ask, but depends on prior belief to do its job.',
        'Retention Asset': 'Supports continuity, but does not carry the main decision on its own.',
    };

    const sequenceRecommendation =
        primaryRole === 'Hook Asset'
            ? {
                  sequence: 'Hook -> Value -> Conversion',
                  bestFit: 'Hook Post',
                  why: 'Put this first when the system needs entry. Do not ask it to carry proof and conversion in the same slot.',
              }
            : primaryRole === 'Authority Asset'
                ? {
                      sequence: 'Hook -> Value -> Conversion',
                      bestFit: 'Value / Authority Post',
                      why: 'Put this second when belief needs to be organized before the ask. It loses force if used as the opener.',
                  }
                : primaryRole === 'Conversion Asset'
                    ? {
                          sequence: 'Hook -> Value -> Conversion',
                          bestFit: 'Conversion Post',
                          why: 'Put this last when intent already exists. It underperforms if asked to generate demand from cold traffic.',
                      }
                    : {
                          sequence: 'Hook -> Value -> Conversion',
                          bestFit: 'Retention / Follow-up Post',
                          why: 'Put this after the main beat to keep the sequence coherent. It should not replace the hook or the ask.',
                      };

    const breakdownEntries = [
        { label: 'Series Potential' as const, score: seriesPotentialScore },
        { label: 'Creator Fit' as const, score: creatorFitScore },
        { label: 'Audience Conditioning' as const, score: audienceConditioningScore },
        { label: 'Frequency Viability' as const, score: frequencyViabilityScore },
        { label: 'Sequence Utility' as const, score: sequenceUtilityScore },
    ];

    const strongEntries = breakdownEntries.filter((entry) => entry.score >= 80);
    if (strongEntries.length === breakdownEntries.length) {
        let weakestIndex = 0;
        for (let i = 1; i < breakdownEntries.length; i += 1) {
            if (breakdownEntries[i].score < breakdownEntries[weakestIndex].score) weakestIndex = i;
        }
        breakdownEntries[weakestIndex].score = Math.min(breakdownEntries[weakestIndex].score, 79);
        overallScore = clamp(overallScore - 2);
    } else if (friction > 0 && strongEntries.length >= 4) {
        let weakestStrongIndex = -1;
        breakdownEntries.forEach((entry, index) => {
            if (entry.score >= 80 && (weakestStrongIndex === -1 || entry.score < breakdownEntries[weakestStrongIndex].score)) {
                weakestStrongIndex = index;
            }
        });
        if (weakestStrongIndex !== -1) {
            breakdownEntries[weakestStrongIndex].score = Math.min(breakdownEntries[weakestStrongIndex].score, 79);
        }
    }

    const breakdown: ContentSystemModel['breakdown'] = breakdownEntries.map((entry) => ({
        ...entry,
        signal: toSignal(entry.score),
    }));

    const diagnostics: ContentSystemModel['diagnostics'] = [
        {
            title: 'Series Potential',
            signal: toSignal(seriesPotentialScore),
            heading: seriesPotentialScore >= 80 ? 'Strong' : seriesPotentialScore >= 65 ? 'Moderate' : 'Limited',
            detail:
                seriesPotentialScore >= 80
                    ? 'The format can repeat without rebuilding the entire sequence logic each time.'
                    : seriesPotentialScore >= 65
                        ? 'The format can repeat, but each iteration needs a different entry claim.'
                        : 'The format breaks under repetition and should be treated as a one-off.',
        },
        {
            title: 'Creator Fit',
            signal: toSignal(creatorFitScore),
            heading: creatorFitHeadingByMode[creatorFitMode],
            detail:
                creatorFitMode === 'Personal'
                    ? 'Fits creator distribution without major adaptation.'
                    : creatorFitMode === 'Produced'
                        ? 'Needs a looser entry before creator-led distribution.'
                        : 'Can cross into creator channels, but not without calibration.',
        },
        {
            title: 'Sequence Utility',
            signal: toSignal(sequenceUtilityScore),
            heading: sequenceRecommendation.bestFit,
            detail:
                primaryRole === 'Hook Asset'
                    ? 'Useful only when the next asset resolves the entry claim.'
                    : primaryRole === 'Authority Asset'
                        ? 'Useful when the system needs proof, not novelty.'
                        : primaryRole === 'Conversion Asset'
                            ? 'Useful after the premise is already accepted.'
                            : 'Useful once the main decision moment has already passed.',
        },
    ];

    const riskFlags: string[] = [];
    if (creatorFitMode === 'Produced') {
        riskFlags.push('Creator-led distribution can reject the post before the core claim lands.');
    }
    if (seriesPotentialScore < 80 || frequencyCadence !== 'Daily') {
        riskFlags.push('Repeated use will decay fast if the entry proposition does not change across iterations.');
    }
    if (primaryRole !== 'Conversion Asset') {
        riskFlags.push('Used in isolation, it can create movement without advancing the audience to the next decision.');
    }
    if (riskFlags.length < 3 && attention < 70) {
        riskFlags.push('If forced into slot one, the sequence can stall before momentum forms.');
    }

    const operationalNextActions: string[] = [
        'Build 2-3 opening variants before repeating the format.',
        primaryRole === 'Authority Asset' || primaryRole === 'Retention Asset'
            ? `Place this in the ${sequenceRecommendation.bestFit.toLowerCase()} slot, not in daily rotation.`
            : `Lock its sequence role before rollout: ${sequenceRecommendation.sequence}.`,
        creatorFitMode === 'Produced'
            ? 'Add one creator-native cue before adapting it for influencer-led distribution.'
            : creatorFitMode === 'Hybrid'
                ? 'Loosen the entry without changing the role it plays in sequence.'
                : 'Keep the human tone, but make the payoff clearer in the first slot.',
    ];

    return {
        primaryRole,
        secondaryRole,
        systemInterpretation: systemInterpretationByRole[primaryRole],
        tradeOff: tradeOffByRole[primaryRole],
        overallScore,
        overallSignal: toSignal(overallScore),
        creatorFitMode,
        audienceConditioningSummary,
        frequencyCadence,
        breakdown,
        diagnostics,
        riskFlags: riskFlags.slice(0, 3),
        operationalNextActions,
        sequenceRecommendation,
    };
};

const deriveQualityVerdict = (
    confidenceScore: number | null,
    frictionScore: number | null,
    persuasionDensity: number | null,
): QualityVerdict => {
    if (
        confidenceScore !== null &&
        confidenceScore >= 85 &&
        (frictionScore === null || frictionScore <= 20) &&
        (persuasionDensity === null || persuasionDensity >= 70)
    ) {
        return 'Ship';
    }

    if (confidenceScore !== null && confidenceScore >= 60) {
        return 'Revise';
    }

    return 'Reject';
};

const qualityFailureReasons = ({
    confidenceScore,
    frictionScore,
    persuasionDensity,
    extraction,
    dossier,
}: {
    confidenceScore: number | null;
    frictionScore: number | null;
    persuasionDensity: number | null;
    extraction: any;
    dossier: any;
}): QualityReason[] => {
    const reasons: QualityReason[] = [];

    if (confidenceScore === null || confidenceScore < 70) {
        reasons.push({
            title: 'Confidence is below presentation threshold',
            detail:
                confidenceScore === null
                    ? 'System confidence is still unresolved, so this route is not yet safe to defend in a review room.'
                    : `Confidence is sitting at ${confidenceScore}/100, which is below the threshold for a clean client-room recommendation.`,
        });
    }

    if (frictionScore !== null && frictionScore > 25) {
        reasons.push({
            title: 'Cognitive friction is still elevated',
            detail: `Cognitive friction is at ${frictionScore}%, which signals message resistance and weakens immediate uptake.`,
        });
    }

    if (persuasionDensity !== null && persuasionDensity < 70) {
        reasons.push({
            title: 'Persuasion density is underpowered',
            detail: `Persuasion density is ${persuasionDensity}%, so the mechanism is not carrying enough strategic pressure yet.`,
        });
    }

    if (!extraction?.primary_mechanic) {
        reasons.push({
            title: 'Primary mechanic is unresolved',
            detail: 'The asset still lacks a clearly resolved persuasion engine, so the diagnosis cannot be locked with confidence.',
        });
    }

    if (!dossier?.objection_dismantling) {
        reasons.push({
            title: 'Objection handling is too thin',
            detail: 'The diagnostic layer is not yet surfacing a strong objection-dismantling case for why this route should win.',
        });
    }

    if ((dossier?.possible_readings?.length ?? 0) === 0) {
        reasons.push({
            title: 'Interpretive clarity is incomplete',
            detail: 'The dossier is missing enough stable reading paths to show how the creative will be interpreted under pressure.',
        });
    }

    if (reasons.length === 0) {
        reasons.push(
            {
                title: 'Mechanic is defensible',
                detail: 'The core persuasion system is stable enough to move forward without immediate structural concern.',
            },
            {
                title: 'Friction is under control',
                detail: 'Resistance is low enough that the route should travel cleanly into review and deployment.',
            },
            {
                title: 'The signal stack is coherent',
                detail: 'Execution DNA and narrative pressure are aligned closely enough to preserve decision confidence.',
            },
        );
    }

    return reasons.slice(0, 3);
};

const qualityFixPriorities = ({
    confidenceScore,
    frictionScore,
    persuasionDensity,
    dossier,
    extraction,
}: {
    confidenceScore: number | null;
    frictionScore: number | null;
    persuasionDensity: number | null;
    dossier: any;
    extraction: any;
}): FixPriority[] => {
    const priorities: FixPriority[] = [];

    if (frictionScore !== null && frictionScore > 25) {
        priorities.push({
            priority: 'P1',
            title: 'Reduce message resistance',
            detail: `Lower the ${frictionScore}% friction score by tightening the headline-to-visual handoff and removing avoidable ambiguity.`,
        });
    } else {
        priorities.push({
            priority: 'P1',
            title: 'Protect the winning mechanic',
            detail: `Keep ${extraction?.primary_mechanic?.toLowerCase() || 'the primary persuasion engine'} intact while pressure-testing only secondary execution choices.`,
        });
    }

    if (confidenceScore === null || confidenceScore < 85) {
        priorities.push({
            priority: 'P2',
            title: 'Raise decision confidence',
            detail:
                confidenceScore === null
                    ? 'Clarify the strategic posture and supporting evidence before this route is taken into a client-facing room.'
                    : `Move confidence beyond ${confidenceScore}/100 by making the strategic case more explicit and easier to defend.`,
        });
    } else {
        priorities.push({
            priority: 'P2',
            title: 'Sharpen execution DNA',
            detail: 'Refine compositional hierarchy, gaze routing, and chromatic punctuation without disturbing the route’s core logic.',
        });
    }

    if (persuasionDensity !== null && persuasionDensity < 70) {
        priorities.push({
            priority: 'P3',
            title: 'Increase persuasion pressure',
            detail: `Lift the ${persuasionDensity}% density score by tightening the value signal and making the mechanism land faster.`,
        });
    } else {
        priorities.push({
            priority: 'P3',
            title: 'Document the adaptation boundary',
            detail:
                firstSentence(dossier?.test_plan?.hypothesis) ||
                'Record what can change safely so future refinements do not break the route’s strongest working signals.',
        });
    }

    return priorities;
};

const withSeverity = (items: unknown[], order: ConstraintSeverity[]): ConstraintItem[] =>
    items
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean)
        .map((text, index) => ({
            text,
            severity: order[index] || order[order.length - 1] || 'optional',
        }));

const deriveConstraintItemCopy = (text: string, index: number): { title: string; body: string } => {
    const colonMatch = text.match(/^\s*([^:]+):\s*(.*)$/);
    if (colonMatch) {
        return {
            title: normalizeProseText(colonMatch[1].trim()),
            body: normalizeProseText(colonMatch[2].trim() || text),
        };
    }

    const cleaned = text.replace(/["']/g, '').replace(/\s+/g, ' ').trim();
    const words = cleaned.split(' ').filter(Boolean);
    const title = words.slice(0, 4).join(' ') || `Constraint ${String(index).padStart(2, '0')}`;

    return {
        title: normalizeProseText(title),
        body: normalizeProseText(text),
    };
};

const deriveStressLabRows = ({
    dossier,
    blueprintData,
    frictionScore,
    persuasionDensity,
    confidenceScore,
}: {
    dossier: any;
    blueprintData: BlueprintData | null;
    frictionScore: number | null;
    persuasionDensity: number | null;
    confidenceScore: number | null;
}): StressLabRow[] => {
    const materialCueCount = blueprintData?.technical_specs.material_cues?.length ?? 0;
    const hasStrongPalette = materialCueCount >= 2;
    const hasGazeSignal = Boolean(blueprintData?.technical_specs.gaze_vector || dossier?.gaze_topology?.viewer_position);
    const hypothesis = firstSentence(dossier?.test_plan?.hypothesis);

    return [
        {
            variable: 'Composition emphasis',
            currentState: firstSentence(dossier?.archetype_mapping?.target_posture) || 'Current composition is carrying the main brand posture.',
            proposedShift:
                frictionScore !== null && frictionScore > 25
                    ? 'Tighten hierarchy around the dominant focal object and remove secondary visual noise.'
                    : 'Hold the current frame structure and only test minor hierarchy compression.',
            predictedLift: frictionScore !== null && frictionScore > 25 ? 'High' : 'Medium',
            risk: confidenceScore !== null && confidenceScore >= 85 ? 'Medium' : 'Low',
            recommendation: frictionScore !== null && frictionScore > 25 ? 'Test' : 'Hold',
        },
        {
            variable: 'Chromatic intensity',
            currentState: hasStrongPalette ? 'Chromatic punctuation is already doing meaningful persuasion work.' : 'Color signal is present but not yet carrying enough pressure.',
            proposedShift:
                persuasionDensity !== null && persuasionDensity < 70
                    ? 'Increase controlled contrast around the main value cue rather than broad saturation.'
                    : 'Preserve current palette and test only small accent intensification.',
            predictedLift: persuasionDensity !== null && persuasionDensity < 70 ? 'Medium' : 'Low',
            risk: hasStrongPalette ? 'Low' : 'Medium',
            recommendation: persuasionDensity !== null && persuasionDensity < 70 ? 'Test' : 'Hold',
        },
        {
            variable: 'Gaze direction',
            currentState: firstSentence(blueprintData?.technical_specs.gaze_vector) || firstSentence(dossier?.gaze_topology?.reading) || 'Viewer address is stable but still open to routing refinement.',
            proposedShift: hasGazeSignal
                ? 'Sharpen eyeflow toward the product or message endpoint without changing the subject role.'
                : 'Do not introduce a new gaze vector until the current posture is clearer.',
            predictedLift: hasGazeSignal ? 'Medium' : 'Low',
            risk: hasGazeSignal ? 'Low' : 'High',
            recommendation: hasGazeSignal ? 'Test' : 'Avoid',
        },
        {
            variable: 'Copy compression',
            currentState: firstSentence(dossier?.possible_readings?.[0]?.reading) || 'Message pressure is readable but could land faster.',
            proposedShift:
                frictionScore !== null && frictionScore > 25
                    ? 'Compress the message into one harder-working value line and strip explanatory excess.'
                    : 'Preserve the message spine and only tighten non-essential wording.',
            predictedLift: frictionScore !== null && frictionScore > 25 ? 'High' : 'Medium',
            risk: persuasionDensity !== null && persuasionDensity >= 80 ? 'Medium' : 'Low',
            recommendation: frictionScore !== null && frictionScore > 25 ? 'Test' : 'Hold',
        },
        {
            variable: 'CTA prominence',
            currentState: hypothesis || 'Call-to-action pressure is currently implied through the broader mechanism.',
            proposedShift:
                persuasionDensity !== null && persuasionDensity < 70
                    ? 'Increase CTA prominence only if it supports the existing mechanic rather than competing with it.'
                    : 'Keep CTA pressure restrained and aligned with the current status/value signal.',
            predictedLift: persuasionDensity !== null && persuasionDensity < 70 ? 'Medium' : 'Low',
            risk: confidenceScore !== null && confidenceScore >= 85 ? 'Medium' : 'Low',
            recommendation: persuasionDensity !== null && persuasionDensity < 70 ? 'Test' : 'Hold',
        },
    ];
};

const deriveMarketPulseFallback = ({
    dossier,
    confidenceScore,
    frictionScore,
    persuasionDensity,
}: {
    dossier: any;
    confidenceScore: number | null;
    frictionScore: number | null;
    persuasionDensity: number | null;
}) => {
    const saturation = Math.max(
        38,
        Math.min(
            88,
            Math.round(
                (persuasionDensity ?? 60) * 0.55 +
                (frictionScore ?? 20) * 0.35 +
                ((dossier?.possible_readings?.length ?? 1) * 6),
            ),
        ),
    );
    const novelty = Math.max(
        24,
        Math.min(
            90,
            Math.round(
                (confidenceScore ?? 60) * 0.45 +
                Math.max(0, 100 - saturation) * 0.35 +
                ((dossier?.archetype_mapping?.strategic_moves?.length ?? 1) * 7),
            ),
        ),
    );
    const fatigue = Math.max(
        18,
        Math.min(
            86,
            Math.round(
                saturation * 0.5 +
                ((frictionScore ?? 20) * 0.3) +
                Math.max(0, 70 - novelty) * 0.25,
            ),
        ),
    );

    let timingSignal = 'Window open for measured deployment.';
    if (fatigue >= 65) timingSignal = 'Use selectively. The category is already showing fatigue pressure.';
    else if (novelty >= 72) timingSignal = 'Push now. The route still has timing advantage.';

    let interpretation = 'This read is directional because it is inferred from current dossier signals rather than a full external benchmark set.';
    if (saturation >= 70) {
        interpretation = 'Category pressure is elevated, so the route needs sharper differentiation and tighter execution discipline before scaling.';
    } else if (novelty >= 72) {
        interpretation = 'The route is still carrying novelty relative to current category pressure, so measured rollout has strategic upside now.';
    }

    return {
        saturation,
        novelty,
        fatigue,
        timingSignal,
        interpretation,
        confidenceLabel: 'Directional estimate',
    };
};

const confidenceTierFromScore = (confidenceScore: number | null): TrustLevel => {
    if (confidenceScore === null) return 'Low';
    if (confidenceScore >= 85) return 'High';
    if (confidenceScore >= 60) return 'Medium';
    return 'Low';
};

const evidenceStrengthFromState = ({
    confidenceScore,
    blueprintData,
    marketPulseData,
    frictionScore,
}: {
    confidenceScore: number | null;
    blueprintData: BlueprintData | null;
    marketPulseData: MarketPulseData | null;
    frictionScore: number | null;
}): EvidenceStrength => {
    const evidencePoints = [
        confidenceScore !== null && confidenceScore >= 80,
        Boolean(blueprintData?.verified_dna_prompt),
        Boolean(marketPulseData),
        frictionScore !== null,
    ].filter(Boolean).length;

    if (evidencePoints >= 4) return 'Strong';
    if (evidencePoints >= 2) return 'Moderate';
    return 'Weak';
};

const assumptionLoadFromState = ({
    marketPulseData,
    marketPulseBelowThreshold,
    blueprintData,
    confidenceScore,
}: {
    marketPulseData: MarketPulseData | null;
    marketPulseBelowThreshold: boolean;
    blueprintData: BlueprintData | null;
    confidenceScore: number | null;
}): AssumptionLoad => {
    const assumptionPoints = [
        !marketPulseData || marketPulseBelowThreshold,
        !blueprintData,
        confidenceScore === null || confidenceScore < 60,
    ].filter(Boolean).length;

    if (assumptionPoints >= 2) return 'High';
    if (assumptionPoints === 1) return 'Medium';
    return 'Low';
};

const scoreClamp = (value: number) => Math.max(0, Math.min(5, Math.round(value)));

const deriveIntegratedRecommendation = ({
    qualityVerdict,
    confidenceScore,
    frictionScore,
    persuasionDensity,
    failureReasons,
    fixPriorities,
    stressLabRows,
    mustKeepConstraints,
    mustAvoidConstraints,
    marketPulseData,
    marketPulseBelowThreshold,
    marketPulseFallback,
    extraction,
    dossier,
    blueprintData,
    decisionLogEntries,
}: {
    qualityVerdict: QualityVerdict;
    confidenceScore: number | null;
    frictionScore: number | null;
    persuasionDensity: number | null;
    failureReasons: QualityReason[];
    fixPriorities: FixPriority[];
    stressLabRows: StressLabRow[];
    mustKeepConstraints: ConstraintItem[];
    mustAvoidConstraints: ConstraintItem[];
    marketPulseData: MarketPulseData | null;
    marketPulseBelowThreshold: boolean;
    marketPulseFallback: ReturnType<typeof deriveMarketPulseFallback>;
    extraction: any;
    dossier: any;
    blueprintData: BlueprintData | null;
    decisionLogEntries: DecisionLogEntry[];
}): IntegratedRecommendationData => {
    const confidence = confidenceTierFromScore(confidenceScore);
    const evidenceStrength = evidenceStrengthFromState({
        confidenceScore,
        blueprintData,
        marketPulseData,
        frictionScore,
    });
    const assumptionLoad = assumptionLoadFromState({
        marketPulseData,
        marketPulseBelowThreshold,
        blueprintData,
        confidenceScore,
    });

    const primaryTest =
        stressLabRows.find((row) => row.recommendation === 'Test' && row.predictedLift === 'High') ||
        stressLabRows.find((row) => row.recommendation === 'Test') ||
        stressLabRows[0];

    const timingLine = marketPulseData
        ? marketPulseBelowThreshold
            ? `Category timing is promising but still directional at ${marketPulseData.assetCount}/20 sampled assets.`
            : `Category timing currently supports ${marketPulseData.category_persuasion_benchmark.your_rank.toLowerCase()} movement if the working mechanic is preserved.`
        : marketPulseFallback.timingSignal;

    const knownUnknowns = [
        !marketPulseData || marketPulseBelowThreshold ? 'Full external category pressure is still partially inferred.' : '',
        !blueprintData ? 'Blueprint Trace is not fully populated yet.' : '',
        frictionScore === null ? 'Cognitive friction is not fully resolved yet.' : '',
    ].filter(Boolean);

    const facts = [
        extraction?.primary_mechanic ? `Primary mechanic resolved as ${extraction.primary_mechanic}.` : '',
        confidenceScore !== null ? `Confidence is ${confidenceScore}/100.` : '',
        frictionScore !== null ? `Cognitive friction is ${frictionScore}%.` : '',
        persuasionDensity !== null ? `Persuasion density is ${persuasionDensity}%.` : '',
        mustKeepConstraints[0]?.text ? `Must keep: ${mustKeepConstraints[0].text}` : '',
    ].filter(Boolean);

    const inferences = [
        failureReasons[0]?.detail || '',
        timingLine,
        primaryTest ? `${primaryTest.variable} is the highest-value next variable to test.` : '',
    ].filter(Boolean);

    const decisionQualityScore = scoreClamp(
        ((confidenceScore ?? 45) / 20) -
            ((frictionScore ?? 20) > 25 ? 1 : 0) +
            (qualityVerdict === 'Ship' ? 1 : qualityVerdict === 'Revise' ? 0 : -1),
    );
    const causalConfidenceScore = scoreClamp(
        2 +
            (primaryTest?.predictedLift === 'High' ? 2 : primaryTest?.predictedLift === 'Medium' ? 1 : 0) -
            (primaryTest?.risk === 'High' ? 1 : 0),
    );
    const strategicFitScore = scoreClamp(
        2 +
            ((marketPulseData && !marketPulseBelowThreshold) ? 2 : 1) +
            ((persuasionDensity ?? 0) >= 70 ? 1 : 0) -
            ((frictionScore ?? 0) > 30 ? 1 : 0),
    );
    const contextContinuityScore = scoreClamp(
        1 +
            (blueprintData ? 2 : 0) +
            (marketPulseData ? 1 : 0) +
            (decisionLogEntries.length > 0 ? 1 : 0),
    );

    const recommendedDirection =
        qualityVerdict === 'Ship'
            ? `Ship the route with controlled refinement around ${primaryTest?.variable?.toLowerCase() || 'the strongest working variable'}.`
            : qualityVerdict === 'Revise'
                ? `Revise the route before presentation, starting with ${primaryTest?.variable?.toLowerCase() || 'the highest-value variable'} and preserving the core mechanic.`
                : `Reject the current route and rebuild from the diagnosed mechanic boundary rather than defending the current execution.`;

    const thesis = `${recommendedDirection} ${extraction?.primary_mechanic ? `The core thesis remains ${extraction.primary_mechanic.toLowerCase()},` : 'The core mechanic is still unstable,'} and the decision should be driven by whether that mechanism can survive refinement without increasing friction.`;
    const whyNow = timingLine;
    const riskRewardTension =
        primaryTest
            ? `The reward is in testing ${primaryTest.variable.toLowerCase()} for lift without breaking ${mustKeepConstraints[0]?.text?.toLowerCase() || 'the strongest working signal'}. The risk is ${mustAvoidConstraints[0]?.text?.toLowerCase() || 'introducing avoidable message drift'}.`
            : `The reward is in protecting the working mechanism. The risk is introducing avoidable drift before the route is pressure-tested.`;

    const executionNext3 = [
        `Lock ${mustKeepConstraints[0]?.text || 'the strongest working mechanic'} before any broader revision.`,
        `${fixPriorities[0]?.title || 'Reduce the primary failure mode'} by executing ${primaryTest?.proposedShift?.toLowerCase() || 'the highest-value controlled test'}.`,
        `Re-check the route against ${mustAvoidConstraints[0]?.text?.toLowerCase() || 'the top avoidable failure mode'} before export or client review.`,
    ];

    const watchouts = mustAvoidConstraints[0]?.text || failureReasons[0]?.detail || 'Do not let refinement increase friction faster than it increases persuasion pressure.';
    const fallback = `If the assumption that ${primaryTest?.variable?.toLowerCase() || 'the next test variable'} can improve lift without damaging the core mechanic fails, revert to ${mustKeepConstraints[0]?.text?.toLowerCase() || 'the current strongest working route'} and hold the asset at ${qualityVerdict === 'Ship' ? 'ship-ready refinement' : 'revise'} rather than forcing another speculative change.`;

    return {
        thesis,
        whyNow,
        riskRewardTension,
        recommendedDirection,
        decision: qualityVerdict,
        rationale: failureReasons[0]?.detail || `Current evidence supports a ${qualityVerdict.toLowerCase()} decision.`,
        executionNext3,
        watchouts,
        fallback,
        confidence,
        evidenceStrength,
        assumptionLoad,
        knownUnknowns: knownUnknowns.length > 0 ? knownUnknowns : ['No material unknowns are currently blocking decision confidence.'],
        facts,
        inferences,
        moduleScores: [
            { label: 'Decision Quality', score: decisionQualityScore },
            { label: 'Causal Confidence', score: causalConfidenceScore },
            { label: 'Strategic Fit', score: strategicFitScore },
            { label: 'Context Continuity', score: contextContinuityScore },
        ],
    };
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


export default function AssetWorkspace({
    initialAsset,
    isSovereign,
    agency,
    sampleMode = false,
}: {
    initialAsset: WorkspaceAsset,
    isSovereign: boolean,
    agency: any,
    sampleMode?: boolean,
}) {
    const [asset, setAsset] = useState(initialAsset);
    const [activeTab, setActiveTab] = useState<DossierTab>(sampleMode ? 'QUALITY GATE' : 'ASSET CONTEXT');
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
    const [decisionLogEntries, setDecisionLogEntries] = useState<DecisionLogEntry[]>([]);
    const [decisionNote, setDecisionNote] = useState('');
    const [showDecisionSummary, setShowDecisionSummary] = useState(false);
    const [decisionVerdict, setDecisionVerdict] = useState<'Ship' | 'Revise' | 'Kill' | null>(null);

    const [sequenceData, setSequenceData] = useState<SequenceData | null>(null);
    const [blueprintData, setBlueprintData] = useState<BlueprintData | null>(
        parseBlueprint(Array.isArray(initialAsset.extraction) ? initialAsset.extraction[0]?.blueprint : initialAsset.extraction?.blueprint)
    );
    const [cloneData, setCloneData] = useState<CloneOutputData | null>(
        parseCloneOutput(Array.isArray(initialAsset.extraction) ? initialAsset.extraction[0]?.clone_output : initialAsset.extraction?.clone_output)
    );
    const [activeAct, setActiveAct] = useState<string | null>(null);

    const printRef = useRef<HTMLDivElement>(null);
    const assetContextTopRef = useRef<HTMLDivElement>(null);
    const tabContentTopRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (tab: DossierTab) => {
        if (tab === activeTab) return;
        setActiveTab(tab);

        if (typeof window !== 'undefined') {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            requestAnimationFrame(() => {
                const scrollTarget = tab === 'ASSET CONTEXT' ? assetContextTopRef.current : tabContentTopRef.current;
                scrollTarget?.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start',
                });
            });
        }
    };

    // Normalize extraction payload (V1 array vs V2 object)
    const extraction = Array.isArray(asset.extraction) ? asset.extraction[0] : asset.extraction;
    const dossier = extraction?.full_dossier as any;
    const cloneIntroSource = cloneData?.extracted_mechanism || extraction?.primary_mechanic || 'Creative DNA Extraction';
    const cloneIntroBody = cloneData?.deployment_principle || 'Generate five original campaign concepts that preserve the persuasion architecture while shifting the aesthetic, scene, and execution language.';
    const { lead: cloneIntroLead, remainder: cloneIntroRemainder } = splitLeadSentence(cloneIntroSource);
    const marketPulseBelowThreshold = (marketPulseData?.assetCount ?? 0) > 0 && (marketPulseData?.assetCount ?? 0) < 20;
    const dossierTabs = sampleMode ? SAMPLE_DOSSIER_TABS : FULL_DOSSIER_TABS;
    const tabPhaseGroups = DOSSIER_TAB_PHASES
        .map((phase) => ({
            ...phase,
            tabs: phase.tabs.filter((tab) => dossierTabs.includes(tab)),
        }))
        .filter((phase) => phase.tabs.length > 0);
    const confidenceScore = normalizeConfidenceScore(extraction?.confidence_score);
    const frictionScore =
        typeof dossier?.persuasion_metrics?.cognitive_friction === 'number'
            ? dossier.persuasion_metrics.cognitive_friction
            : null;
    const persuasionDensity =
        typeof dossier?.persuasion_metrics?.persuasion_density === 'number'
            ? dossier.persuasion_metrics.persuasion_density
            : null;
    const qualityVerdict = deriveQualityVerdict(confidenceScore, frictionScore, persuasionDensity);
    const analysisLanguage = deriveAnalysisLanguageSystem({
        extraction,
        dossier,
        confidenceScore,
        frictionScore,
        persuasionDensity,
        marketPulseData,
    });
    const socialContext = deriveSocialContext({
        analysisLanguage,
        confidenceScore,
        frictionScore,
        persuasionDensity,
    });
    const contentSystemContext = deriveContentSystemContext({
        analysisLanguage,
        confidenceScore,
        frictionScore,
        persuasionDensity,
    });
    const scoreByLabel = Object.fromEntries(analysisLanguage.primaryScores.map((score) => [score.label, score.value])) as Record<'Clarity' | 'Attention' | 'Cohesion' | 'Intent' | 'Distinction', number>;
    const signalByLabel = Object.fromEntries(analysisLanguage.structuralSignals.map((signal) => [signal.label, signal.value])) as Record<'Hierarchy' | 'Balance' | 'Contrast' | 'Density' | 'Focus Integrity', string>;
    const structuralSummary = signalByLabel['Focus Integrity'] === 'Fragmented'
        ? 'Overall Structure: Stable with localized breakdown in focus integrity.'
        : signalByLabel['Hierarchy'] === 'Strong' && signalByLabel['Balance'] === 'Controlled'
            ? 'Overall Structure: Stable across hierarchy and balance.'
            : 'Overall Structure: Serviceable but still carrying structural variance.';
    const confidenceRationale =
        scoreByLabel.Clarity >= 75 && scoreByLabel.Attention >= 75 && scoreByLabel.Intent >= 75
            ? 'Based on strong alignment between clarity, attention control, and intent.'
            : scoreByLabel.Clarity >= 65 && scoreByLabel.Attention >= 65
                ? 'Based on credible structural alignment with moderate signal variance.'
                : 'Based on directional alignment that still requires tighter structural control.';
    const supportingCopyPath = (frictionScore ?? 26) >= 28
        ? 'Supporting copy (low engagement).'
        : 'Supporting copy (moderate engagement).';
    const dossierReportDate = new Date().toLocaleDateString('en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    const dossierPreparedFor = exportClientName?.trim() || 'Client Review';
    const dossierModeLabel = agency?.is_whitelabel_active ? 'White Label Ready' : 'Internal Review';
    const dossierCampaignBrand = asset.brand?.name || 'Campaign';
    const dossierCampaignCode = asset.id.toUpperCase().slice(0, 8);
    const failureReasons = qualityFailureReasons({
        confidenceScore,
        frictionScore,
        persuasionDensity,
        extraction,
        dossier,
    });
    const fixPriorities = qualityFixPriorities({
        confidenceScore,
        frictionScore,
        persuasionDensity,
        dossier,
        extraction,
    });
    const mustKeepConstraints = withSeverity(
        blueprintData?.execution_constraints.must_include?.length
            ? blueprintData.execution_constraints.must_include
            : [
                  extraction?.primary_mechanic ? `Protect the primary mechanic: ${extraction.primary_mechanic}` : '',
                  firstSentence(dossier?.archetype_mapping?.target_posture),
                  firstSentence(dossier?.possible_readings?.[0]?.reading),
              ],
        ['critical', 'high', 'optional'],
    );
    const mustAvoidConstraints = withSeverity(
        blueprintData?.execution_constraints.must_not_include?.length
            ? blueprintData.execution_constraints.must_not_include
            : [
                  firstSentence(dossier?.objection_dismantling),
                  frictionScore !== null && frictionScore > 25
                      ? `Do not increase message friction beyond the current ${frictionScore}% resistance level.`
                      : '',
                  persuasionDensity !== null && persuasionDensity < 70
                      ? 'Avoid weakening the central value signal any further.'
                      : '',
              ],
        ['critical', 'high', 'optional'],
    );
    const safeAdaptationZone = withSeverity(
        blueprintData?.visual_variant_prompts?.length
            ? blueprintData.visual_variant_prompts.map((variant) => variant.concept)
            : blueprintData?.ad_copy_remixes?.length
                ? blueprintData.ad_copy_remixes.map((remix) => remix.angle)
                : dossier?.test_plan?.test_cells?.map((cell: any) => `${cell.lever}: ${cell.change}`) || [],
        ['high', 'optional', 'optional'],
    );
    const stressLabRows = deriveStressLabRows({
        dossier,
        blueprintData,
        frictionScore,
        persuasionDensity,
        confidenceScore,
    });
    const marketPulseFallback = deriveMarketPulseFallback({
        dossier,
        confidenceScore,
        frictionScore,
        persuasionDensity,
    });
    const integratedRecommendation = deriveIntegratedRecommendation({
        qualityVerdict,
        confidenceScore,
        frictionScore,
        persuasionDensity,
        failureReasons,
        fixPriorities,
        stressLabRows,
        mustKeepConstraints,
        mustAvoidConstraints,
        marketPulseData,
        marketPulseBelowThreshold,
        marketPulseFallback,
        extraction,
        dossier,
        blueprintData,
        decisionLogEntries,
    });
    const marketPulseInterpretation = marketPulseData
        ? marketPulseBelowThreshold
            ? `This route has signal, but category context is still directional at ${marketPulseData.assetCount}/20 sampled assets. Use the read to guide action, not overclaim precision.`
            : `Current category pressure suggests ${marketPulseData.category_persuasion_benchmark.your_rank.toLowerCase()} standing. Protect the working mechanic, then differentiate execution rather than rebuilding from zero.`
        : marketPulseFallback.interpretation;
    const marketPulseTrustLabel = marketPulseData
        ? marketPulseBelowThreshold
            ? 'Directional estimate'
            : 'Live benchmark'
        : marketPulseFallback.confidenceLabel;
    const primaryStressTest = stressLabRows.find((row) => row.recommendation === 'Test') || stressLabRows[0];
    const strongestSocialPlatform = [...socialContext.platformScores].sort((a, b) => b.score - a.score)[0];
    const socialRiskCount = socialContext.riskFlags.length;
    const criticalConstraintCount = mustKeepConstraints.filter((item) => item.severity === 'critical').length;
    const avoidConstraintCount = mustAvoidConstraints.length;
    const safeAdaptationCount = safeAdaptationZone.length;
    const stressTestCount = stressLabRows.filter((row) => row.recommendation === 'Test').length;
    const blueprintStatusLabel = blueprintData ? 'Trace Ready' : 'Offline';
    const decisionLogStatus = decisionLogEntries.length > 0 ? `${decisionLogEntries.length} Logged` : 'No Entries';
    const decisionSummaryTimestamp = new Date().toLocaleString('en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
    const assetLabel = asset.brand?.name
        ? `${asset.brand.name} · ${asset.id}`
        : asset.id;
    const decisionSummaryText = [
        '## Integrated Recommendation',
        `${integratedRecommendation.thesis} ${integratedRecommendation.whyNow} ${integratedRecommendation.riskRewardTension}`.trim(),
        '',
        `**Asset:** ${assetLabel}`,
        `**Timestamp:** ${decisionSummaryTimestamp}`,
        '',
        `**Decision:** ${integratedRecommendation.decision}`,
        `**Rationale:** ${integratedRecommendation.rationale}`,
        '**Execution Next 3:**',
        ...integratedRecommendation.executionNext3.map((step, index) => `${index + 1}. ${step}`),
        '',
        `**P1 Fix:** ${fixPriorities[0]?.detail || 'No priority fix recorded.'}`,
        `**P2 Fix:** ${fixPriorities[1]?.detail || 'No secondary fix recorded.'}`,
        `**P3 Fix:** ${fixPriorities[2]?.detail || 'No tertiary fix recorded.'}`,
        '',
        `**Must Keep:** ${mustKeepConstraints.map((item) => item.text).join(' | ') || 'None recorded.'}`,
        `**Must Avoid:** ${mustAvoidConstraints.map((item) => item.text).join(' | ') || 'None recorded.'}`,
        `**Suggested Next Test:** ${primaryStressTest ? `${primaryStressTest.variable} -> ${primaryStressTest.proposedShift}` : 'No next test recorded.'}`,
        `**Market Pulse:** ${marketPulseInterpretation}`,
        '',
        `**Watchouts:** ${integratedRecommendation.watchouts}`,
        `**Fallback:** ${integratedRecommendation.fallback}`,
        '',
        `**Confidence:** ${integratedRecommendation.confidence}`,
        `**Evidence Strength:** ${integratedRecommendation.evidenceStrength}`,
        `**Assumption Load:** ${integratedRecommendation.assumptionLoad}`,
        `**Known Unknowns:** ${integratedRecommendation.knownUnknowns.join(' ')}`,
        '',
        '**Facts:**',
        ...integratedRecommendation.facts.map((fact, index) => `${index + 1}. ${fact}`),
        '',
        '**Inferences:**',
        ...integratedRecommendation.inferences.map((inference, index) => `${index + 1}. ${inference}`),
    ].join('\n');
    const decisionLogStorageKey = `vd_decision_log_${asset.id}`;
    
    // Some pipelines can emit `visual_style` as stringified JSON (or embed the value in an object).
    // Keep this resilient: if the shape changes, the UI should degrade gracefully.
    let parsedStyle: string | undefined = extraction?.visual_style;
    if (typeof parsedStyle === 'string') {
        const trimmed = parsedStyle.trim();
        const maybeJson =
            (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
            (trimmed.startsWith('[') && trimmed.endsWith(']'));
        if (maybeJson) {
            try {
                const decoded = JSON.parse(trimmed) as any;
                if (typeof decoded === 'string') parsedStyle = decoded;
                else if (decoded && typeof decoded === 'object') {
                    parsedStyle =
                        decoded.style ||
                        decoded.visual_style ||
                        decoded.summary ||
                        decoded.visualLogic ||
                        parsedStyle;
                }
            } catch {
                // Keep the raw string.
            }
        }
    }

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
        try {
            const stored = window.localStorage.getItem(decisionLogStorageKey);
            if (!stored) {
                setDecisionLogEntries([]);
                return;
            }

            const parsed = JSON.parse(stored) as DecisionLogEntry[];
            setDecisionLogEntries(Array.isArray(parsed) ? parsed : []);
        } catch {
            setDecisionLogEntries([]);
        }
    }, [decisionLogStorageKey]);

    useEffect(() => {
        window.localStorage.setItem(decisionLogStorageKey, JSON.stringify(decisionLogEntries));
    }, [decisionLogEntries, decisionLogStorageKey]);

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
        if (sampleMode && activeTab === 'MARKET PULSE') {
            setActiveTab('INTELLIGENCE');
        }
    }, [activeTab, sampleMode]);

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

    const handleLogDecision = () => {
        const nextEntry: DecisionLogEntry = {
            id: `${asset.id}-${Date.now()}`,
            timestamp: new Date().toISOString(),
            verdict: qualityVerdict,
            confidence: confidenceScore,
            rationale: integratedRecommendation.rationale,
            p1Fix: fixPriorities[0]?.detail || 'No priority fix recorded.',
            teamNote: decisionNote.trim() || undefined,
        };

        setDecisionLogEntries((current) => [nextEntry, ...current]);
        setDecisionNote('');
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

                .vault-analysis-shell {
                    --vault-max-width: 100%;
                    --vault-content-pad-x: clamp(12px, 1.6vw, 24px);
                    --analysis-right-max: 100%;
                    --analysis-text-measure: 72ch;
                    max-width: var(--vault-max-width);
                    margin-inline: auto;
                    padding-inline: var(--vault-content-pad-x);
                }

                .vault-analysis-frame {
                    min-height: 100vh;
                    width: 100%;
                }

                .vault-analysis-content-inner {
                    width: 100%;
                }

                .vault-analysis-content-inner p,
                .vault-analysis-content-inner li {
                    max-width: var(--analysis-text-measure);
                }

                .vault-analysis-tabbar {
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .vault-analysis-tabbar::-webkit-scrollbar {
                    display: none;
                }

                @media (min-width: 768px) {
                    .vault-analysis-tabbar {
                        overflow: visible;
                    }
                }

                @media (min-width: 1024px) {
                    .vault-analysis-frame {
                        display: block;
                    }
                }

                @media (min-width: 1920px) {
                    .vault-analysis-shell {
                        --vault-content-pad-x: clamp(24px, 2.6vw, 40px);
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
                            <h1 className="mt-12 text-center text-3xl font-light uppercase tracking-[0.24em] leading-[1.18]">
                                <span className="block">Forensic</span>
                                <span className="block">Intelligence</span>
                                <span className="block">Dossier</span>
                            </h1>
                            <div className="mt-8 h-px w-full" style={{ backgroundColor: accentHex }} />
                            <div className="mt-10 max-w-[60%] overflow-hidden border border-[#D4A574]/16 p-3">
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
                                            <div key={label} className="border-t border-[#D4A574]/16 pt-4 first:border-t-0 first:pt-0">
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
                                <div className="mt-4 flex flex-col gap-3">
                                    {(extraction?.color_palette || []).map((hex: string, index: number) => (
                                        <div key={`${hex}-${index}`} className="flex items-center gap-2 border px-3 py-2" style={{ borderColor: accentHex }}>
                                            <span className="h-4 w-4 border border-[#D4A574]/16" style={{ backgroundColor: hex }} />
                                            <span className="text-[11px] font-mono">{hex}</span>
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
                                    {Object.entries((dossier?.archetype_mapping as any)?.trigger_distribution || {}).map(([label, value]: [string, any]) => (
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

            <div className="relative screen-layout w-full min-h-screen bg-[#FBFBF6] text-[#141414] selection:bg-[#C1A674] selection:text-white">
                <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]" />
                <div className="relative z-10 vault-analysis-shell min-h-screen w-full">
                    <div className="min-h-screen w-full shadow-sm">
                    {sampleMode && (
                        <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-[#D4A574]/15 bg-[#FBFBF6]/96 px-5 py-4 backdrop-blur-md md:px-8">
                            <a href="/" className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513]">
                                Visual Decompiler
                            </a>
                            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1A1A1A]/48">
                                Sample Dossier
                            </span>
                            <a
                                href="/ingest"
                                className="inline-flex items-center rounded-full bg-[#1a1a1a] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#faf7f2] transition-colors hover:bg-[#2a2a2a]"
                            >
                                Start Free
                            </a>
                        </div>
                    )}
                    <div ref={assetContextTopRef} className="vault-analysis-frame scroll-mt-[250px] md:scroll-mt-[210px]">
                    {/* Top Workspace Navigation */}
                    <div className={`vault-analysis-tabbar sticky ${sampleMode ? 'top-[65px]' : 'top-0'} z-30 bg-transparent px-[clamp(12px,1.6vw,24px)] pt-4 pb-4 md:pt-6`}>
                        <div className="mx-auto max-w-[100%] rounded-2xl border border-black/5 bg-[#FCFBF9]/96 p-2 shadow-sm backdrop-blur-xl md:p-3">
                            <div className="relative md:hidden">
                                <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    {tabPhaseGroups.map((phase) => (
                                        <div key={phase.label} className="min-w-max rounded-xl border border-black/5 bg-white/70 p-2">
                                            <p className="px-2 pb-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#8B6A3D]/70">{phase.label}</p>
                                            <div className="flex gap-1">
                                                {phase.tabs.map((tab) => (
                                                    <button
                                                        key={tab}
                                                        type="button"
                                                        onClick={() => handleTabChange(tab)}
                                                        aria-current={activeTab === tab ? 'page' : undefined}
                                                        className={`inline-flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] leading-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A574]/25 ${
                                                            activeTab === tab
                                                                ? 'bg-[#1A1A1A] text-white shadow-sm'
                                                                : 'bg-transparent text-[#1A1A1A]/35 hover:bg-black/5 hover:text-[#1A1A1A]'
                                                        }`}
                                                    >
                                                        {DOSSIER_TAB_LABELS[tab]}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                                    {tabPhaseGroups.map((phase) => (
                                        <div key={phase.label} className="rounded-xl border border-black/5 bg-white/70 p-2">
                                            <p className="px-2 pb-2 text-[9px] font-bold uppercase tracking-[0.26em] text-[#8B6A3D]/70">{phase.label}</p>
                                            <div className={`grid gap-1 ${phase.tabs.length === 2 ? 'grid-cols-2' : phase.tabs.length === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                                {phase.tabs.map((tab) => (
                                                    <button
                                                        key={tab}
                                                        type="button"
                                                        onClick={() => handleTabChange(tab)}
                                                        aria-current={activeTab === tab ? 'page' : undefined}
                                                        className={`inline-flex min-h-[38px] w-full items-center justify-center rounded-lg px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.18em] leading-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 xl:text-[10px] ${
                                                            activeTab === tab
                                                                ? 'bg-[#1A1A1A] text-white shadow-sm'
                                                                : 'bg-transparent text-[#1A1A1A]/34 hover:bg-black/5 hover:text-[#1A1A1A]'
                                                        }`}
                                                    >
                                                        {DOSSIER_TAB_LABELS[tab]}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div
                        ref={tabContentTopRef}
                        className="scroll-mt-[250px] px-[clamp(12px,1.6vw,24px)] md:scroll-mt-[210px] pb-24 lg:pb-32"
                    >
                        {(() => {
                            switch (activeTab) {
                                case 'ASSET CONTEXT':
                                    return (
                                        <AssetContextTab
                                            asset={asset}
                                            extraction={extraction}
                                            dossier={dossier}
                                            integratedRecommendation={integratedRecommendation}
                                            failureReasons={failureReasons}
                                            fixPriorities={fixPriorities}
                                            isExecutiveSummary={isExecutiveSummary}
                                            setIsExecutiveSummary={setIsExecutiveSummary}
                                            agency={agency}
                                            firstFrameUrl={firstFrameUrl}
                                        />
                                    );
                                case 'INTELLIGENCE':
                                    return (
                                        <IntelligenceTab
                                            dossier={dossier}
                                            analysisLanguage={analysisLanguage}
                                            sampleMode={sampleMode}
                                            dossierCampaignBrand={dossierCampaignBrand}
                                            dossierCampaignCode={dossierCampaignCode}
                                            dossierPreparedFor={dossierPreparedFor}
                                            dossierModeLabel={dossierModeLabel}
                                            dossierReportDate={dossierReportDate}
                                            supportingCopyPath={supportingCopyPath}
                                            structuralSummary={structuralSummary}
                                            confidenceRationale={confidenceRationale}
                                        />
                                    );
                                case 'QUALITY GATE':
                                    return (
                                        <QualityGateTab
                                            asset={asset}
                                            extraction={extraction}
                                            agency={agency}
                                            integratedRecommendation={integratedRecommendation}
                                            analysisLanguage={analysisLanguage}
                                            sampleMode={sampleMode}
                                            dossierCampaignBrand={dossierCampaignBrand}
                                            dossierCampaignCode={dossierCampaignCode}
                                            dossierPreparedFor={dossierPreparedFor}
                                            dossierModeLabel={dossierModeLabel}
                                            dossierReportDate={dossierReportDate}
                                            supportingCopyPath={supportingCopyPath}
                                            structuralSummary={structuralSummary}
                                            persuasionDensity={persuasionDensity}
                                            frictionScore={frictionScore}
                                        />
                                    );
                                case 'SIGNALS':
                                    return (
                                        <SignalsTab
                                            dossier={dossier}
                                            extraction={extraction}
                                            analysisLanguage={analysisLanguage}
                                            signalByLabel={signalByLabel}
                                            scoreByLabel={scoreByLabel}
                                            showRadiant={showRadiant}
                                            setShowRadiant={setShowRadiant}
                                        />
                                    );
                                case 'SOCIAL CONTEXT':
                                    return (
                                        <SocialContextTab
                                            socialContext={socialContext}
                                            strongestSocialPlatform={strongestSocialPlatform}
                                            socialRiskCount={socialRiskCount}
                                        />
                                    );
                                case 'CONTENT SYSTEM CONTEXT':
                                    return (
                                        <ContentSystemContextTab
                                            contentSystemContext={contentSystemContext}
                                        />
                                    );
                                case 'CONSTRAINT MAP':
                                    return (
                                        <ConstraintMapTab
                                            mustKeepConstraints={mustKeepConstraints}
                                            mustAvoidConstraints={mustAvoidConstraints}
                                            safeAdaptationZone={safeAdaptationZone}
                                            criticalConstraintCount={criticalConstraintCount}
                                            avoidConstraintCount={avoidConstraintCount}
                                            safeAdaptationCount={safeAdaptationCount}
                                        />
                                    );
                                case 'MARKET PULSE':
                                    return (
                                        <MarketPulseTab
                                            isSovereign={isSovereign}
                                            marketPulseData={marketPulseData}
                                            marketPulseInterpretation={marketPulseInterpretation}
                                            marketPulseTrustLabel={marketPulseTrustLabel}
                                            marketPulseBelowThreshold={marketPulseBelowThreshold}
                                            marketPulseFallback={marketPulseFallback}
                                            integratedRecommendation={integratedRecommendation}
                                        />
                                    );
                                case 'PSYCHOLOGY':
                                    return (
                                        <PsychologyTab
                                            dossier={dossier}
                                            extraction={extraction}
                                            analysisLanguage={analysisLanguage}
                                            persuasionDensity={persuasionDensity ?? 0}
                                            frictionScore={frictionScore ?? 0}
                                            scoreByLabel={scoreByLabel}
                                        />
                                    );
                                case 'BLUEPRINT':
                                    return (
                                        <BlueprintTab
                                            extraction={extraction}
                                            blueprintData={blueprintData}
                                            blueprintStatusLabel={blueprintStatusLabel}
                                            isGeneratingBlueprint={isGeneratingBlueprint}
                                            blueprintStep={blueprintStep}
                                            blueprintProgress={blueprintProgress}
                                            handleGenerateBlueprint={handleGenerateBlueprint}
                                        />
                                    );
                                case 'STRESS LAB':
                                    return (
                                        <StressLabTab
                                            integratedRecommendation={integratedRecommendation}
                                            stressLabRows={stressLabRows}
                                            primaryStressTest={primaryStressTest}
                                            stressTestCount={stressTestCount}
                                            blueprintData={blueprintData}
                                            dossier={dossier}
                                        />
                                    );
                                case 'DECISION LOG':
                                    return (
                                        <DecisionLogTab
                                            decisionLogEntries={decisionLogEntries}
                                            extraction={extraction}
                                            handleClearDecisionLog={() => setDecisionLogEntries([])}
                                            decisionSummaryText={decisionSummaryText}
                                            decisionSummaryTimestamp={decisionSummaryTimestamp}
                                            integratedRecommendation={integratedRecommendation}
                                            decisionVerdict={decisionVerdict ?? ''}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })()}


                    </div>
                </div>
            </div>
            </div>
            </div>

            {showCloneDrawer && (
                <div className="fixed inset-0 z-[80] no-print">
                    <div
                        className="absolute inset-0 bg-white backdrop-blur-md"
                        onClick={() => setShowCloneDrawer(false)}
                    />
                    <div className="absolute inset-y-0 right-0 w-full max-w-3xl overflow-y-auto border-l border-[#d4c9b8] bg-[#ECE4D6] text-[#1a1a1a] shadow-2xl">
                        <div className="sticky top-0 z-10 border-b border-[#D4A574]/16 bg-[#ECE4D6]/95 px-8 py-10 backdrop-blur-xl md:px-12">
	                            <div className="flex items-start justify-between gap-8">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D4A574] font-mono">Clone Engine // Vault_Transfer</p>
                                    <h2 className="mt-6 text-[32px] font-semibold uppercase tracking-tightest leading-[1.1] text-[#1a1a1a] md:text-[42px]">
                                        {cloneIntroLead || 'DNA EXTRACTION'}
                                    </h2>
                                    <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-[#666] font-medium uppercase tracking-tight">
                                        {cloneIntroRemainder ? `${cloneIntroRemainder} ` : ''}
                                        {cloneIntroBody || 'Generate five original campaign concepts that preserve the persuasion architecture.'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowCloneDrawer(false)}
                                    className="shrink-0 border border-[#D4A574]/30 bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#666] transition-all hover:border-[#D4A574]/50 hover:text-[#1a1a1a] font-mono"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>

                        <div className="px-8 py-12 md:px-12">
                            <div className="rounded-2xl border border-[#D4A574]/16 bg-[#FBF7EF] p-10 shadow-2xl">
	                                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] font-mono mb-4">Source Asset // Forensic Read</p>
                                        <p className="text-3xl font-semibold uppercase tracking-tightest text-[#1a1a1a] leading-none">{asset?.brand?.name || 'Unknown'}</p>
                                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#aaa] font-mono">{asset?.brand?.market_sector || 'General'}</p>
                                    </div>
                                    <button
                                        onClick={() => void handleGenerateClone()}
                                        disabled={isGeneratingClone}
                                        className="h-16 shrink-0 bg-[#D4A574] px-10 text-[11px] font-semibold uppercase tracking-[0.4em] text-black shadow-[0_0_15px_rgba(212,165,116,0.2)] transition-all hover:bg-white hover:scale-105 active:scale-95 disabled:opacity-50"
                                    >
                                        {isGeneratingClone ? 'EXTRACTING DNA...' : cloneData ? 'REGENERATE TRACES' : 'INITIATE CLONE'}
                                    </button>
                                </div>
                                {cloneError && (
                                    <p className="mt-8 border border-red-500/30 bg-red-500/5 px-6 py-4 text-[12px] font-semibold uppercase tracking-widest text-red-400">
                                        {cloneError}
                                    </p>
                                )}
                                {isGeneratingClone && (
                                    <div className="mt-12 rounded-2xl border border-[#D4A574]/16 bg-[#FBF7EF] p-8">
                                        <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-6 font-mono">
                                            <span>{CLONE_STEPS[cloneStep]}</span>
                                            <span>{cloneProgress}%</span>
                                        </div>
                                        <div className="h-0.5 w-full bg-white">
                                            <div
                                                className="h-full bg-[#D4A574] shadow-[0_0_10px_rgba(212,165,116,0.25)] transition-all duration-700"
                                                style={{ width: `${cloneProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {cloneData ? (
	                                <div className="mt-12 space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-2xl border border-[#8B6A3D]/8 bg-[#151310] p-8">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] font-mono mb-4 border-b border-[#e8ddd0] pb-3">Extracted Mechanism</p>
                                            <p className="text-[14px] leading-relaxed text-[#444] uppercase font-bold font-mono">{cloneData?.extracted_mechanism}</p>
                                        </div>
                                        <div className="rounded-2xl border border-[#8B6A3D]/8 bg-[#151310] p-8">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] font-mono mb-4 border-b border-[#e8ddd0] pb-3">Deployment Principle</p>
                                            <p className="text-[14px] leading-relaxed text-[#444] uppercase font-bold font-mono">{cloneData?.deployment_principle}</p>
                                        </div>
                                    </div>

	                                    <div className="space-y-6">
                                        {(cloneData?.concepts || []).map((concept, index) => (
                                            <article key={`${concept.title}-${index}`} className="rounded-2xl border border-[#D4A574]/16 bg-[#FBF7EF] p-10 shadow-2xl transition-all hover:bg-white/[0.07]">
                                                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-8">
                                                    <div>
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D4A574] font-mono mb-4">
                                                            Route Phase // {(concept.concept_id || index + 1).toString().padStart(2, '0')}
                                                        </p>
                                                        <h3 className="text-[32px] font-semibold uppercase tracking-tightest text-[#1a1a1a] leading-none">{concept.title}</h3>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <span className="border border-[#8B6A3D]/38 bg-[#D4A574]/10 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] font-mono">
                                                            {concept.hook_type}
                                                        </span>
                                                        <span className="border border-[#d4c9b8] px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#999] font-mono">
                                                            {concept.production_complexity}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-[16px] leading-[1.3] text-[#444] font-semibold uppercase tracking-tight mb-10 border-b border-[#e8ddd0] pb-8">{concept.logline}</p>

                                                <div className="grid gap-4 md:grid-cols-2">
                                                    {[
                                                        { label: 'Scene Reconstruction', value: concept.scene },
                                                        { label: 'Psychology // Active', value: concept.psychological_mechanism },
                                                        { label: 'Copy Spine', value: concept.copy_direction },
                                                        { label: 'Technical // Visual', value: concept.casting_direction },
                                                    ].map((item) => (
                                                        <div key={item.label} className="border border-[#e8ddd0] bg-white p-6">
                                                            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-4 font-mono">{item.label}</p>
                                                            <p className="text-[13px] leading-relaxed text-[#666] uppercase font-medium font-mono">{item.value}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-8 rounded-2xl border border-[#8B6A3D]/8 bg-[#151310] p-8">
                                                    <div className="flex items-center justify-between gap-4 mb-6 border-b border-[#D4A574]/16 pb-4">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] font-mono">Handoff DNA Prompt</p>
                                                        <button
                                                            onClick={() => void handleCopyPrompt(concept.dna_prompt, index)}
                                                            className="flex items-center gap-2 border border-[#D4A574]/40 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] hover:bg-[#D4A574] hover:text-black transition-all font-mono"
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                            {copiedPromptIndex === index ? 'COPIED' : 'COPY'}
                                                        </button>
                                                    </div>
                                                    <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#aaa] font-mono selection:bg-[#C9A96E]/30">
                                                        {concept.dna_prompt}
                                                    </pre>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-12 border border-dashed border-[#d4c9b8] bg-white/[0.02] p-24 text-center">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.6em] text-[#aaa] font-mono">Engine Standby</p>
                                    <p className="mt-6 max-w-md mx-auto text-[14px] leading-relaxed text-[#999] font-medium uppercase tracking-tight">
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
