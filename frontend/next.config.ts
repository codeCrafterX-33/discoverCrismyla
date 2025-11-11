import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Disable API routes since we're using external backend
  // This ensures static export works
};

export default nextConfig;
