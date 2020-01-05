const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const IconfontPlugin = require('iconfont-plugin-webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const distPath = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';

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
    simple: './src/simple.js',

    index: './src/index.js',
    catalog: './src/catalog.js',
    favorites: './src/favorites.js',
    vendors: './src/vendors.js',
    product: './src/product.js',
    cart: './src/cart.js',
    franchise: './src/franchise.js',
    shops: './src/shops.js',
    final: './src/final.js',


    // headerStyle: './src/scss/header-style.scss',
  },
  output: {
    path: distPath,
    filename: 'js/[name].js',
    // chunkFilename: 'js/[name].bundle.js',
    // publicPath: '',
  },
  // resolve: {
  //   modules: [path.resolve(__dirname, 'src/js'), 'node_modules'],
  // },

  performance: {
    hints: isDev ? false : 'warning',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/js/'),
    },
  },

  externals: {
    app: 'app',
    jquery: 'jQuery',
    BX: 'BX',
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          { loader: 'pug-loader' },
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader-srcset',
          // loader: 'html-loader',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },

  plugins: [
    // new FriendlyErrorsWebpackPlugin({
    //   clearConsole: false,
    //   reporter: 'consola',
    //   logLevel: 'WARNING',
    // }),
    new WebpackBar(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),

    new VueLoaderPlugin(),
    new CopyPlugin([
      { from: './src/static', to: './' },
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
      chunks: ['index', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Каталог',
      filename: 'catalog.html',
      template: path.resolve(__dirname, 'src/catalog.pug'),
      chunks: ['catalog', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Каталог / Первый уровень',
      filename: 'first-level.html',
      template: path.resolve(__dirname, 'src/first-level.pug'),
      chunks: ['catalog', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Избранное',
      filename: 'favorites.html',
      template: path.resolve(__dirname, 'src/favorites.pug'),
      chunks: ['favorites', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Производители',
      filename: 'vendors.html',
      template: path.resolve(__dirname, 'src/vendors.pug'),
      chunks: ['vendors', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Производитель',
      filename: 'vendor-opened.html',
      template: path.resolve(__dirname, 'src/vendor-opened.pug'),
      chunks: ['catalog', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Карточка товара',
      filename: 'product.html',
      template: path.resolve(__dirname, 'src/product.pug'),
      chunks: ['product', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Корзина',
      filename: 'cart.html',
      template: path.resolve(__dirname, 'src/cart.pug'),
      chunks: ['cart', 'simple', 'common', 'runtime'],
      // chunks: ['cart', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Франшиза',
      filename: 'franchise.html',
      template: path.resolve(__dirname, 'src/franchise.pug'),
      chunks: ['franchise', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Политика приватности',
      filename: 'privacy.html',
      template: path.resolve(__dirname, 'src/privacy.html'),
      chunks: ['simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Доставка и оплата',
      filename: 'sap.html',
      template: path.resolve(__dirname, 'src/sap.html'),
      chunks: ['simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Доставка и оплата',
      filename: 'delivery.html',
      template: path.resolve(__dirname, 'src/delivery.html'),
      chunks: ['simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Магазины',
      filename: 'shops.html',
      template: path.resolve(__dirname, 'src/shops.html'),
      chunks: ['shops', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Финал заказа',
      filename: 'final.html',
      template: path.resolve(__dirname, 'src/final.html'),
      chunks: ['final', 'simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: '404',
      filename: '404.html',
      template: path.resolve(__dirname, 'src/404.html'),
      chunks: ['simple', 'common', 'runtime'],
      minify: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Технические работы',
      filename: 'technical-work.html',
      template: path.resolve(__dirname, 'src/technical-work.html'),
      chunks: ['simple', 'common', 'runtime'],
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
  // resolve: {
  //   alias: {
  //     vue$: 'vue/dist/vue.esm.js',
  //     // '@': path.resolve(__dirname, 'src/js/'),
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractCssChunksPlugin.loader,
            options: {
              hot: isDev,
              reloadAll: isDev, // when desperation kicks in - this is a brute force HMR flag
            },
          },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: ExtractCssChunksPlugin.loader,
            options: {
              hot: true,
              reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
            },
          },
          // { loader: 'css-loader', options: { sourceMap: false, importLoaders: 1 } },
          { loader: 'css-loader' },
          { loader: 'fast-sass-loader' },
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        exclude: /iconfont.svg/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[folder]-[name].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        include: path.resolve(__dirname, 'src/fonts'),
        use: [
          { loader: 'file-loader', options: { name: 'fonts/[name].[ext]' } },
        ],
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[ext]',
                },
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ExtractCssChunksPlugin({
      filename: '[name].css',
    }),
  ],

  devServer: {
    // contentBase: distPath,
    contentBase: path.resolve(__dirname, 'src/static'),
    index: 'main.html',
    quiet: true,
    noInfo: true,
    port: 9000,
    lazy: false,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    // compress: true,
    // open: true,
    historyApiFallback: true,
    clientLogLevel: 'silent',

    proxy: {
      '/ajax': {
        // target: 'https://marketdo4a.com',
        // secure: false,
        target: 'http://dev.marketdo4a.com',
        auth: '1:1',
        changeOrigin: true,
        cookieDomainRewrite: '',
      },
    },
  },
};

const prodConfig = {
  mode: 'production',
  devtool: 'eval-source-map',
  // output: {
  //   publicPath: '/static/dist/',
  // },
  module: {
    rules: [
      // {
      //   test: /\.pug$/,
      //   use: [
      //     { loader: 'pug-loader' },
      //   ],
      // },
      // {
      //   test: /\.(html)$/,
      //   use: {
      //     loader: 'html-loader-srcset',
      //   },
      // },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      // },
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
          {
            loader: ExtractCssChunksPlugin.loader,
            options: { hot: isDev, reloadAll: isDev },
          },
          { loader: 'css-loader', options: { importLoaders: 2, sourceMap: false } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: ExtractCssChunksPlugin.loader,
            options: { hot: isDev, reloadAll: isDev },
          },
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
          {
            loader: 'file-loader',
            options: {
              outputPath: './images',
              name: '[name].[ext]',
              esModule: false,
            },
          },
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
          {
            loader: 'file-loader',
            options: {
              outputPath: './images',
              name: '[name].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        include: path.resolve(__dirname, 'src/fonts'),
        use: [
          { loader: 'file-loader', options: { outputPath: './fonts', name: '[name].[ext]' } },
        ],
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[ext]',
                  esModule: false,
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new webpack.BannerPlugin('Your copyright notice'),

    new CssUrlRelativePlugin(),
    new ExtractCssChunksPlugin({
      filename: 'css/[name].css',
      // filename: (chunkData) => {
      //   return chunkData.chunk.name === 'simple' ? 'css/common.css' : 'css/[name].css';
      // },
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
        //   // test: /\.(css|sass|scss)$/,
        //   test: /\.css$/,
        //   filename: 'css/ololo.css',
        //   chunks: 'initial',
        //   enforce: true,
        // },
        common: {
          name: 'common',
          // test: /\.js$/,
          filename: 'js/[name].bundle.js',
          chunks: 'initial',
          minChunks: 3,
        },
      },
    },
  },
};


module.exports = (env, args) => {
  if (args && args.mode !== 'development') {
    return merge(cummonConfig, prodConfig);
  }
  return merge(cummonConfig, devConfig);
};
