import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type StateSchema } from '@/app/providers/StoreProvider'
import { type Article } from '@/entities/Article'

import { fetchArticleRecommendations } from '../services/fetchRecommendations'
import { type ArticleDetailsResommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema'

const recomendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id
})

export const getArticleRecomendations = recomendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recommendations || recomendationsAdapter.getInitialState()
)

export const ArticleDetailsPageRecommendationsSlice = createSlice({
  name: 'ArticleDetailsPageRecommendationsSlice',
  initialState: recomendationsAdapter.getInitialState<ArticleDetailsResommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}

  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false
        recomendationsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

// export const { actions: ArticleDetailsPageRecommendationsActions } = ArticleDetailsPageRecommendationsSlice
export const { reducer: ArticleDetailsPageRecommendationsReducer } = ArticleDetailsPageRecommendationsSlice
