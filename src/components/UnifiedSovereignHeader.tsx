'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { supabaseClient } from '@/lib/supabase-client';

type HeaderCta = {
    href: string;
    label: string;
};

export default function UnifiedSovereignHeader({
    forceDark = false,
    primaryCta,
}: {
    forceDark?: boolean;
    primaryCta?: HeaderCta;
} = {}) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await supabaseClient.auth.getSession();
                setIsAuthenticated(!!data.session);
            } catch {
                setIsAuthenticated(false);
            }
        };
        checkSession();

        const { data: authListener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const syncScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        syncScroll();
        window.addEventListener('scroll', syncScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', syncScroll);
        };
    }, []);

    const navItems = isAuthenticated
        ? [
            { key: 'product', label: 'Product', href: '/product' },
            { key: 'pricing', label: 'Pricing', href: '/pricing' },
            { key: 'vault', label: 'Vault', href: '/vault' },
            { key: 'about', label: 'About', href: '/about' },
            { key: 'help', label: 'Help Center', href: '/docs/user-guide' },
        ]
        : [
            { key: 'product', label: 'Product', href: '/product' },
            { key: 'pricing', label: 'Pricing', href: '/pricing' },
            { key: 'method', label: 'Method', href: '/trust-method' },
            { key: 'reading', label: 'Sample Read', href: '/share/sample-dossier' },
            { key: 'about', label: 'About', href: '/about' },
            { key: 'help', label: 'Help Center', href: '/docs/user-guide' },
        ];

    return (
        <header className={`fixed inset-x-0 z-50 pointer-events-none transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'top-0' : 'top-6'}`}>
            <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
                <div
                    className={`
                        pointer-events-auto
                        flex items-center justify-between
                        transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                        ${isScrolled
                            ? forceDark
                                ? 'py-2.5 lg:py-3 px-5 lg:px-8 bg-[#050505]/60 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                                : 'py-2.5 lg:py-3 px-5 lg:px-8 bg-white/60 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
                            : forceDark
                                ? 'py-2.5 lg:py-3 px-5 backdrop-blur-xl rounded-full border border-white/10 bg-[#050505]/30'
                                : 'py-2.5 lg:py-3 px-5 backdrop-blur-xl rounded-full border border-white/10 bg-white/30'
                        }
                    `}
                >

                    {/* ── Left: Logo ── */}
                    <div className="flex flex-1 items-center py-1">
                        <Logo href="/" sublabel="BUILT FOR CREATIVES" forceDark={forceDark} className="origin-left scale-90 lg:scale-100 transition-transform" />
                    </div>

                    {/* ── Center: Desktop Pillars ── */}
                    <nav className="hidden lg:flex flex-[2] justify-center items-center gap-10">
                        {isAuthenticated === null ? (
                            <div className="flex items-center gap-10 opacity-30" aria-hidden="true">
                                {[0, 1, 2].map((i) => <div key={i} className={`h-1 w-8 ${forceDark ? 'bg-white/20' : 'bg-black/20'}`} />)}
                            </div>
                        ) : (
                            <>
                                {navItems.map((p) => {
                                    const active = p.href === '/' ? pathname === '/' : pathname.startsWith(p.href);
                                    return (
                                        <Link
                                            key={p.key}
                                            href={p.href}
                                            className={`
                                                relative px-2 py-2 text-[10px] font-black uppercase tracking-[0.25em]
                                                transition-colors duration-500
                                                ${active
                                                    ? forceDark ? 'text-white' : 'text-[#141414]'
                                                    : forceDark ? 'text-white/40 hover:text-white' : 'text-[#8A8A84] hover:text-[#141414]'
                                                }
                                            `}
                                        >
                                            {p.label}
                                            {active && (
                                                <span className={`absolute -bottom-1 left-1/2 h-px w-4 -translate-x-1/2 ${forceDark ? 'bg-white' : 'bg-[#141414]'}`} />
                                            )}
                                        </Link>
                                    );
                                })}
                            </>
                        )}
                    </nav>

                    {/* ── Right: Utility Bar ── */}
                    <div className="flex flex-1 items-center justify-end gap-4">
                        <div className="hidden lg:flex items-center">
                            {primaryCta ? (
                                <Link
                                    href={primaryCta.href}
                                    className={`group relative overflow-hidden px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.28em] transition-colors duration-500 ${
                                        forceDark 
                                        ? 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10' 
                                        : 'bg-black/5 text-black hover:bg-black hover:text-white border border-white/10'
                                    }`}
                                >
                                    {primaryCta.label}
                                </Link>
                            ) : isAuthenticated === null ? (
                                <div className={`h-[40px] w-[140px] border ${forceDark ? 'border-white/10' : 'border-white/10'}`} />
                            ) : isAuthenticated ? (
                                <Link
                                    href="/ingest"
                                    className={`group relative overflow-hidden px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.28em] transition-colors duration-500 ${
                                        forceDark 
                                        ? 'bg-white/5 text-white hover:bg-[#00E5FF] hover:text-black hover:border-transparent border border-white/10' 
                                        : 'bg-black/5 text-black hover:bg-black hover:text-white border border-white/10'
                                    }`}
                                >
                                    Bring In The Work
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className={`px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                                        forceDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                                    }`}
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`lg:hidden p-2 transition-colors ${forceDark ? 'text-white' : 'text-black'}`}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
                        </button>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                {mobileOpen && (
                    <div className={`pointer-events-auto lg:hidden fixed inset-0 z-40 flex flex-col justify-center px-8 ${forceDark ? 'bg-[#050505] text-white' : 'bg-[#0B0B0B] text-black'} animate-in fade-in zoom-in-95 duration-500`}>
                        <button onClick={() => setMobileOpen(false)} className="absolute top-8 right-8 p-4">
                            <X size={32} strokeWidth={1} />
                        </button>
                        
                        <div className="flex flex-col gap-8 text-center">
                            {navItems.map((p) => (
                                <Link
                                    key={p.key}
                                    href={p.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`text-[20px] font-black uppercase tracking-[0.2em] transition-colors ${
                                        forceDark ? 'hover:text-[#00E5FF]' : 'hover:text-[#FF003C]'
                                    }`}
                                >
                                    {p.label}
                                </Link>
                            ))}

                            <div className="mt-12 flex flex-col items-center gap-6">
                                {primaryCta ? (
                                    <Link
                                        href={primaryCta.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em] ${
                                            forceDark ? 'bg-white text-black' : 'bg-black text-white'
                                        }`}
                                    >
                                        {primaryCta.label}
                                    </Link>
                                ) : isAuthenticated ? (
                                    <Link
                                        href="/ingest"
                                        onClick={() => setMobileOpen(false)}
                                        className={`px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em] ${
                                            forceDark ? 'bg-[#00E5FF] text-black' : 'bg-black text-white'
                                        }`}
                                    >
                                        Bring In The Work
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="text-[12px] font-black uppercase tracking-[0.2em] underline underline-offset-8"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Extremely subtle hairline bottom border when scrolled */}
            <div className={`absolute bottom-0 inset-x-0 h-px transition-opacity duration-[1s] ${isScrolled ? 'opacity-100' : 'opacity-0'} ${forceDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]'}`} />
        </header>
    );
}
