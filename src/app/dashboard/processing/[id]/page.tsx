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
        <div className="min-h-screen bg-[#FBFBF6] flex items-center justify-center p-6 relative">
            <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(26,26,26,1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,1)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="relative z-10 w-full flex items-center justify-center">
                <ProcessingViewClient mediaUrl={ad.media_url} mediaKind={ad.media_kind} jobId={id} onComplete={undefined} />
            </div>
        </div>
    );
}
