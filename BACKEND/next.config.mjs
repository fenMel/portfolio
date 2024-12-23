/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'source-map'; // Active les source maps uniquement en développement
    }
    return config;
  },
};

export default nextConfig;
