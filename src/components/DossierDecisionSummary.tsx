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
    const triadStates: DecisionState[] = ['KEEP', 'REFINE', 'KILL'];

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-5 md:flex-row md:items-center md:justify-between md:p-6">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Decision view</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#FFFFFF]/68">
                        Toggle between the executive read and the full forensic surface without losing the underlying analysis.
                    </p>
                </div>
                <div className="inline-flex rounded-full border border-[#D4A574]/20 bg-black/20 p-1">
                    <button
                        type="button"
                        onClick={() => onToggleExecutiveSummary(false)}
                        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                            !isExecutiveSummary ? 'bg-[#D4A574] text-[#141414]' : 'text-[#D4A574] hover:bg-[#D4A574]/10'
                        }`}
                    >
                        Full Analysis
                    </button>
                    <button
                        type="button"
                        onClick={() => onToggleExecutiveSummary(true)}
                        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                            isExecutiveSummary ? 'bg-[#D4A574] text-[#141414]' : 'text-[#D4A574] hover:bg-[#D4A574]/10'
                        }`}
                    >
                        Executive Summary
                    </button>
                </div>
            </div>

            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-5 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Creative Director Decision Triad</p>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#FFFFFF]/68">
                            {decisionRationale(decision, strategicMove, confidenceScore)}
                        </p>
                    </div>
                    <a
                        href={evidenceHref}
                        className="inline-flex items-center justify-center rounded-full border border-[#D4A574]/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4A574] transition hover:bg-[#D4A574]/10"
                    >
                        Jump to Evidence
                    </a>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {triadStates.map((state) => (
                        <div
                            key={state}
                            className={`rounded-[1.4rem] border px-4 py-4 ${
                                state === decision
                                    ? 'border-[#D4A574] bg-[#D4A574]/12'
                                    : 'border-[#3A3329] bg-black/10'
                            }`}
                        >
                            <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${state === decision ? 'text-[#F2D8B0]' : 'text-[#8F7D63]'}`}>
                                {state}
                            </p>
                            <p className="mt-3 text-[13px] leading-6 text-[#FFFFFF]/72">
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

            <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-5 md:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Strategy Director Framework</p>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {[
                        {
                            label: 'Mechanism',
                            value: extraction?.primary_mechanic || 'Mechanism still resolving.',
                        },
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
                        <div key={item.label} className="rounded-[1.4rem] border border-[#3A3329] bg-black/10 px-4 py-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F7D63]">{item.label}</p>
                            <p className="mt-3 text-[14px] leading-6 text-[#F5F3EE]">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {isExecutiveSummary ? (
                <div className="rounded-3xl border border-[#D4A574]/20 bg-[#1A1A1A] p-5 md:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Executive Summary</p>
                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {[
                            {
                                label: 'What it’s doing',
                                value: summaryWhatItsDoing,
                            },
                            {
                                label: 'Why it matters',
                                value: summaryWhyItMatters,
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
                            <div key={item.label} className="rounded-[1.4rem] border border-[#3A3329] bg-black/10 px-4 py-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F7D63]">{item.label}</p>
                                <p className="mt-3 text-[14px] leading-6 text-[#F5F3EE]">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
