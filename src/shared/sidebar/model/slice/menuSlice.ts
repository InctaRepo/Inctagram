import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { variantIconLink } from '@/src/shared/const'

export type MenuState = {
  variantIcon: variantIconLink | null
}

const initialState: MenuState = { variantIcon: null }

const menuSlice = createSlice({
  initialState,

  name: 'menu',
  reducers: {
    setVariantIcon: (state, action: PayloadAction<variantIconLink | null>) => {
      state.variantIcon = action.payload
    },
  },
})

export const { reducer: menuReducer } = menuSlice

export const { setVariantIcon } = menuSlice.actions
