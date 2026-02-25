'use client';

import { StrategicPrototype, NarrativeDraft } from '@/lib/prototype_service';
import { Play, Camera, Type, Sparkles, Wand2 } from 'lucide-react';

interface StrategicPrototypeViewProps {
    prototype: StrategicPrototype;
    onClose: () => void;
}

export default function StrategicPrototypeView({ prototype, onClose }: StrategicPrototypeViewProps) {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E7DED1] pb-8">
                <div>
                    <div className="flex items-center gap-3 text-accent mb-2">
                        <Wand2 className="w-5 h-5" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.4em]">Strategic Prototype</h3>
                    </div>
                    <h2 className="text-4xl font-light text-[#141414] tracking-tightest uppercase">
                        {prototype.title}
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest hover:text-[#141414]"
                >
                    Close Prototype
                </button>
            </div>

            {/* Strategic Rationale */}
            <div className="p-8 md:p-12 bg-[#FBF7EF] rounded-[2.5rem] md:rounded-[3.5rem] border border-[#E7DED1] shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#BB9E7B] mb-6">Strategic Rationale</p>
                <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-[#1A1A18]">
                    "{prototype.strategicRationale}"
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* 1. Narrative Architecture (The Script) */}
                <div className="lg:col-span-12 space-y-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Type className="w-5 h-5 text-accent" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Narrative Architecture</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {prototype.narrativeArchitecture.map((scene, i) => (
                            <div key={i} className="bg-[#FBF7EF] p-8 rounded-[2rem] border border-[#E7DED1] space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold bg-white px-3 py-1 rounded-full border border-[#E7DED1]">
                                        Phase 0{i + 1}
                                    </span>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#141414]">{scene.scene}</h4>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-sm font-light text-[#141414] leading-relaxed">
                                        <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block mb-1">Visual Action</span>
                                        {scene.action}
                                    </p>
                                    {scene.dialogue && (
                                        <p className="text-sm font-bold text-accent italic">
                                            <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block mb-1 not-italic">Dialogue / VO</span>
                                            "{scene.dialogue}"
                                        </p>
                                    )}
                                </div>
                                <div className="pt-4 border-t border-[#E7DED1]/50">
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">
                                        {scene.visualDirective}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Visual / Director's Prompt */}
                <div className="lg:col-span-12">
                    <div className="bg-white p-12 rounded-[3.5rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)] group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="space-y-6 flex-1">
                                <div className="flex items-center gap-3 text-accent mb-4">
                                    <Camera className="w-5 h-5" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Visual Production Prompt</h3>
                                </div>
                                <code className="block p-8 bg-[#FBF7EF] rounded-3xl border border-[#E7DED1] text-xs text-[#141414] leading-relaxed font-mono">
                                    {prototype.visualPrompt}
                                </code>
                            </div>
                            <div className="shrink-0">
                                <button className="w-16 h-16 bg-[#141414] rounded-full flex items-center justify-center text-accent hover:scale-110 transition-transform shadow-xl shadow-black/20">
                                    <Sparkles className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
