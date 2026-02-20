'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Link as LinkIcon, Loader2, Sparkles } from 'lucide-react';

type UploadResult = {
    jobId: string;
    mediaUrl: string;
    accessLevel?: 'full' | 'limited';
};

type Props = {
    onUploadComplete: (result: UploadResult) => void;
};

const CATEGORY_PILLS = [
    'Trigger Mechanics',
    'Semiotic Subtext',
    'Narrative Framework',
    'Evidence Anchors',
    'Objection Dismantling',
    'Visual Style',
];

export default function UploadZone({ onUploadComplete }: Props) {
    const [mode, setMode] = useState<'drop' | 'url'>('drop');
    const [url, setUrl] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIngest = useCallback(async (mediaUrl: string) => {
        setIsUploading(true);
        setError(null);
        try {
            const res = await fetch('/api/ingest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mediaUrl: mediaUrl.trim() }),
            });
            const payload = await res.json().catch(() => null);
            if (!res.ok) throw new Error(payload?.error || `Ingestion failed (HTTP ${res.status})`);
            onUploadComplete({ jobId: payload.job_id, mediaUrl: mediaUrl.trim(), accessLevel: payload.access_level });
        } catch (err: any) {
            setError(err?.message || 'Failed to analyze ad.');
            setIsUploading(false);
        }
    }, [onUploadComplete]);

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;
        handleIngest(url.trim());
    };

    const loadExample = () => {
        const exampleUrl = 'https://utfs.io/f/cd1157af-412e-4b47-bfa7-a4dc7d17482f-1y.png'; // Hosted Dior image or proxy to public
        setUrl(exampleUrl);
        handleIngest(exampleUrl);
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.search.includes('example=luxury')) {
            const exampleUrl = 'https://utfs.io/f/cd1157af-412e-4b47-bfa7-a4dc7d17482f-1y.png'; // Hosted Dior image
            setUrl(exampleUrl);

            if (window.location.search.includes('autorun=1')) {
                // Trigger auto-ingest for guided demos
                handleIngest(exampleUrl);
            }
        }
    }, [handleIngest]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        // Check for URL in text data
        const droppedUrl = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
        if (droppedUrl && /^https?:\/\//i.test(droppedUrl.trim())) {
            handleIngest(droppedUrl.trim());
            return;
        }

        // Check for files
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setError('Direct file upload coming soon — for now, paste an image/video URL.');
        }
    }, [handleIngest]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => setIsDragOver(false);

    return (
        <div className="w-full max-w-2xl mx-auto page-enter">
            {/* Upload zone */}
            <div
                className={`rounded-[24px] border border-[#E7DED1] bg-[#FBF7EF] p-12 text-center cursor-pointer transition-all ${isDragOver ? 'border-[#141414] shadow-md bg-white' : 'hover:border-[#D8CCBC] hover:shadow-[0_10px_30px_rgba(20,20,20,0.05)]'}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={() => setError('Direct file upload coming soon — for now, paste a URL.')}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#F6F1E7] border border-[#E7DED1] flex items-center justify-center">
                            <Loader2 className="w-6 h-6 text-[#141414] animate-spin" />
                        </div>
                        <p className="text-[13px] font-medium text-[#6B6B6B]">Queuing for analysis…</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#F6F1E7] border border-[#E7DED1] flex items-center justify-center shadow-sm">
                            <Upload className="w-6 h-6 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-[15px] font-medium text-[#141414]">
                                Drag & drop an ad here
                            </p>
                            <p className="text-[13px] text-[#6B6B6B] mt-1">
                                or paste a URL below
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* URL input */}
            <form onSubmit={handleUrlSubmit} className="mt-4 flex flex-col gap-3">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com/ad-creative.jpg"
                            className="w-full pl-11 pr-4 py-3.5 text-[14px] bg-[#FBF7EF] text-[#141414] placeholder-[#6B6B6B]/60 border border-[#E7DED1] rounded-[16px] focus:outline-none focus:border-[#141414] focus:ring-1 focus:ring-[#141414] transition-all"
                            disabled={isUploading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isUploading || !url.trim()}
                        className="px-6 py-3.5 bg-[#141414] text-[#FBF7EF] rounded-[16px] text-[14px] font-medium hover:-translate-y-[1px] hover:shadow-[0_10px_30px_rgba(20,20,20,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                        {isUploading ? 'Analyzing…' : 'Analyze'}
                    </button>
                </div>

                <div className="flex justify-center mt-2">
                    <button
                        type="button"
                        onClick={loadExample}
                        className="inline-flex items-center gap-2 text-[12px] font-medium text-[#6B6B6B] hover:text-[#141414] transition border border-[#E7DED1] rounded-full px-4 py-1.5 bg-[#FBF7EF]/50 hover:bg-[#FBF7EF]"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Load example: Luxury/Fashion
                    </button>
                </div>
            </form>

            {/* Floating category pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-10">
                {CATEGORY_PILLS.map((pill) => (
                    <span
                        key={pill}
                        className="
                            inline-flex items-center gap-2
                            rounded-full border border-[#E7DED1]
                            bg-[#FBF7EF]/90 backdrop-blur
                            px-4 py-2
                            text-[12px] font-medium tracking-[-0.01em] text-[#141414]/80
                            shadow-sm
                        "
                    >
                        {pill}
                    </span>
                ))}
            </div>

            {/* Error */}
            {error && (
                <div className="mt-4 text-center text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                    {error}
                </div>
            )}
        </div>
    );
}
