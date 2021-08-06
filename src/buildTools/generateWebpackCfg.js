const fs = require("fs/promises");
const path = require("path");

webpackCfg = `const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");



module.exports = {
  entry: {
    {{entryconfig}}
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
};`;

async function readFile() {
  try {
    let content = await fs.readFile(path.resolve(__dirname, "../../router.json"), {
      encoding: "utf-8",
    });
    content = JSON.parse(content);
    webpackCfg = generateWebpackCfg(buildHTMLWebpackplg(content.router));
    writeFile(webpackCfg);
  } catch (e) {
    console.log(e);
  }
}

function buildHTMLWebpackplg(router) {
  let result = [];
  let entry = [];
  router.forEach((item) => {
    if (item.template) {
      let options = `{
        template: "${item.template}",
        inject: "body",
        filename: "${item.filename || item.href.substring(2)}",
        chunks: ["${item.chunks}"],
      }`;
      result.push(`new HtmlWebpackPlugin(${options})`);
    }
    if (item.entry) {
      entry.push(`"${item.chunks}":"${item.entry}"`);
    }
  });
  return { html: result.join(","), entry: entry.join(",") };
}

function generateWebpackCfg(cfg) {
  let { html, entry } = cfg;
  return webpackCfg
    .replace(/\{\{HtmlWebpackPluginCfgs\}\}/g, html)
    .replace(/\{\{entryconfig\}\}/g, entry);
}

async function writeFile(cfg) {
  let result = await fs.writeFile(path.resolve(__dirname, "../../webpack.config.js"), cfg);
}

readFile();
