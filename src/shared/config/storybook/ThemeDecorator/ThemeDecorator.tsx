/* eslint-disable react/display-name */
import { type Decorator } from '@storybook/react'

// eslint-disable-next-line sunrise-y-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { type Theme } from '@/shared/consts/theme'

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
