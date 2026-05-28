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
        sitemap: 'https://www.visualdecompiler.com/sitemap.xml',
        host: 'https://www.visualdecompiler.com',
    };
}
