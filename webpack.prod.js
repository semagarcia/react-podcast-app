const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const KBYTES = 1024;

module.exports = merge(common, {
  mode: 'production',

  // More info: https://webpack.js.org/configuration/devtool/
  // If we need more fine tunning, we can use SourceMapDevToolPlugin for more options
  // 'source-map' option => slowest build & rebuild, but high quality prod build w/sourcemaps
  devtool: 'source-map',

  // Build config
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: false },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: false },
          },
        ],
      },
    ],
  },

  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),

    // For production, will just generate a JSON stats file for CI purposes
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: './../reports/bundle-info/prod-bundle-report.json',
    }),
  ],

  // Further optimizations for PROD build
  optimization: {
    minimize: true,
    minimizer: [
      //
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],

    // Create a bundle for third-party deps (which could be cached for improving performance)
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  // Some performance options (allows checking and monitoring bundle size)
  performance: {
    hints: 'error', // 'warning' for less restrictive
    maxEntrypointSize: 512 * KBYTES,
    maxAssetSize: 512 * KBYTES,

    // Custom function to determine the concrete size of each asset
    // assetFilter: assetFilename => true,
  },
});
