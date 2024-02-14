import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { SignInSchema } from '@/features/auth/signIn'

export const signInSlice = createSlice({
  name: 'signIn',
  initialState: {} as SignInSchema,
  reducers: {
    setToken: (state, action: PayloadAction<SignInSchema>) => {
      state.accessToken = action.payload.accessToken
    },
    clearToken: state => {
      state.accessToken = null
    },
    setId: (state, action: PayloadAction<SignInSchema>) => {
      state.id = action.payload.id
    },
    clearId: state => {
      state.id = null
    },
  },
})

export const { setToken, clearToken, clearId, setId } = signInSlice.actions

export const { reducer: signInReducer } = signInSlice
