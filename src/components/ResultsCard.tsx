'use client';

type CardVariant = 'classification' | 'pullquote' | 'bullets' | 'gauge' | 'strategy' | 'tags';

type Props = {
    title: string;
    variant: CardVariant;
    accentBorder?: boolean;
    children: React.ReactNode;
};

export default function ResultsCard({ title, variant, accentBorder = false, children }: Props) {
    return (
        <div
            className={`card-stagger bg-surface rounded-2xl border overflow-hidden ${accentBorder ? 'border-accent/20' : 'border-white/5'
                }`}
        >
            <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    {accentBorder && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                    <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${accentBorder ? 'text-accent' : 'text-txt-on-dark-muted'
                        }`}>
                        {title}
                    </h3>
                </div>
                {children}
            </div>
        </div>
    );
}

/* ── Sub-components for card content ── */

export function ClassificationPill({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white/5 rounded-xl px-3 py-2.5 border border-white/5">
            <p className="spec-label-dark mb-0.5">{label}</p>
            <p className="text-xs font-semibold text-txt-on-dark">{value.replace(/_/g, ' ')}</p>
        </div>
    );
}

export function PullQuote({ text }: { text: string }) {
    return (
        <div className="flex gap-3">
            <div className="w-1 rounded-full bg-accent/30 shrink-0" />
            <p className="text-base font-medium text-txt-on-dark leading-relaxed italic font-editorial">
                "{text}"
            </p>
        </div>
    );
}

export function BulletList({ items, color = 'accent' }: { items: string[]; color?: 'accent' | 'red' }) {
    const borderClass = color === 'red' ? 'border-red-500/30' : 'border-accent/30';
    const textClass = color === 'red' ? 'text-red-400' : 'text-txt-on-dark-muted';
    return (
        <ul className="space-y-1.5">
            {items.map((item, i) => (
                <li key={i} className={`text-xs ${textClass} pl-3 border-l-2 ${borderClass}`}>
                    {item}
                </li>
            ))}
        </ul>
    );
}

export function ConfidenceGauge({ label, value }: { label: string; value: number }) {
    const pct = Math.round(value * 100);
    const color = pct >= 80 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400';
    const strokeColor = pct >= 80 ? '#00e676' : pct >= 50 ? '#ffd740' : '#ff5252';
    const circumference = 2 * Math.PI * 28;
    const offset = circumference - (value * circumference);

    return (
        <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 64 64" className="shrink-0">
                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                <circle
                    cx="32" cy="32" r="28" fill="none"
                    stroke={strokeColor} strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="gauge-ring"
                    transform="rotate(-90 32 32)"
                />
            </svg>
            <div className="flex-1 min-w-0">
                <p className="spec-label-dark truncate">{label.replace(/_/g, ' ')}</p>
            </div>
            <span className={`text-xs font-bold ${color}`}>{pct}%</span>
        </div>
    );
}

export function TagRow({ items }: { items: string[] }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {items.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-accent-muted text-accent text-[10px] font-bold border border-accent/10">
                    {tag.replace(/_/g, ' ')}
                </span>
            ))}
        </div>
    );
}

export function StrategyField({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="spec-label-dark mb-1">{label}</p>
            <p className="text-sm text-txt-on-dark-muted leading-relaxed">{value}</p>
        </div>
    );
}
