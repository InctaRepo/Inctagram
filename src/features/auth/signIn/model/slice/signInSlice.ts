import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { SignInSchema } from '../types/signInSchema'

export const signInSlice = createSlice({
  name: 'sigIn',
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

// Action creators are generated for each case reducer function
export const { setToken, clearToken } = signInSlice.actions

export const { reducer: signInReducer } = signInSlice
