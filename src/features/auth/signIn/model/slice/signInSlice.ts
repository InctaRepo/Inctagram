import { SignInSchema } from '@/features/auth/signIn'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const signInSlice = createSlice({
  initialState: {} as SignInSchema,
  name: 'signIn',
  reducers: {
    clearId: state => {
      state.id = null
    },
    clearToken: state => {
      state.accessToken = null
    },
    setId: (state, action: PayloadAction<SignInSchema>) => {
      state.id = action.payload.id
    },
    setToken: (state, action: PayloadAction<SignInSchema>) => {
      state.accessToken = action.payload.accessToken
    },
  },
})

export const { clearId, clearToken, setId, setToken } = signInSlice.actions

export const { reducer: signInReducer } = signInSlice
