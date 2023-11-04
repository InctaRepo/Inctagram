import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponseType } from '@/src/services'
import { baseQueryWithReauth } from '@/src/services/base-query-with-reauth'
import {
  GetUserPostsRequest,
  GetUserPostsResponse,
  UpdatePostType,
  UpdateResponseType,
} from '@/src/services/posts/post-api-types'

export const PostAPI = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['createPost', 'editPost', 'deletePost'],
  endpoints: builder => ({
    addPost: builder.mutation<BaseResponseType, FormData>({
      query: body => ({
        method: 'POST',
        url: `posts/create`,
        body,
      }),
      invalidatesTags: ['createPost'],
    }),
    updatePost: builder.mutation<UpdateResponseType, UpdatePostType>({
      query: ({ body, postId }) => ({
        method: 'PUT',
        url: `posts/${postId}`,
        body,
      }),
      invalidatesTags: ['editPost'],
    }),
    deletePost: builder.mutation<BaseResponseType, string>({
      query: postId => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deletePost'],
    }),
    getUserPosts: builder.query<BaseResponseType<GetUserPostsResponse>, string>({
      query: userId => ({
        url: `posts/${userId}`,
        method: 'GET',
      }),
      providesTags: ['deletePost', 'createPost'],
    }),
  }),
})

export const {
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetUserPostsQuery,
} = PostAPI
