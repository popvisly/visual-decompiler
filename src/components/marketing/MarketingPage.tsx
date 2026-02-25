'use client';

import MarketingNav from './MarketingNav';
import HeroSection from './HeroSection';
import DecompositionSection from './DecompositionSection';
import FeaturesSection from './FeaturesSection';
import PricingTeaser from './PricingTeaser';
import Link from 'next/link';

export default function MarketingPage() {
    return (
        <div className="marketing-body">
            <MarketingNav />
            <main>
                <HeroSection />
                <DecompositionSection />
                <FeaturesSection />
                <PricingTeaser />
            </main>

            {/* Footer */}
            <footer className="py-16 px-6" style={{ background: '#1a1a1a' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-[#c8f000] flex items-center justify-center text-[#1a1a1a] font-black text-sm">
                                    V
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-white tracking-tight">VisualDecompiler.com</span>
                                </div>
                            </div>
                            <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed max-w-xs">
                                AI-powered advertising intelligence. See the hidden psychology,
                                trigger mechanics, and persuasion strategies behind any ad.
                            </p>
                        </div>

                        {/* Product */}
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.3)] mb-4">Product</p>
                            <ul className="space-y-2.5">
                                <li><a href="#how-it-works" className="text-[13px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">How It Works</a></li>
                                <li><a href="#features" className="text-[13px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">Features</a></li>
                                <li><a href="#pricing" className="text-[13px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">Pricing</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.3)] mb-4">Company</p>
                            <ul className="space-y-2.5">
                                <li><a href="#" className="text-[13px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="text-[13px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="text-[13px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">Terms</a></li>
                            </ul>
                        </div>

                        {/* Get Started */}
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.3)] mb-4">Get Started</p>
                            <Link
                                href="/app"
                                className="inline-block bg-accent-cta px-6 py-2.5 rounded-full text-[13px] font-bold"
                            >
                                Start Now
                            </Link>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="pt-8 border-t border-[rgba(255,255,255,0.06)]">
                        <p className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em]">
                            VisualDecompiler.com © 2026. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
