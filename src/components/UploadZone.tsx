'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Link as LinkIcon, Loader2 } from 'lucide-react';

type UploadResult = {
    jobId: string;
    mediaUrl: string;
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
            onUploadComplete({ jobId: payload.job_id, mediaUrl: mediaUrl.trim() });
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
                className={`upload-zone rounded-2xl p-12 text-center cursor-pointer ${isDragOver ? 'drag-over' : ''}`}
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
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center pulse-accent">
                            <Loader2 className="w-7 h-7 text-accent animate-spin" />
                        </div>
                        <p className="text-sm text-txt-on-dark-muted">Queuing for analysis…</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                            <Upload className="w-7 h-7 text-txt-on-dark-muted" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-txt-on-dark">
                                Drag & drop an ad here
                            </p>
                            <p className="text-xs text-txt-on-dark-muted mt-1">
                                or paste a URL below
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* URL input */}
            <form onSubmit={handleUrlSubmit} className="mt-4 flex gap-2">
                <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-on-dark-muted" />
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/ad-creative.jpg"
                        className="w-full pl-10 pr-4 py-3 text-sm bg-white/5 text-txt-on-dark placeholder-txt-on-dark-muted border border-white/10 rounded-xl focus-accent transition-all"
                        disabled={isUploading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isUploading || !url.trim()}
                    className="px-6 py-3 bg-accent text-surface rounded-xl text-sm font-bold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed glow-accent"
                >
                    {isUploading ? 'Analyzing…' : 'Analyze'}
                </button>
            </form>

            {/* Floating category pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
                {CATEGORY_PILLS.map((pill) => (
                    <span
                        key={pill}
                        className="float-pill px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] text-txt-on-dark-muted border border-white/8 bg-white/3"
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
