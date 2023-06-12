import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

import { ValidateProfileError } from '../../types/Profile'
import { validateProfileData } from './validateProfileData'

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

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data)

    expect(result).toEqual([])
  })

  test('without first and last name', async () => {
    const result = validateProfileData({ ...data, first: '', lastname: '' })

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
  })

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: 45.3 })

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE])
  })

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined })

    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY])
  })

  test('incorrect all', async () => {
    const result = validateProfileData({})

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE, ValidateProfileError.INCORRECT_COUNTRY])
  })
})
