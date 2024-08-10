const path = require("path");

module.exports = {
  entry: "./src/index.ts", // Seu arquivo de entrada principal
  output: {
    filename: "bundle.min.js", // Nome do arquivo de saída
    path: path.resolve(__dirname, "dist"), // Pasta de saída
    clean: true, // Limpa o diretório 'dist' antes de cada build
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve essas extensões
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "production", // Garante que o código seja minificado e otimizado
};
