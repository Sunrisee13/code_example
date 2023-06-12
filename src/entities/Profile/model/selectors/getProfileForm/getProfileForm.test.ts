import { type StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

import { getProfileForm } from './getProfileForm'

describe('getProfileForm.test', () => {
  test('should return error', () => {
    const form = {
      username: 'admin',
      age: 23,
      country: Country.Ukraine,
      lastname: 'aminovych',
      first: 'bob',
      city: 'spb',
      currency: Currency.EUR,
      avatar: '123'
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        form
      }
    }
    expect(getProfileForm(state as StateSchema)).toEqual(form)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileForm(state as StateSchema)).toEqual(undefined)
  })
})
