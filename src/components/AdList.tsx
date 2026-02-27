import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { AdDigest } from '@/types/digest';
import BrandTag from '@/components/BrandTag';
import { auth } from '@clerk/nextjs/server';
import { semanticSearch } from '@/lib/search';
import AdCardSelectable from '@/components/AdCardSelectable';

export default async function AdList({ filters }: { filters: Record<string, string | undefined> }) {
    const { userId, orgId } = await auth();
    if (!userId) return null;

    let ads: any[] = [];
    let error: any = null;

    if (filters.q) {
        // Semantic Search path
        ads = await semanticSearch(filters.q, userId, 50, orgId);

        // Post-filter the semantic results for other active filters
        if (filters.trigger_mechanic) ads = ads.filter(a => a.trigger_mechanic === filters.trigger_mechanic);
        if (filters.claim_type) ads = ads.filter(a => a.claim_type === filters.claim_type);
        if (filters.offer_type) ads = ads.filter(a => a.offer_type === filters.offer_type);
        if (filters.brand) {
            const b = filters.brand.toLowerCase();
            ads = ads.filter(a =>
                (a.brand?.toLowerCase().includes(b)) ||
                (a.brand_guess?.toLowerCase().includes(b))
            );
        }
    } else {
        // Standard SQL filter path
        let query = supabaseAdmin
            .from('ad_digests')
            .select('*')
            .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
            .order('created_at', { ascending: false });

        if (filters.trigger_mechanic) query = query.eq('trigger_mechanic', filters.trigger_mechanic);
        if (filters.claim_type) query = query.eq('claim_type', filters.claim_type);
        if (filters.offer_type) query = query.eq('offer_type', filters.offer_type);
        const res = await query;
        ads = res.data || [];
        error = res.error;

        if (filters.brand) {
            const b = filters.brand.toLowerCase();
            ads = ads.filter(a =>
                (a.brand?.toLowerCase().includes(b)) ||
                (a.brand_guess?.toLowerCase().includes(b))
            );
        }
    }

    // Handle board_id explicitly if provided (manual join for now)
    if (filters.board_id) {
        const { data: boardItems } = await supabaseAdmin
            .from('board_items')
            .select('ad_id')
            .eq('board_id', filters.board_id);

        const adIdsOnBoard = new Set(boardItems?.map((i: any) => i.ad_id) || []);
        ads = ads.filter(ad => adIdsOnBoard.has(ad.id));
    }

    if (error) {
        return <div className="text-red-400 font-bold p-8 bg-red-500/10 rounded-2xl border border-red-500/20">Error loading ads: {error.message}</div>;
    }

    if (!ads || ads.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#E7DED1] shadow-[0_10px_40px_rgba(20,20,20,0.02)]">
                <p className="text-[#141414] font-medium text-[15px] tracking-[-0.01em]">No ad digests match your filters.</p>
                <p className="text-[#6B6B6B] text-[13px] mt-1">Try adjusting your criteria or ingest new ads.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {ads.map((ad: any) => {
                const digest = ad.digest as AdDigest;
                return (
                    <AdCardSelectable
                        key={ad.id}
                        ad={{
                            id: ad.id,
                            brand: ad.brand || digest?.meta?.brand_guess || '',
                            mediaUrl: ad.media_url,
                            mediaKind: ad.media_kind || 'image',
                            digest,
                        }}
                    >
                        <Link
                            href={`/dashboard/${ad.id}`}
                            className="group bg-white rounded-xl border border-[#E7DED1] overflow-hidden flex flex-col cursor-pointer hover:border-[#D8CCBC] hover:shadow-[0_12px_40px_rgba(20,20,20,0.06)] hover:-translate-y-[2px] transition-all duration-300 shadow-[0_4px_20px_rgba(20,20,20,0.02)]"
                        >
                            {/* Media */}
                            <div className="aspect-square bg-[#FBF7EF] relative overflow-hidden flex items-center justify-center border-b border-[#E7DED1]">
                                {ad.status === 'queued' || ad.status === 'processing' ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-2 border-[#E7DED1] border-t-[#141414] rounded-full animate-spin shadow-sm" />
                                        <span className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em]">{ad.status}...</span>
                                    </div>
                                ) : ad.media_kind === 'video' ? (
                                    <video
                                        src={ad.media_url}
                                        className="w-full h-full object-cover"
                                        muted playsInline preload="metadata"
                                    />
                                ) : (
                                    <img
                                        src={ad.media_url}
                                        alt={ad.brand || digest?.meta?.brand_guess || 'Ad media'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                )}

                                {/* Overlay badges */}
                                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                    {ad.status !== 'queued' && ad.status !== 'processing' && (
                                        <span className="bg-white/80 backdrop-blur-md border border-[#E7DED1] px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] text-[#141414] shadow-sm">
                                            {digest?.classification?.trigger_mechanic || 'Analyzing…'}
                                        </span>
                                    )}
                                    {ad.media_kind === 'video' && (
                                        <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] bg-[#141414] text-[#FBF7EF] shadow-sm">
                                            Video
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Info section */}
                            <div className="p-3 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-2">
                                    <BrandTag
                                        adId={ad.id}
                                        brand={ad.brand ?? null}
                                        brandGuess={digest?.meta?.brand_guess ?? null}
                                    />
                                    <span className="text-[#6B6B6B] text-[9px] uppercase tracking-[0.1em] font-medium">
                                        {new Date(ad.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-[13px] font-medium text-[#141414] mb-3 line-clamp-2 leading-[1.3] tracking-[-0.01em]">
                                    {digest?.extraction?.on_screen_copy?.primary_headline
                                        || (ad.brand || digest?.meta?.brand_guess ? `${ad.brand || digest?.meta?.brand_guess} — Untitled` : 'Untitled')}
                                </h3>

                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                    {ad.status === 'processed' || ad.status === 'needs_review' ? (
                                        <>
                                            <span className="px-2 py-0.5 rounded-md bg-[#FBF7EF] text-[#6B6B6B] text-[9px] font-bold border border-[#E7DED1]">
                                                {digest?.classification?.claim_type}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-md bg-[#141414] text-[#FBF7EF] text-[9px] font-bold border border-[#141414]">
                                                {digest?.classification?.offer_type}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="px-2 py-0.5 rounded-md bg-[#FBF7EF] text-[#6B6B6B] text-[9px] font-bold border border-[#E7DED1] animate-pulse">
                                            Harvesting Strategic Insights…
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </AdCardSelectable>
                );
            })}
        </div>
    );
}
