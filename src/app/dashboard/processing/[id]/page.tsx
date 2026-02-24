import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import ProcessingViewClient from '@/components/ProcessingViewClient';

export const dynamic = 'force-dynamic';

export default async function ProcessingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { data: ad, error } = await supabaseAdmin
        .from('ad_digests')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !ad) notFound();

    return (
        <div className="min-h-screen bg-[#F6F1E7] flex items-center justify-center p-6">
            <ProcessingViewClient mediaUrl={ad.media_url} jobId={id} onComplete={undefined} />
        </div>
    );
}
