import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
// import license from 'rollup-plugin-license';
import { uglify } from 'rollup-plugin-uglify';


// // let fileDest  = 'main.min.js'
// const external = ['jquery', 'popper.js']
// // const external = ['svg4everybody']
// const plugins = [
//   babel({
//     exclude: 'node_modules/**', // Only transpile our source code
//     externalHelpersWhitelist: [ // Include only required helpers
//       'defineProperties',
//       'createClass',
//       'inheritsLoose',
//       'defineProperty',
//       'objectSpread',
//     ]
//   }),
//   resolve(), // so Rollup can find dependencies
//   commonjs(), // so Rollup can convert dependencies to an ES module
//   uglify(),
// ]
// const globals = {
//   jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
//   'popper.js': 'Popper'
// }

// module.exports = {
//   input: path.resolve(__dirname, 'source/js/main.js'),
//   output: {
//     // banner,
//     file: path.resolve(__dirname, `build/js/${fileDest}`),
//     format: 'umd',
//     globals,
//     name: 'main'
//   },
//   external,
//   plugins
// }

export default [

  // browser-friendly UMD build
  {
    input: 'source/js/main.js',
    output: {
      name: 'main',
      file: 'build/js/main.min.js',
      format: 'umd'
    },
    plugins: [
      babel({
        exclude: ['node_modules/**']
      }),
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      uglify(),
      // license(licence)
    ]
  },
  // browser-friendly, non-minified UMD build
  {
    input: 'source/js/main.js',
    output: {
      name: 'main',
      file: 'build/js/main.js',
      format: 'umd'
    },
    plugins: [
      babel({
        exclude: ['node_modules/**']
      }),
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      // license(licence)
    ]
  },
]