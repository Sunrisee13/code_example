import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from 'entities/Counter'
import { type StateSchema } from './StateSchema'
// Мы переписали на функцию, чтобы использовать данную конфигурацию и в других местах
// <store, action, middleware>
export function createReduxStore (initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      counter: counterReducer
    },
    devTools: __IS_DEV__, // boolean флаг для devtools
    preloadedState: initialState // Состояние загружаемое изначально, для сторибука потом пригодится
  })
}

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
