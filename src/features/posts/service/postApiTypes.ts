export type Post = {
  description: string | null
  photos: FormData
} | null

export type UpdatePost = {
  description: string | undefined
  postId: string | undefined
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
  items: GetUserPostResponse[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type PostState = {
  post: Post | null
}

export type GetUserPostResponse = {
  createdAt: Date
  description: string
  id: string
  images: Images[]
  userId: string
}
