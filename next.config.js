/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
module.exports = {
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "styles/index.scss";`,
  },
};
// module.exports = nextConfig
