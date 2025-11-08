/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets5.lottiefiles.com',
      },
      {
        protocol: 'https',
        hostname: 'assets10.lottiefiles.com',
      },
    ],
  },
  // Empty turbopack config to silence webpack migration warning
  turbopack: {},
}

export default nextConfig