'use client';

import { useState, useCallback } from 'react';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import UploadZone from '@/components/UploadZone';
import ProcessingViewClient from '@/components/ProcessingViewClient';
import ResultsView from '@/components/ResultsView';

type AccessLevel = 'full' | 'limited';

type AppState =
    | { phase: 'upload' }
    | { phase: 'processing'; jobId: string; mediaUrl: string; accessLevel: AccessLevel }
    | { phase: 'results'; id: string; mediaUrl: string; mediaKind: string; digest: any; brand?: string; accessLevel: AccessLevel };

// REDESIGN: "Premium Charcoal" aesthetic (V1 rebranded as redesigned tool)
export default function V1App() {
    const [state, setState] = useState<AppState>({ phase: 'upload' });

    const handleUploadComplete = useCallback(
        ({ jobId, mediaUrl, accessLevel }: { jobId: string; mediaUrl: string; accessLevel?: AccessLevel }) => {
            setState({ phase: 'processing', jobId, mediaUrl, accessLevel: accessLevel || 'full' });
        },
        []
    );



    const handleProcessingComplete = useCallback((data: any) => {
        setState((prev) => ({
            phase: 'results' as const,
            id: data.id || ('jobId' in prev ? prev.jobId : ''),
            mediaUrl: data.media_url,
            mediaKind: data.media_kind || 'image',
            digest: data.digest,
            brand: data.brand,
            accessLevel: ('accessLevel' in prev ? prev.accessLevel : data.access_level) || 'full',
        }));
    }, []);

    const handleReset = useCallback(() => {
        setState({ phase: 'upload' });
    }, []);

    return (
        <div className="relative min-h-screen bg-[#F6F1E7] text-[#141414] font-sans">
            {/* Bone Grid Background */}
            <div className="pointer-events-none fixed inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px] z-0" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)] z-0" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <UnifiedSovereignHeader />

                {/* Main content */}
                <main className="flex-1 w-full mx-auto px-6 py-16">
                    {state.phase === 'upload' && (
                        <div className="page-enter max-w-4xl mx-auto">
                            {/* Hero */}
                            <div className="text-center mb-16 mt-8">
                                <h1 className="text-4xl md:text-6xl font-semibold text-[#141414] leading-[1.05] tracking-[-0.03em] mb-4">
                                    Drop an ad.<br />
                                    <span className="text-[#6B6B6B]">See the invisible.</span>
                                </h1>
                                <p className="text-[17px] md:text-[19px] text-[#141414]/70 max-w-xl mx-auto leading-[1.5] tracking-[-0.01em]">
                                    AI-powered psychological deep analysis of any advertisement.
                                    Uncover the hidden mechanics of persuasion in seconds.
                                </p>
                            </div>

                            <UploadZone onUploadComplete={handleUploadComplete} />

                            {/* Operational Pipeline */}
                            <div className="max-w-3xl mx-auto mt-28 opacity-80">
                                <h2 className="text-[#6B6B6B] text-[11px] font-bold uppercase tracking-[0.4em] text-center mb-12">Operational Pipeline</h2>
                                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0">
                                    {/* Static Connector */}
                                    <div className="hidden md:block absolute top-[1px] left-[16.67%] right-[16.67%] h-px bg-[#BB9E7B]/40" />

                                    {[
                                        {
                                            title: 'STAGE 01: ASSET INGESTION',
                                            desc: 'Multi-modal entry for high-stakes visual and video data. Securely processed on ISO-27001 infrastructure.',
                                        },
                                        {
                                            title: 'STAGE 02: NEURAL DECONSTRUCTION',
                                            desc: 'Heuristic decoding of semiotic layers, psychological triggers, and invisible machinery.',
                                        },
                                        {
                                            title: 'STAGE 03: SOVEREIGN OUTPUT',
                                            desc: 'Generation of white-labeled, audit-ready forensic dossiers for executive-level strategy.',
                                        },
                                    ].map((item, idx) => (
                                        <div key={idx} className="text-center px-6 relative pt-4">
                                            <h3 className="text-[12px] font-bold text-[#BB9E7B] uppercase tracking-[0.2em] mb-3">{item.title}</h3>
                                            <p className="text-[13px] text-[#6B6B6B] leading-[1.6] font-medium">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {state.phase === 'processing' && (
                        <div className="mt-16">
                            <ProcessingViewClient
                                mediaUrl={state.mediaUrl}
                                jobId={state.jobId}
                            />
                        </div>
                    )}

                    {state.phase === 'results' && (
                        <ResultsView
                            id={state.id}
                            mediaUrl={state.mediaUrl}
                            mediaKind={state.mediaKind}
                            digest={state.digest}
                            status="success"
                            brand={state.brand}
                            accessLevel={state.accessLevel}
                            onReset={handleReset}
                        />
                    )}
                </main>

                {/* Footer */}
                <footer className="w-full text-center py-8">
                    <p className="text-[#6B6B6B] text-[11px] font-semibold tracking-[0.15em] uppercase">© 2026 VisualDecompiler.com. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
