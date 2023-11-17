// /** @type {import('next').NextConfig} */
//
// const nextConfig = {
//   i18n: {
//     locales: ['en', 'ru'],
//     defaultLocale: 'en',
//   },
//   env: {
//     BASE_URL: process.env.NEXT_PUBLIC_API_URL,
//   },
// }
//
// module.exports = nextConfig
/** @type {import("next").NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inctagram-pirates.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
