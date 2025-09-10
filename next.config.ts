import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { crypto: false }; // Disable crypto fallback
    return config;
  },
};

export default nextConfig;
