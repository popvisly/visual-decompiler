"use client";

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { isSupabaseClientConfigured, supabaseClient } from '@/lib/supabase-client';
import type { Session } from '@supabase/supabase-js';
import Logo from '@/components/Logo';

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginPageShell />}>
            <LoginPageContent />
        </Suspense>
    );
}

function LoginPageContent() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
    const [message, setMessage] = useState('');
    const inviteToken = searchParams.get('invite');
    const cookieSecureAttr = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; secure' : '';
    const redirectingRef = useRef(false);

    useEffect(() => {
        const inviteEmail = searchParams.get('email');
        const inviteMode = searchParams.get('mode');
        const verified = searchParams.get('verified');

        if (inviteEmail) {
            setEmail(inviteEmail);
        }

        if (inviteMode === 'signup') {
            setMode('signup');
        }

        if (verified === '1') {
            setStatus('success');
            setMessage('Email verified. Sign in to continue.');
        }

        if (!isSupabaseClientConfigured) {
            setStatus('error');
            setMessage('Local auth is not configured. Add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart dev.');
        }
    }, [searchParams]);

    const acceptInviteIfNeeded = async () => {
        if (!inviteToken) return;

        const response = await fetch('/api/team/accept', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: inviteToken }),
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(typeof payload?.error === 'string' ? payload.error : 'Failed to accept invitation');
        }
    };

    const finalizeLogin = async (session: Session) => {
        if (redirectingRef.current) return;
        redirectingRef.current = true;

        const expiresIn = session.expires_in || 3600;
        document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${expiresIn}; SameSite=Lax${cookieSecureAttr}`;

        await acceptInviteIfNeeded();
        window.location.assign(inviteToken ? '/settings/team' : '/vault');
    };

    useEffect(() => {
        let active = true;

        const settleExistingSession = async () => {
            const { data } = await supabaseClient.auth.getSession();
            if (!active || !data.session) return;
            await finalizeLogin(data.session);
        };

        settleExistingSession();

        const { data: listener } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
            if (!active || !session) return;
            await finalizeLogin(session);
        });

        return () => {
            active = false;
            listener.subscription.unsubscribe();
        };
    }, [inviteToken]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const submittedEmail = String(formData.get('email') || '').trim();
        const submittedPassword = String(formData.get('password') || '');

        setEmail(submittedEmail);
        setPassword(submittedPassword);
        setStatus('loading');
        setMessage('');

        try {
            if (!isSupabaseClientConfigured) {
                throw new Error('Local auth is not configured. Add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart dev.');
            }

            if (!submittedEmail || !submittedPassword) {
                throw new Error('Enter your email and password to continue.');
            }

            const authPromise = mode === 'signup'
                ? supabaseClient.auth.signUp({
                      email: submittedEmail,
                      password: submittedPassword,
                      options: {
                          emailRedirectTo: `${window.location.origin}/login?verified=1`,
                      },
                  })
                : supabaseClient.auth.signInWithPassword({ email: submittedEmail, password: submittedPassword });

            const timeoutPromise = new Promise<never>((_, reject) => {
                window.setTimeout(() => reject(new Error('Authentication timed out. Please try again.')), 12000);
            });

            const authResult = await Promise.race([authPromise, timeoutPromise]);
            const { data, error } = authResult;

            if (error) {
                setStatus('error');
                setMessage(error.message);
                return;
            }

            if (data.session) {
                await finalizeLogin(data.session);
                return;
            }

            setStatus('success');
            setMessage(
                mode === 'signup'
                    ? 'Account created. Check your inbox to verify your email, then return here.'
                    : 'No active session was created. Please try again.'
            );
        } catch (e) {
            const error = e as Error;
            setStatus('error');
            setMessage(error.message || 'Authentication failed. Please check your credentials.');
        }
    };

    return (
        <LoginPageShell
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            mode={mode}
            setMode={setMode}
            status={status}
            message={message}
            inviteToken={inviteToken}
            handleAuth={handleAuth}
        />
    );
}

type LoginPageShellProps = {
    email?: string;
    setEmail?: React.Dispatch<React.SetStateAction<string>>;
    password?: string;
    setPassword?: React.Dispatch<React.SetStateAction<string>>;
    mode?: 'signin' | 'signup';
    setMode?: React.Dispatch<React.SetStateAction<'signin' | 'signup'>>;
    status?: 'idle' | 'loading' | 'error' | 'success';
    message?: string;
    inviteToken?: string | null;
    handleAuth?: (e: React.FormEvent) => Promise<void>;
};

function LoginPageShell({
    email = '',
    setEmail,
    password = '',
    setPassword,
    mode = 'signin',
    setMode,
    status = 'idle',
    message = '',
    inviteToken = null,
    handleAuth,
}: LoginPageShellProps = {}) {
    const messageTone = status === 'error' ? 'text-[#D97A6E]' : 'text-[#D4A574]';

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#090909] text-[#F3F1EA]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#F3F1EA_1px,transparent_1px),linear-gradient(90deg,#F3F1EA_1px,transparent_1px)] [background-size:40px_40px]" />

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-16 md:px-10">
                <div className="w-full max-w-[980px] rounded-[32px] border border-white/10 bg-[#0F0F0F]/92 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-12">
                    <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
                        <section>
                            <div className="mb-10">
                                <Logo
                                    href="/"
                                    sublabel=""
                                    forceDark
                                    hoverColor="yellow"
                                    className="scale-[1.02]"
                                />
                            </div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">
                                {inviteToken ? 'Team Access' : 'Secure Access'}
                            </p>
                            <h1 className="mt-4 text-4xl font-semibold uppercase tracking-tight text-[#F3F1EA] md:text-5xl">
                                {inviteToken ? 'Accept Invitation' : 'Vault Login'}
                            </h1>
                            <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-[#D7D4CB]/78">
                                {inviteToken
                                    ? 'Sign in with the invited email to activate your seat and keep workspace access correctly scoped.'
                                    : 'Access your private Visual Decompiler workspace and continue with decision-ready analysis.'}
                            </p>

                            <div className="mt-10 rounded-2xl border border-white/10 bg-[#131313] p-5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">Trust Layer</p>
                                <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-[#CFCBBF]/78">
                                    <li>Private workspace isolation per account.</li>
                                    <li>Authenticated seat activation for invites.</li>
                                    <li>Secure session handling across Vault surfaces.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-white/10 bg-[#111111] p-6 md:p-7">
                            <div className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-[#0D0D0D] p-1">
                                <button
                                    type="button"
                                    onClick={() => setMode?.('signin')}
                                    className={`w-1/2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition-colors ${
                                        mode === 'signin'
                                            ? 'bg-[#D4A574] text-[#141414]'
                                            : 'text-[#B6B2A5] hover:text-[#F3F1EA]'
                                    }`}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode?.('signup')}
                                    className={`w-1/2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition-colors ${
                                        mode === 'signup'
                                            ? 'bg-[#D4A574] text-[#141414]'
                                            : 'text-[#B6B2A5] hover:text-[#F3F1EA]'
                                    }`}
                                >
                                    Create Account
                                </button>
                            </div>

                            <form onSubmit={handleAuth} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail?.(e.target.value)}
                                        autoComplete="email"
                                        className="w-full rounded-xl border border-white/12 bg-[#0C0C0C] px-4 py-3 text-[16px] text-[#F3F1EA] outline-none transition-colors placeholder:text-[#7D7A70] focus:border-[#D4A574]/70"
                                        placeholder="you@agency.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword?.(e.target.value)}
                                        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                                        className="w-full rounded-xl border border-white/12 bg-[#0C0C0C] px-4 py-3 text-[16px] text-[#F3F1EA] outline-none transition-colors placeholder:text-[#7D7A70] focus:border-[#D4A574]/70"
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>

                                {(status === 'error' || status === 'success') && (
                                    <div className={`rounded-xl border border-white/10 bg-[#0C0C0C] px-4 py-3 text-[12px] uppercase tracking-[0.12em] ${messageTone}`}>
                                        {message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full rounded-xl bg-[#F3F1EA] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#141414] transition-colors hover:bg-white disabled:opacity-60"
                                >
                                    {status === 'loading'
                                        ? mode === 'signup'
                                            ? 'Creating Account...'
                                            : 'Signing In...'
                                        : mode === 'signup'
                                          ? 'Create Account'
                                          : 'Sign In'}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.18em] text-[#9E9A8D]">
                                Visual Decompiler secure authentication
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
