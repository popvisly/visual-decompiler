import { supabaseAdmin } from '@/lib/supabase';
import { AdDigest } from '@/types/digest';

export default async function AdList({ filters }: { filters: Record<string, string | undefined> }) {
    let query = supabaseAdmin
        .from('ad_digests')
        .select('*')
        .order('created_at', { ascending: false });

    // Apply filters from generated columns
    if (filters.trigger_mechanic) query = query.eq('trigger_mechanic', filters.trigger_mechanic);
    if (filters.claim_type) query = query.eq('claim_type', filters.claim_type);
    if (filters.offer_type) query = query.eq('offer_type', filters.offer_type);
    if (filters.brand_guess) query = query.ilike('brand_guess', `%${filters.brand_guess}%`);

    const { data: ads, error } = await query;

    if (error) {
        return <div className="text-red-500 font-bold p-8 bg-red-50 rounded-2xl border border-red-100">Error loading ads: {error.message}</div>;
    }

    if (!ads || ads.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No ad digests found match your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => {
                const digest = ad.digest as AdDigest;
                return (
                    <div key={ad.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col">
                        <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                            {ad.media_kind === 'video' ? (
                                <video
                                    src={ad.media_url}
                                    className="w-full h-full object-cover"
                                    muted
                                    playsInline
                                    preload="metadata"
                                />
                            ) : (
                                <img
                                    src={ad.media_url}
                                    alt={digest.meta.brand_guess || 'Ad media'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            )}
                            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-900`}>
                                    {digest.classification.trigger_mechanic}
                                </span>
                                {ad.media_kind === 'video' && (
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-sm border border-indigo-500">
                                        Video
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="p-5 flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] shrink-0">
                                    {digest.meta.brand_guess || 'Unknown Brand'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                                    {new Date(ad.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 leading-snug">
                                {digest.extraction.on_screen_copy.primary_headline || 'No Headline'}
                            </h3>
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[9px] font-bold border border-slate-100">
                                    {digest.classification.claim_type}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[9px] font-bold border border-indigo-100">
                                    {digest.classification.offer_type}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
