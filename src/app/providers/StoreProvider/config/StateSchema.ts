import { type AnyAction, type Reducer, type ReducersMapObject, type EnhancedStore, type CombinedState, type Dispatch } from '@reduxjs/toolkit'
import { type AxiosInstance } from 'axios'

import { type ArticlesPageSchema } from 'pages/ArticlesPage'
import { type ArticleDetailsPageSchema } from 'pages/ArcticleDetailsPage'
import { type ProfileSchema } from 'feature/editableProfileCard'
import { type LoginSchema } from 'feature/AuthByUsername'
import { type UISchema } from 'feature/UI'
import { type AddCommentFormSchema } from 'feature/AddCommentForm'
import { type CounterSchema } from 'entities/Counter'
import { type UserSchema } from 'entities/User'
import { type ArticleDetailsSchema } from 'entities/Article'
import { type rtkApi } from 'shared/api/rtkApi'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  ui: UISchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // Асинхронные редьюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsPage?: ArticleDetailsPageSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  // true - вмонтирован, false - демонтирован
  // Кастомный тип наш, с необязательными полями
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
  dispatch?: Dispatch
}
