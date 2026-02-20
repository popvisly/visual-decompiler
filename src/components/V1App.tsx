'use client';

import { useState, useCallback, useEffect } from 'react';
import UploadZone from '@/components/UploadZone';
import ProcessingView from '@/components/ProcessingView';
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

    // Provide the example handler to UploadZone via a query param or window effect
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.search.includes('example=luxury')) {
            // Optional: You could directly auto-trigger here, but letting UploadZone handle the UI is cleaner.
        }
    }, []);

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
                {/* Swiss Nav */}
                <header className="sticky top-0 z-50 pt-4 px-6 w-full max-w-6xl mx-auto">
                    <div className="rounded-full border border-[#E7DED1] bg-[#FBF7EF]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(20,20,20,0.06)]">
                        <div className="flex items-center justify-between px-4 py-2.5 md:px-6">
                            <button onClick={handleReset} className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full border border-[#E7DED1] bg-[#F2EBDD] flex items-center justify-center font-bold text-[#141414] text-xs">
                                    D
                                </div>
                                <div className="leading-none text-left">
                                    <div className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#141414]">
                                        Decompiler
                                    </div>
                                    <div className="mt-0.5 text-[11px] tracking-[0.18em] uppercase text-[#6B6B6B]">
                                        App Interface
                                    </div>
                                </div>
                            </button>

                            <nav className="flex items-center gap-4">
                                <a href="/dashboard" className="text-[13px] font-medium tracking-[-0.01em] text-[#141414]/70 hover:text-[#141414] transition">
                                    Dashboard
                                </a>
                            </nav>
                        </div>
                    </div>
                </header>

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

                            {/* How it works */}
                            <div className="max-w-3xl mx-auto mt-24 opacity-80">
                                <h2 className="text-[#6B6B6B] text-[11px] font-semibold uppercase tracking-[0.18em] text-center mb-10">How it works</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        {
                                            step: '01',
                                            title: 'Upload',
                                            desc: 'Drop any ad creative — image, video, or paste a URL.',
                                        },
                                        {
                                            step: '02',
                                            title: 'Decompilation',
                                            desc: 'Our models decode layers of persuasion, semiotics, and psychology.',
                                        },
                                        {
                                            step: '03',
                                            title: 'Report',
                                            desc: 'Receive a comprehensive breakdown of hidden strategy and mechanics.',
                                        },
                                    ].map((item) => (
                                        <div key={item.step} className="text-center">
                                            <div className="w-10 h-10 rounded-full bg-[#FBF7EF] border border-[#E7DED1] flex items-center justify-center mx-auto mb-4 shadow-sm">
                                                <span className="text-[11px] font-bold text-[#141414] tracking-widest">{item.step}</span>
                                            </div>
                                            <h3 className="text-[14px] font-semibold text-[#141414] mb-2">{item.title}</h3>
                                            <p className="text-[13px] text-[#6B6B6B] leading-[1.5]">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {state.phase === 'processing' && (
                        <div className="mt-16">
                            <ProcessingView
                                mediaUrl={state.mediaUrl}
                                jobId={state.jobId}
                                onComplete={handleProcessingComplete}
                            />
                        </div>
                    )}

                    {state.phase === 'results' && (
                        <ResultsView
                            id={state.id}
                            mediaUrl={state.mediaUrl}
                            mediaKind={state.mediaKind}
                            digest={state.digest}
                            brand={state.brand}
                            accessLevel={state.accessLevel}
                            onReset={handleReset}
                        />
                    )}
                </main>

                {/* Footer */}
                <footer className="w-full text-center py-8">
                    <p className="text-[#6B6B6B] text-[11px] font-semibold tracking-[0.15em] uppercase">© 2026 Decompiler. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
