import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWEbpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CopyPlugin from 'copy-webpack-plugin'

import { type BuildOptions } from './types/config'

export function buildPlugins ({
  paths,
  isDev,
  apiURL,
  project
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
    __IS_DEV__: JSON.stringify(isDev),
    __API__: JSON.stringify(apiURL),
    __PROJECT__: JSON.stringify(project)
  })]

  // eslint-disable-next-line no-new
  new CopyPlugin({
    patterns: [
      { from: paths.locales, to: paths.buildLocales }
    ]
  })

  if (isDev) {
    plugins.push(new ReactRefreshWEbpackPlugin())
    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false
    }))
  }

  return plugins
}
