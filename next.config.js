/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "em-content.zobj.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig
