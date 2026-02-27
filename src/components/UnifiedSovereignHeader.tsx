'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import IngestForm from '@/components/IngestForm';

const PILLARS = [
    { key: 'library', label: 'Library', href: '/dashboard' },
    { key: 'boards', label: 'Boards', href: '/dashboard/boards' },
    { key: 'analyze', label: 'Analyze', href: '/app' },
    { key: 'intelligence', label: 'Intelligence', href: '/intelligence' },
    { key: 'lexicon', label: 'Lexicon', href: '/docs' },
] as const;

function isActive(pathname: string, href: string): boolean {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/dashboard/';
    return pathname.startsWith(href);
}

export default function UnifiedSovereignHeader({ forceDark = false }: { forceDark?: boolean } = {}) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed top-0 inset-x-0 z-50 pointer-events-none px-4 md:px-6">
            <div className="mx-auto max-w-7xl mt-5">
                <div
                    className={`
                        pointer-events-auto
                        flex items-center justify-between
                        px-5 py-3
                        rounded-2xl
                        border
                        shadow-[0_8px_32px_rgba(20,20,20,0.06)]
                        ${forceDark
                            ? 'bg-[#141414]/80 backdrop-blur-2xl border-white/10'
                            : 'bg-white/80 backdrop-blur-2xl border-[#E7DED1]'
                        }
                    `}
                >
                    {/* ── Left: Logo + Pillars ── */}
                    <div className="flex items-center gap-6 lg:gap-8">
                        <Logo href="/" sublabel="Advertising Intelligence" />

                        {/* Desktop Pillars */}
                        <nav className="hidden md:flex items-center gap-1">
                            {PILLARS.map((p) => {
                                const active = isActive(pathname, p.href);
                                return (
                                    <Link
                                        key={p.key}
                                        href={p.href}
                                        className={`
                                            px-3 py-1.5 rounded-lg
                                            text-[10px] font-bold uppercase tracking-[0.15em]
                                            transition-all
                                            ${active
                                                ? forceDark
                                                    ? 'bg-white/10 text-white shadow-sm border border-white/10'
                                                    : 'bg-[#FBF7EF] text-[#141414] shadow-sm border border-[#E7DED1]'
                                                : forceDark
                                                    ? 'text-white/60 hover:text-white hover:bg-white/5'
                                                    : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-[#FBF7EF]/50'
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
                        {/* IngestForm — signed in only, desktop */}
                        <SignedIn>
                            <div className="hidden lg:block">
                                <IngestForm />
                            </div>
                            <div className="hidden lg:block h-6 w-px bg-[#E7DED1]" />
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>

                        {/* Signed out — CTA cluster */}
                        <SignedOut>
                            <SignInButton forceRedirectUrl="/dashboard" signUpForceRedirectUrl="/dashboard">
                                <button
                                    className={`
                                        hidden sm:inline-flex items-center justify-center
                                        text-[10px] font-bold uppercase tracking-[0.15em]
                                        transition
                                        ${forceDark ? 'text-white/60 hover:text-white' : 'text-[#6B6B6B] hover:text-[#141414]'}
                                    `}
                                >
                                    Inbound
                                </button>
                            </SignInButton>
                            <Link
                                href="/dashboard"
                                className={`
                                    inline-flex items-center justify-center
                                    rounded-full
                                    px-5 py-2
                                    text-[10px] font-bold tracking-[0.1em] uppercase
                                    transition-all hover:-translate-y-[1px]
                                    ${forceDark
                                        ? 'bg-accent text-[#141414] hover:bg-white shadow-[0_16px_32px_rgba(187,158,123,0.12)] hover:shadow-[0_20px_40px_rgba(187,158,123,0.18)]'
                                        : 'bg-[#141414] text-[#FBF7EF] hover:bg-[#2A2A2A] shadow-[0_16px_32px_rgba(20,20,20,0.12)] hover:shadow-[0_20px_40px_rgba(20,20,20,0.18)]'}
                                    active:scale-95
                                `}
                            >
                                Dashboard
                            </Link>
                        </SignedOut>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-1.5 rounded-lg text-[#6B6B6B] hover:text-[#141414] hover:bg-[#FBF7EF] transition-all"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                {mobileOpen && (
                    <div className="pointer-events-auto md:hidden mt-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-[#E7DED1] shadow-[0_16px_48px_rgba(20,20,20,0.1)] p-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                        {PILLARS.map((p) => {
                            const active = isActive(pathname, p.href);
                            return (
                                <Link
                                    key={p.key}
                                    href={p.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`
                                        block px-4 py-3 rounded-xl
                                        text-[11px] font-bold uppercase tracking-[0.2em]
                                        transition-all
                                        ${active
                                            ? 'bg-[#FBF7EF] text-[#141414] border border-[#E7DED1]'
                                            : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-[#FBF7EF]/50'
                                        }
                                    `}
                                >
                                    {p.label}
                                </Link>
                            );
                        })}

                        {/* Mobile IngestForm */}
                        <SignedIn>
                            <div className="pt-2 border-t border-[#E7DED1] mt-2">
                                <IngestForm />
                            </div>
                        </SignedIn>
                    </div>
                )}
            </div>
        </header>
    );
}
