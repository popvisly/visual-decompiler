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

            // Dynamically fetch the cryptographic truth from Supabase client at execution time
            const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
            if (sessionError) console.warn('[IngestClient] Session fetch error:', sessionError);
            
            const token = session?.access_token;

            const res = await fetch('/api/vault-ingest', {
                method: 'POST',
                credentials: 'same-origin',
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
                className={`min-h-[calc(100vh-64px)] md:min-h-screen w-full flex items-center justify-center p-8 transition-colors duration-300 relative overflow-hidden ${isDragging ? 'bg-[#FBFBF6] text-[#1A1A1A]' : 'bg-[#FBFBF6] text-[#1A1A1A]'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* 2% Geometric Grid Overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(212,165,116,0.05)_48px,transparent_48px),linear-gradient(90deg,rgba(212,165,116,0.05)_48px,transparent_48px)] [background-size:48px_48px]" />

                {/* 
        The Upload Zone
        Massive, pure center geometry. Dashed lines.
      */}
                <div
                    className={`w-full max-w-4xl aspect-video border-[1px] border-dashed flex items-center justify-center relative overflow-hidden transition-all duration-300 z-10 ${isDragging ? 'border-[#8B4513] scale-[0.98] bg-[#F5F5DC]/10' : 'border-[#D4A574]/30'
                        }`}
                >
                    {!isProcessing ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className={`text-xl md:text-3xl lg:text-5xl font-light tracking-[0.2em] uppercase transition-transform duration-[400ms] text-[#8B4513] ${isDragging ? 'scale-[1.05] drop-shadow-md' : ''}`}>
                                Drop Asset To<br className="md:hidden" /> Initiate Extraction
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-12">
                            {/* The Same Sleek Geometric Loader from Intelligence Pulse */}
                            <div className={`relative w-24 h-24 ${isDragging ? 'opacity-80' : ''}`}>
                                <div className="absolute inset-0 border-[1px] border-[#D4A574]/40 animate-[spin_3s_linear_infinite]" />
                                <div className="absolute inset-2 border-[1px] border-[#8B4513]/30 rotate-45 animate-[spin_4s_linear_infinite_reverse]" />
                                <div className="absolute inset-4 bg-[#8B4513] animate-pulse" />
                            </div>
 
                            <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse text-[#8B4513]">
                                Uplinking to Vault Storage...
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
