const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

dotenv.config();

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: { main: "./index.js" },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new HTMLWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".css"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    port: 4325,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
