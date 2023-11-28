import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type MenuState = {
  variantIcon: string | null
}

const initialState: MenuState = { variantIcon: null }

const slice = createSlice({
  initialState,

  name: 'menu',
  reducers: {
    setVariantIcon: (state, action: PayloadAction<string>) => {
      state.variantIcon = action.payload
    },
  },
})

export const menuReducer = slice.reducer

export const menuActions = slice.actions
