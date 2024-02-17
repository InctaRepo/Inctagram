// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { GEO_API_URL } from '@/shared/const/const'

const headers: Headers = new Headers()

headers.append('X-CSCAPI-KEY', 'API_KEY')

export const geoApi = createApi({
  reducerPath: 'geoApi',
  baseQuery: fetchBaseQuery({ baseUrl: GEO_API_URL }),
  endpoints: builder => ({
    getCountries: builder.query({
      query: () => {
        return {
          url: 'countries',
          method: 'GET',
          headers: headers,
        }
      },
    }),
    getCities: builder.query({
      query: country => {
        return {
          url: `countries/${country}/cities`,
          method: 'GET',
          headers: headers,
        }
      },
    }),
  }),
})

export const { useGetCountriesQuery, useGetCitiesQuery } = geoApi

type Country = {
  id: number
  name: string
  iso2: string
}

type City = Omit<Country, 'iso2'>
