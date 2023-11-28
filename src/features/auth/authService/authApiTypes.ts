export type UserType = {
  userId: string
  username: string
  email: string
} | null

export type AccessType = {
  accessToken: string
}
export type AuthState = {
  user: UserType | null
  isAuth: boolean
}
