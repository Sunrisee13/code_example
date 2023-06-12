import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'
import AvatarImg from './1676295806139337963.png'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Avatar> = {
  title: 'shared/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Normal150: Story = {
  args: {
    size: 150,
    src: AvatarImg
  }
}

export const Default100: Story = {
  args: {
    src: AvatarImg
  }
}
