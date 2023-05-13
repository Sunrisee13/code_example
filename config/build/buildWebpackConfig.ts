import path from "path";
import { BuildOptions } from "./types/config";
import webpack from "webpack";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";

export function buildWebpackConfig(options: BuildOptions):webpack.Configuration {
    const {paths, mode} = options

    return {
        mode, // development / production(max сжатие)
      
        entry: paths.entry, // Откуда забираем файл
      
        output: {
          filename: "[name].[contenthash].js", // https://webpack.js.org/configuration/output/#template-strings
          // [name] - entry можно сделать объектом с нескольктими путями, это - имя
          // [contenthash] - в зависимости от контента хэш
          path: paths.build, // Куда кладём файл
          clean: true, // Чистим лишние файлы в бандле (предыдущие)
        },
      
        plugins: buildPlugins(options),
      
        module: {
          // Тут все loader`ы , для работы с нестандартными расширениями
          rules: buildLoaders(),
        },
      
        resolve: buildResolvers(),
      }
}
