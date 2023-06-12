import type webpack from 'webpack'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import { type BuildEnv, type BuildPaths } from './config/build/types/config'
import path from 'path'

// На убунте запуск sudo webpack, когда установим глобально или npx webpack
// При глобальном использовании, первый раз поставились права для root пользователя
// Надо будет для скриптов поменять разрешения для папки build

export default (env: BuildEnv) => {
  // Настройка переменных окружения https://webpack.js.org/guides/environment-variables/

  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src')
  }

  const mode = env.mode || 'development'
  const isDev = mode === 'development'
  const PORT = env.port || 3000
  const apiURL = env.apiURL || 'http://localhost:8000'

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    apiURL,
    project: 'frontend'
  })

  return config
}
