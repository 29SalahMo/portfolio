import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],

  // Compress responses with gzip/br
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    // Keep device sizes tight — no need for 4K hero images
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400, // 1 day
    localPatterns: [
      { pathname: "/profile.png" },
      { pathname: "/og.png" },
      { pathname: "/og.jpg" },
      { pathname: "/og-social.png" },
    ],
  },

  // Aggressive static asset caching via response headers
  async headers() {
    return [
      {
        // Web fonts served from /public
        source: "/:path*.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Security headers for all pages
        source: "/:path((?!api/).*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
