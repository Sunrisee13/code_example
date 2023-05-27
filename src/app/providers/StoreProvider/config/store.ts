import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { createReducerManager } from './reducerManager'
import { type StateSchema } from './StateSchema'
// Мы переписали на функцию, чтобы использовать данную конфигурацию и в других местах
// <store, action, middleware>
export function createReduxStore (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore<StateSchema>({
    // Для сплитинга мы заменили rootReducers на вот это
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__, // boolean флаг для devtools
    preloadedState: initialState // Состояние загружаемое изначально, для сторибука потом пригодится
  })
  // @ts-expect-error
  store.reducerManager = reducerManager
  return store
}
