import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { type BuildOptions } from './types/config'
// Ребилд при изменениях + запуск сервера https://webpack.js.org/guides/development/
// Пришлось обновить webpack-cli до 4.10.0 c 4.9.2, чтобы корректно запустился dev server
// https://github.com/webpack/webpack-dev-server

export function buildDevServer (options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true, // Автоматически открывает страницу с нашим приложением
    historyApiFallback: true, // Фикс при перезагрузке, cannot get
    hot: true // Для обновлений без перезагрузки страницы (потом мб нужнен будет плагин)
  }
}
