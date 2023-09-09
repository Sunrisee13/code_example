import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from '@/shared/consts/theme'
import ThemeDecorator from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Text, TextSize, TextTheme } from './Text'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Text> = {
  title: 'shared/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof Text>

export const LightPrimary: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci et id accusamus quia corporis est fugiat quidem delectus mollitia deleniti? Unde rerum quidem vel, voluptatem harum nemo eligendi error ratione!'
  }
}

export const Error: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci et id accusamus quia corporis est fugiat quidem delectus mollitia deleniti? Unde rerum quidem vel, voluptatem harum nemo eligendi error ratione!',
    theme: TextTheme.ERROR
  }
}

export const OnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun'
  }
}

export const OnlyText: Story = {
  args: {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci et id accusamus quia corporis est fugiat quidem delectus mollitia deleniti? Unde rerum quidem vel, voluptatem harum nemo eligendi error ratione!'
  }
}

export const Dark: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci et id accusamus quia corporis est fugiat quidem delectus mollitia deleniti? Unde rerum quidem vel, voluptatem harum nemo eligendi error ratione!'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const OnlyTitleDark: Story = {
  args: {
    title: 'Title lorem ipsun'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const OnlyTextDark: Story = {
  args: {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci et id accusamus quia corporis est fugiat quidem delectus mollitia deleniti? Unde rerum quidem vel, voluptatem harum nemo eligendi error ratione!'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const sizeL: Story = {
  args: {
    size: TextSize.L,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci et id accusamus quia corporis est fugiat quidem delectus mollitia deleniti? Unde rerum quidem vel, voluptatem harum nemo eligendi error ratione!'
  }
}

export const sizeM: Story = {
  args: {
    size: TextSize.M,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci et id accusamus quia corporis est fugiat quidem delectus mollitia deleniti? Unde rerum quidem vel, voluptatem harum nemo eligendi error ratione!'
  }
}
