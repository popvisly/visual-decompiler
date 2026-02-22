'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2, Maximize2, Sparkles, Layout, Printer } from 'lucide-react';
import { Slide, ExecutiveSummary } from '@/lib/executive_summaries';

interface Props {
    boardName: string;
    strategicAnswer: string;
    stats: any[];
    sentiment: any;
    onClose: () => void;
}

export default function ExecutiveSummaryView({ boardName, strategicAnswer, stats, sentiment, onClose }: Props) {
    const [summary, setSummary] = useState<ExecutiveSummary | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch('/api/summarize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ boardName, strategicAnswer, stats, sentiment })
                });
                const data = await res.json();
                setSummary(data);
            } catch (err) {
                console.error("Failed to generate summary:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [boardName, strategicAnswer, stats]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [summary, currentSlide]);

    const nextSlide = () => {
        if (!summary) return;
        setCurrentSlide((prev) => (prev + 1) % summary.slides.length);
    };

    const prevSlide = () => {
        if (!summary) return;
        setCurrentSlide((prev) => (prev - 1 + summary.slides.length) % summary.slides.length);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-[100] bg-[#141414] flex flex-col items-center justify-center text-[#FBF7EF]">
                <Loader2 className="w-12 h-12 animate-spin text-accent mb-6" />
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">Synthesizing Executive Deck...</p>
            </div>
        );
    }

    if (!summary || summary.slides.length === 0) return null;

    const slide = summary.slides[currentSlide];

    return (
        <div className="fixed inset-0 z-[100] bg-[#141414] flex flex-col animate-in fade-in duration-700 overflow-hidden select-none">
            {/* Nav Header */}
            <div className="p-8 md:p-12 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                        <Layout className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                        <h2 className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">Executive Summary</h2>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{boardName} — 0{currentSlide + 1} / 0{summary.slides.length}</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-4 hover:bg-white/5 rounded-full transition-colors group"
                >
                    <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>

            {/* Slide Content */}
            <div className="flex-1 flex items-center justify-center px-8 md:px-24 py-12 relative">
                {/* Background Decor */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl w-full animate-in slide-in-from-bottom-12 duration-1000">
                    {slide.type === 'title' ? (
                        <div className="space-y-12">
                            <h1 className="text-[12vw] md:text-[8vw] font-light text-white leading-[0.8] tracking-tightest uppercase">
                                {slide.title.split(' ').slice(0, -1).join(' ')}<br />
                                <span className="text-accent">{slide.title.split(' ').pop()}</span>
                            </h1>
                            <p className="text-xl md:text-3xl font-light text-white/50 tracking-tight max-w-2xl leading-relaxed">
                                {slide.subtitle}
                            </p>
                        </div>
                    ) : slide.type === 'stat' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
                            <div className="space-y-12">
                                <h1 className="text-7xl md:text-[6vw] font-light text-white leading-[0.9] tracking-tightest uppercase">
                                    Strategic<br />Pattern<br /><span className="text-accent underline decoration-white/10 underline-offset-8">Density</span>
                                </h1>
                            </div>
                            <div className="grid grid-cols-1 gap-8 md:gap-12">
                                {slide.metrics?.map((m, idx) => (
                                    <div key={idx} className="border-l-2 border-accent pl-8 py-2 group hover:bg-white/5 transition-colors rounded-r-2xl">
                                        <p className="text-8xl md:text-[6vw] font-light text-white leading-none mb-4 group-hover:translate-x-2 transition-transform">{m.value}</p>
                                        <p className="text-[10px] md:text-[12px] font-bold text-accent uppercase tracking-[0.4em]">{m.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : slide.type === 'insight' ? (
                        <div className="space-y-16">
                            <div className="flex items-center gap-4 text-accent">
                                <Sparkles className="w-8 h-8 md:w-12 md:h-12" />
                                <h3 className="text-lg md:text-2xl font-light uppercase tracking-[0.3em]">Neural Insight</h3>
                            </div>
                            <h1 className="text-5xl md:text-[5vw] font-light text-white leading-[1.1] tracking-tight italic border-l-[3px] md:border-l-[6px] border-accent pl-12 md:pl-20 py-4 max-w-5xl">
                                "{slide.content}"
                            </h1>
                        </div>
                    ) : slide.type === 'sentiment' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
                            <div className="space-y-12">
                                <h1 className="text-7xl md:text-[6vw] font-light text-white leading-[0.9] tracking-tightest uppercase">
                                    Audience<br />Impact<br /><span className="text-accent underline decoration-white/10 underline-offset-8">Resonance</span>
                                </h1>
                                <p className="text-xl md:text-2xl font-light text-white/50 tracking-tight leading-relaxed italic">
                                    "{slide.content}"
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-8 md:gap-12">
                                {slide.metrics?.map((m, idx) => (
                                    <div key={idx} className="border-l-2 border-accent pl-8 py-2 group hover:bg-white/5 transition-colors rounded-r-2xl">
                                        <p className="text-5xl md:text-[3vw] font-light text-white leading-none mb-4">{m.value}</p>
                                        <p className="text-[10px] md:text-[12px] font-bold text-accent uppercase tracking-[0.4em]">{m.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-16">
                            <h1 className="text-[10vw] md:text-[7vw] font-light text-white leading-[0.85] tracking-tightest uppercase">
                                Execution<br /><span className="text-accent">Directive</span>
                            </h1>
                            <p className="text-xl md:text-4xl font-light text-white/60 tracking-tight max-w-4xl mx-auto leading-relaxed italic">
                                "{slide.content}"
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer / Controls */}
            <div className="p-8 md:p-12 flex justify-between items-center relative z-10 border-t border-white/5">
                <div className="hidden md:block">
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.5em]">Villains at Large — Strategic Intelligence Agency</p>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] hover:text-accent transition-colors group"
                    >
                        <Printer className="w-3.5 h-3.5" />
                        Print Deck
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={prevSlide}
                            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-[#141414] transition-all text-white"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:bg-accent transition-all text-[#141414] shadow-2xl shadow-accent/20"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                <div
                    className="h-full bg-accent transition-all duration-700 ease-out shadow-[0_0_20px_rgba(251,158,123,0.5)]"
                    style={{ width: `${((currentSlide + 1) / summary.slides.length) * 100}%` }}
                />
            </div>

            <style jsx global>{`
                @media print {
                    .fixed { position: relative !important; }
                    .inset-0 { height: auto !important; }
                    .z-[100] { z-index: auto !important; }
                    button { display: none !important; }
                    .p-8, .p-12 { padding: 40px !important; }
                    .animate-in { animation: none !important; }
                    .bg-[#141414] { background: white !important; color: #141414 !important; }
                    .text-white { color: #141414 !important; }
                    .text-white\/40, .text-white\/50, .text-white\/60, .text-white\/20 { color: #6B6B6B !important; }
                    .text-accent { color: #BB9E7B !important; }
                    .border-white\/5, .border-white\/10 { border-color: #E7DED1 !important; }
                    .blur-\[120px\] { display: none !important; }
                    
                    /* Force one slide per page */
                    .fixed.inset-0 { page-break-after: always; display: flex !important; min-height: 100vh; }
                }
            `}</style>
        </div>
    );
}
