const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackHarddiskPlugin({
    //   outputPath: path.resolve(__dirname, 'dist'),
    // }),
    new HtmlWebpackPlugin({
      title: 'Главная',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.pug'),
      minify: false,
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      // alwaysWriteToDisk: true,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    // compress: true,
    // open: true,
  },
});