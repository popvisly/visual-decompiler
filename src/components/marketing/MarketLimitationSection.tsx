'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Minus, Zap, Database, Shield, LayoutGrid } from 'lucide-react';
import MarketingSectionHeading from '@/components/MarketingSectionHeading';

const LIMITATIONS = [
    { title: 'One-off answer', desc: 'Insight exists for 30 seconds, then vanishes into a chat history graveyard.' },
    { title: 'No persistent vault', desc: 'No way to compare today’s ad against a competitor from six months ago.' },
    { title: 'No fixed audit trail', desc: 'Decision rationale is buried in a loose thread, making it impossible to defend or rerun.' },
    { title: 'Disconnected results', desc: 'Every analysis starts from zero. There is no compounding intelligence.' },
];

const ADVANTAGES = [
    { title: 'Structured Dossier', desc: 'Every asset is deconstructed into a fixed, clinical data structure.', icon: Shield },
    { title: 'Compounding Archive', desc: 'The Vault acts as your agency’s long-term memory for every brand and category.', icon: Database },
    { title: 'Decision Log', desc: 'Rationale is anchored to evidence, creating a defensible audit trail for clients.', icon: LayoutGrid },
    { title: 'Reusable Workflow', desc: 'Run the exact same forensic audit across teams, campaigns, and years.', icon: Zap },
];

export default function MarketLimitationSection() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-[#FBFBF6] py-32 lg:py-48">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                
                {/* Section Header */}
                <div className="mb-24 text-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]/60 mb-6">The Strategic Gap</p>
                    <h2 className="text-[clamp(40px,6vw,80px)] font-light leading-[0.9] tracking-tightest uppercase text-[#141414]">
                        Chat is a <span className="text-[#D4A574] italic">vacuum.</span><br />
                        VD is an <span className="font-bold">operating system.</span>
                    </h2>
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
                    
                    {/* The Competitor (Generic AI Chat) */}
                    <motion.div 
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group relative flex flex-col justify-between rounded-[3rem] border border-black/5 bg-white p-12 transition-all hover:bg-[#F9F9F9]"
                    >
                        <div>
                            <div className="mb-10 flex items-center justify-between">
                                <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#141414]/30">The Market Status Quo</p>
                                <span className="h-2 w-2 rounded-full bg-black/10" />
                            </div>
                            <h3 className="mb-12 text-4xl font-light tracking-tight text-[#141414]">Generic AI Chat</h3>
                            
                            <div className="space-y-10">
                                {LIMITATIONS.map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/20">
                                            <Minus className="h-3 w-3" />
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-bold uppercase tracking-widest text-[#141414]/70">{item.title}</p>
                                            <p className="mt-2 text-[14px] leading-relaxed text-[#6B6B6B]">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-16 border-t border-black/5 pt-8">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414]/30 italic">Result: Fragmented Knowledge</p>
                        </div>
                    </motion.div>

                    {/* The Advantage (Visual Decompiler) */}
                    <motion.div 
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group relative flex flex-col justify-between rounded-[3rem] bg-[#141414] p-12 text-white shadow-3xl overflow-hidden"
                    >
                        {/* Background Detail */}
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Shield className="h-64 w-64 text-[#D4A574]" />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-10 flex items-center justify-between">
                                <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Forensic Advantage</p>
                                <span className="h-2 w-2 rounded-full bg-[#D4A574]" />
                            </div>
                            <h3 className="mb-12 text-4xl font-light tracking-tight text-white">Visual Decompiler</h3>
                            
                            <div className="space-y-10">
                                {ADVANTAGES.map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={i} className="flex gap-6">
                                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#D4A574]/10 text-[#D4A574] transition-colors group-hover:bg-[#D4A574] group-hover:text-black">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold uppercase tracking-widest text-[#D4A574]">{item.title}</p>
                                                <p className="mt-2 text-[14px] leading-relaxed text-white/60">{item.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="relative z-10 mt-16 border-t border-white/10 pt-8 flex justify-between items-center">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4A574]/60 italic">Result: Compounding Intelligence</p>
                            <CheckCircle2 className="h-5 w-5 text-[#D4A574]" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
