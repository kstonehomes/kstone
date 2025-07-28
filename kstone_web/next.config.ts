import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com","videos.pexels.com"],
  },
};

export default nextConfig;


module.exports = nextConfig;
