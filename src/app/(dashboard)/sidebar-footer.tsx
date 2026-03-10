"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-client';

export default function SidebarFooter() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('Authenticating...');

    useEffect(() => {
        async function fetchSession() {
            const { data } = await supabaseClient.auth.getUser();
            if (data?.user?.email) {
                setEmail(data.user.email);
            } else {
                setEmail('Unknown Intel Agent');
            }
        }
        fetchSession();
    }, []);

    const handleDisconnect = async () => {
        await supabaseClient.auth.signOut();
        document.cookie = 'sb-access-token=; path=/; max-age=0;';
        router.push('/login');
        router.refresh(); // Clear layout traces
    };

    return (
        <div className="pt-8 border-t border-[#E5E5E1] flex flex-col gap-4">
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
