import type { Meta, StoryObj } from '@storybook/react'

import StoreDecorator from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import ThemeDecorator from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

import LoginForm from './LoginForm'
import { Theme } from '@/shared/consts/theme'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LoginForm> = {
  title: 'feature/LoginForm',
  component: LoginForm,
  argTypes: {
    // backgroundColor: { control: 'color' }
  },
  decorators: [StoreDecorator({
    loginForm: { username: '123', password: 'asd' }
  })]
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const LightLoginForm: Story = {
  args: {
  },
  decorators: [StoreDecorator({
    loginForm: { username: '123', password: 'asd' }
  })]
}

export const DarkLoginForm: Story = {
  args: {
  },
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({
    loginForm: { username: '123', password: 'asd' }
  })]
}

export const withError: Story = {
  args: {
  },
  decorators: [StoreDecorator({
    loginForm: { username: '123', password: 'asd', error: 'error' }
  })]
}

export const Loading: Story = {
  args: {
  },
  decorators: [StoreDecorator({
    loginForm: { username: '123', password: 'asd', isLoading: true }
  })]
}
