import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type MenuState = {
  variantIcon: string | null
}

const initialState: MenuState = { variantIcon: null }

const menuSlice = createSlice({
  initialState,

  name: 'menu',
  reducers: {
    setVariantIcon: (state, action: PayloadAction<string>) => {
      state.variantIcon = action.payload
    },
  },
})

export const { reducer: menuReducer } = menuSlice

export const { setVariantIcon } = menuSlice.actions
