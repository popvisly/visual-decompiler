import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/dashboard/', '/settings/', '/boards/', '/report/', '/share/private/'],
            },
        ],
        sitemap: 'https://visualdecompiler.com/sitemap.xml',
        host: 'https://visualdecompiler.com',
    };
}
