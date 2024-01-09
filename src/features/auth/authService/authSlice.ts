import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState, UserType } from '@/src/features/auth/authService/authApiTypes'

const initialState: AuthState = {
  user: null,
  isAuth: false,
}

const authSlice = createSlice({
  initialState,

  name: 'auth',
  reducers: {
    setLogout: () => initialState,
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
  },
})

export const { reducer: authReducer } = authSlice
export const { setLogout, setIsAuth, setUser } = authSlice.actions
