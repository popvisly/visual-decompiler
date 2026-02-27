'use client';

import { useState } from 'react';
import { Share2, Check, Loader2, Lock } from 'lucide-react';

interface ShareBoardProps {
    boardId: string;
    boardName: string;
}

export default function ShareBoard({ boardId, boardName }: ShareBoardProps) {
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
                body: JSON.stringify({ boardId, password })
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

    return (
        <div className="flex flex-col items-end gap-4">
            {!slug && (
                <div className="flex flex-col items-end gap-2">
                    <button
                        onClick={() => setShowPasswordInput(!showPasswordInput)}
                        className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${showPasswordInput ? 'text-accent' : 'text-[#6B6B6B] hover:text-[#141414]'}`}
                    >
                        <Lock className="w-3 h-3" />
                        {showPasswordInput ? 'Remove Protection' : 'Add Strategic Security'}
                    </button>
                    {showPasswordInput && (
                        <input
                            type="password"
                            placeholder="Set entry code..."
                            className="bg-white border border-[#E7DED1] rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-accent transition-all animate-in slide-in-from-top-1 duration-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}
                </div>
            )}

            <button
                onClick={handleShare}
                disabled={generating}
                className={`flex items-center gap-3 px-8 py-4 ${slug ? 'bg-white border border-[#E7DED1]' : 'bg-[#141414]'} rounded-full text-[11px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-black/[0.02] active:scale-95 group min-w-[180px] justify-center`}
            >
                {generating ? (
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
                ) : copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                ) : (
                    <Share2 className={`w-4 h-4 ${slug ? 'text-[#141414]' : 'text-accent'} group-hover:scale-110 transition-transform`} />
                )}
                <span className={slug ? 'text-[#141414]' : 'text-[#FBF7EF]'}>
                    {generating ? 'Drafting...' : copied ? 'Link Copied' : slug ? 'Copy Share Link' : 'Share to Client'}
                </span>
            </button>
        </div>
    );
}
