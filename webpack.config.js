'use strict'

module.exports = {
  entry: [
    './lib/app.js'
  ],
  output: {
    path: './lib/deploy/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
