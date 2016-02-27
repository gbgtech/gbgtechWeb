var autoprefixer  = require('autoprefixer');
var precss        = require('precss');
var webpack       = require('webpack');
var path          = require('path');
var fs            = require('fs');


var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = [
  {
    name:"client",
    entry: [
      './src/frontend/index',
      'webpack-hot-middleware/client'
    ],
    devtool: 'source-map',
    output: {
      path: __dirname + '/public/build',
      filename: 'bundle.js',
      publicPath: 'build/'
    },
    module: {
      loaders: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel',
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
    postcss: function() {
      return [autoprefixer, precss];
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    devServer: {
      contentBase: './public'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      }),
    ]
  },
  {
    name:"server",
    target: 'node',
    entry: [
      'webpack/hot/signal.js',
      './server.js'],
    recordsPath: path.join(__dirname, '/public/buildServer/_records'),
    devtool: 'sourcemap',
    output: {
           path: __dirname + '/public/buildServer',
           filename: 'server.build.js',
     },
     plugins:[
       new webpack.BannerPlugin('require("source-map-support").install();',
                           { raw: true, entryOnly: false }),
       new webpack.HotModuleReplacementPlugin()
     ],
     resolve: {
       extensions: ['', '.js', '.jsx']
     },
     module: {
       loaders: [
          { test: /\.json$/, loader: "json" },
         {
           test: /(\.jsx|\.js)$/,
           loaders: ['monkey-hot','babel'],
           exclude: /(node_modules|bower_components)/
         },
         {
           test:   /\.css$/,
           loader: 'style!css!postcss'
         }
       ]
     },
     externals: nodeModules
  }
];
