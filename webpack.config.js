const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const IconfontPlugin = require('iconfont-plugin-webpack');

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

const cummonConfig = {
  entry: {
    index: './src/index.js',
    catalog: './src/catalog.js',
    firstLevel: './src/first-level.js',
    favorites: './src/favorites.js',
    vendors: './src/vendors.js',
    vendorOpened: './src/vendor-opened.js',
    product: './src/product.js',
    cart: './src/cart.js',


    // headerStyle: './src/scss/header-style.scss',
  },
  output: {
    path: distPath,
    filename: 'js/[name].js',
    // chunkFilename: 'js/[name].bundle.js',
    // publicPath: '',
  },

  externals: {
    app: 'app',
    jquery: 'jQuery',
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CopyPlugin([
      { from: './src/static', to: 'static' },
    ]),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   // 'window.$': 'jquery',
    //   // 'window.jQuery': 'jquery',
    //
    //   // Костыль, чтоб подключить OwlCarousel2 и воткнуть jQuery в глобальную область видимости
    //   'window.Zepto': 'jquery',
    // }),

    new IconfontPlugin(
      {
        src: './src/img/icons', // required - directory where your .svg files are located
        family: 'iconfont', // optional - the `font-family` name. if multiple iconfonts are generated, the dir names will be used.
        dest: {
          font: 'src/fonts/[family].[type]', // required - paths of generated font files
          css: 'src/scss/_[family].scss', // required - paths of generated css files
        },
        watch: {
          pattern: 'img/icons/*.svg', // required - watch these files to reload
          cwd: 'src/', // optional - current working dir for watching
        },
      },
    ),

    new SVGSpritemapPlugin('src/img/svg-sprite/*.svg', {
      output: {
        filename: 'images/new-sprite.svg',
        svg: {
          // Disable `width` and `height` attributes on the root SVG element
          // as these will skew the sprites when using the <view> via fragment identifiers
          sizes: false,
        },
        // svg4everybody: true,
      },
      sprite: {
        prefix: 'sprite-',
        generate: {
          // Generate <use> tags within the spritemap as the <view> tag will use this
          use: true,
          // view: '-fragment',

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
      filename: 'main.html',
      template: path.resolve(__dirname, 'src/index.pug'),
      chunks: ['index', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Каталог',
      filename: 'catalog.html',
      template: path.resolve(__dirname, 'src/catalog.pug'),
      chunks: ['catalog', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Каталог / Первый уровень',
      filename: 'first-level.html',
      template: path.resolve(__dirname, 'src/first-level.pug'),
      chunks: ['firstLevel', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Избранное',
      filename: 'favorites.html',
      template: path.resolve(__dirname, 'src/favorites.pug'),
      chunks: ['favorites', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Производители',
      filename: 'vendors.html',
      template: path.resolve(__dirname, 'src/vendors.pug'),
      chunks: ['vendors', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Производитель',
      filename: 'vendor-opened.html',
      template: path.resolve(__dirname, 'src/vendor-opened.pug'),
      chunks: ['vendorOpened', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Карточка товара',
      filename: 'product.html',
      template: path.resolve(__dirname, 'src/product.pug'),
      chunks: ['product', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Корзина',
      filename: 'cart.html',
      template: path.resolve(__dirname, 'src/cart.pug'),
      chunks: ['cart', 'common', 'runtime'],
      minify: false,
    }),

    // new HtmlWebpackPlugin({
    //   title: 'Шапка',
    //   filename: 'header.html',
    //   template: path.resolve(__dirname, 'src/product.pug'),
    //   chunks: ['product', 'style'],
    //   minify: false,
    // }),
  ],
};

const devConfig = {
  mode: 'development',
  module: {
    rules: [
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
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: false } },
          { loader: 'css-loader', options: { sourceMap: false, importLoaders: 1 } },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: false } },
          { loader: 'css-loader', options: { sourceMap: false, importLoaders: 1 } },
          { loader: 'fast-sass-loader' },
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' } },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' } },
        ],
      },
    ],
  },
  devServer: {
    contentBase: distPath,
    quiet: true,
    port: 9000,
    lazy: false,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    // compress: true,
    // open: true,
    historyApiFallback: true,
  },
};

const prodConfig = {
  mode: 'production',
  // output: {
  //   publicPath: '/static/dist/',
  // },
  module: {
    rules: [
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
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 2, sourceMap: false } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 2, sourceMap: false } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          { loader: 'fast-sass-loader' },
        ],
      },
      { // Внутри HTML
        test: /\.(gif|png|jpg|jpeg|svg)$/i,
        include: path.resolve(__dirname, 'src/images'),
        exclude: /sprite.svg/,
        use: [
          { loader: 'file-loader', options: { outputPath: './images', name: '[name].[ext]' } },
          { loader: 'image-webpack-loader' },
        ],
      },
      { // Внутри .css
        test: /\.(gif|png|jpg|jpeg|svg)$/i,
        include: path.resolve(__dirname, 'src/img'),
        use: [
          { loader: 'url-loader', options: { outputPath: './img', name: '[folder]-[name].[ext]', limit: 10 * 1024 } },
          { loader: 'image-webpack-loader' },
        ],
      },
      {
        test: /sprite.svg/,
        use: [
          { loader: 'file-loader', options: { outputPath: './images', name: '[name].[ext]' } },
        ],
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        include: path.resolve(__dirname, 'src/fonts'),
        use: [
          { loader: 'file-loader', options: { outputPath: './fonts', name: '[name].[ext]' } },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new CssUrlRelativePlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      // chunkFilename: 'css/[id].css',
      // filename: 'css/[name].css',
      // chunkFilename: 'css/[id].333.css',
    }),

    // new webpack.HotModuleReplacementPlugin(),

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
  ],
  optimization: {
    // runtimeChunk: {
    //   name: 'common.bundle',
    // },
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        // default: false,
        // styles: {
        //   name: 'styles',
        //   test: /\.(sass|scss|css)$/,
        //   chunks: 'initial',
        //   enforce: true,
        // },
        // style: {
        //   name: 'style',
        //   test: /\.(css|sass|scss)$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
        common: {
          name: 'common',
          // test: /\.js$/,
          filename: 'js/[name].bundle.js',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
};


module.exports = (env, args) => {
  process.env.NODE_ENV = args.mode;

  const devMode = args.mode === 'development';

  return devMode ? merge(cummonConfig, devConfig) : merge(cummonConfig, prodConfig);
};
