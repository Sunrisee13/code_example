import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from '@/shared/consts/theme'
import ThemeDecorator from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Input } from './Input'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof Input>

export const LightInput: Story = {
  args: {
    placeholder: 'Type text',
    value: '1234356'
  }
}

export const DarkInput: Story = {
  args: {
    placeholder: 'Type text',
    value: '1234356'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}
