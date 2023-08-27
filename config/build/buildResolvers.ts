import { type ResolveOptions } from 'webpack'
import { type BuildOptions } from './types/config'

export function buildResolvers (options: BuildOptions): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'], // Пишем расширения, которые не будут указываться при импорте
    preferAbsolute: true, // https://webpack.js.org/configuration/resolve/#resolvemodules
    modules: [options.paths.src, 'node_modules'], // c каких папок пути будут абсолютными
    mainFiles: ['index'], // Для каждого модуля, главный файл - index
    alias: {
      '@': options.paths.src
    }
  }
}
