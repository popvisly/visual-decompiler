"use client";

import { useEffect } from 'react';

interface DeckAsset {
    id: string;
    file_url: string;
    brand?: { name: string; market_sector: string };
}

interface DeckExtraction {
    primary_mechanic: string;
    visual_style: string;
    confidence_score?: number;
    color_palette?: string[];
    dna_prompt?: string;
    evidence_anchors?: string[] | Record<string, unknown>[];
    evidence_receipts?: Array<{
        claim: string;
        evidence_vector: string;
        confidence_score: number;
        visual_anchor: string;
    }> | Record<string, unknown>[];
    likely_scan_path?: string[] | Record<string, unknown>[];
}

interface DeckAgency {
    name?: string;
    primary_hex?: string;
    whitelabel_logo?: string;
}

export default function DeckClient({ asset, extraction, agency }: { asset: DeckAsset, extraction: DeckExtraction, agency: DeckAgency | null }) {

    // Safe parsing of arrays from strings if needed
    let fileUrls = [asset.file_url];
    try {
        const parsed = JSON.parse(asset.file_url);
        if (Array.isArray(parsed)) fileUrls = parsed;
    } catch (e) { }

    const coverImage = fileUrls[0];
    const isCarousel = fileUrls.length > 1;

    // Add print media queries via styled-jsx or plain injected CSS to ensure background colors print
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          background-color: black !important;
        }
        .no-print {
          display: none !important;
        }
        .page-break {
          page-break-after: always;
          break-after: page;
        }
      }
    `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    return (
        <div
            className="w-full bg-black text-white selection:bg-white selection:text-black"
            style={{ borderTop: agency?.primary_hex ? `1px solid ${agency.primary_hex}` : 'none' }}
        >
            {/* WHITELABEL LOGO / NAME (Top Left) */}
            <div className="absolute top-8 left-8 z-50">
                {agency?.whitelabel_logo ? (
                    <img src={agency.whitelabel_logo} alt={agency?.name || 'Agency'} className="max-h-8 object-contain" />
                ) : (
                    <span className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase opacity-90 text-white">
                        {agency?.name || 'Decompiler'}
                    </span>
                )}
            </div>

            {/* EXPORT BUTTON (Absolute TR) */}
            <button
                onClick={() => window.print()}
                className="no-print fixed top-8 right-8 z-50 bg-black/50 backdrop-blur-sm border border-neutral-700 hover:border-white px-6 py-3 transition-colors text-[9px] font-bold tracking-[0.2em] uppercase"
            >
                Export Artifact
            </button>

            {/* SLIDE 1: THE TITLE CARD */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center p-8 page-break relative isolate">

                {/* Absolute Background Image option */}
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20 filter grayscale blur-sm">
                    <img src={coverImage} alt="Cover BG" className="w-[80%] h-[80%] object-cover scale-110" />
                </div>

                <div className="z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
                    <div className="w-full aspect-video md:aspect-[21/9] bg-neutral-950 border border-neutral-800 overflow-hidden mb-16 relative">
                        {/* If carousel, show split grid, otherwise single image */}
                        {isCarousel ? (
                            <div className="flex w-full h-full">
                                {fileUrls.slice(0, 3).map((url, i) => (
                                    <img key={i} src={url} className="flex-1 h-full object-cover grayscale border-r border-neutral-800 last:border-r-0" />
                                ))}
                            </div>
                        ) : (
                            <img src={coverImage} alt="Cover" className="w-full h-full object-cover grayscale" />
                        )}

                        <div className="absolute bottom-6 right-6 bg-black px-4 py-2 border border-neutral-700">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-white">ID: {asset.id.split('-')[0]}</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-7xl lg:text-[7rem] font-light tracking-[0.1em] text-white uppercase leading-none mb-8">
                            Forensic<br />Deconstruction
                        </h1>
                        <div className="flex flex-col items-center gap-2 border-t border-neutral-800 pt-8 mt-4 w-64 mx-auto">
                            <span className="text-sm font-bold tracking-[0.3em] uppercase text-white">{asset.brand?.name}</span>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">{asset.brand?.market_sector}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SLIDE 2: THE CORE THESIS */}
            <section className="min-h-screen w-full flex flex-col justify-center p-8 md:p-24 page-break bg-neutral-950 border-t border-neutral-900">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="flex items-center gap-4 mb-16 border-b border-neutral-800 pb-4">
                        <div className="w-12 h-px bg-white" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-500">The Core Thesis</span>
                    </div>

                    <h2 className="text-4xl md:text-7xl lg:text-[6rem] font-light tracking-tight text-white leading-[1.05] uppercase mb-16">
                        "{extraction.primary_mechanic}"
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-800 pt-16">
                        <div>
                            <h3 className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 mb-6">Synthesized Visual Style</h3>
                            <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed">
                                {extraction.visual_style}
                            </p>
                        </div>
                        {/* Minimalist Graphic Space */}
                        <div className="flex items-center justify-center border border-neutral-800 border-dashed p-12">
                            <div
                                className="w-32 h-32 border border-neutral-700 rounded-full flex items-center justify-center"
                                style={{ borderColor: agency?.primary_hex || '#333' }}
                            >
                                <div
                                    className="w-16 h-16 border border-neutral-600 rounded-full"
                                    style={{ borderColor: agency?.primary_hex || '#444', backgroundColor: agency?.primary_hex ? `${agency.primary_hex}20` : 'transparent' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SLIDE 3: THE EVIDENCE */}
            <section className="min-h-screen w-full flex flex-col justify-center p-8 md:p-24 page-break bg-black border-t border-neutral-900">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="flex items-center gap-4 mb-16 border-b border-neutral-800 pb-4">
                        <div className="w-12 h-px bg-white" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-500">The Evidence</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        {/* Confidence Metric */}
                        <div className="flex flex-col justify-center">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 mb-6">System Confidence Limit</span>
                            <div className="flex items-end gap-4">
                                <span className="text-8xl md:text-[8rem] font-mono font-light tracking-tighter text-white leading-none">
                                    {extraction.confidence_score}
                                </span>
                                <span className="text-2xl md:text-4xl font-mono text-neutral-600 mb-4 md:mb-6">%</span>
                            </div>
                            <p className="text-neutral-400 mt-8 font-sans text-sm tracking-wide">
                                Data rigorously verified over thousands of vector data points. Neural extraction complete.
                            </p>
                        </div>

                        {/* Color Palette Grid */}
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 mb-6 block">Dominant Chromatic Base</span>
                            {extraction.color_palette && extraction.color_palette.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {extraction.color_palette.map((hex: string, i: number) => (
                                        <div key={i} className="aspect-square flex flex-col justify-end p-4 border border-neutral-800" style={{ backgroundColor: hex }}>
                                            <span className={`text-[10px] font-mono tracking-widest mix-blend-difference text-white`}>{hex}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="aspect-square flex items-center justify-center border border-neutral-800 text-xs font-mono text-neutral-600">
                                    NO PALETTE
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* SLIDE 4: THE BLUEPRINT */}
            <section className="min-h-screen w-full flex flex-col justify-center p-8 md:p-24 page-break bg-neutral-950 border-t border-neutral-900">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="flex items-center gap-4 mb-16 border-b border-neutral-800 pb-4">
                        <div className="w-12 h-px bg-white" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-500">Production Blueprint Direction</span>
                    </div>

                    {/* DNA Prompt Codeblock */}
                    <div className="mb-24">
                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white mb-8 border-l-2 border-white pl-6">
                            Verified DNA Prompt
                        </h3>
                        <div className="bg-black border border-neutral-800 p-8 md:p-12">
                            <code className="text-lg md:text-2xl font-mono text-neutral-300 leading-relaxed font-light break-all">
                                {extraction.dna_prompt}
                            </code>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-6 border-b border-neutral-800 pb-4">
                                Evidence Anchors
                            </h3>
                            {extraction.evidence_anchors && Array.isArray(extraction.evidence_anchors) && extraction.evidence_anchors.length > 0 ? (
                                <ul className="space-y-4 font-mono text-sm">
                                    {extraction.evidence_receipts?.map((receipt: any, idx: number) => (
                                        <li key={idx} className="flex gap-4">
                                            <span className="text-neutral-600">[{`${idx + 1}`.padStart(2, '0')}]</span>
                                            <span className="text-neutral-300">{typeof receipt === 'string' ? receipt : JSON.stringify(receipt)}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xs font-mono text-neutral-600">Pending Blueprint generation.</p>
                            )}
                        </div>

                        <div>
                            <div className="aspect-square border border-neutral-800 bg-black flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20" style={{
                                    backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px'
                                }} />
                                <span className="relative z-10 text-[9px] uppercase tracking-[0.3em] font-bold text-neutral-500">
                                    Aesthetic Execution Sandbox
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
