const path = require("path");

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
    extensions: [".ts", ".tsx"],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
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
        use: ["ts-loader"],
        exclude: [/node_modules/, /.\/src\/stories/],
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          "style-loader",
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
};
