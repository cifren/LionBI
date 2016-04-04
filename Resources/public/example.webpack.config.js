var debug = process.env.NODE_ENV !== "production";
var path = require("path");
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./jt/scripts.js",
  output: {
    path: __dirname + "/jt",
    filename: "scripts.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ],
  module: {
    loaders: [
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "jt"),
        ],
  
        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,
  
        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react'],
        }
      }
    ]
  },
  exclude: [
    path.resolve(__dirname, "node_modules"),
  ],
};