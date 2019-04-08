const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

const distPath = path.resolve(__dirname, 'dist');

// function generateHtmlPlugins(pageList) {
//   return pageList.map(item => new HtmlWebpackPlugin({
//     title: item.title,
//     filename: `${item.filename}.html`,
//     template: path.resolve(__dirname, `src/${item.filename}.pug`),
//   }));
// }
//
//
// const pageList = [
//   { title: 'Главная', filename: 'index' },
//   { title: 'Каталог', filename: 'catalog' },
// ];

// let config = {
// }

module.exports = (env, args) => ({
  entry: {
    index: './src/js/index.js',

    // catalog: './src/catalog.pug',
  },
  output: {
    path: distPath,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: false },
        }],
      },
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
        test: /\.(sass|scss|css)$/,
        use: [
          { loader: args.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 2, sourceMap: args.mode === 'development' } },
          { loader: 'postcss-loader', options: { sourceMap: args.mode === 'development' } },
          {
            loader: 'sass-loader',
            options: { sourceMap: args.mode === 'development', implementation: require('sass') },
          },
        ],
      },
      { // Внутри HTML
        test: /\.(gif|png|jpg|jpeg|svg)$/i,
        include: path.resolve(__dirname, 'src/images'),
        exclude: /sprite.svg/,
        use: [
          { loader: 'file-loader', options: { outputPath: './images', name: '[name].[hash:8].[ext]' } },
          { loader: 'image-webpack-loader' },
        ],
      },
      { // Внутри CSS
        test: /\.(gif|png|jpg|jpeg|svg)$/i,
        include: path.resolve(__dirname, 'src/img'),
        use: [
          { loader: 'url-loader', options: { outputPath: './img', name: '[name].[hash:8].[ext]', limit: 10 * 1024 } },
          { loader: 'image-webpack-loader' },
        ],
      },
      {
        test: /sprite.svg/,
        use: [
          { loader: 'file-loader', options: { outputPath: './images', name: '[name].[hash:8].[ext]' } },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          { loader: 'file-loader', options: { outputPath: './fonts', name: '[name].[ext]' } },
        ],
      },
      {
        test: require.resolve('jquery'),
        use: [
          { loader: 'expose-loader', options: 'jQuery' },
          { loader: 'expose-loader', options: '$' },
        ],
      },
      // {
      //   test: require.resolve('sticky-js'),
      //   use: [
      //     { loader: 'expose-loader', options: 'Sticky' },
      //   ],
      // },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new CssUrlRelativePlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),

    new SVGSpritemapPlugin('src/img/svg-sprite/*.svg', {
      output: {
        filename: 'images/new-sprite.svg',
        svg: {
          // Disable `width` and `height` attributes on the root SVG element
          // as these will skew the sprites when using the <view> via fragment identifiers
          sizes: false,
        },
        svg4everybody: true,
      },
      sprite: {
        generate: {
          // Generate <use> tags within the spritemap as the <view> tag will use this
          use: true,
          view: '-fragment',

          // Generate <symbol> tags within the SVG to use in HTML via <use> tag
          symbol: true,
        },
      },
      styles: {
        // Specifiy that we want to use URLs with fragment identifiers in a styles file as well
        // format: 'fragment',

        // Path to the styles file, note that this method uses the `output.publicPath` webpack option
        // to generate the path/URL to the spritemap itself so you might have to look into that
        filename: path.join(__dirname, 'src/scss/_sprites.scss'),
        variables: {},
      },
    }),

    new HtmlWebpackPlugin({
      title: 'Главная',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.pug'),
      minify: false,
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    }),

    new HtmlWebpackPlugin({
      // alwaysWriteToDisk: true,
      title: 'Каталог',
      filename: 'catalog.html',
      template: path.resolve(__dirname, 'src/catalog.pug'),
      minify: false,
      // hash: true,
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    }),
    // new HtmlWebpackHarddiskPlugin({
    //   outputPath: distPath,
    // }),

    // new HtmlWebpackPlugin({
    //   title: 'Мини-банер',
    //   filename: 'mini-banner-old.html',
    //   template: path.resolve(__dirname, 'src/mini-banner-old.pug'),
    //   minify: false,
    //   // inject: false,
    //   chunks: ['miniBanner'],
    //   meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    //   // alwaysWriteToDisk: true,
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Мини-банер',
    //   filename: 'test-html.html',
    //   template: path.resolve(__dirname, 'src/test.html'),
    //   minify: false,
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Мини-банер',
    //   filename: 'test-ejs.html',
    //   template: path.resolve(__dirname, 'src/test.ejs'),
    //   // inject: 'body',
    //   // hash: true,
    //   // minify: false,
    //   // inject: false,
    //   // chunks: ['miniBanner'],
    //   // meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    //   // alwaysWriteToDisk: true,
    // }),

    // new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackHarddiskPlugin({
    //   // outputPath: distPath,
    // }),
    // new webpack.ProvidePlugin({
    //   jQuery: 'jquery',
    //   $: 'jquery',
    //   'window.jQuery': 'jquery',
    //   'window.$': 'jquery',
    // }),

    new HtmlBeautifyPlugin({
      config: {
        html: {
          // end_with_newline: true,
          indent_size: 2,
          // indent_with_tabs: true,
          // indent_inner_html: true,
          // preserve_newlines: true,
          // unformatted: ['p', 'i', 'b', 'span'],
        },
      },
      replace: [' type="text/javascript"'],
    }),

    // new webpack.ProvidePlugin({
    //   noUiSlider: 'nouislider',
    //   // Sticky: 'sticky-js',
    // }),
  ],


  // devtool: 'inline-source-map',

  devServer: {
    contentBase: distPath,
    port: 9000,
    // hot: true,
    // inline: true,
    // compress: true,
    // historyApiFallback: true,
  },

  optimization: {
    // runtimeChunk: 'single',
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },

    minimizer: [
      args.mode === 'production' ? new OptimizeCSSAssetsPlugin({}) : {},
    ],
  },
});
