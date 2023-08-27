import {
  createEntityAdapter,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type StateSchema } from '@/app/providers/StoreProvider'
import { type Comment } from '@/entities/Comment'

import { fetchCommentsArticleById } from '../services/fetchCommentByArticleId'
import { type ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'

// Как я понимаю, тут мы задаем, как именно будет происходить нормализация данных (мол, будем оставлять айдишник)
const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id
})
// https://redux-toolkit.js.org/api/createEntityAdapter
// Надо будет немного поподробнее про это почитать

// Тут мы типо определили селектор, на кусок стейта, или если он не определен, чтобы возвращался initialState
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
)

const articleDetailsCommentSlice = createSlice({
  name: 'articleDetailsCommentSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}

  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsArticleById.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchCommentsArticleById.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false
        commentsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchCommentsArticleById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
}
)

export const { reducer: articlieDetailsCommentsReducer } = articleDetailsCommentSlice
