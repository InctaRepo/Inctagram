import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Avatar, ProfileState, UserInfo } from './profileApiTypes'

const initialState: ProfileState = {
  ava: null,
  info: null,
}

const slice = createSlice({
  initialState,

  name: 'profile',
  reducers: {
    setAva: (state, action: PayloadAction<Avatar>) => {
      state.ava = action.payload
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.info = action.payload
    },
  },
})

export const profileReducer = slice.reducer

export const profileActions = slice.actions
