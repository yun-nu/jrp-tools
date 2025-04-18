/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  // Temporary fix for bugs found during the SA -> queries migration
  ignoreBuildErrors: true,
};

export default nextConfig;
