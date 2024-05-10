import {
  GetAllPostsResponse,
  GetUserPostResponse,
  GetUserPostsResponse,
  UpdatePost,
  UpdateResponse,
} from '@/features/posts/service/postApiTypes'
import { BaseResponse, baseApi } from '@/shared/api'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addPost: builder.mutation<BaseResponse, FormData>({
      invalidatesTags: ['Posts'],
      query: body => ({
        body,
        method: 'POST',
        url: `posts/create`,
      }),
    }),
    getAllPosts: builder.query<
      BaseResponse<GetAllPostsResponse>,
      {
        pageNumber?: number
        pageSize?: number
        sortDirection?: string
      }
    >({
      providesTags: ['AllPosts'],
      query: arg => ({
        method: 'GET',
        url: `posts?sortDirection=${arg.sortDirection || 'desc'}&pageNumber=${
          arg.pageNumber || 1
        }&pageSize=${arg.pageSize || 4}`,
      }),
    }),
    getUserPost: builder.query<BaseResponse<GetUserPostResponse>, null | string>({
      providesTags: ['Post'],
      query: postId => ({
        method: 'GET',
        url: `posts/post/${postId}`,
      }),
    }),
    getUserPosts: builder.query<
      BaseResponse<GetUserPostsResponse>,
      {
        pageNumber?: number
        pageSize?: number
        sortDirection?: string
        userId: string
      }
    >({
      providesTags: ['Posts'],
      query: arg => ({
        method: 'GET',
        url: `posts/${arg.userId}?sortDirection=${arg.sortDirection || 'desc'}&pageNumber=${
          arg.pageNumber || 1
        }&pageSize=${arg.pageSize || 10}`,
      }),
    }),
    getUsersCount: builder.query<
      BaseResponse<{
        totalCount: string
      }>,
      void
    >({
      providesTags: ['Users'],
      query: arg => ({
        method: 'GET',
        url: `users/count`,
      }),
    }),

    updatePost: builder.mutation<UpdateResponse, Pick<UpdatePost, 'postId'> & UpdatePost>({
      invalidatesTags: ['Post', 'Posts', 'Profile'],
      query: ({ postId, ...patch }) => ({
        body: patch,
        method: 'PUT',
        url: `posts/${postId}`,
      }),
    }),
  }),
})

export const {
  useAddPostMutation,
  useGetAllPostsQuery,
  useGetUserPostQuery,
  useGetUserPostsQuery,
  useGetUsersCountQuery,
  useUpdatePostMutation,
  util: { getRunningQueriesThunk },
} = postApi

export const { getAllPosts, getUserPost, getUserPosts, getUsersCount } = postApi.endpoints
