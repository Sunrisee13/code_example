import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { Sidebar } from './Sidebar'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Sidebar> = {
  title: 'widget/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Light: Story = {
  args: {
  }
}

export const Dark: Story = {
  args: {
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

// export const Outline: Story = {
//   args: {
//     children: 'Text',
//     theme: ThemeButton.OUTLINE
//   }
// }

// export const OutlineDark: Story = {
//   args: {
//     children: 'Text',
//     theme: ThemeButton.OUTLINE
//   }
