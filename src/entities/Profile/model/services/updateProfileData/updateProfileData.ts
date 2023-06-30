import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from 'app/providers/StoreProvider'

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { ValidateProfileError, type Profile } from '../../types/Profile'
import { validateProfileData } from '../validateProfileData/validateProfileData'

// <ТоЧтоВозвращаем, Аргумент, config>
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI
    const formData = getProfileForm(getState())

    const errors = validateProfileData(formData)

    if (errors.length) {
      return rejectWithValue(errors)
    }

    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)

      if (!response.data) throw new Error()

      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue([ValidateProfileError.SERVER_ERROR])
    }
  }
)