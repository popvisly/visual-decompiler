'use client';

import { useState } from 'react';
import { Share2, Check, Loader2, Lock } from 'lucide-react';

interface AdShareButtonProps {
    adId: string;
}

export default function AdShareButton({ adId }: AdShareButtonProps) {
    const [generating, setGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [slug, setSlug] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const handleShare = async () => {
        if (slug) {
            const url = `${window.location.origin}/share/${slug}`;
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            return;
        }

        setGenerating(true);
        try {
            const res = await fetch('/api/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adDigestId: adId, password })
            });
            const data = await res.json();
            if (data.slug) {
                setSlug(data.slug);
                const url = `${window.location.origin}/share/${data.slug}`;
                navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Sharing failed:', err);
        } finally {
            setGenerating(false);
        }
    };

    const copyToClipboard = async (slug: string) => {
        const url = `${window.location.origin}/share/${slug}`;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-2 items-end">
            {!slug && (
                <div className="flex items-center gap-2">
                    {showPasswordInput && (
                        <input
                            type="password"
                            placeholder="Set code"
                            className="bg-white border border-[#E7DED1] rounded-lg px-3 py-1 text-[10px] focus:outline-none focus:border-accent transition-all animate-in slide-in-from-right-1 duration-300 w-24"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}
                    <button
                        onClick={() => setShowPasswordInput(!showPasswordInput)}
                        className={`p-2 rounded-lg border transition-all ${showPasswordInput ? 'border-accent text-accent' : 'border-[#E7DED1] text-[#6B6B6B] hover:text-[#141414]'}`}
                        title="Add Strategic Security"
                    >
                        <Lock className="w-3 h-3" />
                    </button>
                </div>
            )}

            <button
                onClick={handleShare}
                disabled={generating}
                className={`flex items-center gap-2 px-6 py-2 bg-white border border-[#E7DED1] rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-accent transition-all shadow-xl shadow-black/[0.02] active:scale-95 group min-w-[140px] justify-center`}
            >
                {generating ? (
                    <Loader2 className="w-3 h-3 animate-spin text-accent" />
                ) : copied ? (
                    <Check className="w-3 h-3 text-green-600" />
                ) : (
                    <Share2 className="w-3 h-3 text-accent group-hover:scale-110 transition-transform" />
                )}
                <span className="text-[#141414]">
                    {generating ? 'Drafting...' : copied ? 'Copied' : slug ? 'Copy Link' : 'Share Report'}
                </span>
            </button>
        </div>
    );
}
