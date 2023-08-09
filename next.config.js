/** @type {import('next').NextConfig} */

const nextConfig = {};

module.exports = nextConfig;

// const path = require('path')
//
// module.exports = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//     prependData: `@import "index.scss";`
//   },
//   webpack: (config, {isServer, dev}) => {
//     if (!dev && !isServer) {
//       config.module.rules.push({
//         test: /\.scss$/,
//         use: [
//           {
//             loader: 'css-loader',
//             options: {sourceMap: false},
//           },
//           {
//             loader: 'sass-loader',
//             options: {sourceMap: false},
//           },
//         ],
//       });
//     }
//     return config
//   }
// }
