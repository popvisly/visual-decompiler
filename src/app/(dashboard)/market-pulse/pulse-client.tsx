"use client";

import { useEffect, useMemo, useState } from 'react';
import { Activity, FileDown, Loader2, RefreshCw, TrendingDown, TrendingUp } from 'lucide-react';

type PulseMetric = {
    mechanic: string;
    share: number;
    delta: number;
    direction: 'up' | 'down' | 'flat';
    assets?: {
        id: string;
        brand: string;
        sector: string;
        created_at: string;
    }[];
};

type IntelligenceFlag = {
    type: 'SATURATION SIGNAL' | 'UNTAPPED MECHANIC' | 'VELOCITY ALERT';
    finding: string;
    recommendation: string;
    asset_count: number;
};

type TriggerMetric = {
    label: string;
    value: number;
};

type PulseResponse = {
    status: 'success' | 'error';
    scope: string;
    sector_options: string[];
    window_days: number;
    computed_at?: string;
    cached?: boolean;
    assetCount: number;
    mechanic_velocity: PulseMetric[];
    intelligence_flags: IntelligenceFlag[];
    dominant_mechanics: { mechanic: string; count: number; share: number }[];
    category_trigger_profile: TriggerMetric[];
    vault_trigger_profile?: TriggerMetric[];
    category_persuasion_benchmark: {
        avg_density: number;
        avg_friction: number;
        your_rank: string;
    };
    chromatic_saturation: { hex: string; count: number }[];
    opportunity_gaps: string[];
};

const WINDOW_OPTIONS = [30, 60, 90] as const;
const LOCKED_PREVIEW: PulseResponse = {
    status: 'success',
    scope: 'Luxury Fragrance',
    sector_options: ['Luxury Fragrance', 'Luxury Fashion', 'Premium Spirits'],
    window_days: 90,
    cached: true,
    computed_at: new Date().toISOString(),
    assetCount: 58,
    mechanic_velocity: [
        { mechanic: 'Status Signaling', share: 58, delta: 26, direction: 'up' },
        { mechanic: 'Heritage Weaponization', share: 41, delta: 12, direction: 'up' },
        { mechanic: 'Aspirational Void', share: 31, delta: 2, direction: 'flat' },
        { mechanic: 'Scarcity Architecture', share: 21, delta: -8, direction: 'down' },
    ],
    intelligence_flags: [
        {
            type: 'SATURATION SIGNAL',
            finding: 'Status signaling dominates the current sector window and is approaching fatigue.',
            recommendation: 'Counter-program with a differentiated posture before the category collapses into sameness.',
            asset_count: 12,
        },
        {
            type: 'UNTAPPED MECHANIC',
            finding: 'Cognitive dissonance remains materially underused in the visible competitive set.',
            recommendation: 'Prototype a challenger route built around tension rather than polish.',
            asset_count: 0,
        },
    ],
    dominant_mechanics: [
        { mechanic: 'Status Signaling', count: 34, share: 58 },
        { mechanic: 'Heritage Weaponization', count: 24, share: 41 },
        { mechanic: 'Aspirational Void', count: 18, share: 31 },
    ],
    category_trigger_profile: [
        { label: 'Status', value: 82 },
        { label: 'Authority', value: 66 },
        { label: 'Scarcity', value: 49 },
        { label: 'Utility', value: 28 },
        { label: 'Social Proof', value: 22 },
    ],
    category_persuasion_benchmark: {
        avg_density: 71,
        avg_friction: 36,
        your_rank: 'Above category median',
    },
    chromatic_saturation: [
        { hex: '#D8C4A0', count: 18 },
        { hex: '#201A17', count: 15 },
        { hex: '#EEE6D6', count: 12 },
    ],
    opportunity_gaps: [
        'Introduce a harder cognitive dissonance route while prestige competitors stay overly harmonious.',
        'Use utility-led proof as a counterweight to the current category status excess.',
        'Reframe authority cues into scarcity architecture before rivals crowd the signal.',
    ],
};

function formatDate(value?: string) {
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

function formatReportDate(value?: string) {
    if (!value) return 'Today';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'Today';
    }

    return new Intl.DateTimeFormat('en-AU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

function buildRadarPoints(metrics: TriggerMetric[]) {
    const size = 240;
    const center = size / 2;
    const radius = 84;

    return metrics.map((metric, index) => {
        const angle = (Math.PI * 2 * index) / metrics.length - Math.PI / 2;
        const scaledRadius = (Math.min(metric.value, 100) / 100) * radius;
        const x = center + Math.cos(angle) * scaledRadius;
        const y = center + Math.sin(angle) * scaledRadius;

        return `${x},${y}`;
    }).join(' ');
}

export default function MechanicIntelligenceClient({
    hasAccess,
    tierLabel,
}: {
    hasAccess: boolean;
    tierLabel: string;
}) {
    const [data, setData] = useState<PulseResponse | null>(null);
    const [selectedWindow, setSelectedWindow] = useState<number>(30);
    const [selectedSector, setSelectedSector] = useState<string>('ALL SECTORS');
    const [velocityMode, setVelocityMode] = useState<'share' | 'count'>('share');
    const [activeMechanic, setActiveMechanic] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadPulse = async (refresh = false) => {
        if (refresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        setError(null);

        try {
            const response = await fetch('/api/market-pulse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    windowDays: selectedWindow,
                    marketSector: selectedSector === 'ALL SECTORS' ? null : selectedSector,
                }),
            });
            const payload = await response.json();

            if (!response.ok) {
                throw new Error(typeof payload?.error === 'string' ? payload.error : 'Failed to load Mechanic Intelligence');
            }

            setData(payload);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load Mechanic Intelligence');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        void loadPulse();
    }, [selectedWindow, selectedSector]);

    const sectorOptions = useMemo(() => ['ALL SECTORS', ...(data?.sector_options || [])], [data?.sector_options]);
    const belowVolumeThreshold = (data?.assetCount || 0) < 20;
    const reportSectorLabel = selectedSector === 'ALL SECTORS' ? 'Vault-Wide Intelligence' : selectedSector;
    const reportDate = formatReportDate(data?.computed_at);
    const reportDepthLabel = (data?.assetCount || 0) >= 50 ? 'Boardroom-grade' : (data?.assetCount || 0) >= 20 ? 'Directional' : 'Early signal';
    const activeMechanicData = data?.mechanic_velocity.find((item) => item.mechanic === activeMechanic) || data?.mechanic_velocity[0] || null;
    const radarMetrics = data?.category_trigger_profile.slice(0, 5) || [];
    const radarBaseline = radarMetrics.map((metric) => ({
        label: metric.label,
        value: data?.vault_trigger_profile?.find((item) => item.label === metric.label)?.value || 0,
    }));
    const radarPoints = radarMetrics.length > 2 ? buildRadarPoints(radarMetrics) : '';
    const radarBaselinePoints = radarBaseline.length > 2 ? buildRadarPoints(radarBaseline) : '';

    const handleExportReport = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#FBFBF6] px-8 py-10 md:px-12 md:py-14">
            <div className="mx-auto max-w-7xl">
                <div className="border-b border-[#D4A574]/18 pb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Mechanic Intelligence</p>
                    <h1 className="mt-4 text-4xl font-light uppercase tracking-tight text-[#1A1A1A] md:text-6xl">
                        Market Pulse Dashboard
                    </h1>
                    <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#6B6B6B]">
                        Track which persuasion mechanics are accelerating or fading across your vault, where category saturation is building, and where strategic whitespace is still open.
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm md:flex-row md:items-end md:justify-between">
                    <div className="space-y-3">
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="min-w-[190px]">
                                <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Window</span>
                                <select
                                    value={selectedWindow}
                                    onChange={(event) => setSelectedWindow(Number(event.target.value))}
                                    className="mt-3 w-full rounded-full border border-[#D4A574]/18 bg-[#FBFBF6] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] outline-none"
                                >
                                    {WINDOW_OPTIONS.map((windowOption) => (
                                        <option key={windowOption} value={windowOption}>
                                            {windowOption}D
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="min-w-[220px]">
                                <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Sector</span>
                                <select
                                    value={selectedSector}
                                    onChange={(event) => setSelectedSector(event.target.value)}
                                    className="mt-3 w-full rounded-full border border-[#D4A574]/18 bg-[#FBFBF6] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] outline-none"
                                >
                                    {sectorOptions.map((sector) => (
                                        <option key={sector} value={sector}>
                                            {sector}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#6B6B6B]">
                            Last updated {formatDate(data?.computed_at)}{data?.cached ? ' · cached 24h layer' : ' · live recompute'}
                        </p>
                    </div>

                    <button
                        onClick={() => void loadPulse(true)}
                        disabled={refreshing}
                        className="rounded-full border border-[#D4A574]/18 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-[#FBFBF6] disabled:opacity-50"
                    >
                        <span className="inline-flex items-center gap-2">
                            {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                            {refreshing ? 'Refreshing...' : 'Refresh Intelligence'}
                        </span>
                    </button>
                </div>

                {!hasAccess ? (
                    <div className="mt-8 space-y-8">
                        <div className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-8 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Premium Intelligence Preview</p>
                            <h2 className="mt-4 text-3xl font-light uppercase tracking-tight text-[#1A1A1A]">Market Pulse is reserved for Agency Sovereignty and Enterprise</h2>
                            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#6B6B6B]">
                                Your current tier is {tierLabel}. Upgrade to unlock live cross-asset mechanic velocity, auditable anomaly flags, boardroom exports, and sector-wide signal mapping.
                            </p>
                            <a
                                href="/pricing"
                                className="mt-8 inline-flex rounded-full bg-[#141414] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBF7EF] transition-colors hover:bg-black"
                            >
                                Upgrade to Agency Sovereignty
                            </a>
                        </div>

                        <div className="relative overflow-hidden rounded-[2rem] border border-[#D4A574]/18 bg-white p-8 shadow-sm">
                            <div className="pointer-events-none select-none blur-[2.5px] opacity-70">
                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="rounded-[2rem] border border-[#D4A574]/18 bg-[#FBFBF6] p-6">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Assets Sampled</p>
                                        <p className="mt-4 text-4xl font-light text-[#1A1A1A]">{LOCKED_PREVIEW.assetCount}</p>
                                    </div>
                                    <div className="rounded-[2rem] border border-[#D4A574]/18 bg-[#FBFBF6] p-6">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Avg Persuasion Density</p>
                                        <p className="mt-4 text-4xl font-light text-[#1A1A1A]">{LOCKED_PREVIEW.category_persuasion_benchmark.avg_density}%</p>
                                    </div>
                                    <div className="rounded-[2rem] border border-[#D4A574]/18 bg-[#FBFBF6] p-6">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Avg Cognitive Friction</p>
                                        <p className="mt-4 text-4xl font-light text-[#1A1A1A]">{LOCKED_PREVIEW.category_persuasion_benchmark.avg_friction}%</p>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                                    <section className="rounded-[2rem] border border-[#D4A574]/18 bg-[#FBFBF6] p-6">
                                        <p className="border-b border-[#D4A574]/12 pb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Mechanic Velocity</p>
                                        <div className="mt-6 space-y-4">
                                            {LOCKED_PREVIEW.mechanic_velocity.map((item) => (
                                                <div key={item.mechanic} className="rounded-[1.5rem] border border-[#D4A574]/12 bg-white p-4">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="text-sm font-semibold uppercase tracking-[0.06em] text-[#1A1A1A]">{item.mechanic}</p>
                                                            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#6B6B6B]">{item.share}% share in active window</p>
                                                        </div>
                                                        <div className="rounded-full bg-[#EFE8DA] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                                            {item.delta >= 0 ? '+' : ''}{item.delta}%
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EDE8DD]">
                                                        <div className="h-full rounded-full bg-gradient-to-r from-[#8B4513] to-[#D4A574]" style={{ width: `${item.share}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="rounded-[2rem] border border-[#D4A574]/18 bg-[#FBFBF6] p-6">
                                        <p className="border-b border-[#D4A574]/12 pb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Anomaly & Gap Intelligence</p>
                                        <div className="mt-6 space-y-4">
                                            {LOCKED_PREVIEW.intelligence_flags.map((flag, index) => (
                                                <div key={`${flag.type}-${index}`} className="rounded-[1.5rem] border border-[#D4A574]/12 bg-white p-4">
                                                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#8B4513]/70">{flag.type}</p>
                                                    <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]">{flag.finding}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center bg-[#FBFBF6]/55">
                                <div className="max-w-md rounded-[2rem] border border-[#D4A574]/30 bg-[#1A1A1A] p-8 text-center text-white shadow-2xl">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Locked Preview</p>
                                    <h3 className="mt-4 text-2xl font-light uppercase tracking-tight">See the intelligence layer before you upgrade</h3>
                                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                                        The full dashboard unlocks live sector filters, source-asset audit trails, and exportable anomaly reporting once your agency moves onto the sovereignty tier.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : loading ? (
                    <div className="mt-8 rounded-[2rem] border border-[#D4A574]/18 bg-white px-8 py-16 text-center shadow-sm">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#D4A574]" />
                        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8B4513]">Synthesising category motion</p>
                    </div>
                ) : error ? (
                    <div className="mt-8 rounded-[2rem] border border-[#D4A574]/18 bg-white px-8 py-10 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Market Pulse Interrupted</p>
                        <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B]">{error}</p>
                    </div>
                ) : belowVolumeThreshold && data ? (
                    <div className="mt-8 rounded-[2rem] border border-[#D4A574]/18 bg-white px-8 py-14 text-center shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Intelligence Dashboard</p>
                        <h2 className="mt-4 text-3xl font-light uppercase tracking-tight text-[#1A1A1A]">Trend analysis unlocks at 20 assets</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6B6B6B]">
                            Mechanic Intelligence becomes meaningful once the vault has enough extraction density to separate real pattern shifts from noise.
                        </p>
                        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
                            {data.assetCount} of 20 forensic extractions complete
                        </p>
                        <a
                            href="/ingest"
                            className="mt-8 inline-flex rounded-full bg-[#141414] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBF7EF] transition-colors hover:bg-black"
                        >
                            Analyse More Assets
                        </a>
                    </div>
                ) : data ? (
                    <div className="mt-8 space-y-8">
                        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                            <section className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Executive Readout</p>
                                <div className="mt-5 grid gap-4 md:grid-cols-3">
                                    <div className="rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-4">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Scope</p>
                                        <p className="mt-3 text-lg font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">{reportSectorLabel}</p>
                                    </div>
                                    <div className="rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-4">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Signal Depth</p>
                                        <p className="mt-3 text-lg font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">{reportDepthLabel}</p>
                                    </div>
                                    <div className="rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-4">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Export Snapshot</p>
                                        <p className="mt-3 text-lg font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">{reportDate}</p>
                                    </div>
                                </div>
                                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#6B6B6B]">
                                    This report is designed as a strategic leave-behind for client briefings, combining mechanic momentum, trigger pressure, anomaly detection, and whitespace opportunity mapping into a single exportable intelligence layer.
                                </p>
                            </section>

                            <div className="flex items-start justify-end">
                                <button
                                    onClick={handleExportReport}
                                    className="rounded-full border border-[#D4A574]/18 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-white"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <FileDown className="h-4 w-4" />
                                        Export Intelligence Report
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {data.dominant_mechanics.slice(0, 3).map((mechanic, index) => (
                                <div key={mechanic.mechanic} className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-5 shadow-sm">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Dominant Mechanic {(index + 1).toString().padStart(2, '0')}</p>
                                    <p className="mt-4 text-lg font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">{mechanic.mechanic}</p>
                                    <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B]">{mechanic.share}% vault share · {mechanic.count} source assets</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm">
                                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Assets Sampled</p>
                                <p className="mt-4 text-4xl font-light text-[#1A1A1A]">{data.assetCount}</p>
                            </div>
                            <div className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm">
                                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Avg Persuasion Density</p>
                                <p className="mt-4 text-4xl font-light text-[#1A1A1A]">{data.category_persuasion_benchmark.avg_density}%</p>
                            </div>
                            <div className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm">
                                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Avg Cognitive Friction</p>
                                <p className="mt-4 text-4xl font-light text-[#1A1A1A]">{data.category_persuasion_benchmark.avg_friction}%</p>
                                <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#6B6B6B]">{data.category_persuasion_benchmark.your_rank}</p>
                            </div>
                        </div>

                        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                            <section className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between gap-4 border-b border-[#D4A574]/12 pb-4">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Mechanic Velocity</p>
                                        <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                                            Rolling {data.window_days}-day share of dominant persuasion mechanics in your selected sector.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="inline-flex rounded-full border border-[#D4A574]/18 bg-[#FBFBF6] p-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                                            <button
                                                onClick={() => setVelocityMode('share')}
                                                className={`rounded-full px-3 py-1 transition-colors ${velocityMode === 'share' ? 'bg-white shadow-sm' : ''}`}
                                            >
                                                % Share
                                            </button>
                                            <button
                                                onClick={() => setVelocityMode('count')}
                                                className={`rounded-full px-3 py-1 transition-colors ${velocityMode === 'count' ? 'bg-white shadow-sm' : ''}`}
                                            >
                                                Count
                                            </button>
                                        </div>
                                        <Activity className="h-5 w-5 text-[#D4A574]" />
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {data.mechanic_velocity.length > 0 ? data.mechanic_velocity.map((item) => (
                                        <div key={item.mechanic} className="rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-sm font-semibold uppercase tracking-[0.06em] text-[#1A1A1A]">{item.mechanic}</p>
                                                    <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#6B6B6B]">
                                                        {velocityMode === 'share'
                                                            ? `${item.share}% share in active window`
                                                            : `${Math.round((item.share / 100) * data.assetCount)} assets in active window`}
                                                    </p>
                                                </div>
                                                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                                                    item.direction === 'up'
                                                        ? 'bg-[#e8f3ea] text-[#275a37]'
                                                        : item.direction === 'down'
                                                            ? 'bg-[#f7ebe8] text-[#8b4513]'
                                                            : 'bg-[#efede8] text-[#6B6B6B]'
                                                }`}>
                                                    {item.direction === 'up' ? <TrendingUp className="h-3.5 w-3.5" /> : item.direction === 'down' ? <TrendingDown className="h-3.5 w-3.5" /> : <Activity className="h-3.5 w-3.5" />}
                                                    {item.delta >= 0 ? '+' : ''}{item.delta}%
                                                </div>
                                            </div>
                                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EDE8DD]">
                                                <div className="h-full rounded-full bg-gradient-to-r from-[#8B4513] to-[#D4A574]" style={{ width: `${item.share}%` }} />
                                            </div>
                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    onClick={() => setActiveMechanic(item.mechanic)}
                                                    className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513] transition-opacity hover:opacity-70"
                                                >
                                                    View Source Assets
                                                </button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="rounded-[1.5rem] border border-dashed border-[#D4A574]/18 bg-[#FBFBF6] p-6 text-[11px] uppercase tracking-[0.16em] text-[#6B6B6B]">
                                            Not enough recent assets to show mechanic velocity yet.
                                        </div>
                                    )}
                                </div>
                            </section>

                            <section className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm">
                                <div className="border-b border-[#D4A574]/12 pb-4">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Trigger Distribution Radar</p>
                                    <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                                        Selected sector versus vault-wide trigger pressure. The gap between the two shapes is the strategic opportunity surface.
                                    </p>
                                </div>

                                <div className="mt-6 grid gap-6">
                                    <div className="mx-auto w-full max-w-[280px]">
                                        <svg viewBox="0 0 240 240" className="h-auto w-full">
                                            {[36, 58, 84].map((radius) => (
                                                <circle
                                                    key={radius}
                                                    cx="120"
                                                    cy="120"
                                                    r={radius}
                                                    fill="none"
                                                    stroke="#E6DDCF"
                                                    strokeDasharray="4 6"
                                                />
                                            ))}
                                            {radarMetrics.map((metric, index) => {
                                                const angle = (Math.PI * 2 * index) / radarMetrics.length - Math.PI / 2;
                                                const labelX = 120 + Math.cos(angle) * 104;
                                                const labelY = 120 + Math.sin(angle) * 104;
                                                const axisX = 120 + Math.cos(angle) * 84;
                                                const axisY = 120 + Math.sin(angle) * 84;

                                                return (
                                                    <g key={metric.label}>
                                                        <line x1="120" y1="120" x2={axisX} y2={axisY} stroke="#E6DDCF" />
                                                        <text
                                                            x={labelX}
                                                            y={labelY}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                            fontSize="9"
                                                            letterSpacing="0.18em"
                                                            fill="#8B4513"
                                                        >
                                                            {metric.label.toUpperCase()}
                                                        </text>
                                                    </g>
                                                );
                                            })}
                                            {radarBaselinePoints ? (
                                                <polygon
                                                    points={radarBaselinePoints}
                                                    fill="rgba(180, 170, 150, 0.22)"
                                                    stroke="#B8A17C"
                                                    strokeWidth="2"
                                                />
                                            ) : null}
                                            {radarPoints ? (
                                                <polygon
                                                    points={radarPoints}
                                                    fill="rgba(212, 165, 116, 0.28)"
                                                    stroke="#D4A574"
                                                    strokeWidth="2.5"
                                                />
                                            ) : null}
                                        </svg>
                                    </div>

                                    <div className="grid gap-3">
                                        {radarMetrics.map((trigger) => {
                                            const baseline = radarBaseline.find((item) => item.label === trigger.label)?.value || 0;
                                            const delta = trigger.value - baseline;

                                            return (
                                                <div key={trigger.label} className="rounded-[1.25rem] border border-[#D4A574]/12 bg-[#FBFBF6] px-4 py-3">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]">{trigger.label}</p>
                                                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#8B4513]">
                                                            {trigger.value} vs {baseline} {delta >= 0 ? `(+${delta})` : `(${delta})`}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {activeMechanicData ? (
                            <section className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm">
                                <div className="flex flex-col gap-3 border-b border-[#D4A574]/12 pb-4 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Mechanic Audit Trail</p>
                                        <h2 className="mt-2 text-2xl font-light uppercase tracking-tight text-[#1A1A1A]">{activeMechanicData.mechanic}</h2>
                                        <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                                            Direct source assets behind the selected mechanic, so the signal can be defended in a strategy meeting rather than treated as a black-box summary.
                                        </p>
                                    </div>
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#6B6B6B]">
                                        {activeMechanicData.assets?.length || 0} auditable sources surfaced
                                    </p>
                                </div>

                                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {(activeMechanicData.assets || []).map((asset) => (
                                        <a
                                            key={asset.id}
                                            href={`/asset/${asset.id}`}
                                            className="rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-5 transition-transform hover:-translate-y-0.5"
                                        >
                                            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">{asset.sector}</p>
                                            <p className="mt-4 text-lg font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">{asset.brand}</p>
                                            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#6B6B6B]">
                                                Analysed {formatDate(asset.created_at)}
                                            </p>
                                            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">Open dossier</p>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        ) : null}

                        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
                            <section className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm xl:col-span-2">
                                <p className="border-b border-[#D4A574]/12 pb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Anomaly & Gap Intelligence</p>
                                <div className="mt-6 grid gap-4 md:grid-cols-3">
                                    {data.intelligence_flags.map((flag, index) => (
                                        <div key={`${flag.type}-${index}`} className="rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-5">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#8B4513]/70">{flag.type}</p>
                                            <p className="mt-4 text-sm leading-relaxed text-[#1A1A1A]">{flag.finding}</p>
                                            <p className="mt-4 text-[11px] leading-relaxed text-[#6B6B6B]">{flag.recommendation}</p>
                                            <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
                                                Source asset count: {flag.asset_count}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm">
                                <p className="border-b border-[#D4A574]/12 pb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Whitespace Opportunities</p>
                                <div className="mt-6 space-y-4">
                                    {data.opportunity_gaps.map((gap, index) => (
                                        <div key={`${gap}-${index}`} className="rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-4">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B4513]/70">Gap {(index + 1).toString().padStart(2, '0')}</p>
                                            <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A]">{gap}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-[2rem] border border-[#D4A574]/18 bg-white p-6 shadow-sm">
                                <p className="border-b border-[#D4A574]/12 pb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">Chromatic Saturation</p>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    {data.chromatic_saturation.map((color) => (
                                        <div key={color.hex} className="rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-4">
                                            <div className="h-16 rounded-xl border border-black/5" style={{ backgroundColor: color.hex }} />
                                            <div className="mt-3 flex items-center justify-between gap-3">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1A1A1A]">{color.hex}</span>
                                                <span className="text-[10px] uppercase tracking-[0.16em] text-[#8B4513]">{color.count}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                ) : null}
            </div>

            {data && (
                <>
                    <div className="intelligence-report-print">
                        <section className="intelligence-report-page intelligence-report-cover">
                            <div className="intelligence-report-cover-inner">
                                <p className="intelligence-report-kicker">Mechanic Intelligence Report</p>
                                <h1 className="intelligence-report-title">{reportSectorLabel}</h1>
                                <p className="intelligence-report-subtitle">
                                    {data.assetCount} forensic extractions analysed across a rolling {data.window_days}-day window.
                                </p>
                                <div className="intelligence-report-cover-meta">
                                    <span>{reportDate}</span>
                                    <span>Confidential</span>
                                    <span>{data.cached ? 'Cached 24h snapshot' : 'Live recompute snapshot'}</span>
                                </div>
                            </div>
                        </section>

                        <section className="intelligence-report-page">
                            <div className="intelligence-report-section-header">
                                <span className="intelligence-report-section-number">01</span>
                                <div>
                                    <p className="intelligence-report-section-kicker">Mechanic Velocity</p>
                                    <h2 className="intelligence-report-section-title">Rising and falling mechanics</h2>
                                </div>
                            </div>
                            <div className="intelligence-report-list">
                                {data.mechanic_velocity.map((item) => (
                                    <div key={item.mechanic} className="intelligence-report-velocity-row">
                                        <div className="intelligence-report-velocity-copy">
                                            <span>{item.mechanic}</span>
                                            <small>{Math.round((item.share / 100) * data.assetCount)} assets in active window</small>
                                        </div>
                                        <div className="intelligence-report-velocity-bar-wrap">
                                            <div className="intelligence-report-velocity-bar" style={{ width: `${Math.max(item.share, 6)}%` }} />
                                        </div>
                                        <span>{item.share}%</span>
                                        <span>{item.delta >= 0 ? '+' : ''}{item.delta}%</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="intelligence-report-page">
                            <div className="intelligence-report-section-header">
                                <span className="intelligence-report-section-number">02</span>
                                <div>
                                    <p className="intelligence-report-section-kicker">Trigger Profile</p>
                                    <h2 className="intelligence-report-section-title">Aggregate pressure map</h2>
                                </div>
                            </div>
                            <div className="intelligence-report-trigger-grid">
                                <div className="intelligence-report-trigger-panel">
                                    <p className="intelligence-report-panel-label">Trigger distribution</p>
                                    <div className="intelligence-report-list">
                                        {data.category_trigger_profile.map((trigger) => (
                                            <div key={trigger.label} className="intelligence-report-row">
                                                <span>{trigger.label}</span>
                                                <span>{trigger.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="intelligence-report-trigger-panel">
                                    <p className="intelligence-report-panel-label">Whitespace opportunities</p>
                                    <div className="intelligence-report-opportunity-list">
                                        {data.opportunity_gaps.map((gap, index) => (
                                            <div key={`${gap}-${index}`} className="intelligence-report-opportunity-item">
                                                <span>{(index + 1).toString().padStart(2, '0')}</span>
                                                <p>{gap}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="intelligence-report-page">
                            <div className="intelligence-report-section-header">
                                <span className="intelligence-report-section-number">03</span>
                                <div>
                                    <p className="intelligence-report-section-kicker">Intelligence Flags</p>
                                    <h2 className="intelligence-report-section-title">Highest-priority findings</h2>
                                </div>
                            </div>
                            <div className="intelligence-report-flags">
                                {data.intelligence_flags.map((flag, index) => (
                                    <div key={`${flag.type}-${index}`} className="intelligence-report-flag">
                                        <p>{flag.type}</p>
                                        <h3>{flag.finding}</h3>
                                        <p>{flag.recommendation}</p>
                                        <small>Source asset count: {flag.asset_count}</small>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="intelligence-report-page">
                            <div className="intelligence-report-section-header">
                                <span className="intelligence-report-section-number">04</span>
                                <div>
                                    <p className="intelligence-report-section-kicker">Benchmark Snapshot</p>
                                    <h2 className="intelligence-report-section-title">Category benchmark and palette load</h2>
                                </div>
                            </div>
                            <div className="intelligence-report-benchmark-grid">
                                <div className="intelligence-report-benchmark-card">
                                    <p>Average Persuasion Density</p>
                                    <strong>{data.category_persuasion_benchmark.avg_density}%</strong>
                                </div>
                                <div className="intelligence-report-benchmark-card">
                                    <p>Average Cognitive Friction</p>
                                    <strong>{data.category_persuasion_benchmark.avg_friction}%</strong>
                                </div>
                                <div className="intelligence-report-benchmark-card">
                                    <p>Benchmark Reading</p>
                                    <strong>{data.category_persuasion_benchmark.your_rank}</strong>
                                </div>
                            </div>
                            <div className="intelligence-report-palette-grid">
                                {data.chromatic_saturation.map((color) => (
                                    <div key={color.hex} className="intelligence-report-palette-chip">
                                        <div className="intelligence-report-palette-swatch" style={{ backgroundColor: color.hex }} />
                                        <span>{color.hex}</span>
                                        <small>{color.count}</small>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="intelligence-report-page">
                            <div className="intelligence-report-section-header">
                                <span className="intelligence-report-section-number">05</span>
                                <div>
                                    <p className="intelligence-report-section-kicker">Methodology</p>
                                    <h2 className="intelligence-report-section-title">How this readout is built</h2>
                                </div>
                            </div>
                            <p className="intelligence-report-methodology">
                                Analysis based on {data.assetCount} forensic extractions across {selectedSector === 'ALL SECTORS' ? data.sector_options.length || 1 : 1} sectors.
                                Each asset is deconstructed across 13 forensic dimensions, then aggregated into mechanic prevalence, trigger pressure, and anomaly signals.
                                Snapshot computed {formatDate(data.computed_at)} with a 24-hour cache window for repeat report views.
                            </p>
                        </section>
                    </div>

                    <style jsx global>{`
                        .intelligence-report-print {
                            display: none;
                        }

                        @media print {
                            @page {
                                size: A4;
                                margin: 18mm;
                            }

                            body * {
                                visibility: hidden !important;
                            }

                            .intelligence-report-print,
                            .intelligence-report-print * {
                                visibility: visible !important;
                            }

                            .intelligence-report-print {
                                display: block !important;
                                position: absolute;
                                inset: 0;
                                background: #f8f6ef;
                                color: #1a1a1a;
                            }

                            .intelligence-report-page {
                                min-height: calc(297mm - 36mm);
                                page-break-after: always;
                            }

                            .intelligence-report-cover {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background: #f1ede3;
                                border: 1px solid #dccaa9;
                            }

                            .intelligence-report-cover-inner {
                                max-width: 150mm;
                                text-align: center;
                            }

                            .intelligence-report-kicker,
                            .intelligence-report-section-kicker {
                                font-size: 9pt;
                                font-weight: 700;
                                letter-spacing: 0.28em;
                                text-transform: uppercase;
                                color: #8b6a36;
                            }

                            .intelligence-report-title,
                            .intelligence-report-section-title {
                                margin-top: 12pt;
                                font-size: 28pt;
                                font-weight: 300;
                                letter-spacing: 0.02em;
                                text-transform: uppercase;
                            }

                            .intelligence-report-subtitle,
                            .intelligence-report-methodology {
                                margin-top: 16pt;
                                font-size: 12pt;
                                line-height: 1.8;
                                color: #5d5d57;
                            }

                            .intelligence-report-cover-meta {
                                display: flex;
                                justify-content: center;
                                gap: 12pt;
                                margin-top: 18pt;
                                font-size: 9pt;
                                text-transform: uppercase;
                                letter-spacing: 0.18em;
                                color: #7b715e;
                            }

                            .intelligence-report-section-header {
                                display: flex;
                                align-items: baseline;
                                gap: 14pt;
                                padding-bottom: 12pt;
                                border-bottom: 1px solid #dccaa9;
                            }

                            .intelligence-report-section-number {
                                font-size: 26pt;
                                font-weight: 300;
                                color: #c1a67b;
                            }

                            .intelligence-report-list,
                            .intelligence-report-flags {
                                display: grid;
                                gap: 12pt;
                                margin-top: 24pt;
                            }

                            .intelligence-report-row,
                            .intelligence-report-flag {
                                display: grid;
                                gap: 8pt;
                                border: 1px solid #dccaa9;
                                background: white;
                                padding: 14pt;
                                border-radius: 14pt;
                            }

                            .intelligence-report-row {
                                grid-template-columns: 1fr auto auto;
                                align-items: center;
                                font-size: 11pt;
                            }

                            .intelligence-report-velocity-row {
                                display: grid;
                                grid-template-columns: 2fr 2.4fr 0.6fr 0.6fr;
                                gap: 12pt;
                                align-items: center;
                                border: 1px solid #dccaa9;
                                background: white;
                                padding: 14pt;
                                border-radius: 14pt;
                            }

                            .intelligence-report-velocity-copy {
                                display: grid;
                                gap: 4pt;
                            }

                            .intelligence-report-velocity-copy small,
                            .intelligence-report-flag small {
                                font-size: 9pt;
                                color: #7a7467;
                            }

                            .intelligence-report-velocity-bar-wrap {
                                height: 8pt;
                                overflow: hidden;
                                border-radius: 999px;
                                background: #ece2cf;
                            }

                            .intelligence-report-velocity-bar {
                                height: 100%;
                                border-radius: 999px;
                                background: linear-gradient(90deg, #8b6a36, #d4a574);
                            }

                            .intelligence-report-flag h3 {
                                font-size: 14pt;
                                font-weight: 500;
                            }

                            .intelligence-report-flag p:last-child {
                                font-size: 11pt;
                                line-height: 1.7;
                                color: #5d5d57;
                            }

                            .intelligence-report-trigger-grid,
                            .intelligence-report-benchmark-grid {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 16pt;
                                margin-top: 24pt;
                            }

                            .intelligence-report-trigger-panel,
                            .intelligence-report-benchmark-card {
                                padding: 16pt;
                                border: 1px solid #dccaa9;
                                background: #fffdf8;
                            }

                            .intelligence-report-panel-label,
                            .intelligence-report-benchmark-card p {
                                margin: 0;
                                font-size: 9pt;
                                font-weight: 700;
                                letter-spacing: 0.2em;
                                text-transform: uppercase;
                                color: #8b6a36;
                            }

                            .intelligence-report-benchmark-card strong {
                                display: block;
                                margin-top: 10pt;
                                font-size: 18pt;
                                font-weight: 500;
                                line-height: 1.4;
                            }

                            .intelligence-report-opportunity-list {
                                display: grid;
                                gap: 10pt;
                                margin-top: 18pt;
                            }

                            .intelligence-report-opportunity-item {
                                display: grid;
                                grid-template-columns: 28pt 1fr;
                                gap: 12pt;
                                align-items: start;
                            }

                            .intelligence-report-opportunity-item span {
                                font-size: 12pt;
                                color: #c1a67b;
                            }

                            .intelligence-report-opportunity-item p {
                                margin: 0;
                                font-size: 11pt;
                                line-height: 1.6;
                            }

                            .intelligence-report-palette-grid {
                                display: grid;
                                grid-template-columns: repeat(3, 1fr);
                                gap: 12pt;
                                margin-top: 18pt;
                            }

                            .intelligence-report-palette-chip {
                                display: grid;
                                gap: 8pt;
                                padding: 12pt;
                                border: 1px solid #dccaa9;
                                background: #fffdf8;
                            }

                            .intelligence-report-palette-swatch {
                                height: 34pt;
                                border: 1px solid rgba(0, 0, 0, 0.08);
                            }

                            .intelligence-report-palette-chip span,
                            .intelligence-report-palette-chip small {
                                font-size: 9pt;
                                text-transform: uppercase;
                                letter-spacing: 0.16em;
                            }
                        }
                    `}</style>
                </>
            )}
        </div>
    );
}
