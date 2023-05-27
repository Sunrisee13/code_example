import { type DeepPartial } from '@reduxjs/toolkit'
import { type LoginSchema } from '../types/LoginSchema'
import { loginActions, loginReducer } from './loginSlice'

describe('loginSlice.test', () => {
  test('set username', () => {
    const state: DeepPartial<LoginSchema> = { username: 'Sasha' }
    expect(loginReducer(state as LoginSchema, loginActions.setUsername('Pedro'))).toEqual({ username: 'Pedro' })
  })

  test('set password', () => {
    const state: DeepPartial<LoginSchema> = { password: 'Sasha' }
    expect(loginReducer(state as LoginSchema, loginActions.setPassword('Pedro'))).toEqual({ password: 'Pedro' })
  })
  // Можно было бы ещё присвоение ошибки и isLoading при Pending состоянии изменить, но Тимур сказал, это избыточно (хотя то, что сделано выше, тоже избыточно))
})
