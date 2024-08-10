const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const fs = require("fs");

module.exports = {
  entry: "./src/index.ts", // Entrada principal do seu projeto
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  mode: "production",
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap("Inject CSS Plugin", (stats) => {
          const cssContent = fs.readFileSync(
            path.resolve(__dirname, "dist/main.css"),
            "utf8"
          );
          const cssInjectionScript = `
            const style = document.createElement('style');
            style.textContent = ${JSON.stringify(cssContent)};
            document.head.appendChild(style);
          `;

          fs.appendFileSync(
            path.resolve(__dirname, "dist/bundle.min.js"),
            cssInjectionScript
          );
        });
      },
    },
  ],
};
