import { type AsyncThunkAction } from '@reduxjs/toolkit'
import { type StateSchema } from 'app/providers/StoreProvider'
import axios, { type AxiosStatic } from 'axios'

type ActionCreatorType<Return, Arg, RejectedValue> =
(arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)

// Мы перенесли мок аксиоса в файл

// Если вдруг забуду специфику работы этого класса, можно раскоментить код в loginByUsername.test.ts (src/feature/AuthByUsername/model/services/loginByUsername)
export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any> = jest.fn() // Фиг знает, откуда мы этот тип взяли
  // Но если посмотреть на возвращаемый тип jest.fn(), то там, что-то похожее, а тут мы обобщили для функции это

  getState: () => StateSchema
  api: jest.MockedFunctionDeep<AxiosStatic> = mockedAxios
  navigate: jest.MockedFn<any> = jest.fn()
  // Тип для action creator копипаст с loginByUsername(когда мы туда навели мышкой)
  constructor (public actionCreator: ActionCreatorType<Return, Arg, RejectedValue>, state?: DeepPartial<StateSchema>) {
    this.getState = jest.fn(() => state as StateSchema)
  }

  async callThunk (arg: Arg) {
    const action = this.actionCreator(arg)
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate
    })

    return result
  }
}
