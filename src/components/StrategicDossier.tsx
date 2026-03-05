'use client';

import { useRef } from 'react';
import { FileDown } from 'lucide-react';
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

const fmt = (s?: string | null) => s ? s.replace(/_/g, ' ') : '—';
const pct = (n?: number | null) => n != null ? `${Math.round(n)}%` : '—';
const score = (n?: number | null, suffix = '') => n != null ? `${Math.round(n)}${suffix}` : '—';
const arr = (a?: string[] | null) => a?.length ? a.join(' · ') : '—';

const DOSSIER_CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Helvetica Neue', Arial, sans-serif; background: white; color: #141414; }
@page { size: A4; margin: 0; }
@media print { html, body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
.dp { width: 210mm; min-height: 297mm; padding: 20mm 24mm; box-sizing: border-box; page-break-after: always; position: relative; }
.dp:last-child { page-break-after: auto; }
.cover { background: #141414 !important; color: #FBF7EF !important; display: flex !important; align-items: center; justify-content: center; }
.cover * { color: inherit; }
.v-mark { display: inline-block; font-size: 48px; font-weight: 200; letter-spacing: 0.1em; border: 1px solid rgba(251,247,239,0.2); padding: 12px 28px; margin-bottom: 28px; }
.cover-divider { width: 40px; height: 1px; background: rgba(251,247,239,0.15); margin: 24px auto; }
.cover-title { font-size: 26px; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px; }
.cover-brand { font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.5; }
.cover-meta { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.3; margin-top: 6px; }
.cover-footer { position: absolute; bottom: 20mm; left: 0; right: 0; text-align: center; font-size: 7px; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.15; }
.pg-num { font-size: 8px; font-weight: 700; letter-spacing: 0.35em; text-transform: uppercase; color: #B5A99A; display: block; margin-bottom: 6px; }
.pg-title { font-size: 22px; font-weight: 300; letter-spacing: 0.05em; text-transform: uppercase; color: #141414; margin-bottom: 2px; }
.pg-sub { font-size: 8px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: #8A8A8A; }
.divider { height: 1px; background: #E7DED1; margin: 16px 0 20px; }
.section { margin-bottom: 22px; }
.lbl { font-size: 7px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: #8A8A8A; margin-bottom: 5px; }
.val { font-size: 10px; line-height: 1.65; color: #141414; }
.val-lg { font-size: 28px; font-weight: 300; color: #141414; }
.val-sm { font-size: 8.5px; line-height: 1.6; color: #141414; }
.italic { font-style: italic; }
.quote { font-size: 12px; line-height: 1.65; font-style: italic; font-weight: 300; border-left: 2px solid #B5A99A; padding-left: 12px; }
.cols2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.cols3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.cols4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; }
.metrics { display: flex; gap: 28px; padding: 16px 0; border-top: 1px solid #E7DED1; border-bottom: 1px solid #E7DED1; margin: 14px 0; }
.metric .lbl { margin-bottom: 2px; }
.metric .val-lg { line-height: 1; }
.metric .unit { font-size: 11px; font-weight: 400; color: #888; }
table { width: 100%; border-collapse: collapse; font-size: 8.5px; margin-top: 6px; }
th { text-align: left; font-size: 7px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A8A; padding: 5px 8px; border-bottom: 1px solid #141414; }
td { padding: 5px 8px; border-bottom: 1px solid #E7DED1; color: #141414; line-height: 1.45; vertical-align: top; }
td.bold { font-weight: 600; }
td.muted { color: #888; }
.chip { display: inline-block; background: #F4EFE6; border: 1px solid #E7DED1; padding: 2px 7px; border-radius: 3px; font-size: 8px; font-weight: 600; letter-spacing: 0.05em; margin: 2px 3px 2px 0; }
.swatch { display: inline-block; width: 20px; height: 20px; border-radius: 3px; border: 1px solid #E7DED1; margin-right: 6px; vertical-align: middle; }
.swatch-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
.swatch-item { display: flex; align-items: center; font-size: 8px; color: #141414; }
.box { border: 1px solid #E7DED1; border-radius: 6px; padding: 14px 16px; margin-top: 8px; }
.risk-high { color: #C0392B; font-weight: 700; }
.risk-med { color: #D68910; font-weight: 700; }
.risk-low { color: #27AE60; font-weight: 700; }
.pg-footer { position: absolute; bottom: 12mm; left: 24mm; right: 24mm; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E7DED1; padding-top: 8px; }
.pg-footer span { font-size: 7px; letter-spacing: 0.2em; text-transform: uppercase; color: #C0B8AD; }
`;

export default function StrategicDossier({ digest, neuralData, brandName, agencyName, agencyLogo, resonanceScore = 70, saturationLevel = 30, tacticalWindow = 60 }: Props) {
    const dossierRef = useRef<HTMLDivElement>(null);

    const handleExport = () => {
        const el = dossierRef.current;
        if (!el) return;
        const popup = window.open('', '_blank', 'width=900,height=700');
        if (!popup) { alert('Please allow popups to export the dossier.'); return; }
        popup.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Strategic Dossier — ${brandName}</title><style>${DOSSIER_CSS}</style></head><body>${el.innerHTML}</body></html>`);
        popup.document.close();
        popup.addEventListener('load', () => { popup.focus(); popup.print(); });
        setTimeout(() => { try { popup.focus(); popup.print(); } catch { } }, 800);
    };

    const sovereignScore = Math.round((resonanceScore * 0.5) + ((100 - saturationLevel) * 0.3) + (Math.min(tacticalWindow, 90) * 0.2));
    const cls = digest.classification;
    const ext = digest.extraction;
    const strat = digest.strategy;
    const meta = digest.meta;
    const aud = digest.audience_strategy;
    const prem = digest.premium_intelligence;
    const semi = digest.semiotic_intelligence;
    const nd = neuralData;
    const diag = digest.diagnostics;
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const PageFooter = ({ page }: { page: string }) => (
        <div className="pg-footer">
            <span>Strategic Dossier — {brandName}</span>
            <span>{page}</span>
            <span>Visual Decompiler</span>
        </div>
    );

    return (
        <>
            <button onClick={handleExport} className="no-print flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] uppercase tracking-[0.15em] border border-[#E7DED1] rounded-xl hover:bg-[#FBF7EF] transition-all">
                <FileDown className="w-3.5 h-3.5" />
                Export Strategic Dossier
            </button>

            <div className="dossier-print-layout" ref={dossierRef}>

                {/* ── PAGE 1: COVER ── */}
                <div className="dp cover">
                    <div style={{ textAlign: 'center', maxWidth: 420 }}>
                        <div className="v-mark">{agencyLogo ? <img src={agencyLogo} alt="" style={{ maxHeight: 56, maxWidth: 180, objectFit: 'contain' }} /> : 'V'}</div>
                        <div className="cover-divider" />
                        <p className="cover-title">The Strategic Dossier</p>
                        <p className="cover-brand">{brandName || meta?.brand_guess || 'Brand'} Analysis</p>
                        <p className="cover-meta">Confidential Forensic Audit &nbsp;·&nbsp; {dateStr}</p>
                        <p className="cover-meta" style={{ marginTop: 4 }}>{fmt(meta?.campaign_category)} &nbsp;·&nbsp; {fmt(meta?.product_category_guess)}</p>
                    </div>
                    <div className="cover-footer"><p>Generated by Visual Decompiler — Sovereignty Tier &nbsp;·&nbsp; visualdecompiler.com</p></div>
                </div>

                {/* ── PAGE 2: EXECUTIVE SUMMARY ── */}
                <div className="dp">
                    <span className="pg-num">01</span>
                    <p className="pg-title">Executive Summary</p>
                    <p className="pg-sub">Neural Verdict &amp; Sovereign Intelligence</p>
                    <div className="divider" />

                    {nd?.strategic_verdict && (
                        <div className="section">
                            <p className="lbl">Neural Thesis</p>
                            <p className="quote">{nd.strategic_verdict}</p>
                        </div>
                    )}

                    {strat?.positioning_claim && (
                        <div className="section">
                            <p className="lbl">Strategic Verdict</p>
                            <p className="quote">{strat.positioning_claim}</p>
                        </div>
                    )}

                    <div className="metrics">
                        <div className="metric"><p className="lbl">Sovereign Score</p><p className="val-lg">{sovereignScore}<span className="unit">/100</span></p></div>
                        <div className="metric"><p className="lbl">Market Resonance</p><p className="val-lg">{resonanceScore}<span className="unit">%</span></p></div>
                        <div className="metric"><p className="lbl">Tactical Window</p><p className="val-lg">{Math.min(tacticalWindow, 90)}<span className="unit"> days</span></p></div>
                        {nd?.percentile_estimate != null && <div className="metric"><p className="lbl">Category Percentile</p><p className="val-lg">{nd.percentile_estimate}<span className="unit">th</span></p></div>}
                        {prem?.premium_index_score != null && <div className="metric"><p className="lbl">Premium Index</p><p className="val-lg">{prem.premium_index_score}<span className="unit">/100</span></p></div>}
                    </div>

                    <div className="cols2">
                        <div>
                            <p className="lbl">Brand &amp; Category</p>
                            <p className="val">{meta?.brand_guess || brandName} &nbsp;·&nbsp; {fmt(meta?.product_category_guess)}</p>
                            {meta?.aesthetic_year && <p className="val">Aesthetic Era: {meta.aesthetic_year}</p>}
                            {meta?.adoption_tier && <p className="val">Adoption Tier: {fmt(meta.adoption_tier)}</p>}
                            {meta?.predicted_resonance_window && <p className="val">Resonance Window: {meta.predicted_resonance_window}</p>}
                        </div>
                        <div>
                            <p className="lbl">Persuasion Objective</p>
                            <p className="val">{strat?.target_job_to_be_done || fmt(cls?.trigger_mechanic)}</p>

                        </div>
                    </div>

                    {diag?.confidence && (
                        <div className="section" style={{ marginTop: 20 }}>
                            <p className="lbl">Confidence Indices</p>
                            <table>
                                <thead><tr><th>Signal</th><th>Confidence</th></tr></thead>
                                <tbody>
                                    {diag.confidence.overall != null && <tr><td className="bold">Overall</td><td>{pct((diag.confidence.overall ?? 0) * 100)}</td></tr>}
                                    {diag.confidence.trigger_mechanic != null && <tr><td>Trigger Mechanic</td><td>{pct((diag.confidence.trigger_mechanic ?? 0) * 100)}</td></tr>}
                                    {diag.confidence.narrative_framework != null && <tr><td>Narrative Framework</td><td>{pct((diag.confidence.narrative_framework ?? 0) * 100)}</td></tr>}
                                    {diag.confidence.color_extraction != null && <tr><td>Color Extraction</td><td>{pct((diag.confidence.color_extraction ?? 0) * 100)}</td></tr>}
                                    {diag.confidence.subtext != null && <tr><td>Semiotic Subtext</td><td>{pct((diag.confidence.subtext ?? 0) * 100)}</td></tr>}
                                    {diag.confidence.objection != null && <tr><td>Objection Analysis</td><td>{pct((diag.confidence.objection ?? 0) * 100)}</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <PageFooter page="02 / Executive Summary" />
                </div>

                {/* ── PAGE 3: CLASSIFICATION INTELLIGENCE ── */}
                <div className="dp">
                    <span className="pg-num">02</span>
                    <p className="pg-title">Classification Intelligence</p>
                    <p className="pg-sub">Trigger Architecture &amp; Persuasion Stack</p>
                    <div className="divider" />

                    <div className="cols2" style={{ marginBottom: 20 }}>
                        <div>
                            <div className="section"><p className="lbl">Primary Trigger Mechanic</p><p className="val">{fmt(cls?.trigger_mechanic)}</p></div>
                            {cls?.secondary_trigger_mechanic && <div className="section"><p className="lbl">Secondary Trigger</p><p className="val">{fmt(cls.secondary_trigger_mechanic)}</p></div>}
                            <div className="section"><p className="lbl">Narrative Framework</p><p className="val">{fmt(cls?.narrative_framework)}</p></div>
                            <div className="section"><p className="lbl">Gaze Priority</p><p className="val">{fmt(cls?.gaze_priority)}</p></div>
                            <div className="section"><p className="lbl">Offer Type</p><p className="val">{fmt(cls?.offer_type)}</p></div>
                        </div>
                        <div>
                            <div className="section"><p className="lbl">Visual Style</p><p className="val">{cls?.visual_style?.map(fmt).join(', ') || '—'}</p></div>
                            <div className="section"><p className="lbl">Emotion Tone</p><p className="val">{cls?.emotion_tone?.map(fmt).join(', ') || '—'}</p></div>
                            <div className="section"><p className="lbl">Cognitive Load</p><p className="val">{fmt(cls?.cognitive_load)}</p></div>
                            <div className="section"><p className="lbl">CTA Strength</p><p className="val">{fmt(cls?.cta_strength)}</p></div>
                            <div className="section"><p className="lbl">Claim Type</p><p className="val">{fmt(cls?.claim_type)}</p></div>
                            <div className="section"><p className="lbl">Proof Type</p><p className="val">{cls?.proof_type?.map(fmt).join(', ') || '—'}</p></div>
                        </div>
                    </div>

                    {cls?.brand_association_values?.length ? (
                        <div className="section">
                            <p className="lbl">Brand Association Values</p>
                            <div style={{ marginTop: 6 }}>{cls.brand_association_values.map((v, i) => <span key={i} className="chip">{v}</span>)}</div>
                        </div>
                    ) : null}

                    {cls?.stack_type_label && <div className="section"><p className="lbl">Stack Type</p><p className="val">{cls.stack_type_label}</p></div>}

                    {cls?.persuasion_stack?.length ? (
                        <div className="section">
                            <p className="lbl">Weighted Persuasion Stack</p>
                            <table>
                                <thead><tr><th>#</th><th>Trigger</th><th>Weight</th><th>Rationale</th></tr></thead>
                                <tbody>
                                    {cls.persuasion_stack.sort((a, b) => a.sequence - b.sequence).map((s, i) => (
                                        <tr key={i}><td className="bold">{s.sequence}</td><td>{fmt(s.trigger as string)}</td><td>{s.weight}%</td><td className="muted">{s.rationale}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}

                    {meta?.historical_genealogy && <div className="section"><p className="lbl">Historical Genealogy</p><p className="val italic">{meta.historical_genealogy}</p></div>}
                    <PageFooter page="03 / Classification" />
                </div>

                {/* ── PAGE 4: FORENSIC EVIDENCE ── */}
                <div className="dp">
                    <span className="pg-num">03</span>
                    <p className="pg-title">Forensic Evidence</p>
                    <p className="pg-sub">Visual Architecture, Copy &amp; Evidence Anchors</p>
                    <div className="divider" />

                    <div className="cols2" style={{ marginBottom: 16 }}>
                        <div>
                            <p className="lbl">Composition Notes</p>
                            <p className="val-sm">{ext?.composition_notes || '—'}</p>
                        </div>
                        <div>
                            <p className="lbl">Notable Visual Elements</p>
                            <p className="val-sm">{ext?.notable_visual_elements?.join(' · ') || '—'}</p>
                        </div>
                    </div>

                    {ext?.on_screen_copy && (
                        <div className="section">
                            <p className="lbl">On-Screen Copy</p>
                            <div className="cols2" style={{ marginTop: 6 }}>
                                <div><p className="lbl">Primary Headline</p><p className="val">{ext.on_screen_copy.primary_headline || '—'}</p></div>
                                <div><p className="lbl">CTA Text</p><p className="val">{ext.on_screen_copy.cta_text || '—'}</p></div>
                            </div>
                            {ext.on_screen_copy.supporting_copy?.length ? (
                                <div style={{ marginTop: 8 }}>
                                    <p className="lbl">Supporting Copy</p>
                                    {ext.on_screen_copy.supporting_copy.map((c, i) => <p key={i} className="val-sm">· {c}</p>)}
                                </div>
                            ) : null}
                        </div>
                    )}

                    <div className="cols2" style={{ marginTop: 14, marginBottom: 10 }}>
                        <div>
                            <p className="lbl">Color DNA</p>
                            <div className="swatch-row">
                                {ext?.palette_hex?.map((h, i) => (
                                    <div key={i} className="swatch-item">
                                        <div className="swatch" style={{ background: h.startsWith('#') ? h : `#${h}` }} />
                                        <span>#{h.replace('#', '')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            {aud?.hook_clarity_score != null && <div className="section"><p className="lbl">Hook Clarity Score</p><p className="val">{aud.hook_clarity_score}/10</p></div>}
                            {aud?.first3s_hook_type && <div className="section"><p className="lbl">Hook Type</p><p className="val">{fmt(aud.first3s_hook_type)}</p></div>}
                        </div>
                    </div>

                    {ext?.likely_scan_path?.length ? (
                        <div className="section">
                            <p className="lbl">Attention Scan Path</p>
                            <table>
                                <thead><tr><th>Step</th><th>Target</th><th>Rationale</th></tr></thead>
                                <tbody>
                                    {ext.likely_scan_path.map((s, i) => (
                                        <tr key={i}><td className="bold">{s.step}</td><td>{s.target}</td><td className="muted">{s.rationale}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}

                    {ext?.evidence_receipts?.length ? (
                        <div className="section">
                            <p className="lbl">Evidence Receipts</p>
                            <table>
                                <thead><tr><th>Type</th><th>Label</th><th>Reason</th></tr></thead>
                                <tbody>
                                    {ext.evidence_receipts.map((e, i) => (
                                        <tr key={i}><td className="muted">{e.type}</td><td className="bold">{e.label}</td><td>{e.reason}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}

                    {strat?.evidence_anchors?.length ? (
                        <div className="section"><p className="lbl">Strategic Evidence Anchors</p><p className="val">{strat.evidence_anchors.join(' · ')}</p></div>
                    ) : null}
                    <PageFooter page="04 / Forensic Evidence" />
                </div>

                {/* ── PAGE 5: SEMIOTIC & AUDIENCE ── */}
                <div className="dp">
                    <span className="pg-num">04</span>
                    <p className="pg-title">Semiotic &amp; Audience Intelligence</p>
                    <p className="pg-sub">Subtext Layers, Audience Strategy &amp; Premium Index</p>
                    <div className="divider" />

                    {semi?.semiotic_layers?.length ? (
                        <div className="section">
                            <p className="lbl">Semiotic Layers</p>
                            <table>
                                <thead><tr><th>Layer</th><th>Cues</th><th>Claim</th></tr></thead>
                                <tbody>
                                    {semi.semiotic_layers.map((l, i) => (
                                        <tr key={i}><td className="bold">{l.layer_name}</td><td className="muted">{l.cues.join(', ')}</td><td>{l.claim}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}

                    {semi?.semiotic_tensions?.length ? (
                        <div className="section">
                            <p className="lbl">Semiotic Tensions</p>
                            {semi.semiotic_tensions.map((t, i) => <p key={i} className="val-sm">· {t}</p>)}
                        </div>
                    ) : null}

                    {semi?.possible_readings?.length ? (
                        <div className="section">
                            <p className="lbl">Possible Audience Readings</p>
                            {semi.possible_readings.map((r, i) => (
                                <div key={i} style={{ marginBottom: 8 }}>
                                    <p className="val">{r.reading}</p>
                                    <p className="val-sm">{r.support.join(' · ')}</p>
                                    {r.note && <p className="val-sm italic">{r.note}</p>}
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {strat?.semiotic_subtext && <div className="section"><p className="lbl">Semiotic Subtext</p><p className="quote">{strat.semiotic_subtext}</p></div>}

                    <div className="divider" />

                    {prem && (
                        <div className="cols3">
                            <div><p className="lbl">Premium Principle</p><p className="val">{fmt(prem.premium_principle_primary)}</p></div>
                            <div><p className="lbl">Exclusivity Mode</p><p className="val">{fmt(prem.exclusivity_mode)}</p></div>
                            <div><p className="lbl">Premium Index</p><p className="val">{score(prem.premium_index_score)}/100</p></div>
                        </div>
                    )}

                    {aud && (
                        <>
                            <div className="divider" />
                            <div className="cols2">
                                <div>
                                    <p className="lbl">Target Audience Segment</p>
                                    <p className="val">{aud.target_audience_segment || '—'}</p>
                                    {aud.unmet_need_tags?.length ? (
                                        <div style={{ marginTop: 10 }}>
                                            <p className="lbl">Unmet Need Tags</p>
                                            {aud.unmet_need_tags.map((t, i) => <span key={i} className="chip">{t}</span>)}
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    <p className="lbl">Transfer Mechanism</p>
                                    <p className="val">{aud.transfer_mechanism || '—'}</p>
                                </div>
                            </div>
                        </>
                    )}
                    <PageFooter page="05 / Semiotic & Audience" />
                </div>

                {/* ── PAGE 6: STRATEGY ── */}
                <div className="dp">
                    <span className="pg-num">05</span>
                    <p className="pg-title">Strategic Intelligence</p>
                    <p className="pg-sub">Positioning, Behavioral Architecture &amp; Competitive Mapping</p>
                    <div className="divider" />

                    <div className="cols2" style={{ marginBottom: 16 }}>
                        <div>
                            <div className="section"><p className="lbl">Target Job to Be Done</p><p className="val">{strat?.target_job_to_be_done || '—'}</p></div>
                            <div className="section"><p className="lbl">Positioning Claim</p><p className="val">{strat?.positioning_claim || '—'}</p></div>
                            <div className="section"><p className="lbl">Differentiator Angle</p><p className="val">{strat?.differentiator_angle || '—'}</p></div>
                        </div>
                        <div>
                            <div className="section"><p className="lbl">Behavioral Nudge</p><p className="val">{strat?.behavioral_nudge || '—'}</p></div>
                            <div className="section"><p className="lbl">Objection Tackle</p><p className="val">{strat?.objection_tackle || '—'}</p></div>
                            <div className="section"><p className="lbl">Friction Removed</p><p className="val">{strat?.misdirection_or_friction_removed || '—'}</p></div>
                        </div>
                    </div>

                    {strat?.competitive_advantage && <div className="section"><p className="lbl">Competitive Advantage</p><p className="quote">{strat.competitive_advantage}</p></div>}

                    {strat?.competitive_intelligence && (
                        <>
                            <div className="divider" />
                            <p className="lbl">Competitive Intelligence</p>
                            <div className="cols2" style={{ marginTop: 8 }}>
                                <div>
                                    <p className="lbl">Pattern Overlaps</p>
                                    {strat.competitive_intelligence.pattern_overlaps.map((p, i) => <p key={i} className="val-sm">· {p}</p>)}
                                </div>
                                <div>
                                    <p className="lbl">Differentiation Levers</p>
                                    {strat.competitive_intelligence.differentiation_levers.map((d, i) => <p key={i} className="val-sm">· {d}</p>)}
                                </div>
                            </div>
                            {strat.competitive_intelligence.strategic_shift && (
                                <div style={{ marginTop: 12 }}>
                                    <p className="lbl">Strategic Shift Target: {strat.competitive_intelligence.strategic_shift.target_posture}</p>
                                    {strat.competitive_intelligence.strategic_shift.moves.map((m, i) => <p key={i} className="val-sm">· {m}</p>)}
                                </div>
                            )}
                        </>
                    )}

                    {strat?.reconstruction_prompt && (
                        <>
                            <div className="divider" />
                            <div className="section">
                                <p className="lbl">DNA Reconstruction Prompt</p>
                                <div className="box"><p className="val-sm">{strat.reconstruction_prompt}</p></div>
                            </div>
                        </>
                    )}
                    <PageFooter page="06 / Strategic Intelligence" />
                </div>

                {/* ── PAGE 7: SCHEMA AUTOPSY & NEURAL ── */}
                <div className="dp">
                    <span className="pg-num">06</span>
                    <p className="pg-title">Schema Autopsy &amp; Neural Map</p>
                    <p className="pg-sub">Timeline Deconstruction, Narrative Arc &amp; Emotional Drivers</p>
                    <div className="divider" />

                    {nd?.schema_segments?.length ? (
                        <div className="section">
                            <p className="lbl">Schema Segments</p>
                            <table>
                                <thead><tr><th>Segment</th><th>Duration</th><th>Trigger</th><th>Strategic Note</th></tr></thead>
                                <tbody>
                                    {nd.schema_segments.map((s, i) => (
                                        <tr key={i}><td className="bold">{s.label}</td><td className="muted">{s.duration_hint}</td><td>{fmt(s.trigger_used)}</td><td className="muted">{s.note}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}

                    {ext?.narrative_arc && (
                        <div className="section">
                            <p className="lbl">Narrative Arc Analysis</p>
                            <div className="cols2" style={{ marginTop: 8 }}>
                                <div><p className="lbl">Hook Analysis</p><p className="val-sm">{ext.narrative_arc.hook_analysis}</p></div>
                                <div><p className="lbl">Retention Mechanics</p><p className="val-sm">{ext.narrative_arc.retention_mechanics}</p></div>
                            </div>
                            <div className="cols2" style={{ marginTop: 10 }}>
                                <div><p className="lbl">Story Structure</p><p className="val-sm">{ext.narrative_arc.story_structure}</p></div>
                                <div><p className="lbl">CTA Climax</p><p className="val-sm">{ext.narrative_arc.cta_climax}</p></div>
                            </div>
                        </div>
                    )}

                    {nd?.emotional_drivers?.length ? (
                        <div className="section">
                            <p className="lbl">Emotional Drivers</p>
                            <table>
                                <thead><tr><th>Driver</th><th>Intensity</th><th>Source Signal</th></tr></thead>
                                <tbody>
                                    {nd.emotional_drivers.map((d, i) => (
                                        <tr key={i}><td className="bold">{d.driver}</td><td>{pct(d.intensity)}</td><td className="muted">{d.source}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}

                    {strat?.test_plan && (
                        <div className="section">
                            <p className="lbl">14-Day A/B Test Blueprint — {strat.test_plan.hypothesis}</p>
                            <table>
                                <thead><tr><th>Lever</th><th>Change</th><th>Impact</th><th>Rationale</th></tr></thead>
                                <tbody>
                                    {strat.test_plan.test_cells.map((t, i) => (
                                        <tr key={i}><td className="bold">{fmt(t.lever)}</td><td>{t.change}</td><td>{t.predicted_impact}</td><td className="muted">{t.rationale}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {strat?.variant_matrix?.length ? (
                        <div className="section">
                            <p className="lbl">Variant Matrix</p>
                            <table>
                                <thead><tr><th>Variant</th><th>Primary Lever</th><th>Description</th></tr></thead>
                                <tbody>
                                    {strat.variant_matrix.map((v, i) => (
                                        <tr key={i}><td className="bold">{v.name}</td><td className="muted">{v.primary_lever}</td><td>{v.description}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                    <PageFooter page="07 / Schema Autopsy" />
                </div>

                {/* ── PAGE 8: PLATFORM & RISK ── */}
                <div className="dp">
                    <span className="pg-num">07</span>
                    <p className="pg-title">Platform &amp; Risk Intelligence</p>
                    <p className="pg-sub">Deployment Affinity, Diagnostics &amp; Policy Risk</p>
                    <div className="divider" />

                    {nd?.platform_affinity?.length ? (
                        <div className="section">
                            <p className="lbl">Platform Affinity Map</p>
                            <table>
                                <thead><tr><th>Platform</th><th>Fit Score</th><th>Rationale</th></tr></thead>
                                <tbody>
                                    {nd.platform_affinity.sort((a, b) => b.fit_score - a.fit_score).map((p, i) => (
                                        <tr key={i}><td className="bold">{p.platform}</td><td>{pct(p.fit_score)}</td><td className="muted">{p.rationale}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}

                    {diag?.friction_analysis && (
                        <div className="section">
                            <p className="lbl">Creative Friction Analysis</p>
                            <div className="cols3" style={{ marginTop: 8 }}>
                                {Object.entries(diag.friction_analysis.scores).map(([k, v], i) => (
                                    <div key={i}><p className="lbl">{fmt(k)}</p><p className="val">{v}/100</p></div>
                                ))}
                            </div>
                            {diag.friction_analysis.top_fixes?.length ? (
                                <div style={{ marginTop: 10 }}>
                                    <p className="lbl">Top Fixes</p>
                                    {diag.friction_analysis.top_fixes.map((f, i) => <p key={i} className="val-sm">· {f}</p>)}
                                </div>
                            ) : null}
                        </div>
                    )}

                    {diag?.risk_analysis && (
                        <div className="section">
                            <p className="lbl">Policy Risk Assessment — Overall Risk Score: {diag.risk_analysis.risk_score}/100</p>
                            <p className="val-sm" style={{ marginBottom: 8 }}>{diag.risk_analysis.explanation}</p>
                            {diag.risk_analysis.policy_flags?.length ? (
                                <table>
                                    <thead><tr><th>Flag</th><th>Severity</th><th>Reason</th></tr></thead>
                                    <tbody>
                                        {diag.risk_analysis.policy_flags.map((f, i) => (
                                            <tr key={i}>
                                                <td className="bold">{f.flag}</td>
                                                <td className={f.severity === 'High' ? 'risk-high' : f.severity === 'Medium' ? 'risk-med' : 'risk-low'}>{f.severity}</td>
                                                <td className="muted">{f.why}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : null}
                        </div>
                    )}

                    {diag?.failure_modes?.length ? (
                        <div className="section"><p className="lbl">Failure Modes</p>{diag.failure_modes.map((f, i) => <p key={i} className="val-sm">· {f}</p>)}</div>
                    ) : null}
                    <PageFooter page="08 / Platform & Risk" />
                </div>

                {/* ── PAGE 9: SECURITY & CLOSE ── */}
                <div className="dp">
                    <span className="pg-num">08</span>
                    <p className="pg-title">Security &amp; Infrastructure</p>
                    <p className="pg-sub">Data Sovereignty Notice</p>
                    <div className="divider" />

                    <div className="box">
                        <p className="lbl">Data Sovereignty</p>
                        <p className="val" style={{ marginTop: 6 }}>This dossier was generated on ISO-27001 compliant infrastructure and is the exclusive intellectual property of the authorizing organization. Distribution outside designated stakeholders is prohibited without written consent.</p>
                        <div className="cols4" style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #E7DED1' }}>
                            <div><p className="lbl">Classification</p><p className="val-sm">Confidential — Strategic</p></div>
                            <div><p className="lbl">Generated</p><p className="val-sm">{dateStr}</p></div>
                            <div><p className="lbl">Schema Version</p><p className="val-sm">{meta?.schema_version || 'V4'}</p></div>
                            <div><p className="lbl">Confidence Index</p><p className="val-sm">{pct(diag?.confidence?.overall) || `${sovereignScore}%`}</p></div>
                        </div>
                    </div>

                    <div style={{ marginTop: 60, textAlign: 'center', color: '#B5A99A' }}>
                        <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>— End of Dossier —</p>
                        {agencyLogo ? <img src={agencyLogo} alt="" style={{ maxHeight: 30, opacity: 0.4 }} /> : <p style={{ fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', opacity: 0.3 }}>Visual Decompiler</p>}
                    </div>
                </div>

            </div>

            <style>{`.dossier-print-layout { display: none; }`}</style>
        </>
    );
}
