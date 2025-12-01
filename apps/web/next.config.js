/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@barangay/shared'],
  experimental: {
    optimizePackageImports: ['@mui/icons-material', '@mui/material'],
  },
};

module.exports = nextConfig;
