import {
  createEntityAdapter,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type StateSchema } from '@/app/providers/StoreProvider'
import { ArticleSortField, ArticleType, ArticleView, type Article } from '@/entities/Article'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import { type SortOrder } from '@/shared/types/sort'

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'
import { type ArticlesPageSchema } from '../types/articlesPageSchema'
// Как я понимаю, тут мы задаем, как именно будет происходить нормализация данных (мол, будем оставлять айдишник)
const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
  name: 'articleDetailsCommentSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
    page: 1,
    hasMore: true,
    limit: 9,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL,
    _inited: false
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    initState: state => {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView
      state.view = view
      state.limit = view === ArticleView.BIG ? 4 : 16
      state._inited = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true

        if (action.meta.arg.replace) articlesAdapter.removeAll(state)
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false
        articlesAdapter.addMany(state, action.payload)

        if (action.meta.arg.replace) articlesAdapter.setAll(state, action.payload)
        else state.hasMore = action.payload.length >= state.limit // В action payload у нас прилетает количество оставшихся страниц
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
}
)

export const { actions: articlesPageActions } = articlesPageSlice
export const { reducer: articlesPageReducer } = articlesPageSlice
