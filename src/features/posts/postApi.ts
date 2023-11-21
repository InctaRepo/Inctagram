import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/src/shared/api/baseQueryWithReAuth'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { GetUserPostsResponse, UpdatePost, UpdateResponse } from '../posts/postApiTypes'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryWithReauth,
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
    updatePost: builder.mutation<UpdateResponse, UpdatePost>({
      query: ({ body, postId }) => ({
        method: 'PUT',
        url: `posts/${postId}`,
        body,
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
