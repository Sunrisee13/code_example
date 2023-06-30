import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Profile } from '../../types/Profile'

// <ТоЧтоВозвращаем, Аргумент, config>
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (profileId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    try {
      const response = await extra.api.get<Profile>(`/profile/${profileId}`)

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
