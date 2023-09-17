import { type Decorator } from '@storybook/react'

import { type StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { articleDetailsReducer } from '@/entities/Article/testing'
import { loginReducer } from '@/feature/AuthByUsername/testing'
import { profileReducer } from '@/feature/editableProfileCard/testing'
import { type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing'
import { addCommentFormReducer } from '@/feature/addCommentForm/testing'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer
}

const StoreDecorator =
(state: DeepPartial<StateSchema>, asyncReducers?: ReducersList): Decorator =>
  (Story) => (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }} >
          <Story />
       </StoreProvider>
  )

export default StoreDecorator
