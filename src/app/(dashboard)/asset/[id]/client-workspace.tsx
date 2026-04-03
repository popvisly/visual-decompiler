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
import WorkspaceTabHeader from '@/components/WorkspaceTabHeader';

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

const withSeverity = (items: string[], order: ConstraintSeverity[]): ConstraintItem[] =>
    items
        .map((item) => item?.trim())
        .filter(Boolean)
        .map((text, index) => ({
            text,
            severity: order[index] || order[order.length - 1] || 'optional',
        }));

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
                <div className="rounded-3xl border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6]">
                    <div className="mb-4 flex items-center justify-between border-b border-[#4E3D2A] pb-4">
                        <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">{title}</h3>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#B9B19F]">Forensic Map v2.0</span>
                    </div>

                    {/* Overture */}
                    {overture && (
                        <div className="max-h-[400px] overflow-y-auto">
                            <p className="text-[12px] leading-relaxed text-[#B9B19F]">
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
                                    ? 'forensic-act-block min-h-[320px] xl:min-h-[360px] scroll-mt-24'
                                    : 'min-h-[220px] xl:min-h-[240px]'
                            } ${
                                type === 'ACT' && activeAct === block.label
                                    ? 'border-[#6B5337] bg-[#1F1F1F]'
                                    : 'border-[#4E3D2A] bg-[#1F1F1F]'
                            }`}
                        >
                            {type === 'ACT' ? (
                                <>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`w-2 h-2 rounded-full transition-all ${activeAct === block.label ? 'bg-[#D4A882] shadow-[0_0_14px_rgba(212,168,130,0.45)]' : 'bg-[#D4A882]/75'}`} />
                                        <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4A882]">{block.label}</span>
                                    </div>
                                    <h3 className="border-b border-[#4E3D2A] pb-4 text-[2rem] font-bold uppercase tracking-tight text-[#F3F1ED] md:text-[2.5rem]">
                                        {block.title}
                                    </h3>
                                    <AnalyticWaveMap index={i} isActive={activeAct === block.label} />
                                    <div className="flex-1 pt-1">
                                        <div className="max-w-[62ch] space-y-4">
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
                                    <h3 className="border-b border-[#4E3D2A] pb-5 text-[1.75rem] font-bold uppercase tracking-tight text-[#F3F1ED] md:text-[2rem]">
                                        {block.title}
                                    </h3>
                                    <div className="flex-1 pt-6">
                                        <div className="max-w-[62ch] space-y-4">
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
                    --vault-content-pad-x: clamp(16px, 2vw, 32px);
                    --analysis-right-max: 880px;
                    --analysis-text-measure: 62ch;
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

                @media (min-width: 1024px) {
                    .vault-analysis-frame {
                        display: grid;
                        grid-template-columns: minmax(420px, 560px) minmax(680px, 1fr);
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
                        --vault-content-pad-x: clamp(24px, 2.4vw, 40px);
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
                                <div className="mt-4 flex flex-wrap gap-3">
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

            <div className="screen-layout w-full min-h-screen bg-[#FBFBF6]">
                <div className="vault-analysis-shell min-h-screen w-full bg-[#FBFBF6] text-[#1A1A1A]">
                    <div className="min-h-screen w-full bg-[#FBFBF6] border-x border-[#D4A574]/10 shadow-[0_0_80px_rgba(0,0,0,0.03)] text-[#1A1A1A]">
                    {sampleMode && (
                        <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-[#E6DDCF] bg-[#FBFBF6]/96 px-5 py-4 backdrop-blur-md md:px-8">
                            <a href="/" className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513]">
                                Visual Decompiler
                            </a>
                            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1A1A1A]/48">
                                Sample Dossier
                            </span>
                            <a
                                href="/ingest"
                                className="inline-flex items-center rounded-full border border-[#D4A574]/30 bg-[#FFFCF7] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#151310] transition-colors hover:bg-[#2A2A2A]"
                            >
                                Start Decompiling Free
                            </a>
                        </div>
                    )}
                    <div className="vault-analysis-frame">

                    {/* LEFT COLUMN: Sticky Media Viewer (45%) */}
                    <aside className={`vault-analysis-asset-rail w-full border-r border-[#D4A574]/20 relative bg-[#FBFBF6] lg:sticky ${sampleMode ? 'lg:top-[66px]' : 'lg:top-0'} z-10`}>
                        <div className="flex flex-col items-center justify-center px-[clamp(16px,2vw,32px)] pt-10 pb-8 lg:pt-14">

                            <div 
                                className={`w-full max-w-[480px] aspect-[4/5] relative flex items-center justify-center overflow-hidden border border-[#D4A574]/30 bg-[#FFFCF7] group rounded-2xl shadow-2xl transition-all duration-1000 ${activeTab === 'SIGNALS' && showRadiant ? 'brightness-75 saturate-50' : ''}`}
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
                                    <div className="absolute top-4 left-4 bg-[#FFFCF7]/90 border border-[#D4A574]/40 px-3 py-1 backdrop-blur-sm rounded-none">
                                        <span className="text-[9px] uppercase tracking-widest text-[#D4A574]">{asset.type}</span>
                                    </div>
                                )}
                            </div>

                            <div className="w-full mt-6 border-b border-[#E6DDCF] pb-4">
                                <div className="mb-4">
                                    <h1 className="text-2xl font-light tracking-tightest text-[#9B8662] uppercase">{asset.brand?.name}</h1>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4A574]">{asset.brand?.market_sector}</span>
                                </div>
                                {sampleMode ? (
                                    <div className="rounded-[1.5rem] border border-[#D4A574]/18 bg-[#FFFCF7] px-5 py-5 text-[#151310]">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Sample access</p>
                                        <p className="mt-3 text-[13px] leading-relaxed text-[#6A6257]">This is a live sample dossier.</p>
                                        <p className="mt-2 text-[13px] leading-relaxed text-[#6A6257]">Create your own in under 60 seconds.</p>
                                        <a
                                            href="/ingest"
                                            className="mt-5 inline-flex items-center rounded-full bg-[#D4A574] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#141414] transition-colors hover:bg-[#c8955b]"
                                        >
                                            Start Decompiling Free
                                        </a>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-3 flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Next best action</p>
                                                <p className="mt-2 text-[12px] leading-relaxed text-[#6A6257]">
                                                    Compare this against a second route, then move the strongest direction into a board or export.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-4 grid items-start gap-[clamp(12px,1vw,18px)] md:grid-cols-2 xl:grid-cols-3">
                                            <div className="rounded-[1.25rem] border border-[#E6DDCF] bg-[#FFFCF7] px-4 py-4 min-h-[204px]">
                                                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Compare against another asset</p>
                                                <p className="mt-2 text-[12px] leading-relaxed text-[#6A6257]">
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
                                            <div className="rounded-[1.25rem] border border-[#E6DDCF] bg-[#FFFCF7] px-4 py-4 min-h-[204px]">
                                                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Save to Vault / Board</p>
                                                <p className="mt-2 text-[12px] leading-relaxed text-[#6A6257]">
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
                                            <div className="rounded-[1.25rem] border border-[#E6DDCF] bg-[#FFFCF7] px-4 py-4 min-h-[204px]">
                                                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Export summary</p>
                                                <p className="mt-2 text-[12px] leading-relaxed text-[#6A6257]">
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
                                                        className="no-print flex items-center gap-2 px-4 py-2 bg-[#FFFCF7] border border-[#D4A574]/30 text-[#D4A574] text-[10px] font-bold tracking-widest uppercase hover:bg-[#FFFCF7]/80 rounded-full transition-all"
                                                    >
                                                        <Code className="w-3 h-3" />
                                                        Copy Embed Widget
                                                        <Info className="w-3 h-3 text-[#D4A574]/70" />
                                                    </button>
                                                    <div className="pointer-events-none absolute right-0 top-full z-40 mt-3 w-[320px] rounded-[1.5rem] border border-[#D4A574]/20 bg-[#141414] p-5 text-left opacity-0 shadow-2xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 translate-y-1">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D4A574]">Embed Widget</p>
                                                        <p className="mt-3 text-[12px] leading-relaxed text-[#6A6257]">
                                                            Paste this iFrame into a client portal, strategy deck, Notion page, or internal dashboard to display a self-contained forensic intelligence panel.
                                                        </p>
                                                        <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#D4A574]/60">
                                                            Use for: client-facing reports · internal strategy decks · agency dashboards
                                                        </p>
                                                        <pre className="mt-4 overflow-x-auto rounded-2xl border border-[#D4A574]/10 bg-black/30 p-3 text-[10px] leading-relaxed text-[#151310]/75">
{`<iframe src="visualdecompiler.com/embed/${asset.id}" width="100%" height="600px" />`}
                                                        </pre>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setShowExportModal(true)}
                                                    className="no-print flex items-center gap-2 px-4 py-2 bg-[#4A4A4A] text-[#151310] text-[10px] font-bold tracking-widest uppercase hover:bg-[#FFFCF7] rounded-full transition-all"
                                                >
                                                    <FileDown className="w-3 h-3" />
                                                    Export Dossier (Print/PDF)
                                                </button>
                                            </div>
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
                            )}
                        </div>
                    </aside>

                    {showExportModal && (
                        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-6 backdrop-blur-md no-print">
                            <div className="w-full max-w-xl rounded-[2.5rem] border border-[#E6DDCF] bg-[#FFFCF7] p-10 text-[#151310] shadow-[0_32px_80px_rgba(0,0,0,0.12)]">
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
                                        className="rounded-full border border-[#D4A574]/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#9B8662] transition-all hover:bg-[#D4A574] hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleInitiateExport}
                                        className="rounded-full bg-[#D4A574] px-8 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white shadow-sm transition-all hover:bg-[#8B4513]"
                                    >
                                        Initiate Export
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* RIGHT COLUMN: Scrollable Forensic Console (55%) */}
                <div className="vault-analysis-content-rail w-full min-h-screen bg-[#FBFBF6] relative">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(rgba(212,165,116,0.05)_48px,transparent_48px),linear-gradient(90deg,rgba(212,165,116,0.05)_48px,transparent_48px)] [background-size:48px_48px]" />
                    <div className="vault-analysis-content-inner relative z-10 min-h-screen w-full bg-transparent">

                    {/* Minimalist Segmented Controls */}
                    <div className={`vault-analysis-tabbar sticky ${sampleMode ? 'top-[65px]' : 'top-0'} z-20 flex gap-6 border-b border-[#E6DDCF] bg-[#FBFBF6]/95 px-[clamp(16px,2vw,32px)] pt-8 pb-0 backdrop-blur-md md:pt-10`}>
                        {dossierTabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors relative ${activeTab === tab ? 'text-[#8B4513]' : 'text-[#1A1A1A]/50 hover:text-[#8B4513]/80'
                                    }`}
                            >
                                {DOSSIER_TAB_LABELS[tab]}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B4513]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content Area */}
                    <div className="px-[clamp(16px,2vw,32px)] py-[clamp(16px,1.6vw,28px)]">
                        {activeTab === 'QUALITY GATE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {extraction ? (
                                    <div className="space-y-10">
                                        <WorkspaceTabHeader
                                            kicker="Diagnosis Workflow"
                                            title="Decision Quality"
                                            intro="VD does not generate ads or act as an AI design app. VD judges, diagnoses, and directs creative quality."
                                        />

                                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
                                            <div className="rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 text-[#FBFBF6] shadow-[0_24px_60px_rgba(11,10,8,0.22)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Integrated Recommendation</p>
                                                <p className="mt-5 max-w-[56ch] text-[16px] leading-8 text-[#F3F1ED]">{integratedRecommendation.thesis}</p>
                                                <p className="mt-4 max-w-[58ch] text-[14px] leading-7 text-[#B9B19F]">{integratedRecommendation.whyNow}</p>
                                                <p className="mt-5 rounded-[1.5rem] border border-[#4E3D2A] bg-[#171512] px-5 py-5 text-[13px] leading-6 text-[#D6D0C6]">
                                                    {integratedRecommendation.riskRewardTension}
                                                </p>
                                                <div className="mt-6 rounded-[1.75rem] border border-[#4E3D2A] bg-[#171512] px-5 py-5">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4A574]">Operator Summary</p>
                                                    <div className="mt-4 space-y-3">
                                                        <div className="rounded-[1.25rem] border border-[#3A3027] bg-[#1E1A16] px-4 py-4">
                                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">Decision</p>
                                                            <p className="mt-2 text-[14px] leading-6 text-[#F3F1ED]">{integratedRecommendation.decision}</p>
                                                        </div>
                                                        <div className="rounded-[1.25rem] border border-[#3A3027] bg-[#1E1A16] px-4 py-4">
                                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">Primary risk</p>
                                                            <p className="mt-2 text-[14px] leading-6 text-[#F3F1ED]">{integratedRecommendation.watchouts}</p>
                                                        </div>
                                                        <div className="rounded-[1.25rem] border border-[#3A3027] bg-[#1E1A16] px-4 py-4">
                                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">Timing</p>
                                                            <p className="mt-2 text-[14px] leading-6 text-[#F3F1ED]">{integratedRecommendation.whyNow}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 border-t border-[#4E3D2A] pt-5">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">Highest-impact actions</p>
                                                        <div className="mt-4 space-y-3">
                                                            {integratedRecommendation.executionNext3.map((step, index) => (
                                                                <p key={index} className="text-[13px] leading-6 text-[#D6D0C6]">
                                                                    <span className="font-bold text-[#D4A574]">{index + 1}.</span> {step}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="rounded-[2.25rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] shadow-[0_20px_50px_rgba(11,10,8,0.2)]">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Trust Cues</p>
                                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                                        {[
                                                            ['Confidence', integratedRecommendation.confidence],
                                                            ['Evidence Strength', integratedRecommendation.evidenceStrength],
                                                            ['Assumption Load', integratedRecommendation.assumptionLoad],
                                                        ].map(([label, value]) => (
                                                            <div key={label} className="rounded-[1.25rem] border border-[#4E3D2A] bg-[#171512] px-4 py-4">
                                                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">{label}</p>
                                                                <p className="mt-2 text-[14px] leading-6 text-[#F3F1ED]">{value}</p>
                                                            </div>
                                                        ))}
                                                        <div className="rounded-[1.25rem] border border-[#4E3D2A] bg-[#171512] px-4 py-4 sm:col-span-2">
                                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">Known Unknowns</p>
                                                            <p className="mt-2 text-[14px] leading-6 text-[#F3F1ED]">
                                                                {integratedRecommendation.knownUnknowns.join(' ')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 border-t border-[#4E3D2A] pt-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">Based on</p>
                                                        <p className="mt-2 text-[13px] leading-6 text-[#B9B19F]">
                                                            Blueprint trace, friction, persuasion density, gaze routing, and comparative memory.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="rounded-[2.25rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] shadow-[0_20px_50px_rgba(11,10,8,0.2)]">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Module Scores</p>
                                                    <div className="mt-4 space-y-3">
                                                        {integratedRecommendation.moduleScores.map((score) => (
                                                            <div key={score.label} className="rounded-[1.25rem] border border-[#4E3D2A] bg-[#171512] px-4 py-4">
                                                                <div className="flex items-center justify-between gap-4">
                                                                    <p className="text-[13px] font-semibold text-[#F3F1ED]">{score.label}</p>
                                                                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">{score.score}/5</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="rounded-[2.25rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] shadow-[0_20px_50px_rgba(11,10,8,0.2)]">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Fact vs Inference</p>
                                                    <div className="mt-4 grid gap-4">
                                                        <div className="rounded-[1.25rem] border border-[#4E3D2A] bg-[#171512] px-4 py-4">
                                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">Facts</p>
                                                            <div className="mt-3 space-y-2">
                                                                {integratedRecommendation.facts.map((fact, index) => (
                                                                    <p key={index} className="text-[13px] leading-6 text-[#D6D0C6]">
                                                                        <span className="font-bold text-[#D4A574]">{index + 1}.</span> {fact}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-[1.25rem] border border-[#4E3D2A] bg-[#171512] px-4 py-4">
                                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4A574]">Inferences</p>
                                                            <div className="mt-3 space-y-2">
                                                                {integratedRecommendation.inferences.map((inference, index) => (
                                                                    <p key={index} className="text-[13px] leading-6 text-[#D6D0C6]">
                                                                        <span className="font-bold text-[#D4A574]">{index + 1}.</span> {inference}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="rounded-[2.25rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] shadow-[0_20px_50px_rgba(11,10,8,0.2)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Verdict</p>
                                                <h3 className="mt-4 text-[2.2rem] font-semibold leading-none tracking-tight text-[#F3F1ED] md:text-[2.8rem]">
                                                    {qualityVerdict}
                                                </h3>
                                                <p className="mt-4 max-w-[62ch] text-[14px] leading-7 text-[#B9B19F]">
                                                    Final call on whether this creative is working strongly enough to preserve, refine, or replace at native review width.
                                                </p>
                                                <div className="mt-6 rounded-[1.5rem] border border-[#4E3D2A] bg-[#171512] px-5 py-5">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Confidence Score</p>
                                                    <div className="mt-3 flex items-end gap-1">
                                                        <span className="text-4xl font-semibold tracking-tight text-[#F3F1ED]">
                                                            {confidenceScore ?? '—'}
                                                        </span>
                                                        <span className="pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">/100</span>
                                                    </div>
                                                </div>
                                                <p className="mt-5 max-w-[58ch] text-[14px] leading-7 text-[#D6D0C6]">
                                                    We don&apos;t generate ads. We judge, diagnose, and direct quality.
                                                </p>
                                            </div>

                                            <div className="rounded-[2.25rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] shadow-[0_20px_50px_rgba(11,10,8,0.2)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Top 3 Failure Reasons</p>
                                                <div className="mt-5 space-y-4">
                                                    {failureReasons.map((reason, index) => (
                                                        <div key={`${reason.title}-${index}`} className="rounded-[1.4rem] border border-[#4E3D2A] bg-[#171512] px-5 py-5">
                                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">{reason.title}</p>
                                                            <p className="mt-3 text-[14px] leading-6 text-[#D6D0C6]">{reason.detail}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-[2.25rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] shadow-[0_20px_50px_rgba(11,10,8,0.2)]">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Fix Priority Order</p>
                                            <div className="mt-5 grid gap-4 lg:grid-cols-2">
                                                {fixPriorities.map((item, index) => (
                                                    <div key={item.priority} className={`rounded-[1.4rem] border border-[#4E3D2A] bg-[#171512] px-5 py-5 ${index === fixPriorities.length - 1 ? 'lg:col-span-2' : ''}`}>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">{item.priority}</p>
                                                        <p className="mt-3 text-[15px] font-semibold tracking-tight text-[#F3F1ED]">{item.title}</p>
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
                                            kicker="Strategic Readout"
                                            title="Forensic Intelligence Overview"
                                            intro="A consolidated strategic read of this asset: core mechanic, persuasion structure, and the clearest path to action."
                                        />
                                        {(!extraction.primary_mechanic || !extraction.full_dossier) && <SovereignProcessingView assetId={asset.id} agency={agency} />}
                                        {extraction.primary_mechanic && extraction.full_dossier && (
                                             <>
                                                 {/* Unified Primary Intelligence Metric - REFINED SCALE */}
                                                 <div className="mb-6 flex w-full flex-col gap-6 rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 text-[#FBFBF6] lg:flex-row lg:items-center">
                                                     {/* Left: Primary Mechanic */}
                                                     <div className="flex-1">
                                                         <div className="mb-6 flex items-center justify-between border-b border-[#D4A574]/18 pb-4">
                                                             <div className="flex items-center gap-3">
                                                                 <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4A574]/10">
                                                                     <div className="h-2 w-2 rounded-full bg-[#D4A574]" />
                                                                 </div>
                                                                 <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Primary Mechanic</span>
                                                             </div>
                                                             <InfoButton section="PRIMARY_MECHANIC" />
                                                         </div>
                                                         <div className="max-w-[70ch]">
                                                            <h2 className="border-l-[3px] border-[#D4A574] py-1 pl-6 text-xl font-bold leading-relaxed tracking-tight text-[#F3F1ED] selection:bg-[#D4A574]/20 md:text-2xl">
                                                                {extraction.primary_mechanic}
                                                            </h2>
                                                         </div>
                                                     </div>

                                                     {/* Vertical Divider (Desktop Only) */}
                                                     <div className="mx-8 hidden h-32 w-[1px] bg-[#D4A574]/18 lg:block" />

                                                     {/* Right: System Confidence */}
                                                      <div className="w-full lg:w-72 flex flex-col h-full">
                                                          <div className="mb-6 flex items-center justify-between border-b border-[#D4A574]/18 pb-4">
                                                              <div className="flex items-center gap-3">
                                                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4A574]/10">
                                                                      <div className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
                                                                  </div>
                                                                  <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Confidence Score</span>
                                                              </div>
                                                              <InfoButton section="SYSTEM_CONFIDENCE" />
                                                          </div>
                                                          <div className="flex flex-col gap-4">
                                                              <div className="flex items-baseline gap-1 text-5xl font-sans font-bold tracking-tighter text-[#F3F1ED]">
                                                                  {extraction.confidence_score <= 1 ? Math.round(extraction.confidence_score * 100) : extraction.confidence_score}
                                                                  <span className="text-[18px] text-[#D4A574] font-medium uppercase tracking-widest">/100</span>
                                                              </div>
                                                              <p className="text-[11px] italic leading-relaxed text-[#B9B19F]">
                                                                  AI-weighted validation based on semiotic signal strength and cross-correlational data integrity.
                                                              </p>
                                                          </div>
                                                      </div>
                                                 </div>

                                            </>
                                        )}

                                        {!isExecutiveSummary && (
                                            <div className="space-y-12">
                                        {/* Top 4 Extraction Metrics as Intelligence Cards */}
                                        <div className="grid grid-cols-1 items-start gap-[clamp(12px,1vw,18px)] pb-2 xl:grid-cols-3">
                                            


                                            {/* Visual Style */}
                                            <div className="col-span-1 flex min-h-[120px] flex-col rounded-3xl border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-[clamp(16px,1.2vw,24px)] text-[#FBFBF6] xl:col-span-2">
                                                <div className="mb-4 flex items-center justify-between border-b border-[#D4A574]/18 pb-2">
                                                    <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">Synthesized Visual Style</span>
                                                    <InfoButton section="VISUAL_STYLE" />
                                                </div>
                                                <div className="flex flex-col h-full">
                                                    <p className="mt-2 mb-6 max-w-[62ch] text-[15px] font-medium leading-relaxed tracking-tight text-[#F3F1ED]">
                                                        {extraction.visual_style}
                                                    </p>

                                                    {/* Aesthetic Signature Matrix */}
                                                    <div className="mt-auto space-y-4 border-t border-[#D4A574]/10 pt-6">
                                                        <div className="flex items-center gap-4">
                                                            <span className="w-14 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B9B19F]">Luma</span>
                                                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#2A2723]">
                                                                <div className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full w-[72%] animate-pulse" />
                                                            </div>
                                                            <span className="text-[10px] font-mono text-[#D4A574]">0.82V</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="w-14 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B9B19F]">Chromat</span>
                                                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#2A2723]">
                                                                <div className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full w-[45%] animate-pulse [animation-delay:200ms]" />
                                                            </div>
                                                            <span className="text-[10px] font-mono text-[#D4A574]">0.44Δ</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="w-14 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B9B19F]">Vector</span>
                                                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#2A2723]">
                                                                <div className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full w-[89%] animate-pulse [animation-delay:400ms]" />
                                                            </div>
                                                            <span className="text-[10px] font-mono text-[#D4A574]">0.91Λ</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Color Palette */}
                                            <div className="col-span-1 flex min-h-[120px] flex-col rounded-3xl border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-[clamp(16px,1.2vw,24px)] text-[#FBFBF6]">
                                                <div className="mb-4 flex items-center justify-between border-b border-[#D4A574]/18 pb-2">
                                                    <span className="block text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">Chromatic Base</span>
                                                    <InfoButton section="CHROMATIC_BASE" />
                                                </div>
                                                <div className="mt-auto">
                                                    {extraction.color_palette && extraction.color_palette.length > 0 ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {extraction.color_palette.map((hex: string, i: number) => (
                                                                <div key={i} className="group relative flex items-center gap-2 rounded-full border border-[#D4A574]/24 bg-[#171512] p-1.5 pr-3 transition-transform hover:scale-[1.02]">
                                                                    <div className="w-4 h-4 flex-shrink-0 border border-[#D4A574]/20 rounded-full" style={{ backgroundColor: hex }} />
                                                                    <span className="text-[8px] font-mono tracking-widest text-[#B9B19F] transition-colors group-hover:text-[#D4A574]">{hex}</span>
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
                                            <div id="dossier-evidence" className="space-y-[clamp(12px,1vw,18px)] border-t border-[#E6DDCF] pt-10 scroll-mt-24">
                                                
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
                                        )}
                                            </div>
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
                                        <div className="rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 space-y-10 text-[#FBFBF6]">
                                            {/* Top: Radiant Architecture Toggle */}
                                            <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between pb-8 border-b border-[#4E3D2A]">
                                                <div className="flex items-center gap-6">
                                                    <div className="h-12 w-12 rounded-2xl bg-[#171512] flex items-center justify-center border border-[#4E3D2A]">
                                                        <Sparkles className="h-6 w-6 text-[#D4A574]" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4A574]">Macro-Diagnostic Map</h3>
                                                        <p className="text-[13px] text-[#B9B19F] font-light tracking-wide">Visualize optical trajectories and focal anchors in the creative signal stack.</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => setShowRadiant(!showRadiant)}
                                                    className={`px-8 py-3 rounded-full border text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 flex items-center gap-3 ${showRadiant ? "bg-[#D4A574] text-[#141414] border-[#D4A574] shadow-md shadow-[#D4A574]/20" : "bg-[#171512] text-[#D4A574] border-[#4E3D2A] hover:border-[#D4A574]/60 hover:bg-[#201b15]"}`}
                                                >
                                                    <div className={`h-1.5 w-1.5 rounded-full ${showRadiant ? "bg-[#141414] animate-pulse" : "bg-[#D4A574]"}`} />
                                                    {showRadiant ? "Active: Radiant Architecture" : "Initialize Radiant Architecture"}
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
                                            <section className="signals-section mt-12 space-y-12 border-b border-[#4E3D2A] pb-12">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex flex-col gap-2">
                                                        <h2 className="text-2xl font-light uppercase tracking-[0.35em] text-[#D4A574]">Gaze Topology</h2>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B9B19F]">Mode of Address & Viewer Positioning</p>
                                                    </div>
                                                    <div className="h-px flex-1 bg-[#4E3D2A]" />
                                                </div>

                                                <div className="grid grid-cols-1 items-start gap-[clamp(12px,1vw,18px)] lg:grid-cols-3">
                                                    {[
                                                        { label: 'Mode of Address', value: (extraction.full_dossier as any).gaze_topology.mode_of_address },
                                                        { label: 'Viewer Position', value: (extraction.full_dossier as any).gaze_topology.viewer_position },
                                                        { label: 'Power Holder', value: (extraction.full_dossier as any).gaze_topology.power_holder },
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex min-h-[220px] flex-col justify-between rounded-[1.85rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] px-6 py-5 text-[#FBFBF6] xl:min-h-[240px]">
                                                            <h3 className="mb-4 w-full border-b border-[#4E3D2A] pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                                {item.label}
                                                            </h3>
                                                            <div className="flex-1 flex items-center justify-center">
                                                                <span className="text-[24px] font-bold uppercase tracking-tight text-[#F3F1ED]">{item.value}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="rounded-[2rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8">
                                                    <h3 className="mb-4 border-b border-[#4E3D2A] pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                        Forensic Diagnostics
                                                    </h3>
                                                    <p className="text-[13px] font-light leading-relaxed text-[#B9B19F]">
                                                        {(extraction.full_dossier as any).gaze_topology.reading}
                                                    </p>
                                                </div>
                                            </section>
                                        )}

                                        {/* ── Counter-Reading Matrix ── */}
                                        {(extraction.full_dossier as any)?.counter_reading_matrix && (
                                            <section className="counter-reading-section mt-16 space-y-12">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex flex-col gap-2">
                                                        <h2 className="text-2xl font-light uppercase tracking-[0.35em] text-[#D4A574]">Counter-Reading Matrix</h2>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B9B19F]">Polysemic Deconstruction via Critical Theory</p>
                                                    </div>
                                                    <div className="h-px flex-1 bg-[#4E3D2A]" />
                                                </div>
                                                <div className="grid grid-cols-1 items-start gap-[clamp(12px,1vw,18px)] xl:grid-cols-2">
                                                    {((extraction.full_dossier as any).counter_reading_matrix as { lens: string; reading: string }[]).map((item, i) => (
                                                        <div key={i} className="flex min-h-[220px] flex-col rounded-[1.85rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] px-6 py-5 text-[#FBFBF6] xl:min-h-[240px]">
                                                            <h3 className="mb-4 w-full border-b border-[#4E3D2A] pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                                {item.lens}
                                                            </h3>
                                                            <div className="flex-1 max-h-[400px] overflow-y-auto pt-2">
                                                                <p className="text-[13px] font-light leading-relaxed text-[#B9B19F]">{item.reading}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>
                                ) : (
                                     <div className="rounded-[2.5rem] border border-dashed border-[#4E3D2A] bg-[#1F1F1F]/70 p-20 flex flex-col items-center justify-center text-center">
                                         <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#4E3D2A] bg-[#171512]">
                                             <Info className="h-5 w-5 text-[#D4A574]/50" />
                                         </div>
                                         <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4A574] mb-2">Deep Intelligence Required</h3>
                                         <p className="max-w-xs text-[13px] font-light tracking-wide text-[#B9B19F]">Signal interception requires deep architectural extraction of this asset's semiotic layers.</p>
                                     </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'CONSTRAINT MAP' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-10">
                                    <WorkspaceTabHeader
                                        kicker="Operational Guardrails"
                                        title="Constraint Map"
                                        intro="The non-negotiables, avoidances, and safe adaptation boundaries that keep refinement inside the working forensic logic."
                                    />

                                    <div className="rounded-[2.25rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] shadow-[0_20px_50px_rgba(11,10,8,0.2)]">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Product Boundary</p>
                                        <p className="mt-4 max-w-[60ch] text-[15px] leading-7 text-[#D6D0C6]">
                                            VD does not generate ads or act as an AI design app. VD judges, diagnoses, and directs creative quality.
                                        </p>
                                    </div>

                                    <div className="grid gap-6 xl:grid-cols-2">
                                        {[
                                            {
                                                title: 'Must Keep',
                                                items: mustKeepConstraints,
                                                accent: 'text-[#D4A574]',
                                                tone: 'border-[#4E3D2A] bg-[#171512]',
                                            },
                                            {
                                                title: 'Must Avoid',
                                                items: mustAvoidConstraints,
                                                accent: 'text-[#C8230A]',
                                                tone: 'border-[#5B2418] bg-[#1C1311]',
                                            },
                                            {
                                                title: 'Safe Adaptation Zone',
                                                items: safeAdaptationZone,
                                                accent: 'text-[#D4A574]',
                                                tone: 'border-[#3F342A] bg-[#161311]',
                                            },
                                        ].map((group, index) => (
                                            <div
                                                key={group.title}
                                                className={`rounded-[2.25rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] shadow-[0_20px_50px_rgba(11,10,8,0.2)] ${index === 2 ? 'xl:col-span-2' : ''}`}
                                            >
                                                <p className={`text-[10px] font-bold uppercase tracking-[0.28em] ${group.accent}`}>{group.title}</p>
                                                <div className="mt-5 space-y-3">
                                                    {group.items.length > 0 ? (
                                                        group.items.map((item, index) => (
                                                            <div key={`${group.title}-${index}`} className={`rounded-[1.4rem] border px-4 py-4 ${group.tone}`}>
                                                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                                                    <p className="max-w-[58ch] text-[14px] leading-6 text-[#F3F1ED]">{item.text}</p>
                                                                    <span
                                                                        className={`shrink-0 self-start rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
                                                                            item.severity === 'critical'
                                                                                ? 'bg-[#C8230A]/16 text-[#F06B55]'
                                                                                : item.severity === 'high'
                                                                                    ? 'bg-[#D4A574]/14 text-[#D4A574]'
                                                                                    : 'bg-[#FBFBF6]/8 text-[#B9B19F]'
                                                                        }`}
                                                                    >
                                                                        {item.severity}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="rounded-[1.4rem] border border-dashed border-[#4E3D2A] bg-[#171512] px-4 py-4 text-[13px] leading-6 text-[#B9B19F]">
                                                            Blueprint Trace will populate this boundary once reconstruction data is available.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MARKET PULSE (Locked / Last) */}
                        {activeTab === 'MARKET PULSE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <WorkspaceTabHeader
                                    kicker="Competitive Context"
                                    title="Strategic Fit"
                                    intro="How the route fits current category pressure, novelty conditions, and timing opportunity."
                                />
                                <div className="relative">
                                {!isSovereign ? (
                                    <>
                                        <div className="absolute inset-0 z-10 backdrop-blur-md bg-[#FBFBF6]/60 flex items-center justify-center rounded-3xl">
                                            <div className="bg-[#FFFCF7] border border-[#E6DDCF] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.02)] rounded-3xl text-center flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center border border-[#D4A574]/30 mb-4">
                                                    <svg className="w-5 h-5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                </div>
                                                <span className="text-[#D4A574] font-bold tracking-[0.3em] uppercase text-[10px] mb-2">Sovereign Feature</span>
                                                <h3 className="text-[#151310] text-xl font-light mb-4 tracking-tight">Market Pulse Locked</h3>
                                                <p className="text-[#6A6257] text-xs mb-8 max-w-xs leading-relaxed">Cross-asset statistical aggregation and category saturation density mapping is restricted to paid agency tiers.</p>
                                                <button className="bg-[#D4A574] text-[#1A1A1A] px-8 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-[#FFFCF7] hover:text-[#151310] transition-colors">
                                                    Premium Unlock
                                                </button>
                                            </div>
                                        </div>
                                        <div className="opacity-40 pointer-events-none select-none filter blur-[2px]">
                                            <AdAnalyticsTab brand={asset.brand?.name} />
                                        </div>
                                    </>
                                ) : isLoadingMarketPulse && !marketPulseData ? (
                                    <div className="rounded-3xl border border-[#E6DDCF] bg-[#FFFCF7] shadow-[0_4px_16px_rgba(0,0,0,0.02)] px-8 py-16 text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4A574]">Synthesising Market Pulse</p>
                                        <p className="mt-4 text-sm leading-relaxed text-[#151310]/65">
                                            Aggregating category saturation, novelty pressure, and timing risk from the Intelligence Vault.
                                        </p>
                                        <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[#151310]/40">
                                            Building the current market benchmark for {asset.brand?.market_sector || 'your active market'}.
                                        </p>
                                    </div>
                                ) : marketPulseError ? (
                                    <div className="space-y-6">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                Confidence {integratedRecommendation.confidence}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                Evidence {integratedRecommendation.evidenceStrength}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                Assumption {integratedRecommendation.assumptionLoad}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                Based on comparative memory and dossier pressure
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-[#E6DDCF] bg-white/80 p-6 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Directional estimate</p>
                                                <p className="mt-3 text-[15px] leading-7 text-[#1A1A1A]/76">
                                                    Market Pulse could not resolve a live category benchmark, so this read is being derived from dossier pattern memory and comparative signals.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => void handleRefreshMarketPulse()}
                                                className="shrink-0 rounded-full border border-[#D4A574]/20 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-[#D4A574]/10"
                                            >
                                                Recompute Pulse
                                            </button>
                                        </div>
                                        <div className="grid gap-5 lg:grid-cols-3">
                                            <div className="rounded-[1.75rem] border border-[#E6DDCF] bg-white p-6 shadow-[0_10px_26px_rgba(26,18,13,0.04)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Category Saturation Index</p>
                                                <p className="mt-4 text-4xl font-medium tracking-tight text-[#151310]">{marketPulseFallback.saturation}</p>
                                                <p className="mt-3 text-[12px] leading-6 text-[#151310]/58">Directional estimate from current dossier pressure.</p>
                                            </div>
                                            <div className="rounded-[1.75rem] border border-[#E6DDCF] bg-white p-6 shadow-[0_10px_26px_rgba(26,18,13,0.04)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Novelty Score</p>
                                                <p className="mt-4 text-4xl font-medium tracking-tight text-[#151310]">{marketPulseFallback.novelty}</p>
                                                <p className="mt-3 text-[12px] leading-6 text-[#151310]/58">Directional estimate from current signal differentiation.</p>
                                            </div>
                                            <div className="rounded-[1.75rem] border border-[#E6DDCF] bg-white p-6 shadow-[0_10px_26px_rgba(26,18,13,0.04)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Fatigue Risk + Timing Signal</p>
                                                <p className="mt-4 text-4xl font-medium tracking-tight text-[#151310]">{marketPulseFallback.fatigue}</p>
                                                <p className="mt-3 text-[12px] leading-6 text-[#151310]/58">{marketPulseFallback.timingSignal}</p>
                                            </div>
                                        </div>
                                        <div className="rounded-[2rem] border border-[#E6DDCF] bg-white/80 p-6 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">What this means now</p>
                                                    <p className="mt-3 max-w-[72ch] text-[15px] leading-7 text-[#1A1A1A]/76">{marketPulseFallback.interpretation}</p>
                                                </div>
                                                <span className="inline-flex w-fit rounded-full border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                    {marketPulseFallback.confidenceLabel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : marketPulseData ? (
                                    <div className="space-y-6">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                Confidence {integratedRecommendation.confidence}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                Evidence {integratedRecommendation.evidenceStrength}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                Assumption {integratedRecommendation.assumptionLoad}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                Based on benchmark depth, comparative memory, and category pressure
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-[#E6DDCF] bg-white/80 p-6 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">
                                                    {marketPulseBelowThreshold ? 'Directional estimate' : 'Live benchmark'}
                                                </p>
                                                <p className="mt-3 text-[15px] leading-7 text-[#1A1A1A]/76">
                                                    Market Pulse is reading against {marketPulseData.assetCount} vault assets in {marketPulseData.scope}.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => void handleRefreshMarketPulse()}
                                                disabled={isLoadingMarketPulse}
                                                className="shrink-0 rounded-full border border-[#D4A574]/20 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-[#D4A574]/10 disabled:opacity-50"
                                            >
                                                {isLoadingMarketPulse ? 'Syncing...' : 'Refresh Pulse'}
                                            </button>
                                        </div>

                                        <div className="grid gap-5 lg:grid-cols-3">
                                            <div className="rounded-[1.75rem] border border-[#E6DDCF] bg-white p-6 shadow-[0_10px_26px_rgba(26,18,13,0.04)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Category Saturation Index</p>
                                                <p className="mt-4 text-4xl font-medium tracking-tight text-[#151310]">
                                                    {Math.min(95, Math.round((marketPulseData.category_persuasion_benchmark.avg_density * 0.7) + (marketPulseData.assetCount * 0.8)))}
                                                </p>
                                                <p className="mt-3 text-[12px] leading-6 text-[#151310]/58">Live category density and mechanic repetition.</p>
                                            </div>
                                            <div className="rounded-[1.75rem] border border-[#E6DDCF] bg-white p-6 shadow-[0_10px_26px_rgba(26,18,13,0.04)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Novelty Score</p>
                                                <p className="mt-4 text-4xl font-medium tracking-tight text-[#151310]">
                                                    {Math.max(22, Math.min(92, 100 - Math.round((marketPulseData.category_persuasion_benchmark.avg_density * 0.45) + (marketPulseData.assetCount * 0.35))))}
                                                </p>
                                                <p className="mt-3 text-[12px] leading-6 text-[#151310]/58">Fresh strategic room relative to current category behavior.</p>
                                            </div>
                                            <div className="rounded-[1.75rem] border border-[#E6DDCF] bg-white p-6 shadow-[0_10px_26px_rgba(26,18,13,0.04)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Fatigue Risk + Timing Signal</p>
                                                <p className="mt-4 text-4xl font-medium tracking-tight text-[#151310]">
                                                    {Math.min(90, Math.round((marketPulseData.assetCount * 0.9) + (marketPulseData.category_persuasion_benchmark.avg_density * 0.4)))}
                                                </p>
                                                <p className="mt-3 text-[12px] leading-6 text-[#151310]/58">
                                                    {marketPulseBelowThreshold
                                                        ? 'Directional estimate until sample depth increases.'
                                                        : 'Live timing read from repetition and category pressure.'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="rounded-[2rem] border border-[#E6DDCF] bg-white/80 p-6 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">What this means now</p>
                                                    <p className="mt-3 max-w-[72ch] text-[15px] leading-7 text-[#1A1A1A]/76">
                                                        {marketPulseBelowThreshold
                                                            ? `This route has signal, but category context is still directional at ${marketPulseData.assetCount}/20 sampled assets. Use the read to guide action, not overclaim precision.`
                                                            : `Current category pressure suggests ${marketPulseData.category_persuasion_benchmark.your_rank.toLowerCase()} standing. Protect the working mechanic, then differentiate execution rather than rebuilding from zero.`}
                                                    </p>
                                                </div>
                                                <span className="inline-flex w-fit rounded-full border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                    {marketPulseBelowThreshold ? 'Directional estimate' : 'Live benchmark'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                Confidence {integratedRecommendation.confidence}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                Evidence {integratedRecommendation.evidenceStrength}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                Assumption {integratedRecommendation.assumptionLoad}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                Based on comparative memory and dossier pressure
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-[#E6DDCF] bg-white/80 p-6 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Directional estimate</p>
                                                <p className="mt-3 text-[15px] leading-7 text-[#1A1A1A]/76">
                                                    No live benchmark is loaded yet, so Market Pulse is reading from dossier pattern memory and comparative signal pressure.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => void handleRefreshMarketPulse()}
                                                className="shrink-0 rounded-full border border-[#D4A574]/20 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-[#D4A574]/10"
                                            >
                                                Run Market Pulse
                                            </button>
                                        </div>
                                        <div className="grid gap-5 lg:grid-cols-3">
                                            <div className="rounded-[1.75rem] border border-[#E6DDCF] bg-white p-6 shadow-[0_10px_26px_rgba(26,18,13,0.04)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Category Saturation Index</p>
                                                <p className="mt-4 text-4xl font-medium tracking-tight text-[#151310]">{marketPulseFallback.saturation}</p>
                                                <p className="mt-3 text-[12px] leading-6 text-[#151310]/58">Directional estimate from current dossier pressure.</p>
                                            </div>
                                            <div className="rounded-[1.75rem] border border-[#E6DDCF] bg-white p-6 shadow-[0_10px_26px_rgba(26,18,13,0.04)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Novelty Score</p>
                                                <p className="mt-4 text-4xl font-medium tracking-tight text-[#151310]">{marketPulseFallback.novelty}</p>
                                                <p className="mt-3 text-[12px] leading-6 text-[#151310]/58">Directional estimate from current signal differentiation.</p>
                                            </div>
                                            <div className="rounded-[1.75rem] border border-[#E6DDCF] bg-white p-6 shadow-[0_10px_26px_rgba(26,18,13,0.04)]">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Fatigue Risk + Timing Signal</p>
                                                <p className="mt-4 text-4xl font-medium tracking-tight text-[#151310]">{marketPulseFallback.fatigue}</p>
                                                <p className="mt-3 text-[12px] leading-6 text-[#151310]/58">{marketPulseFallback.timingSignal}</p>
                                            </div>
                                        </div>
                                        <div className="rounded-[2rem] border border-[#E6DDCF] bg-white/80 p-6 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">What this means now</p>
                                                    <p className="mt-3 max-w-[72ch] text-[15px] leading-7 text-[#1A1A1A]/76">{marketPulseFallback.interpretation}</p>
                                                </div>
                                                <span className="inline-flex w-fit rounded-full border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                    {marketPulseFallback.confidenceLabel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                        )}

                        {/* TAB 3: PSYCHOLOGY */}
                        {activeTab === 'PSYCHOLOGY' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-10">
                                    <WorkspaceTabHeader
                                        kicker="Cognitive Dynamics"
                                        title="Semiotic Channel Interceptions"
                                        intro="How the asset encodes meaning, identity cues, and emotional triggers to shape perception and decision momentum."
                                    />
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    {/* Trigger Distribution Radar */}
                                    <div className="flex min-h-[220px] flex-col items-center justify-between rounded-[1.85rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] px-6 py-5 text-[#FBFBF6] xl:min-h-[240px]">
                                        <h3 className="mb-4 w-full border-b border-[#D4A574]/18 pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                            Trigger Distribution Map
                                        </h3>
                                        <div className="w-full max-w-[320px] flex-1 flex items-center justify-center -mt-6">
                                            <RadarChart
                                                data={Object.entries((extraction?.full_dossier as any)?.archetype_mapping?.trigger_distribution || {}).map(([label, value]) => ({ label, value: value as number }))}
                                                forceLight={false}
                                            />
                                        </div>
                                        <p className="mt-4 w-full border-t border-[#D4A574]/10 px-4 pt-4 text-center text-[12px] leading-relaxed text-[#B9B19F]">
                                            This distribution quantifies the creative's psychological surface area—identifying which aspiration levers are being engaged to command consumer compliance.
                                        </p>
                                    </div>

                                     {/* Strategic Posture Map */}
                                     <div className="flex min-h-[220px] flex-col justify-between rounded-[1.85rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] px-6 py-5 text-[#FBFBF6] xl:min-h-[240px]">
                                         <h3 className="mb-4 w-full border-b border-[#D4A574]/18 pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                             Strategic Posture
                                         </h3>
                                         {extraction?.full_dossier?.archetype_mapping ? (
                                             <div className="flex-1 flex flex-col justify-between">
                                                 <div>
                                                     <p className="mb-8 pr-4 text-[13px] leading-relaxed text-[#D6D0C6]">
                                                         {extraction.full_dossier.archetype_mapping?.target_posture}
                                                     </p>
                                                     <div className="flex items-center justify-center -mt-2">
                                                         <StrategicPostureMap
                                                             posture={extraction.full_dossier.archetype_mapping?.target_posture || ''}
                                                             moves={(extraction.full_dossier.archetype_mapping as any)?.strategic_moves || []}
                                                             forceLight={false}
                                                         />
                                                     </div>
                                                 </div>
                                                 <p className="mt-6 w-full border-t border-[#D4A574]/10 px-4 pt-6 text-center text-[12px] leading-relaxed text-[#B9B19F]">
                                                     Current positioning defines the asset's high-level field posture—governing how it addresses consumer cognitive dissonance within the vault.
                                                 </p>
                                             </div>
                                         ) : (
                                             <div className="flex-1 flex items-center justify-center">
                                                 <div className="text-[10px] uppercase font-bold tracking-widest text-[#D4A574]/30">No Posture Data</div>
                                             </div>
                                         )}
                                     </div>

                                    {/* Persuasion Density */}
                                    {(extraction?.full_dossier as any)?.persuasion_metrics && (
                                        <div className="flex min-h-[220px] flex-col justify-between rounded-[1.85rem] border border-[#3E3225] bg-[#1F1F1F] px-6 py-5 text-[#FBFBF6] xl:min-h-[240px]">
                                            <h3 className="mb-4 w-full border-b border-[#4E3D2A] pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                Persuasion Density
                                            </h3>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex justify-between items-end mb-4">
                                                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#B9B19F]">Conversion Density</span>
                                                    <span className="text-[32px] font-bold text-[#D4A574] leading-none">{((extraction?.full_dossier as any)?.persuasion_metrics?.persuasion_density as number)}%</span>
                                                </div>
                                                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#2A2723] shadow-inner">
                                                     <div
                                                         className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] rounded-full transition-all duration-1000"
                                                         style={{ width: `${(extraction?.full_dossier as any)?.persuasion_metrics?.persuasion_density}%` }}
                                                     />
                                                 </div>
                                            </div>
                                            <p className="mt-4 border-t border-[#D4A574]/10 pt-4 text-[12px] leading-relaxed text-[#B9B19F]">
                                                Measures the creative's informational compression—how efficiently it transfers brand signal into consumer memory structures.
                                            </p>
                                        </div>
                                    )}

                                    {/* Cognitive Friction */}
                                    {(extraction?.full_dossier as any)?.persuasion_metrics && (
                                        <div className="flex min-h-[220px] flex-col justify-between rounded-[1.85rem] border border-[#3E3225] bg-[#1F1F1F] px-6 py-5 text-[#FBFBF6] xl:min-h-[240px]">
                                            <h3 className="mb-4 w-full border-b border-[#4E3D2A] pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                Cognitive Friction
                                            </h3>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex justify-between items-end mb-4">
                                                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#B9B19F]">Resistance Index</span>
                                                    <span className="text-[32px] font-bold text-[#8B4513] leading-none">{((extraction?.full_dossier as any)?.persuasion_metrics?.cognitive_friction as number)}%</span>
                                                </div>
                                                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#2A2723] shadow-inner">
                                                     <div
                                                         className="h-full bg-[#8B4513]/60 rounded-full transition-all duration-1000"
                                                         style={{ width: `${(extraction?.full_dossier as any)?.persuasion_metrics?.cognitive_friction}%` }}
                                                     />
                                                 </div>
                                            </div>
                                            <p className="mt-4 border-t border-[#D4A574]/10 pt-4 text-[12px] leading-relaxed text-[#B9B19F]">
                                                Quantifies neural resistance to message adoption. Low scores indicate frictionless persuasion pathways.
                                            </p>
                                        </div>
                                    )}

                                    {/* Predictive Longevity */}
                                    {(extraction?.full_dossier as any)?.persuasion_metrics && (
                                        <div className="flex min-h-[220px] flex-col justify-between rounded-[1.85rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] px-6 py-5 text-[#FBFBF6] xl:min-h-[240px]">
                                            <h3 className="mb-4 w-full border-b border-[#D4A574]/18 pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                Predictive Longevity
                                            </h3>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <svg className="w-4 h-4 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#B9B19F]">Fatigue Analysis</span>
                                                </div>
                                                <p className="text-[12px] leading-relaxed text-[#B9B19F]">
                                                    {((extraction?.full_dossier as any)?.persuasion_metrics?.predictive_longevity as string)}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Behavioral Deconstruction */}
                                    {extraction?.full_dossier?.archetype_mapping && (
                                        <div className="flex min-h-[220px] flex-col justify-between rounded-[1.85rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] px-6 py-5 text-[#FBFBF6] xl:min-h-[240px]">
                                            <h3 className="mb-4 w-full border-b border-[#D4A574]/18 pb-4 text-[12px] font-bold uppercase tracking-widest text-[#D4A574]">
                                                Behavioral Deconstruction
                                            </h3>
                                            <div className="flex-1 flex flex-col justify-center space-y-4">
                                                {((extraction.full_dossier.archetype_mapping as any)?.strategic_moves || []).slice(0, 3).map((move: string, i: number) => (
                                                    <div key={i} className="flex gap-3 items-start">
                                                        <div className="w-1.5 h-1.5 bg-[#D4A574] rounded-full mt-2 flex-shrink-0" />
                                                        <p className="text-[12px] leading-relaxed text-[#D6D0C6]">{move}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: BLUEPRINT */}
                        {activeTab === 'BLUEPRINT' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <WorkspaceTabHeader
                                    kicker="Audit & Reproducibility"
                                    title="Blueprint Trace"
                                    intro="A reproducible reconstruction path showing what was diagnosed, what can change safely, and how the route can be audited without turning VD into generation tooling."
                                />
                                {!blueprintData ? (
                                <div className="flex flex-col items-center justify-center rounded-3xl border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-10 text-center text-[#FBFBF6]">
                                        <h3 className="text-[#D4A574] text-lg font-medium mb-2">Blueprint Trace Uninitialized</h3>
                                        <p className="mb-4 max-w-sm text-sm text-[#B9B19F]">Build the reproducibility layer for this diagnosis so the working route can be audited and pressure-tested.</p>
                                        <p className="text-[#D4A574]/60 text-[10px] font-bold uppercase tracking-[0.28em] mb-8">This trace is saved to the asset for audit transparency, not ad generation.</p>
                                        {blueprintError && (
                                            <div className="mb-6 max-w-md rounded-2xl border border-[#5B2418] bg-[#271612] px-5 py-4">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574] mb-2">Blueprint Trace Failed</p>
                                                <p className="text-sm leading-relaxed text-[#D6D0C6]">{blueprintError}</p>
                                            </div>
                                        )}
                                        {isGeneratingBlueprint && (
                                             <div className="mb-8 w-full max-w-md rounded-[1.75rem] border border-[#4E3D2A] bg-[#171512] px-6 py-6">
                                                 <div className="flex items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4A574]">
                                                     <span>{BLUEPRINT_STEPS[blueprintStep]}</span>
                                                     <span className="font-mono text-[13px]">{blueprintProgress}%</span>
                                                 </div>
                                                 <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#2A2723]">
                                                     <div
                                                         className="h-full rounded-full bg-gradient-to-r from-[#8B4513] to-[#D4A574] transition-all duration-700"
                                                         style={{ width: `${blueprintProgress}%` }}
                                                     />
                                                 </div>
                                                 <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#B9B19F]">
                                                     Converting the live forensic dossier into an auditable reconstruction path.
                                                 </p>
                                             </div>
                                         )}
                                        <button
                                            onClick={handleGenerateBlueprint}
                                            disabled={isGeneratingBlueprint || !extraction}
                                            className="bg-[#D4A574] text-[#1A1A1A] px-8 py-3.5 text-[10px] font-bold tracking-widest uppercase hover:bg-[#FFFCF7] hover:text-[#151310] rounded-full transition-all disabled:opacity-50"
                                        >
                                            {isGeneratingBlueprint ? 'Building Blueprint Trace...' : 'Generate Blueprint Trace'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-12">
                                        <div className="flex flex-col gap-6 rounded-[2rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] md:flex-row md:items-center md:justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4E3D2A] bg-[#171512]">
                                                    <Sparkles className="h-5 w-5 text-[#D4A574]" />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Blueprint Trace Active</p>
                                                    <p className="mt-1 text-[13px] text-[#B9B19F]">This audit trail is indexed in the Intelligence Vault for reproducibility and review.</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleGenerateBlueprint}
                                                disabled={isGeneratingBlueprint}
                                                className="flex items-center gap-2 rounded-full border border-[#4E3D2A] bg-[#171512] px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[#D4A574] transition-all hover:border-[#D4A574]/60 hover:bg-[#201b15] hover:text-[#F3F1ED] disabled:opacity-50"
                                            >
                                                {isGeneratingBlueprint ? 'Refreshing...' : 'Refresh Trace'}
                                            </button>
                                        </div>

                                        <div className="rounded-[2rem] border border-[#4E3D2A] bg-[#171512] px-5 py-5 text-[#FBFBF6]">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">Product Boundary</p>
                                            <p className="mt-3 max-w-[68ch] text-[14px] leading-7 text-[#D6D0C6]">
                                                Blueprint Trace preserves reconstruction paths for audit transparency and reproducibility. It does not turn VD into generation or design tooling.
                                            </p>
                                        </div>

                                        {isGeneratingBlueprint && (
                                            <div className="rounded-3xl border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] px-5 py-5">
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
                                                <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-[#B9B19F]">
                                                    Regenerating the blueprint trace against the current forensic dossier.
                                                </p>
                                            </div>
                                        )}

                                        {/* Iteration Test Plan (Remixing) */}
                                        {extraction?.full_dossier?.test_plan && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <span className="h-px flex-1 bg-[#4E3D2A]"></span>
                                                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Iteration & Test Plan</span>
                                                    <span className="h-px flex-1 bg-[#4E3D2A]"></span>
                                                </div>
                                                
                                                <div className="rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 text-[#FBFBF6]">
                                                    <div className="mb-10 max-w-3xl">
                                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]/70">Hypothesis</span>
                                                        <p className="mt-3 text-lg font-medium leading-relaxed text-[#F3F1ED]">{extraction.full_dossier.test_plan.hypothesis}</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                        {extraction.full_dossier.test_plan.test_cells.map((cell: any, i: number) => (
                                                            <div key={i} className="group relative rounded-2xl border border-[#4E3D2A] bg-[#171512] p-6 transition-all hover:border-[#D4A574]/40">
                                                                <div className="flex items-start justify-between mb-4">
                                                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">{cell.lever}</span>
                                                                    <span className="text-[9px] font-mono text-[#B9B19F]">TEST_CELL_0{i + 1}</span>
                                                                </div>
                                                                <p className="mb-6 text-[15px] leading-relaxed text-[#F3F1ED]">{cell.change}</p>
                                                                <div className="border-t border-[#4E3D2A] pt-4">
                                                                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] leading-relaxed text-[#B9B19F]">
                                                                        {cell.rationale}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Plausible Readings & Objection Dismantled */}
                                        {extraction?.full_dossier && (
                                            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)]">
                                                <div className="flex flex-col rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 text-[#FBFBF6]">
                                                    <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">
                                                        Plausible Readings
                                                    </h3>
                                                    <div className="space-y-8">
                                                        {extraction.full_dossier.possible_readings?.slice(0, 2).map((reading, i) => (
                                                            <div key={i} className="relative pl-6">
                                                                <div className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
                                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B9B19F]">
                                                                    {i === 0 ? 'Primary Interpretation' : 'Secondary Interpretation'}
                                                                </span>
                                                                <p className="mt-2 text-base font-semibold leading-relaxed text-[#F3F1ED]">
                                                                    {reading.reading}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 text-[#FBFBF6]">
                                                    <h3 className="mb-8 text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">
                                                        Objection Dismantled
                                                    </h3>
                                                    <div className="relative">
                                                        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-[#C8230A]/35" />
                                                        <p className="text-[15px] leading-relaxed text-[#D6D0C6]">
                                                            {extraction.full_dossier.objection_dismantling}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* DNA Prompt Code Block */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Reconstruction Trace</span>
                                                <span className="h-px flex-1 bg-[#4E3D2A]"></span>
                                            </div>
                                            <div className="relative group overflow-hidden rounded-[2rem] border border-[#4E3D2A] bg-[#171512] shadow-inner">
                                                <div className="absolute top-4 right-6 flex items-center gap-3">
                                                    <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#B9B19F]">Audit Trace Layer</span>
                                                    <button
                                                        className="flex items-center gap-2 rounded-full border border-[#4E3D2A] bg-[#1F1F1F] px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#D4A574] transition-all hover:border-[#D4A574]/60 hover:bg-[#201b15] hover:text-[#F3F1ED]"
                                                        onClick={() => navigator.clipboard.writeText(blueprintData.verified_dna_prompt)}
                                                    >
                                                        <Copy className="h-2.5 w-2.5" />
                                                        Copy Trace
                                                    </button>
                                                </div>
                                                <pre className="whitespace-pre-wrap p-8 pt-12 text-[13px] font-mono leading-relaxed text-[#D6D0C6] selection:bg-[#D4A574]/40">
                                                    {blueprintData.verified_dna_prompt}
                                                </pre>
                                            </div>
                                        </div>

                                         {/* Execution Constraints Checklist */}
                                         <div className="space-y-6">
                                             <div className="rounded-[2rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 text-[#FBFBF6] md:p-10">
                                                 <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Execution Logic</span>
                                                 <div className="max-w-4xl">
                                                     <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.25em] text-[#F4A700]">Primary Trigger</span>
                                                     <p className="text-2xl font-medium leading-snug tracking-tight text-[#F3F1ED]">{blueprintData.execution_constraints.primary_trigger}</p>
                                                 </div>
                                             </div>

                                             <div className="rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 text-[#FBFBF6] md:p-10">
                                                 <span className="mb-10 block text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Technical Specs</span>
                                                 <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                                                     <div className="flex flex-col gap-3 relative">
                                                         <div className="absolute -left-6 top-0 bottom-0 hidden w-px bg-[#F4A700]/35 md:block" />
                                                         <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F4A700]">Lighting Architecture</span>
                                                         <p className="text-[15px] font-medium leading-relaxed text-[#D6D0C6]">
                                                             {blueprintData.technical_specs.lighting_architecture}
                                                         </p>
                                                     </div>
                                                     <div className="flex flex-col gap-3 relative">
                                                         <div className="absolute -left-6 top-0 bottom-0 hidden w-px bg-[#C8230A]/35 md:block" />
                                                         <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8230A]">Gaze Vector</span>
                                                         <p className="text-[15px] font-medium leading-relaxed text-[#D6D0C6]">
                                                             {blueprintData.technical_specs.gaze_vector}
                                                         </p>
                                                     </div>
                                                 </div>
                                             </div>

                                             <div className="rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#171512] p-8 text-[#FBFBF6] md:p-10 shadow-inner">
                                                 <div className="flex flex-col gap-6 md:flex-row md:items-center">
                                                     <div className="min-w-[140px]">
                                                         <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Material Cues</span>
                                                         <p className="mt-1 text-[9px] uppercase tracking-widest text-[#B9B19F]">Texture & Form</p>
                                                     </div>
                                                     <div className="flex flex-wrap gap-2.5">
                                                         {blueprintData.technical_specs.material_cues.map((cue: string, i: number) => (
                                                             <span key={i} className="rounded-full border border-[#4E3D2A] bg-[#1F1F1F] px-4 py-1.5 text-[11px] font-medium text-[#D6D0C6] transition-colors hover:border-[#D4A574]/60 hover:bg-[#201b15]">
                                                                 {cue}
                                                             </span>
                                                         ))}
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>

                                        {/* Brutalist [+] / [-] constraints */}
                                        {/* Brutalist [+] / [-] constraints */}
                                        <div className="rounded-[2.5rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 text-[#FBFBF6]">
                                            <div className="flex items-center gap-4 mb-10">
                                                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Strict Execution Constraints</span>
                                                <span className="h-px flex-1 bg-[#4E3D2A]"></span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F4A700]/10">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-[#F4A700]" />
                                                        </div>
                                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4A700]">[+] Positive Benchmarks</span>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {blueprintData.execution_constraints.must_include.map((item: string, i: number) => (
                                                            <div key={`inc-${i}`} className="flex items-start gap-4 rounded-xl border border-[#4E3D2A] bg-[#171512] p-4 transition-colors hover:border-[#F4A700]/45">
                                                                <span className="mt-0.5 text-[#F4A700]">✓</span>
                                                                <span className="text-[13px] leading-relaxed text-[#D6D0C6]">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C8230A]/10">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-[#C8230A]" />
                                                        </div>
                                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8230A]">[-] Critical Exclusions</span>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {blueprintData.execution_constraints.must_not_include.map((item: string, i: number) => (
                                                            <div key={`exc-${i}`} className="flex items-start gap-4 rounded-xl border border-[#4E3D2A] bg-[#171512] p-4 opacity-85 transition-opacity hover:opacity-100">
                                                                <span className="mt-0.5 font-bold text-[#C8230A]">×</span>
                                                                <span className="text-[13px] leading-relaxed text-[#B9B19F] line-through decoration-[#B9B19F]/30">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* REMIXES AND VARIANTS */}
                                        {blueprintData.ad_copy_remixes && blueprintData.ad_copy_remixes.length > 0 && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Forensic Copy Remixes</span>
                                                    <span className="h-px flex-1 bg-[#4E3D2A]"></span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {blueprintData.ad_copy_remixes.map((remix: any, i: number) => (
                                                        <div key={i} className="flex flex-col rounded-3xl border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-6 text-[#FBFBF6] transition-all hover:border-[#D4A574]/40">
                                                            <div className="mb-4">
                                                                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4A700]">
                                                                    {remix.angle}
                                                                </span>
                                                            </div>
                                                            <p className="text-[15px] font-medium leading-relaxed text-[#F3F1ED] selection:bg-[#D4A574]/20 italic">
                                                                "{remix.copy}"
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {blueprintData.visual_variant_prompts && blueprintData.visual_variant_prompts.length > 0 && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Adaptation Trace Variants</span>
                                                    <span className="h-px flex-1 bg-[#4E3D2A]"></span>
                                                </div>
                                                <div className="space-y-6">
                                                    {blueprintData.visual_variant_prompts.map((variant: any, i: number) => (
                                                        <div key={i} className="rounded-[2rem] border border-[rgba(212,165,116,0.2)] bg-[#1F1F1F] p-8 text-[#FBFBF6]">
                                                            <div className="flex items-center justify-between mb-6">
                                                                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">{variant.concept}</span>
                                                                <span className="text-[9px] font-mono text-[#B9B19F]">V_{i+1}_CONCEPT</span>
                                                            </div>
                                                            <div className="rounded-2xl border border-[#4E3D2A] bg-[#171512] p-6 shadow-inner">
                                                                <pre className="whitespace-pre-wrap text-[12px] font-mono leading-relaxed text-[#D6D0C6] selection:bg-[#D4A574]/30">
                                                                    {variant.prompt}
                                                                </pre>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'STRESS LAB' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-8">
                                    <WorkspaceTabHeader
                                        kicker="Causal Intelligence"
                                        title="Causal Confidence"
                                        intro="Controlled what-if deltas for the variables most likely to change performance without breaking the diagnosed mechanism."
                                    />
                                    <div className="rounded-[2rem] border border-[#E6DDCF] bg-white/80 p-6 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Product Boundary</p>
                                        <p className="mt-3 max-w-[66ch] text-[15px] leading-7 text-[#1A1A1A]/76">
                                            Stress Lab is causal testing guidance, not a prompt feed. VD judges, diagnoses, and directs quality before any adaptation move is made.
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-[#FBFBF6] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                Confidence {integratedRecommendation.confidence}
                                            </span>
                                            <span className="inline-flex rounded-full border border-[#E6DDCF] bg-[#FBFBF6] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                Based on blueprint trace, friction, and gaze
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden rounded-[2rem] border border-[#E6DDCF] bg-white/80 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                        <div className="grid grid-cols-[minmax(150px,1fr)_minmax(220px,1.2fr)_minmax(220px,1.2fr)_120px_120px_120px] gap-px bg-[#E6DDCF] overflow-x-auto">
                                            {['Variable', 'Current state', 'Proposed shift', 'Predicted lift', 'Risk', 'Recommendation'].map((label) => (
                                                <div key={label} className="bg-[#FBFBF6] px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B7B62]">
                                                    {label}
                                                </div>
                                            ))}
                                            {stressLabRows.flatMap((row) => ([
                                                <div key={`${row.variable}-variable`} className="bg-white px-4 py-4 text-[13px] font-semibold text-[#16120D]">{row.variable}</div>,
                                                <div key={`${row.variable}-current`} className="bg-white px-4 py-4 text-[13px] leading-6 text-[#1A1A1A]/72">{row.currentState}</div>,
                                                <div key={`${row.variable}-shift`} className="bg-white px-4 py-4 text-[13px] leading-6 text-[#1A1A1A]/72">{row.proposedShift}</div>,
                                                <div key={`${row.variable}-lift`} className="bg-white px-4 py-4">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
                                                        row.predictedLift === 'High' ? 'bg-[#D4A882]/15 text-[#8B4513]' : row.predictedLift === 'Medium' ? 'bg-[#F4A700]/10 text-[#8B4513]' : 'bg-[#16120D]/6 text-[#6F6659]'
                                                    }`}>{row.predictedLift}</span>
                                                </div>,
                                                <div key={`${row.variable}-risk`} className="bg-white px-4 py-4">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
                                                        row.risk === 'High' ? 'bg-[#C8230A]/10 text-[#C8230A]' : row.risk === 'Medium' ? 'bg-[#D4A882]/15 text-[#8B4513]' : 'bg-[#16120D]/6 text-[#6F6659]'
                                                    }`}>{row.risk}</span>
                                                </div>,
                                                <div key={`${row.variable}-recommendation`} className="bg-white px-4 py-4">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
                                                        row.recommendation === 'Test' ? 'bg-[#D4A882]/15 text-[#8B4513]' : row.recommendation === 'Avoid' ? 'bg-[#C8230A]/10 text-[#C8230A]' : 'bg-[#16120D]/6 text-[#6F6659]'
                                                    }`}>{row.recommendation}</span>
                                                </div>,
                                            ]))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'DECISION LOG' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-8">
                                    <WorkspaceTabHeader
                                        kicker="Audit Trail"
                                        title="Context Continuity"
                                        intro="A compact operating log for what was approved, revised, or rejected so diagnosis turns into accountable creative direction."
                                    />
                                    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                                        <div className="rounded-[2rem] border border-[#E6DDCF] bg-white/80 p-6 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Log Current Decision</p>
                                            <p className="mt-3 text-[14px] leading-6 text-[#1A1A1A]/72">
                                                Capture the current verdict, confidence, top rationale, and the active P1 fix so the decision trail survives reloads and review-room drift.
                                            </p>
                                            <div className="mt-5 flex flex-wrap gap-3">
                                                <button
                                                    onClick={() => setShowDecisionSummary((current) => !current)}
                                                    className="rounded-full border border-[#D4A574]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-[#D4A574]/10"
                                                >
                                                    {showDecisionSummary ? 'Hide Decision Summary' : 'Generate Decision Summary'}
                                                </button>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(decisionSummaryText)}
                                                    className="rounded-full border border-[#D4A574]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-[#D4A574]/10"
                                                >
                                                    Copy Summary
                                                </button>
                                            </div>
                                            {showDecisionSummary && (
                                                <div className="mt-5 space-y-4">
                                                    <div className="rounded-[1.25rem] border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">Compact card view</p>
                                                        <div className="mt-3 space-y-3">
                                                            <p className="text-[14px] leading-6 text-[#16120D]">{integratedRecommendation.recommendedDirection}</p>
                                                            <p className="text-[12px] leading-6 text-[#1A1A1A]/68">
                                                                <span className="font-bold uppercase tracking-[0.16em] text-[#8B7B62]">Asset</span> · {assetLabel}
                                                            </p>
                                                            <p className="text-[12px] leading-6 text-[#1A1A1A]/68">
                                                                <span className="font-bold uppercase tracking-[0.16em] text-[#8B7B62]">Timestamp</span> · {decisionSummaryTimestamp}
                                                            </p>
                                                            <p className="text-[13px] leading-6 text-[#1A1A1A]/68">
                                                                <span className="font-bold uppercase tracking-[0.16em] text-[#8B7B62]">Decision</span> · {integratedRecommendation.decision}
                                                            </p>
                                                            <p className="text-[13px] leading-6 text-[#1A1A1A]/68">
                                                                <span className="font-bold uppercase tracking-[0.16em] text-[#8B7B62]">Rationale</span> · {integratedRecommendation.rationale}
                                                            </p>
                                                            <p className="text-[13px] leading-6 text-[#1A1A1A]/68">
                                                                <span className="font-bold uppercase tracking-[0.16em] text-[#8B7B62]">Next test</span> · {integratedRecommendation.executionNext3[0]}
                                                            </p>
                                                            <p className="text-[13px] leading-6 text-[#1A1A1A]/68">
                                                                <span className="font-bold uppercase tracking-[0.16em] text-[#8B7B62]">Market pulse</span> · {marketPulseInterpretation}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2 pt-1">
                                                                <span className="inline-flex rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                                    Confidence {integratedRecommendation.confidence}
                                                                </span>
                                                                <span className="inline-flex rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                                    Evidence {integratedRecommendation.evidenceStrength}
                                                                </span>
                                                                <span className="inline-flex rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                                    Assumption {integratedRecommendation.assumptionLoad}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-[1.25rem] border border-[#E6DDCF] bg-[#171512] px-4 py-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4A574]">Copyable handoff block</p>
                                                        <pre className="mt-3 whitespace-pre-wrap text-[12px] leading-6 text-[#D6D0C6]">{decisionSummaryText}</pre>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="mt-5 rounded-[1.25rem] border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-4">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">Optional team note</p>
                                                <textarea
                                                    value={decisionNote}
                                                    onChange={(e) => setDecisionNote(e.target.value)}
                                                    rows={4}
                                                    className="mt-3 w-full resize-none border-0 bg-transparent p-0 text-[14px] leading-6 text-[#16120D] outline-none placeholder:text-[#1A1A1A]/35"
                                                    placeholder="Add context for why this call was made."
                                                />
                                            </div>
                                            <button
                                                onClick={handleLogDecision}
                                                className="mt-5 rounded-full bg-[#D4A574] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#141414] transition-colors hover:bg-[#c8955b]"
                                            >
                                                Save decision entry
                                            </button>
                                        </div>

                                        <div className="rounded-[2rem] border border-[#E6DDCF] bg-white/80 p-6 shadow-[0_16px_40px_rgba(26,18,13,0.06)]">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7B62]">Decision History</p>
                                            <div className="mt-5 space-y-4">
                                                {decisionLogEntries.length > 0 ? (
                                                    decisionLogEntries.map((entry) => (
                                                        <div key={entry.id} className="rounded-[1.25rem] border border-[#E6DDCF] bg-[#FBFBF6] px-4 py-4">
                                                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
                                                                        entry.verdict === 'Ship' ? 'bg-[#D4A882]/15 text-[#8B4513]' : entry.verdict === 'Revise' ? 'bg-[#F4A700]/10 text-[#8B4513]' : 'bg-[#C8230A]/10 text-[#C8230A]'
                                                                    }`}>
                                                                        {entry.verdict}
                                                                    </span>
                                                                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7B62]">
                                                                        {new Date(entry.timestamp).toLocaleString('en-AU', {
                                                                            day: '2-digit',
                                                                            month: 'short',
                                                                            hour: 'numeric',
                                                                            minute: '2-digit',
                                                                        })}
                                                                    </span>
                                                                </div>
                                                                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                                    Confidence {entry.confidence ?? '—'}/100
                                                                </span>
                                                            </div>
                                                            <p className="mt-3 text-[14px] leading-6 text-[#16120D]">{entry.rationale}</p>
                                                            <p className="mt-3 text-[12px] leading-6 text-[#1A1A1A]/68">
                                                                <span className="font-bold uppercase tracking-[0.16em] text-[#8B7B62]">P1 fix</span> · {entry.p1Fix}
                                                            </p>
                                                            {entry.teamNote && (
                                                                <p className="mt-3 border-t border-[#E6DDCF] pt-3 text-[12px] leading-6 text-[#1A1A1A]/68">{entry.teamNote}</p>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="rounded-[1.25rem] border border-dashed border-[#E6DDCF] bg-[#FBFBF6] px-4 py-6 text-[14px] leading-6 text-[#1A1A1A]/62">
                                                        No decisions logged yet. Save the current verdict from this dossier to create the first audit entry.
                                                    </div>
                                                )}
                                            </div>
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
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowCloneDrawer(false)}
                    />
                    <div className="absolute inset-y-0 right-0 w-full max-w-3xl overflow-y-auto border-l border-[#D4A574]/20 bg-[#FBFBF6] text-[#1A1A1A] shadow-2xl">
                        <div className="border-b border-[#E6DDCF] bg-[#FBFBF6] px-6 py-5 md:px-8">
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
                                    <div className="mt-6 rounded-[1.75rem] border border-[#E6DDCF] bg-[#FBFBF6] px-5 py-5">
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
                                                        <p className="mt-3 border-t border-[#E6DDCF] pt-3 text-[14px] leading-7 text-[#1A1A1A]/68">{concept.visual_language}</p>
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
