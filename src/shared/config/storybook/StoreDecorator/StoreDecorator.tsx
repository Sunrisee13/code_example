import { type Decorator } from '@storybook/react'
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice'
import { profileReducer } from 'entities/Profile'
import { addCommentFormReducer } from 'feature/AddCommentForm/model/slices/addCommentFormSlice'
import { loginReducer } from 'feature/AuthByUsername/model/slice/loginSlice'
import { articlieDetailsCommentsReducer } from 'pages/ArcticleDetailsPage/model/slices/ArticleDetailsCommentsSlice'
import { type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsComments: articlieDetailsCommentsReducer
}

const StoreDecorator =
(state: DeepPartial<StateSchema>, asyncReducers?: ReducersList): Decorator =>
  (Story) => (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }} >
          <Story />
       </StoreProvider>
  )

export default StoreDecorator
