/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
    ]
  },
}

module.exports = nextConfig
