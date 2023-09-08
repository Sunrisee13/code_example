import { type Decorator } from '@storybook/react'

import { type StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { articleDetailsPageReducer } from '@/pages/ArcticleDetailsPage'
import { addCommentFormReducer } from '@/feature/AddCommentForm'
import { loginReducer } from '@/feature/AuthByUsername'
import { articleDetailsReducer } from '@/entities/Article'
import { type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from '@/feature/editableProfileCard'

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
