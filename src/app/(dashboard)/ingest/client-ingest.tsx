"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import GatekeeperIntercept from '@/components/GatekeeperIntercept';

export default function IngestClient() {
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
        // For Phase 2 Demo, we actively block ingestion to showcase the monetization gate
        setShowGatekeeper(true);
        return;

        // Grab first file for now (supporting CAROUSEL uploads would loop this)
        const file = files[0];
        if (!file.type.startsWith('image/')) {
            alert("Only images are supported for Ingestion currently.");
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Upload to Supabase Storage Bucket 'vault-assets'
            const fileExt = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExt}`;
            const filePath = `ingestions/${fileName}`;

            const { error: uploadError } = await supabaseAdmin.storage
                .from('vault-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Retrieve Public URL
            const { data: publicUrlData } = supabaseAdmin.storage
                .from('vault-assets')
                .getPublicUrl(filePath);

            const publicUrl = publicUrlData.publicUrl;

            // 3. Fallback Brand (System Dummy or 'Unassigned' logic)
            // We will look for a default brand or just pick the first one from db for testing
            let targetBrandId = null;
            const { data: brands } = await supabaseAdmin.from('brands').select('id').limit(1);
            if (brands && brands.length > 0) {
                targetBrandId = brands[0].id;
            } else {
                throw new Error("No Brands found in Intelligence Vault to attach asset to.");
            }

            // 4. Create new Asset in database
            const { data: assetData, error: insertError } = await supabaseAdmin.from('assets').insert({
                brand_id: targetBrandId,
                type: 'STATIC', // Could derive from multiple drops -> CAROUSEL
                file_url: publicUrl
            }).select().single();

            if (insertError) throw insertError;

            // 5. Automatic Hand-off / Routing to the Forensic Workspace
            router.push(`/asset/${assetData.id}`);

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
