import type { Meta, StoryObj } from '@storybook/react'

import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import AvatarImg from '@/shared/assets/tests/testAva.png'
import StoreDecorator from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import ThemeDecorator from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'

import ProfilePage from './ProfilePage'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProfilePage> = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  decorators: [StoreDecorator({
    profile: {
      form: {
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
  })]
}

export default meta
type Story = StoryObj<typeof ProfilePage>

export const Light: Story = {
  args: {
  }
}

export const Dark: Story = {
  args: {
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}
