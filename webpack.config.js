var autoprefixer  = require('autoprefixer');
var precss        = require('precss');

module.exports = {
  entry: './src/frontend/index.jsx',
  devtool: 'eval-source-map',
  output: {
    path: __dirname + '/public',
    publicPath: '/public/'
  },
  // plugins: plugins,
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
      }
    ]
  },
  postcss: function() {
    return [autoprefixer, precss];
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './public'
  }
};
