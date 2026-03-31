"use client";

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-client';
import type { Session } from '@supabase/supabase-js';

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

        if (inviteEmail) {
            setEmail(inviteEmail);
        }

        if (inviteMode === 'signup') {
            setMode('signup');
        }
    }, [searchParams]);

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

    const acceptInviteIfNeeded = async () => {
        if (!inviteToken) {
            return;
        }

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
            if (!submittedEmail || !submittedPassword) {
                throw new Error('Enter your email and passkey to continue.');
            }

            const authPromise = mode === 'signup'
                ? supabaseClient.auth.signUp({ email: submittedEmail, password: submittedPassword })
                : supabaseClient.auth.signInWithPassword({ email: submittedEmail, password: submittedPassword });

            const timeoutPromise = new Promise<never>((_, reject) => {
                window.setTimeout(() => reject(new Error('Authentication timed out. Please try again.')), 12000);
            });

            const authResult = await Promise.race([authPromise, timeoutPromise]);

            const { data, error } = authResult;

            if (error) {
                setStatus('idle');
                setMessage(error.message);
                return;
            }

            if (data.session) {
                await finalizeLogin(data.session);
                return;
            } else {
                setStatus('success');
                setMessage(mode === 'signup'
                    ? 'Account created. Check your inbox to verify your email, then return to this invite link.'
                    : 'No session generated');
                return;
            }
        } catch (e) {
            const error = e as Error;
            setMessage(error.message || 'Authentication failed. Please check your credentials.');
            setStatus('error');
        }
    };

    return <LoginPageShell
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
    />;
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
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 selection:bg-white selection:text-black">
            <div className="w-full max-w-sm">

                <div className="mb-16 text-center">
                    <h1 className="text-3xl font-light tracking-tightest uppercase mb-2">
                        {inviteToken ? 'Accept Team Invitation' : 'System Operations'}
                    </h1>
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
                        {inviteToken ? 'Agency Access Required' : 'Secure Entry Required'}
                    </p>
                </div>

                <div className="mb-10 flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => setMode?.('signin')}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] ${mode === 'signin' ? 'border-b border-white text-white' : 'text-neutral-500'}`}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode?.('signup')}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] ${mode === 'signup' ? 'border-b border-white text-white' : 'text-neutral-500'}`}
                    >
                        Create Account
                    </button>
                </div>

                {inviteToken && (
                    <p className="mb-10 text-center text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                        {mode === 'signup'
                            ? 'Create your account using the invited email, then the seat will be activated automatically.'
                            : 'Sign in with the invited email to activate your seat automatically.'}
                    </p>
                )}

                <form onSubmit={handleAuth} className="space-y-12">

                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail?.(e.target.value)}
                            autoComplete="email"
                            className="w-full bg-transparent border-b border-neutral-800 pb-3 text-lg font-light text-white outline-none focus:border-white transition-colors peer placeholder-transparent"
                            placeholder="Email"
                            required
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-0 -top-6 text-[10px] font-mono tracking-widest text-neutral-600 uppercase transition-all peer-focus:text-white"
                        >
                            Email Identifier
                        </label>
                    </div>

                    <div className="relative group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword?.(e.target.value)}
                            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                            className="w-full bg-transparent border-b border-neutral-800 pb-3 text-lg font-light text-white outline-none focus:border-white transition-colors peer placeholder-transparent"
                            placeholder="Password"
                            required
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-0 -top-6 text-[10px] font-mono tracking-widest text-neutral-600 uppercase transition-all peer-focus:text-white"
                        >
                            Security Passkey
                        </label>
                    </div>

                    {(status === 'error' || status === 'success') && (
                        <div className={`${status === 'error' ? 'text-red-500' : 'text-emerald-400'} font-mono text-[10px] tracking-widest uppercase text-center`}>
                            {message}
                        </div>
                    )}

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-white text-black py-4 font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-neutral-300 transition-colors disabled:opacity-50"
                        >
                            {status === 'loading'
                                ? (mode === 'signup' ? 'Creating Account...' : 'Authenticating...')
                                : (mode === 'signup' ? 'Create Account' : 'Authenticate Session')}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
