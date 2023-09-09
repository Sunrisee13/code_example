import type webpack from 'webpack'

import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { type BuildOptions } from './types/config'

export function buildWebpackConfig (
  options: BuildOptions
): webpack.Configuration {
  const { paths, mode, isDev } = options

  return {
    mode, // development / production(max сжатие)

    entry: paths.entry, // Откуда забираем файл

    output: {
      filename: '[name].[contenthash].js', // https://webpack.js.org/configuration/output/#template-strings
      // [name] - entry можно сделать объектом с нескольктими путями, это - имя
      // [contenthash] - в зависимости от контента хэш
      path: paths.build, // Куда кладём файл
      clean: true, // Чистим лишние файлы в бандле (предыдущие)
      publicPath: '/'
    },

    plugins: buildPlugins(options),

    module: {
      // Тут все loader`ы , для работы с нестандартными расширениями
      rules: buildLoaders(options)
    },

    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined, // Вроде как нужны на этапе разработки, для отлова ошибок
    // Благодаря им можно в браузере отлаживать код, тк браузер разложит всё по файлам для разработки
    // https://www.youtube.com/watch?v=v9gtHkynU5E
    devServer: isDev ? buildDevServer(options) : undefined
  }
}
