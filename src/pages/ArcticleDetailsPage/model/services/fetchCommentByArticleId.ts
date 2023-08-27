import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { type Comment } from '@/entities/Comment'

// <ТоЧтоВозвращаем, Аргумент, config>
export const fetchCommentsArticleById = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
  'article/fetchCommentsArticleById',
  async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    if (!articleId) {
      return rejectWithValue('error')
    }

    try {
      const response = await extra.api.get<Comment[]>('/comments', {
        params: {
          articleId,
          _expand: 'user'
        }
      })

      if (!response.data) throw new Error()

      return response.data
    } catch (e) {
      return rejectWithValue('error')
      // Если моими словами, как я понял эту конструкцию
      // Мы создаём экстра редьюсеры, которые зависят от состояния thunk
      // и с помощью thunk Api мы можем передавать payload (который мы протипизировали)
    }
  }
)
