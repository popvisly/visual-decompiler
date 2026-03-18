const dossierSignals = [
    {
        label: 'Primary Mechanic',
        value: 'Celebrity Aspiration Transfer',
        note: 'Desire and identity migrate from subject to product through proximity, chromatic unity, and monumentality.',
    },
    {
        label: 'Confidence',
        value: '99%',
        note: 'Evidence density strongly matches ultra-luxury fragrance persuasion codes.',
    },
    {
        label: 'Evidence Anchors',
        value: 'Bottle scale, red boucle, intimate gaze',
        note: 'The product is elevated to icon status while the subject remains its aspirational delivery system.',
    },
];

const blueprintCells = [
    {
        label: 'Visual Test',
        title: 'Reduce bottle to conventional scale',
        note: 'Measures whether monumentality is the primary persuasion lever or whether celebrity proximity can carry the load alone.',
    },
    {
        label: 'Chromatic Test',
        title: 'Replace scarlet boucle with Chanel black',
        note: 'Tests whether desire is being carried by warmth and chromatic echo or by house-code authority in isolation.',
    },
    {
        label: 'Hook Test',
        title: 'Shift the gaze into direct eye contact',
        note: 'Measures whether confrontational address strengthens click-through or collapses aspirational asymmetry.',
    },
];

const cloneConcepts = [
    {
        title: 'The Cellar Master’s Secret',
        tag: 'Restraint',
        copy: 'A private-allocation burgundy brand launched through aged authority and inherited mystique instead of overt luxury signaling.',
    },
    {
        title: 'The Weight of the Blade',
        tag: 'Reversal',
        copy: 'A heritage culinary object becomes the new icon by transferring decades of mastery into one monumental product gesture.',
    },
];

const marketSignals = [
    {
        label: 'Mechanic Velocity',
        title: 'Celebrity Aspiration Transfer',
        stat: '28% share',
        note: 'Still dominant, but beginning to flatten as adjacent luxury fragrance brands oversaturate the same desire relay.',
    },
    {
        label: 'Whitespace',
        title: 'Status through ritual precision',
        stat: 'Open',
        note: 'There is room for brands to shift from overt aspiration into ceremonial authority without losing premium heat.',
    },
    {
        label: 'Audit Trail',
        title: 'Source assets surfaced',
        stat: '12 dossiers',
        note: 'Every market claim can now be traced back to the assets creating the pressure pattern, not just an abstract score.',
    },
];

export default function ProductProofSequence() {
    return (
        <section className="border-y border-[#141414]/6 bg-[#F7F2E8]">
            <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                <div className="grid gap-20">
                    <section className="grid gap-10 border-b border-[#141414]/8 pb-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Single-Asset Deconstruction</p>
                                <h2 className="max-w-xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                    See the ad.
                                    <br />
                                    <span className="text-[#C1A67B]">Read the hidden system.</span>
                                </h2>
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed text-[#5F5B53]">
                                Every asset is deconstructed into the mechanics carrying status, desire, and price justification. The output is not generic sentiment. It is a usable persuasion readout.
                            </p>
                            <div className="overflow-hidden rounded-[2rem] border border-[#D9CCB4] bg-[#141414] p-4 shadow-[0_30px_70px_rgba(20,20,20,0.12)]">
                                <img
                                    src="/images/examples/perfume_ad_no_logo.jpg"
                                    alt="Luxury fragrance asset analysis preview"
                                    className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                                />
                            </div>
                        </div>

                        <div className="grid gap-5">
                            {dossierSignals.map((signal) => (
                                <div key={signal.label} className="rounded-[2rem] border border-[#D9CCB4] bg-white p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">{signal.label}</p>
                                    <h3 className="mt-4 text-2xl font-semibold uppercase leading-[1.02] tracking-tight text-[#141414]">
                                        {signal.value}
                                    </h3>
                                    <p className="mt-4 text-sm leading-relaxed text-[#5F5B53]">{signal.note}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-10 border-b border-[#141414]/8 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Execution Outputs</p>
                                <h2 className="max-w-xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                    Turn analysis
                                    <br />
                                    <span className="text-[#C1A67B]">into execution.</span>
                                </h2>
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed text-[#5F5B53]">
                                Visual Decompiler does not stop at diagnosis. It generates production blueprints, verified DNA prompts, and clone routes so the insight becomes action, not just commentary.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-white p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                                <div className="flex flex-col gap-4 border-b border-[#141414]/8 pb-5 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">Production Blueprint</p>
                                        <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight text-[#141414]">Iteration & test plan</h3>
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#7A7468]">Saved to each asset automatically</p>
                                </div>
                                <div className="mt-6 grid gap-4 md:grid-cols-3">
                                    {blueprintCells.map((cell) => (
                                        <div key={cell.title} className="rounded-[1.5rem] border border-[#D9CCB4] bg-[#FBF8F1] p-5">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#C1A67B]">{cell.label}</p>
                                            <h4 className="mt-3 text-lg font-semibold leading-[1.08] text-[#141414]">{cell.title}</h4>
                                            <p className="mt-3 text-sm leading-relaxed text-[#5F5B53]">{cell.note}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-[#D9CCB4] bg-[#141414] p-7 text-white shadow-[0_20px_50px_rgba(20,20,20,0.14)]">
                                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Clone Engine</p>
                                        <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight text-white">Fresh campaign routes from one persuasion mechanic</h3>
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Five deployable concepts per asset</p>
                                </div>
                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    {cloneConcepts.map((concept) => (
                                        <div key={concept.title} className="rounded-[1.5rem] border border-[#D4A574]/18 bg-white/[0.03] p-5">
                                            <div className="flex items-center justify-between gap-4">
                                                <p className="text-lg font-semibold uppercase leading-[1.04] text-white">{concept.title}</p>
                                                <span className="rounded-full border border-[#D4A574]/25 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D4A574]">
                                                    {concept.tag}
                                                </span>
                                            </div>
                                            <p className="mt-4 text-sm leading-relaxed text-white/72">{concept.copy}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Mechanic Intelligence</p>
                                <h2 className="max-w-xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                    See the market,
                                    <br />
                                    <span className="text-[#C1A67B]">not just the ad.</span>
                                </h2>
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed text-[#5F5B53]">
                                Once assets are in the vault, the platform stops being a report generator and becomes an intelligence layer. It shows mechanic velocity, trigger pressure, whitespace, and the source assets creating each signal.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-[#D9CCB4] bg-white p-7 shadow-[0_14px_40px_rgba(20,20,20,0.06)]">
                            <div className="flex flex-col gap-4 border-b border-[#141414]/8 pb-5 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C1A67B]">Market Pulse</p>
                                    <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight text-[#141414]">Cross-asset signal mapping</h3>
                                </div>
                                <p className="text-[11px] uppercase tracking-[0.18em] text-[#7A7468]">30D / 60D / 90D windows</p>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                {marketSignals.map((signal) => (
                                    <div key={signal.label} className="rounded-[1.5rem] border border-[#D9CCB4] bg-[#FBF8F1] p-5">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#C1A67B]">{signal.label}</p>
                                        <h4 className="mt-3 text-lg font-semibold leading-[1.08] text-[#141414]">{signal.title}</h4>
                                        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">{signal.stat}</p>
                                        <p className="mt-3 text-sm leading-relaxed text-[#5F5B53]">{signal.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
