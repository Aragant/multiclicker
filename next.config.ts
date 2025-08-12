import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  env: {
    MULTICLICKER_API_URL: process.env.MULTICLICKER_API_URL,
  },
};

export default nextConfig;
