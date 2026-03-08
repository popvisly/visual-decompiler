'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { supabaseClient } from '@/lib/supabase-client';

const PILLARS = [
    { key: 'library', label: 'Vault', href: '/vault' },
    { key: 'boards', label: 'Workspace', href: '/boards' },
    { key: 'intelligence', label: 'Analytics', href: '/compare' },
    { key: 'pricing', label: 'Pricing', href: '/pricing' },
    { key: 'help', label: 'Help Center', href: '/help' },
] as const;

function isActive(pathname: string, href: string): boolean {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/dashboard/';
    return pathname.startsWith(href);
}

export default function UnifiedSovereignHeader({ forceDark = false }: { forceDark?: boolean } = {}) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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

    return (
        <header className="fixed top-0 inset-x-0 z-50 pointer-events-none px-4 md:px-6">
            <div className="mx-auto max-w-7xl mt-5">
                <div
                    className={`
                        pointer-events-auto
                        flex items-center justify-between
                        px-5 py-3
                        rounded-none
                        border
                        shadow-[0_8px_32px_rgba(20,20,20,0.06)]
                        ${forceDark
                            ? 'bg-[#141414]/90 backdrop-blur-2xl border-white/20'
                            : 'bg-white/90 backdrop-blur-2xl border-black/20'
                        }
                    `}
                >
                    {/* ── Left: Logo + Pillars ── */}
                    <div className="flex items-center gap-6 lg:gap-8">
                        <Logo href="/" sublabel="Advertising Intelligence" forceDark={forceDark} />

                        {/* Desktop Pillars */}
                        <nav className="hidden md:flex items-center gap-1">
                            {PILLARS.map((p) => {
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
                        </nav>
                    </div>

                    {/* ── Right: Utility Bar ── */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            {isAuthenticated ? (
                                <div className="flex items-center justify-end gap-3">
                                    <div className={`flex flex-col items-end text-[9px] font-bold tracking-[0.2em] uppercase hidden lg:flex ${forceDark ? 'text-gray-400' : 'text-[#141414]/60'}`}>
                                        <span>ENTER THE VAULT FOR</span>
                                        <span>FURTHER FORENSIC ANALYSIS &gt;</span>
                                    </div>
                                    <Link
                                        href="/vault"
                                        className={`
                                            inline-flex items-center justify-center
                                            rounded-none border px-6 py-2.5
                                            text-[10px] font-bold tracking-[0.2em] uppercase
                                            transition-all duration-300
                                            ${forceDark
                                                ? 'bg-white text-black border-white hover:bg-neutral-200'
                                                : 'bg-black text-white hover:bg-neutral-800 border-black'
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
                        {PILLARS.map((p) => {
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
