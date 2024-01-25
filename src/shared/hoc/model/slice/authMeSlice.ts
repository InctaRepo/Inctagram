import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthMeSchema } from '@/shared/hoc'

const authMeSlice = createSlice({
  name: 'authMe',
  initialState: {} as AuthMeSchema,
  reducers: {
    setAuthMeData: (state, action: PayloadAction<AuthMeSchema>) => {
      state.authMeData = action.payload.authMeData
    },
  },
})

export const { reducer: authMeReducer } = authMeSlice
export const { setAuthMeData } = authMeSlice.actions
