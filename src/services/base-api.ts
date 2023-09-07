import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * all requests from this basequery
 */

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram-social.vercel.app/back-api/',
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).authReducer.token
    //
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`)
    //   }
    //
    //   return headers
    // },
  }),
  endpoints: () => ({}),
})
