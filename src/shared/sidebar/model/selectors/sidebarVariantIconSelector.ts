import { StateSchema } from '@/store'
import { createSelector } from '@reduxjs/toolkit'

export const sidebarVariantIconSelector = createSelector(
  [(state: StateSchema) => state.menu.variantIcon],
  variantIcon => variantIcon
)
