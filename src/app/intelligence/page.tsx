import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Metadata } from 'next';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';

export const metadata: Metadata = {
    title: 'Intelligence Briefings | Visual Decompiler',
    description: 'Technical deep dives into AI-driven advertising forensics, market pulse analysis, and agency sovereignty.',
};

export default async function IntelligenceIndex() {
    const posts = await getAllPosts();
    const siteUrl = 'https://www.visualdecompiler.com';

    const collectionJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Intelligence Briefings',
        description: 'Decision-ready briefings on visual DNA, structural signals, and approval-critical execution patterns.',
        url: `${siteUrl}/intelligence`,
        mainEntity: {
            '@type': 'ItemList',
            itemListOrder: 'https://schema.org/ItemListOrderDescending',
            numberOfItems: posts.length,
            itemListElement: posts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${siteUrl}/intelligence/briefings/${post.slug}`,
                item: {
                    '@type': 'Article',
                    headline: post.title,
                    description: post.excerpt,
                    datePublished: new Date(post.publishedAt).toISOString(),
                    url: `${siteUrl}/intelligence/briefings/${post.slug}`,
                },
            })),
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
            />

            <MarketingPageHeader
                kicker="Strategic Briefings"
                title="The Reading Room."
                description="Decision-ready briefings on visual DNA, structural signals, and approval-critical execution patterns."
                sectionClassName="pt-0 pb-20 lg:pb-24"
            />

            <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/intelligence/briefings/${post.slug}`}
                            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-all hover:border-black/15 hover:shadow-md"
                        >
                            {post.imageUrl ? (
                                <div className="relative aspect-[16/10] overflow-hidden bg-[#FBFBF6]">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                <div className="relative flex aspect-[16/10] items-center justify-center border-b border-black/5 bg-[#FBFBF6]">
                                    <Sparkles className="h-8 w-8 text-black/10" />
                                </div>
                            )}

                            <div className="flex flex-1 flex-col p-8">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B6A3D]/80">
                                        {post.pillar}
                                    </span>
                                    <span className="font-mono text-[10px] text-[#8A8A84]">
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>

                                <h2 className="mb-3 text-xl font-semibold leading-snug text-[#141414] transition-colors group-hover:text-[#8B6A3D]">
                                    {post.title}
                                </h2>

                                <p className="mb-8 flex-1 text-sm leading-relaxed text-[#6B6B6B]">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
                                    <div className="text-[10px] font-medium uppercase tracking-widest text-[#8A8A84]">
                                        {post.readingTime} Read
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBFBF6] transition-colors group-hover:bg-[#8B6A3D]/10">
                                        <ArrowRight className="h-3.5 w-3.5 text-[#8A8A84] transition-colors group-hover:text-[#8B6A3D]" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
