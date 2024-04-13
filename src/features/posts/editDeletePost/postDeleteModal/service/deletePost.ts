import { BaseResponse, baseApi } from '@/shared/api'

const deletePost = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<BaseResponse, string>({
      invalidatesTags: ['Posts'],
      query: postId => ({
        method: 'DELETE',
        url: `posts/${postId}`,
      }),
    }),
  }),
})

export const { useDeletePostMutation } = deletePost
