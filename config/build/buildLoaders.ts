import webpack from "webpack";

// Лоадеры нужны для работы с нестандартными файлами

export function buildLoaders(): webpack.RuleSetRule[] {
  // Если не используем typeScript, нужен babel-loader
  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      "style-loader",
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  return [typeScriptLoader, cssLoader];
}
