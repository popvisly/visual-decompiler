'use client';

import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function FooterStartNow() {
    return (
        <footer className="bg-[#F6F1E7] px-6 pb-6 pt-12 md:pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Main Manifesto Panel */}
                <div className="bg-[#9EA695] rounded-[2.5rem] md:rounded-[4rem] px-8 py-16 md:p-24 relative overflow-hidden text-white mb-6">
                    {/* The Big Type Manifesto */}
                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[10vw] md:text-[7vw] font-semibold leading-[0.85] tracking-tightest uppercase"
                        >
                            Advertising<br />
                            Intelligence <span className="font-light opacity-50">+</span><br />
                            Strategic<br />
                            <span className="italic font-serif lowercase tracking-normal">Laboratory</span>
                        </motion.h2>

                        {/* Middle Section: Logo and Description */}
                        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white flex items-center justify-center rounded-lg text-[#9EA695] font-bold">V</div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold tracking-tighter leading-none uppercase">VisualDecompiler.com</span>
                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">Strategic Intelligence</span>
                                    </div>
                                </div>
                                <p className="text-lg text-white/80 max-w-sm leading-relaxed font-medium">
                                    VisualDecompiler.com is the sovereign infrastructure for elite agencies. We bridge the gap between creative execution and forensic strategic intelligence to understand & comprehend the architecture of persuasion.
                                </p>
                            </div>

                            {/* Trust Badge & Links */}
                            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                                <div className="flex items-center gap-4 bg-black/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                    <ShieldCheck className="w-8 h-8 text-[#BB9E7B]" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white">SOC 2 Type II Certified</p>
                                        <p className="text-[10px] text-white/50 uppercase tracking-tight">Enterprise Grade Security</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Linkedin className="w-4 h-4" /></a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Instagram className="w-4 h-4" /></a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Twitter className="w-4 h-4" /></a>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Layout: Navigation + CTA */}
                        <div className="mt-24 flex flex-col lg:flex-row gap-16 border-t border-white/10 pt-16">

                            {/* Navigation Grid (Left) */}
                            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-12">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Product</h4>
                                    <ul className="space-y-4 text-sm font-medium">
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Discovery</a></li>
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Strategic Pulse</a></li>
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Laboratory</a></li>
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Company</h4>
                                    <ul className="space-y-4 text-sm font-medium">
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">About</a></li>
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Careers</a></li>
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Trust</a></li>
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Resources</h4>
                                    <ul className="space-y-4 text-sm font-medium">
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Knowledge Center</a></li>
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Documentation</a></li>
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Pricing</a></li>
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Connect</h4>
                                    <ul className="space-y-4 text-sm font-medium">
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Contact</a></li>
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Request a Demo</a></li>
                                        <li><a href="#" className="hover:text-[#BB9E7B] transition-colors">Login</a></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Start Now CTA (Right) */}
                            <div className="lg:w-[320px]">
                                <motion.a
                                    href="/app"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex flex-col bg-[#BB9E7B] text-[#F6F1E7] p-10 rounded-[2.5rem] shadow-xl group hover:bg-[#A68B6C] transition-colors border border-white/20"
                                >
                                    <span className="text-4xl font-bold uppercase tracking-tightest leading-none">Start Now</span>
                                    <div className="flex items-center gap-2 mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Launch Project</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-[0.03] blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black opacity-[0.03] blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A18]/40">
                    <p>© 2026 VISUALDECOMPILER.COM. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-[#1A1A18] transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-[#1A1A18] transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
