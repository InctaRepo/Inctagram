import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  Avatar,
  ProfileState,
  UserInfo,
} from 'src/features/profileSettings/service/profileSettingsTypes'

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

//TODO
export const profileReducer = slice.reducer

export const profileActions = slice.actions
