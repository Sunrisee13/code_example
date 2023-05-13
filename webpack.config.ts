import webpack from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildPaths } from "./config/build/types/config";
import path from "path";

// На убунте запуск sudo webpack, когда установим глобально или npx webpack
// При глобальном использовании, первый раз поставились права для root пользователя
// Надо будет для скриптов поменять разрешения для папки build

const paths: BuildPaths = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  build: path.resolve(__dirname, "build"),
  html: path.resolve(__dirname, "public", "index.html"),
};

const mode = "development";
const isDev = mode === "development";

const config: webpack.Configuration = buildWebpackConfig({
  mode,
  paths,
  isDev,
});

export default config;
