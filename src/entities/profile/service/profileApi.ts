import { UserInfo } from '@/src/entities/profile/service/profileTypes'
import { baseApi, BaseResponse } from '@/src/shared/api'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<BaseResponse<UserInfo>, string | string[] | undefined>({
      query: id => ({
        method: 'GET',
        url: `users/profile/${id}`,
      }),
      providesTags: ['Profile'],
    }),
    createProfile: builder.mutation<BaseResponse, UserInfo & Pick<UserInfo, 'userId'>>({
      query: ({ userId, ...patch }) => ({
        method: 'POST',
        url: `users/profile/${userId}`,
        body: patch,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<BaseResponse, UserInfo & Pick<UserInfo, 'userId'>>({
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
    deleteAvatar: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: `users/profile/avatar`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useCreateProfileMutation,
  useDeleteAvatarMutation,
  util: { getRunningQueriesThunk },
} = profileApi

export const { getProfile } = profileApi.endpoints
