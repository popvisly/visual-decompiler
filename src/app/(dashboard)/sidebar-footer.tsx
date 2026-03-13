"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-client';

type UsageStatus = {
    usageCount: number;
    limit: number;
    percentUsed: number;
    remaining: number;
    tier: 'free' | 'pro' | 'agency';
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

    return (
        <div className="pt-8 border-t border-[#E5E5E1] flex flex-col gap-5">
            {usage && (
                <div className="rounded-[1.25rem] border border-[#E5E5E1] bg-white/70 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                        <span className="font-sans text-[9px] font-bold tracking-[0.24em] uppercase text-[#4A4A4A]">
                            Usage
                        </span>
                        <span className="font-mono text-[10px] text-[#8B4513]">
                            {usage.usageCount}/{usage.limit}
                        </span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EDE8DE]">
                        <div
                            className={`h-full rounded-full transition-all ${usage.reachedLimit ? 'bg-[#8B4513]' : 'bg-[#D4A574]'}`}
                            style={{ width: `${usage.percentUsed}%` }}
                        />
                    </div>
                    <p className="mt-3 text-[9px] font-mono uppercase tracking-[0.16em] text-[#4A4A4A]/60">
                        {usage.reachedLimit
                            ? 'Cycle limit reached. Upgrade to keep extracting.'
                            : `${usage.remaining} analyses remaining this cycle.`}
                    </p>
                </div>
            )}
            <span className="font-mono text-[9px] text-[#4A4A4A] opacity-60 hover:opacity-100 transition-opacity duration-300 truncate cursor-default" title={email}>
                {email}
            </span>
            <button
                onClick={handleDisconnect}
                className="font-sans text-[9px] font-bold tracking-[0.25em] text-[#4A4A4A] opacity-60 hover:opacity-100 transition-opacity duration-300 uppercase text-left"
            >
                [ DISCONNECT ]
            </button>
        </div>
    );
}
