import { type CombinedState, configureStore, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit'

import { uiReducer } from 'feature/UI'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { $api } from 'shared/api/api'

import { createReducerManager } from './reducerManager'
import { type ThunkExtraArg, type StateSchema } from './StateSchema'

// Мы переписали на функцию, чтобы использовать данную конфигурацию и в других местах
// <store, action, middleware>
export function createReduxStore (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    ui: uiReducer
  }

  const extraArg: ThunkExtraArg = {
    api: $api
  }

  const reducerManager = createReducerManager(rootReducers)
  // <StateSchema>
  const store = configureStore({
    // Для сплитинга мы заменили rootReducers на вот это
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>, // Без этого мидлварины нормально не типизируются
    devTools: __IS_DEV__, // boolean флаг для devtools
    preloadedState: initialState, // Состояние загружаемое изначально, для сторибука потом пригодится
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg
      }
    })
  })
  // @ts-expect-error
  store.reducerManager = reducerManager
  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
