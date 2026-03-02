import type { NextConfig } from 'next';
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // supports ad creatives up to 20MB
  // Note: in Next 15, bodySizeLimit might have moved or is handled differently
  // but if it's unrecognized, we'll omit it for now or check experimental
  serverActions: {
    bodySizeLimit: '20mb',
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
  disableLogger: true,
  automaticVercelMonitors: true,
});
