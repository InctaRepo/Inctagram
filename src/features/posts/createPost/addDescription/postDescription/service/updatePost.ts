import { UpdatePost, UpdateResponse } from '@/src/features/posts'
import { baseApi } from '@/src/shared/api'

const updatePost = baseApi.injectEndpoints({
  endpoints: builder => ({
    updatePost: builder.mutation<UpdateResponse, UpdatePost & Pick<UpdatePost, 'postId'>>({
      query: ({ postId, ...patch }) => ({
        method: 'PUT',
        url: `posts/${postId}`,
        body: patch,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useUpdatePostMutation } = updatePost
