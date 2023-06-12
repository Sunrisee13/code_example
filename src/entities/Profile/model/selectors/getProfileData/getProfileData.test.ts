import { type StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

import { getProfileData } from './getProfileData'

describe('getProfileData.test', () => {
  test('should return error', () => {
    const data = {
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
        data
      }
    }
    expect(getProfileData(state as StateSchema)).toEqual(data)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
