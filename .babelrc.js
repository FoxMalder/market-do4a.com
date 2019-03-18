module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false,
        exclude: ['transform-typeof-symbol']
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    "@babel/plugin-proposal-class-properties"
  ],
  env: {
    test: {
      plugins: [ 'istanbul' ]
    }
  }
};
