const path = require('path');
const CopyPlagins = require('copy-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins : [
    new CopyPlagins(
      {
        patterns: [{from: 'public'}]
      }
    )
  ],
  module: {
    rules: [
      {
        test:/\.js/,
        exlude: /(node_modules)/,
        use: {
          loaders: 'babel - loaders',
          options: {presets: ['@babel/preset-env']}
        }
      }
    ]
  }
}
