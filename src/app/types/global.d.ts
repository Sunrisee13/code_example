declare module '*.scss' {
  type IClassNames = Record<string, string>
  const classNames: IClassNames
  export = classNames
}

// За подсказкой обращался сюда https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack
// Для того, чтобы понимать import styles from '...module.css'

// Для автокомплита
// ✅ В VSC в рабочей области клавиша F1 > TypeScript select TypeScript version > use workspace version.
// Если при нажатии F1 не находиш TypeScript, то в настройках VSC > TypeScript > ставим галочку: TypeScript: Enable Prompt Use Workspace Tsdk
//
// ✅ Ставим плагин: npm i -D typescript-plugin-css-modules
//
// ✅ Добавляем в файл tsconfig.json
// "plugins": [
// {
// "name": "typescript-plugin-css-modules"
// }
// ]

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.svg' {
  import type React from 'react'
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare const __IS_DEV__: boolean
declare const __API__: string
