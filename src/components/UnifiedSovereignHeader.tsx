'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { supabaseClient } from '@/lib/supabase-client';
import { HOMEPAGE_PRIMARY_CTA_COMPACT } from '@/components/marketing/ctaStyles';

type HeaderCta = {
    href: string;
    label: string;
};

function isActive(pathname: string, href: string): boolean {
    if (href === '/vault') return pathname === '/vault';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname.startsWith(href);
}

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
            setIsScrolled(window.scrollY > 18);
        };

        syncScroll();
        window.addEventListener('scroll', syncScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', syncScroll);
        };
    }, []);

    const navItems = isAuthenticated
        ? [
            { key: 'vault', label: 'Vault', href: '/vault' },
            { key: 'about', label: 'About', href: '/about' },
            { key: 'help', label: 'Help Center', href: '/docs/user-guide' },
        ]
        : [
            { key: 'how', label: 'How It Works', href: '/#how' },
            { key: 'pricing', label: 'Pricing', href: '/pricing' },
            { key: 'about', label: 'About', href: '/about' },
            { key: 'help', label: 'Help Center', href: '/docs/user-guide' },
        ] as const;

    return (
        <header className={`fixed inset-x-0 z-50 pointer-events-none px-3 transition-all duration-300 sm:px-4 md:px-8 ${isScrolled ? 'top-2 sm:top-3 md:top-4' : 'top-3 sm:top-4 md:top-8'}`}>
            <div className="mx-auto max-w-7xl">
                <div
                    className={`
                        pointer-events-auto
                        flex items-center justify-between
                        px-4 sm:px-6 md:px-8
                        ${isScrolled ? 'py-2.5 sm:py-3 md:py-3.5' : 'py-3 sm:py-3.5 md:py-4'}
                        rounded-full
                        border
                        min-h-[56px] sm:min-h-[60px]
                        transition-all duration-300
                        ${forceDark
                            ? `${isScrolled ? 'bg-[#1A1A1A]/82 shadow-[0_14px_44px_rgba(0,0,0,0.22)] border-[#D4A574]/22' : 'bg-[#1A1A1A]/92 border-[#D4A574]/12'} backdrop-blur-2xl`
                            : `${isScrolled ? 'bg-white/78 shadow-[0_14px_42px_rgba(20,20,20,0.08)] border-[#D4A574]/18' : 'bg-white/88 border-[#D4A574]/10'} backdrop-blur-2xl`
                        }
                    `}
                >
                    {/* ── Left: Logo ── */}
                    <div className="flex items-center flex-1">
                        <Logo href="/" sublabel="Advertising Intelligence" forceDark={forceDark} />
                    </div>

                    {/* ── Center: Desktop Pillars ── */}
                    <nav className="hidden md:flex flex-1 justify-center items-center gap-4">
                        {isAuthenticated === null ? (
                            <div className="flex items-center gap-4 opacity-50" aria-hidden="true">
                                {[0, 1, 2].map((index) => (
                                    <div
                                        key={index}
                                        className={`
                                            h-8 rounded-none border border-transparent
                                            ${forceDark ? 'bg-white/10' : 'bg-black/5'}
                                        `}
                                        style={{ width: index === 1 ? 110 : 86 }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                {navItems.map((p) => {
                                    const active = isActive(pathname, p.href);
                                    return (
                                        <Link
                                            key={p.key}
                                            href={p.href}
                                            className={`
                                                inline-flex min-w-[118px] items-center justify-center px-4 py-2 text-center whitespace-nowrap rounded-full border border-transparent
                                                text-[10px] font-semibold uppercase tracking-[0.18em]
                                                transition-all duration-300
                                                ${active
                                                    ? forceDark
                                                        ? 'text-white border-white/50 bg-white/10'
                                                        : 'text-[#141414] border-black/15 bg-black/[0.035]'
                                                    : forceDark
                                                        ? 'text-white/58 hover:text-[#F3E5CF] hover:border-[#D4A574]/34 hover:bg-[#D4A574]/12'
                                                        : 'text-[#79736A] hover:text-[#8A6840] hover:border-[#D4A574]/28 hover:bg-[#F6EFE3]'
                                                }
                                            `}
                                        >
                                            {p.label}
                                        </Link>
                                    );
                                })}
                            </>
                        )}
                    </nav>

                    {/* ── Right: Utility Bar ── */}
                    <div className="flex items-center justify-end flex-1 gap-4">
                        <div className="hidden md:block">
                            {primaryCta ? (
                                <div className="flex items-center justify-end gap-3">
                                    <Link
                                        href={primaryCta.href}
                                        className={`${HOMEPAGE_PRIMARY_CTA_COMPACT} whitespace-nowrap ${forceDark ? 'border-white/28 bg-white text-[#141414] hover:bg-[#F6F2EA]' : ''}`}
                                    >
                                        {primaryCta.label}
                                    </Link>
                                </div>
                            ) : isAuthenticated === null ? (
                                <div
                                    className={`
                                        h-10 w-[132px] rounded-none border
                                        ${forceDark ? 'border-white/20 bg-white/10' : 'border-black/10 bg-black/5'}
                                    `}
                                    aria-hidden="true"
                                />
                            ) : isAuthenticated ? (
                                <div className="flex items-center justify-end gap-3">
                                    <Link
                                        href="/ingest"
                                        className={`${HOMEPAGE_PRIMARY_CTA_COMPACT} whitespace-nowrap ${forceDark ? 'border-white/28 bg-white text-[#141414] hover:bg-[#F6F2EA]' : ''}`}
                                    >
                                        Start Decompiling Free
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className={`
                                        inline-flex items-center justify-center
                                        rounded-none border px-6 py-2.5
                                        text-[10px] font-bold tracking-[0.2em] uppercase
                                        transition-all duration-300
                                        ${forceDark
                                            ? 'bg-transparent text-white border-neutral-700 hover:border-white hover:bg-white/10'
                                            : 'bg-transparent text-black border-neutral-300 hover:border-black hover:bg-black/5'
                                        }
                                    `}
                                >
                                    [ ACCESS OS ]
                                </Link>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-1.5 text-[#6B6B6B] hover:text-[#141414] transition-all"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                {mobileOpen && (
                    <div className="pointer-events-auto md:hidden mt-2 rounded-2xl bg-[#FBFBF6] border border-[#D8CCB5] shadow-[0_18px_40px_rgba(20,20,20,0.12)] p-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {navItems.map((p) => {
                            const active = isActive(pathname, p.href);
                            return (
                                <Link
                                    key={p.key}
                                    href={p.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`
                                        block rounded-xl px-4 py-3 border border-transparent text-center
                                        text-[10px] font-bold uppercase tracking-[0.16em]
                                        transition-all
                                        ${active
                                            ? 'text-[#141414] border-[#D0B896] bg-[#F6EFE3]'
                                            : 'text-[#6B6B6B] hover:text-[#8A6840] hover:border-[#D4A574]/28 hover:bg-[#F8F3EA]'
                                        }
                                    `}
                                >
                                    {p.label}
                                </Link>
                            );
                        })}

                        {/* Mobile Direct Access */}
                        <div className="pt-3 mt-2 border-t border-[#E2D8C8]">
                            {primaryCta ? (
                                <Link
                                    href={primaryCta.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-center w-full rounded-full px-4 py-3 border border-[#141414] bg-[#141414] text-[#FBF7EF] text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-black transition-colors"
                                >
                                    {primaryCta.label}
                                </Link>
                            ) : isAuthenticated ? (
                                <Link
                                    href="/ingest"
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-center w-full rounded-full px-4 py-3 border border-[#141414] bg-[#141414] text-[#FBF7EF] text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-black transition-colors"
                                >
                                    Start Decompiling Free
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-center w-full rounded-full px-4 py-3 border border-[#D8CCB5] text-[#141414] text-[11px] font-bold uppercase tracking-[0.18em] hover:border-[#141414] transition-colors"
                                >
                                    ACCESS OS
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
