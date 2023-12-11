import { baseApi, BaseResponse } from '@/src/shared/api'

export const deleteAvatar = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: `users/profile/avatar`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const { useDeleteAvatarMutation } = deleteAvatar
