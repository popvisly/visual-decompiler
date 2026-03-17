'use client';

import { Database, Search, Layout, FileText } from 'lucide-react';
import Image from 'next/image';

const PILLARS = [
    {
        icon: <Database className="w-6 h-6" />,
        subtext: "Sovereign Memory & Hashing",
        title: "The Intelligence Vault",
        copy: "A private, searchable database where your agency indexes all parsed assets. Powered by SHA-256 deduplication to ensure you never burn neural credits analysing the exact same asset twice.",
        preview: 'vault'
    },
    {
        icon: <Search className="w-6 h-6" />,
        subtext: "Single-Asset Deconstruction",
        title: "Forensic Extraction",
        copy: "Ingest a static asset and deconstruct the semiotic subtext, trigger mechanics, and evidence anchors using our forensic extraction pipeline.",
        preview: 'extract'
    },
    {
        icon: <Layout className="w-6 h-6" />,
        subtext: "Execution Ready",
        title: "Production Blueprints",
        copy: "Don't just analyse the past; build the future. The OS automatically generates verified DNA prompts and structural pacing guides to eliminate subjective interpretation for your art directors."
    },
    {
        icon: <FileText className="w-6 h-6" />,
        subtext: "White-Labeled Delivery",
        title: "The Boardroom Artifact",
        copy: "Strategy only matters if you can sell it. Export your intelligence as a high-fashion, white-labeled \"Strategic Dossier\" (PDF) that dynamically injects your agency's hex codes and branding."
    }
];

const VAULT_PREVIEW_ASSETS = [
    {
        brand: 'Chanel',
        sector: 'Luxury Fragrance',
        mechanic: 'Celebrity Aspirational Transfer',
        image: '/images/examples/perfume_ad.jpg',
    },
    {
        brand: 'Acne Studios',
        sector: 'Luxury Fashion / Premium Accessories',
        mechanic: 'Ironic Juxtaposition + Heritage Weaponization',
        image: '/images/examples/dior.png',
    },
    {
        brand: 'Versace',
        sector: 'Luxury Fragrance',
        mechanic: 'Transcendental Status Signaling',
        image: '/images/examples/valentino-voce-viva.png',
    },
    {
        brand: 'Calvin Klein',
        sector: 'Prestige Fragrance',
        mechanic: 'Aspirational Intimacy as Status Currency',
        image: '/images/examples/perfume.jpg',
    },
];

function VaultPreview() {
    return (
        <div className="mt-3 rounded-[2rem] border border-[#141414]/10 bg-[#141414] p-4 shadow-[0_24px_80px_rgba(20,20,20,0.14)]">
            <div className="grid grid-cols-2 gap-3">
                {VAULT_PREVIEW_ASSETS.map((asset) => (
                    <div key={asset.brand} className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#1D1D1B]">
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <Image
                                src={asset.image}
                                alt={asset.brand}
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                            <div className="absolute bottom-3 right-3 rounded-sm bg-[#D4A574] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.18em] text-[#141414]">
                                Forensic Secured
                            </div>
                        </div>
                        <div className="space-y-3 px-4 py-4">
                            <div>
                                <p className="text-lg font-medium uppercase tracking-tight text-[#F7F3EC]">{asset.brand}</p>
                                <p className="mt-2 border-l border-[#D4A574]/40 pl-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4A574]">
                                    {asset.sector}
                                </p>
                            </div>
                            <div className="border-t border-white/8 pt-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8E846F]">Structural Logic</p>
                                <p className="mt-2 text-[12px] leading-relaxed text-[#F7F3EC]/80">
                                    {asset.mechanic}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ExtractionPreview() {
    return (
        <div className="mt-3 overflow-hidden rounded-[2rem] border border-[#141414]/10 bg-[#141414] p-5 shadow-[0_24px_80px_rgba(20,20,20,0.12)]">
            <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10">
                    <Image
                        src="/images/examples/perfume_ad.jpg"
                        alt="Example forensic extraction"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 20vw"
                    />
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]">Primary Mechanic</p>
                        <h4 className="mt-3 text-xl font-medium uppercase tracking-[0.08em] text-[#F7F3EC]">
                            Celebrity Aspirational Transfer
                        </h4>
                    </div>
                    <div className="grid gap-3 md:grid-cols-[1fr_120px]">
                        <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4A574]/75">Synthesized Visual Style</p>
                            <p className="mt-3 text-[12px] leading-relaxed text-[#F7F3EC]/78">
                                High-key studio portraiture with monumental product scale and saturated chromatic punctuation.
                            </p>
                        </div>
                        <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4A574]/75">Confidence</p>
                            <p className="mt-4 text-4xl font-light text-[#F7F3EC]">99<span className="text-[#D4A574]/60">%</span></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {['#C8230A', '#F4A700', '#F5EDE3'].map((hex) => (
                            <div key={hex} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F7F3EC]/72">
                                <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: hex }} />
                                {hex}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function IntelligenceEcosystem() {
    return (
        <section className="bg-[#F6F1E7] border-y border-[#141414]/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {PILLARS.map((pillar, idx) => (
                        <div
                            key={pillar.title}
                            className={`
                                p-12 lg:p-16 border-[#141414]/10
                                ${idx === 0 ? 'border-b md:border-r' : ''}
                                ${idx === 1 ? 'border-b' : ''}
                                ${idx === 2 ? 'border-b md:border-b-0 md:border-r' : ''}
                                group hover:bg-white/40 transition-colors duration-500
                            `}
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center justify-between">
                                    <div className="p-4 bg-[#141414] text-white rounded-2xl shadow-xl shadow-[#141414]/10 group-hover:scale-110 transition-transform duration-500">
                                        {pillar.icon}
                                    </div>
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#141414]/30 group-hover:text-[#C1A67B] transition-colors">
                                        PILLAR_{idx + 1}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <span className="text-[11px] font-bold text-[#C1A67B] uppercase tracking-[0.2em]">
                                            {pillar.subtext}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-semibold text-[#141414] tracking-tightest uppercase">
                                            {pillar.title}
                                        </h3>
                                    </div>
                                    <p className="text-base md:text-lg text-[#141414]/60 leading-relaxed font-medium max-w-md">
                                        {pillar.copy}
                                    </p>
                                </div>

                                {pillar.preview === 'vault' ? <VaultPreview /> : null}
                                {pillar.preview === 'extract' ? <ExtractionPreview /> : null}

                                <div className="pt-4">
                                    <div className="inline-flex h-[1px] w-12 bg-[#141414]/20 group-hover:w-24 group-hover:bg-[#C1A67B] transition-all duration-700" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
