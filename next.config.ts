import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Increase body size limit for Server Actions to support high-quality ad images
  serverActions: {
    bodySizeLimit: '20mb', // Supports ad creatives up to 20MB
  },
  outputFileTracingIncludes: {
    // Include prompt artifacts in worker output
    '/api/worker': ['./artifacts/**'],
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
