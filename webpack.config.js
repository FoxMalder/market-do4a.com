const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist');

function generateHtmlPlugins(pageList) {
  return pageList.map(item => new HtmlWebpackPlugin({
    title: item.title,
    filename: `${item.filename}.html`,
    template: path.resolve(__dirname, `src/${item.filename}.pug`),
  }));
}


const pageList = [
  { title: 'Главная', filename: 'index' },
  { title: 'Каталог', filename: 'catalog' },
];

module.exports = (env, args) => {
  // const devMode = args.mode === 'development';


  const config = {
    mode: 'development',
    entry: {
      index: './src/js/index.js',
      page: './src/index.pug',
    },
    output: {
      path: distPath,
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[name].bundle.js',
    },
    module: {
      rules: [
        // {
        //   test: /\.html$/,
        //   use: [{
        //     loader: 'html-loader',
        //     options: {
        //       minimize: false,
        //     },
        //   }],
        // },
        {
          test: /\.pug$/,
          use: [
            { loader: 'pug-loader' },
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader', options: { cacheDirectory: true } },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: {importLoaders} },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
        { // Внутри HTML
          test: /\.(gif|png|jpe?g|svg)$/i,
          include: path.resolve(__dirname, 'src/images'),
          exclude: /sprite.svg/,
          use: [
            { loader: 'file-loader', options: { name: 'images/[name].[hash].[ext]' } },
            { loader: 'image-webpack-loader' },
          ],
        },
        { // Внутри CSS
          test: /\.(gif|png|jpe?g|svg)$/i,
          include: path.resolve(__dirname, 'src/img'),
          use: [
            { loader: 'url-loader', options: { name: 'img/[name].[hash].[ext]', limit: 10 * 1024 } },
            { loader: 'image-webpack-loader' },
          ],
        },
        {
          test: /sprite.svg/,
          use: [
            { loader: 'file-loader', options: { name: 'images/[name].[hash].[ext]' } },
          ],
        },
        {
          test: /\.(eot|ttf|woff2?)$/,
          use: [
            { loader: 'file-loader', options: { name: 'fonts/[name].[hash].[ext]' } },
          ],
        },
        {
          test: require.resolve('jquery'),
          use: [
            { loader: 'expose-loader', options: 'jQuery' },
            { loader: 'expose-loader', options: '$' },
          ],
        },
        {
          test: require.resolve('sticky-js'),
          use: [
            { loader: 'expose-loader', options: 'Sticky' },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Главная',
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.pug'),
        // alwaysWriteToDisk: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      // new HtmlWebpackHarddiskPlugin({
      //   // outputPath: distPath,
      // }),
      // new webpack.ProvidePlugin({
      //   jQuery: 'jquery',
      //   $: 'jquery',
      //   'window.jQuery': 'jquery',
      //   'window.$': 'jquery',
      // }),
    ],

    devServer: {
      contentBase: './dist',
      hot: true,
    },
    // optimization: {
    //   runtimeChunk: 'single',
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\\/]node_modules[\\\/]/,
    //         name: 'vendors',
    //         chunks: 'all',
    //       },
    //     },
    //   },
    // },

    // resolve: {
    //   // options for resolving module requests
    //   // (does not apply to resolving to loaders)
    //   modules: [
    //     'node_modules',
    //     path.resolve(__dirname, 'app'),
    //   ],
    //   // directories where to look for modules
    //   extensions: ['.js', '.json', '.jsx', '.css'],
    // },
  };


  return config;
};
