import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from '@/shared/consts/theme'
import ThemeDecorator from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { AppLink, AppLinkTheme } from './AppLink'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppLink> = {
  title: 'shared/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  },
  args: {
    to: '/'
  }
}

export default meta
type Story = StoryObj<typeof AppLink>

export const Common: Story = {
  args: {
    children: 'Text'
  }
}

export const Primary: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.PRIMARY
  }
}

export const Secondary: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.SECONDARY
  }
}

export const Red: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.RED
  }
}

export const PrimaryDark: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.PRIMARY
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const SecondaryDark: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.SECONDARY
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const RedDark: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.RED
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

// export const OutlineDark: Story = {
//   args: {
//     children: 'Text',
//     theme: ThemeAppLink.OUTLINE
//   },
//   decorators: [ThemeDecorator(Theme.DARK)]
// }
