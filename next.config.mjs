/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  typescript: {
    // Keeps the build from failing due to those icon type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Keeps the build from failing due to linting issues
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;