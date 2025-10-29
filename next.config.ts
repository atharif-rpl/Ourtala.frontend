import type { NextConfig } from "next";

const config: NextConfig = {
  // output: 'export', // <-- HAPUS BARIS INI

  // Konfigurasi Anda yang lain (biarkan saja)
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