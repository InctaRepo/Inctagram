import { StateSchema } from '@/store'
import { createSelector } from '@reduxjs/toolkit'

export const profileFoundSelector = createSelector(
  [(state: StateSchema) => state.menu.profileFound],
  profileFound => {
    return profileFound
  }
)
