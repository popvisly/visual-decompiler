import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Metadata } from 'next';
import NewsAggregatorFooter from '@/components/blog/NewsAggregatorFooter';
import MarketingPageHeader from '@/components/marketing/MarketingPageHeader';

export const metadata: Metadata = {
    title: 'Intelligence Briefings | Visual Decompiler',
    description: 'Technical deep dives into AI-driven advertising forensics, market pulse analysis, and agency sovereignty.',
};

export default async function IntelligenceIndex() {
    const posts = await getAllPosts();

    return (
        <>
            <MarketingPageHeader
                sectionClassName="pb-20"
                kicker="Intelligence Hub"
                title={
                    <>
                        Intelligence <br />
                        <span className="text-[#141414]/30">Briefings.</span>
                    </>
                }
                description="Decision-ready briefings on advertising structure, strategic signals, and approval-critical execution patterns."
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
                                <div className="relative aspect-[16/10] border-b border-black/5 bg-[#FBFBF6] flex items-center justify-center">
                                    <Sparkles className="w-8 h-8 text-black/10" />
                                </div>
                            )}

                            <div className="flex flex-1 flex-col p-8">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <span className="text-[9px] font-bold text-[#8B6A3D]/80 uppercase tracking-[0.2em]">
                                        {post.pillar}
                                    </span>
                                    <span className="text-[10px] text-[#8A8A84] font-mono">
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>

                                <h2 className="mb-3 text-xl font-semibold leading-snug text-[#141414] transition-colors group-hover:text-[#8B6A3D]">
                                    {post.title}
                                </h2>

                                <p className="mb-8 flex-1 text-sm leading-relaxed text-[#6B6B6B]">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
                                    <div className="text-[10px] text-[#8A8A84] uppercase tracking-widest font-medium">
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

                <NewsAggregatorFooter />
            </div>
        </>
    );
}
