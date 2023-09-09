import type { Preview } from '@storybook/react'

import RouterDecorator from '@/shared/config/storybook/RouterDecorator/RouterDecorator'
import ThemeDecorator from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'

import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
// import { addDecorator } from '@storybook/react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [StyleDecorator, ThemeDecorator(Theme.LIGHT), RouterDecorator]
}

export default preview

// addDecorator(StyleDecorator)
