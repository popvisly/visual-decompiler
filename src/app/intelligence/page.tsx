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
        <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-20">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C1A674]">Intelligence Hub</p>
                <h1 className="mt-5 text-[clamp(52px,6.4vw,102px)] font-black uppercase text-[#FBF7EF] tracking-[-0.045em] leading-[0.9] max-w-[14ch]">
                    Intelligence <br />
                    <span className="text-white/38">Briefings.</span>
                </h1>
                <p className="mt-10 max-w-[760px] text-[#F6F1E7]/78 text-[16px] leading-[1.7]">
                    Technical deep dives into advertising forensics, trigger mechanics, and autonomous creative strategy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/intelligence/briefings/${post.slug}`}
                        className="group flex flex-col h-full bg-[#141414] rounded-3xl border border-white/10 overflow-hidden hover:border-[#BB9E7B]/40 transition-all shadow-lg hover:shadow-[#BB9E7B]/5"
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
                                <span className="text-[9px] font-bold text-[#BB9E7B] uppercase tracking-[0.2em]">
                                    {post.pillar}
                                </span>
                                <span className="text-[10px] text-white/40 font-mono">
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            <h2 className="text-xl font-medium text-[#FBF7EF] mb-3 group-hover:text-[#BB9E7B] transition-colors leading-snug">
                                {post.title}
                            </h2>

                            <p className="text-sm text-white/50 leading-relaxed mb-8 flex-1">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                                <div className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                                    {post.readingTime} Read
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#BB9E7B]/10 flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#BB9E7B]" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
