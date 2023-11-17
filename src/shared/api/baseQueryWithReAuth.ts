import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authApi } from '@/src/features/auth/authService/authApi'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authActions } from '@/src/features/auth/authService/authSlice'
import { BASE_URL } from '../const/const'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const access = localStorage.getItem('access')

    if (access) {
      headers.set('Authorization', `Bearer ${access}`) // set the Authorization header
    }

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  //@ts-ignore
  if (args.url !== 'auth/logout' && result.data.resultCode === 3) {
    const refreshResult = await baseQuery(
      { url: 'auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    )

    //@ts-ignore
    if (refreshResult.data.resultCode === 0) {
      //@ts-ignore
      localStorage.setItem('access', refreshResult.data.data.accessToken)
      api.dispatch(authApi.endpoints.getMe.initiate())
      // Retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(authActions.logout())
    }
  }

  return result
}
