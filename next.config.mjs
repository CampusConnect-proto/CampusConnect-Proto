/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Also ignore ESLint errors during builds to be safe
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;