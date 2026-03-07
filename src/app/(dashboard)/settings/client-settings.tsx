"use client";

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase-client';

interface Agency {
    id: string;
    name?: string;
    primary_hex?: string;
    whitelabel_logo?: string;
}

export default function SettingsClient({ initialAgency }: { initialAgency: Agency }) {
    const [agencyName, setAgencyName] = useState(initialAgency.name || '');
    const [primaryHex, setPrimaryHex] = useState(initialAgency.primary_hex || '');
    const [logoUrl, setLogoUrl] = useState(initialAgency.whitelabel_logo || '');

    const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('saving');
        setErrorMsg('');

        try {
            const { error } = await supabaseClient
                .from('agencies')
                .update({
                    name: agencyName,
                    primary_hex: primaryHex,
                    whitelabel_logo: logoUrl,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', initialAgency.id);

            if (error) throw error;

            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            // Error handling decoupled from console per requirements
            setStatus('error');
            const message = err instanceof Error ? err.message : 'Failed to update configuration.';
            setErrorMsg(message);
        }
    };

    return (
        <div className="p-8 md:p-16 max-w-3xl">
            <div className="mb-16">
                <h1 className="text-3xl md:text-5xl font-light tracking-tightest uppercase mb-4">
                    Whitelabel Engine
                </h1>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
                    Agency Sovereign Configuration
                </p>
            </div>

            <form onSubmit={handleSave} className="space-y-16">

                {/* Agency Name */}
                <div className="relative group">
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-4 transition-colors group-focus-within:text-white">
                        Agency Identity String
                    </label>
                    <input
                        type="text"
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        className="w-full bg-transparent border-b border-neutral-800 pb-3 text-xl font-light text-white outline-none focus:border-white transition-colors"
                        placeholder="e.g., OMNI GLOBAL"
                        required
                    />
                </div>

                {/* Primary Hex Code */}
                <div className="relative group">
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-4 transition-colors group-focus-within:text-white">
                        Absolute Primary Hex
                    </label>
                    <div className="flex items-end gap-6">
                        <input
                            type="text"
                            value={primaryHex}
                            onChange={(e) => setPrimaryHex(e.target.value)}
                            className="flex-1 bg-transparent border-b border-neutral-800 pb-3 text-xl font-mono text-white outline-none focus:border-white transition-colors uppercase"
                            placeholder="#FFFFFF"
                            pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                            title="Must be a valid hex code starting with #"
                        />
                        <div
                            className="w-8 h-8 md:w-10 md:h-10 border border-neutral-700 shrink-0"
                            style={{ backgroundColor: primaryHex || 'transparent' }}
                        />
                    </div>
                </div>

                {/* Whitelabel Logo URL */}
                <div className="relative group">
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-4 transition-colors group-focus-within:text-white">
                        Branded Vector / Raster Node (URL)
                    </label>
                    <input
                        type="url"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className="w-full bg-transparent border-b border-neutral-800 pb-3 text-sm font-mono text-white outline-none focus:border-white transition-colors"
                        placeholder="https://..."
                    />
                </div>

                {/* Feedback & Actions */}
                <div className="pt-8 flex flex-col items-start gap-4">
                    <button
                        type="submit"
                        disabled={status === 'saving'}
                        className="bg-white text-black px-8 py-4 font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-neutral-300 transition-colors disabled:opacity-50"
                    >
                        {status === 'saving' ? 'Synchronizing State...' : 'Save Configuration'}
                    </button>

                    {status === 'success' && (
                        <span className="text-[10px] font-mono tracking-widest text-white uppercase animate-pulse">
                            [+] CONFIGURATION SYNCED
                        </span>
                    )}

                    {status === 'error' && (
                        <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase">
                            [-] ERROR: {errorMsg}
                        </span>
                    )}
                </div>

            </form>
        </div>
    );
}
