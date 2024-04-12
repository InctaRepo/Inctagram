import { AUTOCOMPLETE_API_KEY } from '@/shared/const'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const autocompleteApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.geoapify.com/v1/geocode/' }),
  endpoints: builder => ({
    getAutocomplete: builder.query<{ results: AutocompleteOption[] }, any>({
      query: (value: string) => {
        return {
          method: 'GET',
          url: `autocomplete?text=${value}&type=city&format=json&limit=5&apiKey=${AUTOCOMPLETE_API_KEY}`,
        }
      },
    }),
  }),
  reducerPath: 'geoApi',
})

export const { useLazyGetAutocompleteQuery } = autocompleteApi

export type AutocompleteOption = {
  city: string
  country: string
}
