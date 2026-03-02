/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://visualdecompiler.com',
  generateRobotsTxt: false, // We already have a custom robots.txt
  generateIndexSitemap: false, // Single sitemap for now
  exclude: [
    '/dashboard/*',
    '/app',
    '/api/*',
    '/_next/*',
    '/share/private/*',
    '/server-sitemap.xml',
  ],
  // Transform function to set priority and changefreq
  transform: async (config, path) => {
    // Set higher priority for important pages
    let priority = 0.5;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/pricing' || path === '/intelligence') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/report/')) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (path.startsWith('/intelligence/briefings/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [], // We manage robots.txt manually
  },
};
