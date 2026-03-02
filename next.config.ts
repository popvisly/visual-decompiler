import type { NextConfig } from 'next';
// Sentry temporarily disabled for launch
// import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // supports ad creatives up to 20MB
  // Note: in Next 15, bodySizeLimit might have moved or is handled differently
  // but if it's unrecognized, we'll omit it for now or check experimental
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    }
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

// Sentry wrapper temporarily disabled for launch
export default nextConfig;

// export default withSentryConfig(nextConfig, {
//   silent: true,
//   org: "paul-ikins",
//   project: "visual-decompiler",
// });
