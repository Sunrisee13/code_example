import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { type BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export function buildPlugins ({
  paths,
  isDev
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [new HtmlWebpackPlugin({
    template: paths.html // https://github.com/jantimon/html-webpack-plugin#options путь шаблона
  }),
  new webpack.ProgressPlugin(), // чтобы видеть процесс загрузки. Идёт из коробки
  // Плагин, для создания css файлов, тк css читается быстрее чем js
  // https://webpack.js.org/plugins/mini-css-extract-plugin/ + нет разницы в порядке плагинов вроде как
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8].css' // понадобится позже, при разбиении файлов
    // на чанки и асинхронной подгрузки
  }),
  new webpack.DefinePlugin({
    __IS_DEV__: JSON.stringify(isDev)
  })]

  if (isDev) {
    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false
    }))
  }
  return plugins
}
