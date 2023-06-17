import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'

import { type Article } from '../../types/article'

// <ТоЧтоВозвращаем, Аргумент, config>
export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
  'article/fetchArticleById',
  async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    try {
      const response = await extra.api.get<Article>(`/articles/${articleId}`)

      if (!response.data) throw new Error()

      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue('error')
      // Если моими словами, как я понял эту конструкцию
      // Мы создаём экстра редьюсеры, которые зависят от состояния thunk
      // и с помощью thunk Api мы можем передавать payload (который мы протипизировали)
    }
  }
)
