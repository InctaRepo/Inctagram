import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { baseQueryWithReAuth } from './baseQueryWithReAuth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReAuth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({}),
  tagTypes: ['Me', 'User', 'Posts', 'Post', 'Payments', 'Profile'],
})
