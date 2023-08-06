/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config, {isServer, dev}) => {
    if (!dev && !isServer) {
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {sourceMap: false},
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: false},
          },
        ],
      });
    }
    return config
  }
}
