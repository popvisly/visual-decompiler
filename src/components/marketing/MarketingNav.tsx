'use client';

import Link from 'next/link';

export default function MarketingNav() {
    return (
        <header className="fixed top-0 inset-x-0 z-50 glass-nav-light">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-white font-black text-sm">
                        D
                    </div>
                    <div>
                        <span className="text-sm font-bold text-[#1a1a1a] tracking-tight">Decompiler</span>
                        <span className="hidden sm:inline text-[9px] font-bold text-[#9a9a94] uppercase tracking-[0.15em] ml-3">
                            Advertising Intelligence
                        </span>
                    </div>
                </div>

                {/* Nav links */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#how-it-works" className="text-[13px] font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">
                        How It Works
                    </a>
                    <a href="#features" className="text-[13px] font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">
                        Features
                    </a>
                    <a href="#pricing" className="text-[13px] font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">
                        Pricing
                    </a>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/app"
                        className="text-[13px] font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors hidden sm:inline"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/app"
                        className="bg-accent-cta px-5 py-2 rounded-full text-[13px] font-bold"
                    >
                        Start Now
                    </Link>
                </div>
            </div>
        </header>
    );
}
