import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { authApi } from '@/src/services/auth/auth-api'
import { authActions } from '@/src/services/auth/auth-slice'
import { baseUrl } from '@/src/services/base-api'
// Create a new mutex

const baseQuery = fetchBaseQuery({
  baseUrl,
  // credentials: 'include',
  // TODO turn on, when server will add deployed front side
  // need for sent cookies to server side
  prepareHeaders: headers => {
    const access = localStorage.getItem('access')

    if (access) {
      headers.set('Authorization', `Bearer ${access}`) // set the Authorization header
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  //@ts-ignore
  if (result.data.resultCode === 3) {
    console.log('reauthQuery: Unauthorized case')
    api.dispatch(authActions.setIsAuth(false))
    const refreshResult = await baseQuery(
      { url: 'auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    )

    //@ts-ignore
    if (refreshResult.data.resultCode === 0) {
      console.log('reauthQuery: refresh result success')
      //@ts-ignore
      localStorage.setItem('access', refreshResult.data.data.accessToken)
      api.dispatch(authApi.endpoints.getMe.initiate())
      // Retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      console.log('reauthQuery: refresh result error')
      api.dispatch(authActions.logout())
    }
  }

  return result
}
