'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { uploadAdMedia } from '@/lib/storage';
import { supabaseClient } from '@/lib/supabase-client';

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
    const router = useRouter();
    const [mode, setMode] = useState<'drop' | 'url'>('drop');
    const [url, setUrl] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [duplicateId, setDuplicateId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIngest = useCallback(async (mediaUrl: string) => {
        setIsUploading(true);
        setError(null);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 300000); // 300s timeout (matches Vercel maxDuration)
        
        try {
            // Dynamically fetch the cryptographic truth from Supabase client at execution time
            const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
            if (sessionError) console.warn('[UploadZone] Session fetch error:', sessionError);
            
            const token = session?.access_token;

            const res = await fetch('/api/vault-init', {
                method: 'POST',
                credentials: 'same-origin',
                signal: controller.signal,
                headers: { 
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ mediaUrl: mediaUrl.trim() }),
            });
            clearTimeout(timeoutId);
            
            const payload = await res.json().catch(() => null);
            if (!res.ok) throw new Error(payload?.error || `Ingestion failed (HTTP ${res.status})`);

            if (payload?.code === 'DUPLICATE') {
                router.push(`/asset/${payload.assetId || payload.job_id}`);
                return;
            }

            router.push(`/asset/${payload.assetId || payload.job_id}`);
        } catch (err: any) {
            clearTimeout(timeoutId);
            if (err.name === 'AbortError') {
                setError('Analysis timed out after 5 minutes. The asset may be too complex or the network is slow. Please try again.');
            } else {
                setError(err?.message || 'Failed to analyse ad.');
            }
            setIsUploading(false);
        }
    }, [router]);

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;
        handleIngest(url.trim());
    };

    const handleFile = async (file: File) => {
        setIsUploading(true);
        setError(null);
        try {
            const publicUrl = await uploadAdMedia(file);
            await handleIngest(publicUrl);
        } catch (err: any) {
            setError(err?.message || 'Failed to upload file.');
            setIsUploading(false);
        }
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
            handleFile(files[0]);
        }
    }, [handleIngest, handleFile]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => setIsDragOver(false);

    return (
        <div className="w-full max-w-2xl mx-auto page-enter">
            {/* Upload zone */}
            <div
                className={`rounded-[32px] border border-[#E5E5E1] bg-white p-12 text-center cursor-pointer transition-all ${isDragOver ? 'border-[#8B4513] shadow-md bg-[#FBFBF6]' : 'hover:border-[#D4A574]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)]'}`}
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
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                    }}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#FBFBF6] border border-[#E5E5E1] flex items-center justify-center">
                            <Loader2 className="w-6 h-6 text-[#8B4513] animate-spin" />
                        </div>
                        <p className="text-[13px] font-medium text-[#1A1A1A]">Queuing for analysis…</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-[#FBFBF6] border border-[#E5E5E1] flex items-center justify-center shadow-sm">
                            <Upload className="w-6 h-6 text-[#8B4513]/60" />
                        </div>
                        <div>
                            <p className="text-[16px] font-medium text-[#1A1A1A] tracking-tight">
                                Drag & drop an ad IMAGE here.
                            </p>
                            <p className="text-[13px] text-[#1A1A1A]/60 mt-1">
                                or paste an IMAGE URL below to initiate.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* URL input */}
            <form onSubmit={handleUrlSubmit} className="mt-6 flex flex-col gap-3">
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A]/40" />
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com/ad-creative.jpg"
                            className="w-full pl-12 pr-6 py-4 text-[14px] bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/30 border border-[#E5E5E1] rounded-full focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574] transition-all shadow-sm"
                            disabled={isUploading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isUploading || !url.trim()}
                        className="px-8 py-4 bg-[#8B4513] text-white rounded-full text-[14px] font-medium hover:-translate-y-[1px] hover:shadow-[0_12px_24px_rgba(139,69,19,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                        {isUploading ? 'Analysing…' : 'Analyse'}
                    </button>
                </div>

            </form>

            {/* Floating category pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 mb-8">
                {CATEGORY_PILLS.map((pill) => (
                    <span
                        key={pill}
                        className="
                            inline-flex items-center gap-2
                            rounded-full border border-[#E5E5E1]
                            bg-white/80 backdrop-blur
                            px-5 py-2.5
                            text-[12px] font-medium tracking-tight text-[#1A1A1A]/80
                            shadow-sm
                        "
                    >
                        {pill}
                    </span>
                ))}
            </div>

            {/* Duplicate Notice */}
            {duplicateId && (
                <div className="mt-4 p-6 bg-[#BB9E7B]/10 border border-[#BB9E7B]/30 rounded-2xl flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-[13px] font-bold text-[#BB9E7B] uppercase tracking-widest">Ad Already Analysed</p>
                        <p className="text-[12px] text-[#6B6B6B]">This creative is already in your agency library.</p>
                    </div>
                    <a
                        href={`/asset/${duplicateId}`}
                        className="px-6 py-2.5 bg-[#BB9E7B] text-white rounded-xl text-[12px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#BB9E7B]/20"
                    >
                        View Deconstruction
                    </a>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mt-4 text-center text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                    {error}
                </div>
            )}
        </div>
    );
}
