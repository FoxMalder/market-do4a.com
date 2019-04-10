// const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano');
// module.exports = {
//   plugins: [
//     require('autoprefixer'),
//   ],
// };
module.exports = ({ file, options, env }) => ({
  exec: true,
  // parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    // 'postcss-import': { root: file.dirname },
    // 'postcss-preset-env': options['postcss-preset-env'] ? options['postcss-preset-env'] : false,
    // 'cssnano': env === 'production' ? {} : false,
    'cssnano': {},
    'autoprefixer': {},
  },
});