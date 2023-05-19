/* eslint-disable react/display-name */
import { type Decorator } from '@storybook/react'
import { type Theme } from 'app/providers/ThemeProvider'

const ThemeDecorator =
(theme: Theme): Decorator =>
  (Story) =>
    (
     <div className={`app ${theme}`}>
        <Story />
      </div>
    )

export default ThemeDecorator
