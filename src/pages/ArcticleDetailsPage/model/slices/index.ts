import { combineReducers } from '@reduxjs/toolkit'

import { type ArticleDetailsPageSchema } from '../types'
import { articlieDetailsCommentsReducer } from './ArticleDetailsCommentsSlice'
import { ArticleDetailsPageRecommendationsReducer } from './ArticleDetailsPageRecommendationsSlice'

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendations: ArticleDetailsPageRecommendationsReducer,
  comments: articlieDetailsCommentsReducer
})
