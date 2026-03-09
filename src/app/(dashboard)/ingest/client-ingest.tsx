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
                className="min-h-screen w-full flex items-center justify-center p-8 bg-[#FBFBF6] relative overflow-hidden"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* 2.5% Geometric Grid Overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:40px_40px]" />

                <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
                    {/* Page Title Protocol */}
                    <div className="text-center mb-16 border-b border-[#D4A574]/20 pb-8 w-full">
                        <h1 className="text-[12px] font-bold tracking-[0.5em] uppercase text-[#D4A574]">
                            [ ANALYSE AD ASSET ]
                        </h1>
                        <p className="mt-4 text-[9px] font-mono tracking-[0.3em] uppercase text-[#1A1A1A]/30">
                            Neural Ingestion & Extraction Protocol v2.5
                        </p>
                    </div>

                    {/* The Extraction Portal Card */}
                    <div
                        className={`w-full max-w-4xl aspect-[21/9] bg-[#1A1A1A] border-2 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 shadow-2xl group cursor-pointer ${
                            isDragging 
                            ? 'border-[#D4A574] bg-[#1A1A1A]/95 scale-[0.99] shadow-[0_0_50px_rgba(212,165,116,0.15)]' 
                            : 'border-[#D4A574]/30 hover:border-[#D4A574]/60'
                        }`}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <input 
                            id="file-upload"
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                    const dragEvent = {
                                        preventDefault: () => {},
                                        stopPropagation: () => {},
                                        dataTransfer: { files }
                                    } as unknown as React.DragEvent;
                                    handleDrop(dragEvent);
                                }
                            }}
                        />

                        {!isProcessing ? (
                            <div className="flex flex-col items-center gap-6 text-center px-12">
                                <span className={`text-xl md:text-2xl font-light tracking-[0.4em] uppercase transition-all duration-500 text-[#D4A574] ${isDragging ? 'scale-105 brightness-125' : 'group-hover:brightness-110'}`}>
                                    INITIATE FORENSIC EXTRACTION
                                </span>
                                
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A574]/40">
                                        Drop asset to begin deconstruction
                                    </p>
                                    <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-[#D4A574]/20">
                                        SUPPORTED ASSETS: STATIC (JPG, PNG, WEBP) • MAX FILE SIZE: 25MB
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-12">
                                <div className="relative w-24 h-24">
                                    <div className="absolute inset-0 border-[1px] border-[#D4A574]/40 animate-[spin_3s_linear_infinite]" />
                                    <div className="absolute inset-2 border-[1px] border-[#8B4513]/30 rotate-45 animate-[spin_4s_linear_infinite_reverse]" />
                                    <div className="absolute inset-4 bg-[#D4A574] animate-pulse rounded-sm" />
                                </div>
                                <span className="font-mono text-[10px] font-bold tracking-[0.4em] uppercase animate-pulse text-[#D4A574]">
                                    EXTRACTING SEMANTIC LAYERS...
                                </span>
                            </div>
                        )}

                        {/* Corner Accents */}
                        <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-[#D4A574]/20" />
                        <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-[#D4A574]/20" />
                        <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-[#D4A574]/20" />
                        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-[#D4A574]/20" />
                    </div>

                    {/* Luxury Action Node */}
                    <div className="mt-16">
                        <button
                            onClick={() => document.getElementById('file-upload')?.click()}
                            disabled={isProcessing}
                            className="flex items-center gap-6 px-12 py-5 bg-[#4A4A4A] text-white text-[11px] font-bold tracking-[0.4em] uppercase rounded-full shadow-xl hover:bg-[#1A1A1A] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574]" />
                            [ ANALYSE ]
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
