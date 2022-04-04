const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');


const GLOBAL_CSS_REGEXP = /\.global\.s?css$/;
const PORT = process.env.PORT || 3000;


module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
  },
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
  },
  module: {
    rules: [
    {
      test: /\.[tj]sx?$/,
      use: ['ts-loader']
    },
    {
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'sass-loader',
        },
      ],
      exclude: GLOBAL_CSS_REGEXP
    },
    {
      test: GLOBAL_CSS_REGEXP,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    },

    {
      test: /\.(png|jp(e*)g|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'images/[hash]-[name].[ext]',
          },
        },
      ],
    },
  ]
  },
  plugins: [
      new HTMLWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
  ],

  devServer: {
    port: PORT,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'eval',


  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};