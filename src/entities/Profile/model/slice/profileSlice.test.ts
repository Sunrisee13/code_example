import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

import { ValidateProfileError, type ProfileSchema } from '../types/Profile'
import { profileActions, profileReducer } from './profileSlice'

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

describe('profileSlice.test', () => {
  test('set username', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false }
    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true })
  })

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } }
    expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({ readonly: true, validateErrors: undefined, data, form: data })
  })

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '' } }
    expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ username: '123456' }))).toEqual({ form: { username: '123456' } })
  })

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] }
    expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({ isLoading: true, validateErrors: undefined })
  })

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true }
    expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ''))).toEqual({ isLoading: false, validateErrors: undefined, readonly: true, data, form: data })
  })
})
