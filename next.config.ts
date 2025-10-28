import type { NextConfig } from "next";

const config: NextConfig = {
  output: 'export',

  // TAMBAHKAN BLOK INI
  images: {
    unoptimized: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};

export default config;