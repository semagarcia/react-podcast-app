const path = require('path');

module.exports = {
  stories: [
    // Paths where find stories
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    {
      name: '@storybook/preset-scss',
      options: {
        styleLoaderOptions: {
          esModule: true,
        },
        cssLoaderOptions: {
          esModule: true,
        },
        sassLoaderOptions: {
          sassOptions: {
            includePaths: [path.join(__dirname, '../src/styles')],
          },
        },
      },
    },
  ],
  staticDirs: [path.join(__dirname, '../assets/fonts')],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // add SCSS support for CSS Modules
    config.module.rules.push({
      test: /\.module\.s(a|c)ss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {},
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
      include: path.resolve(__dirname, '../src'),
    });

    return config;
  },
};
