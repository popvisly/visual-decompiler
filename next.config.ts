import type { NextConfig } from 'next';
import { withSentryConfig } from "@sentry/nextjs";

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

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "paul-ikins",
  project: "visual-decompiler",
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
});
