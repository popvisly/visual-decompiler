import { notFound } from 'next/navigation';
import { getSharedLink } from '@/lib/sharing';
import AdDetailClient from '@/components/AdDetailClient';
import BriefGenerator from '@/components/BriefGenerator';
import ClientComments from '@/components/ClientComments';
import PasswordGuard from '@/components/PasswordGuard';
import ExportButton from '@/components/ExportButton';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { Printer } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SharedPortalPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Check Authorization
    const cookieStore = await cookies();
    const isAuthorized = cookieStore.get(`portal_auth_${slug}`)?.value === 'true';

    const link = await getSharedLink(slug, isAuthorized);

    if (!link) notFound();

    // If protected and not authorized, show the guard
    if (link.hasPassword && !isAuthorized) {
        return <PasswordGuard slug={slug} orgBranding={link.org_settings} />;
    }

    // If link is null after password check, it means it was protected and password was wrong or not provided.
    // This check is redundant if getSharedLink already handles unauthorized access by returning null.
    // However, if getSharedLink returns a link object even if unauthorized (but hasPassword is true),
    // then the PasswordGuard handles it. If getSharedLink returns null for unauthorized, this check is fine.
    // Given the current logic, this `if (!link) notFound();` is a duplicate of the one above the password guard.
    // Removing it for clarity, assuming the first `if (!link) notFound();` covers all cases where `link` is null.
    // If `getSharedLink` can return null *after* the password check (e.g., if the link was deleted),
    // then this line should remain. For now, I'll keep it as per the original code's structure.
    // Re-evaluating: The instruction snippet removes this line. I will follow the instruction.
    // Original code had `if (!link) notFound();` twice. The instruction snippet removes the second one.
    // I will remove the second `if (!link) notFound();` as per the instruction.

    const orgSettings = link.org_settings;
    const settings = link.settings;

    // White-labeling context
    const brandStyles = {
        '--accent-color': orgSettings?.primary_color || '#BB9E7B',
    } as React.CSSProperties;

    // Render Board View
    if (link.board_id) {
        const { data: boardItems } = await supabaseAdmin
            .from('board_items')
            .select('ad_digests(*)')
            .eq('board_id', link.board_id);

        const ads = boardItems?.map((i: any) => i.ad_digests) || [];

        return (
            <div className="min-h-screen bg-[#FBF7EF]" style={brandStyles}>
                {/* Fixed White-Label Header */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-[#E7DED1] px-4 md:px-6 py-4 flex items-center justify-between no-print">
                    <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                        {orgSettings?.logo_url ? (
                            <img src={orgSettings.logo_url} alt="Agency Logo" className="h-6 md:h-8 w-auto grayscale" />
                        ) : (
                            <div className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Strategic Lab</div>
                        )}
                        <div className="h-4 w-px bg-[#E7DED1] hidden md:block" />
                        <span className="text-[9px] md:text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em] truncate max-w-[120px] md:max-w-[200px]">
                            {link.board.name}
                        </span>
                    </div>
                    <ExportButton />
                </header>

                <main className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24 space-y-16 md:space-y-24">
                    {/* Board Header */}
                    <div className="pb-8 md:pb-16 border-b border-[#E7DED1]">
                        <h1 className="text-4xl md:text-7xl font-light text-[#141414] tracking-tightest uppercase leading-[0.9] md:leading-[0.85]">
                            Strategic<br />
                            <span className="text-[#6B6B6B]/30">Intelligence</span>
                        </h1>
                        <p className="text-[10px] md:text-[12px] text-[#6B6B6B] mt-4 md:mt-6 font-bold tracking-[0.3em] uppercase">Private Briefing / {orgSettings?.custom_domain || 'visual-decompiler.com'}</p>
                        {link.board.description && (
                            <p className="text-lg md:text-xl text-[#141414]/70 mt-8 md:mt-12 max-w-3xl leading-relaxed italic">
                                {link.board.description}
                            </p>
                        )}
                    </div>

                    {/* Brief Section (pinned to top) */}
                    {settings.show_brief && (
                        <section className="ad-card">
                            <BriefGenerator
                                boardId={link.board_id}
                                boardName={link.board.name}
                                isShared={true}
                                initialBrief={link.board.strategic_answer || link.board.last_brief}
                                sampleAd={ads[0]}
                            />
                        </section>
                    )}

                    {/* Ad List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {ads.map((ad: any) => (
                            <div key={ad.id} className="group cursor-pointer ad-card">
                                <div className="aspect-[3/4] relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-[#E7DED1] bg-white shadow-xl shadow-black/[0.02] transition-all group-hover:shadow-2xl group-hover:scale-[1.02]">
                                    <img src={ad.media_url} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent pt-[50%] px-4 md:px-6 pb-6 flex flex-col justify-end">
                                        <p className="text-[9px] md:text-[10px] font-bold text-accent uppercase tracking-widest mb-1 md:mb-2">{ad.brand || ad.brand_guess}</p>
                                        <h3 className="text-lg md:text-xl font-light text-white uppercase leading-tight">{ad.digest?.extraction?.on_screen_copy?.primary_headline || 'Untitled'}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Client Deliberation Section */}
                    <div id="client-deliberation-section" className="pt-16 md:pt-24 border-t border-[#E7DED1] no-print">
                        <div className="max-w-4xl mx-auto">
                            <ClientComments slug={slug} />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Render Single Ad View
    if (link.ad_digest_id) {
        return (
            <div className="min-h-screen bg-[#FBF7EF]" style={brandStyles}>
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-[#E7DED1] px-4 md:px-6 py-4 flex items-center justify-between no-print">
                    <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                        {orgSettings?.logo_url ? (
                            <img src={orgSettings.logo_url} alt="Agency Logo" className="h-6 md:h-8 w-auto grayscale" />
                        ) : (
                            <div className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Strategic Lab</div>
                        )}
                        <div className="h-4 w-px bg-[#E7DED1] hidden md:block" />
                        <span className="text-[9px] md:text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em]">Deconstruction Report</span>
                    </div>
                    <ExportButton />
                </header>
                <div className="pt-20 md:pt-24 print:pt-0">
                    <AdDetailClient
                        ad={link.ad_digest}
                        digest={link.ad_digest.digest}
                        relatedAds={[]}
                        isShared={true}
                    />
                </div>
            </div>
        );
    }

    notFound();
}
