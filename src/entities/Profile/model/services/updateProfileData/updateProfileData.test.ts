import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { TestAsynkThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

import { ValidateProfileError } from '../../types/Profile'
import { updateProfileData } from './updateProfileData'

// jest.mock('axios') // Убрать нельзя, тк ниже мы уже обрабатываем мокнутую библиотеку(как я понял)

// const mockedAxios = jest.mocked(axios, true) // Модуль, который мы мокаем, мокаем ли мы внутренние поля

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

describe('updateProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsynkThunk(updateProfileData, {
      profile: {
        form: data
      }
    })
    thunk.api.put.mockReturnValue(Promise.resolve({ data }))
    const result = await thunk.callThunk()

    expect(thunk.api.put).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })

  test('error login', async () => {
    const thunk = new TestAsynkThunk(updateProfileData, {
      profile: {
        form: data
      }
    })
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
  })

  test('validate error', async () => {
    const thunk = new TestAsynkThunk(updateProfileData, {
      profile: {
        form: { ...data, lastname: '' }
      }
    })
    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
  })
})
