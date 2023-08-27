import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from '@/app/providers/StoreProvider'
import { userActions, type User } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'

interface LoginByUsernameProps {
  username: string
  password: string
}

// <ТоЧтоВозвращаем, Аргумент, config>
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async (AuthData, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI
    try {
      const response = await extra.api.post('/login', AuthData)

      if (!response.data) throw new Error()

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      dispatch(userActions.setAuthData(response.data))

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
