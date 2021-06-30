const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (_, argv) => ({
  entry: './src/applicationOne.js',
  output: {
    filename: `applicationOne.js`,
    path: path.resolve(process.cwd(), 'dist'),
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
  optimization: {
    minimize: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'applicationOne',
      library: { type: 'var', name: 'applicationOne' },
      filename: 'applicationOne.js',
      remotes: {
        rootApplication: 'rootApplication',
        applicationTwo: 'applicationTwo'
      },
      exposes: {
        './ApplicationOne': './src/applicationOne'
      },
      shared: ['react', 'react-dom', 'single-spa-react']
    }),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
});
