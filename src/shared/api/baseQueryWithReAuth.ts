import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { AppRootState } from '@/src/store'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authApi, setLogout } from '@/src/features/auth/authService'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { BASE_URL } from '../const/const'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    if (typeof window === 'undefined') {
      return headers
    }
    const accessToken = (getState() as AppRootState).signIn.accessToken
    // const access = localStorage.getItem('access')

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
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
  const resultData = result.data as { resultCode: number }
  const isLoginEndpoint = result.meta?.request.url.endsWith('auth/signIn')
  const error401 = resultData.resultCode === 3

  if (!isLoginEndpoint && error401) {
    const refreshResult = await baseQuery(
      { url: 'auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    )
    const refresh = refreshResult.data as { data: { accessToken: string }; resultCode: number }

    if (refresh.resultCode === 0) {
      localStorage.setItem('accessToken', refresh.data.accessToken)
      // api.dispatch(setToken(refresh.data as { accessToken: string }))
      api.dispatch(authApi.endpoints.getMe.initiate())
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(setLogout())
    }
  }

  return result
}
