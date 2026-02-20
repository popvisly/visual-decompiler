import type { NextConfig } from 'next';

// Ensure the ffmpeg-static binary is included in Vercel serverless output.
// Without this, Next's output file tracing can omit the binary and you'll see:
// "No such file or directory" at runtime.
const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    // Route handlers
    '/api/ingest': ['./node_modules/ffmpeg-static/**'],
    '/api/worker': ['./node_modules/ffmpeg-static/**', './artifacts/**'],
  },
};

export default nextConfig;
