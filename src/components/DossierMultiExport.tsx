'use client';

import { useSelection } from './SelectionProvider';
import { ExecutiveCommandService, CategoryAudit } from '@/lib/executive_command_service';
import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

export default function DossierMultiExport({ agencyName, agencyLogo }: { agencyName?: string; agencyLogo?: string }) {
    const { selectedAds, count } = useSelection();
    const [audit, setAudit] = useState<CategoryAudit | null>(null);

    useEffect(() => {
        if (count >= 2) {
            const ads = Array.from(selectedAds.values());
            setAudit(ExecutiveCommandService.generateCategoryAudit(ads));
        } else {
            setAudit(null);
        }
    }, [selectedAds, count]);

    const handleExport = () => {
        window.print();
    };

    if (!audit) return null;

    return (
        <>
            {/* Export button — screen only */}
            <button
                onClick={handleExport}
                className="no-print inline-flex items-center gap-2 px-6 py-3 bg-[#141414] text-[#FBF7EF] rounded-full text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-all shadow-lg active:scale-[0.97]"
            >
                <FileText className="w-3.5 h-3.5" />
                Export Category Audit ({count} Assets)
            </button>

            {/* Print-only layout */}
            <div className="category-audit-print">
                {/* ═══════ COVER PAGE ═══════ */}
                <div className="audit-page audit-cover">
                    <div className="audit-cover-inner">
                        {agencyLogo ? (
                            <img src={agencyLogo} alt="" className="audit-agency-logo" />
                        ) : agencyName ? (
                            <div className="audit-agency-name">{agencyName}</div>
                        ) : (
                            <div className="audit-v-mark">V</div>
                        )}
                        <div className="audit-cover-divider" />
                        <h1 className="audit-cover-title">{audit.title}</h1>
                        <p className="audit-cover-subtitle">
                            Forensic Analysis of {audit.assetCount} Competitive Assets
                        </p>
                        <div className="audit-cover-meta">
                            <span>Prepared: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span>Classification: Confidential</span>
                        </div>
                    </div>
                </div>

                {/* ═══════ SECTION 1: EXECUTIVE SUMMARY ═══════ */}
                <div className="audit-page">
                    <div className="audit-section-header">
                        <span className="audit-section-num">01</span>
                        <h2 className="audit-section-title">Comparative Executive Summary</h2>
                    </div>

                    <p className="audit-summary-text">{audit.executiveSummary}</p>

                    <div className="audit-kpi-row">
                        <div className="audit-kpi">
                            <span className="audit-kpi-value">{audit.assetCount}</span>
                            <span className="audit-kpi-label">Assets Analyzed</span>
                        </div>
                        <div className="audit-kpi">
                            <span className="audit-kpi-value">{audit.avgSovereignScore}</span>
                            <span className="audit-kpi-label">Avg Sovereign Score</span>
                        </div>
                        <div className="audit-kpi">
                            <span className="audit-kpi-value">{audit.gapAnalysis.length}</span>
                            <span className="audit-kpi-label">Strategic Gaps</span>
                        </div>
                        <div className="audit-kpi">
                            <span className="audit-kpi-value">{audit.dominantPattern}</span>
                            <span className="audit-kpi-label">Dominant Pattern</span>
                        </div>
                    </div>

                    {/* Asset Profiles Table */}
                    <table className="audit-table">
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Trigger</th>
                                <th>Claim</th>
                                <th>Cognitive Load</th>
                                <th>Sovereign Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {audit.assetProfiles.map(p => (
                                <tr key={p.id}>
                                    <td className="audit-td-brand">{p.brand}</td>
                                    <td>{p.triggerMechanic}</td>
                                    <td>{p.claimType}</td>
                                    <td>{p.cognitiveLoad}</td>
                                    <td className="audit-td-score">{p.sovereignScore}/100</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ═══════ SECTION 2: GAP ANALYSIS ═══════ */}
                <div className="audit-page">
                    <div className="audit-section-header">
                        <span className="audit-section-num">02</span>
                        <h2 className="audit-section-title">Gap Analysis Map</h2>
                    </div>

                    {/* Trigger Distribution */}
                    <div className="audit-subsection">
                        <h3 className="audit-subsection-title">Trigger Mechanic Distribution</h3>
                        <div className="audit-bar-chart">
                            {audit.triggerDistribution.map(t => (
                                <div key={t.trigger} className="audit-bar-row">
                                    <span className="audit-bar-label">{t.trigger}</span>
                                    <div className="audit-bar-track">
                                        <div className="audit-bar-fill" style={{ width: `${t.percentage}%` }} />
                                    </div>
                                    <span className="audit-bar-value">{t.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gap Cards */}
                    {audit.gapAnalysis.map((gap, idx) => (
                        <div key={idx} className="audit-gap-card">
                            <div className="audit-gap-header">
                                <span className="audit-gap-dimension">{gap.dimension}</span>
                                <span className="audit-gap-count">{gap.missing.length} Uncontested</span>
                            </div>
                            <div className="audit-gap-grid">
                                <div className="audit-gap-col">
                                    <span className="audit-gap-col-label">Active (Contested)</span>
                                    <div className="audit-gap-pills">
                                        {gap.used.map(u => <span key={u} className="audit-pill audit-pill-used">{u}</span>)}
                                    </div>
                                </div>
                                <div className="audit-gap-col">
                                    <span className="audit-gap-col-label">Open (Sovereign Opportunity)</span>
                                    <div className="audit-gap-pills">
                                        {gap.missing.map(m => <span key={m} className="audit-pill audit-pill-open">{m}</span>)}
                                    </div>
                                </div>
                            </div>
                            <p className="audit-gap-opportunity">{gap.opportunity}</p>
                        </div>
                    ))}
                </div>

                {/* ═══════ SECTION 3: TACTICAL RECOMMENDATIONS ═══════ */}
                <div className="audit-page">
                    <div className="audit-section-header">
                        <span className="audit-section-num">03</span>
                        <h2 className="audit-section-title">Aggregated Tactical Recommendations</h2>
                    </div>

                    <div className="audit-recs">
                        {audit.tacticalRecommendations.map((rec, i) => (
                            <div key={i} className="audit-rec-item">
                                <span className="audit-rec-num">{String(i + 1).padStart(2, '0')}</span>
                                <p className="audit-rec-text">{rec}</p>
                            </div>
                        ))}
                    </div>

                    {/* Semiotic Subtext Comparison */}
                    {audit.assetProfiles.some(p => p.semioticSubtext) && (
                        <div className="audit-subsection" style={{ marginTop: '2rem' }}>
                            <h3 className="audit-subsection-title">Neural Verdict Comparison</h3>
                            {audit.assetProfiles.filter(p => p.semioticSubtext).map(p => (
                                <div key={p.id} className="audit-verdict-row">
                                    <span className="audit-verdict-brand">{p.brand}</span>
                                    <p className="audit-verdict-text">&ldquo;{p.semioticSubtext}&rdquo;</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ═══════ SECURITY FOOTER ═══════ */}
                <div className="audit-footer">
                    <div className="audit-footer-inner">
                        <p>ISO-27001 COMPLIANT INFRASTRUCTURE · SOC2 VERIFIED · ALL DATA ENCRYPTED AT REST AND IN TRANSIT</p>
                        <p>This document constitutes proprietary strategic intelligence. Unauthorized distribution is prohibited.</p>
                        <p>Generated by VisualDecompiler.com · Sovereignty Engine v2.0 · {new Date().toISOString().slice(0, 10)}</p>
                    </div>
                </div>
            </div>

            {/* Print Stylesheet */}
            <style jsx global>{`
                .category-audit-print {
                    display: none;
                }

                @media print {
                    body * { visibility: hidden !important; }
                    .category-audit-print,
                    .category-audit-print * { visibility: visible !important; }
                    .category-audit-print {
                        display: block !important;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        z-index: 99999;
                        background: white;
                        font-family: 'Inter', system-ui, sans-serif;
                        color: #141414;
                    }
                    .no-print { display: none !important; }

                    .audit-page {
                        page-break-after: always;
                        padding: 3rem 4rem;
                        min-height: 100vh;
                        box-sizing: border-box;
                    }

                    /* Cover */
                    .audit-cover {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #141414;
                        color: #FBF7EF;
                    }
                    .audit-cover-inner { text-align: center; }
                    .audit-agency-logo { width: 80px; height: 80px; object-fit: contain; margin: 0 auto 2rem; }
                    .audit-agency-name { font-size: 11px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(251,247,239,0.5); margin-bottom: 2rem; }
                    .audit-v-mark { width: 60px; height: 60px; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 300; color: rgba(255,255,255,0.3); margin: 0 auto 2rem; }
                    .audit-cover-divider { width: 60px; height: 1px; background: rgba(255,255,255,0.15); margin: 0 auto 2rem; }
                    .audit-cover-title { font-size: 28px; font-weight: 300; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.2; margin-bottom: 1rem; }
                    .audit-cover-subtitle { font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(251,247,239,0.4); margin-bottom: 3rem; }
                    .audit-cover-meta { display: flex; gap: 2rem; justify-content: center; }
                    .audit-cover-meta span { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(251,247,239,0.3); }

                    /* Section Headers */
                    .audit-section-header { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #E7DED1; }
                    .audit-section-num { font-size: 36px; font-weight: 200; color: #E7DED1; }
                    .audit-section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em; color: #141414; }

                    /* Summary */
                    .audit-summary-text { font-size: 15px; line-height: 1.8; color: #6B6B6B; margin-bottom: 2rem; font-weight: 300; }

                    /* KPI Row */
                    .audit-kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
                    .audit-kpi { padding: 1.5rem; border: 1px solid #E7DED1; border-radius: 12px; text-align: center; }
                    .audit-kpi-value { display: block; font-size: 24px; font-weight: 600; color: #141414; margin-bottom: 0.25rem; }
                    .audit-kpi-label { font-size: 8px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #6B6B6B; }

                    /* Table */
                    .audit-table { width: 100%; border-collapse: collapse; font-size: 11px; }
                    .audit-table th { text-align: left; padding: 0.75rem 1rem; font-size: 8px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #6B6B6B; border-bottom: 2px solid #E7DED1; }
                    .audit-table td { padding: 0.75rem 1rem; border-bottom: 1px solid #E7DED1; font-size: 11px; color: #141414; }
                    .audit-td-brand { font-weight: 700; }
                    .audit-td-score { font-weight: 700; font-variant-numeric: tabular-nums; }

                    /* Bar Chart */
                    .audit-subsection { margin-bottom: 2rem; }
                    .audit-subsection-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #6B6B6B; margin-bottom: 1rem; }
                    .audit-bar-chart { display: flex; flex-direction: column; gap: 0.5rem; }
                    .audit-bar-row { display: grid; grid-template-columns: 140px 1fr 40px; align-items: center; gap: 0.75rem; }
                    .audit-bar-label { font-size: 10px; font-weight: 600; color: #141414; }
                    .audit-bar-track { height: 8px; background: #F6F1E7; border-radius: 4px; overflow: hidden; }
                    .audit-bar-fill { height: 100%; background: #141414; border-radius: 4px; }
                    .audit-bar-value { font-size: 10px; font-weight: 700; color: #6B6B6B; text-align: right; }

                    /* Gap Cards */
                    .audit-gap-card { padding: 1.5rem; border: 1px solid #E7DED1; border-radius: 12px; margin-bottom: 1rem; }
                    .audit-gap-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
                    .audit-gap-dimension { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; }
                    .audit-gap-count { font-size: 9px; font-weight: 700; color: #BB9E7B; text-transform: uppercase; letter-spacing: 0.15em; }
                    .audit-gap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
                    .audit-gap-col-label { display: block; font-size: 8px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #6B6B6B; margin-bottom: 0.5rem; }
                    .audit-gap-pills { display: flex; flex-wrap: wrap; gap: 0.25rem; }
                    .audit-pill { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 9px; font-weight: 600; }
                    .audit-pill-used { background: #F6F1E7; color: #6B6B6B; border: 1px solid #E7DED1; }
                    .audit-pill-open { background: #141414; color: #FBF7EF; }
                    .audit-gap-opportunity { font-size: 11px; font-style: italic; color: #6B6B6B; line-height: 1.5; border-left: 2px solid #BB9E7B; padding-left: 0.75rem; }

                    /* Recommendations */
                    .audit-recs { display: flex; flex-direction: column; gap: 1.5rem; }
                    .audit-rec-item { display: flex; gap: 1rem; align-items: flex-start; }
                    .audit-rec-num { font-size: 24px; font-weight: 200; color: #E7DED1; min-width: 40px; }
                    .audit-rec-text { font-size: 13px; line-height: 1.7; color: #141414; font-weight: 400; }

                    /* Verdict */
                    .audit-verdict-row { padding: 1rem 0; border-bottom: 1px solid #E7DED1; }
                    .audit-verdict-brand { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #6B6B6B; display: block; margin-bottom: 0.25rem; }
                    .audit-verdict-text { font-size: 13px; font-style: italic; color: #141414; line-height: 1.5; margin: 0; }

                    /* Footer */
                    .audit-footer { padding: 2rem 4rem; border-top: 1px solid #E7DED1; text-align: center; }
                    .audit-footer p { font-size: 7px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: #6B6B6B; line-height: 2; margin: 0; }
                }
            `}</style>
        </>
    );
}
