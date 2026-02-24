'use client';

import { useState } from 'react';
import { Copy, Check, Zap, Clapperboard, Camera, Wand2 } from 'lucide-react';
import { AdDigest } from '@/types/digest';
import ResultsCard from './ResultsCard';

export default function PromptView({ digest }: { digest: AdDigest }) {
    const [copied, setCopied] = useState(false);
    const prompt = digest.strategy?.reconstruction_prompt;

    const handleCopy = () => {
        if (!prompt) return;
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!prompt) {
        return (
            <div className="bg-white p-12 rounded-[2.5rem] border border-[#E7DED1] text-center space-y-4">
                <div className="w-12 h-12 bg-[#FBF7EF] rounded-2xl flex items-center justify-center mx-auto text-[#6B6B6B]">
                    <Wand2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#141414]">No prompt available</h3>
                <p className="text-xs text-[#6B6B6B] max-w-xs mx-auto leading-relaxed">
                    This ad was analyzed before the high-fidelity reconstruction engine was active.
                    Re-analyze to generate a creative prompt.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Main Prompt Stage */}
            <div className="bg-[#141414] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32 blur-[80px] pointer-events-none" />

                <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-accent/60">
                            <Zap className="w-4 h-4" />
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Semantic Reconstruction</h3>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3 h-3 text-accent" />
                                    <span className="text-accent">Copied</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3" />
                                    Copy Prompt
                                </>
                            )}
                        </button>
                    </div>

                    <div className="bg-white/[0.03] rounded-3xl p-6 md:p-8 border border-white/5 relative group/prompt">
                        <p className="text-lg md:text-xl font-light text-[#FBF7EF] leading-relaxed italic pr-4">
                            "{prompt}"
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-white/40 font-bold uppercase tracking-widest pt-4 border-t border-white/10">
                        <span className="flex items-center gap-1.5"><Camera className="w-3 h-3" /> Photorealistic</span>
                        <span className="flex items-center gap-1.5"><Clapperboard className="w-3 h-3" /> 8K Architecture</span>
                        <span className="flex items-center gap-1.5 text-accent/60">Optimized for DALL-E 3 / Midjourney</span>
                    </div>
                </div>
            </div>

            {/* Creative Directives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResultsCard title="Creative Directives" variant="strategy">
                    <div className="space-y-6">
                        <div>
                            <p className="text-[#141414]/70 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Lighting & Atmosphere</p>
                            <p className="text-xs text-[#141414] leading-relaxed">
                                {digest.extraction?.composition_notes || "Analyze the visual extraction for specific lighting cues."}
                            </p>
                        </div>
                        <div>
                            <p className="text-[#141414]/70 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Semantic Subtext</p>
                            <p className="text-xs text-[#6B6B6B] leading-relaxed italic">
                                "{digest.strategy?.semiotic_subtext}"
                            </p>
                        </div>
                    </div>
                </ResultsCard>

                <ResultsCard title="Reconstruction Logic" variant="bullets">
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="w-5 h-5 rounded-lg bg-[#FBF7EF] border border-[#E7DED1] flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                            <p className="text-xs text-[#6B6B6B] leading-relaxed">
                                Paste the prompt into <span className="text-[#141414] font-bold">Midjourney v6</span> or <span className="text-[#141414] font-bold">DALL-E 3</span>.
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-5 h-5 rounded-lg bg-[#FBF7EF] border border-[#E7DED1] flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                            <p className="text-xs text-[#6B6B6B] leading-relaxed">
                                Adjust the <span className="text-[#141414] font-bold">Color Hierarchy</span> by adding specific HEX codes: {digest.extraction?.palette_hex?.slice(0, 3).map(h => `#${h}`).join(', ')}.
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-5 h-5 rounded-lg bg-[#FBF7EF] border border-[#E7DED1] flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
                            <p className="text-xs text-[#6B6B6B] leading-relaxed">
                                Use the <span className="text-[#141414] font-bold">Semantic Subtext</span> as a negative prompt if AI hallucinations occur.
                            </p>
                        </li>
                    </ul>
                </ResultsCard>
            </div>
        </div>
    );
}
