import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import { setFeatureFlags } from '@/shared/lib/features'

import { saveJsonSettings } from '../services/saveJsonSettings'
import { type JsonSettings } from '../types/jsonSettings'
import { type User, type UserSchema } from '../types/user'

const initialState: UserSchema = {
  _inited: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      setFeatureFlags(action.payload.features)
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        const json = JSON.parse(user) as User
        state.authData = json
        setFeatureFlags(json.features)
      }
      state._inited = true
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload
        }
      }
    )
  }
})

export const { actions: userActions } = userSlice

export const { reducer: userReducer } = userSlice
