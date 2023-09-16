import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'

import { getUserDataByIdQuery } from '../../api/userApi'
import { type User } from '../types/user'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)

    if (!userId) {
      return rejectWithValue('')
    }

    try {
      const response = await dispatch(
        getUserDataByIdQuery(userId)
      ).unwrap()

      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue('')
    }
  }
)
