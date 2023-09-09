import { combineReducers } from '@reduxjs/toolkit'

import { articlieDetailsCommentsReducer } from './ArticleDetailsCommentsSlice'
import { ArticleDetailsPageRecommendationsReducer } from './ArticleDetailsPageRecommendationsSlice'
import { type ArticleDetailsPageSchema } from '../types'

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendations: ArticleDetailsPageRecommendationsReducer,
  comments: articlieDetailsCommentsReducer
})
