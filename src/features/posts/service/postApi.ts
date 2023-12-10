import { GetUserPostResponse, GetUserPostsResponse } from './postApiTypes'

import { baseApi, BaseResponse } from '@/src/shared/api'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addPost: builder.mutation<BaseResponse, FormData>({
      query: body => ({
        method: 'POST',
        url: `posts/create`,
        body,
      }),
      invalidatesTags: ['Post', 'Profile'],
    }),
    deletePost: builder.mutation<BaseResponse, string | string[] | undefined>({
      query: postId => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post', 'Profile'],
    }),
    getUserPosts: builder.query<BaseResponse<GetUserPostsResponse>, string | string[] | undefined>({
      query: userId => ({
        url: `posts/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),
    getUserPost: builder.query<BaseResponse<GetUserPostResponse>, string | null>({
      query: postId => ({
        url: `posts/post/${postId}`,
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),
  }),
})

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useGetUserPostsQuery,
  useGetUserPostQuery,
  util: { getRunningQueriesThunk },
} = postApi

export const { getUserPosts, getUserPost } = postApi.endpoints
