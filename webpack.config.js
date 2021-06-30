const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (_, argv) => ({
  entry: {},
  output: {
    publicPath: argv.mode === 'development' ? 'http://localhost:9001/' : 'https://micro-frontend-application-one.vercel.app/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9001,
    watchContentBase: true
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
  optimization: {
    minimize: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'applicationOne',
      library: { type: 'var', name: 'applicationOne' },
      filename: 'applicationOne.js',
      remotes: {
        rootApplication: 'rootApplication@http://localhost:9000/rootApplication.js',
        applicationTwo: 'applicationTwo@http://localhost:9002/applicationTwo.js'
      },
      exposes: {
        './ApplicationOne': './src/applicationOne'
      },
      shared: ['react', 'react-dom', 'single-spa-react']
    }),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
});
