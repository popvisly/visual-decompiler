'use client';

import Image from 'next/image';

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

function TriggerRadar() {
    return (
        <svg
            className="h-[168px] w-full"
            viewBox="0 0 220 168"
            role="img"
            aria-label="Trigger distribution radar"
        >
            <rect x="0" y="0" width="220" height="168" rx="24" fill="#181715" />
            <g opacity="0.22" stroke="#C6A36C" strokeWidth="1">
                <line x1="110" y1="22" x2="110" y2="142" />
                <line x1="48" y1="54" x2="172" y2="110" />
                <line x1="48" y1="110" x2="172" y2="54" />
                <polygon points="110,30 164,61 146,123 74,123 56,61" fill="none" />
                <polygon points="110,48 148,70 136,112 84,112 72,70" fill="none" />
            </g>
            <g fill="none" stroke="#E1B171" strokeWidth="2">
                <polygon points="110,42 144,72 132,111 82,102 75,78" fill="rgba(225,177,113,0.22)" />
            </g>
            <g fill="#F5EFE4">
                <circle cx="110" cy="42" r="3.8" />
                <circle cx="144" cy="72" r="3.8" />
                <circle cx="132" cy="111" r="3.8" />
                <circle cx="82" cy="102" r="3.8" />
                <circle cx="75" cy="78" r="3.8" />
            </g>
            <g fill="#C6A36C" fontSize="10" fontWeight="700" letterSpacing="0.28em">
                <text x="92" y="18">STATUS</text>
                <text x="12" y="80">SOCIAL</text>
                <text x="14" y="94">PROOF</text>
                <text x="160" y="80">UTILITY</text>
                <text x="26" y="132">AUTHORITY</text>
                <text x="160" y="132">SCARCITY</text>
            </g>
        </svg>
    );
}

function MacroDiagnosticPanel() {
    return (
        <div className="rounded-[28px] border border-white/10 bg-[#191715] p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Macro-Diagnostic Map</p>
                    <p className="mt-3 max-w-[14rem] text-[15px] leading-7 text-[#EEE9DE]/88">
                        Focus path and anchor logic surface why the product becomes the icon and the face becomes its delivery system.
                    </p>
                </div>
                <div className="rounded-full border border-[#D4A574]/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">
                    Radiant Architecture
                </div>
            </div>
            <div className="mt-5 rounded-[26px] border border-white/12 bg-[#151412] p-4">
                <div className="grid gap-4 sm:grid-cols-[118px_1fr]">
                    <div className="rounded-[20px] border border-white/16 p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C8A571]">Focus Path</p>
                        <div className="mt-5 space-y-4">
                            <div className="h-[8px] w-14 rounded-full bg-[#D8A466]" />
                            <div className="h-[8px] w-20 rounded-full bg-[#C39258]" />
                            <div className="h-[8px] w-12 rounded-full bg-[#8C6941]" />
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-[22px] border border-white/16 bg-[#121110]">
                        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(212,165,116,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.8) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
                        <svg className="relative h-full w-full" viewBox="0 0 240 160" preserveAspectRatio="xMidYMid meet">
                            <g opacity="0.84">
                                <line x1="62" y1="48" x2="122" y2="80" stroke="#F2E8D7" strokeWidth="1.6" />
                                <line x1="122" y1="80" x2="152" y2="112" stroke="#F2E8D7" strokeWidth="1.6" />
                                <line x1="152" y1="112" x2="148" y2="126" stroke="#D4A574" strokeWidth="1.4" strokeDasharray="2 4" />
                                <circle cx="62" cy="48" r="11" fill="none" stroke="#D4A574" strokeWidth="1.8" />
                                <circle cx="62" cy="48" r="3.8" fill="#F7F1E5" />
                                <circle cx="122" cy="80" r="11" fill="none" stroke="#F7F1E5" strokeWidth="1.8" />
                                <circle cx="122" cy="80" r="3.8" fill="#F7F1E5" />
                                <circle cx="152" cy="112" r="11" fill="none" stroke="#D4A574" strokeWidth="1.8" />
                                <circle cx="152" cy="112" r="3.8" fill="#F7F1E5" />
                                <circle cx="188" cy="76" r="4" fill="#9A9A98" />
                                <circle cx="80" cy="92" r="4" fill="#9A9A98" />
                                <circle cx="198" cy="98" r="4" fill="#9A9A98" />
                                <text x="76" y="36" fill="#D4A574" fontSize="11" letterSpacing="0.18em">01</text>
                                <text x="138" y="69" fill="#D4A574" fontSize="11" letterSpacing="0.18em">03</text>
                                <text x="164" y="129" fill="#D4A574" fontSize="11" letterSpacing="0.18em">02</text>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SingleAssetDossierProof() {
    return (
        <div className="rounded-[34px] border border-[#D8CCB5] bg-[#FBFAF7] p-4 shadow-[0_20px_60px_rgba(23,22,19,0.08)] sm:p-6">
            <div className="flex flex-wrap items-center gap-5 border-b border-[#141414]/10 px-2 pb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8B8376] sm:px-4">
                <span className="text-[#9F7441]">Intelligence</span>
                <span>Signals</span>
                <span>Psychology</span>
                <span>Blueprint</span>
                <span>Market Pulse</span>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
                <div className="space-y-5">
                    <div className="overflow-hidden rounded-[30px] border border-[#181716]/16 bg-[#F5EEE1]">
                        <div className="relative aspect-[0.74]">
                            <Image
                                src="/images/examples/Chanel_No5.webp"
                                alt="Chanel No5 fragrance ad"
                                fill
                                className="object-cover"
                                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 44vw, 100vw"
                            />
                            <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(rgba(212,165,116,0.85) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.85) 1px, transparent 1px)', backgroundSize: '76px 76px' }} />
                            <div className="absolute inset-5 border border-[#D4A574]/45" />
                        </div>
                    </div>
                    <div className="flex items-end justify-between gap-4 px-2 sm:px-0">
                        <div>
                            <p className="text-[44px] leading-none tracking-tight text-[#D39E5B] sm:text-[52px]">CHANEL</p>
                            <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.28em] text-[#D39E5B]">Luxury Fragrance</p>
                        </div>
                        <p className="pb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#B69B77]">ID: 1cb30400</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="rounded-[30px] border border-[#181716]/10 bg-[#171614] px-6 py-6 text-[#F5EFE3]">
                        <div className="grid gap-5 md:grid-cols-[1fr_148px] md:items-start">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Primary Mechanic</p>
                                <h3 className="mt-4 text-3xl font-light uppercase leading-[1.02] tracking-[0.04em] text-[#F5EFE3] sm:text-[42px]">
                                    Celebrity Aspirational
                                    <br />
                                    Transfer
                                </h3>
                                <p className="mt-5 max-w-[38rem] text-[18px] leading-8 text-[#E3DDD1]/88">
                                    Desire and identity migrate from subject to product through proximity, chromatic unity, and monumentality.
                                </p>
                            </div>
                            <div className="md:border-l md:border-white/10 md:pl-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Confidence</p>
                                <p className="mt-3 text-[72px] font-light leading-none tracking-[-0.04em] text-[#F8F2E6]">99%</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
                        <MacroDiagnosticPanel />
                        <div className="space-y-5">
                            <div className="rounded-[28px] border border-[#181716]/10 bg-[#171614] p-6 text-[#F3ECDC]">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Strategic Posture</p>
                                <p className="mt-5 text-[22px] leading-9 text-[#F6F1E8]">
                                    Icon maintenance. The brand is not challenging for position or disrupting the category; it is asserting the permanence of an already-won cultural throne.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-[1fr_0.84fr]">
                                <div className="rounded-[28px] border border-[#D8CCB5] bg-[#FBFAF7] p-6">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Evidence Anchors</p>
                                    <h4 className="mt-4 text-[34px] font-semibold uppercase leading-[0.95] tracking-tight text-[#181716]">
                                        Bottle Scale, Red Boucle, Intimate Gaze
                                    </h4>
                                    <p className="mt-5 text-[21px] leading-9 text-[#5E564B]">
                                        The product is elevated to icon status while the subject remains its aspirational delivery system.
                                    </p>
                                </div>

                                <div className="grid gap-5">
                                    <div className="rounded-[28px] border border-[#181716]/10 bg-[#171614] p-5 text-[#F7F1E6]">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Trigger Distribution Map</p>
                                        <div className="mt-4">
                                            <TriggerRadar />
                                        </div>
                                        <p className="mt-4 text-[17px] leading-8 text-[#E3DDD1]/78">
                                            This distribution quantifies the creative&apos;s psychological surface area, identifying which aspiration levers are being engaged to command consumer compliance.
                                        </p>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className="rounded-[28px] border border-[#181716]/10 bg-[#171614] p-5 text-[#F7F1E6]">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Persuasion Density</p>
                                            <p className="mt-4 text-[64px] font-light leading-none tracking-[-0.04em] text-[#D9A865]">91%</p>
                                            <p className="mt-3 text-[17px] leading-8 text-[#E3DDD1]/84">
                                                The creative compresses brand signal into a high-memory, low-friction luxury code.
                                            </p>
                                        </div>
                                        <div className="rounded-[28px] border border-[#181716]/10 bg-[#171614] p-5 text-[#F7F1E6]">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Cognitive Friction</p>
                                            <p className="mt-4 text-[64px] font-light leading-none tracking-[-0.04em] text-[#D9A865]">8%</p>
                                            <p className="mt-3 text-[17px] leading-8 text-[#E3DDD1]/84">
                                                Low resistance indicates frictionless adoption once desire and authority are fused.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProductProofSequence() {
    return (
        <section className="border-y border-[#141414]/6 bg-[#F7F2E8]">
            <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                <div className="space-y-16 md:space-y-20">
                    {FUNNEL_SECTIONS.map((section) => (
                        <section key={section.label} className="border-b border-[#141414]/8 pb-14 last:border-b-0 last:pb-0">
                            <div className="space-y-8">
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

                                {section.label === 'Single-Asset Deconstruction' && <SingleAssetDossierProof />}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
