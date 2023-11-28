import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../authService/authApiTypes'

type AuthState = {
  user: UserType | null
  isAuth: boolean
}

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

//
// export const authReducer = slice.reducer
//
// export const authActions = slice.actions
export const { reducer: authReducer } = authSlice
export const { setLogout, setIsAuth, setUser } = authSlice.actions
