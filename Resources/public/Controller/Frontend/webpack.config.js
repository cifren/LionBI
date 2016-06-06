var debug = process.env.NODE_ENV !== "production";
var path = require("path");
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: [
    "./index.js"
  ],
  output: {
    path: __dirname + "/bundle",
    filename: "scripts.min.js"
  },
  plugins: debug ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^(buffertools)$/)
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.IgnorePlugin(/^(buffertools)$/)
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        loader: "babel",

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname)
        ],
        exclude: /node_modules/,
  
        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,
  
        // Options to configure babel with
        query: {
          plugins: ['transform-runtime', 'react-html-attrs', 'transform-class-properties'],
          presets: ['es2015', 'react', 'stage-0'],
          cacheDirectory: true
        },
      },
    ]
  },
  cache: true
};