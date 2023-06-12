import type webpack from 'webpack'
import { buildBabelLoader } from './loaders/buildBabelLoader'
import { buildCssLoader } from './loaders/buildCssLoader'
import { type BuildOptions } from './types/config'

// Лоадеры нужны для работы с нестандартными файлами

export function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] {
  // копипаст с документации
  const babelLoader = buildBabelLoader(options)

  // Если не используем typeScript, нужен babel-loader
  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  }

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  }

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }

  // для этого надо ещё миллион всего установить npm i -D sass-loader@12.6.0 sass@1.49.9 style-loader@3.3.1 css-loader@6.6.0
  const cssLoader = buildCssLoader(options.isDev)

  return [svgLoader, fileLoader, babelLoader, typeScriptLoader, cssLoader]
}
