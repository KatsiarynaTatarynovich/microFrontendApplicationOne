const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (_, argv) => ({
  entry: {
    applicationOne: './public-path',
  },
  output: {
    publicPath:
        argv.mode === 'development'
            ? 'http://localhost:9001/'
            : 'https://micro-frontend-application-one.vercel.app/',
  },
  devServer: {
    port: 9001
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'applicationOne',
      filename: 'applicationOne.js',
      remotes: {
        rootApplication: 'rootApplication',
        applicationTwo: 'applicationTwo'
      },
      exposes: ['./public-path'],
      shared: ['react', 'react-dom', 'single-spa-react']
    }),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
});
