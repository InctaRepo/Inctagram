export type Post = {
  description: string | null
  photos: FormData
} | null

export type UpdatePost = {
  body: Post
  postId: string
}

export type UpdateResponse = {
  description: string
}
export type Images = {
  size: number
  url: string
  variant: string
}

export type GetUserPostsRequest = {
  pageNumber: number
  pageSize: number
  userId: string
}

export type CreatePostResponse = {
  createdAt: Date
  description: string
  id: string
  images: Images[]
  userId: string
}

export type GetPostResponse = CreatePostResponse

export type GetUserPostsResponse = {
  items: CreatePostResponse[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
