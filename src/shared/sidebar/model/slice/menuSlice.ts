import { variantIconLink } from '@/shared/const'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type MenuSchema = {
  profileFound: boolean
  variantIcon: variantIconLink
}

const initialState: MenuSchema = { profileFound: true, variantIcon: null }

const menuSlice = createSlice({
  initialState,
  name: 'menu',
  reducers: {
    setProfileFound: (state, action: PayloadAction<boolean>) => {
      state.profileFound = action.payload
    },
    setVariantIcon: (state, action: PayloadAction<null | variantIconLink>) => {
      state.variantIcon = action.payload
    },
  },
})

export const { reducer: menuReducer } = menuSlice

export const { setProfileFound, setVariantIcon } = menuSlice.actions
