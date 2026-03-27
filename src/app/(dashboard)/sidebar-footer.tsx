"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';
import { supabaseClient } from '@/lib/supabase-client';

type UsageStatus = {
    usageCount: number;
    limit: number;
    percentUsed: number;
    remaining: number;
    tier: 'free' | 'pro' | 'professional' | 'agency';
    reachedLimit: boolean;
};

export default function SidebarFooter() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('Authenticating...');
    const [usage, setUsage] = useState<UsageStatus | null>(null);

    useEffect(() => {
        async function fetchSession() {
            const { data } = await supabaseClient.auth.getUser();
            if (data?.user?.email) {
                setEmail(data.user.email);
            } else {
                setEmail('Unknown Intel Agent');
            }
        }

        async function fetchUsage() {
            try {
                const res = await fetch('/api/usage-status', { cache: 'no-store' });
                if (!res.ok) return;
                const payload = await res.json();
                setUsage(payload);
            } catch (error) {
                console.error('Failed to load usage status:', error);
            }
        }

        fetchSession();
        fetchUsage();
    }, []);

    const handleDisconnect = async () => {
        await supabaseClient.auth.signOut();
        document.cookie = 'sb-access-token=; path=/; max-age=0;';
        router.push('/login');
        router.refresh(); // Clear layout traces
    };

    const showTrialMilestones = usage?.tier === 'free';
    const showUpgradeReminder = usage?.tier === 'free' && usage.usageCount >= 3 && !usage.reachedLimit;

    return (
        <div className="flex flex-col gap-5 border-t border-[rgba(212,165,116,0.14)] pt-8">
            {usage && (
                <div className="rounded-[1.25rem] border border-[rgba(212,165,116,0.18)] bg-[#1F1F1F] px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                        <span className="font-sans text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">
                            {showTrialMilestones ? 'Trial Progress' : 'Usage'}
                        </span>
                        <span className="font-mono text-[10px] text-[#D4A574]">
                            {usage.usageCount}/{usage.limit}
                        </span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#2A2A2A]">
                        <div
                            className={`h-full rounded-full transition-all ${usage.reachedLimit ? 'bg-[#8B4513]' : 'bg-[#D4A574]'}`}
                            style={{ width: `${usage.percentUsed}%` }}
                        />
                    </div>
                    <p className="mt-3 text-[9px] font-mono uppercase tracking-[0.16em] text-[#9A9A94]">
                        {usage.reachedLimit
                            ? 'Cycle limit reached. Upgrade to keep extracting.'
                            : `${usage.remaining} analyses remaining this cycle.`}
                    </p>
                    {showTrialMilestones && (
                        <>
                            <div className="mt-4 space-y-2 rounded-[1rem] border border-[rgba(212,165,116,0.14)] bg-[#171512] px-3 py-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#D4A574]">How to use your 5</p>
                                <p className="text-[10px] leading-5 text-[#9A9A94]">Try 1: Baseline read</p>
                                <p className="text-[10px] leading-5 text-[#9A9A94]">Try 2: Compare route</p>
                                <p className="text-[10px] leading-5 text-[#9A9A94]">Try 3: Save to board</p>
                            </div>
                            <Link
                                href="/help"
                                onClick={() =>
                                    posthog.capture('trial_sidebar_how_to_use_click', {
                                        surface: 'sidebar',
                                        step: 'guidance',
                                        href: '/help',
                                    })
                                }
                                className="mt-3 inline-flex text-[9px] font-bold uppercase tracking-[0.18em] text-[#D4A574] transition hover:text-[#D7B07A]"
                            >
                                How to use your 5
                            </Link>
                        </>
                    )}
                    {showUpgradeReminder && (
                        <p className="mt-3 text-[10px] leading-5 text-[#9A9A94]">
                            You&apos;re seeing surface-level gains. Unlock boards, compounding memory, and team collaboration next.
                        </p>
                    )}
                </div>
            )}
            <span className="cursor-default truncate font-mono text-[9px] text-[#9A9A94] opacity-70 transition-opacity duration-300 hover:opacity-100" title={email}>
                {email}
            </span>
            <button
                onClick={handleDisconnect}
                className="text-left font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4A574] opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
                [ DISCONNECT ]
            </button>
        </div>
    );
}
