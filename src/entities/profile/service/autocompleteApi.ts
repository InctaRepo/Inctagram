import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { AUTOCOMPLETE_API_KEY } from '@/shared/const'

export const autocompleteApi = createApi({
  reducerPath: 'geoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.geoapify.com/v1/geocode/' }),
  endpoints: builder => ({
    getAutocomplete: builder.query<{ results: AutocompleteOption[] }, any>({
      query: (value: string) => {
        return {
          url: `autocomplete?text=${value}&type=city&format=json&limit=5&apiKey=${AUTOCOMPLETE_API_KEY}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useLazyGetAutocompleteQuery } = autocompleteApi

export type AutocompleteOption = {
  city: string
  country: string
}
