import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { TestAsynkThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

import { fetchProfileData } from './fetchProfileData'

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

describe('fetchProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsynkThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ data }))
    const result = await thunk.callThunk('1')

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })

  test('error login', async () => {
    const thunk = new TestAsynkThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk('1')

    expect(result.meta.requestStatus).toBe('rejected')
  })
})
