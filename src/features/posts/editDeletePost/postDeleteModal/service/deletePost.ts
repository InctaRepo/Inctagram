import { baseApi, BaseResponse } from '@/src/shared/api'

const deletePost = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<BaseResponse, string | string[] | undefined>({
      query: postId => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post', 'Profile'],
    }),
  }),
})

export const { useDeletePostMutation } = deletePost
