import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { AdDigest } from '@/types/digest';
import BrandTag from '@/components/BrandTag';

export default async function AdList({ filters }: { filters: Record<string, string | undefined> }) {
    let query = supabaseAdmin
        .from('ad_digests')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters.trigger_mechanic) query = query.eq('trigger_mechanic', filters.trigger_mechanic);
    if (filters.claim_type) query = query.eq('claim_type', filters.claim_type);
    if (filters.offer_type) query = query.eq('offer_type', filters.offer_type);
    if (filters.brand) {
        query = query.or(`brand.ilike.%${filters.brand}%,brand_guess.ilike.%${filters.brand}%`);
    }

    if (filters.q) {
        const searchTerm = `%${filters.q}%`;
        query = query.or(`
            brand.ilike.${searchTerm},
            brand_guess.ilike.${searchTerm},
            digest->extraction->on_screen_copy->>primary_headline.ilike.${searchTerm},
            digest->strategy->>target_job_to_be_done.ilike.${searchTerm},
            digest->strategy->>positioning_claim.ilike.${searchTerm},
            digest->classification->>trigger_mechanic.ilike.${searchTerm},
            digest->classification->>narrative_framework.ilike.${searchTerm},
            digest->classification->>gaze_priority.ilike.${searchTerm},
            digest->classification->>cognitive_load.ilike.${searchTerm},
            digest->strategy->>semiotic_subtext.ilike.${searchTerm},
            digest->strategy->>objection_tackle.ilike.${searchTerm}
        `.replace(/\s+/g, ''));
    }

    const { data: ads, error } = await query;

    if (error) {
        return <div className="text-red-400 font-bold p-8 bg-red-500/10 rounded-2xl border border-red-500/20">Error loading ads: {error.message}</div>;
    }

    if (!ads || ads.length === 0) {
        return (
            <div className="text-center py-20 bg-surface rounded-3xl border border-white/5">
                <p className="text-txt-on-dark-muted font-medium text-sm">No ad digests match your filters.</p>
                <p className="text-txt-on-dark-muted text-xs mt-1 opacity-50">Try adjusting your criteria or ingest new ads.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ads.map((ad: any) => {
                const digest = ad.digest as AdDigest;
                return (
                    <Link
                        key={ad.id}
                        href={`/dashboard/${ad.id}`}
                        className="group bg-surface rounded-2xl border border-white/5 overflow-hidden card-lift flex flex-col cursor-pointer hover:border-accent/20"
                    >
                        {/* Media */}
                        <div className="aspect-[4/5] bg-surface-raised relative overflow-hidden flex items-center justify-center">
                            {ad.status === 'queued' || ad.status === 'processing' ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-white/10 border-t-accent rounded-full animate-spin" />
                                    <span className="spec-label-dark">{ad.status}...</span>
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
                                    <span className="glass-dark px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] text-txt-on-dark">
                                        {digest?.classification?.trigger_mechanic || 'Analyzing…'}
                                    </span>
                                )}
                                {ad.media_kind === 'video' && (
                                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] bg-accent text-surface">
                                        Video
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Info section */}
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <BrandTag
                                    adId={ad.id}
                                    brand={ad.brand ?? null}
                                    brandGuess={digest?.meta?.brand_guess ?? null}
                                />
                                <span className="spec-label-dark">
                                    {new Date(ad.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <h3 className="text-sm font-semibold text-txt-on-dark mb-3 line-clamp-2 leading-snug">
                                {digest?.extraction?.on_screen_copy?.primary_headline || 'Intelligence Pending…'}
                            </h3>

                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                {ad.status === 'processed' || ad.status === 'needs_review' ? (
                                    <>
                                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-txt-on-dark-muted text-[9px] font-bold border border-white/5">
                                            {digest?.classification?.claim_type}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md bg-accent-muted text-accent text-[9px] font-bold border border-accent/10">
                                            {digest?.classification?.offer_type}
                                        </span>
                                    </>
                                ) : (
                                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-txt-on-dark-muted text-[9px] font-bold border border-white/5 animate-pulse">
                                        Harvesting Strategic Insights…
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
