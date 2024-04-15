import { baseQueryWithReAuth } from '@/shared/api/baseQueryWithReAuth'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'User', 'Users', 'Posts', 'Post', 'Payments', 'Profile', 'AllPosts', 'Device'],
})
