import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import AvatarImg from 'shared/assets/tests/testAva.png'

import { ProfileCard } from './ProfileCard'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProfileCard> = {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  args: {
    data: {
      username: 'admim',
      age: 23,
      country: Country.Ukraine,
      lastname: 'aminovych',
      first: 'bob',
      city: 'spb',
      currency: Currency.EUR,
      avatar: AvatarImg
    }
  }
}

export default meta
type Story = StoryObj<typeof ProfileCard>

export const LightProfileCard: Story = {}

export const DarkProfileCard: Story = {
  args: {
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const WithError: Story = {
  args: {
    error: 'true'
  }
}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}
