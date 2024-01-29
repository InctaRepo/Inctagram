import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { clearToken, setToken } from '@/features/auth/signIn'
import { BaseResponse } from '@/shared/api/baseResponse'
import { BASE_URL, resultCode, RouteNames } from '@/shared/const'
import { AppRootState } from '@/store'

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

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  const resultData = result?.data as BaseResponse
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
      api.dispatch(setToken({ accessToken: refresh.data.accessToken }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(clearToken())
    }
  }

  return result
}
