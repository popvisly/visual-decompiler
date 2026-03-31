'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { supabaseClient } from '@/lib/supabase-client';

if (typeof window !== 'undefined') {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (posthogKey && posthogHost) {
        posthog.init(posthogKey, {
            api_host: posthogHost,
            person_profiles: 'identified_only',
            capture_pageview: false,
            persistence: 'localStorage',
            autocapture: true,
        });
    }
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const cookieSecureAttr = window.location.protocol === 'https:' ? '; secure' : '';
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
            (event, session) => {
                if (session) {
                    const expiresIn = session.expires_in || 3600;
                    document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${expiresIn}; SameSite=Lax${cookieSecureAttr}`;
                } else {
                    document.cookie = `sb-access-token=; path=/; max-age=0; SameSite=Lax${cookieSecureAttr}`;
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return (
        <PostHogProvider client={posthog}>
            {children}
        </PostHogProvider>
    );
}
