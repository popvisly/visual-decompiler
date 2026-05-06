export type DossierTab =
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

export type SocialPlatformKey = 'Meta Feed' | 'Instagram Reels' | 'TikTok' | 'YouTube Shorts' | 'LinkedIn';

export interface SocialPlatformScore {
    platform: SocialPlatformKey;
    score: number;
    signal: 'Strong' | 'Usable' | 'At Risk';
}

export interface SocialContextModel {
    platformScores: SocialPlatformScore[];
    socialInterpretation: string;
    tradeOff: string;
    executionVerdict: string;
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
}

export type ContentRole = 'Hook Asset' | 'Authority Asset' | 'Conversion Asset' | 'Retention Asset';
export type ContentSystemSignal = 'Strong' | 'Moderate' | 'Weak';
export type CreatorFitMode = 'Personal' | 'Produced' | 'Hybrid';
export type ContentCadence = 'Daily' | 'Weekly' | 'Campaign-only';

export interface ContentSystemBreakdownRow {
    label: 'Series Potential' | 'Creator Fit' | 'Audience Conditioning' | 'Frequency Viability' | 'Sequence Utility';
    score: number;
    signal: ContentSystemSignal;
}

export interface ContentSystemDiagnostic {
    title: 'Series Potential' | 'Creator Fit' | 'Audience Conditioning' | 'Frequency Viability' | 'Sequence Utility';
    signal: ContentSystemSignal;
    heading: string;
    detail: string;
}

export interface ContentSystemModel {
    primaryRole: ContentRole;
    secondaryRole: string | null;
    systemInterpretation: string;
    tradeOff: string;
    overallScore: number;
    overallSignal: ContentSystemSignal;
    creatorFitMode: CreatorFitMode;
    audienceConditioningSummary: string;
    frequencyCadence: ContentCadence;
    breakdown: ContentSystemBreakdownRow[];
    diagnostics: ContentSystemDiagnostic[];
    riskFlags: string[];
    operationalNextActions: string[];
    sequenceRecommendation: {
        sequence: string;
        bestFit: string;
        why: string;
    };
}

export const SOCIAL_PLATFORM_GLYPHS: Record<SocialPlatformKey, string> = {
    'Meta Feed': 'MF',
    'Instagram Reels': 'IR',
    TikTok: 'TK',
    'YouTube Shorts': 'YS',
    LinkedIn: 'LI',
};

export type PrimaryScoreLabel = 'Clarity' | 'Attention' | 'Cohesion' | 'Intent' | 'Distinction';

export interface PrimaryScoreRow {
    label: PrimaryScoreLabel;
    value: number;
}

export interface AttentionPathRead {
    primaryFocus: string;
    secondaryFocus: string;
    dropOff: string;
}

export interface StructuralSignalRow {
    label: 'Hierarchy' | 'Balance' | 'Contrast' | 'Density' | 'Focus Integrity';
    value: string;
}

export interface StrategicRead {
    thesis: string;
    triggerMechanic: string;
    frictionPoints: string;
    categoryPositioning: string;
}

export interface AnalysisLanguageSystem {
    primaryScores: PrimaryScoreRow[];
    attentionPath: AttentionPathRead;
    structuralSignals: StructuralSignalRow[];
    strategicRead: StrategicRead;
    confidenceIndex: 'High' | 'Medium' | 'Low';
}

export type QualityVerdict = 'Ship' | 'Revise' | 'Reject';
export type ConstraintSeverity = 'critical' | 'high' | 'optional';

export interface ConstraintItem {
    text: string;
    severity: ConstraintSeverity;
}

export interface QualityReason {
    title: string;
    detail: string;
}

export interface FixPriority {
    priority: 'P1' | 'P2' | 'P3';
    title: string;
    detail: string;
}

export interface StressLabRow {
    variable: string;
    currentState: string;
    proposedShift: string;
    predictedLift: 'Low' | 'Medium' | 'High';
    risk: 'Low' | 'Medium' | 'High';
    recommendation: 'Test' | 'Avoid' | 'Hold';
}

export interface DecisionLogEntry {
    id: string;
    timestamp: string;
    verdict: QualityVerdict;
    confidence: number | null;
    rationale: string;
    p1Fix: string;
    teamNote?: string;
}

export type TrustLevel = 'High' | 'Medium' | 'Low';
export type EvidenceStrength = 'Strong' | 'Moderate' | 'Weak';
export type AssumptionLoad = 'Low' | 'Medium' | 'High';

export interface ModuleScore {
    label: 'Decision Quality' | 'Causal Confidence' | 'Strategic Fit' | 'Context Continuity';
    score: number;
}

export interface IntegratedRecommendationData {
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
}

export interface BlueprintData {
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

export interface CloneConcept {
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

export interface CloneOutputData {
    extracted_mechanism: string;
    deployment_principle: string;
    concepts: CloneConcept[];
}

export interface MarketPulseData {
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
