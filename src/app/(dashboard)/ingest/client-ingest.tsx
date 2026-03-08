"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import GatekeeperIntercept from '@/components/GatekeeperIntercept';
import { supabaseClient } from '@/lib/supabase-client';

export default function IngestClient({ isSovereign }: { isSovereign: boolean }) {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showGatekeeper, setShowGatekeeper] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (!files || files.length === 0) return;

        // TIER CHECK INTERCEPT
        if (!isSovereign) {
            setShowGatekeeper(true);
            return;
        }

        // Grab first file for now (supporting CAROUSEL uploads would loop this)
        const file = files[0];
        if (!file.type.startsWith('image/')) {
            alert("Only images are supported for Ingestion currently.");
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Execute Server-Side Ingestion and Upload via Secure Route
            const formData = new FormData();
            formData.append('file', file);

            // Fetch fresh session token dynamically
            const { data: { session } } = await supabaseClient.auth.getSession();
            const token = session?.access_token;

            const res = await fetch('/api/vault-ingest', {
                method: 'POST',
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to securely upload asset');
            }

            // 5. Automatic Hand-off / Routing to the Forensic Workspace
            router.push(`/asset/${data.assetId}`);

        } catch (e) {
            const error = e as Error;
            alert(`Ingestion Pipeline Failed: ${error.message || "Unknown error occurred."}`);
            setIsProcessing(false);
        }
    }, [router]);

    return (
        <>
            <GatekeeperIntercept isVisible={showGatekeeper} onClose={() => setShowGatekeeper(false)} />
            <div
                className={`min-h-[calc(100vh-64px)] md:min-h-screen w-full flex items-center justify-center p-8 transition-colors duration-300 ${isDragging ? 'bg-white text-black' : 'bg-black text-white'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* 
        The Upload Zone
        Massive, pure center geometry. Dashed lines.
      */}
                <div
                    className={`w-full max-w-4xl aspect-video border-[1px] border-dashed flex items-center justify-center relative overflow-hidden transition-all duration-300 ${isDragging ? 'border-black scale-[0.98]' : 'border-neutral-800'
                        }`}
                >
                    {!isProcessing ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className={`text-xl md:text-3xl lg:text-5xl font-mono tracking-widest uppercase transition-transform duration-[400ms] ${isDragging ? 'scale-[1.05] drop-shadow-lg' : ''}`}>
                                Drop Asset To<br className="md:hidden" /> Initiate Extraction
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-12">
                            {/* The Same Sleek Geometric Loader from Differential Diagnostics */}
                            <div className={`relative w-24 h-24 ${isDragging ? 'invert' : ''}`}>
                                <div className="absolute inset-0 border-[1px] border-neutral-700 animate-[spin_3s_linear_infinite]" />
                                <div className="absolute inset-2 border-[1px] border-neutral-500 rotate-45 animate-[spin_4s_linear_infinite_reverse]" />
                                <div className="absolute inset-4 bg-white animate-pulse" />
                            </div>

                            <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">
                                Uplinking to Vault Storage...
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
