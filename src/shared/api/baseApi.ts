import type { Action, PayloadAction } from '@reduxjs/toolkit'

import { baseQueryWithReAuth } from '@/shared/api/baseQueryWithReAuth'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

function isHydrateAction(action: Action): action is PayloadAction<any> {
  return action.type === HYDRATE
}
export const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  // extractRehydrationInfo(action, { reducerPath }): any {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath]
  //   }
  // },
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'User', 'Users', 'Posts', 'Post', 'Payments', 'Profile', 'AllPosts', 'Device'],
})
