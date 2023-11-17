import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { UserInfo } from '../../profile/service/profileApiTypes'

export const ProfileSsrApi = createApi({
  reducerPath: 'profileSSRAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.space/api/v1/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['profileSSR'],
  endpoints: builder => ({
    getProfileSSR: builder.query<BaseResponse<UserInfo>, string | undefined>({
      query: id => ({
        method: 'GET',
        url: `users/profile/${id}`,
      }),
    }),
  }),
})

export const {
  util: { getRunningQueriesThunk },
} = ProfileSsrApi

// export endpoints for use in SSR

export const { getProfileSSR } = ProfileSsrApi.endpoints
