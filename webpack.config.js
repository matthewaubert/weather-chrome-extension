const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {}
        }
      }
    ]
  }
};