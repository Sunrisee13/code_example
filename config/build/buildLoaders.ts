import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

// Лоадеры нужны для работы с нестандартными файлами

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  // копипаст с документации
  const babelLoader = {
    test: /\.(js|jsx|ts|tsx)$/, // ts не забыли?
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"], // Пресет, который преобразует код в зависимости от окружения
        plugins: [
          [
            "i18next-extract",
            // Для того, чтобы плагин видел файлы локализаций, можно использовать структуру ключа
            // t("locale-file:key")
            // Если у вас VSСode и установлен плагин i18n-ally, то он не хочет понимать такую структуру ключа, тогда можно использовать структуру:
            // t("key", {ns: "locale-file"})
            // эту структуру понимают все
            // Вроде как у меня работает автоперенос в перевод, но я не уверен, что я всё делаю правильно ради плагина
            // Если что, потом вернусь к этому и разберусь
            {
              locales: ["ru", "en"],
              keyAsDefaultValue: true,
              saveMissing: true,
              outputPath: "public/locales/{{locale}}/{{ns}}.json",
            },
          ],
        ],
      },
    },
  };

  // Если не используем typeScript, нужен babel-loader
  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
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

  return [svgLoader, fileLoader, babelLoader, typeScriptLoader, cssLoader];
}
