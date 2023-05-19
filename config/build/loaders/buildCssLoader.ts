import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildCssLoader (isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      // "style-loader", заменяем для MiniCssExtractPlugin
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      // Альтернативный вариант записи loaderов
      {
        loader: 'css-loader',
        options: {
          // Подключение модульных стилей https://webpack.js.org/loaders/css-loader/#modules
          modules: {
            auto: (resPath: string) => resPath.includes('.module.'), // Можно также вставить boolean значение или regexp
            localIdentName: isDev
              ? '[path][name]__[local]' // путь-имя файла без расширения__название класса
              : '[hash:base64:8]' // метод кодирования base64, длинной 8
          }
        }
      },
      // Compiles Sass to CSS
      'sass-loader'
    ]
  }
}
