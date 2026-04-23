'use client';

type CanonicalDossierArtifactProps = {
    mode?:
        | 'preview'
        | 'hero-slice'
        | 'attention-zoom'
        | 'layer-primary'
        | 'layer-attention'
        | 'layer-structural'
        | 'layer-strategic';
    className?: string;
};

function shellClass(mode: NonNullable<CanonicalDossierArtifactProps['mode']>) {
    if (mode === 'hero-slice') {
        return 'rounded-[1.4rem] border border-[#C1A674]/22 bg-[#12110F]/75 p-5 backdrop-blur-[2px]';
    }
    if (mode === 'attention-zoom') {
        return 'rounded-[1.9rem] border border-[#C1A674]/22 bg-[#12110F] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.4)] sm:p-8';
    }
    if (mode.startsWith('layer-')) {
        return 'rounded-[1.25rem] border border-[#C1A674]/22 bg-[#12110F] p-5 min-h-[168px]';
    }
    return 'rounded-[2rem] border border-[#C1A674]/22 bg-[#12110F] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.42)] sm:p-9';
}

export default function CanonicalDossierArtifact({ mode = 'preview', className = '' }: CanonicalDossierArtifactProps) {
    if (mode === 'layer-primary') {
        return (
            <div className={`${shellClass(mode)} ${className}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C1A674]">Primary Scores</p>
                <div className="mt-4 grid grid-cols-5 gap-3">
                    {[
                        ['Clarity', '82'],
                        ['Attention', '91'],
                        ['Cohesion', '76'],
                        ['Intent', '88'],
                        ['Distinction', '67'],
                    ].map(([label, value]) => (
                        <div key={label}>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[#F6F1E7]/52">{label}</p>
                            <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.02em] text-[#F6F1E7]">{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (mode === 'layer-attention') {
        return (
            <div className={`${shellClass(mode)} ${className}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C1A674]">Attention Path</p>
                <div className="mt-4 space-y-4">
                    {[
                        ['1', 'Product silhouette — immediate entry point.'],
                        ['2', 'Brand mark — delayed recognition.'],
                        ['3', 'Supporting copy — low engagement.'],
                    ].map(([n, line]) => (
                        <div key={n} className="flex items-start gap-3">
                            <span className="text-[16px] font-semibold leading-none text-[#F6F1E7]">{n}</span>
                            <p className="text-[12px] leading-relaxed text-[#F6F1E7]/72">{line}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (mode === 'layer-structural') {
        return (
            <div className={`${shellClass(mode)} ${className}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C1A674]">Structural Signals</p>
                <div className="mt-4 space-y-3">
                    {[
                        ['Hierarchy', 'Strong'],
                        ['Balance', 'Controlled'],
                        ['Contrast', 'Moderate'],
                        ['Density', 'High'],
                        ['Focus Integrity', 'Fragmented'],
                    ].map(([l, v]) => (
                        <div key={l} className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F6F1E7]/56">{l}</span>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F6F1E7]/95">{v}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (mode === 'layer-strategic') {
        return (
            <div className={`${shellClass(mode)} ${className}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C1A674]">Strategic Read</p>
                <div className="mt-4 space-y-4">
                    <p className="text-[11px] leading-relaxed text-[#F6F1E7]/74">Strategic Thesis: Premium restraint with controlled visual aggression.</p>
                    <p className="text-[11px] leading-relaxed text-[#F6F1E7]/74">Trigger Mechanic: Subject isolation and negative space dominance.</p>
                    <p className="text-[11px] leading-relaxed text-[#F6F1E7]/74">Friction Points: Supporting copy competes with silhouette focus.</p>
                </div>
            </div>
        );
    }

    if (mode === 'attention-zoom') {
        return (
            <div className={`${shellClass(mode)} ${className}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#C1A674]">Attention Path</p>
                <h4 className="mt-5 text-[32px] font-semibold uppercase leading-[0.96] tracking-[-0.03em] text-[#F6F1E7]">Read how the work actually performs.</h4>
                <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-5">
                        {[
                            ['1', 'Product silhouette', 'Immediate entry point driven by contrast isolation.'],
                            ['2', 'Brand mark', 'Recognition occurs after subject lock.'],
                            ['3', 'Supporting copy', 'Engagement weakens at the information layer.'],
                        ].map(([n, t, d]) => (
                            <div key={n} className="border-b border-white/10 pb-4 last:border-b-0">
                                <p className="text-[24px] font-semibold leading-none text-[#F6F1E7]">{n}</p>
                                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F6F1E7]/86">{t}</p>
                                <p className="mt-2 text-[13px] leading-relaxed text-[#F6F1E7]/70">{d}</p>
                            </div>
                        ))}
                    </div>
                    <aside className="self-start rounded-[1rem] border border-[#C1A674]/22 px-4 py-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#C1A674]">Drop-Off Detected</p>
                        <p className="mt-3 text-[12px] leading-relaxed text-[#F6F1E7]/70">
                            Attention falls between subject and copy layer, reducing message transfer.
                        </p>
                    </aside>
                </div>
            </div>
        );
    }

    const preview = (
        <div className={`${shellClass(mode)} ${className}`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#C1A674]">Visual Decompiler</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F6F1E7]/55">Creative Intelligence Dossier</p>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C1A674]">Sample Export</p>
            </div>

            <div className="space-y-8 pt-8">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C1A674]">Primary Scores</p>
                    <div className="mt-4 grid grid-cols-5 gap-3">
                        {[
                            ['Clarity', '82'],
                            ['Attention', '91'],
                            ['Cohesion', '76'],
                            ['Intent', '88'],
                            ['Distinction', '67'],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <p className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[#F6F1E7]/52">{label}</p>
                                <p className="mt-2 text-[24px] font-semibold leading-none tracking-[-0.02em] text-[#F6F1E7]">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C1A674]">Strategic Read</p>
                    <div className="mt-4 space-y-4">
                        <p className="text-[12px] leading-relaxed text-[#F6F1E7]/74">Strategic Thesis: Positions the product as premium through restraint and visual isolation.</p>
                        <p className="text-[12px] leading-relaxed text-[#F6F1E7]/74">Trigger Mechanic: High contrast subject lock drives immediate attention entry.</p>
                        <p className="text-[12px] leading-relaxed text-[#F6F1E7]/74">Friction Points: Supporting copy competes with the primary focal route.</p>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                    <p className="text-[13px] font-semibold text-[#F6F1E7]">Confidence Index: High</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#F6F1E7]/66">Based on alignment between clarity, attention control, and strategic intent.</p>
                </div>
            </div>
        </div>
    );

    if (mode === 'hero-slice') {
        return (
            <div className={`${shellClass(mode)} ${className}`}>
                <div className="pointer-events-none max-h-[118px] overflow-hidden opacity-45 blur-[0.35px]">
                    {preview}
                </div>
            </div>
        );
    }

    return preview;
}
