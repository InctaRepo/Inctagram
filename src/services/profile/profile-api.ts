import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponseType } from '@/src/services'
import { baseQueryWithReauth } from '@/src/services/base-query-with-reauth'
import { AvatarType, UserInfoType } from '@/src/services/profile/profile-api-types'

export const ProfileAPI = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me'],
  endpoints: builder => ({
    // @ts-ignore
    createProfile: builder.mutation<BaseResponseType, UserInfoType & Pick<UserInfoType, 'id'>>({
      query: ({ id, ...patch }) => ({
        method: 'POST',
        url: `users/profile/${id}`,
        body: patch,
      }),
    }),
    // @ts-ignore
    updateProfile: builder.mutation<BaseResponseType, UserInfoType & Pick<UserInfoType, 'id'>>({
      query: ({ id, ...patch }) => ({
        method: 'PUT',
        url: `users/profile/${id}`,
        body: patch,
      }),
    }),
    getProfile: builder.query<BaseResponseType<UserInfoType>, string>({
      query: id => ({
        method: 'GET',
        url: `users/profile/${id}`,
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
  useGetProfileQuery,
  useCreateProfileMutation,
} = ProfileAPI
