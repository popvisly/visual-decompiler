'use client';

import { useState, useEffect } from 'react';
import { Settings, Image, Palette, CheckCircle2, Loader2, Save, Link2, Plus, Trash2, Globe, ShieldCheck, Users } from 'lucide-react';

export default function SettingsClient() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [webhooks, setWebhooks] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [verifyingDomain, setVerifyingDomain] = useState(false);
    const [domainStatus, setDomainStatus] = useState<string | null>(null);
    const [newWebhook, setNewWebhook] = useState({ url: '' });
    const [isAddingWebhook, setIsAddingWebhook] = useState(false);
    const [settings, setSettings] = useState({
        logo_url: '',
        primary_color: '#BB9E7B',
        white_label_enabled: false,
        custom_domain: ''
    });

    useEffect(() => {
        Promise.all([
            fetch('/api/org/settings').then(res => res.json()),
            fetch('/api/webhooks').then(res => res.json()),
            fetch('/api/org/members').then(res => res.json())
        ]).then(([data, hooks, memberData]) => {
            if (data && !data.error) {
                setSettings({
                    logo_url: data.logo_url || '',
                    primary_color: data.primary_color || '#BB9E7B',
                    white_label_enabled: data.white_label_enabled || false,
                    custom_domain: data.custom_domain || ''
                });
                if (data.custom_domain) setDomainStatus('verified'); // Assume verified if already saved for now
            }
            if (Array.isArray(hooks)) {
                setWebhooks(hooks);
            }
            if (Array.isArray(memberData)) {
                setMembers(memberData);
            }
            setLoading(false);
        });
    }, []);

    const verifyDomain = async () => {
        if (!settings.custom_domain) return;
        setVerifyingDomain(true);
        setDomainStatus('propagation_pending');

        try {
            const res = await fetch('/api/org/settings/verify-domain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain: settings.custom_domain })
            });
            const data = await res.json();
            setDomainStatus(data.status);
        } catch (err) {
            console.error('Domain verification failed:', err);
            setDomainStatus('unverified');
        } finally {
            setVerifyingDomain(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccess(false);
        try {
            const res = await fetch('/api/org/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const addWebhook = async () => {
        if (!newWebhook.url) return;
        setIsAddingWebhook(true);
        try {
            const res = await fetch('/api/webhooks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newWebhook)
            });
            const data = await res.json();
            if (data.id) {
                setWebhooks([...webhooks, data]);
                setNewWebhook({ url: '' });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsAddingWebhook(false);
        }
    };

    const deleteWebhook = async (id: string) => {
        try {
            const res = await fetch(`/api/webhooks?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setWebhooks(webhooks.filter(h => h.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-accent/40" />
            </div>
        );
    }

    return (
        <div className="py-12">
            {/* Header - Editorial Style */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-[#E7DED1] mb-16">
                <div>
                    <h2 className="text-7xl font-light text-[#141414] tracking-tightest uppercase leading-[0.85] select-none">
                        Agency<br />
                        <span className="text-[#6B6B6B]/30">Control</span>
                    </h2>
                    <p className="text-[12px] text-[#6B6B6B] mt-6 font-bold tracking-[0.3em] uppercase">Organization Intelligence Hub / Brand Identity</p>
                </div>
                <div className="flex items-center gap-4 text-[#6B6B6B]">
                    <ShieldCheck className="w-5 h-5 opacity-30" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise Access</span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-20">
                <div className="xl:col-span-12 space-y-20">
                    {/* Branding Section */}
                    <div className="space-y-10">
                        <p className="text-[12px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] px-2">Visual Identity</p>

                        <div className="space-y-6">
                            <div className="bg-white p-10 rounded-[3rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.02)]">
                                <div className="flex items-center gap-3 mb-8 text-[#141414]">
                                    <Image className="w-5 h-5 text-accent" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Signature Mark</h3>
                                </div>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Logo URL (https://...)"
                                        className="w-full bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all hover:border-[#BB9E7B]/50"
                                        value={settings.logo_url}
                                        onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                                    />
                                    <p className="text-[11px] text-[#6B6B6B] leading-relaxed px-2">
                                        Upload your agency logo to replace the "V" icon on public reports and dashboards.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-[3rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.02)]">
                                <div className="flex items-center gap-3 mb-8 text-[#141414]">
                                    <Palette className="w-5 h-5 text-accent" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Accent Palette</h3>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <div className="relative group">
                                        <input
                                            type="color"
                                            className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-none"
                                            value={settings.primary_color}
                                            onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                                        />
                                        <div className="absolute inset-0 rounded-2xl border-2 border-white/20 pointer-events-none group-hover:border-white/40 transition-all" />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            className="w-full bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl px-6 py-4 text-sm uppercase font-mono tracking-widest"
                                            value={settings.primary_color}
                                            onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-[3rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.02)]">
                                <div className="flex items-center gap-3 mb-8 text-[#141414]">
                                    <Globe className="w-5 h-5 text-accent" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Domain & Routing</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            placeholder="portal.youragency.com"
                                            className="flex-1 bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all"
                                            value={settings.custom_domain}
                                            onChange={(e) => setSettings({ ...settings, custom_domain: e.target.value })}
                                        />
                                        <button
                                            onClick={verifyDomain}
                                            disabled={verifyingDomain || !settings.custom_domain}
                                            className="px-6 py-4 bg-[#141414] text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-black transition-all disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {verifyingDomain ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <ShieldCheck className="w-4 h-4 text-accent" />}
                                            {domainStatus === 'verified' ? 'Verified' : 'Verify'}
                                        </button>
                                    </div>
                                    <p className="text-[11px] text-[#6B6B6B] leading-relaxed px-2 flex items-center gap-2">
                                        {domainStatus === 'verified' ? (
                                            <span className="text-green-600 font-bold">● Strategic routing active.</span>
                                        ) : domainStatus === 'propagation_pending' ? (
                                            <span className="text-accent font-bold animate-pulse">● Propagating through the meta-layer...</span>
                                        ) : (
                                            "Point your CNAME to laboratory.visual-decompiler.com to activate."
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-10 bg-[#141414] rounded-[3rem] text-[#FBF7EF] shadow-2xl shadow-black/20">
                                <div>
                                    <p className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-2">White-Labeling</p>
                                    <p className="text-sm opacity-50 font-light">Custom domains & proprietary portals</p>
                                </div>
                                <button
                                    onClick={() => setSettings({ ...settings, white_label_enabled: !settings.white_label_enabled })}
                                    className={`w-14 h-8 rounded-full transition-all duration-500 relative ${settings.white_label_enabled ? 'bg-accent' : 'bg-white/10'}`}
                                >
                                    <div className={`absolute top-1.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-500 ${settings.white_label_enabled ? 'left-7.5' : 'left-1.5'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 py-5 bg-[#141414] hover:bg-black text-[#FBF7EF] font-bold text-[11px] uppercase tracking-widest rounded-full shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : success ? <CheckCircle2 className="w-4 h-4 text-accent" /> : <Save className="w-4 h-4 text-accent" />}
                                {saving ? 'Registering Changes...' : success ? 'Identity Updated' : 'Save Brand Identity'}
                            </button>

                            {settings.white_label_enabled && (
                                <button
                                    className="px-10 py-5 bg-white border border-[#E7DED1] text-[#141414] font-bold text-[11px] uppercase tracking-widest rounded-full shadow-xl hover:border-accent transition-all active:scale-95 group"
                                >
                                    <ShieldCheck className="w-4 h-4 text-accent inline-block mr-2 group-hover:scale-110 transition-transform" />
                                    Provision Laboratory
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="space-y-10">
                        <p className="text-[12px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] px-2">Agency Personnel</p>
                        <div className="bg-white p-12 rounded-[3.5rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)]">
                            <div className="flex items-center gap-3 mb-10 text-[#141414]">
                                <Users className="w-5 h-5 text-accent" />
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Strategist Access</h3>
                            </div>

                            <div className="space-y-4">
                                {members.length > 0 ? members.map((member) => (
                                    <div key={member.user_id} className="flex items-center justify-between p-6 bg-[#FBF7EF] rounded-[2rem] border border-[#E7DED1]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent overflow-hidden">
                                                {member.avatar_url ? <img src={member.avatar_url} className="w-full h-full object-cover" /> : member.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-[#141414] uppercase tracking-wide">{member.name || 'Anonymous Strategist'}</p>
                                                <p className="text-[9px] text-[#6B6B6B] uppercase tracking-widest opacity-60">{member.role} / {member.email}</p>
                                            </div>
                                        </div>
                                        <span className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white border border-[#E7DED1] rounded-lg text-accent">Active</span>
                                    </div>
                                )) : (
                                    <div className="py-12 text-center border-2 border-dashed border-[#E7DED1] rounded-[2.5rem]">
                                        <p className="text-[11px] text-[#6B6B6B] uppercase font-bold tracking-[0.3em] opacity-40">No team members synced</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Webhooks Section */}
                    <div className="space-y-10">
                        <div className="flex items-center justify-between px-2">
                            <p className="text-[12px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Real-time Outbound</p>
                            <Globe className="w-5 h-5 text-[#E7DED1]" />
                        </div>

                        <div className="bg-white p-12 rounded-[3.5rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)]">
                            <div className="flex items-center gap-3 mb-10 text-[#141414]">
                                <Link2 className="w-5 h-5 text-accent" />
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Strategy Webhooks</h3>
                            </div>

                            <div className="space-y-6 mb-12">
                                {webhooks.map((hook) => (
                                    <div key={hook.id} className="flex items-center justify-between p-6 bg-[#FBF7EF] rounded-[2rem] border border-[#E7DED1] group hover:border-[#BB9E7B]/50 transition-all">
                                        <div className="overflow-hidden">
                                            <p className="text-[11px] font-mono text-[#141414] truncate pr-8">{hook.url}</p>
                                            <div className="flex gap-2 mt-3">
                                                {hook.event_types.map((et: string) => (
                                                    <span key={et} className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white border border-[#E7DED1] rounded-lg text-[#6B6B6B]">
                                                        {et.replace('_', ' ')}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteWebhook(hook.id)}
                                            className="p-3 text-[#E7DED1] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                {webhooks.length === 0 && (
                                    <div className="py-16 text-center border-2 border-dashed border-[#E7DED1] rounded-[2.5rem]">
                                        <p className="text-[11px] text-[#6B6B6B] uppercase font-bold tracking-[0.3em] opacity-40">No active outbound hooks</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="https://your-crm.com/webhook"
                                    className="flex-1 bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all hover:border-[#BB9E7B]/50"
                                    value={newWebhook.url}
                                    onChange={(e) => setNewWebhook({ url: e.target.value })}
                                />
                                <button
                                    onClick={addWebhook}
                                    disabled={isAddingWebhook || !newWebhook.url}
                                    className="p-4 bg-[#141414] text-white rounded-2xl hover:bg-black transition-all disabled:opacity-50 shadow-xl"
                                >
                                    {isAddingWebhook ? <Loader2 className="w-5 h-5 animate-spin text-accent" /> : <Plus className="w-5 h-5 text-accent" />}
                                </button>
                            </div>
                            <p className="text-[11px] text-[#6B6B6B] leading-relaxed mt-6 px-2">
                                Pipe real-time strategic intelligence directly to Slack, Discord, or your internal CRM when a deconstruction completes or a <span className="text-[#141414] font-bold italic">strategic shift</span> is detected.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
