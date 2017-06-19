const webpack = require('webpack');

const base = {
  entry: {
    main: './src/js/main',
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor' // Specify the common bundle's name.
  })
];

const dev = Object.assign({}, base, {
  plugins: [].concat(plugins)
});

const prod = Object.assign({}, base,  {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ].concat(plugins).reverse(),
  stats: {
    assets: false
  }
});

module.exports = {
  dev: dev,
  prod: prod
};
