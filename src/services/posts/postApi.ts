import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponseType } from '@/src/services'
import { baseQueryWithReauth } from '@/src/services/base-query-with-reauth'
import {
  GetUserPostsRequest,
  GetUserPostsResponse,
  UpdatePost,
  UpdateResponse,
} from '@/src/services/posts/postApi.types'

export const postApi = createApi({
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
    updatePost: builder.mutation<UpdateResponse, UpdatePost>({
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
} = postApi
