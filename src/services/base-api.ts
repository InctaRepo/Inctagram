import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseUrl =
  'https://ea19-193-200-201-228.ngrok-free.app/api/v1' /*'https://inctagram.space/api/v1/'*/

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: headers => {
      const access = localStorage.getItem('access')

      if (access) {
        headers.set('Authorization', `Bearer ${access}`) // set the Authorization header
      }

      return headers
    },
  }),
  endpoints: () => ({}),
})
