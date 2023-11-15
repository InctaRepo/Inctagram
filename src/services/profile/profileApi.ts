import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponseType } from '@/src/services'
import { baseQueryWithReauth } from '@/src/services/base-query-with-reauth'
import { UserInfo } from '@/src/services/profile/profileApi.types'

export const ProfileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 5,
  tagTypes: ['profile'],
  endpoints: builder => ({
    createProfile: builder.mutation<BaseResponseType, UserInfo & Pick<UserInfo, 'id'>>({
      query: ({ id, ...patch }) => ({
        method: 'POST',
        url: `users/profile/${id}`,
        body: patch,
      }),
      // invalidatesTags: ['profile'],
    }),
    updateProfile: builder.mutation<BaseResponseType, UserInfo & Pick<UserInfo, 'id'>>({
      query: ({ id, ...patch }) => ({
        method: 'PUT',
        url: `users/profile/${id}`,
        body: patch,
      }),
      // invalidatesTags: ['profile'],
    }),
    getProfile: builder.query<BaseResponseType<UserInfo>, string | undefined>({
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
      // invalidatesTags: ['profile'],
    }),
    deleteAvatar: builder.mutation<BaseResponseType, void>({
      query: () => ({
        url: `users/profile/avatar`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['profile'],
    }),
  }),
})

export const {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useGetProfileQuery,
  useCreateProfileMutation,
  useDeleteAvatarMutation,
} = ProfileApi
