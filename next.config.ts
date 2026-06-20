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
      },
    ],
    localPatterns: [
      {
        pathname: "/uploads/**",
      },
      {
        pathname: "/biryani*.jpeg",
      },
    ],
  },
};

export default nextConfig;
