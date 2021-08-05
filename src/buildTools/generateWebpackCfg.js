const fs = require("fs/promises");
const path = require("path");

webpackCfg=`const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");



module.exports = {
  entry: {
    'index':'./src/index.js',
    'drumKit':"./src/javascript-drum-kit/index.js",
    'clock1':'./src/js-css-clock/assets/js/clock1.js',
    'clock2':'./src/js-css-clock/assets/js/clock2.js',
    'css-variables':'./src/css-variables/index.js',
    'array':'./src/array/index.js',
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
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
        },
      },
      {
        test: /\.(html)$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    {{HtmlWebpackPluginCfgs}},
    new MiniCssExtractPlugin()
  ],
  resolve: {
    alias: {
      "@drum": path.resolve("src/javascript-drum-kit"),
    },
  },
};`


async function readFile() {
  try {
    let content = await fs.readFile(path.resolve(__dirname, "../../router.json"), {
      encoding: "utf-8",
    });
    content = JSON.parse(content);
    webpackCfg = generateWebpackCfg(buildHTMLWebpackplg(content.router))
    writeFile(webpackCfg)
  } catch (e) {
    console.log(e);
  }
}

function buildHTMLWebpackplg(router) {
  let result = [];
  router.forEach((item) => {
    let options = `{
      template: "${item.template}",
      inject: "body",
      filename: "${item.filename || item.href.substring(2)}",
      chunks: ["${item.chunks}"],
    }`
    result.push(
      `new HtmlWebpackPlugin(${options})`
    );
  });
  return result.join(",")
}

function generateWebpackCfg(cfg){
  return webpackCfg.replace(/\{\{HtmlWebpackPluginCfgs\}\}/g,cfg)
}

async function writeFile(cfg){
  let result = await fs.writeFile(path.resolve(__dirname,'../../webpack.config.js'),cfg)
}

readFile()
