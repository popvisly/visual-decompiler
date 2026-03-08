"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-client';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setStatus('idle');
                setErrorMsg(error.message);
                return;
            }

            if (data.session) {
                // Explicitly set a cookie so Next.js middleware can read the session
                const expiresIn = data.session.expires_in || 3600;
                document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${expiresIn}; SameSite=Lax; secure`;
                router.push('/vault');
                // Force refresh to ensure middleware picks up the new cookie and renders layouts correctly
                router.refresh();
            } else {
                setStatus('idle');
                setErrorMsg("No session generated");
                return;
            }
        } catch (e) {
            const error = e as Error;
            setErrorMsg(error.message || 'Authentication failed. Please check your credentials.');
            setStatus('idle');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 selection:bg-white selection:text-black">
            <div className="w-full max-w-sm">

                <div className="mb-16 text-center">
                    <h1 className="text-3xl font-light tracking-tightest uppercase mb-2">
                        System Operations
                    </h1>
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
                        Secure Entry Required
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-12">

                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    {status === 'error' && (
                        <div className="text-red-500 font-mono text-[10px] tracking-widest uppercase text-center">
                            {errorMsg}
                        </div>
                    )}

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-white text-black py-4 font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-neutral-300 transition-colors disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Authenticating...' : 'Authenticate Session'}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
