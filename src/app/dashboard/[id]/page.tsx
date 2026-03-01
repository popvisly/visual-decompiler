import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { AdDigest } from '@/types/digest';
import { auth } from '@clerk/nextjs/server';
import { getRelatedAds } from '@/lib/search';
import AdDetailClient from '@/components/AdDetailClient';

export const dynamic = 'force-dynamic';

export default async function AdDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { userId, orgId } = await auth();
    if (!userId) notFound();

    const { data: ad, error } = await supabaseAdmin
        .from('ad_digests')
        .select('*')
        .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
        .eq('id', id)
        .single();

    if (error || !ad) notFound();

    const { normalizeDigest } = await import('@/lib/digest_normalize');
    const digest = normalizeDigest(ad.digest);
    const relatedAds = await getRelatedAds(id, userId, 4, orgId);

    // Fetch latest pulse for forecasting
    const { data: latestPulse } = await supabaseAdmin
        .from('pulse_reports')
        .select('report_text')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    return <AdDetailClient
        ad={ad}
        digest={digest}
        relatedAds={relatedAds}
        pulseText={latestPulse?.report_text || ''}
    />;
}
