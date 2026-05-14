'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { track } from '@vercel/analytics';
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
            { key: 'insights', label: 'Insights', href: '/intelligence' },
            { key: 'help', label: 'Help', href: '/docs/user-guide' },
        ]
        : [
            { key: 'product', label: 'Product', href: '/product' },
            { key: 'sample', label: 'Sample Dossier', href: '/share/sample-dossier' },
            { key: 'pricing', label: 'Pricing', href: '/pricing' },
            { key: 'method', label: 'Method', href: '/trust-method' },
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
                                ? 'py-2.5 lg:py-3 px-5 lg:px-8 bg-[#050505]/60 backdrop-blur-xl rounded-full border border-[#8B6A3D]/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                                : 'py-2.5 lg:py-3 px-5 lg:px-8 bg-white/60 backdrop-blur-xl rounded-full border border-[#8B6A3D]/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
                            : forceDark
                                ? 'py-2.5 lg:py-3 px-5 backdrop-blur-xl rounded-full border border-[#8B6A3D]/10 bg-[#050505]/30'
                                : 'py-2.5 lg:py-3 px-5 backdrop-blur-xl rounded-full border border-[#8B6A3D]/10 bg-white/30'
                        }
                    `}
                >

                    {/* ── Left: Logo ── */}
                    <div className="flex flex-1 items-center py-1">
                        <Logo href="/" sublabel="" forceDark={forceDark} className="origin-left scale-90 lg:scale-100 transition-transform" />
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
	                                                relative px-2 py-2 text-[10px] font-bold uppercase tracking-[0.24em]
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
                        <div className="hidden lg:flex items-center gap-3">
	                            {isAuthenticated ? (
	                                <Link
	                                    href="/vault"
	                                    className={`group relative overflow-hidden rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors duration-500 ${
	                                        forceDark
	                                            ? 'border border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
	                                            : 'border border-black/10 bg-white/50 text-black/70 hover:bg-white hover:text-black'
	                                    }`}
                                >
                                    Vault
                                </Link>
                            ) : null}
	                            {primaryCta ? (
	                                <Link
	                                    href={primaryCta.href}
                                        onClick={() => track('cta_primary', { label: primaryCta.label, href: primaryCta.href, location: 'header' })}
	                                    className={`group relative overflow-hidden rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors duration-500 ${
	                                        forceDark 
	                                        ? 'border border-white/10 bg-white text-black hover:bg-[#FBF7EF]'
	                                        : 'border border-black/10 bg-[#141414] text-[#FBF7EF] hover:bg-black'
	                                    }`}
                                >
                                    {primaryCta.label}
                                </Link>
                            ) : isAuthenticated === null ? (
                                <div className={`h-[40px] w-[140px] border ${forceDark ? 'border-[#8B6A3D]/10' : 'border-[#8B6A3D]/10'}`} />
	                            ) : isAuthenticated ? (
	                                <Link
	                                    href="/ingest"
                                        onClick={() => track('cta_decompile_ad', { location: 'header' })}
	                                    className={`group relative overflow-hidden rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors duration-500 ${
	                                        forceDark 
	                                        ? 'border border-white/10 bg-white text-black hover:bg-[#FBF7EF]'
	                                        : 'border border-black/10 bg-[#141414] text-[#FBF7EF] hover:bg-black'
	                                    }`}
                                >
                                    Decompile an Ad
                                </Link>
	                            ) : (
	                                <Link
	                                    href="/login"
                                        onClick={() => track('cta_login', { location: 'header' })}
	                                    className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${
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
                    <div className={`pointer-events-auto lg:hidden fixed inset-0 z-40 flex flex-col justify-center px-8 ${forceDark ? 'bg-[#050505] text-white' : 'bg-[#FBFBF6] text-black'} animate-in fade-in zoom-in-95 duration-500`}>
                        <div className="absolute top-8 left-8">
                            <Logo href="/" sublabel="" forceDark={forceDark} onClick={() => setMobileOpen(false)} />
                        </div>
                        <button onClick={() => setMobileOpen(false)} className="absolute top-8 right-8 p-4">
                            <X size={32} strokeWidth={1} />
                        </button>
                        
                        <div className="flex flex-col gap-8 text-center">
	                            {navItems.map((p) => (
	                                <Link
	                                    key={p.key}
	                                    href={p.href}
	                                    onClick={() => setMobileOpen(false)}
	                                    className={`text-[20px] font-semibold uppercase tracking-[0.18em] transition-colors ${
	                                        forceDark ? 'hover:text-[#D4A574]' : 'hover:text-[#8B6A3D]'
	                                    }`}
	                                >
	                                    {p.label}
	                                </Link>
                            ))}

                            <div className="mt-12 flex flex-col items-center gap-6">
	                                {isAuthenticated ? (
	                                    <Link
	                                        href="/vault"
	                                        onClick={() => setMobileOpen(false)}
	                                        className={`rounded-full px-10 py-5 text-[12px] font-bold uppercase tracking-[0.22em] transition-colors ${
	                                            forceDark
	                                                ? 'border border-white/10 text-white hover:bg-white/10'
	                                                : 'border border-black/20 text-black hover:bg-black/5'
	                                        }`}
                                    >
                                        Vault
                                    </Link>
                                ) : null}
	                                {primaryCta ? (
	                                    <Link
	                                        href={primaryCta.href}
	                                        onClick={() => setMobileOpen(false)}
	                                        className={`rounded-full px-10 py-5 text-[12px] font-bold uppercase tracking-[0.22em] ${
	                                            forceDark ? 'bg-white text-black' : 'bg-black text-white'
	                                        }`}
	                                    >
	                                        {primaryCta.label}
                                    </Link>
	                                ) : isAuthenticated ? (
	                                    <Link
	                                        href="/ingest"
	                                        onClick={() => setMobileOpen(false)}
	                                        className={`rounded-full px-10 py-5 text-[12px] font-bold uppercase tracking-[0.22em] ${
	                                            forceDark ? 'bg-white text-black' : 'bg-black text-white'
	                                        }`}
	                                    >
	                                        Decompile an Ad
                                    </Link>
	                                ) : (
	                                    <Link
	                                        href="/login"
	                                        onClick={() => setMobileOpen(false)}
	                                        className="text-[12px] font-bold uppercase tracking-[0.22em] underline underline-offset-8"
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
