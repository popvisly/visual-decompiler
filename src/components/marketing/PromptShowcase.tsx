'use client';

import { motion } from 'framer-motion';
import { Zap, Copy, Sparkles, Wand2 } from 'lucide-react';
import { useState } from 'react';

export default function PromptShowcase() {
    const [copied, setCopied] = useState(false);

    const prompt = `A high-end commercial advertisement for a futuristic ultra-slim flat screen TV with a sleek metallic frame and minimalist design, the screen seamlessly expands beyond the edges of the page, creating an immersive visual experience. On the screen is a vibrant, hyper-realistic macro-close-up of a delicate flower, showcasing intricate petal details and textures in sharp focus, rendered in stunning 8k resolution. The luxury tech aesthetic is evident in the TV's slim profile and the crisp, vivid colors of the flower, which appears to leap off the screen, evoking a sense of depth and dimensionality, with the background of the screen fading into a subtle gradient that accentuates the flower's beauty.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative bg-[#F6F1E7] py-24 md:py-32 overflow-hidden border-t border-[#E7DED1]">
            {/* Background Mesh (Ultra-Subtle) */}
            <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#1A1A18_1px,transparent_1px),linear-gradient(90deg,#1A1A18_1px,transparent_1px)] [background-size:64px_64px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Visual Column - Refined & Shrunken */}
                    <div className="w-full lg:w-5/12 flex justify-center lg:justify-start">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative group p-3 bg-white rounded-[32px] shadow-[0_30px_60px_rgba(20,20,20,0.06)] max-w-[320px] md:max-w-[380px] border border-[#E7DED1]"
                        >
                            <div className="rounded-[24px] overflow-hidden bg-black relative aspect-[4/5]">
                                <img
                                    src="/images/examples/Flatscreen_Ad.jpg"
                                    alt="Luxury Tech Synthesis Result"
                                    className="w-full h-full object-cover opacity-95 transition-transform duration-[6s] group-hover:scale-105"
                                />

                                {/* Moving Scan Line (Tan & Subtle) */}
                                <motion.div
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 w-full h-[1px] bg-[#BB9E7B]/30 shadow-[0_0_10px_#BB9E7B] z-20"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-full lg:w-7/12 space-y-10"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Wand2 className="w-5 h-5 text-[#BB9E7B]" />
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#BB9E7B]">Prompt Synthesis</h2>
                            </div>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1A1A18] tracking-tightest uppercase leading-[1]">
                                From Analysis<br />
                                &nbsp;to <span className="text-[#BB9E7B]">Image.</span>
                            </h3>
                            <p className="text-lg md:text-xl text-[#6B6B6B] leading-[1.3] max-w-xl font-medium tracking-tight">
                                We decompile the invisible persuasion architecture of any ad into a high-fidelity DNA prompt. Use it as a foundation for your own AI production.
                            </p>
                        </div>

                        {/* The Prompt Component */}
                        <div className="p-8 md:p-10 rounded-[3rem] bg-[#FBF7EF] border border-[#E7DED1] shadow-sm relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#BB9E7B]/5 blur-[60px] rounded-full" />

                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#BB9E7B] animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#BB9E7B]">Verified DNA Prompt</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6F1E7] border border-[#E7DED1] hover:bg-white transition-all group/btn"
                                >
                                    <Copy className={`w-3 h-3 transition-colors ${copied ? 'text-[#BB9E7B]' : 'text-[#6B6B6B]/40 group-hover/btn:text-[#BB9E7B]'}`} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B]/60 group-hover/btn:text-[#1A1A18]">
                                        {copied ? 'Copied' : 'Copy Prompt'}
                                    </span>
                                </button>
                            </div>

                            <blockquote className="text-sm md:text-base leading-relaxed text-[#1A1A18]/80 line-clamp-6 group-hover:line-clamp-none transition-all duration-500 font-medium">
                                "{prompt}"
                            </blockquote>

                            <div className="mt-8 pt-8 border-t border-[#E7DED1] flex flex-wrap gap-x-12 gap-y-4">
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#BB9E7B] mb-1.5">Visual Anchor</p>
                                    <p className="text-[13px] font-medium text-[#6B6B6B] font-mono tracking-tight">Edge-to-Edge Display</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#BB9E7B] mb-1.5">Lighting</p>
                                    <p className="text-[13px] font-medium text-[#6B6B6B] font-mono tracking-tight">Vivid Studio Brightness</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#BB9E7B] mb-1.5">Aesthetic</p>
                                    <p className="text-[13px] font-medium text-[#6B6B6B] font-mono tracking-tight">Immersive Luxury Tech</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
