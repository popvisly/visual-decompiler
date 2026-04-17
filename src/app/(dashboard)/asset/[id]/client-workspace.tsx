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
import DossierDecisionSummary from '@/components/DossierDecisionSummary';
import WorkspaceTabHeader from '@/components/WorkspaceTabHeader';


type CountUpPercentProps = {
    value: number | null | undefined;
    className?: string;
    decimals?: 0 | 1 | 2;
    delayMs?: number;
};

function CountUpPercent({ value, className, decimals = 0, delayMs = 200 }: CountUpPercentProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const startedRef = useRef(false);

    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, { stiffness: 70, damping: 18, mass: 0.7 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        return spring.on('change', (latest) => {
            const next = decimals === 0 ? Math.round(latest) : decimals == 1 ? Math.round(latest * 10) / 10 : Math.round(latest * 100) / 100;
            setDisplay(next);
        });
    }, [spring, decimals]);

    useEffect(() => {
        if (!inView) return;
        if (startedRef.current) return;
        if (typeof value !== 'number' || !Number.isFinite(value)) return;

        startedRef.current = true;
        const target = Math.max(0, Math.min(100, value));

        // Small delay so the card settles before the number runs.
        const t = setTimeout(() => {
            motionValue.set(0);
            motionValue.set(target);
        }, delayMs);

        return () => clearTimeout(t);
    }, [inView, value, delayMs, motionValue]);

    return (
        <span ref={ref} className={className}>
            {typeof value === 'number' && Number.isFinite(value) ? display : '—'}
        </span>
    );
}

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
    | 'QUALITY GATE'
    | 'INTELLIGENCE'
    | 'SIGNALS'
    | 'PSYCHOLOGY'
    | 'CONSTRAINT MAP'
    | 'BLUEPRINT'
    | 'STRESS LAB'
    | 'MARKET PULSE'
    | 'DECISION LOG';

const FULL_DOSSIER_TABS: readonly DossierTab[] = [
    'QUALITY GATE',
    'INTELLIGENCE',
    'SIGNALS',
    'PSYCHOLOGY',
    'CONSTRAINT MAP',
    'BLUEPRINT',
    'STRESS LAB',
    'MARKET PULSE',
    'DECISION LOG',
] as const;

const SAMPLE_DOSSIER_TABS: readonly DossierTab[] = [
    'QUALITY GATE',
    'INTELLIGENCE',
    'SIGNALS',
    'PSYCHOLOGY',
    'CONSTRAINT MAP',
    'BLUEPRINT',
] as const;

const DOSSIER_TAB_LABELS: Record<DossierTab, string> = {
    'QUALITY GATE': 'QUALITY GATE',
    'INTELLIGENCE': 'INTELLIGENCE',
    'SIGNALS': 'MECHANICS',
    'PSYCHOLOGY': 'PSYCHOLOGY',
    'CONSTRAINT MAP': 'CONSTRAINT MAP',
    'BLUEPRINT': 'BLUEPRINT TRACE',
    'STRESS LAB': 'STRESS LAB',
    'MARKET PULSE': 'MARKET PULSE',
    'DECISION LOG': 'DECISION LOG',
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
            title: colonMatch[1].trim(),
            body: colonMatch[2].trim() || text,
        };
    }

    const cleaned = text.replace(/["']/g, '').replace(/\s+/g, ' ').trim();
    const words = cleaned.split(' ').filter(Boolean);
    const title = words.slice(0, 4).join(' ') || `Constraint ${String(index).padStart(2, '0')}`;

    return {
        title,
        body: text,
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

const ANALYSIS_CARD_CLASS =
    'border border-[#E6DDCF] bg-[#FFFCF7] rounded-3xl p-[clamp(16px,1.2vw,24px)] shadow-[0_4px_16px_rgba(0,0,0,0.02)]';

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
                <Info className={`w-3.5 h-3.5 ${isOpen ? 'text-[#D4A574]' : 'text-[#D4A574]/55 group-hover:text-[#D4A574]'}`} />
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
        <div className={`relative my-5 h-24 w-full transition-all duration-700 ${isActive ? 'opacity-100 scale-[1.02]' : 'opacity-40 group-hover/block:opacity-80'}`}>
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
                <div className="rounded-[2.75rem] border border-[rgba(255,255,255,0.08)] bg-[#1A1A1A] p-8 text-[#F3F1ED] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                    <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                        <h3 className="text-[12px] font-semibold uppercase tracking-[0.45em] text-[#D4A574]">{title}</h3>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6D0C6]/55">Forensic Map v2.0</span>
                    </div>

                    {/* Overture */}
                    {overture && (
                        <div className="max-h-[400px] overflow-y-auto">
                            <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70">
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
                            className={`rounded-3xl border p-6 flex flex-col ${
                                type === 'ACT'
                                    ? 'forensic-act-block min-h-[240px] xl:min-h-[280px] scroll-mt-24'
                                    : 'min-h-[180px] xl:min-h-[210px]'
                            } ${
                                type === 'ACT' && activeAct === block.label
                                    ? 'border-[#D4A574]/35 bg-[#1A1A1A]'
                                    : 'border-[rgba(255,255,255,0.08)] bg-[#1A1A1A]'
                            }`}
                        >
                            {type === 'ACT' ? (
                                <>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`w-2 h-2 rounded-full transition-all ${activeAct === block.label ? 'bg-[#D4A882] shadow-[0_0_14px_rgba(212,168,130,0.45)]' : 'bg-[#D4A882]/75'}`} />
                                        <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4A882]">{block.label}</span>
                                    </div>
                                    <h3 className="border-b border-white/10 pb-4 text-[2rem] font-semibold uppercase tracking-tightest text-[#F3F1ED] md:text-[2.5rem]">
                                        {block.title}
                                    </h3>
                                    <AnalyticWaveMap index={i} isActive={activeAct === block.label} />
                                    <div className="flex-1 pt-1">
                                        <div className="max-w-[78ch] space-y-4">
                                            {block.text.split('\n').filter(p => p.trim()).map((paragraph, pi) => (
                                                <p key={pi} className="text-[15px] font-light leading-8 text-[#D6D0C6]">
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
                                    <h3 className="border-b border-white/10 pb-5 text-[1.75rem] font-semibold uppercase tracking-tightest text-[#F3F1ED] md:text-[2rem]">
                                        {block.title}
                                    </h3>
                                    <div className="flex-1 pt-6">
                                        <div className="max-w-[78ch] space-y-4">
                                            {block.text.split('\n').filter(p => p.trim()).map((paragraph, pi) => (
                                                <p key={pi} className="text-[15px] font-light leading-9 text-[#D6D0C6]">
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
                    className="px-10 py-4 bg-[#FFFCF7] text-[#151310] text-[10px] font-bold uppercase tracking-widest hover:bg-[#8B4513] transition-all rounded-full"
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
                            <span className="ml-auto text-[8px] font-mono text-[#D4A574]/55 tracking-widest">ANALYSED</span>
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
                <div className="flex justify-between text-[8px] font-mono text-[#1a1a1a]/30 pt-1 uppercase tracking-widest">
                    <span>Init</span>
                    <span>{progress}%</span>
                    <span>Complete</span>
                </div>
            </div>

            {/* Return to Library */}
            <div className="mt-12 flex flex-col items-center gap-6">
                <a
                    href="/vault"
                    className="px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/50 border border-[#E5E5E1] hover:bg-white hover:text-[#D4A574] transition-all"
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
    agency,
    sampleMode = false,
}: {
    initialAsset: WorkspaceAsset,
    isSovereign: boolean,
    agency: any,
    sampleMode?: boolean,
}) {
    const [asset, setAsset] = useState(initialAsset);
    const [activeTab, setActiveTab] = useState<DossierTab>('QUALITY GATE');
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

    // Normalize extraction payload (V1 array vs V2 object)
    const extraction = Array.isArray(asset.extraction) ? asset.extraction[0] : asset.extraction;
    const dossier = extraction?.full_dossier as any;
    const cloneIntroSource = cloneData?.extracted_mechanism || extraction?.primary_mechanic || 'Creative DNA Extraction';
    const cloneIntroBody = cloneData?.deployment_principle || 'Generate five original campaign concepts that preserve the persuasion architecture while shifting the aesthetic, scene, and execution language.';
    const { lead: cloneIntroLead, remainder: cloneIntroRemainder } = splitLeadSentence(cloneIntroSource);
    const marketPulseBelowThreshold = (marketPulseData?.assetCount ?? 0) > 0 && (marketPulseData?.assetCount ?? 0) < 20;
    const dossierTabs = sampleMode ? SAMPLE_DOSSIER_TABS : FULL_DOSSIER_TABS;
		type PrimaryNavTab = Extract<DossierTab, 'QUALITY GATE' | 'INTELLIGENCE' | 'SIGNALS' | 'PSYCHOLOGY'>;
		const isPrimaryNavTab = (tab: DossierTab): tab is PrimaryNavTab =>
			tab === 'QUALITY GATE' || tab === 'INTELLIGENCE' || tab === 'SIGNALS' || tab === 'PSYCHOLOGY';
		const primaryNavTabs = dossierTabs.filter(isPrimaryNavTab);
		const secondaryNavTabs = dossierTabs.filter((tab) => !isPrimaryNavTab(tab));
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
    const dossierCampaignName = asset.brand?.name
        ? `${asset.brand.name} — ${asset.id.toUpperCase().slice(0, 8)}`
        : `Campaign — ${asset.id.toUpperCase().slice(0, 8)}`;
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
                    --vault-max-width: 1680px;
                    --vault-content-pad-x: clamp(12px, 1.6vw, 24px);
                    --analysis-right-max: 1120px;
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
                    max-width: var(--analysis-right-max);
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
                        display: grid;
                        grid-template-columns: minmax(360px, 520px) minmax(640px, 1fr);
                        align-items: start;
                    }

                    .vault-analysis-asset-rail {
                        width: 100%;
                    }

                    .vault-analysis-content-rail {
                        width: 100%;
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
                                <div className="mt-4 flex flex-col gap-3">
                                    {(extraction?.color_palette || []).map((hex: string, index: number) => (
                                        <div key={`${hex}-${index}`} className="flex items-center gap-2 border px-3 py-2" style={{ borderColor: accentHex }}>
                                            <span className="h-4 w-4 border border-[#E7DED1]" style={{ backgroundColor: hex }} />
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

            <div className={`screen-layout w-full min-h-screen ${sampleMode ? 'bg-[#F6F1E7] selection:bg-[#C1A674] selection:text-[#141414]' : 'bg-[#faf7f2] selection:bg-[#D4A574] selection:text-white'}`}>
                <div className={`vault-analysis-shell min-h-screen w-full ${sampleMode ? 'bg-[#F6F1E7] text-[#141414]' : 'bg-[#faf7f2] text-[#1a1a1a]'}`}>
                    <div className={`min-h-screen w-full ${sampleMode ? 'bg-[#F6F1E7] shadow-sm' : 'bg-[#faf7f2] shadow-sm'} ${sampleMode ? 'text-[#141414]' : 'text-[#1a1a1a]'}`}>
                    {sampleMode && (
                        <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-[#D4A574]/15 bg-[#F6F1E7]/96 px-5 py-4 backdrop-blur-md md:px-8">
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
                                Start Decompiling Free
                            </a>
                        </div>
                    )}
                    <div className="vault-analysis-frame">

                    {/* LEFT COLUMN: Sticky Media Viewer (45%) */}
                    <aside className={`vault-analysis-asset-rail w-full border-r ${sampleMode ? 'border-[#D4A574]/20' : 'border-[#E7DED1]'} relative ${sampleMode ? 'bg-[#F6F1E7]' : 'bg-[#faf7f2]'} lg:sticky ${sampleMode ? 'lg:top-[66px]' : 'lg:top-0'} z-10`}>
                        <div className="flex flex-col items-center justify-center px-[clamp(12px,1.6vw,24px)] pt-10 pb-8 lg:pt-20">

                            <div 
                                className={`w-full max-w-[390px] aspect-[4/5] relative flex items-center justify-center overflow-hidden rounded-[3rem] border border-[#E7DED1] bg-[#FBF7EF] group shadow-2xl transition-all duration-1000 ${activeTab === 'SIGNALS' && showRadiant ? 'brightness-75' : ''}`}
                                style={getAssetStyle()}
                            >
                                {/* Grid HUD Texture */}
                                <div className={`absolute inset-0 pointer-events-none z-[2] ${sampleMode ? '' : ''}`} />

                                {/* If multiple images, render a horizontal CSS scroll snap setup */}
                                <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide z-[1]">
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
                                    <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-3xl px-4 py-2 flex gap-3 z-[10] ${sampleMode ? 'bg-white border border-[#d4c9b8]' : 'bg-white/90 backdrop-blur-sm border border-[#d4c9b8]'}`}>
                                        {fileUrls.map((_, i) => (
                                            <div key={i} className={`w-1.5 h-1.5 ${sampleMode ? 'bg-[#D4A574]/50' : 'bg-[#D4A574]/20'}`} />
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'SIGNALS' && showRadiant && <RadiantArchitectureOverlay data={(extraction?.full_dossier as any)?.radiant_architecture} />}
                                {asset.type !== 'STATIC' && (
                                    <div className={`absolute top-6 left-6 ${sampleMode ? 'bg-white/90 border-[#d4c9b8]' : 'bg-white border border-[#D4A574]/40'} backdrop-blur-md z-[10]`}>
                                        <span className={`text-[10px] font-semibold uppercase tracking-[0.4em] ${sampleMode ? 'text-[#D4A574]' : 'text-[#D4A574]'}`}>{asset.type}</span>
                                    </div>
                                )}
                            </div>

                            <div className={`w-full max-w-[390px] mt-12 ${sampleMode ? '' : 'border-b border-[#E7DED1]'} pb-8`}>
                                <div className="mb-6">
                                    <h1 className={`text-[5vw] lg:text-[4vw] font-semibold tracking-tightest leading-none uppercase mb-2 ${sampleMode ? 'text-[#D4A574]' : 'text-[#1a1a1a]'}`}>{asset.brand?.name}</h1>
                                    <span className={`text-[12px] font-semibold uppercase tracking-[0.5em] ${sampleMode ? 'text-[#D4A574]' : 'text-[#D4A574]'}`}>{asset.brand?.market_sector}</span>
                                </div>
                                {sampleMode ? (
                                    <div className="rounded-[1.5rem] border border-[#D4A574]/18 bg-[#1a1a1a] px-5 py-5 text-[#faf7f2]">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Sample access</p>
                                        <p className="mt-3 text-[13px] leading-relaxed text-[#faf7f2]/78">This is a live sample dossier.</p>
                                        <p className="mt-2 text-[13px] leading-relaxed text-[#faf7f2]/62">Create your own in under 60 seconds.</p>
                                        <a
                                            href="/ingest"
                                            className="mt-5 inline-flex items-center rounded-full bg-[#D4A574] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#141414] transition-colors hover:bg-[#c8955b]"
                                        >
                                            Start Decompiling Free
                                        </a>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6">
                                            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-3">System Guidance</p>
                                            <p className="text-[13px] font-normal leading-relaxed text-[#5f5649]">
                                                Engage differential diagnosis against a second route to surface high-priority strategic pivots.
                                            </p>
                                        </div>
                                        <div className="mb-6 grid grid-cols-1 gap-3">
                                            <div className="rounded-[2.25rem] border border-[#E7DED1] bg-[#FBF7EF] p-6 group hover:border-[#D4A574]/40 transition-all">
                                                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574]">Differential Diagnostic</p>
                                                <p className="mb-5 text-[13px] leading-relaxed text-[#5f5649]">
                                                    Put this brief beside another route and surface the strategic delta.
                                                </p>
                                                <a
                                                    href="/compare"
                                                    className="inline-flex items-center gap-2 rounded-full border border-[#D4A574] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4A574] transition-all hover:bg-[#D4A574] hover:text-black"
                                                >
                                                    <Code className="h-3 w-3" />
                                                    Run Analysis
                                                </a>
                                            </div>

                                            <div className="rounded-[2.25rem] border border-[#E7DED1] bg-[#FBF7EF] p-6 group hover:border-[#D4A574]/40 transition-all">
                                                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1a1a1a]">Intelligence Export</p>
                                                <p className="mb-6 text-[13px] leading-relaxed text-[#5f5649]">
                                                    Generate the briefing summary for immediate review distribution.
                                                </p>
                                                <button
                                                    onClick={() => setShowExportModal(true)}
                                                    className="inline-flex items-center gap-2 rounded-full border border-[#b0a594] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/80 transition-all hover:border-[#D4A574]/70 hover:text-[#1a1a1a]"
                                                >
                                                    <FileDown className="h-3 w-3" />
                                                    Export Dossier
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-5 rounded-[2rem] border border-[#D4A574]/20 bg-[#171717] px-5 py-5">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#D4A574]">Embed Widget</p>
                                            <p className="mt-3 text-[13px] leading-relaxed text-[#d6cec3]">
                                                Paste this iFrame into a client portal, strategy deck, Notion page, or internal dashboard to display a self-contained forensic intelligence panel.
                                            </p>
                                            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4A574]/75">
                                                Use for: client-facing reports · internal strategy decks · agency dashboards
                                            </p>
                                            <pre className="mt-4 overflow-x-auto rounded-2xl border border-[#D4A574]/20 bg-[#0f0f0f] p-3 text-[10px] leading-relaxed text-[#ded5ca]">
{`<iframe src="visualdecompiler.com/embed/${asset.id}" width="100%" height="600px" />`}
                                            </pre>
                                            <button
                                                onClick={handleCopyEmbed}
                                                className="mt-4 no-print inline-flex items-center gap-2 rounded-full border border-[#D4A574]/40 bg-[#1f1f1f] px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-[#D4A574] transition-all hover:border-[#D4A574] hover:text-[#f4d5a5]"
                                            >
                                                <Copy className="h-3 w-3" />
                                                Copy Embed Widget
                                            </button>
                                        </div>
                                        <div className="relative flex flex-col gap-2 xl:flex-row xl:items-start xl:justify-between">
                                            <button
                                                onClick={handleOpenCloneDrawer}
                                                className="no-print inline-flex items-center gap-2 rounded-full bg-[#D4A574] px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-[#141414] transition-all hover:bg-[#c8955b]"
                                            >
                                                <Sparkles className="h-3 w-3" />
                                                {cloneData ? 'Open Clone Engine' : 'Clone This Mechanic'}
                                            </button>
                                            <div className="relative xl:min-w-[96px] xl:text-right">
                                                <span className="text-[9px] font-mono tracking-widest text-[#8B4513]/50">ID: {asset.id.split('-')[0]}</span>
                                            </div>
                                            {showCopiedToast && (
                                                <div className="absolute top-full mt-2 right-0 bg-[#8B4513] text-[#F5F5DC] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                                    Embed Code Copied
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            {!sampleMode && (
                                <div className="mt-5 w-full max-w-[390px]">
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
                            )}
                        </div>
                    </aside>

                    {showExportModal && (
                        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-white px-6 backdrop-blur-md no-print">
                            <div className="w-full max-w-xl rounded-[2.5rem] border border-[#E6DDCF] bg-[#FFFCF7] p-10 text-[#151310] shadow-xl">
                                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4A574]">Export Strategic Dossier</p>
                                <h3 className="mt-4 text-2xl font-light uppercase tracking-tight">Print-safe agency dossier</h3>
                                <p className="mt-4 text-sm leading-relaxed text-[#151310]/65">
                                    For best results use Chrome, choose Save as PDF, set paper size to A4, and disable browser headers and footers.
                                </p>

                                <div className="mt-8 space-y-3">
                                    <label className="block text-[11px] font-bold uppercase tracking-[0.24em] text-[#9B8662]">Export preset</label>
                                    <div className="inline-flex rounded-full border border-[#E6DDCF] bg-[#FBF7F1] p-1.5 shadow-inner">
                                        <button
                                            type="button"
                                            onClick={() => setExportPreset('standard')}
                                            className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                                                exportPreset === 'standard' ? 'bg-[#D4A574] text-[#141414]' : 'text-[#D4A574] hover:bg-[#D4A574]/10'
                                            }`}
                                        >
                                            Standard Dossier
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setExportPreset('pitch')}
                                            className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                                                exportPreset === 'pitch' ? 'bg-[#D4A574] text-[#141414]' : 'text-[#D4A574] hover:bg-[#D4A574]/10'
                                            }`}
                                        >
                                            Pitch Narrative
                                        </button>
                                    </div>
                                    {exportPreset === 'pitch' && (
                                        <div className="rounded-2xl border border-[#E6DDCF] bg-[#FBF7F1]/60 p-4 text-sm leading-relaxed text-[#151310]/65">
                                            Concise client-facing structure: Problem, Insight, Recommendation, and a Strategic Delta fallback if no comparison is attached yet.
                                        </div>
                                    )}

                                <div className="mt-6 space-y-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#9B8662]">Client Name</label>
                                    <input
                                        type="text"
                                        value={exportClientName}
                                        onChange={(event) => setExportClientName(event.target.value)}
                                        placeholder="Optional cover-page client name"
                                        className="w-full rounded-full border border-[#E6DDCF] bg-[#FBF7F1] px-5 py-3 text-sm text-[#151310] outline-none transition-all focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/20"
                                    />
                                </div>

                                <div className="mt-6 rounded-2xl border border-[#E6DDCF] bg-[#FBF7F1]/60 p-5 text-[13px] leading-relaxed text-[#151310]/70">
                                    {isWhitelabel
                                        ? `Agency branding active — ${dossierAgencyName}`
                                        : 'Visual Decompiler branding active for this export.'}
                                </div>

                                <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-end">
                                    <button
                                        onClick={() => setShowExportModal(false)}
                                        className="rounded-full border border-[#D4A574]/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#9B8662] transition-all hover:bg-[#D4A574] hover:text-[#1a1a1a]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleInitiateExport}
                                        className="rounded-full bg-[#D4A574] px-8 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1a1a1a] shadow-sm transition-all hover:bg-[#8B4513]"
                                    >
                                        Initiate Export
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* RIGHT COLUMN: Scrollable Forensic Console (55%) */}
                <div className={`vault-analysis-content-rail w-full min-h-screen relative ${sampleMode ? 'bg-[#F6F1E7]' : 'bg-[#faf7f2]'}`}>
                    {/* HUD Texture Overlay - removed for clean light aesthetic */}
                    <div className="pointer-events-none absolute inset-0" />
                    
                    <div className="vault-analysis-content-inner relative z-10 min-h-screen w-full bg-transparent">

                    {/* Minimalist Segmented Controls */}
                    <div className={`vault-analysis-tabbar sticky ${sampleMode ? 'top-[65px]' : 'top-0'} z-20 ${sampleMode ? 'border-b border-[#D4A574]/15' : 'border-b border-[#e8ddd0]'} ${sampleMode ? 'bg-[#F6F1E7]/95' : 'bg-[#faf7f2]/95'} px-[clamp(12px,1.6vw,24px)] pt-10 pb-0 backdrop-blur-3xl md:pt-12`}>
                        {/* Mobile: single-row scroll with an edge cue */}
                        <div className="relative md:hidden">
                            <div className="flex gap-10 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {dossierTabs.map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        aria-current={activeTab === tab ? 'page' : undefined}
                                        className={`-mx-2 -my-2 rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.4em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A574]/25 ${
                                            activeTab === tab
                                                ? 'border-[#D4A574]/25 bg-white/70 text-[#141414] shadow-sm'
                                                : (sampleMode
                                                    ? 'border-transparent text-[#141414]/35 hover:text-[#141414]/75 hover:border-[#E7DED1] hover:bg-white/55'
                                                    : 'border-transparent text-[#141414]/35 hover:text-[#141414]/70 hover:border-[#E7DED1] hover:bg-white/55')
                                        }`}
                                    >
                                        {DOSSIER_TAB_LABELS[tab]}
                                    </button>
                                ))}
                            </div>
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#faf7f2]/95 to-transparent" />
                        </div>

                        {/* Desktop: grounded two-tier navigation */}
                        <div className="hidden md:block md:pb-8">
                            <div className="rounded-[2.25rem] border border-white/10 bg-[#1A1A1A] p-4 md:p-5">
                                <div className="grid grid-cols-4 gap-3">
                                    {primaryNavTabs.map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            aria-current={activeTab === tab ? 'page' : undefined}
                                            className={`w-full rounded-[0.95rem] border px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A574]/25 ${
                                                activeTab === tab
                                                    ? 'border-[#D4A574]/35 bg-[#151310] text-[#F3F1ED]'
                                                    : 'border-white/10 bg-[#151310] text-[#D6D0C6]/65 hover:text-[#F3F1ED] hover:border-[#D4A574]/35 hover:bg-[#201C16]'
                                            }`}
                                        >
                                            {DOSSIER_TAB_LABELS[tab]}
                                        </button>
                                    ))}
                                </div>

                                {secondaryNavTabs.length > 0 && (
                                    <div className="mt-4 border-t border-white/10 pt-4">
                                        <div className="grid grid-cols-5 gap-3">
                                            {secondaryNavTabs.map((tab) => (
                                                <button
                                                    key={tab}
                                                    type="button"
                                                    onClick={() => setActiveTab(tab)}
                                                    aria-current={activeTab === tab ? 'page' : undefined}
                                                    className={`w-full rounded-[0.95rem] border px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A574]/25 ${
                                                        activeTab === tab
                                                            ? 'border-[#D4A574]/35 bg-[#151310] text-[#F3F1ED]'
                                                            : 'border-white/10 bg-[#151310] text-[#D6D0C6]/65 hover:text-[#F3F1ED] hover:border-[#D4A574]/35 hover:bg-[#201C16]'
                                                    }`}
                                                >
                                                    {DOSSIER_TAB_LABELS[tab]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tab Content Area */}
                    <div className="px-[clamp(12px,1.6vw,24px)] py-[clamp(16px,1.6vw,28px)]">
                        {activeTab === 'QUALITY GATE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {extraction ? (
                                    <div className="space-y-10">
                                        <WorkspaceTabHeader
                                            kicker="Quality Gate"
                                            title="Creative Decision Analysis"
                                            intro="A structured read of decision quality based on evidence strength, strategic fit, and execution risk."
                                        />

                                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                                            <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-10 [word-spacing:0.24em]">Strategic Recommendation</p>
                                                {(() => {
                                                    const thesis = integratedRecommendation.thesis || '';
                                                    const [firstSentence, ...restParts] = thesis.split(/(?<=[.!?])\s+/);
                                                    const remainingText = restParts.join(' ').trim();
                                                    return (
                                                        <div className="max-w-[56ch] mb-8">
                                                            <p className="text-[24px] lg:text-[24px] leading-[1.2] font-semibold tracking-tightest text-[#F3F1ED]">
                                                                {firstSentence || thesis}
                                                            </p>
                                                            {remainingText ? (
                                                                <p className="mt-4 text-[16px] leading-relaxed font-medium text-[#D6D0C6]/70">
                                                                    {remainingText}
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                    );
                                                })()}
                                                <p className="max-w-[58ch] text-[13px] leading-relaxed text-[#D6D0C6]/70 mb-10 font-medium">{integratedRecommendation.whyNow}</p>
                                                <div className="rounded-[2.25rem] border border-white/10 bg-[#151310] p-6 mb-10">
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55 mb-3">Risk / Reward Tension</p>
                                                    <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70 font-medium">
                                                        {integratedRecommendation.riskRewardTension}
                                                    </p>
                                                </div>
                                                <div className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] mb-8">Decision Summary</p>
                                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                                                        <div className="rounded-[1.75rem] border border-white/10 bg-[#1A1A1A] p-5 group hover:border-[#D4A574]/35 transition-all">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55 mb-2">Recommended Decision</p>
                                                            <p className="text-[13px] leading-snug text-[#F3F1ED] font-semibold">{integratedRecommendation.decision}</p>
                                                        </div>
                                                        <div className="rounded-[1.75rem] border border-white/10 bg-[#1A1A1A] p-5 group hover:border-[#D4A574]/35 transition-all">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55 mb-2">Primary Watchout</p>
                                                            <p className="text-[13px] leading-snug text-[#F3F1ED] font-semibold">{integratedRecommendation.watchouts}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-8 pt-8 border-t border-white/10">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] mb-6">Action Protocol</p>
                                                        <div className="space-y-4">
                                                            {integratedRecommendation.executionNext3.map((step, index) => (
                                                                <div key={index} className="flex gap-4 items-start">
                                                                    <span className="text-[10px] font-semibold text-[#D4A574] mt-1">{index + 1}.</span>
                                                                    <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70 font-medium">{step}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="rounded-[2.5rem] border border-white/10 bg-[#1A1A1A] p-8 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-8">Confidence Readout</p>
                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        {[
                                                            ['Confidence', integratedRecommendation.confidence],
                                                            ['Evidence Strength', integratedRecommendation.evidenceStrength],
                                                            ['Assumption Load', integratedRecommendation.assumptionLoad],
                                                        ].map(([label, value]) => (
                                                            <div key={label} className="rounded-[1.75rem] border border-white/10 bg-[#1A1A1A] p-5 group hover:border-[#D4A574]/35 transition-all">
                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55 mb-2">{label}</p>
                                                                <p className="text-[13px] leading-snug text-[#F3F1ED] font-semibold">{value}</p>
                                                            </div>
                                                        ))}
                                                        <div className="rounded-[1.75rem] border border-white/10 bg-[#151310] p-5 group hover:border-[#D4A574]/35 transition-all sm:col-span-2">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55 mb-2">Known Unknowns</p>
                                                            <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70 font-medium">
                                                                {integratedRecommendation.knownUnknowns.join(' ')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-8 pt-8 border-t border-white/10">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574]/55 mb-2">Source Validation</p>
                                                        <p className="text-[10px] leading-relaxed text-[#D6D0C6]/55 tracking-[0.18em]">
                                                            Blueprint trace • Focal routing • Semiotic overlap
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="rounded-[2.5rem] border border-white/10 bg-[#1A1A1A] p-8 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-8">Decision Diagnostic</p>
                                                    <div className="space-y-3">
                                                        {integratedRecommendation.moduleScores.map((score) => (
                                                            <div key={score.label} className="rounded-[1.75rem] border border-white/10 bg-[#151310] p-5">
                                                                <div className="flex items-center justify-between gap-4">
                                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6D0C6]/70">{score.label}</p>
                                                                    <div className="flex gap-1">
                                                                        {[1,2,3,4,5].map(i => (
                                                                            <div key={i} className={`w-3 h-1 ${i <= score.score ? 'bg-[#D4A574]' : 'bg-white/10'}`} />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="rounded-[2.5rem] border border-white/10 bg-[#1A1A1A] p-8 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-8">Signal Integrity</p>
                                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                                                        <div className="rounded-[1.75rem] border border-white/10 bg-[#151310] p-5">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] mb-4 underline underline-offset-4 decoration-[#D4A574]/40">Hard Evidence Points</p>
                                                            <div className="space-y-4">
                                                                {integratedRecommendation.facts.map((fact, index) => (
                                                                    <div key={index} className="flex gap-3">
                                                                        <span className="text-[10px] font-semibold text-[#D4A574] opacity-40">{String(index+1).padStart(2, '0')}</span>
                                                                        <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70 font-medium">{fact}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-[1.75rem] border border-white/10 bg-[#151310] p-5">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55 mb-4 underline underline-offset-4">Derived Readout</p>
                                                            <div className="space-y-4">
                                                                {integratedRecommendation.inferences.map((inference, index) => (
                                                                    <div key={index} className="flex gap-3">
                                                                        <span className="text-[10px] font-semibold text-[#D6D0C6]/45">{String(index+1).padStart(2, '0')}</span>
                                                                        <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70 font-medium">{inference}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-10">System Verdict</p>
                                                <h3 className="text-[24px] font-semibold leading-[0.92] tracking-tightest text-balance text-[#F3F1ED] uppercase mb-6">
                                                    {qualityVerdict}
                                                </h3>
                                                <p className="max-w-[62ch] text-[13px] leading-relaxed text-[#D6D0C6]/70 font-medium mb-12">
                                                    Decision signal based on strategic alignment and evidence quality.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] mb-4">Integrity Index</p>
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-6xl font-semibold tracking-tighter text-[#F3F1ED]">
                                                                {confidenceScore ?? '—'}
                                                            </span>
                                                            <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#D4A574]">/100</span>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8 flex items-center">
                                                        <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70 font-semibold italic">
                                                            Diagnostics prioritize directional precision over personal preference.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-[2.75rem] border border-white/10 bg-[#1A1A1A] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-10">Critical Risk Points</p>
                                                <div className="space-y-6">
                                                    {failureReasons.map((reason, index) => (
                                                        <div key={`${reason.title}-${index}`} className="border-l-2 border-[#D4A574] pl-8 py-2">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] mb-3">{reason.title}</p>
                                                            <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70 font-medium">{reason.detail}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-[2.25rem] border border-white/10 bg-[#1A1A1A] p-8 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Adaptation Priorities</p>
                                            <div className="mt-5 grid gap-4 lg:grid-cols-2">
                                                {fixPriorities.map((item, index) => (
                                                    <div key={item.priority} className={`rounded-[1.4rem] border border-white/20 bg-[#151310] px-5 py-5 ${index === fixPriorities.length - 1 ? 'lg:col-span-2' : ''}`}>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">{item.priority}</p>
                                                        <p className="mt-3 text-[13px] font-semibold tracking-tight text-[#F3F1ED]">{item.title}</p>
                                                        <p className="mt-2 max-w-[56ch] text-[13px] leading-6 text-[#D6D0C6]">{item.detail}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <DossierDecisionSummary
                                            extraction={extraction}
                                            dossier={dossier}
                                            narrativeIntro={parseDossierSections(dossier?.narrative_framework, 'ACT').intro}
                                            isExecutiveSummary={isExecutiveSummary}
                                            onToggleExecutiveSummary={setIsExecutiveSummary}
                                            evidenceHref="#dossier-evidence"
                                        />
                                    </div>
                                ) : (
                                    <SovereignProcessingView assetId={asset.id} />
                                )}
                            </div>
                        )}

                        {/* TAB 1: INTELLIGENCE */}
                        {activeTab === 'INTELLIGENCE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {extraction ? (
                                    <div className="space-y-10">
                                        <WorkspaceTabHeader
                                            kicker="INTELLIGENCE"
                                            title="Strategic Insight Overview"
                                            intro="A comprehensive analysis of core mechanics, persuasive structures, and actionable paths."
                                        />
                                        {(!extraction.primary_mechanic || !extraction.full_dossier) && <SovereignProcessingView assetId={asset.id} agency={agency} />}
                                        {extraction.primary_mechanic && extraction.full_dossier && (
                                             <>
                                                 <div className="mx-auto w-full max-w-[960px]">
                                                     <article className="rounded-[2rem] border border-white/10 bg-[#1A1A1A] p-8 text-[#EFE9DE] shadow-[0_30px_110px_rgba(0,0,0,0.36)] sm:p-10 lg:p-12">
                                                         <header className="space-y-10 border-b border-white/10 pb-12">
                                                             <div className="flex flex-wrap items-start justify-between gap-4">
                                                                 <div className="space-y-2">
                                                                     <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4A574]">Creative Intelligence Dossier</p>
                                                                 </div>
                                                                 <span className="rounded-full border border-white/10 bg-[#1A1916] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#D4A574]">
                                                                     {qualityVerdict}
                                                                 </span>
                                                             </div>

                                                             <div>
                                                                 <h2 className="text-[28px] font-semibold uppercase leading-[0.96] tracking-[-0.024em] text-[#F3F1ED] whitespace-nowrap sm:text-[36px] lg:text-[42px]">{dossierCampaignName}</h2>
                                                             </div>

                                                             <div className="grid gap-4 text-[12px] sm:grid-cols-3">
                                                                 <div className="rounded-[1.2rem] border border-white/10 bg-[#1A1A1A] px-4 py-4">
                                                                     <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55">Prepared For</p>
                                                                     <p className="mt-2 text-[16px] font-medium leading-none text-[#F3F1ED]">{dossierPreparedFor}</p>
                                                                 </div>
                                                                 <div className="rounded-[1.2rem] border border-white/10 bg-[#1A1A1A] px-4 py-4">
                                                                     <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55">Mode</p>
                                                                     <p className="mt-2 text-[16px] font-medium leading-none text-[#F3F1ED]">{dossierModeLabel}</p>
                                                                 </div>
                                                                 <div className="rounded-[1.2rem] border border-white/10 bg-[#1A1A1A] px-4 py-4">
                                                                     <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55">Date</p>
                                                                     <p className="mt-2 text-[16px] font-medium leading-none text-[#F3F1ED]">{dossierReportDate}</p>
                                                                 </div>
                                                             </div>
                                                         </header>

                                                         <div className="space-y-14 pt-14">
                                                             <section className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                                                 <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4A574]">Primary Scores</p>
                                                                 <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
                                                                     {analysisLanguage.primaryScores.map((score) => (
                                                                         <div key={score.label} className="min-w-0 rounded-[1.75rem] border border-white/10 bg-[#1A1A1A] px-5 py-5 text-center">
                                                                             <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D6D0C6]/60">{PRIMARY_SCORE_DISPLAY_LABELS[score.label]}</p>
                                                                             <p className="mt-4 text-center text-[56px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[#F3F1ED]">{score.value}</p>
                                                                         </div>
                                                                     ))}
                                                                 </div>
                                                             </section>

                                                             <section className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                                                 <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4A574]">Attention Path</p>
                                                                 <div className="mt-7 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                                                                     <div className="space-y-6">
                                                                         {[
                                                                             ['Product Silhouette', analysisLanguage.attentionPath.primaryFocus],
                                                                             ['Brand Mark', analysisLanguage.attentionPath.secondaryFocus],
                                                                             ['Supporting Copy Layer', supportingCopyPath],
                                                                         ].map(([title, detail], index) => (
                                                                             <div key={title as string} className="rounded-[1.75rem] border border-white/10 bg-[#1A1A1A] px-5 py-5">
                                                                                 <div className="flex items-start gap-4">
                                                                                     <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[#151310] text-[20px] font-semibold leading-none tracking-[-0.02em] text-[#F3F1ED]">{index + 1}</span>
                                                                                     <div className="min-w-0">
                                                                                         <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#F3F1ED]/88">{title as string}</p>
                                                                                         <p className="mt-2 text-[13px] leading-relaxed text-[#D6D0C6]/82">{detail as string}</p>
                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                         ))}
                                                                     </div>
                                                                     <aside className="self-start rounded-[1.75rem] border border-white/10 bg-[#1A1A1A] px-5 py-5 lg:min-h-[220px]">
                                                                         <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574]">Drop-Off Detected</p>
                                                                         <p className="mt-3 text-[13px] leading-relaxed text-[#F3F1ED]/86">{analysisLanguage.attentionPath.dropOff}</p>
                                                                     </aside>
                                                                 </div>
                                                             </section>

                                                             <section className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                                                 <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4A574]">Structural Signals</p>
                                                                 <div className="mt-7 grid gap-4">
                                                                     {analysisLanguage.structuralSignals.map((signal) => (
                                                                         <div key={signal.label} className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-5 py-4">
                                                                             <div className="flex items-center justify-between gap-4">
                                                                                 <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6D0C6]/58">{signal.label}</span>
                                                                                 <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F3F1ED]/96">{signal.value}</span>
                                                                             </div>
                                                                         </div>
                                                                     ))}
                                                                 </div>
                                                                 <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-5 py-5">
                                                                     <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">Overall Structure</p>
                                                                     <p className="mt-2 text-[13px] leading-relaxed text-[#F3F1ED]/86">{structuralSummary}</p>
                                                                 </div>
                                                             </section>

                                                             <section className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                                                 <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4A574]">Strategic Read</p>
                                                                 <p className="mt-3 max-w-[62ch] text-[13px] leading-relaxed text-[#D6D0C6]/70">A concise strategic summary of what the work is doing, why it lands, and where friction appears.</p>
                                                                 <div className="mt-8 space-y-10">
                                                                     {[
                                                                         ['Strategic Thesis', firstSentence(analysisLanguage.strategicRead.thesis)],
                                                                         ['Trigger Mechanic', firstSentence(analysisLanguage.strategicRead.triggerMechanic)],
                                                                         ['Friction Points', firstSentence(analysisLanguage.strategicRead.frictionPoints)],
                                                                         ['Category Positioning', firstSentence(analysisLanguage.strategicRead.categoryPositioning)],
                                                                     ].map(([label, value]) => (
                                                                         <div key={label as string} className="rounded-[1.75rem] border border-white/10 bg-[#1A1A1A] p-5">
                                                                             <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">{label}</p>
                                                                             <p className="mt-2 max-w-[70ch] text-[14px] leading-relaxed text-[#F3F1ED]/92">{value as string}</p>
                                                                         </div>
                                                                     ))}
                                                                 </div>
                                                             </section>

                                                             <section className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                                                 <p className="text-[18px] font-semibold leading-relaxed tracking-[-0.01em] text-[#F3F1ED]">Confidence Index: {analysisLanguage.confidenceIndex}</p>
                                                                 <p className="mt-2 max-w-[70ch] text-[13px] leading-relaxed text-[#D6D0C6]/70">A higher index indicates stronger decision confidence for review and presentation.</p>
                                                                 <p className="mt-2 max-w-[70ch] text-[14px] leading-relaxed text-[#D6D0C6]/70">{confidenceRationale}</p>
                                                             </section>
                                                         </div>
                                                     </article>
                                                 </div>


                                            </>
                                        )}

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
                                    <div className="space-y-10">
                                        <WorkspaceTabHeader
                                            kicker="Pattern Extraction"
                                            title="Mechanics"
                                            intro="A structural decomposition of the signal stack and mechanic architecture—hooks, pacing, contrast, and attention-routing cues that drive response."
                                        />
                                        
                                        {/* UNIFIED TECHNICAL AUTOPSY CONTAINER */}
                                        <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] p-10 space-y-12 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                            {/* Top: Radiant Architecture Toggle */}
                                            <div className="flex flex-col gap-10 md:flex-row md:items-center justify-between pb-10 border-b border-white/10">
                                                <div className="flex items-center gap-8">
                                                    <div className="h-14 w-14 rounded-2xl bg-[#151310] flex items-center justify-center border border-white/10 text-[#D4A574]">
                                                        <Sparkles className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <h3 className="text-[12px] font-semibold uppercase tracking-[0.5em] text-[#D4A574]">Macro-Diagnostic Grid</h3>
                                                        <p className="text-[13px] leading-relaxed text-[#F3F1ED]/86">Visualize focal routing and attention-routing cues.</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => setShowRadiant(!showRadiant)}
                                                    className={`px-10 py-4 border text-[11px] font-semibold uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-4 ${showRadiant ? "bg-[#D4A574] text-black border-[#D4A574] shadow-[0_0_20px_rgba(212,165,116,0.25)]" : "bg-[#151310] text-[#D4A574] border-white/20 hover:border-[#D4A574]/60"}`}
                                                >
                                                    <div className={`h-2 w-2 ${showRadiant ? "bg-white animate-pulse" : "bg-[#D4A574]"}`} />
                                                    {showRadiant ? "HUD Active" : "Initialize Optical HUD"}
                                                </button>
                                            </div>

                                            {/* Bottom: Technical Autopsy Channels */}
                                            <div className="grid grid-cols-1">
                                                <DossierGrid 
                                                    title="Semiotic Subtext" 
                                                    content={extraction.full_dossier.semiotic_subtext || ''} 
                                                    type="CHANNEL" 
                                                />
                                            </div>
                                        </div>
                                                                {/* ── Gaze Topology ── */}
                                        {(extraction.full_dossier as any)?.gaze_topology && (
                                            <section className="signals-section mt-14 space-y-10">
                                                <div className="flex items-center gap-10">
                                                    <div className="flex flex-col gap-3">
                                                        <h2 className="text-[12px] font-semibold uppercase tracking-[0.42em] text-[#D4A574]">Gaze Topology</h2>
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D6D0C6]/68">Mode of Address and Viewer Positioning</p>
                                                    </div>
                                                    <div className="h-px flex-1 bg-white/10" />
                                                </div>

                                                <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-3">
                                                    {[
                                                        { label: 'Mode of Address', value: (extraction.full_dossier as any).gaze_topology.mode_of_address },
                                                        { label: 'Viewer Position', value: (extraction.full_dossier as any).gaze_topology.viewer_position },
                                                        { label: 'Power Holder', value: (extraction.full_dossier as any).gaze_topology.power_holder },
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex min-h-[200px] flex-col justify-between rounded-[2.5rem] border border-white/10 bg-[#151310] px-8 py-8 text-[#F3F1ED]">
                                                            <h3 className="mb-6 w-full border-b border-white/10 pb-6 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#D4A574]">
                                                                {item.label}
                                                            </h3>
                                                            <div className="flex-1 flex items-center">
                                                                <span className="text-[24px] font-semibold leading-tight text-[#F3F1ED]">{item.value}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="rounded-[2.75rem] border border-white/10 bg-[#151310] p-10">
                                                    <h3 className="mb-8 border-b border-white/10 pb-6 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#D4A574]">
                                                        Forensic Gaze Diagnostic
                                                    </h3>
                                                    <p className="max-w-[72ch] text-[13px] leading-relaxed text-[#F3F1ED]/86">
                                                        {(extraction.full_dossier as any).gaze_topology.reading}
                                                    </p>
                                                </div>
                                            </section>
                                        )}

                                        {/* ── Counter-Reading Matrix ── */}
                                        {(extraction.full_dossier as any)?.counter_reading_matrix && (
                                            <section className="counter-reading-section mt-14 space-y-10">
                                                <div className="flex items-center gap-10">
                                                    <div className="flex flex-col gap-3">
                                                        <h2 className="text-[12px] font-semibold uppercase tracking-[0.42em] text-[#D4A574]">Counter-Reading Matrix</h2>
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D6D0C6]/68">Polysemic deconstruction via critical theory</p>
                                                    </div>
                                                    <div className="h-px flex-1 bg-white/10" />
                                                </div>
                                                <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
                                                    {((extraction.full_dossier as any).counter_reading_matrix as { lens: string; reading: string }[]).map((item, i) => (
                                                        <div key={i} className="flex min-h-[220px] flex-col rounded-[2.5rem] border border-white/10 bg-[#151310] px-8 py-8 text-[#F3F1ED]">
                                                            <h3 className="mb-6 w-full border-b border-[#E7DED1] pb-6 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#D4A574]">
                                                                {item.lens}
                                                            </h3>
                                                            <div className="flex-1 max-h-[400px] overflow-y-auto pt-2">
                                                                <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70 font-medium">{item.reading}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>
                                ) : (
                                     <div className="rounded-[2.5rem] border border-dashed border-white/20 bg-[#1A1A1A] p-20 flex flex-col items-center justify-center text-center">
                                         <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#151310]">
                                         <Info className="h-5 w-5 text-[#D4A574]/50" />
                                         </div>
                                         <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4A574] mb-2">Deep Intelligence Required</h3>
                                         <p className="max-w-xs text-[13px] font-light tracking-wide text-[#D6D0C6]/70">Signal interception requires deep architectural extraction of this asset's semiotic layers.</p>
                                     </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'CONSTRAINT MAP' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-10">
                                    <WorkspaceTabHeader
                                        kicker="Operational Guardrails"
                                        title="Operational Guardrails & Constraint Map"
                                        intro="This section defines the non-negotiables, avoidances, and safe adaptation boundaries required to preserve the working forensic logic."
                                    />

                                    <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                        <p className="mb-8 border-b border-white/10 pb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574]">Guardrail Intent</p>
                                        <p className="max-w-[62ch] text-[24px] font-semibold leading-tight tracking-[-0.01em] text-[#F3F1ED]">
                                            VD judges, diagnoses, and directs creative quality. Not for asset generation.
                                        </p>
                                    </div>

                                    <div className="rounded-[2.75rem] border border-white/10 bg-[#1A1A1A] p-8 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4A574]">Constraint Priority Legend</p>
                                        <div className="overflow-hidden border border-white/10 bg-[#151310]">
                                            <div className="grid grid-cols-12 border-b border-white/10 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D6D0C6]/70">
                                                <span className="col-span-4">Priority Level</span>
                                                <span className="col-span-8">Description</span>
                                            </div>
                                            {[
                                                ['Critical', 'Must be preserved'],
                                                ['High', 'Important but not critical'],
                                                ['Optional', 'Enhancements that can vary'],
                                            ].map(([level, description]) => (
                                                <div key={level} className="grid grid-cols-12 border-b border-white/10 px-6 py-4 text-[13px] last:border-b-0">
                                                    <span
                                                        className={`col-span-4 inline-flex items-center gap-2 font-semibold uppercase tracking-[0.22em] ${
                                                            level === 'Critical'
                                                                ? 'text-[#F3F1ED]'
                                                                : level === 'High'
                                                                    ? 'text-[#D4A574]'
                                                                    : 'text-[#B7AFA3]'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`h-1.5 w-1.5 ${
                                                                level === 'Critical'
                                                                    ? 'bg-[#F3F1ED]'
                                                                    : level === 'High'
                                                                        ? 'bg-[#D4A574]'
                                                                        : 'bg-[#B7AFA3]'
                                                            }`}
                                                        />
                                                        {level}
                                                    </span>
                                                    <span className="col-span-8 text-[#D6D0C6]/70">{description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid items-start gap-6 xl:auto-rows-min xl:grid-cols-2">
                                        {[
                                            {
                                                title: 'Retention Protocol',
                                                guidance: "Preserve these elements to protect the route's strategic spine.",
                                                items: mustKeepConstraints,
                                                accent: 'text-[#D4A574]',
                                            },
                                            {
                                                title: 'Negation Protocol',
                                                guidance: 'Avoid these shifts to prevent degradation of message transfer.',
                                                items: mustAvoidConstraints,
                                                accent: 'text-[#F3F1ED]',
                                            },
                                            {
                                                title: 'Adaptive Delta',
                                                guidance: 'Safe variation zone for controlled testing and iteration.',
                                                items: safeAdaptationZone,
                                                accent: 'text-[#D4A574]',
                                            },
                                        ].map((group, index) => (
                                            <div
                                                key={group.title}
                                                className={`self-start h-fit rounded-[2.75rem] border border-white/10 bg-[#1A1A1A] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)] ${index === 2 ? 'xl:col-span-2' : ''}`}
                                            >
                                                <p className={`text-[10px] font-semibold uppercase tracking-[0.5em] mb-6 border-b border-white/10 pb-6 ${group.accent}`}>{group.title}</p>
                                                <p className="mb-8 max-w-[66ch] text-[13px] leading-relaxed text-[#D6D0C6]/70">{group.guidance}</p>
                                                <div className="space-y-4">
                                                    {group.title === 'Adaptive Delta' && (
                                                        <div className="border border-white/10 bg-[#151310] px-6 py-4">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6D0C6]/58">Variation Lanes</p>
                                                        </div>
                                                    )}
                                                    {group.items.length > 0 ? (
                                                        group.title === 'Adaptive Delta' ? (
                                                            (() => {
                                                                const adaptiveGroups = group.items.reduce((acc, adaptiveItem, adaptiveIndex) => {
                                                                    const adaptiveMatch = adaptiveItem.text.match(/^\s*([^:]+):\s*(.*)$/);
                                                                    const laneTitle = adaptiveMatch?.[1]?.trim().toUpperCase() || `VARIANT ${adaptiveIndex + 1}`;
                                                                    const laneBody = adaptiveMatch?.[2]?.trim() || adaptiveItem.text;
                                                                    const existingLane = acc.find((lane) => lane.title === laneTitle);
                                                                    const laneEntry = { id: adaptiveIndex, body: laneBody, severity: adaptiveItem.severity };

                                                                    if (existingLane) {
                                                                        existingLane.entries.push(laneEntry);
                                                                    } else {
                                                                        acc.push({ title: laneTitle, entries: [laneEntry] });
                                                                    }

                                                                    return acc;
                                                                }, [] as Array<{ title: string; entries: Array<{ id: number; body: string; severity: ConstraintSeverity }> }>);

                                                                return adaptiveGroups.map((lane) => (
                                                                    <div key={`${group.title}-${lane.title}`} className="border border-white/10 bg-[#151310] p-6">
                                                                        <div className="border-b border-white/10 pb-4">
                                                                            <p className="text-[24px] font-semibold uppercase tracking-[-0.02em] text-[#F3F1ED]">{lane.title}</p>
                                                                        </div>
                                                                        <div className="mt-4 space-y-4">
                                                                            {lane.entries.map((entry) => (
                                                                                <div key={`${group.title}-${lane.title}-${entry.id}`} className="space-y-4 border border-white/10 bg-[#131110] p-4">
                                                                                    <p className="text-[16px] font-medium leading-relaxed text-[#F3F1ED]/92">{entry.body}</p>
                                                                                    <div className="grid gap-4 border-t border-white/10 pt-4 sm:grid-cols-[auto_1fr] sm:items-start">
                                                                                        <div className="space-y-2">
                                                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6D0C6]/58">Priority</p>
                                                                                            <span
                                                                                                className={`inline-flex w-fit items-center justify-center border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] ${
                                                                                                    entry.severity === 'critical'
                                                                                                        ? 'border-[#D4A574] text-black bg-[#D4A574]'
                                                                                                        : entry.severity === 'high'
                                                                                                            ? 'border-[#D4A574]/40 text-[#D4A574]'
                                                                                                            : 'border-[#D6D0C6]/30 text-[#D6D0C6]/88 bg-white/[0.03]'
                                                                                                }`}
                                                                                            >
                                                                                                {entry.severity}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6D0C6]/58">Protocol Note</p>
                                                                                            <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70">
                                                                                                {entry.severity === 'critical'
                                                                                                    ? 'Primary safe adaptation lane with strict guardrails.'
                                                                                                    : entry.severity === 'high'
                                                                                                        ? 'High-value controlled variation for route optimization.'
                                                                                                        : 'Optional exploratory variation within safe boundaries.'}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ));
                                                            })()
                                                        ) : (
                                                            group.items.map((item, id) => {
                                                                const constraintCopy = deriveConstraintItemCopy(item.text, id + 1);
                                                                const itemTitle = constraintCopy.title;
                                                                const itemBody = constraintCopy.body;

                                                                return (
                                                                    <div key={`${group.title}-${id}`} className="border border-white/10 bg-[#151310] p-6">
                                                                        <div className="border-b border-white/10 pb-4">
                                                                            <p className="text-[16px] font-semibold uppercase tracking-[0.08em] text-[#F3F1ED]">{itemTitle}</p>
                                                                        </div>

                                                                        <div className="mt-4">
                                                                            <p className="text-[13px] font-medium leading-relaxed text-[#F3F1ED]/92">{itemBody}</p>
                                                                        </div>

                                                                        <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-[auto_1fr] sm:items-start">
                                                                            <div className="space-y-2">
                                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6D0C6]/58">Priority</p>
                                                                                <span
                                                                                    className={`inline-flex w-fit items-center justify-center border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] ${
                                                                                        item.severity === 'critical'
                                                                                            ? 'border-[#D4A574] text-black bg-[#D4A574]'
                                                                                            : item.severity === 'high'
                                                                                                ? 'border-[#D4A574]/40 text-[#D4A574]'
                                                                                                : 'border-[#D6D0C6]/30 text-[#D6D0C6]/88 bg-white/[0.03]'
                                                                                    }`}
                                                                                >
                                                                                    {item.severity}
                                                                                </span>
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6D0C6]/58">Protocol Note</p>
                                                                                <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70">
                                                                                    {group.title === 'Retention Protocol'
                                                                                        ? item.severity === 'critical'
                                                                                            ? 'Must be preserved exactly to hold route integrity.'
                                                                                            : item.severity === 'high'
                                                                                                ? 'Keep in most variants unless tightly justified.'
                                                                                                : 'Can flex during iteration without collapsing route.'
                                                                                        : item.severity === 'critical'
                                                                                            ? 'Must be avoided to prevent strategic route collapse.'
                                                                                            : item.severity === 'high'
                                                                                                ? 'Avoid by default; use only in deliberate stress tests.'
                                                                                                : 'Remove when simplification strengthens transfer.'}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        )
                                                    ) : (
                                                        <div className="border border-dashed border-white/20 bg-[#151310] p-12 text-center text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D6D0C6]/45">
                                                            Pending trace reconstruction.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'MARKET PULSE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-10">
                                    <WorkspaceTabHeader
                                        kicker="Competitive Context"
                                        title="Market Pulse: Competitive Context"
                                        intro="An analysis of how the current route aligns with category pressures, novelty conditions, and timing opportunities."
                                    />
                                    <div className="space-y-10">
                                        {!isSovereign ? (
                                            <div className="relative rounded-[3rem] border border-white/10 bg-[#1A1A1A] overflow-hidden group shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                <div className="absolute inset-0 z-10 backdrop-blur-md bg-black/45 flex items-center justify-center">
                                                    <div className="p-10 rounded-[2.75rem] border border-white/10 bg-[#151310] max-w-xl text-center flex flex-col items-center">
                                                        <div className="w-12 h-12 flex items-center justify-center border border-[#D4A574]/30 bg-[#D4A574]/10 mb-6">
                                                            <Lock className="w-5 h-5 text-[#D4A574]" />
                                                        </div>
                                                        <span className="text-[#D4A574] font-semibold tracking-[0.4em] uppercase text-[10px] mb-4">Sovereign Feature</span>
                                                        <h2 className="text-[#F3F1ED] text-[24px] font-semibold mb-6 tracking-tight">Market Pulse Locked</h2>
                                                        <p className="text-[#D6D0C6]/72 text-[13px] mb-8 leading-relaxed">
                                                            Cross-asset statistical aggregation and category saturation density mapping is restricted to sovereign intelligence tiers.
                                                        </p>
                                                        <button className="bg-[#D4A574] text-black px-10 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] transition hover:bg-[#E2BE84] active:scale-95">
                                                            UPGRADE TO SOVEREIGN
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-10 opacity-25 select-none grayscale">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        {[
                                                            ['Saturation', '0.0%'],
                                                            ['Novelty', '0.0%'],
                                                            ['Fatigue', '0.0%'],
                                                        ].map(([label, val]) => (
                                                            <div key={label} className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574]/70 mb-4">{label}</p>
                                                                <p className="text-[24px] font-semibold text-[#F3F1ED] drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">{val}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                    <div className="grid grid-cols-12 border-b border-white/12 bg-[#151310] text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4A574]">
                                                        <div className="col-span-5 px-8 py-5 border-r border-white/10">Metric</div>
                                                        <div className="col-span-2 px-8 py-5 border-r border-white/10 text-center">Value</div>
                                                        <div className="col-span-5 px-8 py-5">Context Signal</div>
                                                    </div>
                                                    {[
                                                        {
                                                            label: 'Market Saturation',
                                                            value: marketPulseFallback.saturation,
                                                            insight:
                                                                marketPulseFallback.saturation >= 70
                                                                    ? 'Category pressure is elevated. Distinctive differentiation is required.'
                                                                    : 'Saturation remains manageable. Route can scale with disciplined execution.',
                                                        },
                                                        {
                                                            label: 'Route Novelty',
                                                            value: marketPulseFallback.novelty,
                                                            insight:
                                                                marketPulseFallback.novelty >= 75
                                                                    ? 'Novelty potential is strong. Positioning can win with precision.'
                                                                    : 'Novelty is moderate. Sharper differentiation will improve separation.',
                                                        },
                                                        {
                                                            label: 'Category Fatigue',
                                                            value: marketPulseFallback.fatigue,
                                                            insight:
                                                                marketPulseFallback.fatigue >= 55
                                                                    ? 'Fatigue is rising. Fresh route treatment is needed to sustain attention.'
                                                                    : 'Fatigue is controlled. Current route remains viable with selective refinement.',
                                                        },
                                                    ].map((row) => (
                                                        <div key={row.label} className="grid grid-cols-12 border-b border-white/10 last:border-b-0">
                                                            <div className="col-span-5 border-r border-white/10 px-8 py-6">
                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E3DBCE]">{row.label}</p>
                                                            </div>
                                                            <div className="col-span-2 border-r border-white/10 px-8 py-6 text-center">
                                                                <p className="text-[24px] font-semibold text-[#F3F1ED]">{row.value}%</p>
                                                            </div>
                                                            <div className="col-span-5 px-8 py-6">
                                                                <p className="text-[13px] leading-relaxed text-[#F3F1ED]">{row.insight}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#D4A574] mb-6 border-b border-white/10 pb-5">Directional Estimate</p>
                                                    <p className="max-w-[74ch] text-[13px] leading-relaxed text-[#F3F1ED]">
                                                        {marketPulseFallback.interpretation || 'Category pressure is elevated, so this route requires sharper differentiation and strict execution discipline before scale expansion.'}
                                                    </p>
                                                </div>

                                                <div className="rounded-[2.75rem] border border-white/10 bg-[#1A1A1A] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                    <p className="mb-6 border-b border-white/10 pb-5 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#D4A574]">
                                                        Strategic Implication
                                                    </p>
                                                    <p className="max-w-[78ch] rounded-[1.75rem] border border-white/10 bg-[#151310] px-5 py-4 text-[13px] leading-relaxed text-[#F3F1ED]">
                                                        To navigate saturation pressure while preserving route novelty, prioritize clear value signaling, disciplined hierarchy, and a distinct visual identity that can survive repeat exposure.
                                                    </p>
                                                    <span className="mt-8 inline-flex border border-[#D4A574]/75 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F3F1ED] bg-[#D4A574]/24">
                                                        {marketPulseFallback.confidenceLabel}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'PSYCHOLOGY' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-10">
                                    <WorkspaceTabHeader
                                        kicker="Cognitive Dynamics"
                                        title="Semiotic Channel Interceptions"
                                        intro="How the asset encodes meaning, identity cues, and emotional triggers to shape perception and decision momentum."
                                    />
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {/* Trigger Distribution Map */}
                                        <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] p-12 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-8">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-[#D4A574] font-mono">Trigger Distribution Map</p>
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6D0C6]/45">Surface_Area</span>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                {(() => {
                                                    const axes = [
                                                        { key: 'STATUS', label: 'STATUS' },
                                                        { key: 'SOCIAL PROOF', label: 'SOCIAL\nPROOF' },
                                                        { key: 'AUTHORITY', label: 'AUTHORITY' },
                                                        { key: 'SCARCITY', label: 'SCARCITY' },
                                                        { key: 'UTILITY', label: 'UTILITY' },
                                                    ];

                                                    const dist = ((dossier as any)?.archetype_mapping?.trigger_distribution || {}) as Record<string, any>;
                                                    const byKey = new Map<string, number>();
                                                    Object.entries(dist).forEach(([k, v]) => {
                                                        const n = typeof v === 'number' ? v : Number(v);
                                                        if (!Number.isFinite(n)) return;
                                                        byKey.set(String(k).trim().toUpperCase(), n);
                                                    });

                                                    const getVal = (k: string) => {
                                                        const v = byKey.get(k);
                                                        const n = typeof v === 'number' ? v : 0;
                                                        return Math.max(0, Math.min(100, n));
                                                    };

                                                    const size = 280;
                                                    const cx = size / 2;
                                                    const cy = size / 2;
                                                    const r = 92;
                                                    const ringCount = 4;
                                                    const angle0 = -Math.PI / 2;

                                                    const polar = (i: number, radius: number) => {
                                                        const theta = angle0 + (i * (Math.PI * 2)) / axes.length;
                                                        return [cx + Math.cos(theta) * radius, cy + Math.sin(theta) * radius] as const;
                                                    };

                                                    const points = axes
                                                        .map((a, i) => {
                                                            const v = getVal(a.key);
                                                            const radius = (v / 100) * r;
                                                            const [x, y] = polar(i, radius);
                                                            return `${x.toFixed(2)},${y.toFixed(2)}`;
                                                        })
                                                        .join(' ');

                                                    const rings = Array.from({ length: ringCount }, (_, ri) => {
                                                        const rr = ((ri + 1) / ringCount) * r;
                                                        const ringPoints = axes
                                                            .map((_, i) => {
                                                                const [x, y] = polar(i, rr);
                                                                return `${x.toFixed(2)},${y.toFixed(2)}`;
                                                            })
                                                            .join(' ');
                                                        return <polygon key={ri} points={ringPoints} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
                                                    });

                                                    const spokes = axes.map((_, i) => {
                                                        const [x, y] = polar(i, r);
                                                        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
                                                    });

                                                    const labels = axes.map((a, i) => {
                                                        const [x, y] = polar(i, r + 38);
                                                        const lines = a.label.split('\n');
                                                        return (
                                                            <g key={a.key} transform={`translate(${x},${y})`}>
                                                                {lines.map((t, li) => (
                                                                    <text
                                                                        key={li}
                                                                        x={0}
                                                                        y={li * 14}
                                                                        textAnchor="middle"
                                                                        fontSize={10}
                                                                        fontWeight={600}
                                                                        letterSpacing={3}
                                                                        fill="rgba(212,165,116,0.75)"
                                                                    >
                                                                        {t}
                                                                    </text>
                                                                ))}
                                                            </g>
                                                        );
                                                    });

                                                    const dotTargets = axes.map((a, i) => {
                                                        const v = getVal(a.key);
                                                        const [x, y] = polar(i, (v / 100) * r);
                                                        return { key: a.key, x, y, delay: 0.35 + i * 0.08 };
                                                    });

                                                    return (
                                                        <motion.svg width="280" height="280" viewBox={`0 0 ${size} ${size}`}>
                                                            <defs>
                                                                <radialGradient id="vdRadarGlow" cx="50%" cy="50%" r="60%">
                                                                    <stop offset="0%" stopColor="rgba(212,165,116,0.25)" />
                                                                    <stop offset="100%" stopColor="rgba(212,165,116,0)" />
                                                                </radialGradient>
                                                            </defs>

                                                            <motion.circle
                                                                cx={cx}
                                                                cy={cy}
                                                                r={r + 18}
                                                                fill="url(#vdRadarGlow)"
                                                                initial={{ opacity: 0 }}
                                                                whileInView={{ opacity: 1 }}
                                                                viewport={{ once: true, amount: 0.6 }}
                                                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                                            />

                                                            <motion.g
                                                                initial={{ opacity: 0 }}
                                                                whileInView={{ opacity: 1 }}
                                                                viewport={{ once: true, amount: 0.6 }}
                                                                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                            >
                                                                {rings}
                                                                {spokes}
                                                            </motion.g>

                                                            <motion.polygon
                                                                points={points}
                                                                fill="rgba(212,165,116,0.12)"
                                                                stroke="#D4A574"
                                                                strokeWidth="1.5"
                                                                pathLength={1}
                                                                initial={{ pathLength: 0, opacity: 0 }}
                                                                whileInView={{ pathLength: 1, opacity: 1 }}
                                                                viewport={{ once: true, amount: 0.6 }}
                                                                transition={{ duration: 1.25, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                                            />

                                                            {dotTargets.map((d) => (
                                                                <motion.circle
                                                                    key={d.key}
                                                                    cx={cx}
                                                                    cy={cy}
                                                                    r={3.2}
                                                                    fill="#F3F1ED"
                                                                    stroke="#D4A574"
                                                                    strokeWidth={1}
                                                                    initial={{ cx, cy, opacity: 0 }}
                                                                    whileInView={{ cx: d.x, cy: d.y, opacity: 1 }}
                                                                    viewport={{ once: true, amount: 0.6 }}
                                                                    transition={{ duration: 1.2, delay: d.delay, ease: [0.16, 1, 0.3, 1] }}
                                                                />
                                                            ))}

                                                            <motion.g
                                                                initial={{ opacity: 0 }}
                                                                whileInView={{ opacity: 1 }}
                                                                viewport={{ once: true, amount: 0.6 }}
                                                                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                                            >
                                                                {labels}
                                                            </motion.g>
                                                        </motion.svg>
                                                    );
                                                })()}
                                            </div>

                                            <p className="mt-10 text-[13px] leading-relaxed text-[#D6D0C6]/70">
                                                This distribution quantifies the creative's psychological surface area, identifying which aspiration levers are being engaged to command consumer compliance.
                                            </p>
                                        </div>

                                        {/* Strategic Posture */}
                                        <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] p-12 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-8">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-[#D4A574] font-mono">Strategic Posture</p>
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6D0C6]/45">Field_Map</span>
                                            </div>

                                            <p className="text-[14px] leading-relaxed text-[#D6D0C6]/70">
                                                {firstSentence((dossier as any)?.archetype_mapping?.target_posture) || 'Icon Maintenance — the brand is not challenging for position or disrupting the category; it is asserting the permanence of an already-won cultural throne'}
                                            </p>

                                            <div className="mt-10 flex items-center justify-center">
                                                {(() => {
                                                    const size = 280;
                                                    const cx = size / 2;
                                                    const cy = size / 2;
                                                    const r1 = 92;
                                                    const r2 = 60;
                                                    const r3 = 28;

                                                    // Optional coordinates: { dominance: -1..1, emotional: -1..1 }
                                                    const coords = ((dossier as any)?.archetype_mapping?.posture_coordinates || null) as any;
                                                    const dx = typeof coords?.dominance === 'number' ? Math.max(-1, Math.min(1, coords.dominance)) : 0.15;
                                                    const dy = typeof coords?.emotional === 'number' ? Math.max(-1, Math.min(1, coords.emotional)) : 0.18;
                                                    const px = cx + dx * 62;
                                                    const py = cy - dy * 62;

                                                    return (
                                                        <svg width="280" height="280" viewBox={`0 0 ${size} ${size}`}>
                                                            <circle cx={cx} cy={cy} r={r1} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                                                            <circle cx={cx} cy={cy} r={r2} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                                                            <circle cx={cx} cy={cy} r={r3} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                                                            <line x1={cx - r1} y1={cy} x2={cx + r1} y2={cy} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                                                            <line x1={cx} y1={cy - r1} x2={cx} y2={cy + r1} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                                                            <circle cx={px} cy={py} r={5} fill="#D4A574" />
                                                            <circle cx={px} cy={py} r={14} fill="rgba(212,165,116,0.12)" />

                                                            <text x={cx} y={cy - r1 - 18} textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="3" fill="rgba(212,165,116,0.65)">EMOTIONAL</text>
                                                            <text x={cx} y={cy + r1 + 28} textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="3" fill="rgba(212,165,116,0.65)">RATIONAL</text>
                                                            <text x={cx - r1 - 34} y={cy + 4} textAnchor="start" fontSize="10" fontWeight="600" letterSpacing="3" fill="rgba(212,165,116,0.65)">SUBMISSION</text>
                                                            <text x={cx + r1 + 34} y={cy + 4} textAnchor="end" fontSize="10" fontWeight="600" letterSpacing="3" fill="rgba(212,165,116,0.65)">DOMINANCE</text>
                                                        </svg>
                                                    );
                                                })()}
                                            </div>
                                        </div>

                                        {/* Persuasion Density */}
                                        <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] p-12 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-8">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-[#D4A574] font-mono">Persuasion Density</p>
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6D0C6]/45">Compression</span>
                                            </div>

                                            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D6D0C6]/55 font-mono">Conversion Density</p>
                                            <p className="mt-6 max-w-[60ch] text-[13px] leading-relaxed text-[#D6D0C6]/70">
                                                Measures the creative's informational compression, how efficiently it transfers brand signal into consumer memory structures.
                                            </p>

                                            <div className="mt-10 flex justify-center text-[72px] font-semibold leading-none tracking-tighter text-[#D4A574]">
                                                {typeof persuasionDensity === 'number' ? (
                                                    <>
                                                        <CountUpPercent value={Math.round(persuasionDensity)} />%
                                                    </>
                                                ) : (
                                                    '—'
                                                )}
                                            </div>

                                            <div className="mt-10 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                                                <div
                                                    className="h-full bg-[#D4A574] shadow-[0_0_16px_rgba(212,165,116,0.25)]"
                                                    style={{ width: `${typeof persuasionDensity === 'number' ? Math.max(0, Math.min(100, Math.round(persuasionDensity))) : 0}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Cognitive Friction */}
                                        <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] p-12 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-8">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-[#D4A574] font-mono">Cognitive Friction</p>
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6D0C6]/45">Resistance</span>
                                            </div>

                                            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D6D0C6]/55 font-mono">Resistance Index</p>
                                            <p className="mt-6 max-w-[60ch] text-[13px] leading-relaxed text-[#D6D0C6]/70">
                                                Quantifies neural resistance to message adoption. Low scores indicate frictionless persuasion pathways.
                                            </p>

                                            <div className="mt-10 flex justify-center text-[72px] font-semibold leading-none tracking-tighter text-[#D4A574]">
                                                {typeof frictionScore === 'number' ? Math.round(frictionScore) : '—'}%
                                            </div>

                                            <div className="mt-10 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                                                <div
                                                    className="h-full bg-[#D4A574] shadow-[0_0_16px_rgba(212,165,116,0.25)]"
                                                    style={{ width: `${typeof frictionScore === 'number' ? Math.max(0, Math.min(100, Math.round(frictionScore))) : 0}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'BLUEPRINT' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-10">
                                    <WorkspaceTabHeader
                                        kicker="Blueprint Logic"
                                        title="Blueprint Logic: Audit & Reproducibility"
                                        intro="This section outlines the reconstruction path used to audit the route, validate constraints, and assess reproducibility."
                                    />
                                    {!blueprintData ? (
                                        <div className="flex flex-col items-center justify-center rounded-[3.5rem] border border-[#E7DED1] bg-[#FBF7EF] p-20 text-center text-[#1a1a1a]">
                                            <div className="w-16 h-16 flex items-center justify-center border border-[#D4A574]/30 bg-[#D4A574]/10 mb-8">
                                                <Sparkles className="w-6 h-6 text-[#D4A574]" />
                                            </div>
                                            <h3 className="text-[#1a1a1a] text-2xl font-semibold mb-4 tracking-tight">Blueprint Trace Offline</h3>
                                            <p className="mb-10 max-w-sm text-[13px] text-[#666] leading-relaxed">System requires route calibration to generate the audit-ready blueprint architecture.</p>
                                            
                                            {isGeneratingBlueprint && (
                                                <div className="mb-12 w-full max-w-md border border-[#d4c9b8] p-10 bg-white shadow-2xl">
                                                    <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] mb-8 font-mono">
                                                        <span>{BLUEPRINT_STEPS[blueprintStep]}</span>
                                                        <span>{blueprintProgress}%</span>
                                                    </div>
                                                    <div className="h-[2px] w-full bg-white">
                                                        <div
                                                            className="h-full bg-[#D4A574] shadow-[0_0_10px_rgba(212,165,116,0.25)] transition-all duration-700"
                                                            style={{ width: `${blueprintProgress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <button
                                                onClick={handleGenerateBlueprint}
                                                disabled={isGeneratingBlueprint || !extraction}
                                                className="bg-[#D4A574] text-black px-12 py-5 text-[11px] font-semibold tracking-[0.4em] uppercase hover:bg-white transition-all disabled:opacity-50 active:scale-95 shadow-[0_0_15px_rgba(212,165,116,0.2)]"
                                            >
                                                {isGeneratingBlueprint ? 'Generating Architecture...' : 'Initiate Blueprint'}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-12">
                                            <div className="flex flex-col gap-8 rounded-[3rem] border border-[#E7DED1] bg-[#FBF7EF] p-12 text-[#1a1a1a] md:flex-row md:items-center md:justify-between shadow-2xl">
                                                <div>
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4A574]">Blueprint Trace Active · Vault Index</p>
                                                    <p className="mt-2 text-[13px] leading-relaxed text-[#666]">Indexed for reproducibility and multi-agent audit.</p>
                                                </div>
                                                <button
                                                    onClick={handleGenerateBlueprint}
                                                    disabled={isGeneratingBlueprint}
                                                    className="flex items-center gap-4 rounded-full border border-[#D4A574] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] transition-all hover:bg-[#D4A574] hover:text-black disabled:opacity-50"
                                                >
                                                    {isGeneratingBlueprint ? 'Refreshing...' : 'Refresh Trace'}
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 gap-12">
                                                <div className="rounded-[3rem] border border-[#E7DED1] bg-[#FBF7EF] p-12 text-[#1a1a1a] shadow-xl">
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4A574] mb-6 border-b border-[#E7DED1] pb-6">Blueprint Trace Active</p>
                                                    <p className="mb-8 max-w-[70ch] text-[13px] leading-relaxed text-[#666]">
                                                        Reconstruction logic below provides an auditable handoff from diagnosis to execution framing.
                                                    </p>
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
                                                        <div className="rounded-[1.75rem] border border-[#E7DED1] bg-white/70 p-5">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">Subject</p>
                                                            <p className="mt-2 text-[13px] leading-relaxed text-[#444]">{firstSentence(blueprintData.execution_constraints?.primary_trigger) || 'Primary subject lock captured from forensic route.'}</p>
                                                        </div>
                                                        <div className="rounded-[1.75rem] border border-[#E7DED1] bg-white/70 p-5">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">Setting</p>
                                                            <p className="mt-2 text-[13px] leading-relaxed text-[#444]">{firstSentence(blueprintData.technical_specs?.material_cues?.[0]) || 'Controlled studio context with minimal environmental noise.'}</p>
                                                        </div>
                                                        <div className="rounded-[1.75rem] border border-[#E7DED1] bg-white/70 p-5">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]">Lighting</p>
                                                            <p className="mt-2 text-[13px] leading-relaxed text-[#444]">{firstSentence(blueprintData.technical_specs?.lighting_architecture) || 'Soft, directional lighting architecture retained from route.'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-[2.75rem] border border-[#E7DED1] bg-white/60 p-10 shadow-inner">
                                                        <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#544b3f] selection:bg-[#D4A574]/30">
                                                            {blueprintData.verified_dna_prompt}
                                                        </pre>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="rounded-[2.75rem] border border-[#E7DED1] bg-[#FBF7EF] p-10">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4A574] mb-8 border-b border-[#E7DED1] pb-4">Primary Trigger</p>
                                                        <p className="text-[20px] font-semibold leading-tight text-[#1a1a1a] tracking-[-0.01em]">{blueprintData.execution_constraints?.primary_trigger}</p>
                                                        <div className="mt-8 space-y-3">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#999]">Mechanism</p>
                                                            <ul className="space-y-2">
                                                                <li className="flex gap-2 text-[13px] leading-relaxed text-[#555]"><span className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-[#D4A574]" />Desire transfer routes from subject value to product object.</li>
                                                                <li className="flex gap-2 text-[13px] leading-relaxed text-[#555]"><span className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-[#D4A574]" />Gaze vector and composition reinforce aspirational authority.</li>
                                                                <li className="flex gap-2 text-[13px] leading-relaxed text-[#555]"><span className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-[#D4A574]" />Chromatic continuity holds narrative pressure through the frame.</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-[2.75rem] border border-[#E7DED1] bg-[#FBF7EF] p-10">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#999] mb-8 border-b border-[#E7DED1] pb-4">Aesthetic Architecture</p>
                                                        <ul className="space-y-3">
                                                            <li className="flex gap-2 text-[13px] leading-relaxed text-[#555]"><span className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-[#aaa]" />{firstSentence(blueprintData.technical_specs?.lighting_architecture) || 'Lighting architecture captured in route trace.'}</li>
                                                            <li className="flex gap-2 text-[13px] leading-relaxed text-[#555]"><span className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-[#aaa]" />{firstSentence(blueprintData.technical_specs?.gaze_vector) || 'Gaze topology remains controlled and directional.'}</li>
                                                            <li className="flex gap-2 text-[13px] leading-relaxed text-[#555]"><span className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-[#aaa]" />{firstSentence(blueprintData.technical_specs?.material_cues?.join(', ')) || 'Material cues preserve surface authority and status coding.'}</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="rounded-[3rem] border border-[#E7DED1] bg-[#FBF7EF] p-12">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                        <div className="space-y-8">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-8 h-8 flex items-center justify-center border border-[#D4A574] bg-[#D4A574] text-black">
                                                                    <Check className="w-4 h-4" />
                                                                </div>
                                                                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4A574]">Retention Protocol</span>
                                                            </div>
                                                            <div className="space-y-3">
                                                                {(blueprintData.execution_constraints?.must_include || []).map((item: string, i: number) => (
                                                                    <div key={`inc-${i}`} className="rounded-[1.75rem] border border-[#E7DED1] bg-[#FBF7EF] p-4 hover:border-[#D4A574]/40 transition-all">
                                                                        <p className="text-[12px] font-semibold text-[#666] leading-relaxed">• {item}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-8">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-8 h-8 flex items-center justify-center border border-[#c0b5a4] bg-white text-[#aaa]">
                                                                    <X className="w-4 h-4" />
                                                                </div>
                                                                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#aaa]">Negation Protocol</span>
                                                            </div>
                                                            <div className="space-y-3">
                                                                {(blueprintData.execution_constraints?.must_not_include || []).map((item: string, i: number) => (
                                                                    <div key={`exc-${i}`} className="rounded-[1.5rem] border border-[#e8ddd0] bg-white/85 p-4">
                                                                        <p className="text-[12px] text-[#7a7267] leading-relaxed">• {item}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* REMIXES AND VARIANTS */}
                                                {blueprintData.ad_copy_remixes && blueprintData.ad_copy_remixes.length > 0 && (
                                                    <div className="space-y-10">
                                                        <div className="flex items-center gap-6">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4A574]">Forensic Copy Remixes</p>
                                                            <div className="h-px flex-1 bg-[#f5f0e8]"></div>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            {blueprintData.ad_copy_remixes.map((remix: any, i: number) => (
                                                                <div key={i} className="rounded-[2.75rem] border border-[#E7DED1] bg-[#FBF7EF] p-10 transition-all hover:border-[#D4A574]/40 shadow-xl group">
                                                                    <p className="mb-4 border-b border-[#e8ddd0] pb-4 text-[9px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] font-mono">{remix.angle}</p>
                                                                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#999] mb-3">Intent Angle</p>
                                                                    <p className="text-[17px] font-semibold leading-tight text-[#1a1a1a]/85 group-hover:text-[#1a1a1a] transition-colors tracking-[-0.01em]">
                                                                        "{remix.copy}"
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {blueprintData.visual_variant_prompts && blueprintData.visual_variant_prompts.length > 0 && (
                                                    <div className="space-y-10">
                                                        <div className="flex items-center gap-6">
                                                            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#aaa]">Adaptation Trace Variants</p>
                                                            <div className="h-px flex-1 bg-[#f5f0e8]"></div>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-10">
                                                            {blueprintData.visual_variant_prompts.map((variant: any, i: number) => (
                                                                <div key={i} className="rounded-[3rem] border border-[#E7DED1] bg-[#FBF7EF] p-12 transition-all hover:bg-white/[0.07] shadow-3xl">
                                                                    <div className="flex items-center justify-between mb-8 border-b border-[#E7DED1] pb-6">
                                                                        <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4A574]">{variant.concept}</span>
                                                                        <span className="text-[10px] font-semibold text-[#b4aa9c] tracking-[0.24em] uppercase">Variant 0{i+1}</span>
                                                                    </div>
                                                                    <div className="border border-[#e8ddd0] bg-white/90 p-10 shadow-inner">
                                                                        <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#6d6559] selection:bg-[#D4A574]/30">
                                                                            {variant.prompt}
                                                                        </pre>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'STRESS LAB' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-10">
                                    <WorkspaceTabHeader
                                        kicker="Causal Intelligence"
                                        title="Stress Lab: Causal Intelligence"
                                        intro="This section outlines experimental stress testing on key creative variables, measuring response variance and structural durability."
                                    />
                                    <div className="rounded-[3rem] border border-white/10 bg-[#1A1A1A] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                        <div className="grid grid-cols-[1fr_1.7fr_0.7fr_0.7fr] border-b border-white/12 bg-[#151310] text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4A574]">
                                            <div className="px-8 py-5 border-r border-white/10">Variable</div>
                                            <div className="px-8 py-5 border-r border-white/10 text-center">Baseline</div>
                                            <div className="px-8 py-5 border-r border-white/10 text-center">Predicted Lift</div>
                                            <div className="px-8 py-5 text-center">Recommendation</div>
                                        </div>
                                        <div className="divide-y divide-white/10">
                                            {(stressLabRows || []).map((row, i) => (
                                                <div key={i} className="grid grid-cols-[1fr_1.7fr_0.7fr_0.7fr] items-center bg-[#171513] group hover:bg-[#211d18] transition-colors">
                                                    <div className="relative px-8 py-7">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E3DBCE] group-hover:text-[#D4A574] transition-colors">{row.variable}</p>
                                                        <span className="pointer-events-none absolute right-0 top-1/2 h-20 w-px -translate-y-1/2 bg-white/10" />
                                                    </div>
                                                    <div className="relative px-8 py-7 text-center">
                                                        <p className="text-[13px] font-medium text-[#F3F1ED] leading-relaxed">{row.currentState}</p>
                                                        <span className="pointer-events-none absolute right-0 top-1/2 h-20 w-px -translate-y-1/2 bg-white/10" />
                                                    </div>
                                                    <div className="relative px-8 py-7 text-center">
                                                        <span className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${row.predictedLift === 'High' ? 'text-[#D4A574]' : row.predictedLift === 'Medium' ? 'text-[#E3DBCE]' : 'text-[#CFC6B8]'}`}>
                                                            {row.predictedLift}
                                                        </span>
                                                        <span className="pointer-events-none absolute right-0 top-1/2 h-20 w-px -translate-y-1/2 bg-white/10" />
                                                    </div>
                                                    <div className="px-8 py-7 text-center">
                                                        <span className={`inline-block border px-6 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] ${
                                                            row.recommendation === 'Test'
                                                                ? 'border-[#D4A574] text-[#D4A574] bg-[#D4A574]/5'
                                                                : row.recommendation === 'Avoid'
                                                                    ? 'border-[#b77868]/65 text-[#dfb1a5] bg-[#2a1a17]'
                                                                    : 'border-[#D6D0C6]/40 text-[#E3DBCE] bg-white/[0.04]'
                                                        }`}>
                                                            {row.recommendation}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid gap-6 xl:grid-cols-2">
                                        <div className="rounded-[2.75rem] border border-white/10 bg-[#151310] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                            <p className="mb-6 border-b border-white/10 pb-5 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#D4A574]">
                                                Variable Diagnostics
                                            </p>
                                            <div className="space-y-3 text-[13px] leading-relaxed text-[#D6D0C6]/82">
                                                <p className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-4 py-3"><span className="text-[#F3F1ED] font-semibold">Composition Emphasis:</span> The brand asserts cultural status through controlled visual posture.</p>
                                                <p className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-4 py-3"><span className="text-[#F3F1ED] font-semibold">Chromatic Intensity:</span> Current color pressure remains persuasive without over-saturation.</p>
                                                <p className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-4 py-3"><span className="text-[#F3F1ED] font-semibold">Gaze Direction:</span> Oblique address sustains intimacy without direct confrontation.</p>
                                                <p className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-4 py-3"><span className="text-[#F3F1ED] font-semibold">Copy Compression:</span> Heritage messaging carries effectively with room for selective tightening.</p>
                                                <p className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-4 py-3"><span className="text-[#F3F1ED] font-semibold">CTA Prominence:</span> Product-scale authority is currently doing the conversion work.</p>
                                            </div>
                                        </div>

                                        <div className="rounded-[2.75rem] border border-white/10 bg-[#151310] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                            <p className="mb-6 border-b border-white/10 pb-5 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#D4A574]">
                                                Gaze Direction Breakdown
                                            </p>
                                            <div className="space-y-3 text-[13px] leading-relaxed text-[#D6D0C6]/82">
                                                <p className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-4 py-3"><span className="text-[#F3F1ED] font-semibold">Positioning:</span> Upper-center frame priority with directional control.</p>
                                                <p className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-4 py-3"><span className="text-[#F3F1ED] font-semibold">Direction:</span> Oblique vector maintains aspirational distance.</p>
                                                <p className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-4 py-3"><span className="text-[#F3F1ED] font-semibold">Tilt:</span> Slight downward bias supports mixed-mode address.</p>
                                                <p className="rounded-[1.5rem] border border-white/10 bg-[#1A1A1A] px-4 py-3"><span className="text-[#F3F1ED] font-semibold">Focus Tone:</span> Eye contrast retains focal attraction without dominance drift.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[2.75rem] border border-white/10 bg-[#151310] p-10">
                                        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4A574]">Stress Test Summary</p>
                                        <p className="max-w-[78ch] text-[13px] leading-relaxed text-[#D6D0C6]/70">
                                            These stress signals define where controlled adjustments can improve lift without destabilizing the route. Next iteration should prioritize gaze and hierarchy tests first, then validate copy and CTA compression only where structural confidence remains intact.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'DECISION LOG' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-10">
                                    <WorkspaceTabHeader
                                        kicker="Audit Trail"
                                        title="Decision Log: Audit Trail"
                                        intro="A concise record of all decisions made, providing transparency and accountability in the creative direction process."
                                    />
                                    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                                        <div className="space-y-6">
                                            <div className="rounded-[2.75rem] border border-white/10 bg-[#1A1A1A] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                <p className="mb-8 border-b border-white/10 pb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574]">
                                                    Capture Decision
                                                </p>
                                                <div className="space-y-8">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {(['Ship', 'Revise', 'Kill'] as const).map((v) => (
                                                            <button
                                                                key={v}
                                                                onClick={() => setDecisionVerdict(v)}
                                                                className={`border px-6 py-5 text-[13px] font-semibold uppercase tracking-[0.26em] transition-all ${
                                                                    decisionVerdict === v
                                                                        ? 'border-[#D4A574] bg-[#D4A574] text-black'
                                                                        : 'border-white/15 bg-[#151310] text-[#D6D0C6]/78 hover:border-[#D4A574]/35 hover:text-[#F3F1ED]'
                                                                }`}
                                                            >
                                                                <span className="inline-flex items-center gap-2">
                                                                    <span aria-hidden>{v === 'Ship' ? '✔' : v === 'Revise' ? '✎' : '✕'}</span>
                                                                    <span>{v}</span>
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="space-y-4">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D6D0C6]/55">Rationale for Decision</p>
                                                        <textarea
                                                            value={decisionNote}
                                                            onChange={(e) => setDecisionNote(e.target.value)}
                                                            rows={6}
                                                            className="w-full border border-white/10 bg-[#151310] p-6 text-[13px] leading-relaxed text-[#D6D0C6]/70 outline-none placeholder:text-[#D6D0C6]/45 focus:border-[#D4A574]/40 transition-colors"
                                                            placeholder="Enter reasoning for this decision..."
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={handleLogDecision}
                                                        className="w-full border border-[#D4A574]/30 bg-[#151310] py-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] transition-all hover:border-[#D4A574] hover:bg-[#D4A574] hover:text-black active:scale-[0.98]"
                                                    >
                                                        Commit to Audit Log
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="rounded-[2.75rem] border border-white/10 bg-[#1A1A1A] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                                <div className="mb-8 flex items-center justify-between gap-6 border-b border-white/10 pb-5">
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574]">Decision Shorthand Summary</p>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(decisionSummaryText)}
                                                        className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6D0C6]/55 hover:text-[#D4A574] transition-colors"
                                                    >
                                                        Copy Summary
                                                    </button>
                                                </div>
                                                <div className="border border-white/10 bg-[#151310] p-8">
                                                    <div className="grid grid-cols-12 border-b border-white/10 pb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D6D0C6]/55">
                                                        <p className="col-span-4">Field</p>
                                                        <p className="col-span-8">Value</p>
                                                    </div>
                                                    <div className="grid grid-cols-12 border-b border-white/10 py-4 text-[13px]">
                                                        <p className="col-span-4 font-semibold uppercase tracking-[0.2em] text-[#D6D0C6]/58">Timestamp</p>
                                                        <p className="col-span-8 text-[#D6D0C6]/70">{decisionSummaryTimestamp}</p>
                                                    </div>
                                                    <div className="grid grid-cols-12 border-b border-white/10 py-4 text-[13px]">
                                                        <p className="col-span-4 font-semibold uppercase tracking-[0.2em] text-[#D6D0C6]/58">Verdict</p>
                                                        <p className="col-span-8 font-semibold uppercase text-[#D4A574]">{decisionVerdict || 'Pending'}</p>
                                                    </div>
                                                    <div className="grid grid-cols-12 pt-4">
                                                        <p className="col-span-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6D0C6]/58">Operating Status</p>
                                                        <p className="col-span-8 text-[16px] font-semibold leading-tight text-[#F3F1ED]">{integratedRecommendation.recommendedDirection}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-[2.75rem] border border-white/10 bg-[#1A1A1A] p-10 text-[#F3F1ED] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                                            <p className="mb-8 border-b border-white/10 pb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D4A574]">Decision History</p>
                                            <div className="custom-scrollbar max-h-[800px] space-y-4 overflow-y-auto pr-4">
                                                {decisionLogEntries.length > 0 ? (
                                                    decisionLogEntries.map((entry) => (
                                                        <div key={entry.id} className="rounded-[2rem] border border-white/10 bg-[#151310] p-8 transition-all hover:border-[#D4A574]/30">
                                                            <div className="mb-6 flex items-center justify-between">
                                                                <span
                                                                    className={`inline-block border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] ${
                                                                        entry.verdict === 'Ship'
                                                                            ? 'border-[#D4A574]/60 text-[#D4A574] bg-[#D4A574]/10'
                                                                            : entry.verdict === 'Revise'
                                                                                ? 'border-white/30 text-[#D6D0C6]/80 bg-white/5'
                                                                                : 'border-red-500/40 text-red-300 bg-red-500/10'
                                                                    }`}
                                                                >
                                                                    {entry.verdict}
                                                                </span>
                                                                <span className="text-[10px] font-semibold text-[#D6D0C6]/45">
                                                                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} //{' '}
                                                                    {new Date(entry.timestamp).toLocaleDateString([], { day: '2-digit', month: 'short' })}
                                                                </span>
                                                            </div>
                                                            <p className="text-[13px] font-medium leading-relaxed text-[#D6D0C6]/80">{entry.rationale}</p>
                                                            <div className="mt-6 border-t border-white/10 pt-5">
                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A574]/70">P1 Fix: {entry.p1Fix}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="border border-dashed border-white/20 bg-[#151310] p-20 text-center">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D6D0C6]/45">Log Empty</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="rounded-[2.75rem] border border-white/10 bg-[#1A1A1A] p-10 xl:col-span-2">
                                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574]/70">Audit Purpose</p>
                                            <p className="text-[13px] leading-relaxed text-[#D6D0C6]/70">
                                                This log ensures every decision is documented for future reference and accountability, supporting a transparent creative process.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
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
                    <div className="absolute inset-y-0 right-0 w-full max-w-3xl overflow-y-auto border-l border-[#d4c9b8] bg-[#faf7f2] text-[#1a1a1a] shadow-2xl">
                        <div className="sticky top-0 z-10 border-b border-[#E7DED1] bg-[#faf7f2]/95 px-8 py-10 backdrop-blur-xl md:px-12">
                            <div className="flex items-start justify-between gap-12">
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
                                    className="shrink-0 border border-[#c0b5a4] bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#666] transition-all hover:border-white hover:text-[#1a1a1a] font-mono"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>

                        <div className="px-8 py-12 md:px-12">
                            <div className="rounded-[2.75rem] border border-[#E7DED1] bg-[#FBF7EF] p-10 shadow-2xl">
                                <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
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
                                    <div className="mt-12 rounded-[2.5rem] border border-[#E7DED1] bg-[#FBF7EF] p-8">
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
                                <div className="mt-12 space-y-8">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] font-mono mb-4 border-b border-[#e8ddd0] pb-3">Extracted Mechanism</p>
                                            <p className="text-[14px] leading-relaxed text-[#444] uppercase font-bold font-mono">{cloneData?.extracted_mechanism}</p>
                                        </div>
                                        <div className="rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] font-mono mb-4 border-b border-[#e8ddd0] pb-3">Deployment Principle</p>
                                            <p className="text-[14px] leading-relaxed text-[#444] uppercase font-bold font-mono">{cloneData?.deployment_principle}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        {(cloneData?.concepts || []).map((concept, index) => (
                                            <article key={`${concept.title}-${index}`} className="rounded-[2.75rem] border border-[#E7DED1] bg-[#FBF7EF] p-10 shadow-2xl transition-all hover:bg-white/[0.07]">
                                                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-8">
                                                    <div>
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D4A574] font-mono mb-4">
                                                            Route Phase // {(concept.concept_id || index + 1).toString().padStart(2, '0')}
                                                        </p>
                                                        <h3 className="text-[32px] font-semibold uppercase tracking-tightest text-[#1a1a1a] leading-none">{concept.title}</h3>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <span className="border border-[#D4A574]/30 bg-[#D4A574]/10 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] font-mono">
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

                                                <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-[#151310] p-8">
                                                    <div className="flex items-center justify-between gap-4 mb-6 border-b border-[#E7DED1] pb-4">
                                                        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4A574] font-mono">Handoff DNA Prompt</p>
                                                        <button
                                                            onClick={() => void handleCopyPrompt(concept.dna_prompt, index)}
                                                            className="flex items-center gap-2 border border-[#D4A574]/40 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D4A574] hover:bg-[#D4A574] hover:text-black transition-all font-mono"
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                            {copiedPromptIndex === index ? 'COPIED' : 'COPY'}
                                                        </button>
                                                    </div>
                                                    <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#aaa] font-mono selection:bg-[#D4A574]/30">
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
