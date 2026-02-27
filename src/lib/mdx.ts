import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content/briefings');

export type PostMeta = {
    slug: string;
    title: string;
    publishedAt: string;
    excerpt: string;
    pillar: string;
    author: string;
    readingTime: string;
    imageUrl?: string;
};

export type Post = {
    meta: PostMeta;
    content: string;
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const fullPath = path.join(contentDir, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { data, content } = matter(fileContents);

        return {
            meta: {
                slug,
                title: data.title,
                publishedAt: data.publishedAt,
                excerpt: data.excerpt,
                pillar: data.pillar,
                author: data.author,
                readingTime: data.readingTime,
                imageUrl: data.imageUrl,
            },
            content,
        };
    } catch (e) {
        return null;
    }
}

export async function getAllPosts(): Promise<PostMeta[]> {
    if (!fs.existsSync(contentDir)) {
        return [];
    }

    const files = fs.readdirSync(contentDir);

    const posts = files
        .filter(file => file.endsWith('.mdx'))
        .map(file => {
            const fullPath = path.join(contentDir, file);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug: file.replace('.mdx', ''),
                title: data.title,
                publishedAt: data.publishedAt,
                excerpt: data.excerpt,
                pillar: data.pillar,
                author: data.author || 'Visual Decompiler',
                readingTime: data.readingTime || '5 min',
                imageUrl: data.imageUrl,
            };
        })
        .sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));

    return posts;
}
