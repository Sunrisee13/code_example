import { type AsyncThunkAction } from '@reduxjs/toolkit'
import { type StateSchema } from 'app/providers/StoreProvider'

type ActionCreatorType<Return, Arg, RejectedValue> =
(arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

// Если вдруг забуду специфику работы этого класса, можно раскоментить код в loginByUsername.test.ts (src/feature/AuthByUsername/model/services/loginByUsername)
export class TestAsynkThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any> = jest.fn() // Фиг знает, откуда мы этот тип взяли
  // Но если посмотреть на возвращаемый тип jest.fn(), то там, что-то похожее, а тут мы обобщили для функции это
  getState: () => StateSchema = jest.fn()

  // Тип для action creator копипаст с loginByUsername(когда мы туда навели мышкой)
  constructor (public actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {}

  async callThunk (arg: Arg) {
    const action = this.actionCreator(arg)
    const result = await action(this.dispatch, this.getState, undefined)

    return result
  }
}
