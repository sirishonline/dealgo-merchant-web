import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  transpilePackages: ["react-hook-form"],
};

export default nextConfig;
