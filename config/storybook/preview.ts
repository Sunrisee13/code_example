import type { Preview } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import RouterDecorator from 'shared/config/storybook/RouterDecorator/RouterDecorator'
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import TranslationDecorator from 'shared/config/storybook/TranslationDecorator/TranslationDecorator'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
// import { addDecorator } from '@storybook/react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [StyleDecorator, ThemeDecorator(Theme.LIGHT), RouterDecorator, TranslationDecorator]
}

export default preview

// addDecorator(StyleDecorator)
