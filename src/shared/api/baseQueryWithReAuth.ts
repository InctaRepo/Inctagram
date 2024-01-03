import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { setLogout } from '@/src/features/auth/authService'
import { BASE_URL, resultCode, RouteNames } from '@/src/shared/const'
import { AppRootState } from '@/src/store'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    if (typeof window === 'undefined') {
      return headers
    }
    const accessToken = (getState() as AppRootState).signIn.accessToken

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    headers.set('Cache-Control', 'no-store')

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  const resultData = result?.data as { resultCode: number }
  const isLoginEndpoint = result?.meta?.request.url.endsWith(RouteNames.SIGN_IN)
  const error401 = resultData?.resultCode === resultCode.UNAUTHORIZED

  if (!isLoginEndpoint && error401) {
    const refreshResult = await baseQuery(
      { url: 'auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    )
    const refresh = refreshResult.data as { data: { accessToken: string }; resultCode: number }

    if (refresh.resultCode === resultCode.OK) {
      localStorage.setItem(
        'accessToken',
        `{ signIn: { accessToken: ${refresh.data.accessToken} } }`
      )
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(setLogout())
    }
  }

  return result
}
