const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "app"),

  entry: ["@babel/polyfill", "./index.js"],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || "development"
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
      Hammer: "hammerjs/hammer"
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    alias: {
      jquery: path.resolve("node_modules/jquery/dist/jquery"),
      "@fortawesome/fontawesome-free-solid$":
        "@fortawesome/fontawesome-free-solid/shakable.es.js"
    }
  }
};
