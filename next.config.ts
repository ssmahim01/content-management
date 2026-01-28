import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { 
    qualities: [75, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "photos.app.goo.gl", pathname: "/**" },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [{ key: "Cache-Control", value: "no-store" }],
    },
  ],
};

export default nextConfig;
