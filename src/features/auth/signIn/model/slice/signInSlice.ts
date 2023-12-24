import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { SignInSchema } from '../types/signInSchema'

export const signInSlice = createSlice({
  name: 'signIn',
  initialState: {} as SignInSchema,
  reducers: {
    setToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken
    },
    clearToken: state => {
      state.accessToken = null
    },
  },
})

export const { setToken, clearToken } = signInSlice.actions

export const { reducer: signInReducer } = signInSlice
