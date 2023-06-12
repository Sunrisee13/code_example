import type { Meta, StoryObj } from '@storybook/react'

import { CurrencySelect } from './CurrencySelect'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CurrencySelect> = {
  title: 'entities/CurrencySelect',
  component: CurrencySelect,
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof CurrencySelect>

export const Primary: Story = {
  args: {}
}
