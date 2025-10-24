/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ["localhost", "images.remotePatterns"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "bqzlcpajeawshaidgnta.storage.supabase.co",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "truemarkglobalss.com",
      },
    ],
  },
  webpack: (config) => {
    // Ignore 'canvas' module since it's only used in Node environments
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      canvas: false,
    };
    return config;
  },

  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     issuer: /\.[jt]sx?$/,
  //     use: ['@svgr/webpack'],
  //   });
  //   return config;
  // },

  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(svg|pdf|woff|woff2|eot|ttf|otf)$/,
  //     issuer: /\.[jt]sx?$/,
  //     use: ['@svgr/webpack','file-loader'],
  //   });
  //   return config;
  // },

};

module.exports = nextConfig;
