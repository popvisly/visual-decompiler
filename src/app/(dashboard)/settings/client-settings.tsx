"use client";

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase-client';

interface Agency {
    id: string;
    name?: string;
    primary_hex?: string;
    whitelabel_logo?: string;
}

export default function SettingsClient({ initialAgency }: { initialAgency: Agency & { is_whitelabel_active?: boolean } }) {
    const [agencyName, setAgencyName] = useState(initialAgency.name || '');
    const [primaryHex, setPrimaryHex] = useState(initialAgency.primary_hex || '');
    const [logoUrl, setLogoUrl] = useState(initialAgency.whitelabel_logo || '');
    const [isWhitelabelActive, setIsWhitelabelActive] = useState(initialAgency.is_whitelabel_active || false);

    const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setStatus('saving');
        setErrorMsg('');

        try {
            const { error } = await supabaseClient
                .from('agencies')
                .update({
                    name: agencyName,
                    primary_hex: primaryHex,
                    whitelabel_logo: logoUrl,
                    is_whitelabel_active: isWhitelabelActive,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', initialAgency.id);

            if (error) throw error;

            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            setStatus('error');
            const message = err instanceof Error ? err.message : 'Failed to update configuration.';
            setErrorMsg(message);
        }
    };

    return (
        <div className="min-h-screen bg-[#FBFBF6] relative">
            {/* Geometric Grid Overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]" />
            
            <div className="relative z-10 p-8 md:p-16 max-w-5xl mx-auto">
                <div className="mb-16 border-b border-[#D4A574]/20 pb-8">
                    <h1 className="text-3xl md:text-5xl font-light tracking-tightest uppercase mb-4 text-[#1A1A1A]">
                        Agency Command <span className="text-[#D4A574]">Center</span>
                    </h1>
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4A574]">
                        Sovereign Infrastructure Configuration
                    </p>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                    
                    {/* Primary Card: Identity */}
                    <div className="bg-[#1A1A1A] border border-[#D4A574]/20 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-focus-within:opacity-20 transition-opacity">
                            <div className="w-24 h-24 border-2 border-[#D4A574] rounded-full flex items-center justify-center font-mono text-[10px] text-[#D4A574]">ID_STR</div>
                        </div>
                        
                        <label className="block text-[11px] font-bold tracking-[0.3em] text-[#D4A574] uppercase mb-6">
                            Agency Identity String
                        </label>
                        <input
                            type="text"
                            value={agencyName}
                            onChange={(e) => setAgencyName(e.target.value)}
                            className="w-full bg-transparent border border-[#333] focus:border-[#D4A574] rounded-[1.5rem] px-8 py-6 text-2xl font-light text-white outline-none transition-all placeholder:text-white/10"
                            placeholder="e.g., OMNI GLOBAL"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Hex Config */}
                        <div className="bg-white border border-[#D4A574]/30 rounded-[2rem] p-10 shadow-sm relative overflow-hidden">
                            <label className="block text-[11px] font-bold tracking-[0.3em] text-[#8B4513] uppercase mb-6">
                                Absolute Primary Hex
                            </label>
                            <div className="flex items-center gap-6">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={primaryHex}
                                        onChange={(e) => setPrimaryHex(e.target.value)}
                                        className="w-full bg-[#FBFBF6] border border-[#E5E5E1] focus:border-[#D4A574] rounded-full px-8 py-5 text-lg font-mono text-[#1A1A1A] outline-none transition-all uppercase"
                                        placeholder="#FFFFFF"
                                    />
                                </div>
                                <div className="relative group">
                                    <div 
                                        className="w-16 h-16 rounded-full border-2 border-[#D4A574]/20 shadow-inner flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105"
                                        style={{ backgroundColor: primaryHex || '#1A1A1A' }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                                    </div>
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#8B4513]/40 tracking-widest uppercase whitespace-nowrap">Preview</span>
                                </div>
                            </div>
                        </div>

                        {/* Logo Config */}
                        <div className="bg-white border border-[#D4A574]/30 rounded-[2rem] p-10 shadow-sm relative overflow-hidden">
                            <label className="block text-[11px] font-bold tracking-[0.3em] text-[#8B4513] uppercase mb-6">
                                Branded Vector Node URL
                            </label>
                            <div className="flex items-center gap-6">
                                <div className="relative flex-1">
                                    <input
                                        type="url"
                                        value={logoUrl}
                                        onChange={(e) => setLogoUrl(e.target.value)}
                                        className="w-full bg-[#FBFBF6] border border-[#E5E5E1] focus:border-[#D4A574] rounded-full px-8 py-5 text-sm font-mono text-[#1A1A1A] outline-none transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="relative group flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full border-2 border-[#D4A574]/20 bg-[#FBFBF6] p-3 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                                        {logoUrl ? (
                                            <img src={logoUrl} alt="Preview" className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="w-4 h-4 bg-[#D4A574]/20 rounded-sm" />
                                        )}
                                    </div>
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#8B4513]/40 tracking-widest uppercase whitespace-nowrap">Vector</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* whitelabel Card */}
                    <div className="bg-white border border-[#D4A574]/30 rounded-[2rem] p-10 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-[11px] font-bold tracking-[0.3em] text-[#8B4513] uppercase mb-2">
                                    Sovereign Whitelabel Mode
                                </label>
                                <p className="text-[10px] text-[#8B4513]/60 max-w-md leading-relaxed uppercase tracking-widest">
                                    Enable to replace all system branding with your Agency Identity string in headers and dossiers.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsWhitelabelActive(!isWhitelabelActive)}
                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${isWhitelabelActive ? 'bg-[#8B4513]' : 'bg-[#E5E5E1]'}`}
                            >
                                <span
                                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isWhitelabelActive ? 'translate-x-[1.75rem]' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Status Feedback */}
                    <div className="pt-4 h-8">
                        {status === 'success' && (
                            <span className="text-[10px] font-bold tracking-[0.3em] text-[#8B4513] uppercase animate-pulse">
                                [+] CONFIGURATION SYNCHRONIZED
                            </span>
                        )}
                        {status === 'error' && (
                            <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase">
                                [-] ERROR: {errorMsg}
                            </span>
                        )}
                    </div>

                    {/* Floating Save Button - luxury style */}
                    <div className="fixed bottom-12 right-12 z-50">
                        <button
                            type="submit"
                            disabled={status === 'saving'}
                            className="flex items-center gap-4 px-10 py-5 bg-[#4A4A4A] text-white text-[11px] font-bold tracking-[0.3em] uppercase rounded-full shadow-2xl hover:bg-[#1A1A1A] hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
                        >
                            <div className={`w-1.5 h-1.5 rounded-full ${status === 'saving' ? 'bg-[#D4A574] animate-ping' : 'bg-[#D4A574]'}`} />
                            {status === 'saving' ? 'SYNCING...' : 'Save Configuration'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
