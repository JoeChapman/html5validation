var path = require('path')
var argv = require('yargs').argv

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'html5validation' + (argv.p ? '.min' : '') + '.js',
    library: 'html5validation',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader']
      }
    ]
  }
}
