const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  // Loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      // Images: Copy image files to build folder under assets entry
      {
        test: /\.(?:ico|gif|webp|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[name].[ext]' },
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name].[ext]' },
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      'custom-hooks': path.resolve(__dirname, 'src/custom-hooks'),
      mappers: path.resolve(__dirname, 'src/mappers'),
      models: path.resolve(__dirname, 'src/models'),
      styles: path.resolve(__dirname, 'src/styles'),
      utils: path.resolve(__dirname, 'src/utils'),
      views: path.resolve(__dirname, 'src/views'),
    },
    extensions: ['*', '.js', '.jsx', '.scss', '.css'],
  },

  // Plugins config for both environments
  plugins: [
    // Clean folder
    new CleanWebpackPlugin(),

    // HTML template
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      title: 'iTunes Podcaster',
    }),
  ],
};
