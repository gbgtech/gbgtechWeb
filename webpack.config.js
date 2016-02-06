var webpack           = require('webpack');
var WebpackDevServer  = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path              = require('path');

var autoprefixer      = require('autoprefixer');
var precss            = require('precss');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

var appName = 'app';
var host = '0.0.0.0';
var port = '9000';

var plugins, outputFile;

plugins = [
  new HtmlWebpackPlugin({
    template: 'src/frontend/index.html',
    inject: 'body',
    filename: 'index.html'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
];


if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = appName + '.min.js';
} else {
  outputFile = appName + '.js';
}

var config = {
  entry: './src/frontend/index.jsx',
  devtool: 'eval-source-map',
  output: {
    path: '/',
    filename: outputFile,
    //publicPath: path.join(__dirname, '/src/frontend')
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test:   /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }/*,
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }*/
    ]
  },
  postcss: function() {
    return [autoprefixer, precss];
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx']
  }
};

// if (env === 'dev') {
//   new WebpackDevServer(webpack(config), {
//     contentBase: './src/frontend',
//     hot: true,
//     debug: true
//   }).listen(port, host, function (err, result) {
//     if (err) {
//       console.log(err);
//     }
//   });
//   console.log('-------------------------');
//   console.log('Local web server runs at http://' + host + ':' + port);
//   console.log('-------------------------');
// }

module.exports = config;
