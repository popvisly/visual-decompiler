'use client';

type CardVariant = 'classification' | 'pullquote' | 'bullets' | 'gauge' | 'strategy' | 'tags';

type Props = {
    title: string;
    variant: CardVariant;
    accentBorder?: boolean;
    noPadding?: boolean;
    children: React.ReactNode;
};

export default function ResultsCard({ title, variant, accentBorder = false, noPadding = false, children }: Props) {
    return (
        <div
            className={`card-stagger bg-white rounded-2xl border overflow-hidden shadow-[0_10px_40px_rgba(20,20,20,0.04)] ${accentBorder ? 'border-[#141414]/20' : 'border-[#E7DED1]'
                }`}
        >
            <div className={noPadding ? '' : 'p-5'}>
                <div className={`flex items-center gap-2 mb-4 ${noPadding ? 'p-5 mb-0' : ''}`}>
                    {accentBorder && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#141414]" />
                    )}
                    <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${accentBorder ? 'text-[#141414]' : 'text-[#6B6B6B]'
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
        <div className="bg-[#FBF7EF] rounded-xl px-3 py-2.5 border border-[#E7DED1]">
            <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">{label}</p>
            <p className="text-xs font-semibold text-[#141414]">{value.replace(/_/g, ' ')}</p>
        </div>
    );
}

export function PullQuote({ text }: { text: string }) {
    return (
        <div className="flex gap-3">
            <div className="w-1 rounded-full bg-[#141414]/20 shrink-0" />
            <p className="text-base font-medium text-[#141414] leading-relaxed italic font-sans tracking-[-0.01em]">
                "{text}"
            </p>
        </div>
    );
}

export function BulletList({ items, color = 'accent' }: { items: string[]; color?: 'accent' | 'red' }) {
    const borderClass = color === 'red' ? 'border-red-500/30' : 'border-[#141414]/20';
    const textClass = color === 'red' ? 'text-red-500' : 'text-[#6B6B6B]';
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

export function ConfidenceGauge({ label, value, description }: { label: string; value: number; description?: string }) {
    const pct = Math.round(value * 100);
    const color = pct >= 90 ? 'text-green-500' : pct >= 75 ? 'text-green-400' : pct >= 50 ? 'text-yellow-500' : 'text-red-500';
    const strokeColor = pct >= 90 ? '#10b981' : pct >= 75 ? '#34d399' : pct >= 50 ? '#f59e0b' : '#ef4444';

    const getStatusLabel = (p: number) => {
        if (p >= 90) return 'Definitive';
        if (p >= 75) return 'High Probability';
        if (p >= 50) return 'Probabilistic';
        return 'Low Signal';
    };

    const statusLabel = getStatusLabel(pct);
    const circumference = 2 * Math.PI * 28;
    const offset = circumference - (value * circumference);

    return (
        <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 64 64" className="shrink-0">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#E7DED1" strokeWidth="4" />
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
                <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] truncate">
                        {label.replace(/_/g, ' ')}
                    </p>
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-white border border-[#E7DED1] ${color}`}>
                        {statusLabel}
                    </span>
                </div>
                {description && (
                    <p className="text-[10px] text-[#6B6B6B]/60 leading-tight">
                        {description}
                    </p>
                )}
            </div>
            <span className={`text-xs font-bold ${color}`}>{pct}%</span>
        </div>
    );
}

export function TagRow({ items }: { items: string[] }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {items.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#FBF7EF] text-[#6B6B6B] text-[10px] font-bold border border-[#E7DED1]">
                    {tag.replace(/_/g, ' ')}
                </span>
            ))}
        </div>
    );
}

export function StrategyField({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-1">{label}</p>
            <p className="text-sm text-[#6B6B6B] leading-[1.5]">{value}</p>
        </div>
    );
}
