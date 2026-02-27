import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Intelligence Briefings | Visual Decompiler',
    description: 'Technical deep dives into AI-driven advertising forensics, market pulse analysis, and agency sovereignty.',
};

export default async function IntelligenceIndex() {
    const posts = await getAllPosts();

    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6 font-mono text-[10px] text-accent uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" />
                    Global Strategy Desk
                </div>
                <h1 className="text-5xl md:text-7xl font-light text-[#FBF7EF] tracking-tight leading-[1.1] mb-6">
                    Intelligence <br />
                    <span className="text-white/30 italic font-serif">Briefings</span>
                </h1>
                <p className="max-w-xl text-white/50 text-lg font-light leading-relaxed">
                    Technical deep dives into advertising forensics, trigger mechanics, and autonomous creative strategy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/intelligence/briefings/${post.slug}`}
                        className="group flex flex-col h-full bg-[#141414] rounded-3xl border border-white/10 overflow-hidden hover:border-accent/40 transition-all shadow-lg hover:shadow-accent/5"
                    >
                        {post.imageUrl ? (
                            <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                        ) : (
                            <div className="relative aspect-[16/10] bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center border-b border-white/5">
                                <Sparkles className="w-8 h-8 text-white/10" />
                            </div>
                        )}

                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <span className="text-[9px] font-bold text-accent uppercase tracking-[0.2em]">
                                    {post.pillar}
                                </span>
                                <span className="text-[10px] text-white/40 font-mono">
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            <h2 className="text-xl font-medium text-[#FBF7EF] mb-3 group-hover:text-accent transition-colors leading-snug">
                                {post.title}
                            </h2>

                            <p className="text-sm text-white/50 leading-relaxed mb-8 flex-1">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                                <div className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                                    {post.readingTime} Read
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-accent" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
