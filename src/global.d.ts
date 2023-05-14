declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

// За подсказкой обращался сюда https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack
// Для того, чтобы понимать import styles from '...module.css'
// По поводу автокомплита на vs code надо уточнить

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