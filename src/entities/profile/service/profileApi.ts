import { UserInfo } from '@/entities/profile/service/profileTypes'
import { BaseResponse, baseApi } from '@/shared/api'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createProfile: builder.mutation<BaseResponse, Pick<UserInfo, 'userId'> & UserInfo>({
      invalidatesTags: ['Profile'],
      query: ({ userId, ...patch }) => ({
        body: patch,
        method: 'POST',
        url: `users/profile/${userId}`,
      }),
    }),
    deleteAvatar: builder.mutation<BaseResponse, void>({
      invalidatesTags: ['Profile'],
      query: () => ({
        method: 'DELETE',
        url: `users/profile/avatar`,
      }),
    }),
    getProfile: builder.query<BaseResponse<UserInfo>, string>({
      providesTags: ['Profile'],
      query: id => ({
        method: 'GET',
        url: `users/profile/${id}`,
      }),
    }),
    updateProfile: builder.mutation<BaseResponse, Pick<UserInfo, 'userId'> & UserInfo>({
      invalidatesTags: ['Profile'],
      query: ({ userId, ...patch }) => ({
        body: patch,
        method: 'PUT',
        url: `users/profile/${userId}`,
      }),
    }),
    uploadAvatar: builder.mutation<BaseResponse, FormData>({
      invalidatesTags: ['Profile'],
      query: FormData => ({
        body: FormData,
        method: 'POST',
        url: `users/profile/avatar/upload`,
      }),
    }),
  }),
})

export const {
  useCreateProfileMutation,
  useDeleteAvatarMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  util: { getRunningQueriesThunk },
} = profileApi

export const { getProfile } = profileApi.endpoints
