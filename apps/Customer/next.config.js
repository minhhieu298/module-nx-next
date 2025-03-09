//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
  NextFederationPlugin
} = require('@module-federation/nextjs-mf');
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  compress: true,
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 1000000, // Tăng lên 500KB để giảm số chunk
      minSize: 500000, // Đảm bảo chunk đủ lớn để hợp lý
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      },
    };
    config.module.rules.push({
      test: /\.(woff|woff2|ttf|eot|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/fonts/',
          publicPath: '/_next/static/fonts/',
        },
      },
    });
    
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
