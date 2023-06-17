import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { Modal } from './Modal'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Modal> = {
  title: 'shared/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof Modal>

export const LightModal: Story = {
  args: { isOpen: true, children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda repellendus, praesentium necessitatibus nemo sed numquam ab fuga beatae a dolores facilis, officiis alias temporibus tempora totam tempore repudiandae voluptatibus corrupti' }
}

export const DarkModal: Story = {
  args: { isOpen: true, children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda repellendus, praesentium necessitatibus nemo sed numquam ab fuga beatae a dolores facilis, officiis alias temporibus tempora totam tempore repudiandae voluptatibus corrupti' },
  decorators: [ThemeDecorator(Theme.DARK)]
}
