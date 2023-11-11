import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { BaseResponseType } from '@/src/services'
import { UserInfoType } from '@/src/services/profile/profile-api-types'

export const ProfileSSRAPI = createApi({
  reducerPath: 'profileSSRAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.space/api/v1/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['profileSSR'],
  endpoints: builder => ({
    getProfileSSR: builder.query<BaseResponseType<UserInfoType>, string | undefined>({
      query: id => ({
        method: 'GET',
        url: `users/profile/${id}`,
      }),
    }),
  }),
})

export const {
  util: { getRunningQueriesThunk },
} = ProfileSSRAPI

// export endpoints for use in SSR

export const { getProfileSSR } = ProfileSSRAPI.endpoints
