import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { AdDigest } from '@/types/digest';
import { LayoutGrid, Boxes, Sparkles } from 'lucide-react';
import BriefGenerator from '@/components/BriefGenerator';

export const dynamic = 'force-dynamic';

export default async function SharedBoardPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    // 1. Fetch board by sharing token
    const { data: board, error: boardErr } = await supabaseAdmin
        .from('boards')
        .select('*')
        .eq('sharing_token', token)
        .single();

    if (boardErr || !board) notFound();

    // 1b. Fetch Org Settings (White-Label)
    let settings = null;
    if (board.org_id) {
        const { data: s } = await supabaseAdmin
            .from('org_settings')
            .select('*')
            .eq('org_id', board.org_id)
            .single();
        settings = s;
    }

    // 2. Fetch ads for this board (bypass RLS since it's a public share)
    const { data: items } = await supabaseAdmin
        .from('board_items')
        .select(`
            ad_id,
            ad_digests(*)
        `)
        .eq('board_id', board.id);

    const ads = items?.map((i: any) => i.ad_digests) || [];

    return (
        <div className="min-h-screen bg-[#FBF7EF] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#FBF7EF]">
            {settings?.primary_color && (
                <style>{`
                    :root {
                        --accent: ${settings.primary_color};
                    }
                `}</style>
            )}

            {/* Header / Presentation mode */}
            <nav className="border-b border-[#E7DED1] px-8 py-6 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {settings?.logo_url ? (
                            <img src={settings.logo_url} alt="Logo" className="h-10 w-auto object-contain" />
                        ) : (
                            <div className="w-10 h-10 bg-[#141414] rounded-xl flex items-center justify-center text-[#FBF7EF] font-black">V</div>
                        )}
                        <div>
                            <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em]">Strategic Collection</p>
                            <h1 className="text-xl font-light uppercase tracking-tight">{board.name}</h1>
                        </div>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest">Shared Intelligence Brief</p>
                        <p className="text-[11px] font-medium text-[#141414]">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-16">
                {/* Intro Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Boxes className="w-5 h-5 text-accent" />
                        <h2 className="text-xs font-bold text-[#141414] uppercase tracking-widest">Market Convergence Analysis</h2>
                    </div>
                    <p className="text-2xl font-light text-[#141414] max-w-2xl leading-relaxed">
                        {board.description || "This collection contains strategic deconstructions of key competitive assets, analyzing trigger mechanics and semiotic subtext."}
                    </p>
                </div>

                {/* The Strategic Answer (Intelligence Layer) */}
                <div className="mb-20">
                    <BriefGenerator
                        boardId={board.id}
                        boardName={board.name}
                        isShared={true}
                        initialBrief={board.strategic_answer}
                        sampleAd={ads[0]}
                    />
                </div>

                {/* Ads Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ads.map((ad: any) => {
                        const digest = ad.digest as AdDigest;
                        return (
                            <div key={ad.id} className="group bg-white rounded-3xl border border-[#E7DED1] overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="aspect-[4/3] bg-[#FBF7EF] relative overflow-hidden border-b border-[#E7DED1]">
                                    <img
                                        src={ad.media_url}
                                        alt={ad.brand || 'Ad media'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-md border border-[#E7DED1] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] text-[#141414]">
                                            {ad.brand || digest?.meta?.brand_guess}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-lg font-medium text-[#141414] mb-6 line-clamp-2 leading-tight">
                                        {digest?.extraction?.on_screen_copy?.primary_headline || 'Intelligence Brief'}
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1.5">Semiotic Subtext</p>
                                            <p className="text-xs text-[#6B6B6B] leading-relaxed italic line-clamp-3">
                                                "{digest?.strategy?.semiotic_subtext || 'Analyzing deeper symbolic meaning...'}"
                                            </p>
                                        </div>
                                        <div className="pt-4 border-t border-[#E7DED1]">
                                            <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1.5">Trigger Mechanic</p>
                                            <p className="text-xs font-semibold text-[#141414] uppercase">
                                                {digest?.classification?.trigger_mechanic || 'Pending Deconstruction'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-2">
                                        <span className="px-3 py-1 rounded-md bg-[#FBF7EF] text-[#6B6B6B] text-[9px] font-bold border border-[#E7DED1]">
                                            {digest?.classification?.claim_type}
                                        </span>
                                        <span className="px-3 py-1 rounded-md bg-[#141414] text-[#FBF7EF] text-[9px] font-bold">
                                            {digest?.classification?.offer_type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {ads.length === 0 && (
                    <div className="text-center py-40 bg-white/50 rounded-3xl border border-dashed border-[#E7DED1]">
                        <LayoutGrid className="w-12 h-12 text-[#6B6B6B] mx-auto mb-4 opacity-20" />
                        <p className="text-[#6B6B6B] font-medium">This board is currently empty.</p>
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-32 pt-16 border-t border-[#E7DED1] text-center">
                    <p className="text-[10px] text-[#6B6B6B] font-bold uppercase tracking-[0.3em]">Powered by Visual Decompiler</p>
                </footer>
            </main>
        </div>
    );
}
