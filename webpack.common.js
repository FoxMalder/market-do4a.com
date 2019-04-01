const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const distPath = path.resolve(__dirname, 'dist');

function generateHtmlPlugins(pageList) {
  return pageList.map(item => new HtmlWebpackPlugin({
    title: item.title,
    filename: `${item.filename}.html`,
    template: path.resolve(__dirname, `src/${item.filename}.pug`),
    minify: false,
    meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    // alwaysWriteToDisk: true,
  }));
}


const pageList = [
  { title: 'Главная', filename: 'index' },
  { title: 'Каталог', filename: 'catalog' },
];

module.exports = {
  entry: {
    index: './src/js/index.js',
    miniBanner: './src/scss/mini-banner.scss',
  },
  output: {
    path: distPath,
    filename: 'js/[name].js',
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
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     { loader: 'css-loader' },
      //     { loader: 'postcss-loader' },
      //     { loader: 'sass-loader' },
      //   ],
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
    new webpack.AutomaticPrefetchPlugin(),

    new HtmlWebpackPlugin({
      title: 'Мини-банер',
      filename: 'mini-banner-old.html',
      template: path.resolve(__dirname, 'src/mini-banner-old.pug'),
      minify: false,
      // inject: false,
      chunks: ['miniBanner'],
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      // alwaysWriteToDisk: true,
    }),
    // new webpack.ProvidePlugin({
    //   jQuery: 'jquery',
    //   $: 'jquery',
    //   'window.jQuery': 'jquery',
    //   'window.$': 'jquery',
    // }),
  // ].concat(generateHtmlPlugins(pageList)),
  ],
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
