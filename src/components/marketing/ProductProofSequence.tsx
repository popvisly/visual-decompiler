'use client';

const FUNNEL_SECTIONS = [
    {
        label: 'Single-Asset Deconstruction',
        title: 'Open the dossier.',
        accent: 'See the system.',
        body: 'Start with the actual dossier experience. The asset stays visible, the mechanic reads instantly, and the confidence, map logic, and strategic posture tell you why the ad is working before you ever get to export, clone, or market benchmarking.',
    },
    {
        label: 'Intelligence Vault',
        title: 'Build a memory.',
        accent: 'Not a one-off report.',
        body: 'The vault is where the product stops being a clever demo and becomes strategic infrastructure. Searchable assets, deduplicated memory, tags, boards, and future benchmark depth all start here.',
    },
    {
        label: 'Execution Outputs',
        title: 'Turn analysis',
        accent: 'into execution.',
        body: 'This is where the subscription becomes hard to walk away from. The platform does not stop at analysis. It opens clone routes, produces boardroom-ready dossier output, creates an embeddable intelligence panel, and gives strategy teams something they can actually ship.',
    },
    {
        label: 'Mechanic Intelligence',
        title: 'See the market,',
        accent: 'not just the ad.',
        body: 'Cross-asset intelligence is where the premium layer becomes obvious. Market Pulse shows mechanic velocity, whitespace, audit trails, and comparative pressure across the vault. Differential Diagnostic shows lift, fatigue, and strategic delta between assets.',
    },
    {
        label: 'Agency Operating Layer',
        title: 'Run it like',
        accent: 'an agency system.',
        body: 'Once the intelligence is working, the rest has to feel inevitable. Boards, embeds, white-labeled export, settings, and team seats are what turn forensic analysis into an operating system clients and strategists can actually live inside.',
    },
];

export default function ProductProofSequence() {
    return (
        <section className="border-y border-[#141414]/6 bg-[#F7F2E8]">
            <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                <div className="space-y-16 md:space-y-20">
                    {FUNNEL_SECTIONS.map((section) => (
                        <section key={section.label} className="border-b border-[#141414]/8 pb-14 last:border-b-0 last:pb-0">
                            <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">{section.label}</p>
                                </div>
                                <div className="space-y-5">
                                    <h2 className="max-w-4xl text-4xl font-semibold uppercase leading-[0.94] tracking-tight text-[#141414] md:text-6xl">
                                        {section.title}
                                        <br />
                                        <span className="text-[#C1A67B]">{section.accent}</span>
                                    </h2>
                                    <p className="max-w-4xl text-lg leading-relaxed text-[#5F5B53]">{section.body}</p>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
