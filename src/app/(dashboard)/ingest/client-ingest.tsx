"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, FileImage } from 'lucide-react';
import posthog from 'posthog-js';
import GatekeeperIntercept from '@/components/GatekeeperIntercept';
import { supabaseClient } from '@/lib/supabase-client';
import type { UsageStatus } from '@/lib/usage';
import { SECTOR_TAXONOMY, type SectorTaxonomyValue } from '@/lib/sector-taxonomy';

type StageFile = {
    file: File;
    previewUrl: string;
};

const PROCESS_STEPS = [
    {
        number: '01',
        label: 'Drop Your Ad',
        description: 'Upload any static ad asset. Print, digital, social, or out-of-home all work cleanly.',
    },
    {
        number: '02',
        label: 'Forensic Extraction',
        description: 'We decode persuasion architecture, semiotic subtext, trigger mechanics, and evidence anchors in roughly 2-3 minutes.',
    },
    {
        number: '03',
        label: 'Retrieve From Vault',
        description: 'Your completed dossier is stored in the Intelligence Vault and available as soon as processing completes.',
    },
];

function formatBytes(size: number) {
    if (size < 1024 * 1024) {
        return `${Math.round(size / 1024)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatResetDate(resetDate: string | null) {
    if (!resetDate) {
        return 'next cycle';
    }

    const date = new Date(resetDate);
    if (Number.isNaN(date.getTime())) {
        return 'next cycle';
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function resolvePlanLabel(tier?: UsageStatus['tier']) {
    if (tier === 'agency') return 'agency_sovereignty';
    if (tier === 'pro') return 'strategic_unit';
    if (tier === 'free') return 'observer';
    return 'unknown';
}

export default function IngestClient({ isSovereign }: { isSovereign: boolean }) {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showGatekeeper, setShowGatekeeper] = useState(false);
    const [stagedFile, setStagedFile] = useState<StageFile | null>(null);
    const [brandName, setBrandName] = useState('');
    const [marketSector, setMarketSector] = useState<SectorTaxonomyValue>('Luxury Fashion');
    const [error, setError] = useState<string | null>(null);
    const [usageStatus, setUsageStatus] = useState<UsageStatus | null>(null);
    const [usageLoading, setUsageLoading] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isProcessing) {
            setProgress(0);
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 95) {
                        return 95;
                    }

                    const increment = prev < 50 ? 2 : prev < 80 ? 1 : 0.5;
                    return Math.min(95, prev + increment);
                });
            }, 1500);
        }

        return () => clearInterval(interval);
    }, [isProcessing]);

    useEffect(() => {
        let isMounted = true;

        const loadUsage = async () => {
            try {
                const res = await fetch('/api/usage-status');
                if (!res.ok) {
                    return;
                }

                const data = await res.json();
                if (isMounted) {
                    setUsageStatus(data);
                }
            } catch {
                // Keep ingest resilient if usage status cannot be fetched.
            } finally {
                if (isMounted) {
                    setUsageLoading(false);
                }
            }
        };

        loadUsage();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        return () => {
            if (stagedFile) {
                URL.revokeObjectURL(stagedFile.previewUrl);
            }
        };
    }, [stagedFile]);

    const observerLimitReached = usageStatus?.tier === 'free' && usageStatus.reachedLimit;
    const isObserverTrial = usageStatus?.tier === 'free';
    const showTrialReminder = usageStatus?.tier === 'free' && usageStatus.usageCount >= 3 && !usageStatus.reachedLimit;
    const supportedAssetsLabel = 'Supports JPG, PNG, WEBP - max 25MB';
    const resetLabel = useMemo(
        () => formatResetDate(usageStatus?.billingCycleReset ?? null),
        [usageStatus?.billingCycleReset]
    );

    const stageFile = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Only JPG, PNG, and WEBP images are supported right now.');
            return;
        }

        if (stagedFile) {
            URL.revokeObjectURL(stagedFile.previewUrl);
        }

        setError(null);
        setStagedFile({
            file,
            previewUrl: URL.createObjectURL(file),
        });
    }, [stagedFile]);

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

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (!files.length) {
            return;
        }

        stageFile(files[0]);
    }, [stageFile]);

    const handleBeginExtraction = useCallback(async () => {
        if (!stagedFile) {
            return;
        }

        if (!isSovereign) {
            setShowGatekeeper(true);
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', stagedFile.file);
            if (brandName.trim()) {
                formData.append('brandName', brandName.trim());
            }
            formData.append('marketSector', marketSector);

            const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
            if (sessionError) {
                console.warn('[IngestClient] Session fetch error:', sessionError);
            }

            const token = session?.access_token;

            const res = await fetch('/api/vault-ingest', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.error || 'Failed to securely upload asset');
            }

            router.push(`/asset/${data.assetId}`);
        } catch (e) {
            const extractionError = e as Error;
            setError(extractionError.message || 'Unknown error occurred during ingestion.');
            setIsProcessing(false);
        }
    }, [brandName, isSovereign, marketSector, router, stagedFile]);

    const clearStagedAsset = useCallback(() => {
        if (stagedFile) {
            URL.revokeObjectURL(stagedFile.previewUrl);
        }

        setBrandName('');
        setMarketSector('Luxury Fashion');
        setError(null);
        setStagedFile(null);
    }, [stagedFile]);

    return (
        <>
            <GatekeeperIntercept isVisible={showGatekeeper} onClose={() => setShowGatekeeper(false)} />

            <div
                className="min-h-screen w-full bg-[#FBFBF6] relative overflow-hidden px-6 py-12 md:px-8 md:py-16"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:40px_40px]" />

                <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
                    <div className="w-full border-b border-[#D4A574]/15 pb-8 text-center md:pb-10">
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#C1A67B]">Forensic Extraction System</p>
                        <h1 className="mt-4 text-[40px] font-semibold uppercase tracking-tight text-[#1A1A1A] md:text-[64px] md:leading-[0.94]">
                            Analyse Ad Asset
                        </h1>
                        <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.24em] text-[#4A4A4A] md:text-[13px]">
                            Neural Ingestion &amp; Extraction Protocol v2.5
                        </p>
                    </div>

                    <div className="mt-12 w-full max-w-4xl">
                        {observerLimitReached ? (
                            <div className="rounded-[2rem] border border-[#D4A574]/20 bg-[#1A1A1A] p-10 text-center text-white shadow-2xl">
                                <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Observer Limit Reached</p>
                                <h2 className="mt-4 text-3xl font-light uppercase tracking-tight text-[#F5F5DC]">No further extractions this cycle</h2>
                                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
                                    You have used all available forensic extractions for your current Observer cycle. Upgrade to Strategic Unit to keep decompiling without interruption.
                                </p>
                                <div className="mt-8 flex flex-col items-center gap-4">
                                    <Link
                                        href="/pricing"
                                        className="rounded-full bg-[#D4A574] px-8 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1A1A1A] transition-all hover:bg-[#F5F5DC]"
                                    >
                                        Upgrade To Strategic Unit
                                    </Link>
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">Resets {resetLabel}</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div
                                    className={`relative overflow-hidden rounded-[2.5rem] border-2 bg-[#1A1A1A] p-8 shadow-2xl transition-all duration-500 md:p-10 ${
                                        isDragging
                                            ? 'border-[#D4A574] shadow-[0_0_50px_rgba(212,165,116,0.15)]'
                                            : 'border-[#D4A574]/25'
                                    }`}
                                    onClick={() => !isProcessing && !stagedFile && document.getElementById('file-upload')?.click()}
                                >
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                stageFile(file);
                                            }
                                        }}
                                    />

                                    <div className="absolute left-8 top-8 h-4 w-4 border-l-2 border-t-2 border-[#D4A574]/20" />
                                    <div className="absolute right-8 top-8 h-4 w-4 border-r-2 border-t-2 border-[#D4A574]/20" />
                                    <div className="absolute bottom-8 left-8 h-4 w-4 border-b-2 border-l-2 border-[#D4A574]/20" />
                                    <div className="absolute bottom-8 right-8 h-4 w-4 border-b-2 border-r-2 border-[#D4A574]/20" />

                                    {!isProcessing && !stagedFile && (
                                        <div className="flex min-h-[340px] flex-col items-center justify-center px-4 text-center">
                                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4A574]/20 bg-white/5">
                                                <FileImage className="h-7 w-7 text-[#D4A574]" />
                                            </div>
                                            <p className="mt-8 text-[22px] font-light uppercase tracking-[0.32em] text-[#D4A574] md:text-[28px]">
                                                Initiate Forensic Extraction
                                            </p>
                                            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4A574]/70">
                                                Drop asset or click to upload
                                            </p>
                                        </div>
                                    )}

                                    {!isProcessing && stagedFile && (
                                        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
                                            <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-[1.75rem] border border-[#D4A574]/20 bg-white/5">
                                                <Image
                                                    src={stagedFile.previewUrl}
                                                    alt={stagedFile.file.name}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>

                                            <div className="space-y-5">
                                                <div>
                                                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4A574]">Staged Asset</p>
                                                    <h2 className="mt-3 break-all text-xl font-light text-[#F5F5DC] md:text-2xl">{stagedFile.file.name}</h2>
                                                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/50">{formatBytes(stagedFile.file.size)}</p>
                                                </div>

                                                <div className="space-y-3">
                                                    <label htmlFor="brand-name" className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]/80">
                                                        Brand Name Reference
                                                    </label>
                                                    <input
                                                        id="brand-name"
                                                        type="text"
                                                        value={brandName}
                                                        onChange={(e) => setBrandName(e.target.value)}
                                                        placeholder="Optional, for your team's reference"
                                                        className="w-full rounded-full border border-[#D4A574]/20 bg-white/5 px-5 py-3 text-sm text-[#F5F5DC] placeholder:text-white/25 focus:border-[#D4A574]/50 focus:outline-none"
                                                    />
                                                </div>

                                                <div className="space-y-3">
                                                    <label htmlFor="market-sector" className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]/80">
                                                        Sector Taxonomy
                                                    </label>
                                                    <select
                                                        id="market-sector"
                                                        value={marketSector}
                                                        onChange={(e) => setMarketSector(e.target.value as SectorTaxonomyValue)}
                                                        className="w-full rounded-full border border-[#D4A574]/20 bg-white/5 px-5 py-3 text-sm text-[#F5F5DC] outline-none transition-colors focus:border-[#D4A574]/50"
                                                    >
                                                        {SECTOR_TAXONOMY.map((sector) => (
                                                            <option key={sector} value={sector} className="text-black">
                                                                {sector}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <p className="text-[11px] leading-relaxed text-white/45">
                                                        This locks the asset into a controlled sector taxonomy so future Mechanic Intelligence trends stay clean and comparable.
                                                    </p>
                                                </div>

                                                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                                                    <button
                                                        onClick={handleBeginExtraction}
                                                        className="rounded-full bg-[#D4A574] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1A1A1A] transition-all hover:bg-[#F5F5DC]"
                                                    >
                                                        Begin Extraction
                                                    </button>
                                                    <button
                                                        onClick={clearStagedAsset}
                                                        className="rounded-full border border-[#D4A574]/35 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A574] transition-all hover:border-[#D4A574] hover:bg-white/5"
                                                    >
                                                        Change Asset
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {isProcessing && (
                                        <div className="flex min-h-[340px] flex-col items-center justify-center gap-10">
                                            <div className="relative h-24 w-24">
                                                <div className="absolute inset-0 animate-[spin_3s_linear_infinite] border border-[#D4A574]/40" />
                                                <div className="absolute inset-2 animate-[spin_4s_linear_infinite_reverse] border border-[#8B4513]/30 rotate-45" />
                                                <div className="absolute inset-4 rounded-sm bg-[#D4A574] animate-pulse" />
                                            </div>

                                            <div className="max-w-md space-y-5 text-center">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Extracting Semantic Layers</p>
                                                <div className="w-full overflow-hidden rounded-full bg-[#D4A574]/15">
                                                    <div
                                                        className="h-2 bg-gradient-to-r from-[#8B4513] to-[#D4A574] transition-all duration-1000 ease-out"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.18em] text-[#D4A574]/55">
                                                    <span>Deconstructing</span>
                                                    <span>{Math.floor(progress)}%</span>
                                                </div>
                                                <p className="text-sm leading-relaxed text-white/65">
                                                    Analysing takes roughly 2-3 minutes. Your completed report will be waiting in the Vault.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <p className="mt-4 text-center text-[12px] text-[#6A6A6A]">{supportedAssetsLabel}</p>
                            </>
                        )}

                        {error && (
                            <div className="mt-5 flex items-start gap-3 rounded-[1.5rem] border border-red-500/20 bg-red-500/8 px-5 py-4 text-sm text-red-700">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {!observerLimitReached && (
                            <div className="mt-6 rounded-[1.5rem] border border-[#D4A574]/15 bg-white/80 px-5 py-5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C1A67B]">Best first move</p>
                                <div className="mt-4 grid gap-4 md:grid-cols-3">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A7B64]">Best first upload</p>
                                        <p className="mt-2 text-[14px] leading-6 text-[#4A4A4A]">
                                            Your current concept or the latest client ad you need to review today.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A7B64]">What you&apos;ll get in try #1</p>
                                        <p className="mt-2 text-[14px] leading-6 text-[#4A4A4A]">
                                            Primary mechanic, friction profile, and a strategic move your team can act on immediately.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A7B64]">What to do next</p>
                                        <p className="mt-2 text-[14px] leading-6 text-[#4A4A4A]">
                                            Compare it against a second route, then save the best result into a board.
                                        </p>
                                    </div>
                                </div>
                                {!stagedFile && !isProcessing && (
                                    <button
                                        onClick={() => {
                                            posthog.capture('trial_run_first_analysis_click', {
                                                surface: 'ingest',
                                                step: 'try_1',
                                                plan: resolvePlanLabel(usageStatus?.tier),
                                                href: '/ingest',
                                            });
                                            document.getElementById('file-upload')?.click();
                                        }}
                                        className="mt-5 inline-flex items-center rounded-full border border-[#D4A574]/25 bg-[#FBFBF6] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#5F4724] transition hover:border-[#D4A574]/45 hover:bg-white"
                                    >
                                        Run First Analysis
                                    </button>
                                )}
                            </div>
                        )}

                        {!usageLoading && usageStatus && (
                            <div className="mt-6 rounded-[1.5rem] border border-[#D4A574]/15 bg-white/70 px-5 py-4">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C1A67B]">
                                            {isObserverTrial ? 'Trial Progress' : 'Usage Status'}
                                        </p>
                                        <p className="mt-2 text-sm text-[#4A4A4A]">
                                            {usageStatus.usageCount} of {usageStatus.limit} extractions used this cycle.
                                        </p>
                                    </div>
                                    {isObserverTrial && (
                                        <div className="grid gap-1 text-[11px] leading-5 text-[#5B554D] md:text-right">
                                            <p>Try 1: Baseline read</p>
                                            <p>Try 2: Compare route</p>
                                            <p>Try 3: Save to board</p>
                                        </div>
                                    )}
                                </div>
                                {showTrialReminder && (
                                    <p className="mt-4 text-[12px] leading-6 text-[#4A4A4A]">
                                        You&apos;re seeing surface-level gains. Unlock full workflow: boards, compounding memory, and team collaboration.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-12 w-full max-w-5xl">
                        <div className="relative space-y-4 md:space-y-5">
                            <div className="pointer-events-none absolute bottom-8 left-[2.15rem] top-8 hidden w-px bg-[#D4A574]/18 md:block" />
                            {PROCESS_STEPS.map((step, index) => (
                                <div
                                    key={step.number}
                                    className="relative grid gap-4 rounded-[1.9rem] border border-[#D4A574]/15 bg-white/75 p-5 shadow-[0_12px_24px_rgba(20,20,20,0.03)] md:grid-cols-[88px_1fr] md:items-center md:p-7"
                                >
                                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A574]/20 bg-[#FBFBF6] md:h-16 md:w-16">
                                        <span className="text-[24px] font-semibold leading-none text-[#C1A67B] md:text-[28px]">{step.number}</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#1A1A1A]">{step.label}</p>
                                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4A4A4A] md:text-[15px]">
                                            {step.description}
                                        </p>
                                    </div>
                                    {index < PROCESS_STEPS.length - 1 && (
                                        <div className="ml-7 h-5 text-[#C1A67B]/65 md:hidden">↓</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
