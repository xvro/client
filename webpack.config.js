var path = require('path')

module.exports = {
  entry: [
    './src/main.js'
  ],
  output:{
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  devtool: 'source-map',
  module:{
    loaders:[
      { test: /\.vue$/, loader: 'vue'},
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
    ]
  }
};