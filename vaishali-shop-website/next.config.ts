/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This disables ESLint during production builds (e.g., on Vercel)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
