import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Avatar, UserInfo } from '@/src/services/profile/profileApi.types'

type ProfileState = {
  ava: Avatar | null
  info: UserInfo | null
}

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
