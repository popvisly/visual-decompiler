'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { supabaseClient } from '@/lib/supabase-client';

function isActive(pathname: string, href: string): boolean {
    if (href === '/vault') return pathname === '/vault';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname.startsWith(href);
}

export default function UnifiedSovereignHeader({ forceDark = false }: { forceDark?: boolean } = {}) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabaseClient.auth.getSession();
            setIsAuthenticated(!!data.session);
        };
        checkSession();

        const { data: authListener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const navItems = isAuthenticated
        ? [
            { key: 'vault', label: 'Vault', href: '/vault' },
            { key: 'pulse', label: 'Intelligence Pulse', href: '/compare' },
            { key: 'help', label: 'Help Center', href: '/docs/user-guide' },
        ]
        : [
            { key: 'how', label: 'How It Works', href: '/#how' },
            { key: 'pricing', label: 'Pricing', href: '/pricing' },
            { key: 'help', label: 'Help Center', href: '/docs/user-guide' },
        ] as const;

    return (
        <header className="fixed top-8 inset-x-0 z-50 pointer-events-none px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div
                    className={`
                        pointer-events-auto
                        flex items-center justify-between
                        px-8 py-4
                        rounded-full
                        border
                        shadow-[0_12px_48px_rgba(212,165,116,0.12)]
                        ${forceDark
                            ? 'bg-[#1A1A1A]/95 backdrop-blur-2xl border-[#D4A574]/20'
                            : 'bg-white/90 backdrop-blur-2xl border-[#D4A574]/10'
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
                                                px-3 py-1.5 rounded-none border border-transparent
                                                text-[10px] font-bold uppercase tracking-[0.15em]
                                                transition-all
                                                ${active
                                                    ? forceDark
                                                        ? 'text-white border-white bg-white/5'
                                                        : 'text-[#141414] border-black bg-black/5'
                                                    : forceDark
                                                        ? 'text-white/60 hover:text-white hover:border-white/30'
                                                        : 'text-[#6B6B6B] hover:text-[#141414] hover:border-black/30'
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
                            {isAuthenticated === null ? (
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
                                        href="/vault"
                                        className={`
                                            inline-flex items-center justify-center
                                            rounded-none border px-6 py-2.5
                                            text-[10px] font-bold tracking-[0.2em] uppercase
                                            transition-all duration-300 whitespace-nowrap
                                            ${forceDark
                                                ? 'bg-transparent text-white border-white/60 hover:border-white hover:bg-white/10'
                                                : 'bg-transparent text-black border-black/40 hover:border-black hover:bg-black/5'
                                            }
                                        `}
                                    >
                                        [ ENTER VAULT ]
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
                    <div className="pointer-events-auto md:hidden mt-2 rounded-none bg-black border border-neutral-800 shadow-xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {navItems.map((p) => {
                            const active = isActive(pathname, p.href);
                            return (
                                <Link
                                    key={p.key}
                                    href={p.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`
                                        block px-4 py-3 border border-transparent
                                        text-[11px] font-bold uppercase tracking-[0.2em]
                                        transition-all
                                        ${active
                                            ? 'text-white border-neutral-800 bg-white/5'
                                            : 'text-neutral-500 hover:text-white hover:border-neutral-800'
                                        }
                                    `}
                                >
                                    {p.label}
                                </Link>
                            );
                        })}

                        {/* Mobile Direct Access */}
                        <div className="pt-4 mt-2 border-t border-neutral-800">
                            {isAuthenticated ? (
                                <Link
                                    href="/vault"
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-center w-full px-4 py-3 border border-white bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                                >
                                    [ ENTER VAULT ]
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-center w-full px-4 py-3 border border-neutral-700 text-white text-[11px] font-bold uppercase tracking-widest hover:border-white transition-colors"
                                >
                                    [ ACCESS OS ]
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
