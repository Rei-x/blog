/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // "images.unsplash.com/*"
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "static.ghost.org",
        protocol: "https",
      },
    ],
  },
  transpilePackages: ["react-daisyui"],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
