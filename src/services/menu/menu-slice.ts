import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type MenuState = {
  variantIcon: 'home' | 'search' | 'my-profile' | 'create' | 'message' | 'logout' | 'favorites'
}

const initialState: MenuState = { variantIcon: 'my-profile' }

const slice = createSlice({
  initialState,

  name: 'menu',
  reducers: {
    setVariantIcon: (
      state,
      action: PayloadAction<
        'home' | 'search' | 'my-profile' | 'create' | 'message' | 'logout' | 'favorites'
      >
    ) => {
      state.variantIcon = action.payload
    },
  },
})

export const menuReducer = slice.reducer

export const menuActions = slice.actions
