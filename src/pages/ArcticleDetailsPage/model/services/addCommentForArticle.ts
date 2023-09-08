import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { getArticleDetailsData } from '@/entities/Article'
import { type Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'

import { fetchCommentsArticleById } from './fetchCommentByArticleId'

// <ТоЧтоВозвращаем, Аргумент, config>
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async (text, thunkAPI) => {
    const { extra, rejectWithValue, dispatch, getState } = thunkAPI

    const userData = getUserAuthData(getState())
    const article = getArticleDetailsData(getState())

    if (!userData || !text || !article) return rejectWithValue('no data')

    try {
      const response = await extra.api.post<Comment>('/comments', {
        articleId: article.id,
        userId: userData.id,
        text
      })

      if (!response.data) throw new Error()

      dispatch(fetchCommentsArticleById(article.id))

      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
