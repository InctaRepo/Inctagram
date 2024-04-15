import { AuthMeSchema } from '@/shared/hoc'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const authMeSlice = createSlice({
  initialState: {} as AuthMeSchema,
  name: 'authMe',
  reducers: {
    setAuthMeData: (state, action: PayloadAction<AuthMeSchema>) => {
      state.authMeData = action.payload.authMeData
    },
  },
})

export const { reducer: authMeReducer } = authMeSlice
export const { setAuthMeData } = authMeSlice.actions
