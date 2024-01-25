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
export type GetPublicPosts = {
  pageNumber: number
  pageSize: number
}
export type GetAllPostsResponse = {
  totalCount: number
  pageSize: number
  items: {
    url: any
    userId: string
    id: number
    ownerId: number
    description: string
    location: string | null
    images: string
    createdAt: string
    updatedAt: string
    avatarOwner: string
    owner: {
      firstName: string | null
      lastName: string | null
    }
  }[]
}
export type GetUsersCount = {
  totalCount: number
}
