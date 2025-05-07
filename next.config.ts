import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 1500000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "coinpayments.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.mds.yandex.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn1.ozone.ru",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ci.imgur.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "**",
      },
    ],
  },
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
