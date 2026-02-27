'use client';

import { FileDown, Shield, Target, Activity, Layers, Tv, Brain } from 'lucide-react';
import { AdDigest } from '@/types/digest';
import { NeuralDeconstructionService, NeuralDeconstruction } from '@/lib/neural_deconstruction_service';

interface Props {
    digest: AdDigest;
    neuralData: NeuralDeconstruction;
    brandName: string;
    agencyName: string;
    agencyLogo?: string;
    resonanceScore?: number;
    saturationLevel?: number;
    tacticalWindow?: number;
}

/**
 * StrategicDossier — Print-only Sovereignty-tier export.
 * Renders a hidden document that becomes the full page on print.
 */
export default function StrategicDossier({
    digest,
    neuralData,
    brandName,
    agencyName,
    agencyLogo,
    resonanceScore = 70,
    saturationLevel = 30,
    tacticalWindow = 60,
}: Props) {

    const handleExport = () => {
        window.print();
    };

    // Compute Sovereign Score (resonance × inverse-saturation, weighted)
    const sovereignScore = Math.round(
        (resonanceScore * 0.5) + ((100 - saturationLevel) * 0.3) + (Math.min(tacticalWindow, 90) * 0.2)
    );

    const cls = digest.classification;
    const ext = digest.extraction;
    const strat = digest.strategy;
    const category = digest.meta?.product_category_guess || 'Cross-Category';
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Color → emotion mapping
    const colorEmotionMap: Record<string, string> = {
        '0': 'Authority / Exclusivity', '1': 'Clarity / Minimalism', '2': 'Purity / Trust',
        '3': 'Innovation / Growth', '4': 'Energy / Urgency', '5': 'Depth / Confidence',
        '6': 'Luxury / Prestige', '7': 'Warmth / Belonging', '8': 'Stability / Corporate',
        '9': 'Boldness / Disruption', 'A': 'Aspiration / Elevation', 'B': 'Calming / Serenity',
        'C': 'Sophisticated / Premium', 'D': 'Fresh / Approachable', 'E': 'Alert / Action',
        'F': 'Clean / High-End',
    };

    function getColorEmotion(hex: string | null): string {
        if (!hex) return 'Not extracted';
        const firstChar = hex.charAt(0).toUpperCase();
        return colorEmotionMap[firstChar] || 'Complex / Multi-tonal';
    }

    // Generate strategic recommendation
    function getStrategicRecommendation(): string {
        const trigger = cls?.trigger_mechanic?.replace(/_/g, ' ') || 'engagement';
        if (resonanceScore > 75 && saturationLevel < 40) {
            return `Scale aggressively on high-intent channels; creative DNA is optimized for ${trigger.toLowerCase()} in an unsaturated market window.`;
        } else if (resonanceScore > 60) {
            return `Maintain current deployment with selective A/B testing on secondary platforms; ${trigger.toLowerCase()} mechanics are performing above category median.`;
        } else {
            return `Recommend creative refresh focused on strengthening the ${trigger.toLowerCase()} signal; the current execution underperforms category benchmarks.`;
        }
    }

    // Primary persuasion objective
    function getPersuasionObjective(): string {
        const trigger = cls?.trigger_mechanic || '';
        if (['Status_Prestige', 'Tribal_Belonging'].includes(trigger)) return 'Brand Authority';
        if (['FOMO_Scarcity', 'Rebellion_Disruption'].includes(trigger)) return 'Category Disruption';
        if (['Savings_Value', 'Convenience_Time'].includes(trigger)) return 'Immediate Conversion';
        return 'Audience Engagement';
    }

    return (
        <>
            {/* Export button — visible on screen */}
            <button
                onClick={handleExport}
                className="no-print flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] uppercase tracking-[0.15em] border border-[#E7DED1] rounded-xl hover:bg-[#FBF7EF] transition-all"
            >
                <FileDown className="w-3.5 h-3.5" />
                Export Strategic Dossier
            </button>

            {/* Print-only Layout */}
            <div className="dossier-print-layout">
                {/* ═══════════════════════════════════════════════════════════ */}
                {/* COVER PAGE */}
                {/* ═══════════════════════════════════════════════════════════ */}
                <div className="dossier-page dossier-cover">
                    <div className="dossier-cover-inner">
                        {/* Logo */}
                        <div className="dossier-logo-block">
                            {agencyLogo ? (
                                <img src={agencyLogo} alt="Agency Logo" className="dossier-agency-logo" />
                            ) : (
                                <div className="dossier-v-mark">V</div>
                            )}
                        </div>

                        <div className="dossier-cover-divider" />

                        <h1 className="dossier-title">
                            The Strategic Dossier
                        </h1>
                        <p className="dossier-subtitle">
                            {brandName} Analysis
                        </p>

                        <div className="dossier-cover-divider" />

                        <p className="dossier-confidential">
                            Confidential Forensic Audit for <strong>{agencyName || 'Internal Review'}</strong>
                        </p>
                        <p className="dossier-date">{dateStr}</p>

                        <div className="dossier-cover-footer">
                            <p>GENERATED BY VISUAL DECOMPILER — SOVEREIGNTY TIER</p>
                            <p>visualdecompiler.com</p>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════ */}
                {/* § 1 — EXECUTIVE SUMMARY */}
                {/* ═══════════════════════════════════════════════════════════ */}
                <div className="dossier-page">
                    <div className="dossier-section-header">
                        <span className="dossier-section-number">01</span>
                        <h2 className="dossier-section-title">Executive Summary</h2>
                        <p className="dossier-section-subtitle">The Neural Verdict</p>
                    </div>

                    <div className="dossier-content">
                        {/* Neural Thesis */}
                        <div className="dossier-verdict-block">
                            <p className="dossier-label">Neural Thesis</p>
                            <p className="dossier-quote">
                                &ldquo;{strat?.semiotic_subtext || 'Analysis in progress...'}&rdquo;
                            </p>
                        </div>

                        {/* Strategic Verdict */}
                        <div className="dossier-verdict-block" style={{ marginTop: '16px' }}>
                            <p className="dossier-label">Strategic Verdict</p>
                            <p className="dossier-body-italic">
                                &ldquo;{neuralData.strategic_verdict}&rdquo;
                            </p>
                        </div>

                        {/* Key Metrics */}
                        <div className="dossier-metrics-row">
                            <div className="dossier-metric">
                                <p className="dossier-metric-label">Sovereign Score</p>
                                <p className="dossier-metric-value">{sovereignScore}<span className="dossier-metric-unit">/100</span></p>
                            </div>
                            <div className="dossier-metric">
                                <p className="dossier-metric-label">Market Resonance</p>
                                <p className="dossier-metric-value">{resonanceScore}<span className="dossier-metric-unit">%</span></p>
                            </div>
                            <div className="dossier-metric">
                                <p className="dossier-metric-label">Tactical Window</p>
                                <p className="dossier-metric-value">{tacticalWindow}<span className="dossier-metric-unit"> days</span></p>
                            </div>
                        </div>

                        {/* Primary Objective + Recommendation */}
                        <div className="dossier-detail-block">
                            <div className="dossier-detail-item">
                                <p className="dossier-label">Primary Persuasion Objective</p>
                                <p className="dossier-body">{getPersuasionObjective()}</p>
                            </div>
                            <div className="dossier-detail-item">
                                <p className="dossier-label">Strategic Recommendation</p>
                                <p className="dossier-body">{getStrategicRecommendation()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════ */}
                {/* § 2 — VISUAL ARCHITECTURE & HIERARCHY */}
                {/* ═══════════════════════════════════════════════════════════ */}
                <div className="dossier-page">
                    <div className="dossier-section-header">
                        <span className="dossier-section-number">02</span>
                        <h2 className="dossier-section-title">Visual Architecture & Hierarchy</h2>
                        <p className="dossier-section-subtitle">Cognitive Load Heatmap & Color DNA</p>
                    </div>

                    <div className="dossier-content">
                        {/* Cognitive Load Summary */}
                        <div className="dossier-detail-block">
                            <div className="dossier-detail-item">
                                <p className="dossier-label">Cognitive Load Score</p>
                                <p className="dossier-metric-value">{neuralData.cognitive_load_score}<span className="dossier-metric-unit">%</span></p>
                                <p className="dossier-body" style={{ marginTop: '4px' }}>
                                    {neuralData.cognitive_load_score < 40
                                        ? 'Low friction composition — trigger mechanic lands without obstruction.'
                                        : neuralData.cognitive_load_score < 65
                                            ? 'Moderate demand — some signals may compete for viewer attention.'
                                            : 'High cognitive load — risk of diluting the primary persuasion message.'}
                                </p>
                            </div>
                        </div>

                        {/* Zone Breakdown */}
                        <p className="dossier-label" style={{ marginTop: '20px' }}>Friction Zone Analysis</p>
                        <table className="dossier-table">
                            <thead>
                                <tr>
                                    <th>Zone</th>
                                    <th>Load</th>
                                    <th>Assessment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {neuralData.cognitive_load_zones.map((z, i) => (
                                    <tr key={i}>
                                        <td className="dossier-table-bold">{z.zone}</td>
                                        <td>{z.load}%</td>
                                        <td>{z.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Color DNA */}
                        <div className="dossier-detail-block" style={{ marginTop: '24px' }}>
                            <p className="dossier-label">Color DNA & Sentiment Correlation</p>
                            <div className="dossier-color-row">
                                {ext?.dominant_color_hex && (
                                    <div className="dossier-color-chip">
                                        <div className="dossier-color-swatch" style={{ backgroundColor: `#${ext.dominant_color_hex}` }} />
                                        <div>
                                            <p className="dossier-body"><strong>#{ext.dominant_color_hex}</strong></p>
                                            <p className="dossier-body-sm">{getColorEmotion(ext.dominant_color_hex)}</p>
                                        </div>
                                    </div>
                                )}
                                {((ext as any)?.palette_hex || []).slice(0, 4).map((hex: string, i: number) => (
                                    <div key={i} className="dossier-color-chip">
                                        <div className="dossier-color-swatch" style={{ backgroundColor: `#${hex}` }} />
                                        <div>
                                            <p className="dossier-body"><strong>#{hex}</strong></p>
                                            <p className="dossier-body-sm">{getColorEmotion(hex)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════ */}
                {/* § 3 — SCHEMA AUTOPSY */}
                {/* ═══════════════════════════════════════════════════════════ */}
                <div className="dossier-page">
                    <div className="dossier-section-header">
                        <span className="dossier-section-number">03</span>
                        <h2 className="dossier-section-title">The Schema Autopsy</h2>
                        <p className="dossier-section-subtitle">Timeline Deconstruction</p>
                    </div>

                    <div className="dossier-content">
                        {/* 3-Second Hook Audit */}
                        <div className="dossier-detail-block">
                            <div className="dossier-detail-item">
                                <p className="dossier-label">3-Second Hook Audit</p>
                                <p className="dossier-body">
                                    <strong>Hook Type:</strong> {digest.audience_strategy?.first3s_hook_type || cls?.narrative_framework?.replace(/_/g, ' ') || 'Not classified'}
                                </p>
                                {digest.audience_strategy?.hook_clarity_score !== undefined && (
                                    <p className="dossier-body">
                                        <strong>Hook Clarity:</strong> {digest.audience_strategy.hook_clarity_score}/10
                                        {digest.audience_strategy.hook_clarity_score >= 8 ? ' — High-conviction entry point.' : digest.audience_strategy.hook_clarity_score >= 5 ? ' — Moderate clarity.' : ' — Weak hook, high skip risk.'}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Sequence Mapping */}
                        <p className="dossier-label" style={{ marginTop: '20px' }}>Persuasion Sequence Mapping</p>
                        <table className="dossier-table">
                            <thead>
                                <tr>
                                    <th>Phase</th>
                                    <th>Timing</th>
                                    <th>Mechanic</th>
                                    <th>Strategic Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {neuralData.schema_segments.map((seg, i) => (
                                    <tr key={i}>
                                        <td className="dossier-table-bold">{seg.label}</td>
                                        <td>{seg.duration_hint}</td>
                                        <td>{seg.trigger_used}</td>
                                        <td>{seg.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Objection Dismantling */}
                        {strat?.objection_tackle && (
                            <div className="dossier-detail-block" style={{ marginTop: '20px' }}>
                                <div className="dossier-detail-item">
                                    <p className="dossier-label">Objection Dismantling Logic</p>
                                    <p className="dossier-body-italic">&ldquo;{strat.objection_tackle}&rdquo;</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════ */}
                {/* § 4 — TACTICAL INTELLIGENCE & PLACEMENT */}
                {/* ═══════════════════════════════════════════════════════════ */}
                <div className="dossier-page">
                    <div className="dossier-section-header">
                        <span className="dossier-section-number">04</span>
                        <h2 className="dossier-section-title">Tactical Intelligence & Placement</h2>
                        <p className="dossier-section-subtitle">Benchmark & Platform Alignment</p>
                    </div>

                    <div className="dossier-content">
                        {/* Benchmark */}
                        <div className="dossier-detail-block">
                            <div className="dossier-detail-item">
                                <p className="dossier-label">Market Resonance Percentile</p>
                                <p className="dossier-body">
                                    This creative operates at the <strong>{neuralData.percentile_estimate}th percentile</strong> within {category} —
                                    {neuralData.percentile_estimate >= 90
                                        ? ' an elite-tier asset that outperforms the vast majority of category competitors.'
                                        : neuralData.percentile_estimate >= 75
                                            ? ' a strong performer positioned well above median. Minor refinements could push into the top decile.'
                                            : ' a solid foundation with clear pathways for optimization.'}
                                </p>
                            </div>
                        </div>

                        {/* Platform Alignment */}
                        <p className="dossier-label" style={{ marginTop: '20px' }}>Platform Alignment & Deployment</p>
                        <table className="dossier-table">
                            <thead>
                                <tr>
                                    <th>Platform</th>
                                    <th>Fit Score</th>
                                    <th>Rationale</th>
                                </tr>
                            </thead>
                            <tbody>
                                {neuralData.platform_affinity.map((p, i) => (
                                    <tr key={i}>
                                        <td className="dossier-table-bold">{p.platform}</td>
                                        <td>{p.fit_score}%</td>
                                        <td>{p.rationale}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Emotional Architecture */}
                        <p className="dossier-label" style={{ marginTop: '24px' }}>Emotional Architecture</p>
                        <table className="dossier-table">
                            <thead>
                                <tr>
                                    <th>Driver</th>
                                    <th>Intensity</th>
                                    <th>Source Signal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {neuralData.emotional_drivers.map((d, i) => (
                                    <tr key={i}>
                                        <td className="dossier-table-bold">{d.driver}</td>
                                        <td>{d.intensity}%</td>
                                        <td>{d.source}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════ */}
                {/* § 5 — SECURITY & INFRASTRUCTURE */}
                {/* ═══════════════════════════════════════════════════════════ */}
                <div className="dossier-page">
                    <div className="dossier-section-header">
                        <span className="dossier-section-number">05</span>
                        <h2 className="dossier-section-title">Security & Infrastructure Verification</h2>
                        <p className="dossier-section-subtitle">Data Sovereignty Notice</p>
                    </div>

                    <div className="dossier-content">
                        <div className="dossier-security-block">
                            <p className="dossier-label">Data Sovereignty</p>
                            <p className="dossier-body">
                                This dossier was generated on ISO-27001 compliant infrastructure and is the exclusive
                                intellectual property of <strong>{agencyName || 'the authorizing organization'}</strong>.
                                Distribution outside designated stakeholders is prohibited without written consent.
                            </p>

                            <div className="dossier-security-details">
                                <div>
                                    <p className="dossier-label">Classification</p>
                                    <p className="dossier-body">Confidential — Strategic</p>
                                </div>
                                <div>
                                    <p className="dossier-label">Generated</p>
                                    <p className="dossier-body">{dateStr}</p>
                                </div>
                                <div>
                                    <p className="dossier-label">Prompt Version</p>
                                    <p className="dossier-body">{(digest.meta as any)?.prompt_version || 'V1'}</p>
                                </div>
                                <div>
                                    <p className="dossier-label">Confidence Index</p>
                                    <p className="dossier-body">{Math.round((digest.diagnostics?.confidence?.overall || 0.75) * 100)}%</p>
                                </div>
                            </div>
                        </div>

                        <div className="dossier-final-footer">
                            <p>— End of Dossier —</p>
                            {agencyLogo ? (
                                <img src={agencyLogo} alt="" className="dossier-footer-logo" />
                            ) : (
                                <p className="dossier-footer-mark">VISUAL DECOMPILER</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* PRINT STYLESHEET */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <style jsx global>{`
                /* Hide dossier on screen */
                .dossier-print-layout {
                    display: none;
                }

                @media print {
                    /* Hide everything except the dossier */
                    body > *:not(.dossier-print-layout) { display: none !important; }
                    .no-print { display: none !important; }
                    header, aside, nav, footer { display: none !important; }

                    /* Show the dossier */
                    .dossier-print-layout {
                        display: block !important;
                        position: absolute;
                        top: 0; left: 0;
                        width: 100%;
                    }

                    body {
                        background: white !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }

                    /* Page setup */
                    @page {
                        size: A4;
                        margin: 0;
                    }

                    .dossier-page {
                        width: 210mm;
                        min-height: 297mm;
                        padding: 24mm 28mm;
                        box-sizing: border-box;
                        page-break-after: always;
                        position: relative;
                        font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
                    }

                    .dossier-page:last-child {
                        page-break-after: auto;
                    }

                    /* ── Cover ── */
                    .dossier-cover {
                        display: flex !important;
                        align-items: center;
                        justify-content: center;
                        background: #141414 !important;
                        color: #FBF7EF !important;
                    }

                    .dossier-cover-inner {
                        text-align: center;
                        max-width: 400px;
                    }

                    .dossier-logo-block { margin-bottom: 32px; }

                    .dossier-agency-logo {
                        max-height: 60px;
                        max-width: 200px;
                        object-fit: contain;
                    }

                    .dossier-v-mark {
                        display: inline-block;
                        font-size: 48px;
                        font-weight: 200;
                        letter-spacing: 0.1em;
                        color: #FBF7EF;
                        border: 1px solid rgba(251, 247, 239, 0.15);
                        padding: 12px 24px;
                    }

                    .dossier-cover-divider {
                        width: 40px;
                        height: 1px;
                        background: rgba(251, 247, 239, 0.15);
                        margin: 28px auto;
                    }

                    .dossier-title {
                        font-size: 28px;
                        font-weight: 300;
                        letter-spacing: 0.15em;
                        text-transform: uppercase;
                        margin: 0 0 8px;
                        color: #FBF7EF;
                    }

                    .dossier-subtitle {
                        font-size: 14px;
                        font-weight: 400;
                        letter-spacing: 0.1em;
                        text-transform: uppercase;
                        color: rgba(251, 247, 239, 0.5);
                        margin: 0;
                    }

                    .dossier-confidential {
                        font-size: 10px;
                        letter-spacing: 0.2em;
                        text-transform: uppercase;
                        color: rgba(251, 247, 239, 0.35);
                        margin: 0 0 6px;
                    }

                    .dossier-date {
                        font-size: 9px;
                        letter-spacing: 0.15em;
                        text-transform: uppercase;
                        color: rgba(251, 247, 239, 0.2);
                        margin: 0;
                    }

                    .dossier-cover-footer {
                        position: absolute;
                        bottom: 28mm;
                        left: 0; right: 0;
                        text-align: center;
                    }

                    .dossier-cover-footer p {
                        font-size: 7px;
                        letter-spacing: 0.3em;
                        text-transform: uppercase;
                        color: rgba(251, 247, 239, 0.15);
                        margin: 0 0 4px;
                    }

                    /* ── Section Headers ── */
                    .dossier-section-header {
                        margin-bottom: 28px;
                        padding-bottom: 16px;
                        border-bottom: 1px solid #E7DED1;
                    }

                    .dossier-section-number {
                        display: block;
                        font-size: 9px;
                        font-weight: 700;
                        letter-spacing: 0.4em;
                        text-transform: uppercase;
                        color: #B5A99A;
                        margin-bottom: 8px;
                    }

                    .dossier-section-title {
                        font-size: 20px;
                        font-weight: 300;
                        letter-spacing: 0.05em;
                        text-transform: uppercase;
                        color: #141414;
                        margin: 0 0 4px;
                    }

                    .dossier-section-subtitle {
                        font-size: 9px;
                        font-weight: 600;
                        letter-spacing: 0.25em;
                        text-transform: uppercase;
                        color: #6B6B6B;
                        margin: 0;
                    }

                    /* ── Content Typography ── */
                    .dossier-content { color: #141414; }

                    .dossier-label {
                        font-size: 8px;
                        font-weight: 700;
                        letter-spacing: 0.3em;
                        text-transform: uppercase;
                        color: #6B6B6B;
                        margin: 0 0 6px;
                    }

                    .dossier-body {
                        font-size: 10px;
                        line-height: 1.7;
                        color: #141414;
                        margin: 0;
                    }

                    .dossier-body-sm {
                        font-size: 8px;
                        color: #6B6B6B;
                        margin: 0;
                    }

                    .dossier-body-italic {
                        font-size: 11px;
                        line-height: 1.6;
                        font-style: italic;
                        color: #141414;
                        margin: 0;
                    }

                    .dossier-quote {
                        font-size: 13px;
                        line-height: 1.6;
                        font-style: italic;
                        font-weight: 300;
                        color: #141414;
                        border-left: 2px solid #B5A99A;
                        padding-left: 12px;
                        margin: 0;
                    }

                    /* ── Verdict Block ── */
                    .dossier-verdict-block {
                        padding: 16px 0;
                    }

                    /* ── Metrics Row ── */
                    .dossier-metrics-row {
                        display: flex;
                        gap: 24px;
                        padding: 20px 0;
                        margin: 16px 0;
                        border-top: 1px solid #E7DED1;
                        border-bottom: 1px solid #E7DED1;
                    }

                    .dossier-metric { flex: 1; }

                    .dossier-metric-label {
                        font-size: 7px;
                        font-weight: 700;
                        letter-spacing: 0.3em;
                        text-transform: uppercase;
                        color: #6B6B6B;
                        margin: 0 0 4px;
                    }

                    .dossier-metric-value {
                        font-size: 28px;
                        font-weight: 300;
                        color: #141414;
                        margin: 0;
                    }

                    .dossier-metric-unit {
                        font-size: 11px;
                        font-weight: 400;
                        color: #6B6B6B;
                    }

                    /* ── Detail Block ── */
                    .dossier-detail-block {
                        margin-top: 16px;
                    }

                    .dossier-detail-item {
                        margin-bottom: 16px;
                    }

                    /* ── Tables ── */
                    .dossier-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 8px;
                        font-size: 9px;
                    }

                    .dossier-table th {
                        text-align: left;
                        font-size: 7px;
                        font-weight: 700;
                        letter-spacing: 0.2em;
                        text-transform: uppercase;
                        color: #6B6B6B;
                        padding: 6px 8px;
                        border-bottom: 1px solid #141414;
                    }

                    .dossier-table td {
                        padding: 6px 8px;
                        border-bottom: 1px solid #E7DED1;
                        color: #141414;
                        line-height: 1.5;
                        vertical-align: top;
                    }

                    .dossier-table-bold {
                        font-weight: 600;
                    }

                    /* ── Color Chips ── */
                    .dossier-color-row {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 12px;
                        margin-top: 8px;
                    }

                    .dossier-color-chip {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .dossier-color-swatch {
                        width: 24px;
                        height: 24px;
                        border-radius: 4px;
                        border: 1px solid #E7DED1;
                    }

                    /* ── Security Block ── */
                    .dossier-security-block {
                        padding: 20px;
                        border: 1px solid #E7DED1;
                        border-radius: 8px;
                    }

                    .dossier-security-details {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr 1fr;
                        gap: 16px;
                        margin-top: 20px;
                        padding-top: 16px;
                        border-top: 1px solid #E7DED1;
                    }

                    /* ── Final Footer ── */
                    .dossier-final-footer {
                        margin-top: 60px;
                        text-align: center;
                        color: #B5A99A;
                    }

                    .dossier-final-footer p {
                        font-size: 9px;
                        letter-spacing: 0.3em;
                        text-transform: uppercase;
                        margin: 0 0 16px;
                    }

                    .dossier-footer-logo {
                        max-height: 30px;
                        opacity: 0.4;
                    }

                    .dossier-footer-mark {
                        font-size: 8px;
                        letter-spacing: 0.5em;
                        text-transform: uppercase;
                        color: #B5A99A;
                        opacity: 0.3;
                        margin: 0;
                    }
                }
            `}</style>
        </>
    );
}
