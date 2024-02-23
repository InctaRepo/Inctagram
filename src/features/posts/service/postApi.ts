import {
  GetAllPostsResponse,
  GetUserPostResponse,
  GetUserPostsResponse,
  UpdatePost,
  UpdateResponse,
} from '@/features/posts/service/postApiTypes'
import { baseApi, BaseResponse } from '@/shared/api'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addPost: builder.mutation<BaseResponse, FormData>({
      query: body => ({
        method: 'POST',
        url: `posts/create`,
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    getAllPosts: builder.query<
      BaseResponse<GetAllPostsResponse>,
      {
        sortDirection?: string
        pageNumber?: number
        pageSize?: number
      }
    >({
      query: arg => ({
        url: `posts?sortDirection=${arg.sortDirection || 'desc'}&pageNumber=${
          arg.pageNumber || 1
        }&pageSize=${arg.pageSize || 4}`,
        method: 'GET',
      }),
      providesTags: ['AllPosts'],
    }),
    getUserPosts: builder.query<
      BaseResponse<GetUserPostsResponse>,
      {
        userId: string
        sortDirection?: string
        pageNumber?: number
        pageSize?: number
      }
    >({
      query: arg => ({
        url: `posts/${arg.userId}?sortDirection=${arg.sortDirection || 'desc'}&pageNumber=${
          arg.pageNumber || 1
        }&pageSize=${arg.pageSize || 10}`,
        method: 'GET',
      }),
      providesTags: ['Posts'],
    }),
    getUserPost: builder.query<BaseResponse<GetUserPostResponse>, string | null>({
      query: postId => ({
        url: `posts/post/${postId}`,
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),
    updatePost: builder.mutation<UpdateResponse, UpdatePost & Pick<UpdatePost, 'postId'>>({
      query: ({ postId, ...patch }) => ({
        method: 'PUT',
        url: `posts/${postId}`,
        body: patch,
      }),
      invalidatesTags: ['Post', 'Posts', 'Profile'],
    }),

    getUsersCount: builder.query<BaseResponse, void>({
      query: arg => ({
        url: `users/count`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
  }),
})

export const {
  useAddPostMutation,
  useGetUserPostsQuery,
  useGetUserPostQuery,
  useUpdatePostMutation,
  useGetAllPostsQuery,
  useGetUsersCountQuery,
  util: { getRunningQueriesThunk },
} = postApi

export const { getUserPosts, getUserPost, getAllPosts, getUsersCount } = postApi.endpoints
