'use client';

import { useState, useCallback } from 'react';
import UploadZone from '@/components/UploadZone';
import ProcessingView from '@/components/ProcessingView';
import ResultsView from '@/components/ResultsView';

type AppState =
    | { phase: 'upload' }
    | { phase: 'processing'; jobId: string; mediaUrl: string }
    | { phase: 'results'; mediaUrl: string; mediaKind: string; digest: any; brand?: string };

export default function V1App() {
    const [state, setState] = useState<AppState>({ phase: 'upload' });

    const handleUploadComplete = useCallback(
        ({ jobId, mediaUrl }: { jobId: string; mediaUrl: string }) => {
            setState({ phase: 'processing', jobId, mediaUrl });
        },
        []
    );

    const handleProcessingComplete = useCallback((data: any) => {
        setState({
            phase: 'results',
            mediaUrl: data.media_url,
            mediaKind: data.media_kind || 'image',
            digest: data.digest,
            brand: data.brand,
        });
    }, []);

    const handleReset = useCallback(() => {
        setState({ phase: 'upload' });
    }, []);

    return (
        <div className="min-h-screen hero-gradient">
            {/* Nav */}
            <header className="fixed top-0 inset-x-0 z-50 glass-dark">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <button onClick={handleReset} className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-surface font-black text-sm group-hover:scale-110 transition-transform">
                            D
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-txt-on-dark tracking-tight">
                                Decompiler
                            </h1>
                            <p className="spec-label-dark" style={{ fontSize: '8px' }}>
                                Advertising Intelligence
                            </p>
                        </div>
                    </button>

                    <nav className="flex items-center gap-4">
                        <a href="/dashboard" className="text-[9px] font-bold text-txt-on-dark-muted uppercase tracking-[0.15em] hover:text-accent transition-colors">
                            Dashboard
                        </a>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="pt-24 pb-20 px-6">
                {state.phase === 'upload' && (
                    <div className="page-enter">
                        {/* Hero */}
                        <div className="text-center mb-16 mt-12">
                            <h1 className="font-editorial text-5xl md:text-7xl font-medium text-txt-on-dark leading-[1.1] tracking-tight mb-6">
                                Drop an ad.<br />
                                <span className="text-accent">See the invisible.</span>
                            </h1>
                            <p className="text-lg text-txt-on-dark-muted max-w-xl mx-auto leading-relaxed">
                                AI-powered psychological deep analysis of any advertisement.
                                Uncover the hidden mechanics of persuasion in seconds.
                            </p>
                        </div>

                        <UploadZone onUploadComplete={handleUploadComplete} />

                        {/* How it works */}
                        <div className="max-w-3xl mx-auto mt-24">
                            <h2 className="spec-label-dark text-center mb-8">How it works</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        step: '01',
                                        title: 'Upload',
                                        desc: 'Drop any ad creative — image, video, or paste a URL.',
                                    },
                                    {
                                        step: '02',
                                        title: 'AI Decomposition',
                                        desc: 'Our models decode layers of persuasion, semiotics, and psychology.',
                                    },
                                    {
                                        step: '03',
                                        title: 'Intelligence Report',
                                        desc: 'Receive a comprehensive breakdown of hidden strategy and mechanics.',
                                    },
                                ].map((item) => (
                                    <div key={item.step} className="text-center">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                                            <span className="text-xs font-bold text-accent">{item.step}</span>
                                        </div>
                                        <h3 className="text-sm font-bold text-txt-on-dark mb-1">{item.title}</h3>
                                        <p className="text-xs text-txt-on-dark-muted leading-relaxed">{item.desc}</p>
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
                        mediaUrl={state.mediaUrl}
                        mediaKind={state.mediaKind}
                        digest={state.digest}
                        brand={state.brand}
                        onReset={handleReset}
                    />
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-6">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <p className="spec-label-dark">© 2026 Decompiler. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="spec-label-dark hover:text-accent transition-colors">Privacy</a>
                        <a href="#" className="spec-label-dark hover:text-accent transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
