const path = require("path");

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/report-portal-application-one.js",
    output: {
      filename: "report-portal-application-one.js",
      libraryTarget: "system",
      path: path.resolve(process.cwd(), "dist"),
      uniqueName: "application-one",
      devtoolNamespace: "application-one",
      publicPath: "",
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: [path.resolve(__dirname, "node_modules")],
          loader: "babel-loader",
        },
        { parser: { system: false } },
      ],
    },
    devtool: "source-map",
    devServer: {
      compress: true,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      port: 9001,
    },
    externals: ["single-spa", {}, "react", "react-dom"],
    plugins: [],
    resolve: {
      modules: [path.resolve(__dirname, "node_modules")],
      extensions: [".js", ".jsx", ".json"],
    },
  };
};
