'use client';

import { useState, useEffect } from 'react';
import { Settings, Image, Palette, CheckCircle2, Loader2, Save } from 'lucide-react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [settings, setSettings] = useState({
        logo_url: '',
        primary_color: '#BB9E7B',
        white_label_enabled: false
    });

    useEffect(() => {
        fetch('/api/org/settings')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setSettings({
                        logo_url: data.logo_url || '',
                        primary_color: data.primary_color || '#BB9E7B',
                        white_label_enabled: !!data.white_label_enabled
                    });
                }
                setLoading(false);
            });
    }, []);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex items-center gap-3 mb-12">
                <div className="p-3 bg-[#141414] rounded-2xl shadow-xl shadow-black/10">
                    <Settings className="w-6 h-6 text-accent" />
                </div>
                <div>
                    <h2 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Organization Profile</h2>
                    <h1 className="text-4xl font-light text-[#141414] tracking-tighter uppercase leading-none">Branding & White-Label</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    {/* Logo */}
                    <div className="bg-white p-8 rounded-3xl border border-[#E7DED1] shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-[#141414]">
                            <Image className="w-4 h-4" />
                            <h3 className="text-xs font-bold uppercase tracking-widest">Brand Logo</h3>
                        </div>
                        <input
                            type="text"
                            placeholder="Logo URL (https://...)"
                            className="w-full bg-[#FBF7EF] border border-[#E7DED1] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors mb-4"
                            value={settings.logo_url}
                            onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                        />
                        <p className="text-[10px] text-[#6B6B6B] leading-relaxed">
                            Upload your agency or company logo. This will replace the "V" icon on all public sharing portals.
                        </p>
                    </div>

                    {/* Primary Color */}
                    <div className="bg-white p-8 rounded-3xl border border-[#E7DED1] shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-[#141414]">
                            <Palette className="w-4 h-4" />
                            <h3 className="text-xs font-bold uppercase tracking-widest">Accent Identity</h3>
                        </div>
                        <div className="flex gap-4 items-center">
                            <input
                                type="color"
                                className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-none"
                                value={settings.primary_color}
                                onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    className="w-full bg-[#FBF7EF] border border-[#E7DED1] rounded-xl px-4 py-2 text-sm uppercase font-mono"
                                    value={settings.primary_color}
                                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                                />
                            </div>
                        </div>
                        <p className="text-[10px] text-[#6B6B6B] leading-relaxed mt-4">
                            Override the signature gold accent with your brand color.
                        </p>
                    </div>

                    {/* Toggle */}
                    <div className="flex items-center justify-between p-6 bg-[#141414] rounded-3xl text-[#FBF7EF]">
                        <div>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">White-Labeling</p>
                            <p className="text-xs opacity-60">Enable custom domain & branding</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, white_label_enabled: !settings.white_label_enabled })}
                            className={`w-12 h-6 rounded-full transition-colors relative ${settings.white_label_enabled ? 'bg-accent' : 'bg-white/20'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.white_label_enabled ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-4 bg-[#141414] hover:bg-black text-[#FBF7EF] font-bold text-xs uppercase tracking-widest rounded-3xl shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : success ? <CheckCircle2 className="w-4 h-4 text-accent" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Updating System...' : success ? 'Settings Applied' : 'Save Brand Identity'}
                    </button>
                </div>

                {/* Preview Col */}
                <div className="relative">
                    <div className="sticky top-24">
                        <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em] mb-4 text-center">Live Preview (Mobile Portal)</p>
                        <div className="bg-[#FBF7EF] rounded-[3rem] border-8 border-[#141414] shadow-2xl overflow-hidden aspect-[9/19] w-full max-w-[280px] mx-auto">
                            <div className="h-16 border-b border-[#E7DED1] bg-white/80 flex items-center px-6">
                                {settings.logo_url ? (
                                    <img src={settings.logo_url} className="h-6 w-auto grayscale opacity-80" alt="logo" />
                                ) : (
                                    <div className="w-6 h-6 bg-[#141414] rounded-md flex items-center justify-center text-[10px] text-white">V</div>
                                )}
                            </div>
                            <div className="p-6">
                                <div
                                    className="h-1 w-12 rounded-full mb-8"
                                    style={{ backgroundColor: settings.primary_color }}
                                />
                                <div className="space-y-4">
                                    <div className="h-4 w-full bg-[#141414]/5 rounded" />
                                    <div className="h-4 w-3/4 bg-[#141414]/5 rounded" />
                                    <div className="h-32 w-full bg-[#141414]/5 rounded-2xl" />
                                    <div
                                        className="h-10 w-full rounded-xl"
                                        style={{ backgroundColor: settings.primary_color }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
