/** @type {import('next').NextConfig} */
// https://giphy.com add
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.enix.uz",
      },
      {
        protocol: "https",
        hostname: "giphy.com",
      },
    ],
  },
};

module.exports = nextConfig;
