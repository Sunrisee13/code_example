import { type AnyAction, type Reducer, type ReducersMapObject, type EnhancedStore, type CombinedState, type Dispatch } from '@reduxjs/toolkit'
import { type AxiosInstance } from 'axios'
import { type NavigateOptions, type To } from 'react-router-dom'

import { type LoginSchema } from 'feature/AuthByUsername'
import { type CounterSchema } from 'entities/Counter'
import { type ProfileSchema } from 'entities/Profile'
import { type UserSchema } from 'entities/User'
import { type ArticleDetailsSchema } from 'entities/Article'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema

  // Асинхронные редьюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
  dispatch?: Dispatch
}
