const path = require("path");

const webpack = require("webpack");
const AutoDllPlugin = require("autodll-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const port = process.env.PORT || 8080;

module.exports = {
  devtool: "inline-source-map",

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
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-flow"
            ],
            plugins: ["babel-plugin-flow-runtime"]
          }
        }
      },
      // For importing sass into object. Used four components
      {
        test: /^((?!\.global).)*\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      // For importing sass into the html
      {
        test: /\.global\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      // For importing css into object. Used four components
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          }
        ]
      },
      // For importing css into the html
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff"
          }
        }
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff"
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/octet-stream"
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader"
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "image/svg+xml"
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: "url-loader"
      }
    ]
  },
  plugins: [
    new AutoDllPlugin({
      inject: true,
      filename: "[name].js",
      entry: {
        vendor: ["react", "react-dom"]
      }
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    }),

    new ExtractTextPlugin({
      filename: "[name].css"
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  devServer: {
    port,
    progress: true
  }
};
