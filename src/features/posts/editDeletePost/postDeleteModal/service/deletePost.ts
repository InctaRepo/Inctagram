import { baseApi, BaseResponse } from '@/shared/api'

const deletePost = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<BaseResponse, string>({
      query: postId => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const { useDeletePostMutation } = deletePost
