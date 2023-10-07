import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponseType } from '@/src/services'
import { appActions } from '@/src/services/app'
import { authActions, UserType } from '@/src/services/auth'
import { baseQueryWithReauth } from '@/src/services/base-query-with-reauth'
import { UpdateProfileType } from '@/src/services/profile/profile-api-types'

export const ProfileAPI = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me'],
  endpoints: builder => ({
    getMe: builder.query<BaseResponseType<UserType>, void>({
      query: () => 'auth/me',
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === 0) {
            dispatch(authActions.setIsAuth(true))
            dispatch(authActions.setUser(data.data))
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
    updateProfile: builder.mutation<BaseResponseType, UpdateProfileType>({
      query: data => ({
        method: 'PUT',
        url: 'users/profile/{id}',
        body: data,
      }),
    }),
  }),
})

export const { useUpdateProfileMutation } = ProfileAPI
