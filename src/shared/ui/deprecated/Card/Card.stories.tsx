import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'shared/Card',
  component: Card
}

export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  args: {
    children: 'sdlkgsjflsdjfkldsjfkldsjklfjsdlfjls'
  }
}
