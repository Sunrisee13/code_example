import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Select> = {
  title: 'shared/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof Select>

export const Primary: Story = {
  args: {
    label: 'Укажите значение',
    options: [
      { value: '123', content: '123' },
      { value: '12', content: '12' },
      { value: '1234', content: '1234' }
    ]
  }
}
