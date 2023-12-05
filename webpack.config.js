const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const DETACHED_PANEL_PATH = './detachedPanel.html';

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    open: true,
    port: 9000,
  },
  entry: {
    app: './src/main.tsx',
    detachedPanel: './src/detachedPanel.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './assets/index.html',
      filename: './index.html',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      template: './assets/secondary-window.html',
      filename: DETACHED_PANEL_PATH,
      chunks: ['detachedPanel'],
    }),
    new webpack.DefinePlugin({
      detachedPanelPath: JSON.stringify(DETACHED_PANEL_PATH),
    }),
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:ts|tsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.json$/i,
        issuer: /\.[jt]sx?$/,
        type: 'asset/source',
      },
    ],
  },
};
