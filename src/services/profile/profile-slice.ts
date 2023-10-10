import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from '@/src/services/auth'
import { AvatarType, UpdateProfileType } from '@/src/services/profile/profile-api-types'

type ProfileState = {
  ava: AvatarType | null
  info: UserType | null
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
    setUserInfo: (state, action: PayloadAction<UserType>) => {
      state.info = action.payload
    },
  },
})

export const profileReducer = slice.reducer

export const profileActions = slice.actions
