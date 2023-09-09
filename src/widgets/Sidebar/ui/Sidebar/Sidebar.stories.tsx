import type { Meta, StoryObj } from '@storybook/react'

import StoreDecorator from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import ThemeDecorator from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'

import { Sidebar } from './Sidebar'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Sidebar> = {
  title: 'widget/Sidebar',
  component: Sidebar,
  decorators: [StoreDecorator({ user: { authData: {} } })]
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const NoAuth: Story = {
  decorators: [StoreDecorator({ user: {} })]
}
