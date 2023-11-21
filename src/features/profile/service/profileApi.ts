import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/src/shared/api/baseQueryWithReAuth'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { UserInfo } from '../../profile/service/profileApiTypes'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 5,
  tagTypes: ['profile'],
  endpoints: builder => ({
    createProfile: builder.mutation<BaseResponse, UserInfo & Pick<UserInfo, 'userId'>>({
      query: ({ userId, ...patch }) => ({
        method: 'POST',
        url: `users/profile/${userId}`,
        body: patch,
      }),
      // invalidatesTags: ['profile'],
    }),
    updateProfile: builder.mutation<BaseResponse, UserInfo & Pick<UserInfo, 'userId'>>({
      query: ({ userId, ...patch }) => ({
        method: 'PUT',
        url: `users/profile/${userId}`,
        body: patch,
      }),
      // invalidatesTags: ['profile'],
    }),
    getProfile: builder.query<BaseResponse<UserInfo>, string | string[] | undefined>({
      query: id => ({
        method: 'GET',
        url: `users/profile/${id}`,
      }),
    }),
    uploadAvatar: builder.mutation<BaseResponse, FormData>({
      query: FormData => ({
        url: `users/profile/avatar/upload`,
        method: 'POST',
        body: FormData,
      }),
      // invalidatesTags: ['profile'],
    }),
    deleteAvatar: builder.mutation<BaseResponse, void>({
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
  util: { getRunningQueriesThunk },
} = profileApi

export const { getProfile } = profileApi.endpoints
