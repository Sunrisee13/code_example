import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from 'app/providers/StoreProvider'

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

// <ТоЧтоВозвращаем, Аргумент, config>
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'article/initArticlesPage',
  async (_, thunkAPI) => {
    const { dispatch, getState } = thunkAPI
    const inited = getArticlesPageInited(getState())
    if (!inited) {
      dispatch(articlesPageActions.initState())
      dispatch(fetchArticlesList({
        page: 1
      }))
    }
  }
)
