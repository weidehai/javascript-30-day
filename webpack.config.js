const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");



module.exports = {
  entry: {
    "index":"./src/index.js","drumKit":"./src/javascript-drum-kit/index.js","clock1":"./src/js-css-clock/assets/js/clock1.js","clock2":"./src/js-css-clock/assets/js/clock2.js","css-variables":"./src/css-variables/index.js","array":"./src/array/index.js","flex-panel-gallery":"./src/flex-panel-gallery/index.js","ajax-type-head":"./src/ajax-type-head/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  devServer: {
    contentBase: "./dist",
    port: 1234,
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /.(jpg|png)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
        },
      },
      {
        test: /.(html)$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
        filename: "index.html",
        chunks: ["index"],
      }),new HtmlWebpackPlugin({
        template: "./src/javascript-drum-kit/assets/index.html",
        inject: "body",
        filename: "javascript-drum-kit.html",
        chunks: ["drumKit"],
      }),new HtmlWebpackPlugin({
        template: "./src/js-css-clock/assets/index.html",
        inject: "body",
        filename: "clock.html",
        chunks: ["clock1"],
      }),new HtmlWebpackPlugin({
        template: "./src/css-variables/assets/index.html",
        inject: "body",
        filename: "css-variables.html",
        chunks: ["css-variables"],
      }),new HtmlWebpackPlugin({
        template: "./src/array/assets/index.html",
        inject: "body",
        filename: "array.html",
        chunks: ["array"],
      }),new HtmlWebpackPlugin({
        template: "./src/flex-panel-gallery/assets/index.html",
        inject: "body",
        filename: "flex-panel-gallery.html",
        chunks: ["flex-panel-gallery"],
      }),new HtmlWebpackPlugin({
        template: "./src/ajax-type-head/assets/index.html",
        inject: "body",
        filename: "ajax-type-head.html",
        chunks: ["ajax-type-head"],
      }),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    alias: {
      "@drum": path.resolve("src/javascript-drum-kit"),
    },
  },
};