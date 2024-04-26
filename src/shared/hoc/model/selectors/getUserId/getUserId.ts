import { StateSchema } from '@/store'
import { createSelector } from '@reduxjs/toolkit'

export const getUserIdMemo = (state: StateSchema) => state.authMe.authMeData?.userId
export const getSignInIdMemo = (state: StateSchema) => state.signIn.id

export const getUserId = createSelector([getUserIdMemo, getSignInIdMemo], (userId, id) => {
  return userId ?? id
})
