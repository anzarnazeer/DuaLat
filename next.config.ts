import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/shop',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
