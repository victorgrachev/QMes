import { Configuration, EnvironmentPlugin } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { createTsLoader } from './tools/webpack/createTsLoader';
import { createStyleLoader } from './tools/webpack/createStyleLoader';
import 'webpack-dev-server';

const rules = [
  createTsLoader(/\.(t|j)s$/),
  createTsLoader(/\.(t|j)sx$/, ['@babel/preset-react']),
  createStyleLoader(/\.css$/),
];

const Config: Configuration = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash].js',
    clean: true,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  target: ['web', 'es5'],
  module: { rules },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/assets/index.html'),
    }),
    new EnvironmentPlugin(['SUPABASE_URL', 'SUPABASE_ANON_KEY']),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3030,
  },
};

export default Config;
