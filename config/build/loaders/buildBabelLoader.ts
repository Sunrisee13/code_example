import { type BuildOptions } from '../types/config'

export function buildBabelLoader (options: BuildOptions) {
  return {
    test: /\.(js|jsx|ts|tsx)$/, // ts не забыли?
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'], // Пресет, который преобразует код в зависимости от окружения
        plugins: [
          [
            'i18next-extract',
            // Для того, чтобы плагин видел файлы локализаций, можно использовать структуру ключа
            // t("locale-file:key")
            // Если у вас VSСode и установлен плагин i18n-ally, то он не хочет понимать такую структуру ключа, тогда можно использовать структуру:
            // t("key", {ns: "locale-file"})
            // эту структуру понимают все
            // Вроде как у меня работает автоперенос в перевод, но я не уверен, что я всё делаю правильно ради плагина
            // Если что, потом вернусь к этому и разберусь
            {
              locales: ['ru', 'en'],
              keyAsDefaultValue: true,
              saveMissing: true,
              outputPath: 'public/locales/{{locale}}/{{ns}}.json'
            }
          ], options.isDev && require.resolve('react-refresh/babel')
        ].filter(Boolean)
      }
    }
  }
}
