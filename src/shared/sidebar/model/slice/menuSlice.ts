import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { variantIconLink } from '@/src/shared/const'

export type MenuState = {
  variantIcon: variantIconLink
  profileFound: boolean
}

const initialState: MenuState = { variantIcon: null, profileFound: true }

const menuSlice = createSlice({
  initialState,

  name: 'menu',
  reducers: {
    setVariantIcon: (state, action: PayloadAction<variantIconLink | null>) => {
      state.variantIcon = action.payload
    },
    setProfileFound: (state, action: PayloadAction<boolean>) => {
      state.profileFound = action.payload
    },
  },
})

export const { reducer: menuReducer } = menuSlice

export const { setVariantIcon, setProfileFound } = menuSlice.actions
