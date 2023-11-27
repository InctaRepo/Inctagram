import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@/src/shared/api/baseQueryWithReAuth'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { GetUserPostsResponse, UpdatePost, UpdateResponse } from './postApiTypes'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['createPost', 'editPost', 'deletePost'],
  endpoints: builder => ({
    addPost: builder.mutation<BaseResponse, FormData>({
      query: body => ({
        method: 'POST',
        url: `posts/create`,
        body,
      }),
      invalidatesTags: ['createPost'],
    }),
    updatePost: builder.mutation<UpdateResponse, UpdatePost & Pick<UpdatePost, 'postId'>>({
      query: ({ postId, ...patch }) => ({
        method: 'PUT',
        url: `posts/${postId}`,
        body: patch,
      }),
      invalidatesTags: ['editPost'],
    }),
    deletePost: builder.mutation<BaseResponse, string>({
      query: postId => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deletePost'],
    }),
    getUserPosts: builder.query<BaseResponse<GetUserPostsResponse>, string>({
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
