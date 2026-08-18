/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // 👈 Yeh line Sanity ki photos ko allow karti hai
      },
    ],
  },
};

module.exports = nextConfig; // (Agar .mjs file hai toh `export default nextConfig;` likha hoga)