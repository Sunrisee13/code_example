import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import StoreDecorator from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { LoginForm } from './LoginForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LoginForm> = {
  title: 'feature/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
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
