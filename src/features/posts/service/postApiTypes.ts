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
  pagesCount: number
  page: number
  totalCount: number
  pageSize: number
  items: Items[]
}
export type Items = {
  images: Images[]
  id: string
  userId: string
  createdAt: string
  description: string
  location?: any
}
