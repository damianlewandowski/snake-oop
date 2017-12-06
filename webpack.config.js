const path = require("path");

module.exports = {
  entry: {
    app: './src/App.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'env'
          ]
        }
      }
    ]
  }
}