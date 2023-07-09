import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Article } from 'entities/Article'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'article/fetchArticleRecommendations',
  async (props, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _limit: 4
        }
      })

      if (!response.data) throw new Error()

      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
