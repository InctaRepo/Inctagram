import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { variantIconLink } from '@/src/shared/const'

export type MenuSchema = {
  variantIcon: variantIconLink
  profileFound: boolean
}

const initialState: MenuSchema = { variantIcon: null, profileFound: true }

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
