var autoprefixer  = require('autoprefixer');
var precss        = require('precss');
var lost          = require('lost');
var webpack       = require('webpack');
var postcssimport = require('postcss-import');

module.exports = {
  entry: [
    './src/frontend/index',
    'webpack/hot/dev-server'
  ],
  devtool: 'source-map',
  output: {
    path: __dirname + '/public',
    publicPath: 'build/'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loaders: ["babel", "eslint-loader"],
        exclude: /(node_modules|bower_components)/
      },
      {
        test:   /\.css$/,
        loader: 'style!css!postcss'
      }
    ],
    // Shut off warnings about using pre-built javascript files
    // as Quill.js unfortunately ships one as its `main`.
  //  noParse: /node_modules\/quill\/dist/quill.

  },
  eslint: {
    configFile: '.eslintrc'
  },
  postcss: function(webpack) {
    return [postcssimport({addDependencyTo: webpack}),autoprefixer, precss, lost];
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './public',
    publicPath: '/build',
    hot:true,
    stats: {
        colors: true,
        chunks: false
    },
    proxy: {
      '*': {
        target: 'http://localhost:3001',
        secure: false,
      },
    },
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
  ]
};
