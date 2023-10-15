import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponseType } from '@/src/services'
import { baseQueryWithReauth } from '@/src/services/base-query-with-reauth'
import { PostType } from '@/src/services/posts/post-api-types'

export const PostAPI = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me'],
  endpoints: builder => ({
    addPost: builder.mutation<BaseResponseType, PostType>({
      query: body => ({
        method: 'POST',
        url: `post/create`,
        body: body,
      }),
    }),
  }),
})

export const { useAddPostMutation } = PostAPI
