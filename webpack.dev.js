const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',

  // Build config
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },

  // For more options (fine tunning) we could use EvalSourceMapDevToolPlugin
  devtool: 'eval-cheap-module-source-map',
  // devtool: 'inline-source-map',

  // Dev server config
  devServer: {
    static: './build',
    port: 3000,
    historyApiFallback: true,

    // Due to a problem with spdy, this option is ignored for node >15.0.0 and above
    // http2: true,

    // In case of HTTPs support
    https: false,
    // In case of HTTPs support with custom (own) certs
    // https: {
    //   ca: './dev-certs/server.pem',
    //   pfx: './dev-certs/server.pfx',
    //   key: './dev-certs/server.key',
    //   cert: './dev-certs/server.crt',
    //   passphrase: 'xxxxx',
    //   requestCert: true,
    // },
  },

  module: {
    rules: [
      // CSS styles will be embedded
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },

  // Specific dev plugins
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: './../reports/bundle-info/dev-bundle-report.html',
      reportTitle: 'DEV Bundle Analyzer',
    }),
  ],
});
