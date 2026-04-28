import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Metadata } from 'next';
import NewsAggregatorFooter from '@/components/blog/NewsAggregatorFooter';

export const metadata: Metadata = {
    title: 'Intelligence Briefings | Visual Decompiler',
    description: 'Technical deep dives into AI-driven advertising forensics, market pulse analysis, and agency sovereignty.',
};

export default async function IntelligenceIndex() {
    const posts = await getAllPosts();

    return (
        <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-12">
            <div className="mb-20">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6A3D]/80">Intelligence Hub</p>
                <h1 className="mt-5 text-[clamp(52px,6.4vw,102px)] font-black uppercase text-[#141414] tracking-[-0.045em] leading-[0.9] max-w-[14ch]">
                    Intelligence <br />
                    <span className="text-[#141414]/30">Briefings.</span>
                </h1>
                <p className="mt-10 max-w-[760px] text-[#6B6B6B] text-[16px] leading-[1.7]">
                    Decision-ready briefings on advertising structure, strategic signals, and approval-critical execution patterns.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/intelligence/briefings/${post.slug}`}
                        className="group flex flex-col h-full rounded-3xl border border-black/5 bg-white overflow-hidden hover:border-black/15 transition-all shadow-sm hover:shadow-md"
                    >
                        {post.imageUrl ? (
                            <div className="relative aspect-[16/10] overflow-hidden bg-[#FBFBF6]">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                        ) : (
                            <div className="relative aspect-[16/10] bg-[#FBFBF6] flex items-center justify-center border-b border-black/5">
                                <Sparkles className="w-8 h-8 text-black/10" />
                            </div>
                        )}

                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <span className="text-[9px] font-bold text-[#8B6A3D]/80 uppercase tracking-[0.2em]">
                                    {post.pillar}
                                </span>
                                <span className="text-[10px] text-[#8A8A84] font-mono">
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            <h2 className="text-xl font-semibold text-[#141414] mb-3 group-hover:text-[#8B6A3D] transition-colors leading-snug">
                                {post.title}
                            </h2>

                            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-8 flex-1">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
                                <div className="text-[10px] text-[#8A8A84] uppercase tracking-widest font-medium">
                                    {post.readingTime} Read
                                </div>
                                <div className="w-8 h-8 rounded-full bg-[#FBFBF6] group-hover:bg-[#8B6A3D]/10 flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3.5 h-3.5 text-[#8A8A84] group-hover:text-[#8B6A3D]" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <NewsAggregatorFooter />
        </div>
    );
}
