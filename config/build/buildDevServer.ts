import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/config";
// Ребилд при изменениях + запуск сервера https://webpack.js.org/guides/development/
// Пришлось обновить webpack-cli до 4.10.0 c 4.9.2, чтобы корректно запустился dev server

export function buildDevServer(options: BuildOptions):DevServerConfiguration {
  return {
    port: options.port,
    open: true, // Автоматически открывает страницу с нашим приложением

  }
}
