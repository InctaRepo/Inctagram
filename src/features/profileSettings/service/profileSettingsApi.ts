import { UserInfo } from '@/src/features/profileSettings/service'
import { baseApi, BaseResponse } from '@/src/shared/api'

const profileSettingsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createProfile: builder.mutation<
      BaseResponse,
      Omit<UserInfo, 'avatar'> & Pick<UserInfo, 'userId'>
    >({
      query: ({ userId, ...patch }) => ({
        method: 'POST',
        url: `users/profile/${userId}`,
        body: patch,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<
      BaseResponse,
      Omit<UserInfo, 'avatar'> & Pick<UserInfo, 'userId'>
    >({
      query: ({ userId, ...patch }) => ({
        method: 'PUT',
        url: `users/profile/${userId}`,
        body: patch,
      }),
      invalidatesTags: ['Profile'],
    }),
    uploadAvatar: builder.mutation<BaseResponse, FormData>({
      query: FormData => ({
        url: `users/profile/avatar/upload`,
        method: 'POST',
        body: FormData,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const { useUpdateProfileMutation, useUploadAvatarMutation, useCreateProfileMutation } =
  profileSettingsApi
