import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { userActions, type User } from 'entities/User'
import i18n from 'shared/config/i18n/i18n'
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage'

interface LoginByUsernameProps {
  username: string
  password: string
}

// <ТоЧтоВозвращаем, Аргумент, config>
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  'login/loginByUsername',
  async (AuthData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/login', AuthData)

      if (!response.data) throw new Error()

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      thunkAPI.dispatch(userActions.setAuthData(response.data))

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'))
      // Если моими словами, как я понял эту конструкцию
      // Мы создаём экстра редьюсеры, которые зависят от состояния thunk
      // и с помощью thunk Api мы можем передавать payload (который мы протипизировали)
    }
  }
)
