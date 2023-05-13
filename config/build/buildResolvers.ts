import { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js"], // Пишем расширения, которые не будут указываться при импорте
  };
}
