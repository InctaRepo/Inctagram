import { createApi } from '@reduxjs/toolkit/query/react'
import { appActions } from '@/src/shared/app'
import { baseQueryWithReAuth } from '@/src/shared/api/baseQueryWithReAuth'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { UserType } from './authApiTypes'
import { setIsAuth, setUser } from './authSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Me'],
  endpoints: builder => ({
    getMe: builder.query<BaseResponse<UserType>, void>({
      query: () => 'auth/me',
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === 0) {
            dispatch(setIsAuth(true))
            dispatch(setUser(data.data))
          }
        } catch (e) {
          console.error(e)
        } finally {
          dispatch(appActions.setAppInitialized({ isInitialized: true }))
        }
      },
      providesTags: ['Me'],
      extraOptions: { maxRetries: false },
    }),
  }),
})
export const { useGetMeQuery } = authApi
