export type Post = {
  description: null | string
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
export type GetUserPostsResponse = {
  items: GetUserPostResponse[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
export type GetUserPostResponse = {
  createdAt: Date
  description: string
  id: string
  images: Images[]
  userId: string
}
export type GetAllPostsResponse = {
  items: Items[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
export type Items = {
  createdAt: string
  description: string
  id: string
  images: Images[]
  location?: any
  userId: string
}
