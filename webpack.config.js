const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "react-hook-form": "react-hook-form",
    classnames: "classnames",
    "p-min-delay": "p-min-delay",
    "react-number-format": "react-number-format",
    yup: "yup",
    axios: "axios",
    "react-router-dom": "react-router-dom",
    "@reduxjs/toolkit": "@reduxjs/toolkit",
    "@loadable/component": "@loadable/component",
    "react-query": "react-query",
  },

  module: {
    rules: [
      // {
      //   loader: "react-svg-loader",
      //   options: {
      //     jsx: true,
      //   },
      // },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: [/node_modules/, /.\/src\/stories/],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
