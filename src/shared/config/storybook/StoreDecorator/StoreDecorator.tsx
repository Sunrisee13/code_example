import { type Decorator } from '@storybook/react'

import { type StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { articleDetailsPageReducer } from '@/pages/ArcticleDetailsPage/model/slices'
import { addCommentFormReducer } from '@/feature/AddCommentForm/model/slices/addCommentFormSlice'
import { loginReducer } from '@/feature/AuthByUsername/model/slice/loginSlice'
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice'
import { type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from '@/feature/editableProfileCard/model/slice/profileSlice'

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
