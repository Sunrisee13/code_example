import type { Meta, StoryObj } from '@storybook/react'

import StoreDecorator from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import ThemeDecorator from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { Navbar } from './Navbar'
import { Theme } from '@/shared/consts/theme'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Navbar> = {
  title: 'widget/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Light: Story = {
  args: {
  },
  decorators: [StoreDecorator({

  })]
}

export const Dark: Story = {
  args: {
  },
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({

  })]
}
