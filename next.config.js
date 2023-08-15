/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
