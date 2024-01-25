import {
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
      invalidatesTags: ['Post', 'Posts'],
    }),
  }),
})

export const {
  useAddPostMutation,
  useGetUserPostsQuery,
  useGetUserPostQuery,
  useUpdatePostMutation,
  util: { getRunningQueriesThunk },
} = postApi

export const { getUserPosts, getUserPost } = postApi.endpoints
