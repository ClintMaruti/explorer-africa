import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        worker_threads: false,
        fs: false,
        stream: false,
        assert: false,
      },
      alias: {
        ...config.resolve.alias,
        'node:assert': 'assert',
      },
    },
  }),
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
