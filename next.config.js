/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
