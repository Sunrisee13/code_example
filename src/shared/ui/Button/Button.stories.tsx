import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Button, ButtonSize, ButtonTheme } from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Text'
  }
}

export const Clear: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.CLEAR
  }
}

export const ClearInverted: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.CLEAR_INVERTED
  }
}

export const Outline: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE
  }
}

export const OutlineRed: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE_RED
  }
}

export const OutlineSizeL: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L
  }
}

export const OutlineSizeXl: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.XL
  }
}

export const OutlineDark: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Background: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND
  }
}

export const BackgroundInverted: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND_INVERTED
  }
}

export const Square: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.OUTLINE,
    square: true
  }
}

export const SquareSizeM: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.OUTLINE,
    square: true,
    size: ButtonSize.M
  }
}

export const SquareSizeL: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.OUTLINE,
    square: true,
    size: ButtonSize.L
  }
}

export const SquareSizeXL: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.OUTLINE,
    square: true,
    size: ButtonSize.XL
  }
}

export const Disabled: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.OUTLINE,
    disabled: true
  }
}
