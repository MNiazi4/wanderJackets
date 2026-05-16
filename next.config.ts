import type { NextConfig } from "next";

// Allow self-signed / mismatched SSL certs when fetching from external APIs in local dev
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "my-wordpress.local" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "springgreen-magpie-852762.hostingersite.com" },
    ],
  },
  experimental: {},
};

export default nextConfig;
