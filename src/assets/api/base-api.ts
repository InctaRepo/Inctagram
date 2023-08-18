import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RegisterArgsType } from '@/src/assets/api/auth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram-social.vercel.app/',
  }),
  endpoints: () => ({}),
})
