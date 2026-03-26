'use client';

type DecisionState = 'KEEP' | 'REFINE' | 'KILL';

type Props = {
    extraction: {
        primary_mechanic?: string | null;
        confidence_score?: number | null;
    } | null | undefined;
    dossier: any;
    narrativeIntro?: string;
    isExecutiveSummary: boolean;
    onToggleExecutiveSummary: (next: boolean) => void;
    evidenceHref: string;
};

type BriefAlignmentState = 'On-brief' | 'Partial' | 'Off-brief';

function normalizeConfidenceScore(value?: number | null) {
    if (value == null) return null;
    return value <= 1 ? Math.round(value * 100) : Math.round(value);
}

function firstSentence(value?: string | null) {
    if (!value) return '';
    const trimmed = value.trim();
    const match = trimmed.match(/^.*?[.!?](?:\s|$)/);
    return (match?.[0] || trimmed).trim();
}

function deriveDecision(confidenceScore: number | null, frictionScore: number | null): DecisionState {
    if (confidenceScore !== null && confidenceScore >= 85 && (frictionScore === null || frictionScore <= 20)) {
        return 'KEEP';
    }

    if (confidenceScore !== null && confidenceScore >= 60) {
        return 'REFINE';
    }

    return 'KILL';
}

function confidenceNote(confidenceScore: number | null) {
    if (confidenceScore === null) {
        return 'Confidence is still resolving, so treat this as directional rather than final.';
    }

    if (confidenceScore >= 85) {
        return `Confidence is high at ${confidenceScore}%, which makes this safe to discuss in a client room.`;
    }

    if (confidenceScore >= 60) {
        return `Confidence is moderate at ${confidenceScore}%, so this route is usable but should be pressure-tested.`;
    }

    return `Confidence is low at ${confidenceScore}%, so this route needs significant refinement before presentation.`;
}

function decisionRationale(decision: DecisionState, recommendedMove: string, confidenceScore: number | null) {
    if (decision === 'KEEP') {
        return `Keep the route. ${recommendedMove || 'The current mechanic is doing enough work to move forward with light optimisation.'}`;
    }

    if (decision === 'REFINE') {
        return `Refine the route. ${recommendedMove || 'The core mechanism is working, but it needs one sharper adjustment before review.'}`;
    }

    return `Kill the route. ${recommendedMove || `At ${confidenceScore ?? 'low'} confidence, the case is too weak to defend without reworking the concept.`}`;
}

function deriveBriefAlignment(confidenceScore: number | null, frictionScore: number | null): BriefAlignmentState {
    if (confidenceScore !== null && confidenceScore >= 82 && (frictionScore === null || frictionScore <= 25)) {
        return 'On-brief';
    }

    if (confidenceScore !== null && confidenceScore < 55) {
        return 'Off-brief';
    }

    return 'Partial';
}

function briefAlignmentRationale(state: BriefAlignmentState, strategicMove: string, audienceTension: string) {
    if (state === 'On-brief') {
        return 'The asset is carrying a clear mechanism and a defensible strategic direction without obvious friction against the brief.';
    }

    if (state === 'Off-brief') {
        return `The asset is not yet translating the intended direction clearly enough, so ${firstSentence(strategicMove).toLowerCase()}`;
    }

    return `The route shows potential, but ${firstSentence(audienceTension).toLowerCase()}`;
}

export default function DossierDecisionSummary({
    extraction,
    dossier,
    narrativeIntro,
    isExecutiveSummary,
    onToggleExecutiveSummary,
    evidenceHref,
}: Props) {
    const confidenceScore = normalizeConfidenceScore(extraction?.confidence_score);
    const frictionScore =
        typeof dossier?.persuasion_metrics?.cognitive_friction === 'number'
            ? dossier.persuasion_metrics.cognitive_friction
            : null;
    const decision = deriveDecision(confidenceScore, frictionScore);
    const strategicMove =
        firstSentence(dossier?.archetype_mapping?.strategic_moves?.[0]) ||
        firstSentence(dossier?.test_plan?.hypothesis) ||
        firstSentence(dossier?.objection_dismantling) ||
        'Pressure-test this route against a second asset before locking the recommendation.';
    const audienceTension =
        firstSentence(dossier?.objection_dismantling) ||
        firstSentence(dossier?.possible_readings?.[0]?.reading) ||
        firstSentence(narrativeIntro) ||
        'Audience tension is still resolving and should be pressure-tested with a second route.';
    const positioningImplication =
        firstSentence(dossier?.archetype_mapping?.target_posture) ||
        firstSentence(dossier?.possible_readings?.[0]?.note) ||
        'Positioning implication needs a clearer strategic read.';
    const summaryWhatItsDoing =
        extraction?.primary_mechanic
            ? `This asset is using ${extraction.primary_mechanic.toLowerCase()} as its primary persuasion engine.`
            : 'This asset is using a still-resolving persuasion engine.';
    const summaryWhyItMatters =
        firstSentence(positioningImplication) ||
        'The strategic implication is still resolving, so use this as directional guidance.';
    const summaryRecommendedMove = strategicMove;
    const briefAlignment = deriveBriefAlignment(confidenceScore, frictionScore);
    const promiseClarity =
        firstSentence(dossier?.possible_readings?.[0]?.reading) ||
        firstSentence(dossier?.narrative_framework) ||
        'The central promise is present, but it needs cleaner language support to land immediately.';
    const framingStrength =
        firstSentence(dossier?.archetype_mapping?.target_posture) ||
        firstSentence(dossier?.semiotic_subtext) ||
        'The framing is directionally strong, but the positioning cue needs sharper emphasis.';
    const ctaMessageAlignment =
        frictionScore !== null && frictionScore <= 20
            ? 'The visual mechanism and the implied next step are aligned, so the CTA can stay direct.'
            : 'The visual mechanism is doing more work than the implied CTA, so the message should tighten before rollout.';
    const suggestedCopyMove =
        firstSentence(dossier?.test_plan?.hypothesis) ||
        'Make the value claim more explicit, then align the CTA with the same status or utility promise already signalled visually.';
    const triadStates: DecisionState[] = ['KEEP', 'REFINE', 'KILL'];
    const LIGHT_TEXT_PRIMARY = 'text-[#151310]';
    const LIGHT_TEXT_SECONDARY = 'text-[#6A6257]';
    const LIGHT_TEXT_MUTED = 'text-[#9B8662]';

    return (
        <section className="space-y-[clamp(12px,1vw,18px)]">
            <div className="flex flex-col gap-4 rounded-3xl border border-[#E6DDCF] bg-[#FFFCF7] p-5 md:flex-row md:items-center md:justify-between md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B8662]">Decision view</p>
                    <p className={`mt-3 max-w-[62ch] text-sm leading-relaxed ${LIGHT_TEXT_SECONDARY}`}>
                        Toggle between the executive read and the full forensic surface without losing the underlying analysis.
                    </p>
                </div>
                <div className="inline-flex rounded-full border border-[#ECE2D4] bg-[#FBF7F1] p-1">
                    <button
                        type="button"
                        onClick={() => onToggleExecutiveSummary(false)}
                        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                            !isExecutiveSummary ? 'bg-[#141414] text-[#FBF7EF]' : 'text-[#766C5F] hover:bg-black/5'
                        }`}
                    >
                        Full Analysis
                    </button>
                    <button
                        type="button"
                        onClick={() => onToggleExecutiveSummary(true)}
                        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                            isExecutiveSummary ? 'bg-[#141414] text-[#FBF7EF]' : 'text-[#766C5F] hover:bg-black/5'
                        }`}
                    >
                        Executive Summary
                    </button>
                </div>
            </div>

            <div className="rounded-3xl border border-[#E6DDCF] bg-[#FFFCF7] p-5 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B8662]">Creative Director Decision Triad</p>
                        <p className={`mt-3 max-w-[62ch] text-sm leading-relaxed ${LIGHT_TEXT_PRIMARY}`}>
                            {decisionRationale(decision, strategicMove, confidenceScore)}
                        </p>
                    </div>
                    <a
                        href={evidenceHref}
                        className="inline-flex items-center justify-center rounded-full border border-[#E5D8C8] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A6A55] transition hover:bg-[#F3EDE3] hover:text-[#141414]"
                    >
                        Jump to Evidence
                    </a>
                </div>

                <div className="mt-5 grid items-start gap-3 lg:grid-cols-3">
                    {triadStates.map((state) => (
                        <div
                            key={state}
                            className={`rounded-[1.4rem] border px-4 py-4 ${
                                state === decision
                                    ? 'border-[#E5D8C8] bg-[#F7EFE4]'
                                    : 'border-[#ECE2D4] bg-[#FBF7F1]'
                            }`}
                        >
                            <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${state === decision ? 'text-[#876F4C]' : LIGHT_TEXT_MUTED}`}>
                                {state}
                            </p>
                            <p className={`mt-3 text-[13px] leading-6 ${state === decision ? LIGHT_TEXT_PRIMARY : LIGHT_TEXT_SECONDARY}`}>
                                {state === decision
                                    ? 'Recommended state for this route.'
                                    : state === 'KEEP'
                                        ? 'Move forward with minimal change.'
                                        : state === 'REFINE'
                                            ? 'Keep the route but tighten the mechanism.'
                                            : 'Rework the route before review.'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-3xl border border-[#E6DDCF] bg-[#FFFCF7] p-5 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B8662]">Strategy Director Framework</p>
                <div className="mt-5 grid items-start gap-3 xl:grid-cols-2">
                    {[
                        {
                            label: 'Audience tension',
                            value: audienceTension,
                        },
                        {
                            label: 'Positioning implication',
                            value: positioningImplication,
                        },
                        {
                            label: 'Strategic move',
                            value: summaryRecommendedMove,
                        },
                    ].map((item) => (
                        <div key={item.label} className="rounded-[1.4rem] border border-[#ECE2D4] bg-[#FBF7F1] px-4 py-4">
                            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${LIGHT_TEXT_MUTED}`}>{item.label}</p>
                            <p className={`mt-3 text-[14px] leading-6 ${LIGHT_TEXT_PRIMARY}`}>{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid items-start gap-4 2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="rounded-3xl border border-[#E6DDCF] bg-[#FFFCF7] p-5 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B8662]">Brief Alignment</p>
                    <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <span className="inline-flex w-fit rounded-full border border-[#E5D8C8] bg-[#F7EFE4] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#876F4C]">
                            {briefAlignment}
                        </span>
                        <p className={`max-w-[62ch] text-sm leading-relaxed ${LIGHT_TEXT_SECONDARY}`}>
                            {briefAlignmentRationale(briefAlignment, strategicMove, audienceTension)}
                        </p>
                    </div>
                </div>

                <div className="rounded-3xl border border-[#E6DDCF] bg-[#FFFCF7] p-5 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B8662]">Copywriter Persuasion Alignment</p>
                    <div className="mt-5 grid items-start gap-3 xl:grid-cols-2">
                        {[
                            {
                                label: 'Promise clarity',
                                value: promiseClarity,
                                span: 'xl:col-span-1',
                            },
                            {
                                label: 'CTA-message alignment',
                                value: ctaMessageAlignment,
                                span: 'xl:col-span-1',
                            },
                            {
                                label: 'Framing strength',
                                value: framingStrength,
                                span: 'xl:col-span-2',
                            },
                            {
                                label: 'Suggested copy move',
                                value: suggestedCopyMove,
                                span: 'xl:col-span-2',
                            },
                        ].map((item) => (
                            <div key={item.label} className={`rounded-[1.4rem] border border-[#ECE2D4] bg-[#FBF7F1] px-4 py-4 ${item.span}`}>
                                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${LIGHT_TEXT_MUTED}`}>{item.label}</p>
                                <p className={`mt-3 text-[14px] leading-6 ${LIGHT_TEXT_PRIMARY}`}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isExecutiveSummary ? (
                <div className="rounded-3xl border border-[#E6DDCF] bg-[#FFFCF7] p-5 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B8662]">Executive Summary</p>
                    <div className="mt-5 grid items-start gap-3 xl:grid-cols-2">
                        {[
                            {
                                label: 'What it’s doing',
                                value: summaryWhatItsDoing,
                            },
                            {
                                label: 'Recommended move',
                                value: summaryRecommendedMove,
                            },
                            {
                                label: 'Confidence note',
                                value: confidenceNote(confidenceScore),
                            },
                        ].map((item) => (
                            <div key={item.label} className="rounded-[1.4rem] border border-[#ECE2D4] bg-[#FBF7F1] px-4 py-4">
                                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${LIGHT_TEXT_MUTED}`}>{item.label}</p>
                                <p className={`mt-3 text-[14px] leading-6 ${LIGHT_TEXT_PRIMARY}`}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
