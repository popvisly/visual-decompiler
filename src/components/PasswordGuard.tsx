'use client';

import { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface PasswordGuardProps {
    slug: string;
    orgBranding?: {
        logo_url?: string | null;
        primary_color?: string;
    };
}

export default function PasswordGuard({ slug, orgBranding }: PasswordGuardProps) {
    const [password, setPassword] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setVerifying(true);
        setError(null);

        try {
            const res = await fetch('/api/share/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, password })
            });

            const data = await res.json();
            if (data.success) {
                // Verification successful, API set the cookie
                window.location.reload();
            } else {
                setError(data.error || 'Identity verification failed');
            }
        } catch (err) {
            setError('Strategic link unreachable');
        } finally {
            setVerifying(false);
        }
    };

    const primaryColor = orgBranding?.primary_color || '#BB9E7B';

    return (
        <div className="min-h-screen bg-[#FBF7EF] flex flex-col items-center justify-center p-6 italic">
            <div className="max-w-md w-full space-y-12 text-center">
                {/* Branding */}
                <div className="flex justify-center mb-16">
                    {orgBranding?.logo_url ? (
                        <img src={orgBranding.logo_url} alt="Logo" className="h-12 object-contain" />
                    ) : (
                        <div className="w-16 h-16 bg-[#141414] rounded-2xl flex items-center justify-center shadow-2xl">
                            <span className="text-accent text-3xl font-black not-italic italic">V</span>
                        </div>
                    )}
                </div>

                {/* Secure Handshake Message */}
                <div className="space-y-4">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white p-4 rounded-full border border-[#E7DED1] shadow-lg animate-pulse">
                            <ShieldCheck className="w-6 h-6 text-accent" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold uppercase tracking-[0.3em] text-[#141414]">Secure Handshake</h1>
                    <p className="text-[11px] text-[#6B6B6B] leading-relaxed uppercase tracking-widest max-w-[280px] mx-auto">
                        This strategic asset is protected. Please provide the laboratory access code.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]/40 group-focus-within:text-accent transition-colors" />
                        <input
                            type="password"
                            placeholder="ACCESS CODE"
                            className="w-full bg-white border border-[#E7DED1] rounded-full px-8 md:px-16 py-6 text-sm focus:outline-none focus:border-accent transition-all shadow-xl shadow-black/[0.01] text-center tracking-[0.5em] font-mono"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoFocus
                        />
                        {error && (
                            <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-red-500 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">{error}</span>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={verifying || !password}
                        className="w-full py-6 bg-[#141414] text-white rounded-full font-bold text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95 mt-12"
                    >
                        {verifying ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <ArrowRight className="w-4 h-4 text-accent" />}
                        {verifying ? 'Verifying...' : 'Unlock Portal'}
                    </button>
                </form>

                {/* Footer */}
                <div className="pt-24">
                    <p className="text-[8px] text-[#6B6B6B]/40 uppercase tracking-[0.2em] font-bold">
                        Villains At Large <span className="mx-2 text-accent">•</span> Strategic Intelligence Layer
                    </p>
                </div>
            </div>
        </div>
    );
}
