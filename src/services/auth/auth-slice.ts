import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '' as string,
  },
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
    },
  },
})

export const authReducer = slice.reducer

export const authActions = slice.actions
