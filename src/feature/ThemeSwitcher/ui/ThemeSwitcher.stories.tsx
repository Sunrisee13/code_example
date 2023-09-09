import type { Meta, StoryObj } from '@storybook/react'
import ThemeDecorator from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Theme } from '@/shared/consts/theme'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ThemeSwitcher> = {
  title: 'shared/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof ThemeSwitcher>

export const Light: Story = {
  args: {
  }
}

export const Dark: Story = {
  args: {
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}
