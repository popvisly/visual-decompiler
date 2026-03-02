import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // supports ad creatives up to 20MB
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    }
  },
  async redirects() {
    return [
      {
        source: '/lexicon',
        destination: '/docs',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
