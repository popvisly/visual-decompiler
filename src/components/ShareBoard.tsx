'use client';

import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

export default function ShareBoard({ token, boardName }: { token: string, boardName: string }) {
    const [copied, setCopied] = useState(false);

    const shareUrl = `${window.location.origin}/share/${token}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-txt-on-dark uppercase tracking-widest hover:bg-white/10 transition-all group relative"
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 text-green-400" />
                    Copied!
                </>
            ) : (
                <>
                    <Share2 className="w-4 h-4" />
                    Share to Client
                </>
            )}
        </button>
    );
}
