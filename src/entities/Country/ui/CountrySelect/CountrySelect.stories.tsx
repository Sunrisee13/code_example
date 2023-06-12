import type { Meta, StoryObj } from '@storybook/react'

import { CountrySelect } from './CountrySelect'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CountrySelect> = {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof CountrySelect>

export const Primary: Story = {
  args: {}
}
