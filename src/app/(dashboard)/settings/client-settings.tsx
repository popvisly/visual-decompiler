"use client";

import { useMemo, useState } from 'react';
import { Check, Upload } from 'lucide-react';
import { supabaseClient } from '@/lib/supabase-client';

interface Agency {
    id: string;
    name?: string;
    primary_hex?: string;
    whitelabel_logo?: string;
    logo_url?: string;
    descriptor?: string;
    contact_email?: string;
    confidentiality_notice?: string;
    is_whitelabel_active?: boolean;
}

const DEFAULT_NOTICE = 'This Strategic Dossier is prepared exclusively for the named recipient. Contents are confidential and may not be distributed without written consent.';

function normalizeHex(value: string) {
    if (!value.trim()) {
        return '#141414';
    }

    return value.startsWith('#') ? value.toUpperCase() : `#${value.toUpperCase()}`;
}

function SettingsField({
    label,
    helperText,
    children,
}: {
    label: string;
    helperText?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-3">
            <label className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">
                {label}
            </label>
            {children}
            {helperText && (
                <p className="text-[12px] leading-relaxed text-[#6B6B6B]">
                    {helperText}
                </p>
            )}
        </div>
    );
}

function DossierCoverPreview({
    agencyName,
    agencyDescriptor,
    logoUrl,
    primaryColor,
    isWhitelabel,
}: {
    agencyName: string;
    agencyDescriptor: string;
    logoUrl: string;
    primaryColor: string;
    isWhitelabel: boolean;
}) {
    const accent = normalizeHex(primaryColor);
    const displayName = isWhitelabel ? agencyName || 'Your Agency' : 'Visual Decompiler';
    const displayDescriptor = isWhitelabel
        ? agencyDescriptor || 'Strategic Intelligence & Creative Consulting'
        : 'Forensic Intelligence System';

    return (
        <div className="rounded-[2rem] border border-[#D4A574]/20 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574] mb-4">Live Dossier Preview</p>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0F0F0F] p-6 min-h-[520px]">
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#C9A96E_1px,transparent_1px),linear-gradient(90deg,#C9A96E_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                                {logoUrl ? (
                                    <img src={logoUrl} alt={displayName} className="h-full w-full object-contain p-2" />
                                ) : (
                                    <div className="flex flex-col items-center gap-1 text-white/50">
                                        <Upload className="h-4 w-4" />
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Logo</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.26em]" style={{ color: accent }}>
                                    {displayName}
                                </p>
                                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/35">
                                    Prepared by: {displayName}
                                </p>
                            </div>
                        </div>
                        <div className="rounded-full border border-white/10 px-3 py-1 text-[8px] uppercase tracking-[0.2em] text-white/45">
                            Classification: Sovereign
                        </div>
                    </div>

                    <div className="mt-16">
                        <p className="text-[10px] font-bold uppercase tracking-[0.34em]" style={{ color: accent }}>
                            Strategic Dossier
                        </p>
                        <h2 className="mt-5 text-4xl font-light uppercase tracking-tight text-white leading-tight">
                            Forensic Intelligence Report
                        </h2>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                            {displayDescriptor}
                        </p>
                    </div>

                    <div className="mt-auto rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                        <div className="h-1 w-24 rounded-full" style={{ backgroundColor: accent }} />
                        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                            Cover Accent
                        </p>
                        <p className="mt-2 text-[12px] leading-relaxed text-white/58">
                            This preview mirrors the white-labelled dossier cover language and branding surfaces used across exports.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SettingsClient({ initialAgency }: { initialAgency: Agency }) {
    const [agencyName, setAgencyName] = useState(initialAgency.name || '');
    const [primaryHex, setPrimaryHex] = useState(initialAgency.primary_hex || '#141414');
    const [logoUrl, setLogoUrl] = useState(initialAgency.logo_url || initialAgency.whitelabel_logo || '');
    const [descriptor, setDescriptor] = useState(initialAgency.descriptor || '');
    const [contactEmail, setContactEmail] = useState(initialAgency.contact_email || '');
    const [confidentialityNotice, setConfidentialityNotice] = useState(initialAgency.confidentiality_notice || DEFAULT_NOTICE);
    const [isWhitelabelActive, setIsWhitelabelActive] = useState(initialAgency.is_whitelabel_active || false);

    const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const normalizedHex = useMemo(() => normalizeHex(primaryHex), [primaryHex]);

    const handleSave = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        setStatus('saving');
        setErrorMsg('');

        try {
            const payload = {
                name: agencyName,
                primary_hex: normalizedHex,
                whitelabel_logo: logoUrl,
                logo_url: logoUrl,
                descriptor,
                contact_email: contactEmail,
                confidentiality_notice: confidentialityNotice,
                is_whitelabel_active: isWhitelabelActive,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabaseClient
                .from('agencies')
                .update(payload)
                .eq('id', initialAgency.id);

            if (error) {
                throw error;
            }

            setStatus('success');
            window.setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Failed to update configuration.');
        }
    };

    return (
        <div className="min-h-screen bg-[#FBFBF6] relative">
            <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-8 py-10 md:px-12 md:py-14">
                <div className="mb-12 border-b border-[#D4A574]/20 pb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Agency Settings</p>
                    <h1 className="mt-4 text-4xl font-light uppercase tracking-tight text-[#1A1A1A] md:text-6xl">
                        Dossier Identity
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#6B6B6B]">
                        Configure the identity, logo, descriptor, and confidentiality language that appear across your white-labelled dossiers and premium client-facing exports.
                    </p>
                </div>

                <form onSubmit={handleSave} className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_420px]">
                    <div className="space-y-8">
                        <div className="rounded-[2rem] border border-[#D4A574]/20 bg-[#141414] p-8 shadow-2xl">
                            <div className="grid gap-8 md:grid-cols-[1fr_132px] md:items-start">
                                <div className="space-y-6">
                                    <SettingsField label="Agency Identity String">
                                        <input
                                            type="text"
                                            value={agencyName}
                                            onChange={(e) => setAgencyName(e.target.value)}
                                            className="w-full rounded-[1.5rem] border border-white/10 bg-transparent px-6 py-5 text-2xl font-light text-white outline-none transition-all placeholder:text-white/20 focus:border-[#D4A574]/60"
                                            placeholder="e.g., OMNI GLOBAL"
                                            required
                                        />
                                    </SettingsField>

                                    <SettingsField
                                        label="Agency Logo URL"
                                        helperText="Paste a publicly accessible URL to your agency logo (SVG or PNG recommended). This will appear on exported dossiers and white-labelled reports."
                                    >
                                        <input
                                            type="url"
                                            value={logoUrl}
                                            onChange={(e) => setLogoUrl(e.target.value)}
                                            className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#D4A574]/60"
                                            placeholder="https://youragency.com/logo.svg"
                                        />
                                    </SettingsField>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex h-[132px] w-[132px] items-center justify-center overflow-hidden rounded-full border border-[#D4A574]/25 bg-white/5">
                                        {logoUrl ? (
                                            <img src={logoUrl} alt={agencyName || 'Agency logo'} className="h-full w-full object-contain p-5" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-[#D4A574]/70">
                                                <Upload className="h-5 w-5" />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Logo</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-center text-[9px] font-bold uppercase tracking-[0.22em] text-[#D4A574]/55">
                                        Agency Logo Preview
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="rounded-[2rem] border border-[#D4A574]/20 bg-white p-8 shadow-sm">
                                <SettingsField label="Absolute Primary Hex">
                                    <div className="flex items-center gap-5">
                                        <input
                                            type="text"
                                            value={primaryHex}
                                            onChange={(e) => setPrimaryHex(e.target.value)}
                                            className="w-full rounded-full border border-[#E5E5E1] bg-[#FBFBF6] px-6 py-4 text-base font-mono uppercase text-[#1A1A1A] outline-none transition-all focus:border-[#D4A574]"
                                            placeholder="#141414"
                                        />
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#D4A574]/25 shadow-inner" style={{ backgroundColor: normalizedHex }} />
                                    </div>
                                </SettingsField>
                            </div>

                            <div className="rounded-[2rem] border border-[#D4A574]/20 bg-white p-8 shadow-sm">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Sovereign Whitelabel Mode</p>
                                <p className="mt-4 whitespace-pre-line text-[13px] leading-relaxed text-[#6B6B6B]">
                                    {`When enabled:
• Your Agency Identity String replaces "VISUAL DECOMPILER" in all navigation headers
• Exported PDF dossiers show your agency name and logo on the cover page
• The "Prepared by" field on all reports shows your agency identity
• Clients who receive exported dossiers see only your agency brand

Your agency identity and logo must be configured above before enabling.`}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsWhitelabelActive((value) => !value)}
                                    className={`mt-6 relative inline-flex h-9 w-16 items-center rounded-full transition-colors ${isWhitelabelActive ? 'bg-[#8B4513]' : 'bg-[#E5E5E1]'}`}
                                >
                                    <span
                                        className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${isWhitelabelActive ? 'translate-x-8' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-[#D4A574]/20 bg-white p-8 shadow-sm">
                            <div className="mb-8 border-b border-[#D4A574]/10 pb-5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Dossier Identity</p>
                                <p className="mt-3 text-sm leading-relaxed text-[#6B6B6B]">
                                    These fields are printed on exported reports and used to make the dossier cover feel like it came from your agency, not a software vendor.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <SettingsField
                                    label="Agency Descriptor"
                                    helperText="Appears beneath your agency name on the dossier cover page."
                                >
                                    <input
                                        type="text"
                                        value={descriptor}
                                        onChange={(e) => setDescriptor(e.target.value)}
                                        className="w-full rounded-[1.25rem] border border-[#E5E5E1] bg-[#FBFBF6] px-6 py-4 text-sm text-[#1A1A1A] outline-none transition-all focus:border-[#D4A574]"
                                        placeholder="e.g., Strategic Intelligence & Creative Consulting"
                                    />
                                </SettingsField>

                                <SettingsField
                                    label="Agency Contact"
                                    helperText="Appears in the dossier footer."
                                >
                                    <input
                                        type="email"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        className="w-full rounded-[1.25rem] border border-[#E5E5E1] bg-[#FBFBF6] px-6 py-4 text-sm text-[#1A1A1A] outline-none transition-all focus:border-[#D4A574]"
                                        placeholder="hello@youragency.com"
                                    />
                                </SettingsField>

                                <SettingsField
                                    label="Confidentiality Notice"
                                    helperText="Appears at the bottom of every exported dossier page."
                                >
                                    <textarea
                                        value={confidentialityNotice}
                                        onChange={(e) => setConfidentialityNotice(e.target.value)}
                                        className="min-h-[150px] w-full rounded-[1.5rem] border border-[#E5E5E1] bg-[#FBFBF6] px-6 py-4 text-sm leading-relaxed text-[#1A1A1A] outline-none transition-all focus:border-[#D4A574]"
                                    />
                                </SettingsField>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-[#D4A574]/15 bg-white/70 px-6 py-5">
                            <div className="min-h-[20px]">
                                {status === 'success' && (
                                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#8B4513]">
                                        <Check className="h-4 w-4" />
                                        Configuration Saved
                                    </span>
                                )}
                                {status === 'error' && (
                                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                                        Save failed - {errorMsg}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'saving'}
                                className="inline-flex items-center gap-3 rounded-full bg-[#1A1A1A] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.26em] text-white transition-all hover:bg-black disabled:opacity-50"
                            >
                                <span className={`h-1.5 w-1.5 rounded-full bg-[#D4A574] ${status === 'saving' ? 'animate-ping' : ''}`} />
                                {status === 'saving' ? 'Saving...' : 'Save Configuration'}
                            </button>
                        </div>
                    </div>

                    <div className="xl:sticky xl:top-8 xl:self-start">
                        <DossierCoverPreview
                            agencyName={agencyName}
                            agencyDescriptor={descriptor}
                            logoUrl={logoUrl}
                            primaryColor={normalizedHex}
                            isWhitelabel={isWhitelabelActive}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
