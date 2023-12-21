import { baseApi, BaseResponse } from '@/src/shared/api'

const deletePost = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<BaseResponse, string>({
      query: postId => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts', 'Profile'],
    }),
  }),
})

export const { useDeletePostMutation } = deletePost
