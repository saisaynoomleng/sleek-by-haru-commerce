import { env } from '@/lib/env/server';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      {
        protocol: 'https',
        hostname: 'nf7ak2adgjtycvcs.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
