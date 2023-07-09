import { type EntityState } from '@reduxjs/toolkit'

import { type ArticleView, type Article, type ArticleSortField, type ArticleType } from 'entities/Article'
import { type SortOrder } from 'shared/types'

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string

  // pagination
  page: number
  hasMore: boolean
  limit: number
  // filters
  view: ArticleView
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}
