/* eslint-disable @typescript-eslint/no-non-null-assertion */
import path from 'path'

import type webpack from 'webpack'
import { DefinePlugin, type RuleSetRule } from 'webpack'

import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { type BuildPaths } from '../build/types/config'

// По дефолту сторибук имеет свою конфигурацию вебпака и мы можем её переопределять
// Большинство написанного здесь - подсказки со стак оферфлоу или доки, лучше пересмотреть видос
// если будет желание врубиться. + есть несколько вариантов решения, таких проблем
export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    locales: '',
    buildLocales: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  }
  config.resolve!.modules!.push(paths.src)
  config.resolve!.extensions!.push('.ts', '.tsx')
  config.resolve!.alias = {
    ...config.resolve!.alias,
    '@': paths.src
  }

  const rules = config.module!.rules as RuleSetRule[]
  config.module!.rules = rules.map((rule: RuleSetRule) => {
    // eslint-disable-next-line @typescript-eslint/prefer-includes
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/ }
    }

    return rule
  })

  config.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  })

  config.module!.rules.push(buildCssLoader(true))
  config.resolve!.modules = [
    path.resolve(__dirname, '../../src'),
    'node_modules'
  ]

  config.plugins!.push(new DefinePlugin({
    __IS_DEV__: true,
    __API__: JSON.stringify(''), // Нам не надо ни в какую api передавать запросы
    __PROJECT__: JSON.stringify('storybook')
  }))
  return config
}
