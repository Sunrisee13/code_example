import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

// Лоадеры нужны для работы с нестандартными файлами

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  // Если не используем typeScript, нужен babel-loader
  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  // для этого надо ещё миллион всего установить npm i -D sass-loader@12.6.0 sass@1.49.9 style-loader@3.3.1 css-loader@6.6.0
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      // "style-loader", заменяем для MiniCssExtractPlugin
      options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      // Альтернативный вариант записи loaderов
      {
        loader: "css-loader",
        options: {
          // Подключение модульных стилей https://webpack.js.org/loaders/css-loader/#modules
          modules: {
            auto: (resPath: string) => resPath.includes(".module."), // Можно также вставить boolean значение или regexp
            localIdentName: options.isDev
              ? "[path][name]__[local]" // путь-имя файла без расширения__название класса
              : "[hash:base64:8]", // метод кодирования base64, длинной 8
          },
        },
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  return [typeScriptLoader, cssLoader];
}
