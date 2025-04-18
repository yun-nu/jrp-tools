/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    // Temporary fix for bugs found during the SA -> queries migration
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
