import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AvatarType } from '@/src/services/profile/profile-api-types'

type AvaState = {
  ava: AvatarType | null
}

const initialState: AvaState = {
  ava: null,
}

const slice = createSlice({
  initialState,

  name: 'avatar',
  reducers: {
    setAva: (state, action: PayloadAction<AvatarType>) => {
      state.ava = action.payload
    },
  },
})

export const avaReducer = slice.reducer

export const avaActions = slice.actions
