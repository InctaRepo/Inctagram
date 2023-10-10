import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponseType } from '@/src/services'
import { baseQueryWithReauth } from '@/src/services/base-query-with-reauth'
import { AvatarType, UpdateProfileType, UserType } from '@/src/services/profile/profile-api-types'

export const ProfileAPI = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me'],
  endpoints: builder => ({
    createProfile: builder.mutation<BaseResponseType, UserType>({
      query: data => ({
        method: 'POST',
        url: `users/profile`,
        body: data,
      }),
    }),
    updateProfile: builder.mutation<BaseResponseType, UserType>({
      query: data => ({
        method: 'PUT',
        url: `users/profile`,
        body: data,
      }),
    }),
    getProfile: builder.mutation<BaseResponseType, any>({
      query: id => ({
        method: 'GET',
        url: `users/profile`,
        params: id,
      }),
    }),
    uploadAvatar: builder.mutation<BaseResponseType, FormData>({
      query: FormData => ({
        url: `users/profile/avatar/upload`,
        method: 'POST',
        body: FormData,
      }),
    }),
  }),
})

export const {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useGetProfileMutation,
  useCreateProfileMutation,
} = ProfileAPI
