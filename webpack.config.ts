import HtmlWebpackPlugin from "html-webpack-plugin"; // Плагин для html
import path from "path";
import webpack from "webpack";
// На убунте запуск sudo webpack, когда установим глобально

const config: webpack.Configuration = {
  mode: "development", // development / production(max сжатие)

  entry: path.resolve(__dirname, "src", "index.ts"), // Откуда забираем файл

  output: {
    filename: "[name].[contenthash].js", // https://webpack.js.org/configuration/output/#template-strings
    // [name] - entry можно сделать объектом с нескольктими путями, это - имя
    // [contenthash] - в зависимости от контента хэш
    path: path.resolve(__dirname, "build"), // Куда кладём файл
    clean: true, // Чистим лишние файлы в бандле (предыдущие)
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), // https://github.com/jantimon/html-webpack-plugin#options путь шаблона
    }),
    new webpack.ProgressPlugin(), // чтобы видеть процесс загрузки. Идёт из коробки
  ],
  // Подключаем typescript и устанавливаем npm i -D typescript ts-loader

  module: {
    // Тут все loader`ы , для работы с нестандартными расширениями
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"], // Пишем расширения, которые не будут указываться при импорте
  },
};

export default config;
