/* eslint-disable react/display-name */
import { type Decorator } from '@storybook/react'
import { ThemeProvider, type Theme } from 'app/providers/ThemeProvider'

// Распишу на примере этого декоратора, остальные гораздо проще
// Мы вызываем декораток с темой, он замыкает в себе значение и возвращает коллбэк декоратор
// который и применяется уже в других файлах, оборачивая что-то во что-то
const ThemeDecorator =
(theme: Theme): Decorator =>
  (Story) =>
    (
      <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
          <Story />
        </div>
      </ThemeProvider>
    )

export default ThemeDecorator
