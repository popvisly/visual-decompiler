import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

// Custom MDX Components
import SovereignCTA from '@/components/mdx/SovereignCTA';
import DeconstructionModule from '@/components/mdx/DeconstructionModule';
import LexiconLink from '@/components/mdx/LexiconLink';
import LiveMarketPulseWidget from '@/components/blog/LiveMarketPulseWidget';

const components = {
    SovereignCTA,
    DeconstructionModule,
    LexiconLink,
    h2: (props: any) => <h2 className="text-3xl font-light text-[#FBF7EF] tracking-tight mt-16 mb-6" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-medium text-accent tracking-tight mt-12 mb-4" {...props} />,
    p: (props: any) => <p className="text-lg text-white/70 leading-relaxed mb-6 font-light" {...props} />,
    ul: (props: any) => <ul className="list-disc list-outside ml-6 space-y-3 mb-8 text-lg text-white/70 font-light" {...props} />,
    li: (props: any) => <li className="pl-2 leading-relaxed" {...props} />,
    strong: (props: any) => <strong className="font-semibold text-white" {...props} />,
};

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) {
        return { title: 'Post Not Found | Visual Decompiler' };
    }
    return {
        title: `${post.meta.title} | Intelligence Briefings`,
        description: post.meta.excerpt,
    };
}

export default async function BriefingPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // JSON-LD schema markup for TechArticle / Review
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: post.meta.title,
        description: post.meta.excerpt,
        author: {
            '@type': 'Organization',
            name: post.meta.author,
        },
        datePublished: new Date(post.meta.publishedAt).toISOString(),
        publisher: {
            '@type': 'Organization',
            name: 'Visual Decompiler',
            logo: {
                '@type': 'ImageObject',
                url: 'https://visualdecompiler.com/logo.png', // Replace with real full URL later
            },
        },
    };

    return (
        <article className="max-w-7xl mx-auto px-6 relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link
                href="/intelligence"
                className="inline-flex flex-row items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] hover:text-accent transition-colors mb-12"
            >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Briefings
            </Link>

            <header className="mb-16 md:mb-24 max-w-4xl">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[9px] font-bold text-accent uppercase tracking-widest">
                        <Sparkles className="w-3 h-3" /> {post.meta.pillar}
                    </span>
                    <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
                        {new Date(post.meta.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
                        {post.meta.readingTime} Read
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-light text-[#FBF7EF] tracking-tight leading-[1.1] mb-8">
                    {post.meta.title}
                </h1>

                <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light">
                    {post.meta.excerpt}
                </p>
            </header>

            {/* Post Layout: 2 Columns on large screens (Content + Details/Pulse) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                {/* Main Content Area */}
                <div className="lg:col-span-8">
                    <main className="prose prose-invert prose-lg max-w-none prose-headings:font-light prose-h3:text-accent">
                        <MDXRemote source={post.content} components={components} />
                    </main>

                    <div className="mt-24 pt-10 border-t border-white/10">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Written by <span className="text-white">{post.meta.author}</span></span>
                            <Link href="/intelligence" className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent hover:text-white transition-colors">More Briefings</Link>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 hidden lg:block">
                    <LiveMarketPulseWidget />
                </aside>

            </div>

        </article>
    );
}
