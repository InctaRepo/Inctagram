import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AvatarType, UserInfoType } from '@/src/services/profile/profile-api-types'

type ProfileState = {
  ava: AvatarType | null
  info: UserInfoType | null
}

const initialState: ProfileState = {
  ava: null,
  info: null,
}

const slice = createSlice({
  initialState,

  name: 'profile',
  reducers: {
    setAva: (state, action: PayloadAction<AvatarType>) => {
      state.ava = action.payload
    },
    setUserInfo: (state, action: PayloadAction<UserInfoType>) => {
      state.info = action.payload
    },
  },
})

export const profileReducer = slice.reducer

export const profileActions = slice.actions
